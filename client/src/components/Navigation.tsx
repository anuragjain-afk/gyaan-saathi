import React from 'react';
import { Home, BookOpen, Bot, Award, Compass, GraduationCap, User } from 'lucide-react';
import { TRANSLATIONS, SupportedLanguage } from '../i18n/translations';

export type NavTab = 'home' | 'learn' | 'ai-saathi' | 'practice' | 'career' | 'scholarships' | 'profile';

interface NavigationProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  lang: SupportedLanguage;
  pendingCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, lang, pendingCount = 0 }) => {
  const t = TRANSLATIONS[lang];

  const navItems: Array<{ id: NavTab; label: string; icon: React.FC<any>; badge?: number }> = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'learn', label: t.navLearn, icon: BookOpen },
    { id: 'ai-saathi', label: t.navAISaathi, icon: Bot, badge: pendingCount > 0 ? pendingCount : undefined },
    { id: 'practice', label: t.navPractice, icon: Award },
    { id: 'career', label: t.navCareer, icon: Compass },
    { id: 'scholarships', label: t.navScholarships, icon: GraduationCap },
    { id: 'profile', label: t.navProfile, icon: User }
  ];

  return (
    <>
      {/* Desktop Sidebar (>= 768px) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 p-4 shrink-0 min-h-screen shadow-sm">
        <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-500 flex items-center justify-center shadow-md shadow-brand-500/20">
            <img src="/logo.svg" alt="Gyaan Saathi" className="w-7 h-7" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-slate-900 tracking-tight leading-none">
              GYAAN SAATHI
            </h1>
            <p className="text-[11px] text-brand-600 font-semibold mt-1">AI Companion for Learning</p>
          </div>
        </div>

        <nav className="space-y-1.5 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-amber-950">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-2">
          <div className="flex items-center gap-2 text-emerald-600 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Offline-First Engine</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-500">
            IndexedDB caching active. Learning continues offline seamlessly.
          </p>
        </div>
      </aside>

      {/* Mobile Bottom Navigation (< 768px) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[10px] font-medium transition-all relative ${
                isActive ? 'text-brand-600 font-bold scale-105' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-amber-400 text-amber-950">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="truncate max-w-[55px] text-[10px]">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
