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
  EditableCanvasItem
}) {
  const content = block.content || {};
  const items = content.items || [];
  const archetype = schema?.archetype || 'bento-minimal';

  const isCyber = archetype === 'cyber-terminal' || archetype === 'cyber-ai';
  const isBrutalist = archetype === 'neo-brutalist';
  const isWarm = archetype === 'warm-editorial';

  // 1. Neo-Brutalist Works Variant
  if (isBrutalist) {
    return (
      <section id="projects-section" ref={projectsRef} className="p-8 sm:p-20 bg-[#FFFDF5] text-black font-sans border-b-3 border-black">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-end justify-between border-b-3 border-black pb-5">
            <div>
              <h2 className="text-3xl font-black text-black uppercase tracking-tight">{content.title || "Selected Works"}</h2>
              <p className="text-xs text-black font-mono font-bold mt-1">{content.subtitle || "Selected software and design showcases"}</p>
            </div>
            <button type="button" className="border-2 border-black bg-white rounded-xl px-5 py-2 text-xs font-black text-black shadow-[2.5px_2.5px_0px_#000] hidden sm:block">View All Work</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((item, pIdx) => {
              const defaultImg = pIdx === 0 ? "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop" : pIdx === 1 ? "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop" : "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop";
              return (
                <div key={item.id || pIdx} className="bg-white border-3 border-black rounded-2xl p-5 space-y-4 shadow-[5px_5px_0px_#000]">
                  <div className="rounded-xl overflow-hidden aspect-[16/10] bg-slate-100 border-2 border-black">
                    <img src={item.imageUrl || defaultImg} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex justify-between items-start pt-1">
                    <div>
                      <h3 className="font-black text-lg text-black">{item.title}</h3>
                      <p className="text-xs text-slate-800 font-semibold leading-relaxed line-clamp-3 mt-1.5">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t-2 border-black">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags?.map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-[#FFE600] text-black text-[10px] font-mono rounded font-black border border-black shadow-[1px_1px_0px_#000]">
                          {t}
                        </span>
                      ))}
                    </div>
                    <a href={item.link || '#'} target="_blank" rel="noreferrer" className="text-black p-1"><ExternalLink className="w-4 h-4" /></a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // 2. Warm Editorial Works Variant
  if (isWarm) {
    return (
      <section id="projects-section" ref={projectsRef} className="p-8 sm:p-20 bg-[#FDFBF7] text-[#2C2621] font-serif border-b border-[#E7DEC8]">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="border-b border-[#E7DEC8] pb-5">
            <h2 className="text-3xl font-bold text-[#2C2621] tracking-tight">{content.title || "Selected Works"}</h2>
            <p className="text-xs text-[#7A6C5D] font-sans mt-1">{content.subtitle || "Selected software and design showcases"}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((item, pIdx) => (
              <div key={item.id || pIdx} className="bg-[#F7F3EB] border border-[#E7DEC8] rounded-2xl p-6 space-y-4 shadow-xs">
                <div className="rounded-xl overflow-hidden aspect-[16/10] bg-[#E7DEC8]">
                  <img src={item.imageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop"} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-lg text-[#2C2621]">{item.title}</h3>
                <p className="text-xs text-[#645647] font-sans leading-relaxed line-clamp-3">{item.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-[#E7DEC8]">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags?.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-[#E7DEC8]/60 text-[#2C2621] text-[10px] font-sans rounded font-semibold">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a href={item.link || '#'} target="_blank" rel="noreferrer" className="text-[#C2410C] p-1"><ArrowUpRight className="w-4 h-4" /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 3. Cyber Terminal Repositories Variant
  if (isCyber) {
    return (
      <section id="projects-section" ref={projectsRef} className="p-8 sm:p-20 bg-[#070b14] text-white font-mono border-b border-cyan-500/20">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between border-b border-cyan-500/30 pb-4">
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-cyan-400" />
              <h2 className="text-2xl font-black text-white">{content.title || "Production Repositories & Models"}</h2>
            </div>
            <span className="text-xs text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-md hidden sm:block">
              ● REPOS ACTIVE: {items.length || 3}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((item, pIdx) => {
              const mockHash = (1234567 + pIdx * 987654).toString(16).slice(0, 7);
              return (
                <div key={item.id || pIdx} className="bg-[#0f172a] border border-cyan-500/30 rounded-2xl p-6 space-y-4 shadow-[0_0_20px_rgba(0,245,255,0.08)]">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <GitBranch className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs text-slate-400">commit {mockHash}</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">● master</span>
                  </div>
                  <h3 className="font-bold text-lg text-white">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">{item.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-cyan-500/20 text-xs">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags?.map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-cyan-500/10 text-cyan-300 text-[10px] rounded border border-cyan-500/20">{t}</span>
                      ))}
                    </div>
                    <a href={item.link || '#'} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-white p-1"><ExternalLink className="w-4 h-4" /></a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // 4. Default Bento-Minimal Asymmetrical Variant
  const spotlightItem = items[0] || {
    title: "Spotlight Architecture",
    description: "Next-gen web application with real-time state synchronization.",
    tags: ["React 18", "WebGL", "TypeScript"],
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop"
  };
  const subItems = items.slice(1);

  return (
    <section id="projects-section" ref={projectsRef} className="p-8 sm:p-20 bg-[#F8FAFC] text-slate-900 font-sans border-b border-slate-200">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-end justify-between border-b border-slate-200 pb-5">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{content.title || "Selected Works"}</h2>
            <p className="text-xs text-slate-500 font-mono mt-1">{content.subtitle || "Selected software and design showcases"}</p>
          </div>
          <button type="button" className="border border-slate-300 rounded-full px-5 py-2 text-xs font-semibold text-slate-800 hidden sm:block">View All Work</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-7 space-y-6 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-black text-slate-900 bg-slate-100 px-2.5 py-1 rounded-full uppercase">
                  SPOTLIGHT SHOWCASE
                </span>
                <a href={spotlightItem.link || '#'} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900"><ArrowUpRight className="w-5 h-5" /></a>
              </div>
              <h3 className="text-2xl font-black text-slate-900">{spotlightItem.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xl">{spotlightItem.description}</p>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-slate-100">
              <img src={spotlightItem.imageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop"} alt={spotlightItem.title} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="space-y-6 flex flex-col justify-between">
            {subItems.map((item, sIdx) => (
              <div key={item.id || sIdx} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-extrabold text-lg text-slate-900">{item.title}</h4>
                    <a href={item.link || '#'} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900"><ExternalLink className="w-4 h-4" /></a>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{item.description}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                  {item.tags?.map((t) => (
                    <span key={t} className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-mono rounded font-semibold">{t}</span>
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
