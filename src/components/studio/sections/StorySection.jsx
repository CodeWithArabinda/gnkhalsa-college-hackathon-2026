import React from 'react';

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
  EditableCanvasItem
}) {
  return (
    <section id="story-section" className="p-8 sm:p-16 bg-slate-50/50 font-sans text-slate-900 border-t border-b border-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        
        {/* Left: Workstation Photography */}
        <div className="rounded-[32px] overflow-hidden shadow-xl aspect-square bg-slate-200 border border-slate-200/80 relative">
          <img
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&auto=format&fit=crop"
            alt="Engineering Workstation"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Narrative Content */}
        <div className="space-y-6">
          <EditableCanvasItem
            elementKey="story-title"
            label="Story Title"
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
              className="text-4xl font-black text-slate-900 tracking-tight outline-none"
            >
              The Architect
            </h2>
          </EditableCanvasItem>

          <div className="text-slate-600 text-sm leading-relaxed space-y-4 font-normal">
            <p>
              Engineering digital software requires an uncompromised balance between aesthetic precision and technical integrity. Over the past 6+ years, I have architected web applications, microservices, and interactive canvases for startups and digital studios.
            </p>
            <p>
              My design philosophy is grounded in Humanist UI principles — clean contrast, accessible typography, fluid micro-animations, and fast page loads that keep users focused on what matters most.
            </p>
            <p>
              Whether engineering complex stateful canvases or setting up CI/CD pipelines on Vercel and AWS, I ensure every line of code is structured for maintainability and long-term scale.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
