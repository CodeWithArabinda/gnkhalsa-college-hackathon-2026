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
  EditableCanvasItem,
  viewMode = 'desktop'
}) {
  const content = block.content || {};
  const categories = content.categories || [
    { name: "Frontend Engineering", skills: ["React 18", "Vite", "Tailwind CSS", "GSAP"] },
    { name: "Backend & Cloud", skills: ["Node.js", "Supabase", "PostgreSQL", "Docker"] },
    { name: "Full-Stack Architecture", skills: ["System Design", "GraphQL", "CI/CD", "Vercel"] }
  ];

  const archetype = schema?.archetype || 'bento-minimal';
  const blockId = block.id;
  const isMobile = viewMode === 'mobile';

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
      <section className={`${isMobile ? 'p-4' : 'p-4 sm:p-8 md:p-20'} bg-[#FFFDF5] text-black font-sans border-b-3 border-black w-full overflow-x-hidden`}>
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          <div className="border-b-3 border-black pb-4 sm:pb-5">
            {renderItem('pillars-header', 'Section Title', (
              <h2 className={`${isMobile ? 'text-2xl' : 'text-2xl sm:text-3xl'} font-black text-black uppercase tracking-tight`}>{content.title || "Engineering Excellence"}</h2>
            ))}
            {renderItem('pillars-subtitle', 'Section Subtitle', (
              <p className="text-[11px] sm:text-xs text-black font-mono font-bold mt-1">{content.subtitle || "Architectural capabilities & core skill sets"}</p>
            ))}
          </div>

          <div className={`${isMobile ? 'flex flex-col gap-4 w-full' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6'}`}>
            {categories.map((cat, idx) => (
              renderItem(`pillar-card-${idx}`, `Pillar Card ${idx + 1}`, (
                <div key={cat.name || idx} className={`border-3 border-black rounded-2xl p-5 space-y-4 shadow-[4px_4px_0px_#000] sm:shadow-[5px_5px_0px_#000] ${fills[idx % fills.length]} text-black w-full box-border`}>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-black rounded-xs" />
                    <h3 className="text-base sm:text-lg font-black uppercase tracking-tight">{cat.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cat.skills?.map((s) => (
                      <span key={s} className="px-2.5 py-1 bg-white text-black text-[10px] sm:text-xs font-mono font-black rounded-md border-2 border-black shadow-[1.5px_1.5px_0px_#000]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 2. Warm Editorial Pillars Variant
  if (isWarm) {
    return (
      <section className={`${isMobile ? 'p-4' : 'p-4 sm:p-8 md:p-20'} bg-[#FDFBF7] text-[#2C2621] font-serif border-b border-[#E7DEC8] w-full overflow-x-hidden`}>
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-10">
          {renderItem('pillars-header', 'Skills Header', (
            <h2 className={`${isMobile ? 'text-2xl' : 'text-2xl sm:text-3xl'} font-bold text-[#2C2621] text-center tracking-tight`}>{content.title || "Engineering Excellence"}</h2>
          ))}
          <div className={`${isMobile ? 'flex flex-col gap-4 w-full' : 'grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6'}`}>
            {categories.map((cat, cIdx) => renderItem(`skill-cat-${cIdx}`, `Skill Category ${cIdx + 1}`, (
              <div key={cat.name || cIdx} className="bg-[#F7F3EB] border border-[#E7DEC8] rounded-2xl p-5 sm:p-7 space-y-4 shadow-xs flex flex-col justify-between w-full box-border">
                <div className="space-y-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E7DEC8]/60 text-[#C2410C] flex items-center justify-center">
                    <Code className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#2C2621]">{cat.name}</h3>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cat.skills?.map((s) => (
                      <span key={s} className="px-2.5 py-0.5 sm:py-1 bg-[#E7DEC8]/40 rounded-full text-[11px] sm:text-xs font-sans font-semibold text-[#2C2621]">
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
      <section className={`${isMobile ? 'p-4' : 'p-4 sm:p-8 md:p-20'} bg-[#0a0e1a] text-white font-mono border-b border-cyan-500/20 w-full overflow-x-hidden`}>
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-10">
          <div className="flex items-center justify-between border-b border-cyan-500/30 pb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 shrink-0" />
              {renderItem('pillars-header', 'Skills Header', (
                <h2 className={`${isMobile ? 'text-lg' : 'text-xl sm:text-2xl'} font-black text-white`}>{content.title || "Microservice & Cloud Telemetry"}</h2>
              ))}
            </div>
            {renderItem('pillars-badge', 'Status Badge', (
              <span className={`text-[10px] sm:text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full ${isMobile ? 'hidden' : 'hidden sm:block'}`}>
                HEALTH: 100% OPERATIONAL
              </span>
            ))}
          </div>

          <div className={`${isMobile ? 'flex flex-col gap-4 w-full' : 'grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6'}`}>
            {categories.map((cat, cIdx) => renderItem(`skill-cat-${cIdx}`, `Telemetry Module ${cIdx + 1}`, (
              <div key={cat.name || cIdx} className="bg-[#0f172a] border border-cyan-500/30 rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4 shadow-[0_0_20px_rgba(0,245,255,0.08)] w-full box-border">
                <div className="flex items-center justify-between text-[11px] sm:text-xs text-cyan-400 font-bold border-b border-cyan-500/20 pb-2 gap-2">
                  <span className="shrink-0">MODULE // {cIdx + 1}</span>
                  <span className="text-slate-400 truncate">{cat.name}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                  {cat.skills?.map((skill) => (
                    <span key={skill} className="px-2.5 py-0.5 sm:py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] sm:text-xs rounded-lg font-mono">
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
    <section className={`${isMobile ? 'p-4' : 'p-4 sm:p-8 md:p-20'} bg-[#F8FAFC] text-slate-900 font-sans border-b border-slate-200 w-full overflow-x-hidden`}>
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-10">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          {renderItem('pillars-header', 'Skills Header', (
            <h2 className={`${isMobile ? 'text-2xl' : 'text-2xl sm:text-3xl'} font-black text-slate-900 tracking-tight`}>{content.title || "Technical Stack Matrix"}</h2>
          ))}
        </div>

        <div className={`${isMobile ? 'flex flex-col gap-4 w-full' : 'grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6'}`}>
          {categories.map((cat, cIdx) => renderItem(`skill-cat-${cIdx}`, `Skill Matrix ${cIdx + 1}`, (
            <div key={cat.name || cIdx} className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 space-y-4 shadow-xs w-full box-border">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 uppercase font-mono tracking-wider truncate">{cat.name}</h3>
                <span className="text-[9px] sm:text-[10px] font-mono font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md shrink-0">CORE</span>
              </div>
              <div className="space-y-2 pt-1">
                {cat.skills?.map((skill) => (
                  <div key={skill} className="flex items-center justify-between p-1.5 sm:p-2 rounded-xl hover:bg-slate-50 transition-colors">
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

