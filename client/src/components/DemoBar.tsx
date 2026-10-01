import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, Sparkles, UserCheck, RotateCcw } from 'lucide-react';
import { syncManager } from '../services/syncManager';
import { db } from '../db/indexedDB';
import { INITIAL_COURSES, PYTHON_LESSONS, PYTHON_LOOP_QUIZ_QUESTIONS } from '../data/coursesData';

export const DemoBar: React.FC = () => {
  const [isOfflineSim, setIsOfflineSim] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const handleNetworkChange = (e: Event) => {
      setIsOfflineSim(!!(e as CustomEvent).detail?.isSimulatedOffline);
    };
    window.addEventListener('gyaan-network-changed', handleNetworkChange);
    return () => window.removeEventListener('gyaan-network-changed', handleNetworkChange);
  }, []);

  const toggleSimulatedOffline = () => {
    const nextState = !isOfflineSim;
    setIsOfflineSim(nextState);
    syncManager.setSimulatedOffline(nextState);
  };

  const triggerSyncNow = async () => {
    setIsSyncing(true);
    await syncManager.triggerSync();
    setIsSyncing(false);
  };

  const preloadRahulProfile = async () => {
    await db.userProfile.put({
      id: 'current',
      name: 'Rahul Kumar',
      course: 'BCA',
      semester: 1,
      language: 'hi',
      interests: ['Programming', 'Web Development'],
      streakDays: 4,
      lastActiveDate: new Date().toISOString(),
    });

    for (const c of INITIAL_COURSES) await db.courses.put(c);
    for (const l of PYTHON_LESSONS) await db.lessons.put(l);
    for (const q of PYTHON_LOOP_QUIZ_QUESTIONS) await db.quizzes.put(q);

    // Inject a realistic topic score for Nested Loops
    await db.topicScores.put({
      topicTag: 'nested-loops',
      topicName: 'Nested Loops',
      attempts: 1,
      totalQuestions: 3,
      totalCorrect: 1,
      scorePercentage: 33,
      needsPractice: true,
      lastUpdated: new Date().toISOString(),
    });

    window.location.reload();
  };

  const resetAllData = async () => {
    if (!window.confirm('Reset all demo data? This will clear IndexedDB and restart onboarding.')) return;
    await db.userProfile.clear();
    await db.userProgress.clear();
    await db.quizAttempts.clear();
    await db.topicScores.clear();
    await db.syncQueue.clear();
    await db.aiHistory.clear();
    window.location.reload();
  };

  return (
    <div className="bg-white/95 border-b border-slate-200 px-3 py-2 text-xs flex flex-wrap items-center justify-between gap-2 z-50 shadow-xs backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse shrink-0" />
        <span className="font-extrabold text-brand-700 hidden sm:inline">Hackathon Demo</span>
        <span className="text-slate-500 hidden lg:inline">
          · Toggle offline mode, sync queue, or load Rahul's demo profile
        </span>
      </div>

      <div className="flex items-center flex-wrap gap-1.5">
        {/* Toggle Simulated Offline */}
        <button
          onClick={toggleSimulatedOffline}
          className={`px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all text-[11px] ${
            isOfflineSim
              ? 'bg-amber-400 text-amber-950 ring-1 ring-amber-400/50 shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 shadow-xs'
          }`}
        >
          {isOfflineSim ? (
            <>
              <WifiOff className="w-3 h-3 text-amber-900" />
              <span className="hidden sm:inline">Offline ACTIVE — Click to go Online</span>
              <span className="sm:hidden">Turn Online</span>
            </>
          ) : (
            <>
              <Wifi className="w-3 h-3 text-emerald-600" />
              <span className="hidden sm:inline">Simulate Offline Mode</span>
              <span className="sm:hidden">Go Offline</span>
            </>
          )}
        </button>

        {/* Manual Sync */}
        <button
          onClick={triggerSyncNow}
          disabled={isSyncing}
          className="px-2.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium flex items-center gap-1.5 transition-all text-[11px] shadow-xs"
        >
          <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>Sync Now</span>
        </button>

        {/* Load Demo Profile (Rahul) */}
        <button
          onClick={preloadRahulProfile}
          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium flex items-center gap-1.5 border border-slate-200 text-[11px] shadow-xs"
          title="Preload Rahul Kumar — BCA Sem 1 demo profile"
        >
          <UserCheck className="w-3 h-3 text-brand-600" />
          <span className="hidden sm:inline">Load Rahul (BCA Demo)</span>
          <span className="sm:hidden">Demo</span>
        </button>

        {/* Full Reset */}
        <button
          onClick={resetAllData}
          className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-400 transition-colors border border-slate-200 shadow-xs"
          title="Reset all IndexedDB data & restart onboarding"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
