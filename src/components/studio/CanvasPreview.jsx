import React, { useState, useRef } from 'react';
import {
  Sparkles, Mail, ExternalLink, Edit3, GripVertical, AlignLeft, AlignCenter, AlignRight,
  ChevronUp, ChevronDown, Copy, Trash2, Wand2, Scissors, Image as ImageIcon, RotateCw, Move
} from 'lucide-react';
import CanvasBuildingState from './CanvasBuildingState';

/* ═══════════════════════════════════════════════
   UNIVERSAL EDITABLE CANVAS ITEM WRAPPER
   ═══════════════════════════════════════════════ */
function EditableCanvasItem({
  elementKey,
  label = 'Element',
  schema,
  selectedElement,
  hoveredElementKey,
  setHoveredElementKey,
  onSelectElement,
  onUpdateElementStyle,
  onPolishWithAI,
  children,
  className = '',
  blockId,
  blockIndex
}) {
  const isSelected = selectedElement?.key === elementKey;
  const isHovered = hoveredElementKey === elementKey;
  const elementStyles = schema?.elementStyles || {};
  const st = elementStyles[elementKey] || {};

  const isDragging = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    e.stopPropagation();
    onSelectElement && onSelectElement({ key: elementKey, label, blockId, blockIndex });

    isDragging.current = true;
    dragStartPos.current = { x: e.clientX, y: e.clientY };

    const handleMouseMove = (me) => {
      if (!isDragging.current) return;
      const dx = Math.round(me.clientX - dragStartPos.current.x);
      const dy = Math.round(me.clientY - dragStartPos.current.y);

      dragStartPos.current = { x: me.clientX, y: me.clientY };

      if (onUpdateElementStyle) {
        onUpdateElementStyle(elementKey, (prev = {}) => ({
          ...prev,
          x: (prev.x || 0) + dx,
          y: (prev.y || 0) + dy
        }));
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      onMouseEnter={() => setHoveredElementKey(elementKey)}
      onMouseLeave={() => setHoveredElementKey(null)}
      onMouseDown={handleMouseDown}
      className={`relative cursor-grab active:cursor-grabbing transition-all rounded ${
        isSelected
          ? 'ring-2 ring-[#FF6B1A] ring-offset-2 ring-offset-black z-30 shadow-[0_0_15px_rgba(255,107,26,0.5)]'
          : isHovered
          ? 'ring-1 ring-[#FF6B1A]/50 z-20'
          : ''
      } ${className}`}
      style={{
        transform: `translate3d(${st.x || 0}px, ${st.y || 0}px, 0)`,
        color: st.color || undefined,
        fontSize: st.fontSize ? `${st.fontSize}px` : undefined,
        fontFamily: st.fontFamily || undefined,
        fontWeight: st.fontWeight || undefined,
        fontStyle: st.fontStyle || undefined,
        textAlign: st.textAlign || undefined,
        borderRadius: st.borderRadius ? `${st.borderRadius}px` : undefined
      }}
    >
      {/* Element Badge Tag */}
      {(isSelected || isHovered) && (
        <div className="absolute -top-6 left-0 z-40 bg-[#FF6B1A] text-black font-mono font-bold text-[9px] px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_#000] uppercase tracking-wider flex items-center gap-1 pointer-events-none">
          <Move className="w-2.5 h-2.5" /> [ {label} ]
        </div>
      )}

      {/* Floating Mini Context Toolbar */}
      {isSelected && (
        <div className="absolute -top-11 left-1/2 -translate-x-1/2 z-50 bg-[#181A24] border-2 border-black rounded-xl px-2 py-1 shadow-2xl flex items-center gap-1.5 text-xs font-mono text-white">
          <span className="text-[10px] font-bold text-[#FF6B1A] uppercase">[ {label} ]</span>
          <div className="w-px h-3.5 bg-white/20" />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPolishWithAI && onPolishWithAI({ type: label });
            }}
            className="px-2 py-0.5 bg-[#FFE600] text-black font-extrabold text-[10px] rounded flex items-center gap-1 hover:bg-[#ffed4d]"
          >
            <Wand2 className="w-3 h-3 text-black" /> Aria Polish
          </button>
        </div>
      )}

      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN CANVAS PREVIEW COMPONENT
   ═══════════════════════════════════════════════ */
export default function CanvasPreview({
  schema,
  deviceMode,
  isGenerating,
  onUpdateBlock,
  onMoveBlock,
  onDuplicateBlock,
  onDeleteBlock,
  onPolishWithAI,
  onSelectElement,
  selectedElement,
  onReplaceImage,
  onUpdateElementStyle
}) {
  const [hoveredElementKey, setHoveredElementKey] = useState(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  if (!schema) return null;

  const getFrameWidth = () => {
    switch (deviceMode) {
      case 'mobile':
        return 'w-[390px]';
      case 'tablet':
        return 'w-[768px]';
      case 'desktop':
      default:
        return 'w-full max-w-[1280px]';
    }
  };

  const handleInlineChange = (blockId, fieldPath, value) => {
    if (onUpdateBlock) {
      onUpdateBlock(blockId, fieldPath, value);
    }
  };

  const scrollToProjects = () => {
    if (projectsRef.current) {
      projectsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      onClick={() => onSelectElement && onSelectElement(null)}
      className="flex-1 bg-[#0F1117] bg-grid-pattern-dark overflow-y-auto p-4 sm:p-8 flex flex-col items-center justify-start relative select-none"
    >
      {/* Background Ambient Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Frame Wrapper */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${getFrameWidth()} transition-all duration-300 bg-[#0B0B0E] border-3 border-black rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden relative z-10 my-auto min-h-[720px] flex flex-col`}
      >
        {/* Frame Top Browser Header */}
        <div className="bg-[#181A24] border-b-2 border-black px-4 py-2.5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black" />
          </div>

          <div className="bg-[#0D0F15] border border-white/10 rounded-lg px-4 py-1 font-mono text-[11px] text-slate-400 flex items-center gap-1.5 shadow-inner">
            <span className="text-[#00FFA3]">https://</span>
            <span className="text-white">{schema?.metadata?.slug || 'my-portfolio'}.stackfolio.dev</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
            <span className="w-2 h-2 rounded-full bg-[#00FFA3] animate-pulse" />
            <span className="hidden sm:inline">UNIVERSAL CANVAS EDITOR</span>
          </div>
        </div>

        {/* Canvas Render Body */}
        <div className="flex-1 overflow-y-auto text-white relative">
          
          {/* Real-time AI Generation Experience Overlay */}
          {isGenerating && <CanvasBuildingState />}

          {schema.blocks && schema.blocks.length > 0 ? (
            schema.blocks.map((block, index) => {
              return (
                <div key={block.id} className="relative border-b border-white/5 last:border-b-0">
                  
                  {/* Block 1: HeroBlock */}
                  {block.type === 'HeroBlock' && (
                    <section className="p-8 sm:p-14 flex flex-col justify-center space-y-6 min-h-[400px] relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-[#0B0B0E] to-[#0B0B0E]">
                      
                      {/* 1. Tagline */}
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
                        blockId={block.id}
                        blockIndex={index}
                        className="self-start"
                      >
                        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-mono text-amber-400">
                          <Sparkles className="w-3.5 h-3.5 text-[#FF6B1A]" />
                          <span
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => handleInlineChange(block.id, 'content.headline', e.target.innerText)}
                            className="outline-none"
                          >
                            {block.content.headline}
                          </span>
                        </div>
                      </EditableCanvasItem>

                      {/* 2. Hero Title & Avatar Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-6 items-center">
                        
                        {/* Name / Headline */}
                        <EditableCanvasItem
                          elementKey="hero-name"
                          label="Headline Title"
                          schema={schema}
                          selectedElement={selectedElement}
                          hoveredElementKey={hoveredElementKey}
                          setHoveredElementKey={setHoveredElementKey}
                          onSelectElement={onSelectElement}
                          onUpdateElementStyle={onUpdateElementStyle}
                          onPolishWithAI={onPolishWithAI}
                          blockId={block.id}
                          blockIndex={index}
                        >
                          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                            I'm{' '}
                            <span
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) => handleInlineChange(block.id, 'content.name', e.target.innerText)}
                              className="bg-gradient-to-r from-white via-amber-100 to-[#FF6B1A] bg-clip-text text-transparent outline-none"
                            >
                              {block.content.name}
                            </span>
                            .
                          </h1>
                        </EditableCanvasItem>

                        {/* Avatar Image */}
                        <EditableCanvasItem
                          elementKey="hero-avatar"
                          label="Avatar Image"
                          schema={schema}
                          selectedElement={selectedElement}
                          hoveredElementKey={hoveredElementKey}
                          setHoveredElementKey={setHoveredElementKey}
                          onSelectElement={onSelectElement}
                          onUpdateElementStyle={onUpdateElementStyle}
                          onPolishWithAI={onPolishWithAI}
                          blockId={block.id}
                          blockIndex={index}
                        >
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              onReplaceImage && onReplaceImage(block);
                            }}
                            className="w-36 h-36 rounded-2xl border-2 border-white/20 bg-cover bg-center cursor-pointer hover:border-[#38BDF8] transition-all relative group/img overflow-hidden shadow-xl"
                            style={{ backgroundImage: `url(${block.content.avatarUrl || '/photo/Sarang.png'})` }}
                          >
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center text-[10px] font-mono text-white gap-1">
                              <ImageIcon className="w-4 h-4 text-[#38BDF8]" />
                              <span>Replace Image</span>
                            </div>
                          </div>
                        </EditableCanvasItem>

                      </div>

                      {/* 3. Bio Paragraph */}
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
                        blockId={block.id}
                        blockIndex={index}
                        className="max-w-xl"
                      >
                        <p
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => handleInlineChange(block.id, 'content.bio', e.target.innerText)}
                          className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans outline-none"
                        >
                          {block.content.bio}
                        </p>
                      </EditableCanvasItem>

                      {/* 4. CTA Buttons (Explore Projects & Contact Me) */}
                      <div className="flex flex-wrap gap-3 pt-2">
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
                          blockId={block.id}
                          blockIndex={index}
                        >
                          <button
                            type="button"
                            onClick={scrollToProjects}
                            className="px-6 py-3 bg-[#FF6B1A] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(255,107,26,0.4)] hover:bg-[#ff843d] transition-all"
                          >
                            <span
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) => handleInlineChange(block.id, 'content.ctaText', e.target.innerText)}
                              className="outline-none"
                            >
                              {block.content.ctaText}
                            </span>
                          </button>
                        </EditableCanvasItem>

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
                          blockId={block.id}
                          blockIndex={index}
                        >
                          <button
                            type="button"
                            onClick={scrollToContact}
                            className="px-6 py-3 bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white/15 transition-all"
                          >
                            <span
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) => handleInlineChange(block.id, 'content.secondaryCta', e.target.innerText)}
                              className="outline-none"
                            >
                              {block.content.secondaryCta}
                            </span>
                          </button>
                        </EditableCanvasItem>
                      </div>

                    </section>
                  )}

                  {/* Block 2: ProjectGridBlock */}
                  {block.type === 'ProjectGridBlock' && (
                    <section id="projects-section" ref={projectsRef} className="p-8 sm:p-14 space-y-6">
                      
                      {/* Section Title & Subtitle */}
                      <EditableCanvasItem
                        elementKey="projects-header"
                        label="Section Title"
                        schema={schema}
                        selectedElement={selectedElement}
                        hoveredElementKey={hoveredElementKey}
                        setHoveredElementKey={setHoveredElementKey}
                        onSelectElement={onSelectElement}
                        onUpdateElementStyle={onUpdateElementStyle}
                        onPolishWithAI={onPolishWithAI}
                        blockId={block.id}
                        blockIndex={index}
                        className="space-y-1"
                      >
                        <h2
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => handleInlineChange(block.id, 'content.title', e.target.innerText)}
                          className="text-2xl font-extrabold text-white outline-none"
                        >
                          {block.content.title}
                        </h2>
                        <p className="text-xs text-slate-400 font-mono">{block.content.subtitle}</p>
                      </EditableCanvasItem>

                      {/* Project Cards Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {block.content.items?.map((item) => (
                          <EditableCanvasItem
                            key={item.id}
                            elementKey={`project-card-${item.id}`}
                            label="Project Card"
                            schema={schema}
                            selectedElement={selectedElement}
                            hoveredElementKey={hoveredElementKey}
                            setHoveredElementKey={setHoveredElementKey}
                            onSelectElement={onSelectElement}
                            onUpdateElementStyle={onUpdateElementStyle}
                            onPolishWithAI={onPolishWithAI}
                            blockId={block.id}
                            blockIndex={index}
                          >
                            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-3 hover:border-[#FF6B1A]/40 transition-colors">
                              <div className="flex justify-between items-start">
                                <h3
                                  contentEditable
                                  suppressContentEditableWarning
                                  onBlur={(e) => {
                                    const updatedItems = block.content.items.map((it) =>
                                      it.id === item.id ? { ...it, title: e.target.innerText } : it
                                    );
                                    handleInlineChange(block.id, 'content.items', updatedItems);
                                  }}
                                  className="font-bold text-base text-white outline-none"
                                >
                                  {item.title}
                                </h3>
                                <a
                                  href={item.link || '#'}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="p-1 hover:bg-white/10 rounded text-[#FF6B1A]"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </div>
                              <p
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => {
                                  const updatedItems = block.content.items.map((it) =>
                                    it.id === item.id ? { ...it, description: e.target.innerText } : it
                                  );
                                  handleInlineChange(block.id, 'content.items', updatedItems);
                                }}
                                className="text-xs text-slate-400 leading-relaxed font-sans outline-none"
                              >
                                {item.description}
                              </p>
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {item.tags?.map((tag) => (
                                  <span key={tag} className="px-2.5 py-0.5 bg-[#FF6B1A]/10 text-[#FF6B1A] text-[10px] font-mono rounded border border-[#FF6B1A]/20">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </EditableCanvasItem>
                        ))}
                      </div>

                    </section>
                  )}

                  {/* Block 3: SkillsBlock */}
                  {block.type === 'SkillsBlock' && (
                    <section className="p-8 sm:p-14 space-y-6 bg-white/[0.01]">
                      
                      <EditableCanvasItem
                        elementKey="skills-header"
                        label="Skills Title"
                        schema={schema}
                        selectedElement={selectedElement}
                        hoveredElementKey={hoveredElementKey}
                        setHoveredElementKey={setHoveredElementKey}
                        onSelectElement={onSelectElement}
                        onUpdateElementStyle={onUpdateElementStyle}
                        onPolishWithAI={onPolishWithAI}
                        blockId={block.id}
                        blockIndex={index}
                      >
                        <h2
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => handleInlineChange(block.id, 'content.title', e.target.innerText)}
                          className="text-2xl font-extrabold text-white outline-none"
                        >
                          {block.content.title}
                        </h2>
                      </EditableCanvasItem>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {block.content.categories?.map((cat) => (
                          <EditableCanvasItem
                            key={cat.name}
                            elementKey={`skill-cat-${cat.name}`}
                            label="Skill Category"
                            schema={schema}
                            selectedElement={selectedElement}
                            hoveredElementKey={hoveredElementKey}
                            setHoveredElementKey={setHoveredElementKey}
                            onSelectElement={onSelectElement}
                            onUpdateElementStyle={onUpdateElementStyle}
                            onPolishWithAI={onPolishWithAI}
                            blockId={block.id}
                            blockIndex={index}
                          >
                            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-3">
                              <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">{cat.name}</h3>
                              <div className="flex flex-wrap gap-2">
                                {cat.skills?.map((skill) => (
                                  <span key={skill} className="px-3 py-1 bg-[#14141D] border border-white/10 rounded-xl text-xs font-medium text-white">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </EditableCanvasItem>
                        ))}
                      </div>

                    </section>
                  )}

                  {/* Block 4: ContactBlock */}
                  {block.type === 'ContactBlock' && (
                    <section id="contact-section" ref={contactRef} className="p-8 sm:p-14 text-center space-y-6 bg-gradient-to-r from-[#FF6B1A]/10 via-amber-900/10 to-[#FF6B1A]/10">
                      
                      <EditableCanvasItem
                        elementKey="contact-header"
                        label="Contact Title"
                        schema={schema}
                        selectedElement={selectedElement}
                        hoveredElementKey={hoveredElementKey}
                        setHoveredElementKey={setHoveredElementKey}
                        onSelectElement={onSelectElement}
                        onUpdateElementStyle={onUpdateElementStyle}
                        onPolishWithAI={onPolishWithAI}
                        blockId={block.id}
                        blockIndex={index}
                        className="max-w-md mx-auto space-y-2"
                      >
                        <h2
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => handleInlineChange(block.id, 'content.title', e.target.innerText)}
                          className="text-3xl font-extrabold text-white outline-none"
                        >
                          {block.content.title}
                        </h2>
                        <p
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => handleInlineChange(block.id, 'content.subtitle', e.target.innerText)}
                          className="text-xs text-slate-400 font-sans outline-none"
                        >
                          {block.content.subtitle}
                        </p>
                      </EditableCanvasItem>

                      {block.content.email && (
                        <EditableCanvasItem
                          elementKey="contact-email-btn"
                          label="Email CTA Button"
                          schema={schema}
                          selectedElement={selectedElement}
                          hoveredElementKey={hoveredElementKey}
                          setHoveredElementKey={setHoveredElementKey}
                          onSelectElement={onSelectElement}
                          onUpdateElementStyle={onUpdateElementStyle}
                          onPolishWithAI={onPolishWithAI}
                          blockId={block.id}
                          blockIndex={index}
                          className="inline-block"
                        >
                          <a
                            href={`mailto:${block.content.email}`}
                            className="inline-flex items-center space-x-2 bg-[#FF6B1A] text-black font-extrabold text-xs px-6 py-3 rounded-full shadow-[0_0_25px_rgba(255,107,26,0.4)] hover:bg-[#ff843d] transition-all"
                          >
                            <Mail className="w-4 h-4" />
                            <span>Email {block.content.email}</span>
                          </a>
                        </EditableCanvasItem>
                      )}

                    </section>
                  )}

                </div>
              );
            })
          ) : (
            <div className="p-12 text-center text-slate-500 font-mono text-xs">
              No section blocks defined in schema.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
