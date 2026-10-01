import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react';
import { syncManager, SyncStatusSummary } from '../services/syncManager';
import { TRANSLATIONS, SupportedLanguage } from '../i18n/translations';

interface ConnectionStatusProps {
  lang: SupportedLanguage;
  onOpenSyncCenter: () => void;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ lang, onOpenSyncCenter }) => {
  const [summary, setSummary] = useState<SyncStatusSummary>({
    isOnline: true,
    isSimulatedOffline: false,
    lastSynced: null,
    pendingCount: 0,
    isSyncing: false,
    pendingItems: []
  });

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const update = async () => {
      const res = await syncManager.getSyncSummary();
      setSummary(res);
    };

    update();

    window.addEventListener('gyaan-network-changed', update);
    window.addEventListener('gyaan-sync-updated', update);

    return () => {
      window.removeEventListener('gyaan-network-changed', update);
      window.removeEventListener('gyaan-sync-updated', update);
    };
  }, []);

  if (summary.isSyncing) {
    return (
      <button
        onClick={onOpenSyncCenter}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300 animate-pulse hover:bg-amber-100 transition-colors shadow-xs"
        title="Syncing pending activity..."
      >
        <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-600" />
        <span>{t.syncing}</span>
      </button>
    );
  }

  if (!summary.isOnline) {
    return (
      <button
        onClick={onOpenSyncCenter}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 transition-colors shadow-xs"
        title="Click to view offline queue & sync options"
      >
        <WifiOff className="w-3.5 h-3.5 text-amber-600 animate-pulse-subtle" />
        <span>● {t.offlineMode}</span>
        {summary.pendingCount > 0 && (
          <span className="bg-amber-400 text-amber-950 px-1.5 py-0.5 rounded-full text-[10px] font-bold">
            {summary.pendingCount}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={onOpenSyncCenter}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-xs"
    >
      <Wifi className="w-3.5 h-3.5 text-emerald-600" />
      <span>● {t.online}</span>
      {summary.pendingCount > 0 ? (
        <span className="bg-amber-400 text-amber-950 px-1.5 py-0.5 rounded-full text-[10px] font-bold">
          {summary.pendingCount}
        </span>
      ) : (
        <CheckCircle2 className="w-3 h-3 text-emerald-600 ml-0.5" />
      )}
    </button>
  );
};
