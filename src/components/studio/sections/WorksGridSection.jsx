import React from 'react';
import { ExternalLink, ArrowUpRight, GitBranch, Terminal } from 'lucide-react';

export default function WorksGridSection({
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
  projectsRef,
  EditableCanvasItem,
  viewMode = 'desktop'
}) {
  const content = block.content || {};
  const items = content.items || [];
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

  // 1. Neo-Brutalist Works Variant
  if (isBrutalist) {
    return (
      <section id="projects-section" ref={projectsRef} className={`${isMobile ? 'p-4' : 'p-4 sm:p-8 md:p-20'} bg-[#FFFDF5] text-black font-sans border-b-3 border-black w-full overflow-x-hidden`}>
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          <div className="flex items-end justify-between border-b-3 border-black pb-4 sm:pb-5">
            <div>
              {renderItem('works-header', 'Works Title', (
                <h2 className={`${isMobile ? 'text-2xl' : 'text-2xl sm:text-3xl'} font-black text-black uppercase tracking-tight`}>{content.title || "Selected Works"}</h2>
              ))}
              {renderItem('works-subtitle', 'Works Subtitle', (
                <p className="text-[11px] sm:text-xs text-black font-mono font-bold mt-1">{content.subtitle || "Selected software and design showcases"}</p>
              ))}
            </div>
          </div>

          <div className={`${isMobile ? 'flex flex-col gap-4 w-full' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6'}`}>
            {items.map((item, pIdx) => {
              const defaultImg = pIdx === 0 ? "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop" : pIdx === 1 ? "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop" : "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop";
              return renderItem(`project-item-${pIdx}`, `Project Card ${pIdx + 1}`, (
                <div key={item.id || pIdx} className="bg-white border-3 border-black rounded-2xl p-4 sm:p-5 space-y-3 sm:space-y-4 shadow-[4px_4px_0px_#000] sm:shadow-[5px_5px_0px_#000] w-full box-border">
                  <div className="rounded-xl overflow-hidden aspect-[16/10] bg-slate-100 border-2 border-black">
                    <img src={item.imageUrl || defaultImg} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex justify-between items-start pt-1">
                    <div>
                      <h3 className="font-black text-base sm:text-lg text-black">{item.title}</h3>
                      <p className="text-xs text-slate-800 font-semibold leading-relaxed line-clamp-3 mt-1">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t-2 border-black gap-2">
                    <div className="flex flex-wrap gap-1">
                      {item.tags?.map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-[#FFE600] text-black text-[9px] sm:text-[10px] font-mono rounded font-black border border-black shadow-[1px_1px_0px_#000]">
                          {t}
                        </span>
                      ))}
                    </div>
                    <a href={item.link || '#'} target="_blank" rel="noreferrer" className="text-black p-1 shrink-0"><ExternalLink className="w-4 h-4" /></a>
                  </div>
                </div>
              ));
            })}
          </div>
        </div>
      </section>
    );
  }

  // 2. Warm Editorial Works Variant
  if (isWarm) {
    return (
      <section id="projects-section" ref={projectsRef} className={`${isMobile ? 'p-4' : 'p-4 sm:p-8 md:p-20'} bg-[#FDFBF7] text-[#2C2621] font-serif border-b border-[#E7DEC8] w-full overflow-x-hidden`}>
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          <div className="border-b border-[#E7DEC8] pb-4 sm:pb-5">
            {renderItem('works-header', 'Works Title', (
              <h2 className={`${isMobile ? 'text-2xl' : 'text-2xl sm:text-3xl'} font-bold text-[#2C2621] tracking-tight`}>{content.title || "Selected Works"}</h2>
            ))}
            {renderItem('works-subtitle', 'Works Subtitle', (
              <p className="text-[11px] sm:text-xs text-[#7A6C5D] font-sans mt-1">{content.subtitle || "Selected software and design showcases"}</p>
            ))}
          </div>

          <div className={`${isMobile ? 'flex flex-col gap-4 w-full' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6'}`}>
            {items.map((item, pIdx) => {
              return renderItem(`project-item-${pIdx}`, `Project Card ${pIdx + 1}`, (
                <div key={item.id || pIdx} className="bg-[#F7F3EB] border border-[#E7DEC8] rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4 shadow-xs w-full box-border">
                  <div className="rounded-xl overflow-hidden aspect-[16/10] bg-[#E7DEC8]">
                    <img src={item.imageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop"} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-[#2C2621]">{item.title}</h3>
                  <p className="text-xs text-[#645647] font-sans leading-relaxed line-clamp-3">{item.description}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-[#E7DEC8] gap-2">
                    <div className="flex flex-wrap gap-1">
                      {item.tags?.map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-[#E7DEC8]/60 text-[#2C2621] text-[9px] sm:text-[10px] font-sans rounded font-semibold">
                          {t}
                        </span>
                      ))}
                    </div>
                    <a href={item.link || '#'} target="_blank" rel="noreferrer" className="text-[#C2410C] p-1 shrink-0"><ArrowUpRight className="w-4 h-4" /></a>
                  </div>
                </div>
              ));
            })}
          </div>
        </div>
      </section>
    );
  }

  // 3. Cyber Terminal Repositories Variant
  if (isCyber) {
    return (
      <section id="projects-section" ref={projectsRef} className={`${isMobile ? 'p-4' : 'p-4 sm:p-8 md:p-20'} bg-[#070b14] text-white font-mono border-b border-cyan-500/20 w-full overflow-x-hidden`}>
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          <div className="flex items-center justify-between border-b border-cyan-500/30 pb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 shrink-0" />
              {renderItem('works-header', 'Works Title', (
                <h2 className={`${isMobile ? 'text-lg' : 'text-xl sm:text-2xl'} font-black text-white`}>{content.title || "Production Repositories & Models"}</h2>
              ))}
            </div>
            {renderItem('works-badge', 'Active Repos Badge', (
              <span className={`text-[10px] sm:text-xs text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-1 rounded-md ${isMobile ? 'hidden' : 'hidden sm:block'}`}>
                ● REPOS ACTIVE: {items.length || 3}
              </span>
            ))}
          </div>

          <div className={`${isMobile ? 'flex flex-col gap-4 w-full' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6'}`}>
            {items.map((item, pIdx) => {
              const mockHash = (1234567 + pIdx * 987654).toString(16).slice(0, 7);
              return renderItem(`project-item-${pIdx}`, `Repo Card ${pIdx + 1}`, (
                <div key={item.id || pIdx} className="bg-[#0f172a] border border-cyan-500/30 rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4 shadow-[0_0_20px_rgba(0,245,255,0.08)] w-full box-border">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-1.5">
                      <GitBranch className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="text-[11px] sm:text-xs text-slate-400">commit {mockHash}</span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 shrink-0">● master</span>
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-white">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">{item.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-cyan-500/20 text-xs gap-2">
                    <div className="flex flex-wrap gap-1">
                      {item.tags?.map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-cyan-500/10 text-cyan-300 text-[9px] sm:text-[10px] rounded border border-cyan-500/20">{t}</span>
                      ))}
                    </div>
                    <a href={item.link || '#'} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-white p-1 shrink-0"><ExternalLink className="w-4 h-4" /></a>
                  </div>
                </div>
              ));
            })}
          </div>
        </div>
      </section>
    );
  }

  // 4. Default Bento-Minimal Asymmetrical Variant
  return (
    <section id="projects-section" ref={projectsRef} className={`${isMobile ? 'p-4' : 'p-4 sm:p-8 md:p-20'} bg-[#F8FAFC] text-slate-900 font-sans border-b border-slate-200 w-full overflow-x-hidden`}>
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        <div className="flex items-end justify-between border-b border-slate-200 pb-4 sm:pb-5">
          <div>
            {renderItem('works-header', 'Works Title', (
              <h2 className={`${isMobile ? 'text-2xl' : 'text-2xl sm:text-3xl'} font-black text-slate-900 tracking-tight`}>{content.title || "Selected Works"}</h2>
            ))}
            {renderItem('works-subtitle', 'Works Subtitle', (
              <p className="text-[11px] sm:text-xs text-slate-500 font-mono mt-1">{content.subtitle || "Selected software and design showcases"}</p>
            ))}
          </div>
        </div>

        <div className={`${isMobile ? 'flex flex-col gap-4 w-full' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6'}`}>
          {items.map((item, pIdx) => {
            return renderItem(`project-item-${pIdx}`, `Showcase Card ${pIdx + 1}`, (
              <div key={item.id || pIdx} className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-3 sm:space-y-4 shadow-xs flex flex-col justify-between w-full box-border">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900">{item.title}</h3>
                    <a href={item.link || '#'} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 p-1 shrink-0"><ExternalLink className="w-4 h-4" /></a>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{item.description}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                  {item.tags?.map((t) => (
                    <span key={t} className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[9px] sm:text-[10px] font-mono rounded font-semibold">{t}</span>
                  ))}
                </div>
              </div>
            ));
          })}
        </div>
      </div>
    </section>
  );
}

