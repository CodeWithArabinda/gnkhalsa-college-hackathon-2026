import React from "react";

const ComputersCanvas = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="relative max-w-lg w-full bg-slate-900/80 backdrop-blur-xl border border-violet-500/30 rounded-2xl p-6 shadow-[0_0_50px_rgba(145,94,255,0.2)] animate-pulse-slow">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
          </div>
          <span className="text-xs font-mono text-violet-400 font-semibold tracking-wider">nilesh.config.ts</span>
        </div>

        {/* Code Content */}
        <div className="font-mono text-xs sm:text-sm text-slate-300 space-y-2">
          <p className="text-violet-400">
            <span className="text-pink-400">const</span> developer = {"{"}
          </p>
          <p className="pl-4">
            name: <span className="text-emerald-400">"Nilesh Gupta"</span>,
          </p>
          <p className="pl-4">
            role: <span className="text-cyan-400">"Full Stack & AI Developer"</span>,
          </p>
          <p className="pl-4">
            skills: [<span className="text-amber-300">"React"</span>, <span className="text-amber-300">"TypeScript"</span>, <span className="text-amber-300">"Node.js"</span>, <span className="text-amber-300">"Tailwind"</span>],
          </p>
          <p className="pl-4">
            passion: <span className="text-emerald-400">"Building fast, modern digital experiences"</span>,
          </p>
          <p className="text-violet-400">{"}"};</p>
        </div>

        {/* Floating Accent Badges */}
        <div className="absolute -top-4 -right-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20">
          🚀 60 FPS Smooth
        </div>
      </div>
    </div>
  );
};

export default ComputersCanvas;
