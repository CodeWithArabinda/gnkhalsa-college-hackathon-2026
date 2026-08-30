import React from 'react';
import { Sparkles, Terminal, Cpu, ArrowRight } from 'lucide-react';

export default function HeroSection({
  block,
  index,
  schema,
  selectedElement,
  hoveredElementKey,
  setHoveredElementKey,
  onSelectElement,
  onUpdateElementStyle,
  onPolishWithAI,
  handleOpenEditModal,
  handleInlineChange,
  triggerFileUpload,
  scrollToProjects,
  EditableCanvasItem
}) {
  const content = block.content || {};
  const archetype = schema?.archetype || 'bento-minimal';

  const isCyber = archetype === 'cyber-terminal' || archetype === 'cyber-ai';
  const isBrutalist = archetype === 'neo-brutalist';
  const isWarm = archetype === 'warm-editorial';

  // 1. Neo-Brutalist Hero Variant
  if (isBrutalist) {
    return (
      <section className="p-8 sm:p-20 bg-[#FFFDF5] text-black font-sans border-b-3 border-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#FFE600] border-2 border-black rounded-md font-mono text-xs font-black text-black shadow-[2px_2px_0px_#000]">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>{content.headline || "Creative Developer & Designer"}</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-black text-black leading-[1.05] tracking-tight uppercase">
              {content.name || "I'm Kshitij Pilankar."}
            </h1>
            <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-bold max-w-xl">
              {content.bio || "Building high-impact digital experiences with React 18, WebGL, and modern design systems."}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                type="button"
                onClick={scrollToProjects}
                className="bg-[#FFE600] hover:bg-[#ebd300] text-black font-black text-sm px-8 py-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>{content.ctaText || "Explore Projects"}</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden border-3 border-black bg-[#FFE600] shadow-[8px_8px_0px_#000]">
              <img
                src={content.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop"}
                alt="Portrait"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 2. Warm Editorial Hero Variant
  if (isWarm) {
    return (
      <section className="p-8 sm:p-20 bg-[#FDFBF7] text-[#2C2621] font-serif border-b border-[#E7DEC8]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-[#F7F3EB] border border-[#E7DEC8] rounded-full text-xs font-sans font-semibold text-[#C2410C]">
              <Sparkles className="w-3.5 h-3.5 text-[#C2410C]" />
              <span>{content.headline || "Creative Developer & Designer"}</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-[#2C2621] leading-[1.1] tracking-tight">
              {content.name || "I'm Kshitij Pilankar."}
            </h1>
            <p className="text-[#645647] font-sans text-base sm:text-lg leading-relaxed max-w-xl">
              {content.bio || "Building high-impact digital experiences with React 18, WebGL, and refined publication design tokens."}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                type="button"
                onClick={scrollToProjects}
                className="bg-[#C2410C] hover:bg-[#a3360a] text-white font-sans font-bold text-sm px-8 py-3.5 rounded-full shadow-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <span>{content.ctaText || "Explore Projects"}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border border-[#E7DEC8] bg-[#F7F3EB]">
              <img
                src={content.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop"}
                alt="Portrait"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 3. Cyber Terminal Hero Variant
  if (isCyber) {
    return (
      <section className="p-8 sm:p-16 flex flex-col justify-center min-h-[520px] bg-[#090d16] text-white font-mono relative overflow-hidden border-b border-cyan-500/20">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-mono text-cyan-400 shadow-[0_0_15px_rgba(0,245,255,0.15)]">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>zsh ~ developer-profile --active</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight">
              {content.name || "Kshitij Pilankar"}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-mono">
              {content.bio || "Architecting high-throughput neural inference pipelines, vector databases, and real-time streaming AI agents."}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                type="button"
                onClick={scrollToProjects}
                className="bg-[#00f5ff] hover:bg-[#00d0db] text-black font-black text-xs px-7 py-3.5 rounded-xl shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all cursor-pointer flex items-center gap-2"
              >
                <Cpu className="w-4 h-4 text-black" />
                <span>Explore Cyber Models</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#0f172a] border border-cyan-500/30 rounded-2xl p-5 shadow-[0_0_25px_rgba(0,245,255,0.1)] space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
                <span className="text-cyan-400 font-bold">SYSTEM TELEMETRY</span>
                <span className="text-emerald-400 text-[10px] bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">STATUS: ONLINE</span>
              </div>
              <div className="space-y-2 text-slate-300 pt-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Inference Latency:</span>
                  <span className="text-cyan-300 font-bold">12.4ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Model Accuracy:</span>
                  <span className="text-emerald-300 font-bold">99.4%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 4. Default Bento-Minimal Hero Variant
  return (
    <section className="p-8 sm:p-20 flex flex-col items-center justify-center min-h-[520px] bg-[#F8FAFC] text-slate-900 font-sans text-center border-b border-slate-200">
      <div className="max-w-4xl mx-auto space-y-6 flex flex-col items-center">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-800 shadow-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Available for Q3 Projects & Engineering Roles</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
          {content.name || "I'm Kshitij Pilankar."}
        </h1>

        <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
          {content.bio || "Building high-impact digital experiences with React 18, WebGL, and modern design systems."}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-700 shadow-2xs">
            ⚡ WebGL 3D Canvas
          </span>
          <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-700 shadow-2xs">
            🧠 Distributed AI Systems
          </span>
        </div>

        <div className="flex flex-wrap gap-4 pt-4 justify-center">
          <button
            type="button"
            onClick={scrollToProjects}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-8 py-4 rounded-full shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>View Selected Works</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}
