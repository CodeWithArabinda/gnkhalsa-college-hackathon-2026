import React from 'react';
import { Github, Linkedin, Twitter, Sparkles, Terminal } from 'lucide-react';

export default function FooterSection({ archetype = "humanist-light", theme }) {
  const isCyber = archetype === 'cyber-terminal' || archetype === 'cyber-ai';
  const isBento = archetype === 'bento-minimal';
  const isBrutalist = archetype === 'neo-brutalist';
  const isWarm = archetype === 'warm-editorial';

  // 1. Cyber Terminal Footer
  if (isCyber) {
    return (
      <footer className="bg-[#05080E] text-slate-400 py-12 px-8 font-mono border-t border-cyan-500/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border-b border-cyan-500/20 pb-8">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
              <Terminal className="w-4 h-4" />
              <span>WebDev Cyber Terminal</span>
            </div>
            <p className="text-xs text-slate-400 font-mono">Real-time microservice & vector AI telemetry stream.</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-[#0e1424] border border-cyan-500/30 text-cyan-300 flex items-center justify-center hover:bg-cyan-500/20 transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-[#0e1424] border border-cyan-500/30 text-cyan-300 flex items-center justify-center hover:bg-cyan-500/20 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono">
          <p>© 2026 WebDev Portfolio. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 text-cyan-400">STATUS: 100% OPERATIONAL</p>
        </div>
      </footer>
    );
  }

  // 2. Neo Brutalist Footer
  if (isBrutalist) {
    return (
      <footer className="bg-[#FFE600] text-black py-12 px-8 font-sans border-t-3 border-black select-none">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border-b-2 border-black pb-8">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-heading font-black text-2xl tracking-tight text-black uppercase">StackFolio Neo-Brutalist</h3>
            <p className="text-xs font-bold text-black max-w-sm">Built with high-contrast neo-brutalist design tokens.</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000] text-black flex items-center justify-center hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000] text-black flex items-center justify-center hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono font-black text-black uppercase">
          <p>© 2026 StackFolio AI. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 bg-white px-3 py-1 rounded border-2 border-black shadow-[1.5px_1.5px_0px_#000]">100% NEO-BRUTALIST</p>
        </div>
      </footer>
    );
  }

  // 3. Warm Editorial Footer
  if (isWarm) {
    return (
      <footer className="bg-[#2C2621] text-[#EDE8E1] py-12 px-8 font-serif border-t border-[#3E3730]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#3E3730] pb-8">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-bold text-xl tracking-wide text-[#EDE8E1]">Editorial Portfolio</h3>
            <p className="text-xs text-[#C5BCB0] font-sans">Crafted with warm typographic contrast and terracotta accents.</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#3E3730] text-[#EDE8E1] flex items-center justify-center hover:bg-[#C2410C] transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#3E3730] text-[#EDE8E1] flex items-center justify-center hover:bg-[#C2410C] transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#C5BCB0] font-sans">
          <p>© 2026 Warm Editorial. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Designed in Studio</p>
        </div>
      </footer>
    );
  }

  // 4. Default Bento / Humanist Footer
  return (
    <footer className="bg-slate-900 text-white py-12 px-8 font-sans border-t border-slate-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-8">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="font-extrabold text-lg tracking-tight text-white">WebDev Portfolio</h3>
          <p className="text-xs text-slate-400 font-normal max-w-sm">Architecting modern digital experiences with React 18 and Vite.</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700 transition-colors">
            <Github className="w-4 h-4" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700 transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono">
        <p>© 2026 WebDev Portfolio. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">Built with StackFolio AI Studio</p>
      </div>
    </footer>
  );
}
