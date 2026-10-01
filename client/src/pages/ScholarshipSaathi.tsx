import React, { useState } from 'react';
import { GraduationCap, Filter, ExternalLink, CheckCircle2, FileText, AlertCircle, Sparkles, Building2 } from 'lucide-react';
import { SCHOLARSHIPS_DATA, Scholarship } from '../data/scholarshipsData';

export const ScholarshipSaathi: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [maxIncome, setMaxIncome] = useState<number>(500000);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredScholarships = SCHOLARSHIPS_DATA.filter((sch) => {
    if (selectedCourse !== 'All' && !sch.courseEligibility.includes(selectedCourse)) return false;
    if (selectedCategory !== 'All' && !sch.categoryEligibility.includes(selectedCategory)) return false;
    if (sch.maxIncomeLimit && maxIncome < sch.maxIncomeLimit && maxIncome !== 500000) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = sch.name.toLowerCase().includes(q);
      const matchBy = sch.offeredBy.toLowerCase().includes(q);
      if (!matchName && !matchBy) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Scholarship Saathi</h1>
            <p className="text-xs text-slate-500">Discover official government scholarships for higher education</p>
          </div>
        </div>

        <div className="text-xs text-amber-800 font-semibold bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 flex items-center gap-1.5 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>{filteredScholarships.length} Potential Matches Found</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider">
          <Filter className="w-4 h-4 text-brand-600" />
          <span>Filter Criteria</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {/* Search Query */}
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Search Keywords</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. Central Sector, Tribal..."
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white"
            />
          </div>

          {/* Course Filter */}
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Enrolled Course</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
            >
              <option value="All">All Courses (BCA, BSc, BA)</option>
              <option value="BCA">BCA</option>
              <option value="BSc">BSc IT / CS</option>
              <option value="BA">BA</option>
              <option value="B.Tech">B.Tech</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Social Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
            >
              <option value="All">All Categories</option>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST / Tribal</option>
            </select>
          </div>

          {/* Max Family Income */}
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Family Income Limit</label>
            <select
              value={maxIncome}
              onChange={(e) => setMaxIncome(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
            >
              <option value={500000}>Up to ₹5,00,000 / year</option>
              <option value={250000}>Up to ₹2,50,000 / year</option>
              <option value={800000}>Up to ₹8,00,000 / year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Official Portal Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-slate-700 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-900">Official Eligibility Disclaimer:</span> Potential match — final eligibility and online submission must be verified on the official government scholarship portal (National Scholarship Portal - scholarships.gov.in).
        </div>
      </div>

      {/* Scholarships List */}
      <div className="space-y-4">
        {filteredScholarships.map((sch) => (
          <div
            key={sch.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 shadow-sm space-y-4 transition-all"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-amber-600" />
                  {sch.offeredBy}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{sch.name}</h3>
              </div>

              <div className="text-right">
                <div className="text-sm font-black text-emerald-600">{sch.amount}</div>
                <div className="text-[11px] text-slate-500">Deadline: {sch.deadline}</div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{sch.summary}</p>

            {/* Why It May Match */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-brand-700 tracking-wider">
                Why It May Match Your Profile
              </span>
              <ul className="space-y-1 text-xs text-slate-700">
                {sch.matchReasons.map((reason, rIdx) => (
                  <li key={rIdx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Documents & Source */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-600 flex items-center gap-1 text-[11px]">
                  <FileText className="w-3.5 h-3.5 text-cyan-600" />
                  Required Documents Checklist
                </span>
                <p className="text-slate-700 text-[11px]">{sch.requiredDocs.join(', ')}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="font-bold text-slate-600 text-[11px] block">Verified Official Source</span>
                  <span className="text-slate-700 text-[11px] font-medium">{sch.officialSource}</span>
                </div>
                <a
                  href="https://scholarships.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-brand-600 hover:text-brand-700 font-bold flex items-center gap-1 text-[11px]"
                >
                  <span>Apply on Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
