import React from 'react';
import { Quote, Sparkles, CheckCircle2, GitCommit } from 'lucide-react';

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
  const variant = block.layoutVariant || content.layoutVariant || 'editorial-split';

  // Variant 2: Timeline Milestones Layout
  if (variant === 'timeline-milestones') {
    const milestones = [
      { year: "2026", title: "Principal Fullstack Architect", detail: "Engineered StackFolio AI Generative UI Canvas with 1:1 Live Sync & Supabase Backend." },
      { year: "2024 - 2025", title: "Senior Systems Engineer", detail: "Architected WebGL shader pipelines and real-time distributed microservices serving 10M+ req/day." },
      { year: "2022 - 2024", title: "Frontend Design Specialist", detail: "Built Neo-Brutalist & Bento component design systems adopted by cross-functional engineering teams." }
    ];

    return (
      <section id="story-section" className="p-8 sm:p-20 bg-[#090d16] text-white font-mono border-t border-b border-cyan-500/20">
        <div className="max-w-4xl mx-auto space-y-10">
          
          <div className="border-b border-cyan-500/30 pb-4">
            <h2 className="text-3xl font-black text-white">Engineering Timeline & Milestones</h2>
            <p className="text-xs text-cyan-400 mt-1">Key career checkpoints and architectural achievements</p>
          </div>

          <div className="border-l-2 border-cyan-500/40 ml-4 pl-6 space-y-8 relative">
            {milestones.map((m, idx) => (
              <div key={m.year} className="relative group">
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#090d16] border-2 border-cyan-400 group-hover:bg-cyan-400 transition-colors flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:bg-[#090d16]" />
                </div>
                <div className="bg-[#0f172a] border border-cyan-500/30 rounded-2xl p-6 space-y-2 shadow-sm hover:border-cyan-400 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/30 font-mono">
                      {m.year}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">MILESTONE 0{idx + 1}</span>
                  </div>
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

  // Variant 3: Minimal Manifesto Layout
  if (variant === 'minimal-manifesto') {
    return (
      <section id="story-section" className="p-12 sm:p-24 bg-slate-900 text-white font-sans text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-8 flex flex-col items-center">
          
          <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center shadow-lg border border-white/20">
            <Quote className="w-6 h-6 text-[#FFE600]" />
          </div>

          <blockquote className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight max-w-3xl">
            "{content.bio || "Engineering digital software requires an uncompromised balance between aesthetic precision and technical integrity."}"
          </blockquote>

          <div className="pt-4 flex flex-col items-center space-y-2">
            <span className="text-sm font-bold text-[#FFE600] tracking-wider uppercase">KSHITIJ PILANKAR</span>
            <span className="text-xs text-slate-400 font-mono">Principal UI/UX Systems Architect</span>
          </div>

        </div>
      </section>
    );
  }

  // Default Variant 1: Editorial Split Layout
  return (
    <section id="story-section" className="p-8 sm:p-16 bg-slate-50/50 font-sans text-slate-900 border-t border-b border-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        
        {/* Left: Workstation Photography */}
        <div className="rounded-[32px] overflow-hidden shadow-xl aspect-square bg-slate-200 border border-slate-200">
          <img
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&auto=format&fit=crop"
            alt="Workstation"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Architectural Story */}
        <div className="space-y-6">
          <EditableCanvasItem
            elementKey="story-title"
            label="Story Title"
            schema={schema}
            selectedElement={selectedElement}
            hoveredElementKey={hoveredElementKey}
            setHoveredElementKey={setHoveredElementKey}
            onSelectElement={onSelectElement}
            onUpdateElementStyle={onUpdateElementStyle}
            onPolishWithAI={onPolishWithAI}
            onOpenEditModal={handleOpenEditModal}
            blockId={block.id}
            blockIndex={index}
          >
            <h2
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleInlineChange(block.id, 'content.title', e.target.innerText)}
              className="text-4xl font-black text-slate-900 tracking-tight outline-none"
            >
              {content.title || "The Architect"}
            </h2>
          </EditableCanvasItem>

          <EditableCanvasItem
            elementKey="story-bio"
            label="Story Paragraphs"
            schema={schema}
            selectedElement={selectedElement}
            hoveredElementKey={hoveredElementKey}
            setHoveredElementKey={setHoveredElementKey}
            onSelectElement={onSelectElement}
            onUpdateElementStyle={onUpdateElementStyle}
            onPolishWithAI={onPolishWithAI}
            onOpenEditModal={handleOpenEditModal}
            blockId={block.id}
            blockIndex={index}
          >
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleInlineChange(block.id, 'content.bio', e.target.innerText)}
              className="text-slate-600 text-sm leading-relaxed space-y-4 font-normal outline-none"
            >
              <p>
                Engineering digital software requires an uncompromised balance between aesthetic precision and technical integrity.
              </p>
              <p>
                My design philosophy is grounded in Humanist UI principles — clean contrast, accessible typography, fluid micro-animations, and fast DOM rendering.
              </p>
              <p>
                Whether engineering complex stateful canvases or setting up CI/CD pipelines, I ensure every line of code is structured for scale.
              </p>
            </div>
          </EditableCanvasItem>
        </div>

      </div>
    </section>
  );
}
