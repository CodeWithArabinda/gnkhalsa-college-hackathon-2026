import React from 'react';
import { Github, Linkedin, Twitter, Terminal, CheckCircle2 } from 'lucide-react';

export default function FooterSection({
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
  EditableCanvasItem,
  archetype = "bento-minimal",
  theme
}) {
  const name = schema?.hero?.name || schema?.metadata?.title || "Kshitij Pilankar";
  const contact = schema?.contact || {};
  const blockId = block?.id || "footer-block";

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
          blockIndex={index || 5}
          className={className}
        >
          {children}
        </EditableCanvasItem>
      );
    }
    return children;
  };

  return (
    <footer className="w-full border-t border-cyan-950/60 bg-[#050B14] py-10 px-8 select-none font-mono">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Copyright */}
        <div className="flex flex-col gap-1 text-center md:text-left">
          {renderItem('footer-brand', 'Footer Brand Title', (
            <span className="text-cyan-400 font-mono text-sm font-semibold tracking-wider">
              {name} — Portfolio
            </span>
          ))}

          {renderItem('footer-copyright', 'Footer Copyright', (
            <p className="text-xs text-neutral-400 font-mono">
              © {new Date().getFullYear()} All rights reserved. Built with StackFolio Engine.
            </p>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-5">
          {renderItem('footer-github', 'GitHub Link', (
            <a href={contact.github || "https://github.com"} target="_blank" rel="noreferrer" className="text-xs font-mono text-neutral-300 hover:text-cyan-400 flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          ))}

          {renderItem('footer-linkedin', 'LinkedIn Link', (
            <a href={contact.linkedin || "https://linkedin.com"} target="_blank" rel="noreferrer" className="text-xs font-mono text-neutral-300 hover:text-cyan-400 flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          ))}

          {renderItem('footer-twitter', 'Twitter / X Link', (
            <a href={contact.twitter || "https://x.com"} target="_blank" rel="noreferrer" className="text-xs font-mono text-neutral-300 hover:text-cyan-400 flex items-center gap-1.5">
              <Twitter className="w-3.5 h-3.5" />
              <span>X (Twitter)</span>
            </a>
          ))}
        </div>

        {/* System Status Telemetry Pill */}
        {renderItem('footer-status', 'System Status Pill', (
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3.5 py-1.5 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SYSTEM STATUS: 100% OPERATIONAL</span>
          </div>
        ))}

      </div>
    </footer>
  );
}
