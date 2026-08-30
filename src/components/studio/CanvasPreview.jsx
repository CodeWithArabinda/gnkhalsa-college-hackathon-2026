import React, { useState, useRef } from 'react';
import {
  Sparkles, Mail, ExternalLink, Edit3, GripVertical, AlignLeft, AlignCenter, AlignRight,
  ChevronUp, ChevronDown, Copy, Trash2, Wand2, Scissors, Image as ImageIcon, RotateCw, Move,
  Bold, Italic, Minus, Plus
} from 'lucide-react';
import CanvasBuildingState from './CanvasBuildingState';

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
  const isDragging = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const activeDragKey = useRef(null);

  if (!schema) return null;

  const elementStyles = schema.elementStyles || {};

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

  const isSelectedKey = (key) => selectedElement?.key === key;
  const isHoveredKey = (key) => hoveredElementKey === key;

  // Pointer down handler for isolated element dragging
  const handleElementMouseDown = (e, key, label, blockId, blockIndex) => {
    e.stopPropagation();
    onSelectElement && onSelectElement({ key, label, blockId, blockIndex });

    isDragging.current = true;
    activeDragKey.current = key;
    dragStartPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !activeDragKey.current) return;
    const dx = Math.round(e.clientX - dragStartPos.current.x);
    const dy = Math.round(e.clientY - dragStartPos.current.y);

    const currentStyle = elementStyles[activeDragKey.current] || { x: 0, y: 0 };
    const newX = (currentStyle.x || 0) + dx;
    const newY = (currentStyle.y || 0) + dy;

    dragStartPos.current = { x: e.clientX, y: e.clientY };

    if (onUpdateElementStyle) {
      onUpdateElementStyle(activeDragKey.current, { ...currentStyle, x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    activeDragKey.current = null;
  };

  return (
    <div
      onClick={() => onSelectElement && onSelectElement(null)}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
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
            <span className="hidden sm:inline">ISOLATED CANVAS EDITOR</span>
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
                      
                      {/* 1. Tagline Element */}
                      {(() => {
                        const key = 'hero-tagline';
                        const sel = isSelectedKey(key);
                        const hov = isHoveredKey(key);
                        const st = elementStyles[key] || {};
                        return (
                          <div
                            onMouseEnter={() => setHoveredElementKey(key)}
                            onMouseLeave={() => setHoveredElementKey(null)}
                            onMouseDown={(e) => handleElementMouseDown(e, key, 'Tagline', block.id, index)}
                            className={`inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-mono text-amber-400 self-start relative cursor-grab active:cursor-grabbing transition-all ${
                              sel ? 'ring-2 ring-[#FF6B1A] ring-offset-2 ring-offset-black z-30' : hov ? 'ring-1 ring-[#FF6B1A]/50 z-20' : ''
                            }`}
                            style={{
                              transform: `translate3d(${st.x || 0}px, ${st.y || 0}px, 0)`,
                              color: st.color || '#FF6B1A',
                              fontSize: `${st.fontSize || 12}px`,
                              fontFamily: st.fontFamily || 'inherit'
                            }}
                          >
                            {sel && (
                              <div className="absolute -top-7 left-0 z-40 bg-[#FF6B1A] text-black font-mono font-bold text-[9px] px-2 py-0.5 rounded shadow">
                                [ Tagline ]
                              </div>
                            )}
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
                        );
                      })()}

                      {/* 2. Hero Title & Avatar Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-6 items-center">
                        
                        {/* Name Element */}
                        {(() => {
                          const key = 'hero-name';
                          const sel = isSelectedKey(key);
                          const hov = isHoveredKey(key);
                          const st = elementStyles[key] || {};
                          return (
                            <div
                              onMouseEnter={() => setHoveredElementKey(key)}
                              onMouseLeave={() => setHoveredElementKey(null)}
                              onMouseDown={(e) => handleElementMouseDown(e, key, 'Headline Title', block.id, index)}
                              className={`relative cursor-grab active:cursor-grabbing transition-all p-1 rounded ${
                                sel ? 'ring-2 ring-[#FF6B1A] ring-offset-2 ring-offset-black z-30' : hov ? 'ring-1 ring-[#FF6B1A]/50 z-20' : ''
                              }`}
                              style={{
                                transform: `translate3d(${st.x || 0}px, ${st.y || 0}px, 0)`,
                                textAlign: st.textAlign || 'left'
                              }}
                            >
                              {/* Inline Floating Text Toolbar (when title selected) */}
                              {sel && (
                                <div className="absolute -top-11 left-0 z-50 bg-[#181A24] border-2 border-black rounded-xl px-2 py-1 shadow-2xl flex items-center gap-1.5 text-xs font-mono">
                                  <span className="text-[10px] font-bold text-[#FF6B1A] uppercase">[ Headline ]</span>
                                  <div className="w-px h-3.5 bg-white/20" />
                                  <button type="button" onClick={() => onPolishWithAI && onPolishWithAI(block)} className="px-2 py-0.5 bg-[#FFE600] text-black font-extrabold text-[10px] rounded flex items-center gap-1">
                                    <Wand2 className="w-3 h-3 text-black" /> Aria Polish
                                  </button>
                                </div>
                              )}

                              <h1
                                className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight"
                                style={{
                                  color: st.color || '#FFFFFF',
                                  fontSize: st.fontSize ? `${st.fontSize}px` : undefined,
                                  fontFamily: st.fontFamily || 'inherit',
                                  fontWeight: st.fontWeight || '900',
                                  fontStyle: st.fontStyle || 'normal',
                                  textDecoration: st.textDecoration || 'none'
                                }}
                              >
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
                            </div>
                          );
                        })()}

                        {/* Candidate Avatar Element */}
                        {(() => {
                          const key = 'hero-avatar';
                          const sel = isSelectedKey(key);
                          const hov = isHoveredKey(key);
                          const st = elementStyles[key] || {};
                          return (
                            <div
                              onMouseEnter={() => setHoveredElementKey(key)}
                              onMouseLeave={() => setHoveredElementKey(null)}
                              onMouseDown={(e) => handleElementMouseDown(e, key, 'Avatar Image', block.id, index)}
                              className={`w-36 h-36 rounded-2xl border-2 border-white/20 bg-cover bg-center cursor-pointer hover:border-[#38BDF8] transition-all relative group/img overflow-hidden shadow-xl ${
                                sel ? 'ring-2 ring-[#FF6B1A] ring-offset-2 ring-offset-black z-30' : hov ? 'ring-1 ring-[#FF6B1A]/50 z-20' : ''
                              }`}
                              style={{
                                transform: `translate3d(${st.x || 0}px, ${st.y || 0}px, 0)`,
                                borderRadius: st.borderRadius ? `${st.borderRadius}px` : undefined,
                                backgroundImage: `url(${block.content.avatarUrl || '/photo/Sarang.png'})`
                              }}
                            >
                              {sel && (
                                <div className="absolute top-1 left-1 z-40 bg-[#38BDF8] text-black font-mono font-bold text-[9px] px-1.5 py-0.5 rounded shadow">
                                  [ Image ]
                                </div>
                              )}
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onReplaceImage && onReplaceImage(block);
                                }}
                                className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center text-[10px] font-mono text-white gap-1"
                              >
                                <ImageIcon className="w-4 h-4 text-[#38BDF8]" />
                                <span>Replace Image</span>
                              </div>
                            </div>
                          );
                        })()}

                      </div>

                      {/* 3. Bio Element */}
                      {(() => {
                        const key = 'hero-bio';
                        const sel = isSelectedKey(key);
                        const hov = isHoveredKey(key);
                        const st = elementStyles[key] || {};
                        return (
                          <div
                            onMouseEnter={() => setHoveredElementKey(key)}
                            onMouseLeave={() => setHoveredElementKey(null)}
                            onMouseDown={(e) => handleElementMouseDown(e, key, 'Bio Text', block.id, index)}
                            className={`relative cursor-grab active:cursor-grabbing transition-all p-1 rounded max-w-xl ${
                              sel ? 'ring-2 ring-[#FF6B1A] ring-offset-2 ring-offset-black z-30' : hov ? 'ring-1 ring-[#FF6B1A]/50 z-20' : ''
                            }`}
                            style={{
                              transform: `translate3d(${st.x || 0}px, ${st.y || 0}px, 0)`,
                              textAlign: st.textAlign || 'left'
                            }}
                          >
                            {sel && (
                              <div className="absolute -top-7 left-0 z-40 bg-[#FF6B1A] text-black font-mono font-bold text-[9px] px-2 py-0.5 rounded shadow">
                                [ Bio Paragraph ]
                              </div>
                            )}
                            <p
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) => handleInlineChange(block.id, 'content.bio', e.target.innerText)}
                              className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans outline-none"
                              style={{
                                color: st.color || '#CBD5E1',
                                fontSize: st.fontSize ? `${st.fontSize}px` : undefined,
                                fontFamily: st.fontFamily || 'inherit'
                              }}
                            >
                              {block.content.bio}
                            </p>
                          </div>
                        );
                      })()}

                      {/* CTA Buttons */}
                      <div className="flex flex-wrap gap-3 pt-2">
                        <button type="button" className="px-6 py-3 bg-[#FF6B1A] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(255,107,26,0.4)]">
                          {block.content.ctaText}
                        </button>
                        <button type="button" className="px-6 py-3 bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-xl">
                          {block.content.secondaryCta}
                        </button>
                      </div>
                    </section>
                  )}

                  {/* Block 2: ProjectGridBlock */}
                  {block.type === 'ProjectGridBlock' && (
                    <section className="p-8 sm:p-14 space-y-6">
                      <div className="space-y-1">
                        <h2
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => handleInlineChange(block.id, 'content.title', e.target.innerText)}
                          className="text-2xl font-extrabold text-white outline-none focus:ring-1 focus:ring-[#FF6B1A] rounded"
                        >
                          {block.content.title}
                        </h2>
                        <p className="text-xs text-slate-400 font-mono">{block.content.subtitle}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {block.content.items?.map((item) => (
                          <div
                            key={item.id}
                            className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-3 hover:border-[#FF6B1A]/40 transition-colors"
                          >
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
                                className="font-bold text-base text-white outline-none focus:ring-1 focus:ring-[#FF6B1A] rounded"
                              >
                                {item.title}
                              </h3>
                              <ExternalLink className="w-4 h-4 text-[#FF6B1A]" />
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
                              className="text-xs text-slate-400 leading-relaxed font-sans outline-none focus:ring-1 focus:ring-[#FF6B1A] rounded"
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
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Block 3: SkillsBlock */}
                  {block.type === 'SkillsBlock' && (
                    <section className="p-8 sm:p-14 space-y-6 bg-white/[0.01]">
                      <h2
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => handleInlineChange(block.id, 'content.title', e.target.innerText)}
                        className="text-2xl font-extrabold text-white outline-none focus:ring-1 focus:ring-[#FF6B1A] rounded"
                      >
                        {block.content.title}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {block.content.categories?.map((cat) => (
                          <div key={cat.name} className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-3">
                            <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">{cat.name}</h3>
                            <div className="flex flex-wrap gap-2">
                              {cat.skills?.map((skill) => (
                                <span key={skill} className="px-3 py-1 bg-[#14141D] border border-white/10 rounded-xl text-xs font-medium text-white">
                                  {skill}
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
                    <section className="p-8 sm:p-14 text-center space-y-6 bg-gradient-to-r from-[#FF6B1A]/10 via-amber-900/10 to-[#FF6B1A]/10">
                      <div className="space-y-2 max-w-md mx-auto">
                        <h2
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => handleInlineChange(block.id, 'content.title', e.target.innerText)}
                          className="text-3xl font-extrabold text-white outline-none focus:ring-1 focus:ring-[#FF6B1A] rounded"
                        >
                          {block.content.title}
                        </h2>
                        <p
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => handleInlineChange(block.id, 'content.subtitle', e.target.innerText)}
                          className="text-xs text-slate-400 font-sans outline-none focus:ring-1 focus:ring-[#FF6B1A] rounded"
                        >
                          {block.content.subtitle}
                        </p>
                      </div>

                      {block.content.email && (
                        <a
                          href={`mailto:${block.content.email}`}
                          className="inline-flex items-center space-x-2 bg-[#FF6B1A] text-black font-extrabold text-xs px-6 py-3 rounded-full shadow-[0_0_25px_rgba(255,107,26,0.4)]"
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
