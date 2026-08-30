import React from 'react';
import { Cpu, Layers, Server, Code } from 'lucide-react';

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

  return (
    <section className="p-8 sm:p-16 bg-white font-sans text-slate-900">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Title */}
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

        {/* 3 Pastel Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Soft Sky Blue Tint */}
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

          {/* Card 2: Warm Peach/Amber Tint */}
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

          {/* Card 3: Light Lavender/Slate Tint */}
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
