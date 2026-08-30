import React, { useEffect, useState } from "react";
import { Loader2, CheckCircle2, Sparkles, FileText, Cpu, Check } from "lucide-react";

interface ExtractionProgressModalProps {
  progressText: string;
  onComplete?: () => void;
}

export default function ExtractionProgressModal({ progressText }: ExtractionProgressModalProps) {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(2), 500);
    const t2 = setTimeout(() => setStep(3), 1100);
    const t3 = setTimeout(() => setStep(4), 1600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const steps = [
    { num: 1, title: "Reading resume file & extracting raw text stream" },
    { num: 2, title: "Analyzing skills, work experiences & achievements" },
    { num: 3, title: "Structuring projects, tech stacks & URLs" },
    { num: 4, title: "Normalizing data into canonical portfolio schema" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="relative mx-auto w-16 h-16 rounded-2xl bg-purple-600/10 border border-purple-500/30 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-purple-400 animate-spin" />
          <Sparkles className="h-4 w-4 text-pink-400 absolute -top-1 -right-1 animate-bounce" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white tracking-tight">
            AI Resume Extraction in Progress
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            {progressText}
          </p>
        </div>

        <div className="space-y-3 text-left pt-2">
          {steps.map((s) => {
            const isDone = step > s.num;
            const isCurrent = step === s.num;

            return (
              <div
                key={s.num}
                className={`flex items-center gap-3 p-2.5 rounded-xl border text-xs transition-all ${
                  isDone
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                    : isCurrent
                    ? "bg-purple-500/10 border-purple-500/30 text-purple-300 font-medium animate-pulse"
                    : "bg-slate-950/50 border-slate-800/50 text-slate-500"
                }`}
              >
                {isDone ? (
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="h-4 w-4 text-purple-400 animate-spin shrink-0" />
                ) : (
                  <div className="h-4 w-4 rounded-full border border-slate-700 shrink-0" />
                )}
                <span>{s.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
