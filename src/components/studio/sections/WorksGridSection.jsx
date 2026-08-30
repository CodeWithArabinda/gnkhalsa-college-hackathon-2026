import React from 'react';
import { ExternalLink, ArrowUpRight, GitBranch, Terminal, Shield, Cpu } from 'lucide-react';

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
  EditableCanvasItem
}) {
  const content = block.content || {};
  const items = content.items || [];
  const variant = block.layoutVariant || content.layoutVariant || 'numbered-grid';

  // Variant 3: Cyber Terminal Repositories Layout
  if (variant === 'terminal-repos' || variant === 'minimal-list') {
    return (
      <section id="projects-section" ref={projectsRef} className="p-8 sm:p-20 bg-[#070b14] text-white font-mono border-t border-b border-cyan-500/20">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="flex items-center justify-between border-b border-cyan-500/30 pb-4">
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-cyan-400" />
              <div>
                <h2 className="text-2xl font-black text-white">{content.title || "Production Repositories & Models"}</h2>
                <p className="text-xs text-cyan-400/80 font-mono mt-0.5">git log --oneline --graph --all</p>
              </div>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-md hidden sm:block">
              ● REPOS ACTIVE: {items.length || 3}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((item, pIdx) => {
              const mockHash = (1234567 + pIdx * 987654).toString(16).slice(0, 7);
              return (
                <div key={item.id || pIdx} className="bg-[#0f172a] border border-cyan-500/30 rounded-2xl p-6 space-y-4 shadow-[0_0_20px_rgba(0,245,255,0.08)] hover:border-cyan-400 transition-colors group">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <GitBranch className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs text-slate-400 font-mono">commit {mockHash}</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      ● master
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-mono line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-cyan-500/20 text-xs">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags?.map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-cyan-500/10 text-cyan-300 text-[10px] font-mono rounded border border-cyan-500/20">
                          {t}
                        </span>
                      ))}
                    </div>
                    <a href={item.link || '#'} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-white p-1">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    );
  }

  // Variant 2: Apple Bento Grid (Asymmetrical Layout)
  if (variant === 'apple-bento') {
    const spotlightItem = items[0] || {
      title: "Spotlight Architecture",
      description: "Next-gen web application with real-time state synchronization.",
      tags: ["React 18", "WebGL", "TypeScript"],
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop"
    };

    const subItems = items.slice(1);

    return (
      <section id="projects-section" ref={projectsRef} className="p-8 sm:p-20 bg-slate-50/70 text-slate-900 font-sans border-t border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="flex items-end justify-between border-b border-slate-200 pb-5">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{content.title || "Selected Works"}</h2>
              <p className="text-xs text-slate-500 font-mono mt-1">{content.subtitle || "Selected software and design showcases"}</p>
            </div>
            <button type="button" className="border border-slate-300 rounded-full px-5 py-2 text-xs font-semibold text-slate-800 hidden sm:block">View All Work</button>
          </div>

          {/* Asymmetrical Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Spotlight Card (2 cols wide) */}
            <div className="md:col-span-2 bg-white border border-slate-200/90 rounded-3xl p-7 space-y-6 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-black text-[#0053ff] bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full uppercase">
                    SPOTLIGHT SHOWCASE
                  </span>
                  <a href={spotlightItem.link || '#'} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#0053ff] transition-colors">
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-[#0053ff] transition-colors">
                  {spotlightItem.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                  {spotlightItem.description}
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-slate-100 relative mt-4">
                <img
                  src={spotlightItem.imageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop"}
                  alt={spotlightItem.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {spotlightItem.tags?.map((t) => (
                  <span key={t} className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-mono font-bold rounded-lg">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Stacked Sub-Cards (1 col wide) */}
            <div className="space-y-6 flex flex-col justify-between">
              {subItems.map((item, sIdx) => (
                <div key={item.id || sIdx} className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-extrabold text-lg text-slate-900">{item.title}</h4>
                      <a href={item.link || '#'} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#0053ff]">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{item.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                    {item.tags?.map((t) => (
                      <span key={t} className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-mono rounded font-semibold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>
    );
  }

  // Default Variant 1: Numbered 3-Column Card Grid
  return (
    <section id="projects-section" ref={projectsRef} className="p-8 sm:p-16 space-y-8 bg-slate-50/60 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="flex items-end justify-between border-b border-slate-200 pb-5">
          <div className="space-y-1">
            <EditableCanvasItem
              elementKey="projects-title"
              label="Section Title"
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
                className="text-3xl font-black text-slate-900 tracking-tight outline-none"
              >
                {content.title || "Selected Works"}
              </h2>
            </EditableCanvasItem>

            <EditableCanvasItem
              elementKey="projects-subtitle"
              label="Section Subtitle"
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
              <p
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleInlineChange(block.id, 'content.subtitle', e.target.innerText)}
                className="text-xs text-slate-500 font-mono outline-none"
              >
                {content.subtitle || "Selected software and design showcases"}
              </p>
            </EditableCanvasItem>
          </div>

          <button
            type="button"
            className="border border-slate-300 rounded-full px-5 py-2 text-xs font-semibold text-slate-800 hover:bg-white hover:shadow-xs transition-all cursor-pointer hidden sm:block"
          >
            View All Work
          </button>
        </div>

        {/* 3-Column Numbered Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, pIdx) => {
            const formattedIndex = String(pIdx + 1).padStart(2, '0');
            const defaultImg = pIdx === 0
              ? "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop"
              : pIdx === 1
              ? "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop"
              : "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop";

            return (
              <EditableCanvasItem
                key={item.id || pIdx}
                elementKey={`project-card-${pIdx}`}
                label={`Project: ${item.title}`}
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
                <div className="bg-white border border-slate-200/90 rounded-3xl p-5 space-y-4 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all group">
                  
                  {/* Thumbnail Image */}
                  <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100 relative">
                    <img
                      src={item.imageUrl || defaultImg}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Header Row: Title & Number Index */}
                  <div className="flex justify-between items-start pt-1">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#0053ff] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mt-1.5 font-sans">
                        {item.description}
                      </p>
                    </div>

                    <span className="font-mono text-sm font-black text-slate-400 shrink-0 ml-3">
                      {formattedIndex}
                    </span>
                  </div>

                  {/* Tech Tags & External Link */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags?.map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-mono rounded-md font-semibold">
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href={item.link || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-[#0053ff] p-1 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                </div>
              </EditableCanvasItem>
            );
          })}
        </div>

      </div>
    </section>
  );
}
