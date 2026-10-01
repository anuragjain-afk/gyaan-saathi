import { useState, useEffect } from 'react';
import { DemoBar } from './components/DemoBar';
import { AppHeader } from './components/AppHeader';
import { Navigation, NavTab } from './components/Navigation';
import { SyncCenterModal } from './components/SyncCenterModal';
import { Onboarding } from './pages/Onboarding';

import { Home } from './pages/Home';
import { Learn } from './pages/Learn';
import { AISaathi } from './pages/AISaathi';
import { Practice } from './pages/Practice';
import { CareerSaathi } from './pages/CareerSaathi';
import { ScholarshipSaathi } from './pages/ScholarshipSaathi';
import { Profile } from './pages/Profile';

import { SupportedLanguage } from './i18n/translations';
import { syncManager } from './services/syncManager';
import { db } from './db/indexedDB';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [lang, setLang] = useState<SupportedLanguage>('en');
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null); // null = loading
  const [studentName, setStudentName] = useState('Student');
  const [courseBadge, setCourseBadge] = useState('');

  useEffect(() => {
    // Register PWA Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(reg => console.log('[PWA] Service Worker registered:', reg.scope))
        .catch(err => console.warn('[PWA] Service Worker registration failed:', err));
    }

    // Check if profile exists in IndexedDB
    const checkProfile = async () => {
      const profile = await db.userProfile.get('current');
      if (profile) {
        setIsOnboarded(true);
        setStudentName(profile.name);
        setCourseBadge(`${profile.course} • Sem ${profile.semester}`);
        setLang(profile.language || 'en');
      } else {
        setIsOnboarded(false);
      }
    };

    checkProfile();
  }, []);

  useEffect(() => {
    const updatePendingCount = async () => {
      const summary = await syncManager.getSyncSummary();
      setPendingCount(summary.pendingCount);
    };

    updatePendingCount();
    window.addEventListener('gyaan-sync-updated', updatePendingCount);
    return () => window.removeEventListener('gyaan-sync-updated', updatePendingCount);
  }, []);

  const handleOnboardingComplete = async () => {
    const profile = await db.userProfile.get('current');
    if (profile) {
      setStudentName(profile.name);
      setCourseBadge(`${profile.course} • Sem ${profile.semester}`);
      setLang(profile.language || 'en');
    }
    setIsOnboarded(true);
  };

  // Loading state while checking IndexedDB
  if (isOnboarded === null) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center mx-auto animate-pulse shadow-md">
            <img src="/logo.svg" alt="Gyaan Saathi" className="w-8 h-8" />
          </div>
          <p className="text-xs text-slate-500 font-medium">Loading Gyaan Saathi...</p>
        </div>
      </div>
    );
  }

  // First-time user — show onboarding
  if (!isOnboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Hackathon Demo Controller Top Bar */}
      <DemoBar />

      {/* Main Layout Shell */}
      <div className="flex-1 flex overflow-hidden">
        {/* Responsive Desktop Sidebar Navigation */}
        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          lang={lang}
          pendingCount={pendingCount}
        />

        {/* Content Region */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Header Bar */}
          <AppHeader
            lang={lang}
            setLang={setLang}
            onOpenSyncCenter={() => setIsSyncModalOpen(true)}
            studentName={studentName}
            courseBadge={courseBadge}
          />

          {/* Main View Port */}
          <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto pb-24 md:pb-8">
            {activeTab === 'home' && (
              <Home
                setActiveTab={setActiveTab}
                lang={lang}
                onOpenSyncCenter={() => setIsSyncModalOpen(true)}
              />
            )}
            {activeTab === 'learn' && <Learn setActiveTab={setActiveTab} lang={lang} />}
            {activeTab === 'ai-saathi' && <AISaathi lang={lang} />}
            {activeTab === 'practice' && <Practice setActiveTab={setActiveTab} lang={lang} />}
            {activeTab === 'career' && <CareerSaathi setActiveTab={setActiveTab} />}
            {activeTab === 'scholarships' && <ScholarshipSaathi />}
            {activeTab === 'profile' && (
              <Profile
                lang={lang}
                setLang={setLang}
                onOpenSyncCenter={() => setIsSyncModalOpen(true)}
              />
            )}
          </main>
        </div>
      </div>

      {/* Sync Center Modal */}
      <SyncCenterModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}

export default App;
