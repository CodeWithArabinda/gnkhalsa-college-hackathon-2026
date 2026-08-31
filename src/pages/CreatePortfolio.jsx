import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, Wand2, ArrowRight, Layers, Monitor, ChevronLeft, Zap, Code, ShieldCheck } from 'lucide-react';

const RECOMMENDED_TEMPLATES = [
  {
    id: 'cinematic_space',
    name: 'Cinematic Nebula',
    badge: 'NEW',
    accent: '#FF6B1A',
    description: 'Deep space dark canvas with warm ambient glow, 3D tilt profile card, and WebGL wheel archive.',
    bgClass: 'bg-gradient-to-br from-[#121218] via-[#0B0B0E] to-[#1A0B05]'
  },
  {
    id: 'bento_grid',
    name: 'Modular Bento Grid',
    badge: 'POPULAR',
    accent: '#38BDF8',
    description: 'Apple/Vercel-style modular bento grid with glassmorphic cards and dynamic column spans.',
    bgClass: 'bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]'
  },
  {
    id: 'neo_brutalist',
    name: 'Neo-Brutalist Classic',
    badge: 'COMMUNITY FAVORITE',
    accent: '#FFE600',
    description: 'Cream canvas with 3px solid black borders, hard drop-shadows, and vibrant sticker badges.',
    bgClass: 'bg-gradient-to-br from-[#FFFDF8] via-[#FFF9E6] to-[#FFF5CD] text-black'
  },
  {
    id: 'vscode',
    name: 'VS Code IDE',
    badge: 'DEVELOPER',
    accent: '#007ACC',
    description: 'Full VS Code dark UI with file tree explorer, open tabs, line numbers, and blue status bar.',
    bgClass: 'bg-gradient-to-br from-[#1E1E1E] via-[#252526] to-[#1E1E1E]'
  }
];

export default function CreatePortfolio() {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const handleGenerate = (e) => {
    e?.preventDefault();
    navigate('/studio');
  };

  const handleSelectTemplate = (templateId) => {
    localStorage.setItem('stackfolio_selected_template', templateId);
    navigate('/studio');
  };

  return (
    <div className="min-h-screen bg-[#0F1117] bg-grid-pattern-dark text-white font-sans flex flex-col justify-between relative selection:bg-[#FFE600] selection:text-black">
      
      {/* Background Ambient Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-amber-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px]" />
      </div>

      {/* Top Header Bar */}
      <header className="px-6 py-5 flex items-center justify-between z-20 max-w-7xl mx-auto w-full">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-400 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" /> Dashboard
        </Link>

        <div className="flex items-center space-x-2">
          <span className="font-heading font-black text-xl text-white">StackFolio</span>
          <span className="px-2.5 py-0.5 bg-[#FFE600] text-black text-[10px] font-mono font-bold rounded-full border border-black shadow-[1.5px_1.5px_0px_0px_#000]">
            ARIA AI
          </span>
        </div>

        <Link
          to="/dashboard"
          className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          Cancel
        </Link>
      </header>

      {/* Main Hero Prompt Canvas */}
      <main className="z-10 max-w-4xl mx-auto px-6 py-12 text-center space-y-8 flex-1 flex flex-col justify-center">
        
        {/* Top Sticker Pill */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-[#00FFA3] mx-auto shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-[#FFE600]" />
          <span>Design your site with Aria — Describe the site you want</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white">
          What kind of portfolio <br />
          <span className="bg-gradient-to-r from-white via-amber-200 to-[#FF6B1A] bg-clip-text text-transparent">
            do you want to build today?
          </span>
        </h1>

        {/* Central Prompt Input Bar */}
        <form onSubmit={handleGenerate} className="max-w-2xl mx-auto w-full space-y-3">
          <div className="relative flex items-center bg-[#1A1D27] border-2 border-white/20 focus-within:border-[#FFE600] rounded-2xl p-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all">
            <Wand2 className="w-5 h-5 text-[#FFE600] ml-3 shrink-0" />

            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A dark cinematic portfolio for a Senior AI Engineer with WebGL projects..."
              className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none font-sans"
            />

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFE600] hover:bg-[#ffed4d] text-black font-heading font-black text-xs uppercase tracking-wider rounded-xl border border-black shadow-[2px_2px_0px_0px_#000] shrink-0 transition-all hover:scale-105 active:scale-95"
            >
              <span>Generate Site</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] font-mono text-slate-400">
            ⚡ Aria interprets your prompt and builds your schema with live 3D preview.
          </p>
        </form>

        {/* Recommended Template Shelf */}
        <div className="pt-8 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#FFE600]" /> Or Start From Recommended Presets
            </h2>
            <span className="text-[11px] font-mono text-slate-500">4 Base Architectures</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {RECOMMENDED_TEMPLATES.map((tmpl) => (
              <div
                key={tmpl.id}
                onClick={() => handleSelectTemplate(tmpl.id)}
                className={`p-5 rounded-2xl border border-white/10 hover:border-[#FFE600] transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-lg ${tmpl.bgClass}`}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-white group-hover:text-[#FFE600] transition-colors">
                      {tmpl.name}
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.5 bg-black/40 text-white rounded border border-white/10">
                      {tmpl.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans opacity-90">
                    {tmpl.description}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-white/10 text-[11px] font-mono">
                  <span className="text-slate-400">1-Click Launch</span>
                  <span className="text-[#FFE600] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold">
                    Use Preset <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Bottom Footer */}
      <footer className="py-4 text-center text-[10px] font-mono text-slate-500 border-t border-white/5 z-10">
        StackFolio Aria Engine • Powered by Gemini 2.5 Flash & Vite
      </footer>

    </div>
  );
}
