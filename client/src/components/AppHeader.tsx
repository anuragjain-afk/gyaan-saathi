import React, { useState, useRef, useEffect } from 'react';
import { Languages, ShieldCheck, ChevronDown, Check } from 'lucide-react';
import { ConnectionStatus } from './ConnectionStatus';
import { SupportedLanguage, LANGUAGE_OPTIONS } from '../i18n/translations';

interface AppHeaderProps {
  lang: SupportedLanguage;
  setLang: (lang: SupportedLanguage) => void;
  onOpenSyncCenter: () => void;
  studentName?: string;
  courseBadge?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  lang,
  setLang,
  onOpenSyncCenter,
  studentName = 'Rahul',
  courseBadge = 'BCA • Sem 1'
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGE_OPTIONS.find(o => o.code === lang) ?? LANGUAGE_OPTIONS[0];

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSelect = (code: SupportedLanguage) => {
    setLang(code);
    setDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between gap-4 shadow-xs">
      {/* Mobile Branding / Student Tag */}
      <div className="flex items-center gap-3">
        <div className="md:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center shadow-md">
            <img src="/logo.svg" alt="Gyaan Saathi" className="w-5 h-5" />
          </div>
          <span className="font-bold text-sm text-slate-900 tracking-tight">GYAAN SAATHI</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200 text-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
          <span className="font-semibold text-slate-800">{studentName}</span>
          <span className="text-slate-400">•</span>
          <span className="text-brand-600 font-semibold">{courseBadge}</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">

        {/* Language Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            id="language-switcher-btn"
            onClick={() => setDropdownOpen(prev => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
            title="Switch UI Language / भाषा बदलें"
          >
            <Languages className="w-3.5 h-3.5 text-brand-600" />
            <span className="hidden sm:inline">{currentLang.nativeLabel}</span>
            <span className="sm:hidden">{currentLang.flag}</span>
            <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              role="listbox"
              aria-label="Select Language"
            >
              {/* Header */}
              <div className="px-3 py-2 border-b border-slate-100 flex items-center gap-2">
                <Languages className="w-3.5 h-3.5 text-brand-500" />
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Select Language</span>
              </div>

              {/* Language list - scrollable */}
              <div className="max-h-72 overflow-y-auto py-1">
                {LANGUAGE_OPTIONS.map(option => {
                  const isSelected = lang === option.code;
                  return (
                    <button
                      key={option.code}
                      id={`lang-option-${option.code}`}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(option.code)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 text-sm transition-colors ${
                        isSelected
                          ? 'bg-brand-50 text-brand-700'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base leading-none">{option.flag}</span>
                        <div className="text-left">
                          <div className={`text-xs font-semibold leading-tight ${isSelected ? 'text-brand-700' : 'text-slate-800'}`}>
                            {option.nativeLabel}
                          </div>
                          <div className="text-[10px] text-slate-400 leading-tight mt-0.5">
                            {option.label}
                          </div>
                        </div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-brand-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Connection Status Pill */}
        <ConnectionStatus lang={lang} onOpenSyncCenter={onOpenSyncCenter} />
      </div>
    </header>
  );
};
