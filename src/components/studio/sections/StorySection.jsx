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
  EditableCanvasItem,
  viewMode = 'desktop'
}) {
  const content = block.content || {};
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

  // 1. Neo-Brutalist Story Variant
  if (isBrutalist) {
    return (
      <section id="story-section" className={`${isMobile ? 'px-4 py-8' : 'p-4 sm:p-8 md:p-20'} bg-[#FFFDF5] text-black font-sans border-b-3 border-black w-full overflow-x-hidden`}>
        <div className={`max-w-6xl mx-auto bg-white border-3 border-black rounded-2xl p-5 sm:p-8 space-y-4 sm:space-y-6 shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] w-full box-border ${isMobile ? 'flex flex-col items-center text-center' : ''}`}>
          {renderItem('story-badge', 'Story Badge', (
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#FFE600] border-2 border-black rounded-md font-mono text-[11px] sm:text-xs font-black text-black shadow-[2px_2px_0px_#000]">
              <span className="truncate">✦ ARCHITECTURAL PHILOSOPHY ✦</span>
            </div>
          ))}
          {renderItem('story-title', 'Story Title', (
            <h2 className={`${isMobile ? 'text-2xl font-black' : 'text-2xl sm:text-3xl md:text-4xl font-black'} text-black uppercase tracking-tight break-words`}>
              {content.title || "The Architect"}
            </h2>
          ))}
          {renderItem('story-bio', 'Story Paragraph', (
            <div className={`text-slate-900 text-xs sm:text-sm leading-relaxed space-y-3 font-bold ${isMobile ? 'max-w-xs mx-auto text-center' : ''}`}>
              <p>{content.bio || "Engineering digital software requires an uncompromised balance between aesthetic precision and technical integrity."}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // 2. Warm Editorial Story Variant
  if (isWarm) {
    return (
      <section id="story-section" className={`w-full ${isMobile ? 'px-4 py-8 flex flex-col items-center text-center' : 'p-4 sm:p-8 md:p-20'} bg-[#FDFBF7] text-[#2C2621] font-serif border-b border-[#E7DEC8] overflow-x-hidden`}>
        <div className={`max-w-6xl mx-auto ${isMobile ? 'flex flex-col items-center text-center gap-6 w-full' : 'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center'}`}>
          {/* Image Container */}
          <div className={`w-full ${isMobile ? 'max-w-[320px] aspect-[4/3] rounded-2xl overflow-hidden shadow-md mb-2 mx-auto' : 'rounded-2xl overflow-hidden shadow-lg aspect-square max-w-md mx-auto'} bg-[#F7F3EB] border border-[#E7DEC8]`}>
            <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&auto=format&fit=crop" alt="Career Story" className="w-full h-full object-cover" />
          </div>
          <div className={`space-y-3 sm:space-y-4 ${isMobile ? 'text-center flex flex-col items-center' : 'text-left'}`}>
            {renderItem('story-title', 'Story Title', (
              <h2 className={`${isMobile ? 'text-2xl font-serif font-bold text-neutral-900 mb-2' : 'text-2xl sm:text-4xl font-bold text-[#2C2621]'} tracking-tight break-words`}>
                {content.title || "Career Milestone Story"}
              </h2>
            ))}
            {renderItem('story-bio', 'Story Paragraph', (
              <p className={`${isMobile ? 'text-xs font-serif leading-relaxed text-neutral-600 max-w-xs mx-auto' : 'text-[#645647] font-sans text-xs sm:text-sm leading-relaxed space-y-3'}`}>
                {content.bio || "Engineering digital software requires an uncompromised balance between aesthetic precision and technical integrity."}
              </p>
            ))}
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
      <section id="story-section" className={`${isMobile ? 'px-4 py-8' : 'p-4 sm:p-8 md:p-20'} bg-[#090d16] text-white font-mono border-b border-cyan-500/20 w-full overflow-x-hidden`}>
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-10">
          <div className="border-b border-cyan-500/30 pb-4">
            {renderItem('story-title', 'Timeline Title', (
              <h2 className={`${isMobile ? 'text-xl text-center' : 'text-2xl sm:text-3xl'} font-black text-white break-words`}>Engineering Timeline & Milestones</h2>
            ))}
            {renderItem('story-subtitle', 'Timeline Subtitle', (
              <p className={`text-[11px] sm:text-xs text-cyan-400 mt-1 ${isMobile ? 'text-center' : ''}`}>Key career checkpoints and architectural achievements</p>
            ))}
          </div>
          <div className={`border-l-2 border-cyan-500/40 ${isMobile ? 'ml-2 pl-3' : 'ml-3 sm:ml-4 pl-4 sm:pl-6'} space-y-6 sm:space-y-8 relative`}>
            {milestones.map((m, idx) => renderItem(`milestone-card-${idx}`, `Milestone Card ${idx + 1}`, (
              <div key={m.year || idx} className="relative group">
                <div className={`absolute ${isMobile ? '-left-[19px]' : '-left-[25px] sm:-left-[31px]'} top-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#090d16] border-2 border-cyan-400 flex items-center justify-center`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                </div>
                <div className="bg-[#0f172a] border border-cyan-500/30 rounded-2xl p-4 sm:p-6 space-y-2 w-full box-border">
                  <span className="text-[10px] sm:text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30 font-mono">{m.year}</span>
                  <h3 className="text-base sm:text-lg font-bold text-white pt-1">{m.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{m.detail}</p>
                </div>
              </div>
            )))}
          </div>
        </div>
      </section>
    );
  }

  // 4. Default Bento-Minimal Manifesto Variant
  return (
    <section id="story-section" className={`${isMobile ? 'px-4 py-8 sm:py-12' : 'p-6 sm:p-12 md:p-24'} bg-[#F8FAFC] text-slate-900 font-sans text-center border-b border-slate-200 w-full overflow-x-hidden`}>
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-8 flex flex-col items-center">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white border border-slate-200 text-slate-900 flex items-center justify-center shadow-xs">
          <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-slate-800" />
        </div>
        {renderItem('story-bio', 'Manifesto Pull Quote', (
          <blockquote className={`${isMobile ? 'text-lg sm:text-xl' : 'text-xl sm:text-3xl md:text-4xl'} font-black text-slate-900 leading-tight tracking-tight max-w-3xl break-words px-2`}>
            "{content.bio || "Engineering digital software requires an uncompromised balance between aesthetic precision and technical integrity."}"
          </blockquote>
        ))}
      </div>
    </section>
  );
}


