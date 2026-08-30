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

  const archetype = schema?.archetype || 'bento-minimal';
  const isCyber = archetype === 'cyber-terminal' || archetype === 'cyber-ai';
  const isBrutalist = archetype === 'neo-brutalist';
  const isWarm = archetype === 'warm-editorial';

  const handleCopyCli = () => {
    navigator.clipboard.writeText(`curl -X POST https://api.kshitij.dev/contact -d '{"hire": true, "email": "your_email@domain.com"}'`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 1. Neo-Brutalist Contact Variant
  if (isBrutalist) {
    return (
      <section id="contact-section" ref={contactRef} className="p-8 sm:p-20 bg-[#FFFDF5] text-black font-sans border-b-3 border-black">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto w-full">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-4xl sm:text-5xl font-black text-black leading-tight uppercase tracking-tight">
              {content.title || "Let's Build Something Together"}
            </h2>
            <p className="text-black text-sm font-bold leading-relaxed">{content.subtitle || "Available for full-time opportunities and design system engineering."}</p>
            <div className="space-y-3 pt-4 border-t-2 border-black">
              <a href={`mailto:${content.email || 'kshitijpilankar@gmail.com'}`} className="flex items-center gap-3 text-black font-black text-sm">
                <div className="w-9 h-9 rounded-lg bg-[#FFE600] border-2 border-black text-black flex items-center justify-center shadow-[1.5px_1.5px_0px_#000]"><Mail className="w-4 h-4" /></div>
                <span>{content.email || 'kshitijpilankar@gmail.com'}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border-3 border-black rounded-2xl p-8 shadow-[6px_6px_0px_#000]">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#FFE600] border-2 border-black text-black mx-auto flex items-center justify-center font-black shadow-[2px_2px_0px_#000]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-black uppercase">Message Received!</h3>
                <button type="button" onClick={() => setSubmitted(false)} className="text-xs font-black text-black underline">Send Another</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                <div>
                  <label className="text-xs font-black text-black block mb-1 uppercase">Full Name *</label>
                  <input type="text" required placeholder="Kshitij Pilankar" className="w-full bg-white border-2 border-black p-3 text-sm text-black font-bold outline-none rounded-lg shadow-[2px_2px_0px_#000]" />
                </div>
                <div>
                  <label className="text-xs font-black text-black block mb-1 uppercase">Email Address *</label>
                  <input type="email" required placeholder="kshitij@example.com" className="w-full bg-white border-2 border-black p-3 text-sm text-black font-bold outline-none rounded-lg shadow-[2px_2px_0px_#000]" />
                </div>
                <div>
                  <label className="text-xs font-black text-black block mb-1 uppercase">Message *</label>
                  <textarea rows={3} required placeholder="Tell me about your project goals..." className="w-full bg-white border-2 border-black p-3 text-sm text-black font-bold outline-none rounded-lg shadow-[2px_2px_0px_#000] resize-none" />
                </div>
                <button type="submit" className="w-full bg-[#FFE600] hover:bg-[#ebd300] text-black font-black py-3.5 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <span>Submit Message</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    );
  }

  // 2. Warm Editorial Contact Variant
  if (isWarm) {
    return (
      <section id="contact-section" ref={contactRef} className="p-8 sm:p-20 bg-[#FDFBF7] text-[#2C2621] font-serif border-b border-[#E7DEC8]">
        <div className="max-w-2xl mx-auto space-y-6 bg-[#F7F3EB] border border-[#E7DEC8] rounded-3xl p-8 sm:p-12 shadow-xs text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2C2621] tracking-tight">
            {content.title || "Let's Build Something Together"}
          </h2>
          <p className="text-sm text-[#645647] font-sans leading-relaxed max-w-lg mx-auto">
            {content.subtitle || "Available for full-time opportunities and creative design system engineering."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a href={`mailto:${content.email || 'kshitijpilankar@gmail.com'}`} className="bg-[#C2410C] hover:bg-[#a3360a] text-white font-sans font-bold text-sm px-8 py-3.5 rounded-full shadow-sm transition-all flex items-center gap-2">
              <Mail className="w-4 h-4 text-white" />
              <span>Email {content.email || 'kshitijpilankar@gmail.com'}</span>
            </a>
          </div>
        </div>
      </section>
    );
  }

  // 3. Cyber Terminal Contact Variant
  if (isCyber) {
    return (
      <section id="contact-section" ref={contactRef} className="p-8 sm:p-20 bg-[#070b14] text-white font-mono border-b border-cyan-500/20">
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
              <button type="button" onClick={handleCopyCli} className="flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs px-3 py-1 rounded-md">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy cURL Command'}</span>
              </button>
            </div>

            <div className="bg-[#090d16] p-4 rounded-xl text-xs text-slate-300 overflow-x-auto border border-cyan-500/10">
              <code>
                <span className="text-cyan-400 font-bold">$ </span>
                curl -X POST https://api.kshitij.dev/contact -d '&#123;"hire": true, "email": "{content.email || 'kshitijpilankar@gmail.com'}"&#125;'
              </code>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <a href={`mailto:${content.email || 'kshitijpilankar@gmail.com'}`} className="bg-[#00f5ff] hover:bg-[#00d0db] text-black font-black text-xs px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(0,245,255,0.3)] flex items-center gap-2">
                <Mail className="w-4 h-4 text-black" />
                <span>{content.email || 'kshitijpilankar@gmail.com'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 4. Default Bento-Minimal Floating Dock Variant
  return (
    <section id="contact-section" ref={contactRef} className="p-8 sm:p-20 bg-[#F8FAFC] text-slate-900 font-sans border-b border-slate-200 text-center">
      <div className="max-w-2xl mx-auto space-y-6 bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xl">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {content.title || "Let's Build Something Together"}
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
          {content.subtitle || "Available for full-time opportunities, technical leadership roles, and high-impact design system engineering."}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a href={`mailto:${content.email || 'kshitijpilankar@gmail.com'}`} className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-md transition-all flex items-center gap-2">
            <Mail className="w-4 h-4 text-white" />
            <span>Email {content.email || 'kshitijpilankar@gmail.com'}</span>
          </a>

          <button type="button" onClick={() => window.open('https://calendly.com', '_blank')} className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm px-7 py-3.5 rounded-full transition-all flex items-center gap-2 cursor-pointer">
            <Calendar className="w-4 h-4 text-slate-600" />
            <span>Schedule 15m Intro Call</span>
          </button>
        </div>
      </div>
    </section>
  );
}
