import React, { useState } from 'react';
import { Compass, CheckCircle2, ChevronRight, Briefcase, Sparkles, BookOpen, Layers } from 'lucide-react';
import { CAREER_PATHWAYS, CareerPathway } from '../data/careerData';
import { NavTab } from '../components/Navigation';

interface CareerSaathiProps {
  setActiveTab: (tab: NavTab) => void;
}

export const CareerSaathi: React.FC<CareerSaathiProps> = ({ setActiveTab }) => {
  const [selectedPathway, setSelectedPathway] = useState<CareerPathway>(CAREER_PATHWAYS[0]);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Career Saathi</h1>
            <p className="text-xs text-slate-500">Personalized career pathway roadmap for BCA & Tech students</p>
          </div>
        </div>

        <span className="hidden sm:inline px-3 py-1 rounded-full text-xs font-semibold bg-slate-50 text-sky-700 border border-slate-200">
          Match Profile: BCA • Programming
        </span>
      </div>

      {/* Pathways Tabs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CAREER_PATHWAYS.map((pw) => {
          const isSelected = selectedPathway.id === pw.id;
          return (
            <button
              key={pw.id}
              onClick={() => setSelectedPathway(pw)}
              className={`p-5 rounded-2xl text-left border transition-all flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-white border-cyan-500 shadow-md ring-2 ring-cyan-500/20'
                  : 'bg-white hover:bg-slate-50 border-slate-200 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                    {pw.matchScore}% Match
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Pathway</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1">{pw.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{pw.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs text-slate-700 flex items-center justify-between">
                <span className="font-semibold">{pw.avgStartingSalary}</span>
                <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-cyan-600' : 'text-slate-400'}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Pathway Roadmap Viewer */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-cyan-700 tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              Recommended Skill Roadmap
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">{selectedPathway.title}</h2>
            <p className="text-xs text-slate-500 mt-0.5">Target Entry Role: {selectedPathway.targetRole}</p>
          </div>

          <button
            onClick={() => setActiveTab('learn')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <BookOpen className="w-4 h-4" />
            <span>Start Learning Required Skills</span>
          </button>
        </div>

        {/* Step-by-Step Pathway Visualization */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-cyan-600" />
            Career Development Progression Steps
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedPathway.steps.map((step, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 relative shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-800">{step.phase}</span>
                  <span className="w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700">
                    {idx + 1}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">{step.description}</p>

                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Skills to Master:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {step.skills.map((sk, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white text-cyan-800 border border-slate-200"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career Disclaimer Note */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
          <Briefcase className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 block mb-0.5">Career Guidance Note:</span>
            Pathways are suggested based on your BCA course curriculum and technology interests. Build real projects, practice coding daily, and apply for verified internship opportunities to achieve your career goals.
          </div>
        </div>
      </div>
    </div>
  );
};
