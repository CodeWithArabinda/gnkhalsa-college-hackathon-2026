import React from 'react';
import { Cpu, Layers, Server, Code, Terminal, CheckCircle2 } from 'lucide-react';

export default function PillarsSection({
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
  const categories = content.categories || [
    { name: "Frontend Engineering", skills: ["React 18", "Vite", "Tailwind CSS", "GSAP"] },
    { name: "Backend & Cloud", skills: ["Node.js", "Supabase", "PostgreSQL", "Docker"] },
    { name: "Full-Stack Architecture", skills: ["System Design", "GraphQL", "CI/CD", "Vercel"] }
  ];
  const variant = block.layoutVariant || content.layoutVariant || 'pastel-cards';

  // Variant 2: Tech Matrix (Grouped Category Matrices with Proficiency Badges)
  if (variant === 'tech-matrix') {
    return (
      <section className="p-8 sm:p-20 bg-slate-50/50 text-slate-900 font-sans border-t border-b border-slate-100">
        <div className="max-w-6xl mx-auto space-y-10">
          
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{content.title || "Technical Stack Matrix"}</h2>
            <p className="text-xs text-slate-500 font-mono">Core frameworks, engineering patterns, and cloud tools</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, cIdx) => (
              <div key={cat.name || cIdx} className="bg-white border border-slate-200/90 rounded-3xl p-7 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-sm text-slate-900 uppercase font-mono tracking-wider">{cat.name}</h3>
                  <span className="text-[10px] font-mono font-bold bg-blue-50 text-[#0053ff] px-2 py-0.5 rounded-md">CORE</span>
                </div>

                <div className="space-y-2.5 pt-1">
                  {cat.skills?.map((skill) => (
                    <div key={skill} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="text-xs font-bold text-slate-800">{skill}</span>
                      </div>
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    );
  }

  // Variant 3: System Telemetry Box (Dark Infrastructure Layout)
  if (variant === 'system-telemetry') {
    return (
      <section className="p-8 sm:p-20 bg-[#0a0e1a] text-white font-mono border-t border-b border-cyan-500/20">
        <div className="max-w-6xl mx-auto space-y-10">
          
          <div className="flex items-center justify-between border-b border-cyan-500/30 pb-4">
            <div className="flex items-center gap-3">
              <Terminal className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-black text-white">{content.title || "Microservice & Cloud Telemetry"}</h2>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
              HEALTH: 100% OPERATIONAL
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, cIdx) => (
              <div key={cat.name || cIdx} className="bg-[#0f172a] border border-cyan-500/30 rounded-2xl p-6 space-y-4 shadow-[0_0_20px_rgba(0,245,255,0.08)]">
                <div className="flex items-center justify-between text-xs text-cyan-400 font-bold border-b border-cyan-500/20 pb-2">
                  <span>MODULE // {cIdx + 1}</span>
                  <span className="text-slate-400">{cat.name}</span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {cat.skills?.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs rounded-lg font-mono">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    );
  }

  // Default Variant 1: 3 Pastel Feature Cards
  return (
    <section className="p-8 sm:p-16 bg-white font-sans text-slate-900">
      <div className="max-w-6xl mx-auto space-y-10">
        
        <EditableCanvasItem
          elementKey="pillars-title"
          label="Pillars Title"
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
            className="text-3xl font-black text-slate-900 text-center tracking-tight outline-none"
          >
            {content.title || "Engineering Excellence"}
          </h2>
        </EditableCanvasItem>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-[#eff6ff] rounded-3xl p-8 flex flex-col justify-between border border-blue-100/80 shadow-xs hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-blue-200 text-[#0053ff] flex items-center justify-center shadow-xs">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {categories[0]?.name || "Frontend Engineering"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Building responsive, pixel-perfect user interfaces with micro-animations, accessible component design systems, and fast DOM rendering.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {categories[0]?.skills?.map((s) => (
                  <span key={s} className="px-2.5 py-1 bg-white border border-blue-200/60 rounded-full text-[11px] font-semibold text-slate-800">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <button type="button" className="bg-[#ff5100] text-white rounded-full font-bold text-xs py-2.5 px-5 w-fit mt-8 hover:bg-[#e04700] transition-colors cursor-pointer">
              Learn More
            </button>
          </div>

          <div className="bg-[#fffbeb] rounded-3xl p-8 flex flex-col justify-between border border-amber-100/80 shadow-xs hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-amber-200 text-amber-600 flex items-center justify-center shadow-xs">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {categories[1]?.name || "Backend Architecture"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Designing resilient REST and GraphQL APIs, real-time database schema structures, authentication flows, and serverless edge functions.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {categories[1]?.skills?.map((s) => (
                  <span key={s} className="px-2.5 py-1 bg-white border border-amber-200/60 rounded-full text-[11px] font-semibold text-slate-800">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <button type="button" className="bg-[#ff5100] text-white rounded-full font-bold text-xs py-2.5 px-5 w-fit mt-8 hover:bg-[#e04700] transition-colors cursor-pointer">
              Learn More
            </button>
          </div>

          <div className="bg-[#f8fafc] rounded-3xl p-8 flex flex-col justify-between border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-800 flex items-center justify-center shadow-xs">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {categories[2]?.name || "Full-Stack Solutions"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                End-to-end product architecture from wireframing and technical specification to production deployment, monitoring, and performance tuning.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {categories[2]?.skills?.map((s) => (
                  <span key={s} className="px-2.5 py-1 bg-white border border-slate-200/60 rounded-full text-[11px] font-semibold text-slate-800">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <button type="button" className="bg-[#ff5100] text-white rounded-full font-bold text-xs py-2.5 px-5 w-fit mt-8 hover:bg-[#e04700] transition-colors cursor-pointer">
              Learn More
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
