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
  EditableCanvasItem,
  viewMode = 'desktop'
}) {
  const content = block.content || {};
  const archetype = schema?.archetype || 'bento-minimal';
  const isMobile = viewMode === 'mobile';

  const isCyber = archetype === 'cyber-terminal' || archetype === 'cyber-ai';
  const isBrutalist = archetype === 'neo-brutalist';
  const isWarm = archetype === 'warm-editorial';

  const blockId = block.id;

  // Helper render for Editable wrapper if passed, else plain fallback
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
          onTriggerUpload={triggerFileUpload}
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

  // 1. Neo-Brutalist Hero Variant
  if (isBrutalist) {
    return (
      <section className={`${isMobile ? 'p-4' : 'p-4 sm:p-8 md:p-20'} bg-[#FFFDF5] text-black font-sans border-b-3 border-black w-full overflow-x-hidden`}>
        <div className={`max-w-6xl mx-auto ${isMobile ? 'flex flex-col gap-6 text-center' : 'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center'}`}>
          <div className={`${isMobile ? 'w-full space-y-4 flex flex-col items-center' : 'lg:col-span-7 space-y-4 sm:space-y-6'}`}>
            {renderItem('hero-tagline', 'Tagline', (
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#FFE600] border-2 border-black rounded-md font-mono text-[11px] sm:text-xs font-black text-black shadow-[2px_2px_0px_#000]">
                <Sparkles className="w-3.5 h-3.5 text-black shrink-0" />
                <span className="truncate">{content.headline || "Creative Developer & Designer"}</span>
              </div>
            ))}

            {renderItem('hero-name', 'Name / Title', (
              <h1 className={`${isMobile ? 'text-3xl font-black' : 'text-3xl sm:text-5xl lg:text-7xl font-black'} text-black leading-[1.08] tracking-tight uppercase break-words`}>
                {content.name || "I'm Kshitij Pilankar."}
              </h1>
            ))}

            {renderItem('hero-bio', 'Bio Paragraph', (
              <p className={`text-slate-800 ${isMobile ? 'text-sm font-bold' : 'text-sm sm:text-base md:text-lg font-bold'} leading-relaxed max-w-xl`}>
                {content.bio || "Building high-impact digital experiences with React 18, WebGL, and modern design systems."}
              </p>
            ))}

            <div className={`flex flex-wrap gap-4 pt-2 ${isMobile ? 'justify-center' : ''}`}>
              {renderItem('cta-primary', 'Primary Button', (
                <button
                  type="button"
                  onClick={scrollToProjects}
                  className="bg-[#FFE600] hover:bg-[#ebd300] text-black font-black text-xs sm:text-sm px-6 sm:px-8 py-3 sm:py-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>{content.ctaText || "Explore Projects"}</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              ))}
            </div>
          </div>

          <div className={`${isMobile ? 'w-full flex justify-center pt-2' : 'lg:col-span-5 flex justify-center pt-4 lg:pt-0'}`}>
            {renderItem('hero-avatar', 'Avatar Image', (
              <div className="w-full max-w-[240px] sm:max-w-sm aspect-[4/5] rounded-2xl overflow-hidden border-3 border-black bg-[#FFE600] shadow-[6px_6px_0px_#000] sm:shadow-[8px_8px_0px_#000] mx-auto">
                <img
                  src={content.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop"}
                  alt="Portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 2. Warm Editorial Hero Variant
  if (isWarm) {
    return (
      <section className={`${isMobile ? 'p-4' : 'p-4 sm:p-8 md:p-20'} bg-[#FDFBF7] text-[#2C2621] font-serif border-b border-[#E7DEC8] w-full overflow-x-hidden`}>
        <div className={`max-w-6xl mx-auto ${isMobile ? 'flex flex-col gap-6 text-center' : 'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center'}`}>
          <div className={`${isMobile ? 'w-full space-y-4 flex flex-col items-center' : 'lg:col-span-7 space-y-4 sm:space-y-6'}`}>
            {renderItem('hero-tagline', 'Tagline', (
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-[#F7F3EB] border border-[#E7DEC8] rounded-full text-[11px] sm:text-xs font-sans font-semibold text-[#C2410C]">
                <Sparkles className="w-3.5 h-3.5 text-[#C2410C] shrink-0" />
                <span className="truncate">{content.headline || "Creative Developer & Designer"}</span>
              </div>
            ))}

            {renderItem('hero-name', 'Name / Title', (
              <h1 className={`${isMobile ? 'text-3xl font-bold' : 'text-3xl sm:text-5xl lg:text-6xl font-bold'} text-[#2C2621] leading-[1.1] tracking-tight break-words`}>
                {content.name || "I'm Kshitij Pilankar."}
              </h1>
            ))}

            {renderItem('hero-bio', 'Bio Paragraph', (
              <p className={`text-[#645647] font-sans ${isMobile ? 'text-sm' : 'text-sm sm:text-base md:text-lg'} leading-relaxed max-w-xl`}>
                {content.bio || "Building high-impact digital experiences with React 18, WebGL, and refined publication design tokens."}
              </p>
            ))}

            <div className={`flex flex-wrap gap-4 pt-2 ${isMobile ? 'justify-center' : ''}`}>
              {renderItem('cta-primary', 'Primary Button', (
                <button
                  type="button"
                  onClick={scrollToProjects}
                  className="bg-[#C2410C] hover:bg-[#a3360a] text-white font-sans font-bold text-xs sm:text-sm px-6 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-sm transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>{content.ctaText || "Explore Projects"}</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              ))}
            </div>
          </div>

          <div className={`${isMobile ? 'w-full flex justify-center pt-2' : 'lg:col-span-5 flex justify-center pt-4 lg:pt-0'}`}>
            {renderItem('hero-avatar', 'Avatar Image', (
              <div className="w-full max-w-[240px] sm:max-w-sm aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border border-[#E7DEC8] bg-[#F7F3EB] mx-auto">
                <img
                  src={content.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop"}
                  alt="Portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 3. Cyber Terminal Hero Variant
  if (isCyber) {
    return (
      <section className={`${isMobile ? 'p-4 min-h-[360px]' : 'p-4 sm:p-8 md:p-16 min-h-[420px] sm:min-h-[520px]'} flex flex-col justify-center bg-[#090d16] text-white font-mono relative overflow-hidden border-b border-cyan-500/20 w-full`}>
        <div className={`max-w-6xl mx-auto w-full ${isMobile ? 'flex flex-col gap-6 text-center' : 'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center'}`}>
          <div className={`${isMobile ? 'w-full space-y-4 flex flex-col items-center' : 'lg:col-span-7 space-y-4 sm:space-y-6'}`}>
            {renderItem('hero-tagline', 'Tagline', (
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-[11px] sm:text-xs font-mono text-cyan-400 shadow-[0_0_15px_rgba(0,245,255,0.15)]">
                <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">zsh ~ developer-profile --active</span>
              </div>
            ))}

            {renderItem('hero-name', 'Name / Title', (
              <h1 className={`${isMobile ? 'text-3xl' : 'text-3xl sm:text-5xl lg:text-6xl'} font-black text-white leading-tight tracking-tight break-words`}>
                {content.name || "Kshitij Pilankar"}
              </h1>
            ))}

            {renderItem('hero-bio', 'Bio Paragraph', (
              <p className={`text-slate-300 ${isMobile ? 'text-xs' : 'text-xs sm:text-sm md:text-base'} leading-relaxed font-mono`}>
                {content.bio || "Architecting high-throughput neural inference pipelines, vector databases, and real-time streaming AI agents."}
              </p>
            ))}

            <div className={`flex flex-wrap gap-4 pt-2 ${isMobile ? 'justify-center' : ''}`}>
              {renderItem('cta-primary', 'Primary Button', (
                <button
                  type="button"
                  onClick={scrollToProjects}
                  className="bg-[#00f5ff] hover:bg-[#00d0db] text-black font-black text-xs px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all cursor-pointer flex items-center gap-2"
                >
                  <Cpu className="w-4 h-4 text-black" />
                  <span>Explore Cyber Models</span>
                </button>
              ))}
            </div>
          </div>

          <div className={`${isMobile ? 'w-full pt-2' : 'lg:col-span-5 w-full'}`}>
            {renderItem('hero-telemetry', 'System Telemetry Card', (
              <div className="bg-[#0f172a] border border-cyan-500/30 rounded-2xl p-4 sm:p-5 shadow-[0_0_25px_rgba(0,245,255,0.1)] space-y-3 font-mono text-xs w-full box-border">
                <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 gap-2">
                  <span className="text-cyan-400 font-bold text-[11px] sm:text-xs truncate">SYSTEM TELEMETRY</span>
                  <span className="text-emerald-400 text-[9px] sm:text-[10px] bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded shrink-0">STATUS: ONLINE</span>
                </div>
                <div className="space-y-2 text-slate-300 pt-1 text-[11px] sm:text-xs">
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
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 4. Default Bento-Minimal Hero Variant
  return (
    <section className={`${isMobile ? 'p-4 min-h-[360px]' : 'p-4 sm:p-8 md:p-20 min-h-[420px] sm:min-h-[520px]'} flex flex-col items-center justify-center bg-[#F8FAFC] text-slate-900 font-sans text-center border-b border-slate-200 w-full overflow-x-hidden`}>
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 flex flex-col items-center">
        {renderItem('hero-tagline', 'Tagline', (
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-white border border-slate-200 rounded-full text-[11px] sm:text-xs font-bold text-slate-800 shadow-xs max-w-full">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="truncate">Available for Q3 Projects & Engineering Roles</span>
          </div>
        ))}

        {renderItem('hero-name', 'Name / Title', (
          <h1 className={`${isMobile ? 'text-3xl font-black' : 'text-3xl sm:text-5xl lg:text-7xl font-black'} text-slate-900 leading-[1.08] tracking-tight break-words`}>
            {content.name || "I'm Kshitij Pilankar."}
          </h1>
        ))}

        {renderItem('hero-bio', 'Bio Paragraph', (
          <p className={`text-slate-600 ${isMobile ? 'text-sm' : 'text-sm sm:text-base md:text-lg'} leading-relaxed max-w-2xl font-normal`}>
            {content.bio || "Building high-impact digital experiences with React 18, WebGL, and modern design systems."}
          </p>
        ))}

        <div className="flex flex-wrap gap-4 pt-2 sm:pt-4 justify-center">
          {renderItem('cta-primary', 'Primary Button', (
            <button
              type="button"
              onClick={scrollToProjects}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>View Selected Works</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}


