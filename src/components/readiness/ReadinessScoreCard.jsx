import React, { useState } from 'react';
import useReadiness from '../../hooks/useReadiness';
import { CheckCircle2, AlertTriangle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export default function ReadinessScoreCard({ portfolio }) {
  const { score, breakdown, suggestions } = useReadiness(portfolio);
  const [showDetails, setShowDetails] = useState(false);

  // Determine color grades based on score
  let barColorClass = 'bg-red-500';
  let textColorClass = 'text-red-600';
  let bgColorClass = 'bg-red-50';
  let borderColorClass = 'border-red-100';

  if (score >= 80) {
    barColorClass = 'bg-emerald-500';
    textColorClass = 'text-emerald-600';
    bgColorClass = 'bg-emerald-50';
    borderColorClass = 'border-emerald-100';
  } else if (score >= 50) {
    barColorClass = 'bg-amber-500';
    textColorClass = 'text-amber-600';
    bgColorClass = 'bg-amber-50';
    borderColorClass = 'border-amber-100';
  }

  // Criteria definitions for the checklist
  const criteriaList = [
    { key: 'hasNameAndHeadline', label: 'Name & Headline (10 pts)' },
    { key: 'hasBio', label: 'Profile Bio (10 pts)' },
    { key: 'hasSocial', label: 'Contact / Social Link (10 pts)' },
    { key: 'hasEducation', label: 'Education Record (10 pts)' },
    { key: 'hasProjects', label: 'Project Presence (20 pts)' },
    { key: 'hasProjectLinks', label: 'Live or Repository Link (15 pts)' },
    { key: 'hasSkills', label: 'Skills Breadth (>=5 skills) (10 pts)' },
    { key: 'hasAchievements', label: 'Achievements / Honors (10 pts)' },
    { key: 'hasPhoto', label: 'Profile Photo (5 pts)' }
  ];

  return (
    <div className={`p-5 rounded-xl border ${bgColorClass} ${borderColorClass} transition-all`}>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-2">
          <Sparkles className={`w-5 h-5 ${textColorClass}`} />
          <h4 className="font-heading font-bold text-slate-800">Portfolio Readiness</h4>
        </div>
        <div className={`text-2xl font-black font-mono ${textColorClass}`}>
          {score}/100
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200/70 h-2.5 rounded-full overflow-hidden mb-4">
        <div
          className={`h-full ${barColorClass} transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Summary Message */}
      <p className="text-xs font-medium text-slate-700 mb-4">
        {score === 100
          ? '🎉 Congratulations! Your portfolio is 100% ready for recruitment!'
          : score >= 80
          ? '🚀 Looking great! You have a highly competitive portfolio. Fix the last few suggestions to maximize impact.'
          : '⚠️ Your portfolio needs some additions before it is recruiter-ready. Follow the suggestions below.'}
      </p>

      {/* Action Toggle Details */}
      <div className="border-t border-slate-200/50 pt-3">
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center justify-between w-full text-xs font-semibold text-slate-600 hover:text-slate-800 focus:outline-none"
        >
          <span>{showDetails ? 'Hide Improvement Tips' : 'Show Suggestions & Checklist'}</span>
          {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showDetails && (
          <div className="mt-4 space-y-4 animate-fadeIn">
            {/* Checklist of Rubric */}
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Checklist Breakdown</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {criteriaList.map((crit) => {
                  const completed = breakdown[crit.key];
                  return (
                    <div key={crit.key} className="flex items-center space-x-2">
                      {completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-slate-300 shrink-0" />
                      )}
                      <span className={`text-[11px] ${completed ? 'text-slate-600 font-medium' : 'text-slate-400'}`}>
                        {crit.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Improvement Suggestions */}
            {suggestions.length > 0 && (
              <div>
                <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Actionable Suggestions</h5>
                <ul className="space-y-1.5 list-disc pl-4">
                  {suggestions.map((suggestion, idx) => (
                    <li key={idx} className="text-[11px] text-slate-600 font-medium">
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
