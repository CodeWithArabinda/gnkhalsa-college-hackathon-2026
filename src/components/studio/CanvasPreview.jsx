import React, { useState, useRef } from 'react';
import {
  Sparkles, Mail, ExternalLink, Edit3, GripVertical, AlignLeft, AlignCenter, AlignRight,
  ChevronUp, ChevronDown, Copy, Trash2, Wand2, Scissors, Image as ImageIcon, RotateCw, Move,
  Pencil, X, Link as LinkIcon, Tag, Upload, Scissors as CutIcon, Palette
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
  onOpenEditModal,
  onTriggerUpload,
  children,
  className = '',
  blockId,
  blockIndex
}) {
  const isSelected = selectedElement?.key === elementKey;
  const isHovered = hoveredElementKey === elementKey;
  const elementStyles = schema?.elementStyles || {};
  const st = elementStyles[elementKey] || {};
  const isImageElement = elementKey === 'hero-avatar' || label.toLowerCase().includes('image');

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

  // Corner Drag-to-Resize Handler
  const handleResizeMouseDown = (e, corner) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const initialWidth = st.width || 144;
    const initialHeight = st.height || 144;

    const handleResizeMove = (me) => {
      const dx = me.clientX - startX;
      const dy = me.clientY - startY;

      let newWidth = initialWidth;
      let newHeight = initialHeight;

      if (corner === 'br') {
        newWidth = Math.min(800, Math.max(120, initialWidth + dx));
        newHeight = Math.min(800, Math.max(120, initialHeight + dy));
      } else if (corner === 'bl') {
        newWidth = Math.min(800, Math.max(120, initialWidth - dx));
        newHeight = Math.min(800, Math.max(120, initialHeight + dy));
      } else if (corner === 'tr') {
        newWidth = Math.min(800, Math.max(120, initialWidth + dx));
        newHeight = Math.min(800, Math.max(120, initialHeight - dy));
      } else if (corner === 'tl') {
        newWidth = Math.min(800, Math.max(120, initialWidth - dx));
        newHeight = Math.min(800, Math.max(120, initialHeight - dy));
      }

      if (onUpdateElementStyle) {
        onUpdateElementStyle(elementKey, (prev = {}) => ({
          ...prev,
          width: Math.round(newWidth),
          height: Math.round(newHeight)
        }));
      }
    };

    const handleResizeUp = () => {
      window.removeEventListener('mousemove', handleResizeMove);
      window.removeEventListener('mouseup', handleResizeUp);
    };

    window.addEventListener('mousemove', handleResizeMove);
    window.addEventListener('mouseup', handleResizeUp);
  };

  return (
    <div
      onMouseEnter={() => setHoveredElementKey(elementKey)}
      onMouseLeave={() => setHoveredElementKey(null)}
      onMouseDown={handleMouseDown}
      className={`relative cursor-grab active:cursor-grabbing transition-all rounded ${
        isSelected
          ? 'border-2 border-[#0053ff] ring-2 ring-[#0053ff]/30 z-30 shadow-[0_0_15px_rgba(0,83,255,0.2)]'
          : isHovered
          ? 'border border-[#0053ff]/50 z-20'
          : ''
      } ${className}`}
      style={{
        transform: `translate3d(${st.x || 0}px, ${st.y || 0}px, 0)`,
        width: st.width ? `${st.width}px` : undefined,
        height: st.height ? `${st.height}px` : undefined,
        color: st.color || undefined,
        fontSize: st.fontSize ? `${st.fontSize}px` : undefined,
        fontFamily: st.fontFamily || undefined,
        fontWeight: st.fontWeight || undefined,
        fontStyle: st.fontStyle || undefined,
        textAlign: st.textAlign || undefined,
        borderRadius: st.borderRadius ? `${st.borderRadius}px` : undefined
      }}
    >
      {/* FLOATING ACTION PILL */}
      {(isSelected || isHovered) && (
        <div className="absolute -top-9 left-0 z-50 bg-[#081a5e] border border-blue-400/40 rounded-xl px-2 py-1 shadow-xl flex items-center gap-1.5 text-xs font-sans text-white pointer-events-auto">
          <span className="px-2 py-0.5 bg-[#0053ff] text-white font-extrabold text-[9px] rounded uppercase tracking-wider flex items-center gap-1">
            <Move className="w-2.5 h-2.5" /> [ {label} ]
          </span>

          <div className="w-px h-3.5 bg-white/20" />

          {isImageElement ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onTriggerUpload && onTriggerUpload(blockId);
              }}
              className="px-2 py-0.5 bg-amber-400 text-black font-extrabold text-[10px] rounded flex items-center gap-1 hover:bg-amber-300 transition-colors"
              title="Upload / Replace Image File"
            >
              <ImageIcon className="w-3 h-3 text-black" /> Replace Image
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenEditModal && onOpenEditModal(elementKey, label, blockId);
              }}
              className="px-2 py-0.5 bg-white text-black font-extrabold text-[10px] rounded flex items-center gap-1 hover:bg-slate-100 transition-colors"
              title="Edit Text & Fields"
            >
              <Pencil className="w-3 h-3 text-black" /> Edit Text
            </button>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPolishWithAI && onPolishWithAI({ type: label });
            }}
            className="px-2 py-0.5 bg-[#FFE600] text-black font-extrabold text-[10px] rounded flex items-center gap-1 hover:bg-[#ffed4d] transition-colors"
            title="Rewrite with AI"
          >
            <Wand2 className="w-3 h-3 text-black" /> Aria Polish
          </button>
        </div>
      )}

      {/* 8 ACTIVE ANCHOR DOTS */}
      {isSelected && (
        <>
          <div onMouseDown={(e) => handleResizeMouseDown(e, 'tl')} className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#0053ff] rounded-full shadow-md cursor-nwse-resize z-50 pointer-events-auto" />
          <div onMouseDown={(e) => handleResizeMouseDown(e, 'tr')} className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#0053ff] rounded-full shadow-md cursor-nesw-resize z-50 pointer-events-auto" />
          <div onMouseDown={(e) => handleResizeMouseDown(e, 'bl')} className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#0053ff] rounded-full shadow-md cursor-nesw-resize z-50 pointer-events-auto" />
          <div onMouseDown={(e) => handleResizeMouseDown(e, 'br')} className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#0053ff] rounded-full shadow-md cursor-nwse-resize z-50 pointer-events-auto" />
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border border-[#0053ff] rounded-full z-50" />
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border border-[#0053ff] rounded-full z-50" />
          <div className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-2.5 h-2.5 bg-white border border-[#0053ff] rounded-full z-50" />
          <div className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-2.5 h-2.5 bg-white border border-[#0053ff] rounded-full z-50" />
        </>
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
  const [editModalData, setEditModalData] = useState(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const fileInputRef = useRef(null);
  const [targetBlockForUpload, setTargetBlockForUpload] = useState(null);

  if (!schema) return null;

  const getFrameWidth = () => {
    switch (deviceMode) {
      case 'mobile':
        return 'w-full max-w-[375px] shadow-2xl';
      case 'tablet':
        return 'w-full max-w-[768px] shadow-2xl';
      case 'desktop':
      default:
        return 'w-full max-w-5xl shadow-2xl';
    }
  };

  const handleInlineChange = (blockId, fieldPath, value) => {
    if (onUpdateBlock) {
      onUpdateBlock(blockId, fieldPath, value);
    }
  };

  const triggerFileUpload = (blockId) => {
    setTargetBlockForUpload(blockId);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const base64Url = evt.target.result;
      const blockId = targetBlockForUpload || schema.blocks.find(b => b.type === 'HeroBlock')?.id;
      if (blockId) {
        handleInlineChange(blockId, 'content.avatarUrl', base64Url);
      }
      if (editModalData && editModalData.type === 'avatar') {
        setEditModalData(prev => ({ ...prev, url: base64Url }));
      }
    };
    reader.readAsDataURL(file);
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

  // Dedicated Context-Aware Schema Edit Payload Generator
  const handleOpenEditModal = (key, label, blockId) => {
    const block = schema.blocks.find(b => b.id === blockId);
    if (!block) return;

    if (key === 'cta-primary') {
      setEditModalData({
        type: 'button-primary',
        label: 'Primary CTA Button',
        blockId,
        btnText: block.content?.ctaText || 'Explore Projects'
      });
    } else if (key === 'cta-secondary') {
      setEditModalData({
        type: 'button-secondary',
        label: 'Secondary CTA Button',
        blockId,
        btnText: block.content?.secondaryCta || 'Contact Me'
      });
    } else if (key === 'hero-avatar') {
      setEditModalData({
        type: 'avatar',
        label: 'Avatar / Hero Image',
        blockId,
        url: block.content?.avatarUrl || '/photo/Sarang.png'
      });
    } else if (key === 'hero-tagline') {
      setEditModalData({
        type: 'text-single',
        label: 'Tagline',
        blockId,
        fieldPath: 'content.headline',
        text: block.content?.headline || ''
      });
    } else if (key === 'hero-name') {
      setEditModalData({
        type: 'text-single',
        label: 'Headline Title',
        blockId,
        fieldPath: 'content.name',
        text: block.content?.name || 'Engineering Digital Excellence'
      });
    } else if (key === 'hero-bio') {
      setEditModalData({
        type: 'text-multi',
        label: 'Bio Paragraph',
        blockId,
        fieldPath: 'content.bio',
        text: block.content?.bio || ''
      });
    } else {
      setEditModalData({
        type: 'generic',
        label,
        blockId,
        title: block.content?.title || '',
        subtitle: block.content?.subtitle || ''
      });
    }
  };

  const handleSaveModal = () => {
    if (!editModalData) return;
    const { type, blockId } = editModalData;

    if (type === 'button-primary') {
      handleInlineChange(blockId, 'content.ctaText', editModalData.btnText);
    } else if (type === 'button-secondary') {
      handleInlineChange(blockId, 'content.secondaryCta', editModalData.btnText);
    } else if (type === 'avatar') {
      handleInlineChange(blockId, 'content.avatarUrl', editModalData.url);
    } else if (type === 'text-single' || type === 'text-multi') {
      handleInlineChange(blockId, editModalData.fieldPath, editModalData.text);
    }

    setEditModalData(null);
  };

  return (
    <div
      onClick={() => onSelectElement && onSelectElement(null)}
      className="flex-1 bg-[#f0f2f5] overflow-y-auto pt-20 pb-16 px-4 sm:px-8 flex flex-col items-center justify-start relative select-none transition-colors duration-200 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
    >
      {/* Hidden Native File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Frame Wrapper (Wix Harmony Light Preview Window) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${getFrameWidth()} transition-all duration-300 ease-in-out bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden relative z-10 my-auto min-h-[720px] flex flex-col`}
      >
        {/* Frame Top Browser Header */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center justify-between shrink-0 text-slate-700">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>

          <div className="bg-white border border-slate-200 rounded-md px-3 py-0.5 font-mono text-[11px] text-slate-800 flex items-center gap-1.5 shadow-2xs">
            <span className="text-[#0053ff] font-bold">webdevportfolio.io</span>
            <span className="text-amber-600 font-bold">is available! Connect Domain</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline">WIX HARMONY CANVAS</span>
          </div>
        </div>

        {/* Canvas Render Body (Default Light Theme) */}
        <div className="flex-1 overflow-y-auto text-slate-900 bg-white relative">
          
          {/* Real-time AI Generation Overlay */}
          {isGenerating && <CanvasBuildingState />}

          {schema.blocks && schema.blocks.length > 0 ? (
            schema.blocks.map((block, index) => {
              return (
                <div key={block.id} className="relative border-b border-slate-100 last:border-b-0 group/section">
                  
                  {/* Floating Blue Section Tag Badge */}
                  <div className="absolute top-2 left-3 z-20">
                    <span className="px-2 py-0.5 bg-blue-100 text-[#0053ff] text-[11px] font-bold rounded shadow-2xs">
                      [ {block.type.replace('Block', '')} ]
                    </span>
                  </div>

                  {/* Block 1: HeroBlock (Wix Harmony Modern Light Layout) */}
                  {block.type === 'HeroBlock' && (
                    <section className="p-8 sm:p-16 flex flex-col justify-center space-y-6 min-h-[460px] relative overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-white">
                      
                      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center pt-4">
                        
                        <div className="space-y-4">
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
                                {block.content.headline}
                              </span>
                            </div>
                          </EditableCanvasItem>

                          {/* 2. Headline */}
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
                            onOpenEditModal={handleOpenEditModal}
                            blockId={block.id}
                            blockIndex={index}
                          >
                            <h1
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) => handleInlineChange(block.id, 'content.name', e.target.innerText)}
                              className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight outline-none"
                            >
                              {block.content.name || "Engineering Digital Excellence"}
                            </h1>
                          </EditableCanvasItem>

                          {/* 3. Bio */}
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
                            className="max-w-xl"
                          >
                            <p
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) => handleInlineChange(block.id, 'content.bio', e.target.innerText)}
                              className="text-slate-600 font-normal leading-relaxed text-sm sm:text-base outline-none"
                            >
                              {block.content.bio}
                            </p>
                          </EditableCanvasItem>

                          {/* 4. Primary & Secondary CTA */}
                          <div className="flex flex-wrap gap-3 pt-3">
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
                                className="bg-[#ff5100] hover:bg-[#d64400] text-white font-bold px-6 py-3 rounded-full text-sm shadow-md transition-all cursor-pointer"
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
                              onOpenEditModal={handleOpenEditModal}
                              blockId={block.id}
                              blockIndex={index}
                            >
                              <button
                                type="button"
                                onClick={scrollToContact}
                                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-full transition-all cursor-pointer"
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
                        </div>

                        {/* 5. Avatar Right Container */}
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
                          onOpenEditModal={handleOpenEditModal}
                          onTriggerUpload={triggerFileUpload}
                          blockId={block.id}
                          blockIndex={index}
                        >
                          <div
                            className="w-44 h-44 rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-cover bg-center transition-all"
                            style={{
                              backgroundImage: `url(${block.content.avatarUrl || '/photo/Sarang.png'})`,
                              width: (schema?.elementStyles?.['hero-avatar']?.width) ? `${schema.elementStyles['hero-avatar'].width}px` : undefined,
                              height: (schema?.elementStyles?.['hero-avatar']?.height) ? `${schema.elementStyles['hero-avatar'].height}px` : undefined
                            }}
                          />
                        </EditableCanvasItem>

                      </div>

                    </section>
                  )}

                  {/* Block 2: ProjectGridBlock */}
                  {block.type === 'ProjectGridBlock' && (
                    <section id="projects-section" ref={projectsRef} className="p-8 sm:p-16 space-y-6 bg-slate-50/50">
                      <div className="space-y-1 pt-2">
                        <h2 className="text-2xl font-extrabold text-slate-900">{block.content.title}</h2>
                        <p className="text-xs text-slate-500 font-mono">{block.content.subtitle}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {block.content.items?.map((item) => (
                          <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                              <h3 className="font-bold text-base text-slate-900">{item.title}</h3>
                              <a href={item.link || '#'} target="_blank" rel="noreferrer" className="text-[#0053ff] p-1">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed font-sans">{item.description}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {item.tags?.map((t) => (
                                <span key={t} className="px-2 py-0.5 bg-blue-50 text-[#0053ff] text-[10px] font-mono rounded font-bold">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Block 3: SkillsBlock */}
                  {block.type === 'SkillsBlock' && (
                    <section className="p-8 sm:p-16 space-y-6 bg-white">
                      <h2 className="text-2xl font-extrabold text-slate-900 pt-2">{block.content.title}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {block.content.categories?.map((cat) => (
                          <div key={cat.name} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                            <h3 className="text-xs font-mono font-bold text-[#ff5100] uppercase tracking-wider">{cat.name}</h3>
                            <div className="flex flex-wrap gap-2">
                              {cat.skills?.map((s) => (
                                <span key={s} className="px-3 py-1 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 shadow-2xs">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Block 4: ContactBlock */}
                  {block.type === 'ContactBlock' && (
                    <section id="contact-section" ref={contactRef} className="p-8 sm:p-16 text-center space-y-6 bg-blue-50/40">
                      <div className="max-w-md mx-auto space-y-2 pt-2">
                        <h2 className="text-3xl font-extrabold text-slate-900">{block.content.title}</h2>
                        <p className="text-xs text-slate-600">{block.content.subtitle}</p>
                      </div>
                      {block.content.email && (
                        <a
                          href={`mailto:${block.content.email}`}
                          className="inline-flex items-center space-x-2 bg-[#ff5100] hover:bg-[#d64400] text-white font-bold text-xs px-6 py-3 rounded-full shadow-md transition-all"
                        >
                          <Mail className="w-4 h-4" />
                          <span>Email {block.content.email}</span>
                        </a>
                      )}
                    </section>
                  )}

                </div>
              );
            })
          ) : null}
        </div>
      </div>

    </div>
  );
}
