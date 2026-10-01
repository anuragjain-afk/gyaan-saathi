import { db, SyncQueueRecord } from '../db/indexedDB';

export interface SyncStatusSummary {
  isOnline: boolean;
  isSimulatedOffline: boolean;
  lastSynced: string | null;
  pendingCount: number;
  isSyncing: boolean;
  pendingItems: SyncQueueRecord[];
}

class SyncManager {
  private isSimulatedOffline: boolean = false;
  private isSyncing: boolean = false;
  private lastSynced: string | null = localStorage.getItem('gyaan_last_synced') || new Date().toISOString();

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.handleNetworkChange());
      window.addEventListener('offline', () => this.handleNetworkChange());
    }
  }

  public isOnline(): boolean {
    if (this.isSimulatedOffline) return false;
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  }

  public setSimulatedOffline(offline: boolean): void {
    this.isSimulatedOffline = offline;
    this.notifyNetworkChange();
    if (!offline && navigator.onLine) {
      this.triggerSync();
    }
  }

  public getSimulatedOffline(): boolean {
    return this.isSimulatedOffline;
  }

  private handleNetworkChange(): void {
    this.notifyNetworkChange();
    if (this.isOnline()) {
      console.log('[SyncManager] Network reconnected. Processing local sync queue...');
      this.triggerSync();
    }
  }

  private notifyNetworkChange(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('gyaan-network-changed', {
        detail: { isOnline: this.isOnline(), isSimulatedOffline: this.isSimulatedOffline }
      }));
    }
  }

  private notifySyncUpdate(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('gyaan-sync-updated'));
    }
  }

  public async queueOperation(type: SyncQueueRecord['type'], payload: any): Promise<SyncQueueRecord> {
    const operationId = `op_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const record: SyncQueueRecord = {
      operationId,
      type,
      payload,
      createdAt: new Date().toISOString(),
      status: 'pending',
      retryCount: 0
    };

    await db.syncQueue.add(record);
    this.notifySyncUpdate();

    // Immediately resolve locally since there is no remote server
    this.triggerSync();

    return record;
  }

  public async getSyncSummary(): Promise<SyncStatusSummary> {
    const pendingItems = await db.syncQueue.where('status').equals('pending').toArray();
    return {
      isOnline: this.isOnline(),
      isSimulatedOffline: this.isSimulatedOffline,
      lastSynced: this.lastSynced,
      pendingCount: pendingItems.length,
      isSyncing: this.isSyncing,
      pendingItems
    };
  }

  /**
   * Processes the local sync queue. Since there is no backend, all operations
   * are resolved locally and marked as completed immediately.
   */
  public async triggerSync(): Promise<{ success: boolean; processed: number; errors: number }> {
    if (this.isSyncing) {
      return { success: false, processed: 0, errors: 0 };
    }

    this.isSyncing = true;
    this.notifySyncUpdate();

    let processedCount = 0;

    try {
      const pendingOps = await db.syncQueue.where('status').equals('pending').toArray();

      for (const op of pendingOps) {
        if (!op.id) continue;
        // Mark as syncing then immediately complete — all data is local only
        await db.syncQueue.update(op.id, { status: 'syncing' });
        await db.syncQueue.update(op.id, { status: 'completed' });
        processedCount++;
      }

      this.lastSynced = new Date().toISOString();
      localStorage.setItem('gyaan_last_synced', this.lastSynced);
    } finally {
      this.isSyncing = false;
      this.notifySyncUpdate();
    }

    return { success: true, processed: processedCount, errors: 0 };
  }
}

export const syncManager = new SyncManager();
