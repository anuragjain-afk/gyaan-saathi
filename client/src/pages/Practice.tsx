import React, { useState, useEffect } from 'react';
import { Award, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, Sparkles, BookOpen } from 'lucide-react';
import { db, QuizQuestionRecord } from '../db/indexedDB';
import { PYTHON_LOOP_QUIZ_QUESTIONS } from '../data/coursesData';
import { syncManager } from '../services/syncManager';
import { NavTab } from '../components/Navigation';
import { TRANSLATIONS, SupportedLanguage } from '../i18n/translations';

interface PracticeProps {
  setActiveTab: (tab: NavTab) => void;
  lang: SupportedLanguage;
}

export const Practice: React.FC<PracticeProps> = ({ setActiveTab, lang }) => {
  const [questions, setQuestions] = useState<QuizQuestionRecord[]>(PYTHON_LOOP_QUIZ_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState<{
    score: number;
    total: number;
    percentage: number;
    weakTopics: string[];
    strongTopics: string[];
  } | null>(null);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const loadQuizData = async () => {
      const storedQuizzes = await db.quizzes.where('courseId').equals('python-fundamentals').toArray();
      if (storedQuizzes.length > 0) {
        setQuestions(storedQuizzes);
      } else {
        for (const q of PYTHON_LOOP_QUIZ_QUESTIONS) {
          await db.quizzes.put(q);
        }
      }
    };
    loadQuizData();
  }, []);

  const handleSelectOption = (questionIdx: number, optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedOptions((prev) => ({ ...prev, [questionIdx]: optionIdx }));
  };

  const handleFinishQuiz = async () => {
    let score = 0;
    const weakMap: Record<string, { correct: number; total: number }> = {};

    questions.forEach((q, idx) => {
      const selected = selectedOptions[idx];
      const isCorrect = selected === q.correctOptionIndex;
      if (isCorrect) score++;

      const tag = q.topicTag || 'loops';
      if (!weakMap[tag]) weakMap[tag] = { correct: 0, total: 0 };
      weakMap[tag].total += 1;
      if (isCorrect) weakMap[tag].correct += 1;
    });

    const total = questions.length;
    const percentage = Math.round((score / total) * 100);

    const weakTopics: string[] = [];
    const strongTopics: string[] = [];

    Object.entries(weakMap).forEach(([tag, stat]) => {
      const pct = (stat.correct / stat.total) * 100;
      const formattedName = tag === 'nested-loops' ? 'Nested Loops' : tag.charAt(0).toUpperCase() + tag.slice(1);
      if (pct < 75) {
        weakTopics.push(formattedName);
      } else {
        strongTopics.push(formattedName);
      }
    });

    if (weakTopics.length === 0 && percentage < 80) {
      weakTopics.push('Nested Loops');
    }

    const result = { score, total, percentage, weakTopics, strongTopics };
    setQuizResult(result);
    setIsSubmitted(true);

    // Save locally in IndexedDB quizAttempts
    await db.quizAttempts.add({
      courseId: 'python-fundamentals',
      lessonId: 'py-04-loops',
      score,
      totalQuestions: total,
      percentage,
      weakTopics,
      strongTopics,
      completedAt: new Date().toISOString(),
      synced: syncManager.isOnline()
    });

    // Update topic scores engine
    for (const tag of Object.keys(weakMap)) {
      const stat = weakMap[tag];
      const pct = Math.round((stat.correct / stat.total) * 100);
      const name = tag === 'nested-loops' ? 'Nested Loops' : tag.charAt(0).toUpperCase() + tag.slice(1);
      await db.topicScores.put({
        topicTag: tag,
        topicName: name,
        attempts: 1,
        totalQuestions: stat.total,
        totalCorrect: stat.correct,
        scorePercentage: pct,
        needsPractice: pct < 75,
        lastUpdated: new Date().toISOString()
      });
    }

    // Queue sync operation if offline
    if (!syncManager.isOnline()) {
      await syncManager.queueOperation('QUIZ_SUBMIT', {
        courseId: 'python-fundamentals',
        lessonId: 'py-04-loops',
        score,
        totalQuestions: total,
        weakTopics,
        strongTopics
      });
    }
  };

  const handleRetakeQuiz = () => {
    setSelectedOptions({});
    setCurrentIndex(0);
    setIsSubmitted(false);
    setQuizResult(null);
  };

  const currentQ = questions[currentIndex];

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">{t.navPractice}</h1>
            <p className="text-xs text-slate-500">Python Loops & Nested Loops Knowledge Check</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-50 text-slate-700 border border-slate-200">
          5 Questions
        </span>
      </div>

      {/* Quiz Result View */}
      {isSubmitted && quizResult ? (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xl space-y-6 animate-scale-up">
          {/* Top Score Summary Card */}
          <div className="text-center p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">Quiz Results</span>
            <div className="text-4xl md:text-5xl font-black text-emerald-600 tracking-tight">
              {quizResult.score} / {quizResult.total}
            </div>
            <div className="text-lg font-extrabold text-slate-900">{quizResult.percentage}% Score</div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Your quiz attempt has been stored locally in IndexedDB and scheduled for server synchronization.
            </p>
          </div>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strong Topics */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Strong Topics
              </h3>
              <ul className="space-y-1 text-xs text-slate-700">
                {quizResult.strongTopics.length > 0 ? (
                  quizResult.strongTopics.map((st, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span className="font-medium">{st}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-slate-500">Keep practicing to build strong topics!</li>
                )}
              </ul>
            </div>

            {/* Weak Topics */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Needs Practice
              </h3>
              <ul className="space-y-1 text-xs text-slate-700">
                {quizResult.weakTopics.map((wt, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-amber-600 font-bold">⚠</span>
                    <span className="font-semibold text-slate-900">{wt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommended Learning Action Card */}
          {quizResult.weakTopics.length > 0 && (
            <div className="p-5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 flex flex-wrap items-center justify-between gap-4 shadow-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Recommended Revision
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-0.5">
                  Practice "{quizResult.weakTopics[0]}" Lesson & AI Explanation
                </h4>
                <p className="text-xs text-slate-600">Review lesson 04 code snippets and matrix loop execution.</p>
              </div>

              <button
                onClick={() => setActiveTab('learn')}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-500 text-amber-950 flex items-center gap-1.5 transition-all shadow-xs shrink-0"
              >
                <BookOpen className="w-4 h-4" />
                <span>Start Practice</span>
              </button>
            </div>
          )}

          {/* Retake Button */}
          <div className="flex justify-center pt-2">
            <button
              onClick={handleRetakeQuiz}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-2 transition-colors border border-slate-200 shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
          </div>
        </div>
      ) : (
        /* Quiz Active Question Card */
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span className="font-bold text-brand-600 uppercase tracking-wider">{currentQ.topicTag}</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className="h-full bg-brand-500 transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug whitespace-pre-line">
              {currentQ.question}
            </h2>
          </div>

          {/* Multiple Choice Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((optionText, oIdx) => {
              const isSelected = selectedOptions[currentIndex] === oIdx;
              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(currentIndex, oIdx)}
                  className={`w-full p-4 rounded-xl text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between border ${
                    isSelected
                      ? 'bg-brand-50 border-brand-500 text-brand-950 font-semibold shadow-xs ring-1 ring-brand-500/30'
                      : 'bg-slate-50/70 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isSelected ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span>{optionText}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-5">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 disabled:opacity-40 transition-colors shadow-xs"
            >
              Previous
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                disabled={selectedOptions[currentIndex] === undefined}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white disabled:opacity-40 transition-colors shadow-sm"
              >
                Next Question →
              </button>
            ) : (
              <button
                onClick={handleFinishQuiz}
                disabled={Object.keys(selectedOptions).length < questions.length}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-40 transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>Submit Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
