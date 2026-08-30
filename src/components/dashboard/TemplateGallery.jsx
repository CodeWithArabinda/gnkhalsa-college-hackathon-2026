import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, ArrowRight, Sparkles } from 'lucide-react';

const TEMPLATE_PRESETS = [
  {
    id: 'autono',
    name: 'AUTONO',
    category: 'Developer & Tech',
    badge: 'NEO-BRUTALIST',
    badgeColor: 'bg-[#FFE600]',
    description: 'Clean Minimal Editorial Tech theme with off-white canvas, sharp typography, and hard-edge shadow CTA buttons.',
    previewBg: 'bg-gradient-to-b from-slate-100 to-white',
    textColor: 'text-black'
  },
  {
    id: 'arian-grand',
    name: 'ARIAN GRAND / DESIGNER CV',
    category: 'Creative Studio',
    badge: 'POPULAR',
    badgeColor: 'bg-[#93c5fd]',
    description: 'Warm peach-to-orange gradient aesthetic with rich avatar focus, floating tech badges, and social triggers.',
    previewBg: 'bg-gradient-to-tr from-amber-100 via-orange-50 to-pink-100',
    textColor: 'text-black'
  },
  {
    id: 'darle-studio',
    name: 'DARLE STUDIO',
    category: 'Creative Studio',
    badge: 'FEATURED',
    badgeColor: 'bg-[#86efac]',
    description: 'Cobalt royal blue agency showcase with high-contrast project grid and interactive metrics matrix.',
    previewBg: 'bg-gradient-to-b from-blue-900 to-slate-950',
    textColor: 'text-white'
  },
  {
    id: 'dark-obsidian',
    name: 'DARK OBSIDIAN / TERMINAL',
    category: 'Developer & Tech',
    badge: 'CYBER',
    badgeColor: 'bg-[#fca5a5]',
    description: 'Cyber dark mode with monospaced cyan borders, terminal window headers, and neon amber badges.',
    previewBg: 'bg-[#0b0e14]',
    textColor: 'text-emerald-400'
  },
  {
    id: 'bento-modular',
    name: 'BENTO MODULAR',
    category: 'Bento & Minimal',
    badge: 'VERCEL STYLE',
    badgeColor: 'bg-[#fef08a]',
    description: 'Apple/Vercel-inspired glassmorphic bento grid cards with dynamic column spans and subtle borders.',
    previewBg: 'bg-slate-900',
    textColor: 'text-white'
  },
  {
    id: 'cinematic-nebula',
    name: 'CINEMATIC NEBULA',
    category: 'Bento & Minimal',
    badge: 'NEW',
    badgeColor: 'bg-[#c084fc]',
    description: 'Deep space dark canvas with warm amber radial gradients, glass navbar, and floating project cards.',
    previewBg: 'bg-gradient-to-b from-zinc-950 via-zinc-900 to-black',
    textColor: 'text-amber-400'
  }
];

const CATEGORIES = [
  'All (6)',
  'Developer & Tech',
  'Bento & Minimal',
  'Creative Studio'
];

export default function TemplateGallery() {
  const [activeCategory, setActiveCategory] = useState('All (6)');
  const navigate = useNavigate();

  const filteredTemplates = TEMPLATE_PRESETS.filter(t => {
    if (activeCategory.startsWith('All')) return true;
    return t.category === activeCategory;
  });

  const handleSelectTemplate = (templateId) => {
    localStorage.setItem('stackfolio_selected_template', templateId);
    navigate('/studio');
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 pt-6 pb-16 font-sans select-none">
      
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-black/10 pt-8">
        <h2 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight">
          START FROM A CURATED TEMPLATE.
        </h2>
        <button
          type="button"
          onClick={() => setActiveCategory('All (6)')}
          className="text-xs font-black text-black hover:text-[#0053ff] flex items-center gap-1 cursor-pointer"
        >
          <span>SEE ALL ({TEMPLATE_PRESETS.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Filter Category Pills */}
      <div className="flex flex-wrap gap-2.5">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-black border-2 border-black transition-all cursor-pointer ${
                isActive
                  ? 'bg-black text-white shadow-[2.5px_2.5px_0px_#FFE600]'
                  : 'bg-white text-black shadow-[2.5px_2.5px_0px_#000000] hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Template Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {filteredTemplates.map((tmpl) => (
          <div
            key={tmpl.id}
            className="bg-white border-[2.5px] border-black rounded-2xl p-4 shadow-[5px_5px_0px_#000000] flex flex-col justify-between hover:shadow-[7px_7px_0px_#000000] hover:-translate-y-1 transition-all duration-200 group"
          >
            {/* Mockup Window */}
            <div className={`h-44 ${tmpl.previewBg} p-3 rounded-xl border-2 border-black relative flex flex-col justify-between overflow-hidden shadow-[2px_2px_0px_#000]`}>
              
              {/* Browser Header */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 border border-black" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-black" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black" />
                </div>
                <span className={`${tmpl.badgeColor} text-black border-2 border-black font-black text-[9px] px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_#000] uppercase`}>
                  {tmpl.badge}
                </span>
              </div>

              {/* Mockup Title */}
              <div className="my-auto space-y-1.5 z-10">
                <h4 className={`text-base font-black tracking-tight ${tmpl.textColor}`}>
                  {tmpl.name}
                </h4>
                <div className="flex gap-1.5">
                  <span className="w-12 h-1.5 rounded bg-black/30" />
                  <span className="w-8 h-1.5 rounded bg-black/20" />
                </div>
              </div>

              {/* Hover Trigger */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 backdrop-blur-2xs">
                <button
                  type="button"
                  onClick={() => handleSelectTemplate(tmpl.id)}
                  className="bg-[#FFE600] text-black border-2 border-black font-black text-xs px-4 py-2 rounded-xl shadow-[3px_3px_0px_#000] hover:scale-105 transition-transform cursor-pointer"
                >
                  Use Template ➔
                </button>
              </div>

            </div>

            {/* Content & Action Buttons */}
            <div className="pt-4 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <h3 className="font-black text-base text-black tracking-tight">
                  {tmpl.name}
                </h3>
                <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                  {tmpl.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t-2 border-black/10">
                <button
                  type="button"
                  onClick={() => handleSelectTemplate(tmpl.id)}
                  className="bg-[#FFE600] hover:bg-[#ebd300] text-black border-2 border-black font-black text-xs py-2 px-3 rounded-lg shadow-[2px_2px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex-1 text-center cursor-pointer"
                >
                  🚀 Open in Studio
                </button>

                <button
                  type="button"
                  onClick={() => window.open('/preview', '_blank')}
                  className="bg-white hover:bg-slate-100 text-black border-2 border-black font-bold text-xs p-2 rounded-lg shadow-[2px_2px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
                  title="Preview Template Fullscreen"
                >
                  <Eye className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
