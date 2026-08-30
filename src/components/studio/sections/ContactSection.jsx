import React, { useState } from 'react';
import { Mail, Github, ArrowRight, CheckCircle2 } from 'lucide-react';

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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Fullstack App',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact-section" ref={contactRef} className="p-8 sm:p-16 bg-white font-sans text-slate-900 border-t border-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto w-full">
        
        {/* Left Box (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <EditableCanvasItem
            elementKey="contact-title"
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
            elementKey="contact-subtitle"
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

          {/* Direct Contact Links */}
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
              <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center">
                <Github className="w-4 h-4" />
              </div>
              <span>github.com/kshitij</span>
            </a>
          </div>

        </div>

        {/* Right Form (7 cols) */}
        <div className="lg:col-span-7 bg-slate-50 border border-slate-200/80 rounded-3xl p-8 shadow-xs">
          
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
              <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you for reaching out. I'll review your project details and get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 font-sans">
              
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Kshitij Pilankar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border-b-2 border-slate-200 focus:border-[#0053ff] px-3 py-2.5 text-sm text-slate-900 outline-none rounded-t-lg transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="kshitij@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border-b-2 border-slate-200 focus:border-[#0053ff] px-3 py-2.5 text-sm text-slate-900 outline-none rounded-t-lg transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Project Type</label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full bg-white border-b-2 border-slate-200 focus:border-[#0053ff] px-3 py-2.5 text-sm text-slate-900 outline-none rounded-t-lg transition-colors cursor-pointer"
                >
                  <option value="Fullstack App">Fullstack Web Application</option>
                  <option value="Design System">Design System & UI Library</option>
                  <option value="AI Integration">AI Copilot / LLM Integration</option>
                  <option value="Consulting">Technical Architecture Consulting</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Message *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell me about your project goals, timelines, and technical requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border-b-2 border-slate-200 focus:border-[#0053ff] p-3 text-sm text-slate-900 outline-none rounded-t-lg transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#ff5100] hover:bg-[#e04700] text-white font-bold py-3.5 rounded-full text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
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
