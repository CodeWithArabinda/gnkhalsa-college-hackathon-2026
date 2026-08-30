import React from 'react';
import { Type, Grid, Code, Sparkles, Image as ImageIcon, Link as LinkIcon, Share2, Layers, Plus, X } from 'lucide-react';

export default function AddElementsDrawer({ onClose, onAddElement }) {
  const ELEMENT_PRESETS = [
    {
      category: 'Text & Headings',
      items: [
        { type: 'text', label: 'Heading 1', desc: 'Main display section title', icon: Type },
        { type: 'text', label: 'Subtitle Paragraph', desc: 'Clean humanist bio text', icon: Type }
      ]
    },
    {
      category: 'Cards & Showcases',
      items: [
        { type: 'project', label: 'Project Showcase Card', desc: 'Interactive card with links & tags', icon: Grid },
        { type: 'skill', label: 'Tech Stack Badge Tile', desc: 'Competency matrix pill box', icon: Code }
      ]
    },
    {
      category: 'Buttons & CTAs',
      items: [
        { type: 'text', label: 'Primary Glow CTA', desc: 'High-converting action button', icon: Sparkles },
        { type: 'text', label: 'Secondary Outline Button', desc: 'Subtle outline link button', icon: LinkIcon }
      ]
    },
    {
      category: 'Media & Social',
      items: [
        { type: 'image', label: 'Avatar / Hero Frame', desc: 'Profile photo image box', icon: ImageIcon },
        { type: 'text', label: 'Social Icon Row', desc: 'GitHub, LinkedIn & Email links', icon: Share2 }
      ]
    }
  ];

  return (
    <div className="space-y-4 font-sans text-xs">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-md bg-[#0053ff] text-white flex items-center justify-center font-bold">
            <Plus className="w-4 h-4" />
          </div>
          <h3 className="font-heading font-extrabold text-sm text-slate-900">Add Elements</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-800 rounded-md hover:bg-slate-100"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {ELEMENT_PRESETS.map((cat) => (
          <div key={cat.category} className="space-y-2">
            <p className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {cat.category}
            </p>
            <div className="grid grid-cols-1 gap-2">
              {cat.items.map((item) => {
                const IconComp = item.icon;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => onAddElement(item.type)}
                    className="flex items-start gap-2.5 p-2.5 bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 rounded-xl text-left transition-all hover:scale-[1.01] cursor-pointer group"
                  >
                    <div className="p-2 bg-white rounded-lg border border-slate-200 text-[#0053ff] group-hover:bg-[#0053ff] group-hover:text-white transition-colors shrink-0 shadow-2xs">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-900 text-xs truncate group-hover:text-[#0053ff]">
                        {item.label}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">{item.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
