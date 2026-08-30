import React, { useState } from 'react';
import { Mail, Github, ArrowRight, CheckCircle2, Copy, Check, Terminal, Calendar } from 'lucide-react';

export default function ContactSection({
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
  contactRef,
  EditableCanvasItem
}) {
  const content = block.content || {};
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const variant = block.layoutVariant || content.layoutVariant || 'split-form';

  const handleCopyCli = () => {
    navigator.clipboard.writeText(`curl -X POST https://api.kshitij.dev/contact -d '{"hire": true, "email": "your_email@domain.com"}'`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Variant 2: CLI Terminal Connect Layout
  if (variant === 'cli-terminal-connect') {
    return (
      <section id="contact-section" ref={contactRef} className="p-8 sm:p-20 bg-[#070b14] text-white font-mono border-t border-cyan-500/20">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-white">{content.title || "CLI Contact & Endpoint"}</h2>
            <p className="text-xs text-cyan-400">Trigger direct webhook or drop an email payload</p>
          </div>

          <div className="bg-[#0f172a] border border-cyan-500/30 rounded-2xl p-6 space-y-4 shadow-[0_0_25px_rgba(0,245,255,0.1)]">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-slate-300">curl-contact-endpoint.sh</span>
              </div>
              <button
                type="button"
                onClick={handleCopyCli}
                className="flex items-center gap-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs px-3 py-1 rounded-md transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy cURL Command'}</span>
              </button>
            </div>

            <div className="bg-[#090d16] p-4 rounded-xl text-xs text-slate-300 overflow-x-auto border border-cyan-500/10">
              <code>
                <span className="text-cyan-400 font-bold">$ </span>
                curl -X POST https://api.kshitij.dev/contact \<br />
                &nbsp;&nbsp;-H "Content-Type: application/json" \<br />
                &nbsp;&nbsp;-d '&#123;"hire": true, "email": "{content.email || 'kshitijpilankar@gmail.com'}"&#125;'
              </code>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <span className="text-xs text-slate-400">Or send direct email:</span>
              <a
                href={`mailto:${content.email || 'kshitijpilankar@gmail.com'}`}
                className="bg-[#00f5ff] hover:bg-[#00d0db] text-black font-black text-xs px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-black" />
                <span>{content.email || 'kshitijpilankar@gmail.com'}</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    );
  }

  // Variant 3: Floating Dock Layout
  if (variant === 'floating-dock') {
    return (
      <section id="contact-section" ref={contactRef} className="p-8 sm:p-20 bg-gradient-to-b from-slate-50 to-blue-50/40 text-slate-900 font-sans border-t border-slate-200/80 text-center">
        <div className="max-w-2xl mx-auto space-y-6 bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xl">
          
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {content.title || "Let's Build Something Together"}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
            {content.subtitle || "Available for full-time opportunities, technical leadership roles, and high-impact design system engineering."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href={`mailto:${content.email || 'kshitijpilankar@gmail.com'}`}
              className="bg-[#ff5100] hover:bg-[#e04700] text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Email {content.email || 'kshitijpilankar@gmail.com'}</span>
            </a>

            <button
              type="button"
              onClick={() => window.open('https://calendly.com', '_blank')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm px-7 py-3.5 rounded-full transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-slate-600" />
              <span>Schedule 15m Intro Call</span>
            </button>
          </div>

        </div>
      </section>
    );
  }

  // Default Variant 1: Split Form Layout
  return (
    <section id="contact-section" ref={contactRef} className="p-8 sm:p-16 bg-white font-sans text-slate-900 border-t border-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto w-full">
        
        {/* Left Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <EditableCanvasItem
            elementKey="contact-title"
            label="Contact Headline"
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
              className="text-4xl sm:text-5xl font-black text-[#ff5100] leading-tight tracking-tight outline-none"
            >
              {content.title || "Let's Build Something Together"}
            </h2>
          </EditableCanvasItem>

          <EditableCanvasItem
            elementKey="contact-sub"
            label="Contact Subtitle"
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
              className="text-slate-600 text-sm leading-relaxed outline-none"
            >
              {content.subtitle || "Available for full-time opportunities, technical leadership roles, and high-impact design system engineering."}
            </p>
          </EditableCanvasItem>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <a
              href={`mailto:${content.email || 'kshitijpilankar@gmail.com'}`}
              className="flex items-center gap-3 text-slate-800 hover:text-[#0053ff] font-semibold text-sm transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-blue-50 text-[#0053ff] flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <span>{content.email || 'kshitijpilankar@gmail.com'}</span>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-slate-800 hover:text-[#0053ff] font-semibold text-sm transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                <Github className="w-4 h-4" />
              </div>
              <span>github.com/kshitijpilankar</span>
            </a>
          </div>
        </div>

        {/* Right Column (7 cols) - Interactive Form */}
        <div className="lg:col-span-7 bg-slate-50 border border-slate-200/80 rounded-3xl p-8 shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you for reaching out. I will get back to you within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-[#0053ff] hover:underline"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-5"
            >
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Kshitij Pilankar"
                  className="w-full bg-white border-b-2 border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-[#0053ff] rounded-t-lg transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="kshitij@example.com"
                  className="w-full bg-white border-b-2 border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-[#0053ff] rounded-t-lg transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Project Type</label>
                <select className="w-full bg-white border-b-2 border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-[#0053ff] rounded-t-lg transition-colors">
                  <option>Full-Time Engineering Role</option>
                  <option>Design System & Web Architecture</option>
                  <option>Generative AI Integration</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Message *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell me about your project goals or team needs..."
                  className="w-full bg-white border-b-2 border-slate-200 p-3 text-sm text-slate-900 outline-none focus:border-[#0053ff] rounded-t-lg transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#ff5100] hover:bg-[#e04700] text-white font-bold py-3.5 rounded-full text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Submit Message</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
