import React, { useState } from 'react';
import {
  Sparkles, Mail, ExternalLink, Edit3, GripVertical, AlignLeft, AlignCenter, AlignRight,
  ChevronUp, ChevronDown, Copy, Trash2, Wand2, Type, Move, Plus, Image as ImageIcon
} from 'lucide-react';

export default function CanvasPreview({
  schema,
  deviceMode,
  onUpdateBlock,
  onMoveBlock,
  onDuplicateBlock,
  onDeleteBlock,
  onPolishWithAI
}) {
  const [selectedElement, setSelectedElement] = useState(null);
  const [hoveredElementId, setHoveredElementId] = useState(null);

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

  const isSelected = (id) => selectedElement?.id === id;
  const isHovered = (id) => hoveredElementId === id;

  return (
    <div
      onClick={() => setSelectedElement(null)}
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
            <span className="hidden sm:inline">LIVE EDIT CANVAS</span>
          </div>
        </div>

        {/* Canvas Render Body */}
        <div className="flex-1 overflow-y-auto text-white relative">
          {schema.blocks && schema.blocks.length > 0 ? (
            schema.blocks.map((block, index) => {
              const blockSelected = isSelected(block.id);
              const blockHovered = isHovered(block.id);

              return (
                <div
                  key={block.id}
                  onMouseEnter={() => setHoveredElementId(block.id)}
                  onMouseLeave={() => setHoveredElementId(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedElement({ id: block.id, type: block.type, label: block.type, index });
                  }}
                  className={`relative transition-all ${
                    blockSelected
                      ? 'ring-2 ring-[#FF6B1A] ring-offset-2 ring-offset-black z-20'
                      : blockHovered
                      ? 'border-2 border-dashed border-[#FF6B1A]/50 z-10'
                      : 'border-b border-white/5 last:border-b-0'
                  }`}
                >
                  {/* FLOATING CONTEXTUAL TOOLBAR (when selected) */}
                  {blockSelected && (
                    <div className="absolute -top-12 left-4 z-40 bg-[#181A24] border-2 border-black rounded-xl p-1.5 shadow-2xl flex items-center space-x-1.5 text-xs font-mono text-white animate-in fade-in zoom-in duration-150">
                      
                      {/* Element Badge Tag */}
                      <span className="px-2 py-0.5 bg-[#FF6B1A] text-black font-extrabold text-[10px] rounded uppercase tracking-wider">
                        {block.type}
                      </span>

                      <div className="w-px h-4 bg-white/20" />

                      {/* Section Order Up/Down */}
                      <button
                        type="button"
                        onClick={() => onMoveBlock && onMoveBlock(index, 'up')}
                        disabled={index === 0}
                        className="p-1 hover:bg-white/10 rounded disabled:opacity-30"
                        title="Move Section Up"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onMoveBlock && onMoveBlock(index, 'down')}
                        disabled={index === schema.blocks.length - 1}
                        className="p-1 hover:bg-white/10 rounded disabled:opacity-30"
                        title="Move Section Down"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>

                      <div className="w-px h-4 bg-white/20" />

                      {/* AI Polish */}
                      <button
                        type="button"
                        onClick={() => onPolishWithAI && onPolishWithAI(block)}
                        className="flex items-center gap-1 px-2 py-0.5 bg-[#FFE600] text-black font-bold text-[10px] rounded hover:bg-[#ffed4d]"
                        title="AI Rewrite Section"
                      >
                        <Wand2 className="w-3.5 h-3.5" /> Aria Polish
                      </button>

                      <div className="w-px h-4 bg-white/20" />

                      {/* Duplicate */}
                      <button
                        type="button"
                        onClick={() => onDuplicateBlock && onDuplicateBlock(index)}
                        className="p-1 hover:bg-white/10 rounded text-slate-300 hover:text-white"
                        title="Duplicate Section"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => onDeleteBlock && onDeleteBlock(index)}
                        className="p-1 hover:bg-red-500/20 text-red-400 rounded hover:text-red-300"
                        title="Delete Section"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Corner Anchor Dots (when selected) */}
                  {blockSelected && (
                    <>
                      <div className="w-2.5 h-2.5 bg-[#FF6B1A] border border-black rounded-full absolute -top-1.5 -left-1.5 z-30" />
                      <div className="w-2.5 h-2.5 bg-[#FF6B1A] border border-black rounded-full absolute -top-1.5 -right-1.5 z-30" />
                      <div className="w-2.5 h-2.5 bg-[#FF6B1A] border border-black rounded-full absolute -bottom-1.5 -left-1.5 z-30" />
                      <div className="w-2.5 h-2.5 bg-[#FF6B1A] border border-black rounded-full absolute -bottom-1.5 -right-1.5 z-30" />
                    </>
                  )}

                  {/* Block Hover Grip Indicator */}
                  {blockHovered && !blockSelected && (
                    <div className="absolute top-3 left-3 z-20 bg-[#FFE600] text-black font-mono font-bold text-[10px] px-2 py-0.5 rounded border border-black shadow-[1.5px_1.5px_0px_0px_#000] flex items-center gap-1">
                      <GripVertical className="w-3 h-3" /> {block.type}
                    </div>
                  )}

                  {/* Block 1: HeroBlock */}
                  {block.type === 'HeroBlock' && (
                    <section className="p-8 sm:p-14 flex flex-col justify-center space-y-6 min-h-[400px] relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-[#0B0B0E] to-[#0B0B0E]">
                      <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-mono text-amber-400 self-start">
                        <Sparkles className="w-3.5 h-3.5 text-[#FF6B1A]" />
                        <span
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => handleInlineChange(block.id, 'content.headline', e.target.innerText)}
                          className="outline-none focus:ring-1 focus:ring-[#FF6B1A] rounded px-1"
                        >
                          {block.content.headline}
                        </span>
                      </div>

                      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                        I'm{' '}
                        <span
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => handleInlineChange(block.id, 'content.name', e.target.innerText)}
                          className="bg-gradient-to-r from-white via-amber-100 to-[#FF6B1A] bg-clip-text text-transparent outline-none focus:ring-2 focus:ring-[#FF6B1A] rounded"
                        >
                          {block.content.name}
                        </span>
                        .
                      </h1>

                      <p
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => handleInlineChange(block.id, 'content.bio', e.target.innerText)}
                        className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-sans outline-none focus:ring-1 focus:ring-[#FF6B1A] rounded p-1"
                      >
                        {block.content.bio}
                      </p>

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
