import React from 'react';
import { ExternalLink } from 'lucide-react';

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
