import React, { useState, useRef } from 'react';
import {
  Sparkles, Mail, ExternalLink, Edit3, GripVertical, AlignLeft, AlignCenter, AlignRight,
  ChevronUp, ChevronDown, Copy, Trash2, Wand2, Scissors, Image as ImageIcon, RotateCw, Move,
  Pencil, X, Link as LinkIcon, Tag, Upload
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
      {/* FLOATING ACTION PILL (Sits cleanly ABOVE top border at -top-9 left-0 to prevent text overlap) */}
      {(isSelected || isHovered) && (
        <div className="absolute -top-9 left-0 z-50 bg-[#181A24] border-2 border-black rounded-xl px-2 py-1 shadow-2xl flex items-center gap-1.5 text-xs font-mono text-white pointer-events-auto">
          {/* Badge Tag */}
          <span className="px-2 py-0.5 bg-[#FF6B1A] text-black font-extrabold text-[9px] rounded uppercase tracking-wider flex items-center gap-1">
            <Move className="w-2.5 h-2.5" /> [ {label} ]
          </span>

          <div className="w-px h-3.5 bg-white/20" />

          {/* Quick Edit Pencil Trigger */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenEditModal && onOpenEditModal(elementKey, label, blockId);
            }}
            className="px-2 py-0.5 bg-[#38BDF8] text-black font-extrabold text-[10px] rounded flex items-center gap-1 hover:bg-[#60a5fa] transition-colors"
            title="Edit Text & Fields"
          >
            <Pencil className="w-3 h-3 text-black" /> Edit Text
          </button>

          {/* Aria Polish */}
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

  // Helper to render Full Headline with Dynamic Accent Word Highlighting
  const renderDynamicHeadline = (headingText, accentColor = "#ff6b1a") => {
    if (!headingText) return null;
    const words = headingText.trim().split(" ");
    if (words.length <= 1) {
      return <span className="text-white font-bold">{headingText}</span>;
    }
    
    const lastWord = words[words.length - 1];
    const firstWords = words.slice(0, -1).join(" ");

    return (
      <span className="inline-block font-extrabold tracking-tight">
        <span className="text-white">{firstWords} </span>
        <span
          className="inline-block bg-gradient-to-r from-white via-zinc-200 bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(135deg, #ffffff 20%, ${accentColor} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {lastWord}
        </span>
      </span>
    );
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
    } else if (key === 'contact-email-btn') {
      setEditModalData({
        type: 'button-email',
        label: 'Email CTA Button',
        blockId,
        email: block.content?.email || 'alex@developer.com'
      });
    } else if (key.startsWith('project-card-')) {
      const projId = key.replace('project-card-', '');
      const item = block.content?.items?.find(it => it.id === projId);
      if (item) {
        setEditModalData({
          type: 'project-card',
          label: `Project Card: ${item.title}`,
          blockId,
          projId,
          title: item.title || '',
          description: item.description || '',
          link: item.link || '',
          tags: item.tags ? item.tags.join(', ') : ''
        });
      }
    } else if (key.startsWith('skill-cat-')) {
      const catName = key.replace('skill-cat-', '');
      const category = block.content?.categories?.find(c => c.name === catName);
      if (category) {
        setEditModalData({
          type: 'skill-category',
          label: `Skill Category: ${category.name}`,
          blockId,
          oldCatName: category.name,
          name: category.name,
          skills: category.skills ? category.skills.join(', ') : ''
        });
      }
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
      const rawName = block.content?.name || 'Alex Rivera';
      const fullHeadline = rawName.includes("I'm") ? rawName : `I'm ${rawName}.`;
      setEditModalData({
        type: 'text-single',
        label: 'Headline Title',
        blockId,
        fieldPath: 'content.name',
        text: fullHeadline
      });
    } else if (key === 'hero-bio') {
      setEditModalData({
        type: 'text-multi',
        label: 'Bio Paragraph',
        blockId,
        fieldPath: 'content.bio',
        text: block.content?.bio || ''
      });
    } else if (key === 'projects-header') {
      setEditModalData({
        type: 'text-pair',
        label: 'Projects Section Title',
        blockId,
        title: block.content?.title || '',
        subtitle: block.content?.subtitle || ''
      });
    } else if (key === 'skills-header') {
      setEditModalData({
        type: 'text-single',
        label: 'Skills Section Title',
        blockId,
        fieldPath: 'content.title',
        text: block.content?.title || ''
      });
    } else if (key === 'contact-header') {
      setEditModalData({
        type: 'text-pair',
        label: 'Contact Section Title',
        blockId,
        title: block.content?.title || '',
        subtitle: block.content?.subtitle || ''
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

  // Precise State Dispatcher
  const handleSaveModal = () => {
    if (!editModalData) return;

    const { type, blockId } = editModalData;

    if (type === 'button-primary') {
      handleInlineChange(blockId, 'content.ctaText', editModalData.btnText);
    } else if (type === 'button-secondary') {
      handleInlineChange(blockId, 'content.secondaryCta', editModalData.btnText);
    } else if (type === 'button-email') {
      handleInlineChange(blockId, 'content.email', editModalData.email);
    } else if (type === 'project-card') {
      const block = schema.blocks.find(b => b.id === blockId);
      if (block && block.content?.items) {
        const updatedItems = block.content.items.map(it => {
          if (it.id === editModalData.projId) {
            return {
              ...it,
              title: editModalData.title,
              description: editModalData.description,
              link: editModalData.link,
              tags: typeof editModalData.tags === 'string'
                ? editModalData.tags.split(',').map(t => t.trim()).filter(Boolean)
                : editModalData.tags
            };
          }
          return it;
        });
        handleInlineChange(blockId, 'content.items', updatedItems);
      }
    } else if (type === 'skill-category') {
      const block = schema.blocks.find(b => b.id === blockId);
      if (block && block.content?.categories) {
        const updatedCategories = block.content.categories.map(c => {
          if (c.name === editModalData.oldCatName) {
            return {
              ...c,
              name: editModalData.name,
              skills: typeof editModalData.skills === 'string'
                ? editModalData.skills.split(',').map(s => s.trim()).filter(Boolean)
                : editModalData.skills
            };
          }
          return c;
        });
        handleInlineChange(blockId, 'content.categories', updatedCategories);
      }
    } else if (type === 'avatar') {
      handleInlineChange(blockId, 'content.avatarUrl', editModalData.url);
    } else if (type === 'text-single' || type === 'text-multi') {
      handleInlineChange(blockId, editModalData.fieldPath, editModalData.text);
    } else if (type === 'text-pair') {
      handleInlineChange(blockId, 'content.title', editModalData.title);
      handleInlineChange(blockId, 'content.subtitle', editModalData.subtitle);
    }

    setEditModalData(null);
  };

  return (
    <div
      onClick={() => onSelectElement && onSelectElement(null)}
      className="flex-1 bg-[#0F1117] bg-grid-pattern-dark overflow-y-auto p-4 sm:p-8 flex flex-col items-center justify-start relative select-none"
    >
      {/* Hidden Native File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

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
                        onOpenEditModal={handleOpenEditModal}
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
                          onOpenEditModal={handleOpenEditModal}
                          blockId={block.id}
                          blockIndex={index}
                        >
                          <h1
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => handleInlineChange(block.id, 'content.name', e.target.innerText)}
                            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight outline-none"
                          >
                            {renderDynamicHeadline(block.content.name, schema?.metadata?.accentColor || "#FF6B1A")}
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
                          onOpenEditModal={handleOpenEditModal}
                          blockId={block.id}
                          blockIndex={index}
                        >
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              triggerFileUpload(block.id);
                            }}
                            className="w-36 h-36 rounded-2xl border-2 border-white/20 bg-cover bg-center cursor-pointer hover:border-[#38BDF8] transition-all relative group/img overflow-hidden shadow-xl"
                            style={{ backgroundImage: `url(${block.content.avatarUrl || '/photo/Sarang.png'})` }}
                          >
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center text-[10px] font-mono text-white gap-1">
                              <Upload className="w-5 h-5 text-[#38BDF8]" />
                              <span>Upload Image</span>
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
                        onOpenEditModal={handleOpenEditModal}
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

                      {/* 4. CTA Buttons */}
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
                          onOpenEditModal={handleOpenEditModal}
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
                          onOpenEditModal={handleOpenEditModal}
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
                        onOpenEditModal={handleOpenEditModal}
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
                            onOpenEditModal={handleOpenEditModal}
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
                        onOpenEditModal={handleOpenEditModal}
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
                            onOpenEditModal={handleOpenEditModal}
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
                        onOpenEditModal={handleOpenEditModal}
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
                          onOpenEditModal={handleOpenEditModal}
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

      {/* DEDICATED CONTEXT-AWARE EDIT MODAL */}
      {editModalData && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181A24] border-2 border-black rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4 font-sans text-white relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-heading font-extrabold text-base flex items-center gap-2">
                <Pencil className="w-4 h-4 text-[#38BDF8]" />
                <span>{editModalData.label}</span>
              </h3>
              <button
                type="button"
                onClick={() => setEditModalData(null)}
                className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Context-Aware Dynamic Form Fields */}
            <div className="space-y-3 font-mono text-xs">

              {/* CTA Button Edit Form */}
              {(editModalData.type === 'button-primary' || editModalData.type === 'button-secondary') && (
                <div>
                  <label className="block text-slate-400 mb-1">Button Label Text:</label>
                  <input
                    type="text"
                    value={editModalData.btnText}
                    onChange={(e) => setEditModalData({ ...editModalData, btnText: e.target.value })}
                    className="w-full bg-[#0F1117] border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>
              )}

              {/* Email Button Edit Form */}
              {editModalData.type === 'button-email' && (
                <div>
                  <label className="block text-slate-400 mb-1">Email Address:</label>
                  <input
                    type="email"
                    value={editModalData.email}
                    onChange={(e) => setEditModalData({ ...editModalData, email: e.target.value })}
                    className="w-full bg-[#0F1117] border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>
              )}

              {/* Project Card Edit Form */}
              {editModalData.type === 'project-card' && (
                <>
                  <div>
                    <label className="block text-slate-400 mb-1">Project Title:</label>
                    <input
                      type="text"
                      value={editModalData.title}
                      onChange={(e) => setEditModalData({ ...editModalData, title: e.target.value })}
                      className="w-full bg-[#0F1117] border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Description:</label>
                    <textarea
                      rows={3}
                      value={editModalData.description}
                      onChange={(e) => setEditModalData({ ...editModalData, description: e.target.value })}
                      className="w-full bg-[#0F1117] border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Live Demo / Repository Link:</label>
                    <input
                      type="url"
                      value={editModalData.link}
                      onChange={(e) => setEditModalData({ ...editModalData, link: e.target.value })}
                      className="w-full bg-[#0F1117] border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Tags (comma-separated):</label>
                    <input
                      type="text"
                      value={editModalData.tags}
                      onChange={(e) => setEditModalData({ ...editModalData, tags: e.target.value })}
                      className="w-full bg-[#0F1117] border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#38BDF8]"
                      placeholder="React, Three.js, GSAP"
                    />
                  </div>
                </>
              )}

              {/* Skill Category Edit Form */}
              {editModalData.type === 'skill-category' && (
                <>
                  <div>
                    <label className="block text-slate-400 mb-1">Category Name:</label>
                    <input
                      type="text"
                      value={editModalData.name}
                      onChange={(e) => setEditModalData({ ...editModalData, name: e.target.value })}
                      className="w-full bg-[#0F1117] border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Skills (comma-separated):</label>
                    <input
                      type="text"
                      value={editModalData.skills}
                      onChange={(e) => setEditModalData({ ...editModalData, skills: e.target.value })}
                      className="w-full bg-[#0F1117] border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#38BDF8]"
                      placeholder="React, Vite, Tailwind CSS, GSAP"
                    />
                  </div>
                </>
              )}

              {/* Avatar Image Form */}
              {editModalData.type === 'avatar' && (
                <>
                  <div>
                    <label className="block text-slate-400 mb-1">Image Web URL:</label>
                    <input
                      type="url"
                      value={editModalData.url}
                      onChange={(e) => setEditModalData({ ...editModalData, url: e.target.value })}
                      className="w-full bg-[#0F1117] border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => triggerFileUpload(editModalData.blockId)}
                      className="w-full py-2 bg-[#38BDF8]/10 hover:bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/30 rounded-xl font-mono text-xs flex items-center justify-center gap-2 transition-all"
                    >
                      <Upload className="w-4 h-4" /> Upload Local Image File
                    </button>
                  </div>
                </>
              )}

              {/* Text Single / Multi Form */}
              {(editModalData.type === 'text-single' || editModalData.type === 'text-multi') && (
                <div>
                  <label className="block text-slate-400 mb-1">Full Text String:</label>
                  {editModalData.type === 'text-multi' ? (
                    <textarea
                      rows={4}
                      value={editModalData.text}
                      onChange={(e) => setEditModalData({ ...editModalData, text: e.target.value })}
                      className="w-full bg-[#0F1117] border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#38BDF8]"
                    />
                  ) : (
                    <input
                      type="text"
                      value={editModalData.text}
                      onChange={(e) => setEditModalData({ ...editModalData, text: e.target.value })}
                      className="w-full bg-[#0F1117] border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#38BDF8]"
                    />
                  )}
                </div>
              )}

              {/* Text Pair Form */}
              {editModalData.type === 'text-pair' && (
                <>
                  <div>
                    <label className="block text-slate-400 mb-1">Title:</label>
                    <input
                      type="text"
                      value={editModalData.title}
                      onChange={(e) => setEditModalData({ ...editModalData, title: e.target.value })}
                      className="w-full bg-[#0F1117] border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Subtitle:</label>
                    <input
                      type="text"
                      value={editModalData.subtitle}
                      onChange={(e) => setEditModalData({ ...editModalData, subtitle: e.target.value })}
                      className="w-full bg-[#0F1117] border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>
                </>
              )}

            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditModalData(null)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 font-mono text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveModal}
                className="px-5 py-2 bg-[#00FFA3] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl border border-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#20ffb0] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
