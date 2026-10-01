import React, { useState, useEffect, useRef } from 'react';
import { Bot, Mic, MicOff, Send, Volume2, VolumeX, Sparkles, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { aiService } from '../services/aiService';
import { voiceService } from '../services/voiceService';
import { syncManager } from '../services/syncManager';
import { AIHistoryRecord } from '../db/indexedDB';
import { TRANSLATIONS, SupportedLanguage } from '../i18n/translations';

interface AISaathiProps {
  lang: SupportedLanguage;
}

export const AISaathi: React.FC<AISaathiProps> = ({ lang }) => {
  const [question, setQuestion] = useState('');
  const [history, setHistory] = useState<AIHistoryRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [speakingQueryId, setSpeakingQueryId] = useState<string | null>(null);
  const [simplerMode, setSimplerMode] = useState<Record<string, boolean>>({});
  const [hindiToggleMap, setHindiToggleMap] = useState<Record<string, boolean>>({});
  const [isOnline, setIsOnline] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];

  const suggestedQuestions = [
    "What is a nested loop?",
    "Explain for loops with an example.",
    "Explain nested loops in simple Hindi.",
    "What is the difference between inner and outer loops?"
  ];

  const loadHistory = async () => {
    const records = await aiService.getHistory();
    setHistory(records);
    setIsOnline(syncManager.isOnline());
  };

  useEffect(() => {
    loadHistory();

    // Check for pending question passed from Home or Learn page via sessionStorage
    const pending = sessionStorage.getItem('gyaan_pending_ask');
    if (pending) {
      setQuestion(pending);
      sessionStorage.removeItem('gyaan_pending_ask');
    }

    const handleSync = () => loadHistory();
    const handleNet = () => setIsOnline(syncManager.isOnline());

    window.addEventListener('gyaan-sync-updated', handleSync);
    window.addEventListener('gyaan-network-changed', handleNet);

    return () => {
      window.removeEventListener('gyaan-sync-updated', handleSync);
      window.removeEventListener('gyaan-network-changed', handleNet);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, loading]);

  const handleSubmit = async (qToSubmit?: string) => {
    const textToAsk = qToSubmit || question;
    if (!textToAsk.trim() || loading) return;

    setLoading(true);
    setQuestion('');
    setVoiceError(null);

    await aiService.askQuestion(textToAsk);
    await loadHistory();
    setLoading(false);
  };

  const handleVoiceInput = () => {
    setVoiceError(null);

    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
      return;
    }

    const started = voiceService.startListening(
      (res) => {
        setQuestion(res.text);
        if (res.isFinal) {
          setIsListening(false);
        }
      },
      (err) => {
        setVoiceError(err);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      },
      lang
    );

    if (started) {
      setIsListening(true);
    }
  };

  const handleSpeechOutput = (record: AIHistoryRecord) => {
    if (speakingQueryId === record.queryId) {
      voiceService.stopSpeaking();
      setSpeakingQueryId(null);
      return;
    }

    const showHindi = hindiToggleMap[record.queryId];
    const textToSpeak = showHindi && record.hindiAnswer ? record.hindiAnswer : record.answer || '';
    const speakLang = showHindi ? 'hi' : 'en';

    setSpeakingQueryId(record.queryId);
    voiceService.speak(textToSpeak, speakLang, () => setSpeakingQueryId(null));
  };

  const toggleHindiView = (queryId: string) => {
    setHindiToggleMap((prev) => ({ ...prev, [queryId]: !prev[queryId] }));
  };

  const toggleSimplerView = (queryId: string) => {
    setSimplerMode((prev) => ({ ...prev, [queryId]: !prev[queryId] }));
  };

  return (
    <div className="space-y-5 pb-16 animate-fade-in flex flex-col h-[calc(100vh-140px)]">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-4 shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-brand-50 border border-brand-100 text-brand-600">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              AI Saathi
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                Course-Aware RAG
              </span>
            </h1>
            <p className="text-xs text-slate-500">Your grounded academic tutor for Python Fundamentals</p>
          </div>
        </div>

        {!isOnline && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Offline Queue Ready</span>
          </div>
        )}
      </div>

      {/* Suggested Doubts Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0 scrollbar-none">
        <span className="text-xs font-bold text-slate-500 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          Try:
        </span>
        {suggestedQuestions.map((sq, idx) => (
          <button
            key={idx}
            onClick={() => handleSubmit(sq)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs whitespace-nowrap transition-colors"
          >
            "{sq}"
          </button>
        ))}
      </div>

      {/* Chat Messages Display Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {history.length === 0 && !loading ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-sm my-auto space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-100 text-brand-600 flex items-center justify-center mx-auto">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900">No questions asked yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Type or record your academic doubt. AI Saathi uses your Python course materials to give accurate answers.
            </p>
          </div>
        ) : (
          history.map((rec) => {
            const isPending = rec.status === 'pending';
            const showHindi = hindiToggleMap[rec.queryId];
            const isSimpler = simplerMode[rec.queryId];

            return (
              <div key={rec.queryId || rec.id} className="space-y-3">
                {/* Student Question Bubble */}
                <div className="flex justify-end">
                  <div className="bg-brand-600 text-white p-3.5 rounded-2xl rounded-tr-xs max-w-[85%] sm:max-w-[70%] shadow-sm text-xs sm:text-sm font-medium">
                    {rec.question}
                  </div>
                </div>

                {/* AI Tutor Response Card */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-brand-600 flex items-center justify-center shrink-0 mt-1 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>

                  <div className="flex-1 bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-4 space-y-3 shadow-sm">
                    {/* Status Badge */}
                    {isPending ? (
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
                        <div className="font-bold flex items-center gap-1.5 text-amber-800">
                          <Clock className="w-4 h-4 text-amber-600 animate-spin" />
                          {t.doubtSavedLocally}
                        </div>
                        <p className="text-[11px] text-amber-700">{t.doubtWillProcess}</p>
                      </div>
                    ) : (
                      <>
                        {/* Response Text */}
                        <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-2">
                          {isSimpler && (
                            <div className="p-2 rounded-lg bg-sky-50 border border-sky-200 text-sky-800 text-xs font-semibold">
                              💡 Simplified Mode Active
                            </div>
                          )}

                          <p className="whitespace-pre-line">
                            {showHindi && rec.hindiAnswer ? rec.hindiAnswer : rec.answer}
                          </p>

                          {rec.codeExample && (
                            <div className="mt-2 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-3 text-xs font-mono text-cyan-300">
                              <pre>{rec.codeExample}</pre>
                            </div>
                          )}

                          {rec.keyTakeaway && (
                            <div className="mt-2 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-center gap-2 font-medium">
                              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                              <span>{rec.keyTakeaway}</span>
                            </div>
                          )}
                        </div>

                        {/* Interactive Buttons */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleSimplerView(rec.queryId)}
                              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                                isSimpler
                                  ? 'bg-sky-100 text-sky-800 border border-sky-300'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                              }`}
                            >
                              {t.explainSimpler}
                            </button>

                            {rec.hindiAnswer && (
                              <button
                                onClick={() => toggleHindiView(rec.queryId)}
                                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                                  showHindi
                                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                                }`}
                              >
                                {showHindi ? 'English' : 'हिंदी (Hindi)'}
                              </button>
                            )}
                          </div>

                          {/* Speech TTS Button */}
                          <button
                            onClick={() => handleSpeechOutput(rec)}
                            className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                              speakingQueryId === rec.queryId
                                ? 'bg-rose-50 text-rose-700 border border-rose-300 animate-pulse'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                            }`}
                          >
                            {speakingQueryId === rec.queryId ? (
                              <>
                                <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                                <span>{t.stopListening}</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3.5 h-3.5 text-brand-600" />
                                <span>{t.listen}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}

        {loading && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 animate-pulse shadow-sm">
            <Bot className="w-5 h-5 text-brand-600 animate-spin" />
            <span className="text-xs text-slate-600 font-medium">
              Searching Python course context & processing grounded answer...
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Voice Error Notice */}
      {voiceError && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500" />
            <span>{voiceError}</span>
          </div>
          <button onClick={() => setVoiceError(null)} className="text-xs font-semibold underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="shrink-0">
        <div className="p-2 rounded-2xl bg-white border border-slate-200 shadow-md flex items-center gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={isListening ? "Listening to your voice..." : t.typeQuestion}
            className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
          />

          {/* Voice Mic Button */}
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse shadow-md shadow-rose-600/30'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
            }`}
            title={t.voiceInput}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-brand-600" />}
            <span className="hidden sm:inline text-xs">{isListening ? 'Listening' : 'Voice'}</span>
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!question.trim() || loading}
            className="p-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </form>
    </div>
  );
};
