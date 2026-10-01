import React, { useState, useEffect } from 'react';
import { BookOpen, Award, Bot, Flame, AlertTriangle, ArrowRight, WifiOff, CheckCircle2, DownloadCloud, Compass, GraduationCap } from 'lucide-react';
import { db } from '../db/indexedDB';
import { NavTab } from '../components/Navigation';
import { TRANSLATIONS, SupportedLanguage } from '../i18n/translations';
import { syncManager } from '../services/syncManager';

interface HomeProps {
  setActiveTab: (tab: NavTab) => void;
  lang: SupportedLanguage;
  onOpenSyncCenter: () => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab, lang, onOpenSyncCenter }) => {
  const [profileName, setProfileName] = useState('Rahul');
  const [courseBadge, setCourseBadge] = useState('BCA • Semester 1');
  const [weakTopic, setWeakTopic] = useState('Nested Loops');
  const [avgScore, setAvgScore] = useState(76);
  const [streakDays, setStreakDays] = useState(4);
  const [quickQuestion, setQuickQuestion] = useState('');
  const [isOnline, setIsOnline] = useState(true);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const loadRealData = async () => {
      const p = await db.userProfile.get('current');
      if (p) {
        setProfileName(p.name);
        setCourseBadge(`${p.course} • Semester ${p.semester}`);
        setStreakDays(p.streakDays || 4);
      }

      // Check quiz attempts for actual weak topics
      const attempts = await db.quizAttempts.toArray();
      if (attempts.length > 0) {
        const totalPct = attempts.reduce((acc, curr) => acc + curr.percentage, 0);
        setAvgScore(Math.round(totalPct / attempts.length));

        // Find recent weak topic
        const latestWeak = attempts[attempts.length - 1].weakTopics[0];
        if (latestWeak) {
          setWeakTopic(latestWeak);
        }
      }

      setIsOnline(syncManager.isOnline());
    };

    loadRealData();

    const handleNetChange = () => setIsOnline(syncManager.isOnline());
    window.addEventListener('gyaan-network-changed', handleNetChange);
    return () => window.removeEventListener('gyaan-network-changed', handleNetChange);
  }, []);

  const handleAskQuickDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickQuestion.trim()) return;
    // Store question in session/state and navigate to AI Saathi
    sessionStorage.setItem('gyaan_pending_ask', quickQuestion.trim());
    setActiveTab('ai-saathi');
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Welcome & Student Identity Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-600 via-sky-600 to-brand-700 border border-brand-500/30 shadow-md relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -z-0 pointer-events-none" />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-sm">
              {courseBadge}
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2 tracking-tight">
              Good morning, {profileName}
            </h1>
            <p className="text-xs md:text-sm text-sky-100 mt-1 max-w-xl">
              {t.learningContinues}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md p-3 rounded-xl border border-white/25">
            <div className="p-2 rounded-lg bg-white/20 text-amber-300">
              <Flame className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="text-lg font-black text-white leading-none">{streakDays} {t.days}</div>
              <div className="text-[11px] text-sky-100 font-medium">{t.streak}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Continue Learning Card */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-brand-50 border border-brand-100 text-brand-600">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">
                Active Course
              </span>
              <h2 className="text-xl font-bold text-slate-900">Python Fundamentals</h2>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {t.availableOffline} (1.8 MB)
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mb-5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-600">Course Progress</span>
            <span className="text-brand-600 font-bold">70% Complete</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div className="h-full bg-gradient-to-r from-brand-500 to-cyan-500 rounded-full transition-all duration-500 w-[70%]" />
          </div>
        </div>

        <button
          onClick={() => setActiveTab('learn')}
          className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-brand-600 hover:bg-brand-500 text-white shadow-sm flex items-center justify-center gap-2 transition-all"
        >
          <span>{t.continueLearning}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Analytics & Personalization Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Quiz Avg Score */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium mb-1">{t.quizScore}</div>
            <div className="text-3xl font-black text-emerald-600">{avgScore}%</div>
            <div className="text-[11px] text-slate-400 mt-1">Based on latest attempt</div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600">
            <Award className="w-7 h-7" />
          </div>
        </div>

        {/* Streak Stat */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium mb-1">{t.streak}</div>
            <div className="text-3xl font-black text-amber-600">{streakDays} Days</div>
            <div className="text-[11px] text-slate-400 mt-1">Keep studying daily</div>
          </div>
          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600">
            <Flame className="w-7 h-7" />
          </div>
        </div>

        {/* Weak Topic & Revision CTA */}
        <div className="p-5 rounded-2xl bg-white border border-amber-300 shadow-sm flex flex-col justify-between space-y-3">
          <div>
            <div className="text-xs text-amber-700 font-bold flex items-center gap-1.5 mb-1">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              {t.weakTopic}
            </div>
            <div className="text-lg font-bold text-slate-900">{weakTopic}</div>
            <p className="text-[11px] text-slate-500">Identified from Python Loops Quiz</p>
          </div>
          <button
            onClick={() => setActiveTab('practice')}
            className="w-full py-2 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-500 text-amber-950 flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <span>{t.practiceNow}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* AI Saathi Quick Doubt Launcher */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">AI Saathi Learning Companion</h3>
            <p className="text-xs text-slate-500">{t.askDoubt}</p>
          </div>
        </div>

        <form onSubmit={handleAskQuickDoubt} className="flex gap-2">
          <input
            type="text"
            value={quickQuestion}
            onChange={(e) => setQuickQuestion(e.target.value)}
            placeholder={t.typeQuestion}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white transition-colors"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-all shadow-sm shrink-0"
          >
            {t.askAI}
          </button>
        </form>
      </div>

      {/* Quick Access Navigation Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveTab('learn')}
          className="p-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-left transition-all group shadow-sm"
        >
          <DownloadCloud className="w-5 h-5 text-brand-600 mb-2 group-hover:scale-110 transition-transform" />
          <div className="font-bold text-xs text-slate-900">Learn Offline</div>
          <div className="text-[10px] text-slate-500">Cached Lessons</div>
        </button>

        <button
          onClick={() => setActiveTab('practice')}
          className="p-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-left transition-all group shadow-sm"
        >
          <Award className="w-5 h-5 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
          <div className="font-bold text-xs text-slate-900">Practice Quizzes</div>
          <div className="text-[10px] text-slate-500">Test Knowledge</div>
        </button>

        <button
          onClick={() => setActiveTab('career')}
          className="p-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-left transition-all group shadow-sm"
        >
          <Compass className="w-5 h-5 text-cyan-600 mb-2 group-hover:scale-110 transition-transform" />
          <div className="font-bold text-xs text-slate-900">Career Saathi</div>
          <div className="text-[10px] text-slate-500">Pathways & Roles</div>
        </button>

        <button
          onClick={() => setActiveTab('scholarships')}
          className="p-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-left transition-all group shadow-sm"
        >
          <GraduationCap className="w-5 h-5 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
          <div className="font-bold text-xs text-slate-900">Scholarships</div>
          <div className="text-[10px] text-slate-500">Grants & Eligibility</div>
        </button>
      </div>

      {/* Connection Status Footer Notice */}
      <div
        onClick={onOpenSyncCenter}
        className={`p-4 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all shadow-sm ${
          isOnline
            ? 'bg-white border-slate-200 hover:border-emerald-400'
            : 'bg-amber-50 border-amber-300 hover:border-amber-400'
        }`}
      >
        <div className="flex items-center gap-3">
          {isOnline ? (
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          ) : (
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700 animate-pulse border border-amber-200">
              <WifiOff className="w-5 h-5" />
            </div>
          )}
          <div>
            <div className="font-bold text-xs text-slate-800">
              {isOnline ? `● ${t.online} — All synced` : `● ${t.offlineMode}`}
            </div>
            <div className="text-[11px] text-slate-500">{t.pendingSyncText}</div>
          </div>
        </div>
        <span className="text-xs font-bold text-brand-600 hover:text-brand-700 underline">View Sync Center</span>
      </div>
    </div>
  );
};
