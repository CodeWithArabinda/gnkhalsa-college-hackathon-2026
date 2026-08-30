import React from "react";
import { motion } from "framer-motion";

const ComputersCanvas = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-2 relative">
      {/* Floating Ambient Glow Background Ring */}
      <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-purple-600/30 to-cyan-500/30 blur-3xl pointer-events-none" />

      {/* Main 3D Framer Motion Card */}
      <motion.div
        animate={{
          y: [-8, 8, -8],
          rotateZ: [-0.5, 0.5, -0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.02 }}
        className="relative w-full max-w-lg bg-slate-950/80 backdrop-blur-2xl border border-violet-500/30 rounded-3xl p-6 sm:p-7 shadow-[0_0_60px_rgba(145,94,255,0.25)] flex flex-col gap-5 z-10"
      >
        {/* Top Bar / Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block shadow-sm" />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-mono text-emerald-400 font-semibold tracking-wide">
              SYSTEM ONLINE
            </span>
          </div>
        </div>

        {/* Code Snippet */}
        <div className="font-mono text-xs sm:text-sm leading-relaxed text-slate-300 bg-slate-900/60 p-4 rounded-xl border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-white/5 pb-2 mb-2">
            <span>🚀 nilesh-portfolio.ts</span>
            <span className="text-violet-400 font-bold">TypeScript</span>
          </div>
          <p className="text-violet-400">
            <span className="text-pink-400">export const</span> developer = {"{"}
          </p>
          <p className="pl-4">
            name: <span className="text-emerald-400">"Nilesh Gupta"</span>,
          </p>
          <p className="pl-4">
            role: <span className="text-cyan-400">"Full Stack & AI Engineer"</span>,
          </p>
          <p className="pl-4">
            stack: [<span className="text-amber-300">"React"</span>, <span className="text-amber-300">"Next.js"</span>, <span className="text-amber-300">"Three.js"</span>, <span className="text-amber-300">"AI"</span>],
          </p>
          <p className="pl-4">
            status: <span className="text-emerald-400">"Ready to Build High-Impact Apps"</span>,
          </p>
          <p className="text-violet-400">{"}"};</p>
        </div>

        {/* Floating Mini Tech Cards */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-primary/90 border border-violet-500/20 rounded-xl p-2.5 flex flex-col items-center gap-1 shadow-md"
          >
            <span className="text-lg">⚡</span>
            <span className="text-[11px] font-bold text-white">Full Stack</span>
            <span className="text-[9px] text-violet-400 font-medium">React & Node</span>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-primary/90 border border-cyan-500/20 rounded-xl p-2.5 flex flex-col items-center gap-1 shadow-md"
          >
            <span className="text-lg">🤖</span>
            <span className="text-[11px] font-bold text-white">AI Integrations</span>
            <span className="text-[9px] text-cyan-400 font-medium">LLM & GPT-4</span>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-primary/90 border border-pink-500/20 rounded-xl p-2.5 flex flex-col items-center gap-1 shadow-md"
          >
            <span className="text-lg">🎨</span>
            <span className="text-[11px] font-bold text-white">3D & Motion</span>
            <span className="text-[9px] text-pink-400 font-medium">Framer Motion</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ComputersCanvas;
