import React from 'react';
import { Quote } from 'lucide-react';

export default function StorySection({
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
  EditableCanvasItem
}) {
  const content = block.content || {};
  const archetype = schema?.archetype || 'bento-minimal';

  const isCyber = archetype === 'cyber-terminal' || archetype === 'cyber-ai';
  const isBrutalist = archetype === 'neo-brutalist';
  const isWarm = archetype === 'warm-editorial';

  // 1. Neo-Brutalist Story Variant
  if (isBrutalist) {
    return (
      <section id="story-section" className="p-8 sm:p-20 bg-[#FFFDF5] text-black font-sans border-b-3 border-black">
        <div className="max-w-6xl mx-auto bg-white border-3 border-black rounded-2xl p-8 space-y-6 shadow-[6px_6px_0px_#000]">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#FFE600] border-2 border-black rounded-md font-mono text-xs font-black text-black shadow-[2px_2px_0px_#000]">
            <span>✦ ARCHITECTURAL PHILOSOPHY ✦</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-black uppercase tracking-tight">
            {content.title || "The Architect"}
          </h2>
          <div className="text-slate-900 text-sm leading-relaxed space-y-4 font-bold">
            <p>Engineering digital software requires an uncompromised balance between aesthetic precision and technical integrity.</p>
            <p>My design philosophy is grounded in Neo-Brutalist UI principles — bold high contrast, thick black borders, functional hierarchy, and 0ms DOM delays.</p>
          </div>
        </div>
      </section>
    );
  }

  // 2. Warm Editorial Story Variant
  if (isWarm) {
    return (
      <section id="story-section" className="p-8 sm:p-20 bg-[#FDFBF7] text-[#2C2621] font-serif border-b border-[#E7DEC8]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-lg aspect-square bg-[#F7F3EB] border border-[#E7DEC8]">
            <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&auto=format&fit=crop" alt="Workstation" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-[#2C2621] tracking-tight">{content.title || "The Architect"}</h2>
            <div className="text-[#645647] font-sans text-sm leading-relaxed space-y-4">
              <p>Engineering digital software requires an uncompromised balance between aesthetic precision and technical integrity.</p>
              <p>My design philosophy is grounded in Editorial UI principles — clean serif contrast, accessible typography, fluid micro-animations, and fast page loads.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 3. Cyber Terminal Story Variant
  if (isCyber) {
    const milestones = [
      { year: "2026", title: "Principal Fullstack Architect", detail: "Engineered StackFolio AI Generative UI Canvas with 1:1 Live Sync & Supabase Backend." },
      { year: "2024 - 2025", title: "Senior Systems Engineer", detail: "Architected WebGL shader pipelines and real-time distributed microservices serving 10M+ req/day." }
    ];

    return (
      <section id="story-section" className="p-8 sm:p-20 bg-[#090d16] text-white font-mono border-b border-cyan-500/20">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="border-b border-cyan-500/30 pb-4">
            <h2 className="text-3xl font-black text-white">Engineering Timeline & Milestones</h2>
            <p className="text-xs text-cyan-400 mt-1">Key career checkpoints and architectural achievements</p>
          </div>
          <div className="border-l-2 border-cyan-500/40 ml-4 pl-6 space-y-8 relative">
            {milestones.map((m, idx) => (
              <div key={m.year} className="relative group">
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#090d16] border-2 border-cyan-400 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                </div>
                <div className="bg-[#0f172a] border border-cyan-500/30 rounded-2xl p-6 space-y-2">
                  <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/30 font-mono">{m.year}</span>
                  <h3 className="text-lg font-bold text-white pt-1">{m.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{m.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 4. Default Bento-Minimal Manifesto Variant
  return (
    <section id="story-section" className="p-12 sm:p-24 bg-[#F8FAFC] text-slate-900 font-sans text-center border-b border-slate-200">
      <div className="max-w-4xl mx-auto space-y-8 flex flex-col items-center">
        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-900 flex items-center justify-center shadow-xs">
          <Quote className="w-6 h-6 text-slate-800" />
        </div>
        <blockquote className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight max-w-3xl">
          "{content.bio || "Engineering digital software requires an uncompromised balance between aesthetic precision and technical integrity."}"
        </blockquote>
        <div className="pt-4 flex flex-col items-center space-y-1">
          <span className="text-sm font-bold text-slate-900 tracking-wider uppercase">KSHITIJ PILANKAR</span>
          <span className="text-xs text-slate-500 font-mono">Principal UI/UX Systems Architect</span>
        </div>
      </div>
    </section>
  );
}
