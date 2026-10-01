import React, { useState, useEffect } from 'react';
import { User, BookOpen, Award, Flame, RefreshCw, Trash2, Save, CheckCircle2, ShieldCheck } from 'lucide-react';
import { db, UserProfileRecord } from '../db/indexedDB';
import { syncManager } from '../services/syncManager';
import { SupportedLanguage } from '../i18n/translations';

interface ProfileProps {
  lang: SupportedLanguage;
  setLang: (lang: SupportedLanguage) => void;
  onOpenSyncCenter: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ lang, setLang, onOpenSyncCenter }) => {
  const [name, setName] = useState('Rahul Kumar');
  const [course, setCourse] = useState('BCA');
  const [semester, setSemester] = useState<number>(1);
  const [interests, setInterests] = useState('Programming, Web Development');
  const [isSaved, setIsSaved] = useState(false);
  const [syncCount, setSyncCount] = useState(0);

  useEffect(() => {
    const loadProfile = async () => {
      const p = await db.userProfile.get('current');
      if (p) {
        setName(p.name);
        setCourse(p.course);
        setSemester(p.semester);
        setInterests(p.interests ? p.interests.join(', ') : 'Programming, Web Development');
      }
      const summary = await syncManager.getSyncSummary();
      setSyncCount(summary.pendingCount);
    };
    loadProfile();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const arrInterests = interests.split(',').map((s) => s.trim()).filter(Boolean);
    const updated: UserProfileRecord = {
      id: 'current',
      name,
      course,
      semester,
      language: lang,
      interests: arrInterests,
      streakDays: 4,
      lastActiveDate: new Date().toISOString()
    };

    await db.userProfile.put(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);

    // Queue profile update sync operation if offline
    if (!syncManager.isOnline()) {
      await syncManager.queueOperation('PROFILE_UPDATE', updated);
    }
  };

  const handleClearOfflineData = async () => {
    if (window.confirm('Are you sure you want to clear offline cache and pending sync logs?')) {
      await db.syncQueue.clear();
      await db.aiHistory.clear();
      await db.quizAttempts.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-brand-50 text-brand-600 border border-brand-100">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Student Profile</h1>
            <p className="text-xs text-slate-500">Manage learning preferences & IndexedDB storage</p>
          </div>
        </div>

        <button
          onClick={onOpenSyncCenter}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center gap-2 shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5 text-brand-600" />
          <span>Pending Sync ({syncCount})</span>
        </button>
      </div>

      {/* Main Profile Form & Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Form Editor (7 cols) */}
        <div className="md:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-600" />
            Edit Profile Details
          </h2>

          {isSaved && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Profile updated and saved to local IndexedDB!</span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Student Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Degree Course</label>
                <input
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Semester</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white"
                >
                  <option value={1}>Semester 1</option>
                  <option value={2}>Semester 2</option>
                  <option value={3}>Semester 3</option>
                  <option value={4}>Semester 4</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Preferred UI Language</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`flex-1 py-2 rounded-xl font-bold transition-all ${
                    lang === 'en'
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLang('hi')}
                  className={`flex-1 py-2 rounded-xl font-bold transition-all ${
                    lang === 'hi'
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  हिन्दी (Hindi)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Interests (Comma separated)</label>
              <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </form>
        </div>

        {/* Right Column: Storage & System Controls (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">Offline Caching Engine</h3>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500">Course Download Status</span>
                <span className="text-emerald-700 font-bold">Python (1.8 MB Cached)</span>
              </div>

              <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500">Database Engine</span>
                <span className="text-cyan-700 font-bold">IndexedDB (Dexie)</span>
              </div>

              <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500">Service Worker</span>
                <span className="text-emerald-700 font-bold">PWA Active</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700">Maintenance & Clear Cache</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Clear IndexedDB offline records if you wish to reset demo attempts or re-synchronize clean state.
            </p>
            <button
              onClick={handleClearOfflineData}
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Offline Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
