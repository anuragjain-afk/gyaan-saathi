import React, { useState, useEffect } from 'react';
import { X, RefreshCw, CheckCircle2, Clock, Server, Layers, AlertCircle } from 'lucide-react';
import { syncManager, SyncStatusSummary } from '../services/syncManager';
import { TRANSLATIONS, SupportedLanguage } from '../i18n/translations';

interface SyncCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: SupportedLanguage;
}

export const SyncCenterModal: React.FC<SyncCenterModalProps> = ({ isOpen, onClose, lang }) => {
  const [summary, setSummary] = useState<SyncStatusSummary>({
    isOnline: true,
    isSimulatedOffline: false,
    lastSynced: null,
    pendingCount: 0,
    isSyncing: false,
    pendingItems: []
  });
  const [syncResult, setSyncResult] = useState<string | null>(null);

  const t = TRANSLATIONS[lang];

  const loadSummary = async () => {
    const res = await syncManager.getSyncSummary();
    setSummary(res);
  };

  useEffect(() => {
    if (isOpen) {
      loadSummary();
      setSyncResult(null);
    }
  }, [isOpen]);

  const handleManualSync = async () => {
    setSyncResult(null);
    const res = await syncManager.triggerSync();
    await loadSummary();
    if (res.processed > 0) {
      setSyncResult(`Successfully synchronized ${res.processed} pending operation(s) with the server!`);
    } else if (!summary.isOnline) {
      setSyncResult('Device is currently offline. Turn on internet to complete synchronization.');
    } else {
      setSyncResult('All operations are already up to date.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-brand-50 border border-brand-200 text-brand-600">
              <RefreshCw className={`w-5 h-5 ${summary.isSyncing ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Sync Center</h2>
              <p className="text-xs text-slate-500">IndexedDB Offline Queue & Auto-Synchronization</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Status Box */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 mb-1 flex items-center gap-1.5 font-medium">
                <Server className="w-3.5 h-3.5 text-brand-600" />
                Network State
              </div>
              <div className="font-bold text-sm">
                {summary.isOnline ? (
                  <span className="text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Online (Ready)
                  </span>
                ) : (
                  <span className="text-amber-800 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4 text-amber-600" /> Offline Mode
                  </span>
                )}
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 mb-1 flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-brand-600" />
                {t.lastSynced}
              </div>
              <div className="font-semibold text-xs text-slate-800">
                {summary.lastSynced
                  ? new Date(summary.lastSynced).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : 'Just now'}
              </div>
            </div>
          </div>

          {/* Sync Result Feedback Alert */}
          {syncResult && (
            <div className="p-3.5 rounded-xl bg-brand-50 border border-brand-200 text-brand-800 text-xs flex items-start gap-2.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
              <span>{syncResult}</span>
            </div>
          )}

          {/* Pending Queue List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-brand-600" />
                {t.pendingActions} ({summary.pendingCount})
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">Idempotent Queue</span>
            </div>

            {summary.pendingCount === 0 ? (
              <div className="p-6 text-center bg-slate-50 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2 opacity-90" />
                <p className="text-sm font-semibold text-slate-800">All activity synchronized</p>
                <p className="text-xs text-slate-500 mt-1">
                  Learning progress, quiz scores, and AI doubts are completely backed up.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {summary.pendingItems.map((item) => (
                  <div
                    key={item.operationId}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-800 border border-amber-200">
                        {item.type === 'AI_DOUBT'
                          ? '⏳ AI Doubt'
                          : item.type === 'QUIZ_SUBMIT'
                          ? '✓ Quiz Attempt'
                          : '✓ Lesson Progress'}
                      </span>
                      <span className="text-slate-800 font-medium truncate max-w-[200px]">
                        {item.payload?.question || item.payload?.courseId || item.operationId}
                      </span>
                    </div>
                    <span className="text-slate-500 text-[10px]">
                      {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <p className="text-[11px] text-slate-500">
            {summary.isOnline ? 'Connected to backend server.' : 'Will auto-sync when internet reconnects.'}
          </p>
          <button
            onClick={handleManualSync}
            disabled={summary.isSyncing}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white shadow-sm flex items-center gap-2 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${summary.isSyncing ? 'animate-spin' : ''}`} />
            {t.syncNow}
          </button>
        </div>
      </div>
    </div>
  );
};
