import React from 'react';
import { Sparkles, Terminal, Code, Cpu, ArrowRight } from 'lucide-react';

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
  const variant = block.layoutVariant || content.layoutVariant || 'split-portrait';

  // Variant 2: Centered Bento Layout
  if (variant === 'centered-bento') {
    return (
      <section className="p-8 sm:p-20 flex flex-col items-center justify-center min-h-[520px] bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 text-slate-900 font-sans text-center">
        <div className="max-w-4xl mx-auto space-y-6 flex flex-col items-center">
          
          {/* Animated Availability Status Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-800 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for Q3 Projects & Engineering Roles</span>
          </div>

          {/* Centered Headline */}
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
              className="text-5xl sm:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight outline-none"
            >
              {content.name || "I'm Kshitij Pilankar."}
            </h1>
          </EditableCanvasItem>

          {/* Centered Bio */}
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
              className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal outline-none"
            >
              {content.bio || "Building high-impact digital experiences with React 18, WebGL, and scalable design systems."}
            </p>
          </EditableCanvasItem>

          {/* Floating Glass Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="px-3 py-1 bg-white/80 border border-slate-200/80 rounded-full text-xs font-semibold text-slate-700 shadow-2xs">
              ⚡ WebGL 3D Canvas
            </span>
            <span className="px-3 py-1 bg-white/80 border border-slate-200/80 rounded-full text-xs font-semibold text-slate-700 shadow-2xs">
              🧠 Distributed AI Systems
            </span>
            <span className="px-3 py-1 bg-white/80 border border-slate-200/80 rounded-full text-xs font-semibold text-slate-700 shadow-2xs">
              🎨 Design Tokens
            </span>
          </div>

          {/* Dual Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4 justify-center">
            <button
              type="button"
              onClick={scrollToProjects}
              className="bg-[#0053ff] hover:bg-[#0043cc] text-white font-bold text-sm px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>View Selected Works</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>

        </div>
      </section>
    );
  }

  // Variant 3: Cyber Terminal Layout
  if (variant === 'cyber-terminal') {
    return (
      <section className="p-8 sm:p-16 flex flex-col justify-center min-h-[520px] bg-[#090d16] text-white font-mono relative overflow-hidden border-b border-cyan-500/20">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* CLI Header Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-mono text-cyan-400 shadow-[0_0_15px_rgba(0,245,255,0.15)]">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>zsh ~ developer-profile --active</span>
            </div>

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
                className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight outline-none"
              >
                {content.name || "Kshitij Pilankar"}
              </h1>
            </EditableCanvasItem>

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
                className="text-slate-300 text-sm sm:text-base leading-relaxed font-mono outline-none"
              >
                {content.bio || "Architecting high-throughput neural inference pipelines, vector databases, and real-time streaming AI agents."}
              </p>
            </EditableCanvasItem>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                type="button"
                onClick={scrollToProjects}
                className="bg-[#00f5ff] hover:bg-[#00d0db] text-black font-black text-xs px-7 py-3.5 rounded-xl shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all cursor-pointer flex items-center gap-2"
              >
                <Cpu className="w-4 h-4 text-black" />
                <span>Explore Cyber Models</span>
              </button>
            </div>

          </div>

          {/* Right Column (5 cols) - Telemetry Terminal Box */}
          <div className="lg:col-span-5">
            <div className="bg-[#0f172a] border border-cyan-500/30 rounded-2xl p-5 shadow-[0_0_25px_rgba(0,245,255,0.1)] space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
                <span className="text-cyan-400 font-bold">SYSTEM TELEMETRY</span>
                <span className="text-emerald-400 text-[10px] bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">STATUS: ONLINE</span>
              </div>
              
              <div className="space-y-2 text-slate-300 pt-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Inference Latency:</span>
                  <span className="text-cyan-300 font-bold">12.4ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Model Accuracy:</span>
                  <span className="text-emerald-300 font-bold">99.4%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Active Workers:</span>
                  <span className="text-cyan-300 font-bold">128 Nodes</span>
                </div>
              </div>

              <div className="pt-2 border-t border-cyan-500/20 text-[11px] text-slate-400">
                <span className="text-cyan-400 font-bold">$</span> py -m venv stackfolio_engine
              </div>
            </div>
          </div>

        </div>
      </section>
    );
  }

  // Default Variant 1: Split Portrait Layout
  return (
    <section className="p-8 sm:p-16 flex flex-col justify-center min-h-[500px] relative overflow-hidden bg-white text-slate-900 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-6xl mx-auto w-full pt-4">
        
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
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
            </div>
          </EditableCanvasItem>
        </div>

      </div>
    </section>
  );
}
