import React, { useState } from 'react';
import { BookOpen, GraduationCap, Globe, Sparkles, ArrowRight, User } from 'lucide-react';
import { db } from '../db/indexedDB';
import { INITIAL_COURSES, PYTHON_LESSONS, PYTHON_LOOP_QUIZ_QUESTIONS } from '../data/coursesData';

interface OnboardingProps {
  onComplete: () => void;
}

const COURSE_OPTIONS = ['BCA', 'BSc CS', 'BSc IT', 'BA', 'B.Com', 'B.Tech', 'Diploma', 'Other'];
const SEMESTER_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];
const INTEREST_OPTIONS = [
  'Programming', 'Web Development', 'Data Science', 'Cybersecurity',
  'Mobile Apps', 'Artificial Intelligence', 'Mathematics', 'Science', 'Business'
];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('BCA');
  const [semester, setSemester] = useState(1);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Programming']);
  const [isCreating, setIsCreating] = useState(false);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleComplete = async () => {
    if (!name.trim()) return;
    setIsCreating(true);

    try {
      // Save profile to IndexedDB
      await db.userProfile.put({
        id: 'current',
        name: name.trim(),
        course,
        semester,
        language,
        interests: selectedInterests,
        streakDays: 1,
        lastActiveDate: new Date().toISOString(),
      });

      // Seed demo course data if not already present
      for (const c of INITIAL_COURSES) {
        const existing = await db.courses.get(c.id);
        if (!existing) await db.courses.put(c);
      }
      for (const l of PYTHON_LESSONS) {
        const existing = await db.lessons.get(l.id);
        if (!existing) await db.lessons.put(l);
      }
      for (const q of PYTHON_LOOP_QUIZ_QUESTIONS) {
        const existing = await db.quizzes.get(q.id);
        if (!existing) await db.quizzes.put(q);
      }

      onComplete();
    } catch (err) {
      console.error('Onboarding save error:', err);
      onComplete(); // Still proceed
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      {/* Glow background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo + Brand */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-600 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-500/20">
            <img src="/logo.svg" alt="Gyaan Saathi" className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">GYAAN SAATHI</h1>
          <p className="text-sm text-brand-600 font-semibold mt-1">Your AI Companion for Learning & Growth</p>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[0, 1, 2].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === step ? 'w-8 bg-brand-600' : s < step ? 'w-4 bg-brand-400' : 'w-4 bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl space-y-6">

          {/* Step 0: Welcome & Name */}
          {step === 0 && (
            <div className="space-y-5">
              <div>
                <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">Step 1 of 3</span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">Welcome! Let's set up your profile.</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Gyaan Saathi is built for students like you — learning from rural India. No internet? No problem.
                </p>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-700">
                  <User className="w-3.5 h-3.5 inline mr-1.5 text-brand-600" />
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white transition-colors text-sm"
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">
                  <Globe className="w-3.5 h-3.5 inline mr-1.5 text-brand-600" />
                  Preferred Language for AI Answers
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['en', 'hi'] as const).map(l => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setLanguage(l)}
                      className={`py-2.5 rounded-xl text-sm font-bold transition-all ${
                        language === l
                          ? 'bg-brand-600 text-white shadow-xs'
                          : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {l === 'en' ? '🇬🇧 English' : '🇮🇳 हिन्दी'}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => name.trim() && setStep(1)}
                disabled={!name.trim()}
                className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-40 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 1: Course & Semester */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">Step 2 of 3</span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">What are you studying?</h2>
                <p className="text-xs text-slate-500 mt-1">
                  This helps AI Saathi give course-specific answers.
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">
                  <GraduationCap className="w-3.5 h-3.5 inline mr-1.5 text-brand-600" />
                  Degree / Diploma Course
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {COURSE_OPTIONS.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCourse(c)}
                      className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                        course === c
                          ? 'bg-brand-600 text-white shadow-xs'
                          : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">Current Semester</label>
                <div className="grid grid-cols-4 gap-2">
                  {SEMESTER_OPTIONS.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSemester(s)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        semester === s
                          ? 'bg-brand-600 text-white shadow-xs'
                          : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Sem {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(0)}
                  className="flex-1 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors shadow-xs"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Interests */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">Step 3 of 3</span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">What are your interests?</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Select topics you're curious about. Career Saathi will suggest matching pathways.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {INTEREST_OPTIONS.map(interest => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`py-2 px-1 rounded-xl text-[11px] font-semibold transition-all leading-tight ${
                      selectedInterests.includes(interest)
                        ? 'bg-sky-50 text-sky-800 border border-sky-300 shadow-xs'
                        : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>

              {/* Summary Card */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Profile Summary
                </div>
                <div className="text-slate-600 space-y-0.5">
                  <div>👤 <span className="text-slate-900 font-semibold">{name}</span></div>
                  <div>📚 <span className="text-slate-900 font-semibold">{course} • Semester {semester}</span></div>
                  <div>🌐 <span className="text-slate-900 font-semibold">{language === 'hi' ? 'हिन्दी (Hindi)' : 'English'}</span></div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors shadow-xs"
                >
                  ← Back
                </button>
                <button
                  onClick={handleComplete}
                  disabled={isCreating || selectedInterests.length === 0}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  {isCreating ? (
                    <span>Setting up...</span>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4" />
                      <span>Start Learning!</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Digital Inclusion for Rural Higher Education · Gyaan Saathi v1.0
        </p>
      </div>
    </div>
  );
};
