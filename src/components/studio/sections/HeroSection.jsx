import React from 'react';
import { Sparkles } from 'lucide-react';

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
  EditableCanvasItem
}) {
  const content = block.content || {};

  return (
    <section className="p-8 sm:p-16 flex flex-col justify-center min-h-[500px] relative overflow-hidden bg-white text-slate-900 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-6xl mx-auto w-full pt-4">
        
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Badge */}
          <EditableCanvasItem
            elementKey="hero-tagline"
            label="Tagline"
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
            className="self-start inline-block"
          >
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-blue-50 border border-blue-200/60 rounded-full text-xs font-semibold text-[#0053ff]">
              <Sparkles className="w-3.5 h-3.5 text-[#ff5100]" />
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleInlineChange(block.id, 'content.headline', e.target.innerText)}
                className="outline-none"
              >
                {content.headline || "Creative Developer & Designer"}
              </span>
            </div>
          </EditableCanvasItem>

          {/* Main Headline */}
          <EditableCanvasItem
            elementKey="hero-headline"
            label="Main Headline"
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
            <h1
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleInlineChange(block.id, 'content.name', e.target.innerText)}
              className="text-5xl sm:text-6xl font-black text-slate-900 leading-[1.08] tracking-tight outline-none"
            >
              {content.name || "I'm Kshitij Pilankar."}
            </h1>
          </EditableCanvasItem>

          {/* Editorial Bio */}
          <EditableCanvasItem
            elementKey="hero-bio"
            label="Bio Paragraph"
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
              onBlur={(e) => handleInlineChange(block.id, 'content.bio', e.target.innerText)}
              className="text-slate-600 text-base leading-relaxed max-w-xl font-normal outline-none"
            >
              {content.bio || "Building high-impact digital experiences with modern web technologies, WebGL, and scalable design systems."}
            </p>
          </EditableCanvasItem>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <EditableCanvasItem
              elementKey="cta-primary"
              label="Primary CTA Button"
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
              <button
                type="button"
                onClick={scrollToProjects}
                className="bg-[#ff5100] hover:bg-[#e04700] text-white font-bold text-sm px-7 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleInlineChange(block.id, 'content.ctaText', e.target.innerText)}
                  className="outline-none"
                >
                  {content.ctaText || "Explore Projects"}
                </span>
              </button>
            </EditableCanvasItem>

            {content.secondaryCta && (
              <EditableCanvasItem
                elementKey="cta-secondary"
                label="Secondary CTA Button"
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
                <button
                  type="button"
                  className="px-7 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-full transition-all cursor-pointer"
                >
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleInlineChange(block.id, 'content.secondaryCta', e.target.innerText)}
                    className="outline-none"
                  >
                    {content.secondaryCta || "Contact Me"}
                  </span>
                </button>
              </EditableCanvasItem>
            )}
          </div>

        </div>

        {/* Right Column (5 cols) - Portrait Card */}
        <div className="lg:col-span-5 flex justify-center">
          <EditableCanvasItem
            elementKey="hero-avatar"
            label="Portrait Photo"
            schema={schema}
            selectedElement={selectedElement}
            hoveredElementKey={hoveredElementKey}
            setHoveredElementKey={setHoveredElementKey}
            onSelectElement={onSelectElement}
            onUpdateElementStyle={onUpdateElementStyle}
            onPolishWithAI={onPolishWithAI}
            onOpenEditModal={handleOpenEditModal}
            onTriggerUpload={triggerFileUpload}
            blockId={block.id}
            blockIndex={index}
          >
            <div className="w-full max-w-sm aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 bg-slate-100 relative group cursor-pointer">
              <img
                src={content.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop"}
                alt="Portrait"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                <span className="text-white text-xs font-bold bg-black/60 backdrop-blur-xs px-3 py-1 rounded-full">
                  Click to replace portrait
                </span>
              </div>
            </div>
          </EditableCanvasItem>
        </div>

      </div>
    </section>
  );
}
