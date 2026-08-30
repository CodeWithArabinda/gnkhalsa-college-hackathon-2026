import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Loader2, ChevronDown, ChevronUp, Zap } from 'lucide-react';

const STAGES = [
  { id: 1, label: "Identity & Persona", desc: "Analyzing background & candidate role." },
  { id: 2, label: "Hero Architecture", desc: "Crafting punchy headline & bio summary." },
  { id: 3, label: "Featured Projects", desc: "Organizing repositories & visual cards." },
  { id: 4, label: "Tech Stack", desc: "Structuring interactive competency matrix." },
  { id: 5, label: "Conversion Triggers", desc: "Wiring email & social contact hooks." }
];

export default function PlanningCard({ isGenerating, lastPrompt }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (!isGenerating) {
      setCurrentStep(STAGES.length + 1);
      return;
    }

    setCurrentStep(1);
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= STAGES.length) {
          clearInterval(interval);
          return STAGES.length;
        }
        return prev + 1;
      });
    }, 600);

    return () => clearInterval(interval);
  }, [isGenerating]);

  const isDone = !isGenerating || currentStep > STAGES.length;

  return (
    <div className="bg-[#181A24] border-2 border-white/10 rounded-2xl p-4 space-y-3 shadow-xl font-sans text-xs my-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-lg bg-[#FFE600] text-black flex items-center justify-center font-bold">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="font-heading font-extrabold text-white text-xs">
              {isDone ? "🎉 Site Structure Ready" : "Planning your site..."}
            </h4>
            <p className="font-mono text-[10px] text-slate-400">
              {isDone ? "All architecture blocks generated" : "StackFolio Aria AI Engine"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-slate-400 hover:text-white p-1"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Progressive Checklist Body */}
      {expanded && (
        <div className="space-y-2 pt-1">
          {STAGES.map((stage, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < currentStep || isDone;
            const isActive = stepNum === currentStep && isGenerating;

            return (
              <div
                key={stage.id}
                className={`flex items-start space-x-2.5 p-2 rounded-xl transition-all ${
                  isActive
                    ? 'bg-[#FF6B1A]/10 border border-[#FF6B1A]/30 text-white'
                    : isCompleted
                    ? 'text-slate-300'
                    : 'text-slate-500 opacity-60'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-[#00FFA3]" />
                  ) : isActive ? (
                    <Loader2 className="w-4 h-4 text-[#FF6B1A] animate-spin" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-slate-600 inline-block" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-mono font-bold text-[11px] flex items-center justify-between">
                    <span>{stage.label}</span>
                    {isActive && (
                      <span className="text-[9px] px-1.5 py-0.2 bg-[#FF6B1A] text-black font-extrabold rounded uppercase">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans truncate">{stage.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
