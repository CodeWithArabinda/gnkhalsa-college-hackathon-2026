import React from "react";

const EarthCanvas = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="relative w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_60px_rgba(145,94,255,0.15)] text-center">
        {/* Glow Ring Element */}
        <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-tr from-violet-600 via-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/30 mb-6 animate-bounce-slow">
          <span className="text-4xl">📬</span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">Let's Connect!</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          Ready to turn your vision into high-impact software? Reach out for full-stack engineering, 3D web apps, or AI integrations.
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          Available for New Projects & Roles
        </div>
      </div>
    </div>
  );
};

export default EarthCanvas;
