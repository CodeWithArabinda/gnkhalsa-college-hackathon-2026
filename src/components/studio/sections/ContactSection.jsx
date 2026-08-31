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
  EditableCanvasItem,
  viewMode = 'desktop'
}) {
  const content = block.content || {};
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const blockId = block.id;
  const isMobile = viewMode === 'mobile';

  const archetype = schema?.archetype || 'bento-minimal';
  const isCyber = archetype === 'cyber-terminal' || archetype === 'cyber-ai';
  const isBrutalist = archetype === 'neo-brutalist';
  const isWarm = archetype === 'warm-editorial';

  const renderItem = (key, label, children, className = "") => {
    if (EditableCanvasItem) {
      return (
        <EditableCanvasItem
          elementKey={key}
          label={label}
          schema={schema}
          selectedElement={selectedElement}
          hoveredElementKey={hoveredElementKey}
          setHoveredElementKey={setHoveredElementKey}
          onSelectElement={onSelectElement}
          onUpdateElementStyle={onUpdateElementStyle}
          onPolishWithAI={onPolishWithAI}
          onOpenEditModal={handleOpenEditModal}
          blockId={blockId}
          blockIndex={index}
          className={className}
        >
          {children}
        </EditableCanvasItem>
      );
    }
    return children;
  };

  const handleCopyCli = () => {
    navigator.clipboard.writeText(`curl -X POST https://api.kshitij.dev/contact -d '{"hire": true, "email": "${content.email || 'kshitijpilankar@gmail.com'}"}'`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 1. Neo-Brutalist Contact Variant
  if (isBrutalist) {
    return (
      <section id="contact-section" ref={contactRef} className={`${isMobile ? 'p-4' : 'p-4 sm:p-8 md:p-20'} bg-[#FFFDF5] text-black font-sans border-b-3 border-black w-full overflow-x-hidden`}>
        <div className={`max-w-6xl mx-auto w-full ${isMobile ? 'flex flex-col gap-6' : 'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start'}`}>
          <div className={`${isMobile ? 'w-full space-y-3 text-center' : 'lg:col-span-5 space-y-4 sm:space-y-6'}`}>
            {renderItem('contact-title', 'Contact Title', (
              <h2 className={`${isMobile ? 'text-2xl font-black' : 'text-3xl sm:text-4xl lg:text-5xl font-black'} text-black leading-tight uppercase tracking-tight break-words`}>
                {content.title || "Let's Build Something Together"}
              </h2>
            ))}
            {renderItem('contact-subtitle', 'Contact Subtitle', (
              <p className="text-black text-xs sm:text-sm font-bold leading-relaxed">{content.subtitle || "Available for full-time opportunities and design system engineering."}</p>
            ))}
            <div className={`space-y-3 pt-4 border-t-2 border-black ${isMobile ? 'flex flex-col items-center' : ''}`}>
              {renderItem('contact-email-btn', 'Email CTA Button', (
                <a href={`mailto:${content.email || 'kshitijpilankar@gmail.com'}`} className="flex items-center gap-3 text-black font-black text-xs sm:text-sm break-all">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#FFE600] border-2 border-black text-black flex items-center justify-center shadow-[1.5px_1.5px_0px_#000] shrink-0"><Mail className="w-4 h-4" /></div>
                  <span className="truncate">{content.email || 'kshitijpilankar@gmail.com'}</span>
                </a>
              ))}
            </div>
          </div>

          <div className={`${isMobile ? 'w-full' : 'lg:col-span-7'} bg-white border-3 border-black rounded-2xl p-5 sm:p-8 shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] w-full box-border`}>
            {submitted ? (
              <div className="py-8 sm:py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#FFE600] border-2 border-black text-black mx-auto flex items-center justify-center font-black shadow-[2px_2px_0px_#000]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-black uppercase">Message Received!</h3>
                <button type="button" onClick={() => setSubmitted(false)} className="text-xs font-black text-black underline cursor-pointer">Send Another</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4 sm:space-y-5 w-full box-border">
                <div>
                  <label className="text-[11px] sm:text-xs font-black text-black block mb-1 uppercase">Full Name *</label>
                  <input type="text" required placeholder="Kshitij Pilankar" className="w-full bg-white border-2 border-black p-2.5 sm:p-3 text-xs sm:text-sm text-black font-bold outline-none rounded-lg shadow-[2px_2px_0px_#000] box-border" />
                </div>
                <div>
                  <label className="text-[11px] sm:text-xs font-black text-black block mb-1 uppercase">Email Address *</label>
                  <input type="email" required placeholder="kshitij@example.com" className="w-full bg-white border-2 border-black p-2.5 sm:p-3 text-xs sm:text-sm text-black font-bold outline-none rounded-lg shadow-[2px_2px_0px_#000] box-border" />
                </div>
                <div>
                  <label className="text-[11px] sm:text-xs font-black text-black block mb-1 uppercase">Message *</label>
                  <textarea rows={3} required placeholder="Tell me about your project goals..." className="w-full bg-white border-2 border-black p-2.5 sm:p-3 text-xs sm:text-sm text-black font-bold outline-none rounded-lg shadow-[2px_2px_0px_#000] resize-none box-border" />
                </div>
                <button type="submit" className="w-full bg-[#FFE600] hover:bg-[#ebd300] text-black font-black text-xs sm:text-sm py-3 sm:py-3.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer">
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
      <section id="contact-section" ref={contactRef} className="p-4 sm:p-8 md:p-20 bg-[#FDFBF7] text-[#2C2621] font-serif border-b border-[#E7DEC8]">
        <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 bg-[#F7F3EB] border border-[#E7DEC8] rounded-3xl p-6 sm:p-12 shadow-xs text-center w-full box-border">
          {renderItem('contact-title', 'Contact Title', (
            <h2 className="text-2xl sm:text-4xl font-bold text-[#2C2621] tracking-tight">
              {content.title || "Let's Build Something Together"}
            </h2>
          ))}
          {renderItem('contact-subtitle', 'Contact Subtitle', (
            <p className="text-xs sm:text-sm text-[#645647] font-sans leading-relaxed max-w-lg mx-auto">
              {content.subtitle || "Available for full-time opportunities and creative design system engineering."}
            </p>
          ))}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 sm:pt-4">
            {renderItem('contact-email-btn', 'Email CTA Button', (
              <a href={`mailto:${content.email || 'kshitijpilankar@gmail.com'}`} className="bg-[#C2410C] hover:bg-[#a3360a] text-white font-sans font-bold text-xs sm:text-sm px-6 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-sm transition-all flex items-center gap-2 max-w-full truncate">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <span className="truncate">Email {content.email || 'kshitijpilankar@gmail.com'}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 3. Cyber Terminal Contact Variant
  if (isCyber) {
    return (
      <section id="contact-section" ref={contactRef} className="p-4 sm:p-8 md:p-20 bg-[#070b14] text-white font-mono border-b border-cyan-500/20">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 w-full">
          <div className="text-center space-y-2">
            {renderItem('contact-title', 'Contact Title', (
              <h2 className="text-2xl sm:text-3xl font-black text-white">{content.title || "CLI Contact & Endpoint"}</h2>
            ))}
            {renderItem('contact-subtitle', 'Contact Subtitle', (
              <p className="text-[11px] sm:text-xs text-cyan-400">Trigger direct webhook or drop an email payload</p>
            ))}
          </div>

          <div className="bg-[#0f172a] border border-cyan-500/30 rounded-2xl p-4 sm:p-6 space-y-4 shadow-[0_0_25px_rgba(0,245,255,0.1)] w-full box-border">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-[11px] sm:text-xs font-bold text-slate-300 truncate">curl-contact-endpoint.sh</span>
              </div>
              <button type="button" onClick={handleCopyCli} className="flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] sm:text-xs px-2.5 py-1 rounded-md shrink-0 cursor-pointer">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy cURL'}</span>
              </button>
            </div>

            {renderItem('contact-cmd', 'cURL Command Box', (
              <div className="bg-[#090d16] p-3 sm:p-4 rounded-xl text-[10px] sm:text-xs text-slate-300 border border-cyan-500/10 overflow-x-auto break-all whitespace-pre-wrap font-mono">
                <code>
                  <span className="text-cyan-400 font-bold">$ </span>
                  curl -X POST https://api.kshitij.dev/contact -d '&#123;"hire": true, "email": "{content.email || 'kshitijpilankar@gmail.com'}"&#125;'
                </code>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              {renderItem('contact-email-btn', 'Email CTA Button', (
                <a href={`mailto:${content.email || 'kshitijpilankar@gmail.com'}`} className="bg-[#00f5ff] hover:bg-[#00d0db] text-black font-black text-xs px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(0,245,255,0.3)] flex items-center gap-2 max-w-full truncate">
                  <Mail className="w-4 h-4 text-black shrink-0" />
                  <span className="truncate">{content.email || 'kshitijpilankar@gmail.com'}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 4. Default Bento-Minimal Floating Dock Variant
  return (
    <section id="contact-section" ref={contactRef} className="p-4 sm:p-8 md:p-20 bg-[#F8FAFC] text-slate-900 font-sans border-b border-slate-200 text-center">
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 shadow-xl w-full box-border">
        {renderItem('contact-title', 'Contact Title', (
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {content.title || "Let's Build Something Together"}
          </h2>
        ))}
        {renderItem('contact-subtitle', 'Contact Subtitle', (
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
            {content.subtitle || "Available for full-time opportunities, technical leadership roles, and high-impact design system engineering."}
          </p>
        ))}

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 sm:pt-4">
          {renderItem('contact-email-btn', 'Email CTA Button', (
            <a href={`mailto:${content.email || 'kshitijpilankar@gmail.com'}`} className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-6 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-md transition-all flex items-center gap-2 max-w-full truncate">
              <Mail className="w-4 h-4 text-white shrink-0" />
              <span className="truncate">Email {content.email || 'kshitijpilankar@gmail.com'}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
