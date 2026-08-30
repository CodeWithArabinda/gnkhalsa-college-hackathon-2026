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

  const archetype = schema?.archetype || 'bento-minimal';
  const blockId = block.id;
  const isCyber = archetype === 'cyber-terminal' || archetype === 'cyber-ai';
  const isBrutalist = archetype === 'neo-brutalist';
  const isWarm = archetype === 'warm-editorial';

  const renderItem = (key, label, children, className = "") => {
    if (EditableCanvasItem) {
      return (
        <EditableCanvasItem
          elementKey={key}
          label={label}
          schema={schema}
          selectedElement={selectedElement}
          hoveredElementKey={hoveredElementKey}
          setHoveredElementKey={setHoveredElementKey}
          onSelectElement={onSelectElement}
          onUpdateElementStyle={onUpdateElementStyle}
          onPolishWithAI={onPolishWithAI}
          onOpenEditModal={handleOpenEditModal}
          blockId={blockId}
          blockIndex={index}
          className={className}
        >
          {children}
        </EditableCanvasItem>
      );
    }
    return children;
  };

  // 1. Neo-Brutalist Pillars Variant
  if (isBrutalist) {
    const fills = ["bg-[#FFE600]", "bg-[#93c5fd]", "bg-[#fca5a5]"];
    return (
      <section className="p-8 sm:p-20 bg-[#FFFDF5] text-black font-sans border-b-3 border-black">
        <div className="max-w-6xl mx-auto space-y-10">
          {renderItem('pillars-header', 'Skills Header', (
            <h2 className="text-3xl font-black text-black text-center tracking-tight uppercase">{content.title || "Engineering Excellence"}</h2>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, cIdx) => renderItem(`skill-cat-${cIdx}`, `Skill Category ${cIdx + 1}`, (
              <div className={`${fills[cIdx % 3]} border-3 border-black rounded-2xl p-7 space-y-4 shadow-[5px_5px_0px_#000] flex flex-col justify-between`}>
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-white border-2 border-black text-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
                    <Code className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-black uppercase">{cat.name}</h3>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {cat.skills?.map((s) => (
                      <span key={s} className="px-2.5 py-1 bg-white border border-black rounded text-[11px] font-black text-black shadow-[1px_1px_0px_#000]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )))}
          </div>
        </div>
      </section>
    );
  }

  // 2. Warm Editorial Pillars Variant
  if (isWarm) {
    return (
      <section className="p-8 sm:p-20 bg-[#FDFBF7] text-[#2C2621] font-serif border-b border-[#E7DEC8]">
        <div className="max-w-6xl mx-auto space-y-10">
          {renderItem('pillars-header', 'Skills Header', (
            <h2 className="text-3xl font-bold text-[#2C2621] text-center tracking-tight">{content.title || "Engineering Excellence"}</h2>
          ))}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, cIdx) => renderItem(`skill-cat-${cIdx}`, `Skill Category ${cIdx + 1}`, (
              <div className="bg-[#F7F3EB] border border-[#E7DEC8] rounded-2xl p-7 space-y-4 shadow-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#E7DEC8]/60 text-[#C2410C] flex items-center justify-center">
                    <Code className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C2621]">{cat.name}</h3>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {cat.skills?.map((s) => (
                      <span key={s} className="px-3 py-1 bg-[#E7DEC8]/40 rounded-full text-xs font-sans font-semibold text-[#2C2621]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )))}
          </div>
        </div>
      </section>
    );
  }

  // 3. Cyber Terminal Telemetry Variant
  if (isCyber) {
    return (
      <section className="p-8 sm:p-20 bg-[#0a0e1a] text-white font-mono border-b border-cyan-500/20">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="flex items-center justify-between border-b border-cyan-500/30 pb-4">
            <div className="flex items-center gap-3">
              <Terminal className="w-6 h-6 text-cyan-400" />
              {renderItem('pillars-header', 'Skills Header', (
                <h2 className="text-2xl font-black text-white">{content.title || "Microservice & Cloud Telemetry"}</h2>
              ))}
            </div>
            {renderItem('pillars-badge', 'Status Badge', (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                HEALTH: 100% OPERATIONAL
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, cIdx) => renderItem(`skill-cat-${cIdx}`, `Telemetry Module ${cIdx + 1}`, (
              <div className="bg-[#0f172a] border border-cyan-500/30 rounded-2xl p-6 space-y-4 shadow-[0_0_20px_rgba(0,245,255,0.08)]">
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
            )))}
          </div>
        </div>
      </section>
    );
  }

  // 4. Default Bento-Minimal Categorized Matrix Variant
  return (
    <section className="p-8 sm:p-20 bg-[#F8FAFC] text-slate-900 font-sans border-b border-slate-200">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          {renderItem('pillars-header', 'Skills Header', (
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{content.title || "Technical Stack Matrix"}</h2>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, cIdx) => renderItem(`skill-cat-${cIdx}`, `Skill Matrix ${cIdx + 1}`, (
            <div className="bg-white border border-slate-200 rounded-3xl p-7 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-sm text-slate-900 uppercase font-mono tracking-wider">{cat.name}</h3>
                <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md">CORE</span>
              </div>
              <div className="space-y-2.5 pt-1">
                {cat.skills?.map((skill) => (
                  <div key={skill} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="text-xs font-bold text-slate-800">{skill}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )))}
        </div>
      </div>
    </section>
  );
}
