import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle2, DownloadCloud, ChevronRight, ArrowLeft, Bot, Award, Code, Check } from 'lucide-react';
import { db, CourseRecord, LessonRecord } from '../db/indexedDB';
import { INITIAL_COURSES, PYTHON_LESSONS } from '../data/coursesData';
import { NavTab } from '../components/Navigation';
import { TRANSLATIONS, SupportedLanguage } from '../i18n/translations';

interface LearnProps {
  setActiveTab: (tab: NavTab) => void;
  lang: SupportedLanguage;
}

export const Learn: React.FC<LearnProps> = ({ setActiveTab, lang }) => {
  const [courses, setCourses] = useState<CourseRecord[]>(INITIAL_COURSES);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>('python-fundamentals');
  const [lessons, setLessons] = useState<LessonRecord[]>(PYTHON_LESSONS);
  const [activeLessonId, setActiveLessonId] = useState<string | null>('py-04-loops');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<number | null>(null);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const initStorage = async () => {
      // Seed IndexedDB with initial demo course & lessons if empty
      const existingCourses = await db.courses.toArray();
      if (existingCourses.length === 0) {
        for (const c of INITIAL_COURSES) {
          await db.courses.put(c);
        }
        for (const l of PYTHON_LESSONS) {
          await db.lessons.put(l);
        }
      } else {
        setCourses(existingCourses);
      }

      const storedLessons = await db.lessons.where('courseId').equals('python-fundamentals').toArray();
      if (storedLessons.length > 0) {
        setLessons(storedLessons.sort((a, b) => a.order - b.order));
      }
    };

    initStorage();
  }, []);

  const handleDownloadCourse = async (courseId: string) => {
    setDownloadingId(courseId);
    
    // Simulate caching delay
    setTimeout(async () => {
      await db.courses.update(courseId, {
        isDownloaded: true,
        downloadedAt: new Date().toISOString()
      });

      const updated = await db.courses.toArray();
      setCourses(updated);
      setDownloadingId(null);
    }, 800);
  };

  const activeLesson = lessons.find((l) => l.id === activeLessonId) || lessons[0];
  const activeLessonIndex = lessons.findIndex((l) => l.id === activeLessonId);

  const handleAskAIAboutLesson = () => {
    sessionStorage.setItem('gyaan_pending_ask', `Explain ${activeLesson.title} in simple terms with code examples.`);
    setActiveTab('ai-saathi');
  };

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetIndex(idx);
    setTimeout(() => setCopiedSnippetIndex(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{t.navLearn}</h1>
          <p className="text-xs text-slate-500">Offline-first course library & interactive lessons</p>
        </div>

        {selectedCourseId && (
          <button
            onClick={() => setSelectedCourseId(null)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-xs flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Course Library</span>
          </button>
        )}
      </div>

      {/* Course Selection View (if no course selected) */}
      {!selectedCourseId ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-brand-400 flex flex-col justify-between space-y-4 transition-all shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-50 text-brand-700 border border-brand-200">
                    {course.category}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">{course.level}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1">{course.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">{course.description}</p>

                <div className="text-[11px] text-slate-400 flex items-center gap-2">
                  <span>{course.totalLessons} Lessons</span>
                  <span>•</span>
                  <span>Est Size: {course.downloadSizeMB} MB</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                {course.isDownloaded ? (
                  <div className="flex items-center justify-between text-xs text-emerald-700 font-bold px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      {t.availableOffline}
                    </span>
                    <span className="text-[10px] text-emerald-600">Cached</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleDownloadCourse(course.id)}
                    disabled={downloadingId === course.id}
                    className="w-full py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <DownloadCloud className="w-4 h-4" />
                    {downloadingId === course.id ? t.downloading : `${t.downloadOffline} (${course.downloadSizeMB} MB)`}
                  </button>
                )}

                <button
                  onClick={() => setSelectedCourseId(course.id)}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center gap-1 transition-colors"
                >
                  <span>Open Lessons</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Course Lesson Viewer Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Lessons Table of Contents Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-brand-600" />
                  Lessons Table of Contents
                </h3>
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Offline
                </span>
              </div>

              <div className="space-y-1.5">
                {lessons.map((lesson, idx) => {
                  const isActive = lesson.id === activeLessonId;
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLessonId(lesson.id)}
                      className={`w-full p-3 rounded-xl text-left text-xs font-medium transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-brand-600 text-white font-bold shadow-sm'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                            isActive ? 'bg-white text-brand-600' : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span className="truncate">{lesson.title}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Detailed Lesson Main Display (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              {/* Lesson Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600">
                    Lesson {activeLessonIndex + 1} of {lessons.length}
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 mt-1">{activeLesson.title}</h2>
                  <p className="text-xs text-slate-500 mt-1">{activeLesson.shortDescription}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAskAIAboutLesson}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200 hover:bg-brand-100 flex items-center gap-1.5 transition-colors"
                  >
                    <Bot className="w-4 h-4 text-brand-600" />
                    <span>{t.askAI}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('practice')}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-500 text-amber-950 flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Award className="w-4 h-4" />
                    <span>Take Quiz</span>
                  </button>
                </div>
              </div>

              {/* Lesson Body Content */}
              <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
                <div dangerouslySetInnerHTML={{ __html: formatMarkdownToHTML(activeLesson.contentMarkdown) }} />
              </div>

              {/* Code Snippets Block */}
              {activeLesson.codeSnippets && activeLesson.codeSnippets.length > 0 && (
                <div className="space-y-4 pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <Code className="w-4 h-4 text-brand-600" />
                    Interactive Code Examples
                  </h3>

                  {activeLesson.codeSnippets.map((snippet, sIdx) => (
                    <div key={sIdx} className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-sm">
                      <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-200">{snippet.title}</span>
                        <button
                          onClick={() => handleCopyCode(snippet.code, sIdx)}
                          className="px-2.5 py-1 rounded text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 transition-colors"
                        >
                          {copiedSnippetIndex === sIdx ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <span>Copy Code</span>
                          )}
                        </button>
                      </div>

                      <pre className="p-4 text-xs font-mono text-cyan-300 bg-slate-950 overflow-x-auto">
                        <code>{snippet.code}</code>
                      </pre>

                      {snippet.output && (
                        <div className="p-3 bg-slate-900/90 border-t border-slate-800 text-xs">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Expected Output:
                          </span>
                          <pre className="font-mono text-slate-300 text-[11px]">{snippet.output}</pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Key Takeaways Box */}
              {activeLesson.keyPoints && (
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2">
                  <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider">Key Takeaways</h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {activeLesson.keyPoints.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-brand-600 font-bold">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Lesson Footer Navigation Controls */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-5">
                <button
                  onClick={() => {
                    if (activeLessonIndex > 0) {
                      setActiveLessonId(lessons[activeLessonIndex - 1].id);
                    }
                  }}
                  disabled={activeLessonIndex === 0}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors shadow-xs"
                >
                  ← Previous Lesson
                </button>

                <span className="text-xs text-slate-500 font-medium">
                  {activeLessonIndex + 1} / {lessons.length}
                </span>

                <button
                  onClick={() => {
                    if (activeLessonIndex < lessons.length - 1) {
                      setActiveLessonId(lessons[activeLessonIndex + 1].id);
                    }
                  }}
                  disabled={activeLessonIndex === lessons.length - 1}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white disabled:opacity-40 transition-colors shadow-sm"
                >
                  Next Lesson →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper for basic markdown rendering
function formatMarkdownToHTML(markdown: string): string {
  let html = markdown
    .replace(/^# (.*$)/gim, '<h1 class="text-xl font-bold text-slate-900 mb-2">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold text-brand-700 mt-4 mb-2">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-sm font-bold text-amber-800 mt-3 mb-1">$1</h3>')
    .replace(/\*\*(.*)\*\*/gim, '<strong class="text-slate-900">$1</strong>')
    .replace(/`(.*?)`/gim, '<code class="px-1.5 py-0.5 rounded bg-slate-100 text-brand-700 text-xs font-mono border border-slate-200">$1</code>')
    .replace(/\n/g, '<br/>');
  return html;
}
