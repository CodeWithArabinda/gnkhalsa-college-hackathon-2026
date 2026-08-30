import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Eye, ArrowRight, Check } from 'lucide-react';

const TEMPLATE_PRESETS = [
  {
    id: 'autono',
    name: 'AUTONO',
    category: 'Developer & Tech',
    badge: 'WIX HARMONY',
    description: 'Clean Minimal Editorial Tech theme with white & slate canvas, sharp typography, and high-impact CTA buttons.',
    previewBg: 'bg-gradient-to-b from-slate-100 to-white',
    accentColor: '#0053ff',
    textColor: 'text-slate-900'
  },
  {
    id: 'arian-grand',
    name: 'ARIAN GRAND / DESIGNER CV',
    category: 'Creative Studio',
    badge: 'POPULAR',
    description: 'Warm peach-to-orange gradient aesthetic with rich avatar focus, floating tech badges, and social triggers.',
    previewBg: 'bg-gradient-to-tr from-amber-100 via-orange-50 to-pink-100',
    accentColor: '#ff5100',
    textColor: 'text-slate-900'
  },
  {
    id: 'darle-studio',
    name: 'DARLE STUDIO',
    category: 'Creative Studio',
    badge: 'FEATURED',
    description: 'Cobalt royal blue agency showcase with high-contrast project grid and interactive metrics matrix.',
    previewBg: 'bg-gradient-to-b from-blue-900 to-slate-950',
    accentColor: '#38BDF8',
    textColor: 'text-white'
  },
  {
    id: 'dark-obsidian',
    name: 'DARK OBSIDIAN / TERMINAL',
    category: 'Developer & Tech',
    badge: 'CYBER',
    description: 'Cyber dark mode with monospaced cyan borders, terminal window headers, and neon amber badges.',
    previewBg: 'bg-[#0b0e14]',
    accentColor: '#00FFA3',
    textColor: 'text-emerald-400'
  },
  {
    id: 'bento-modular',
    name: 'BENTO MODULAR',
    category: 'Bento & Minimal',
    badge: 'VERCEL STYLE',
    description: 'Apple/Vercel-inspired glassmorphic bento grid cards with dynamic column spans and subtle borders.',
    previewBg: 'bg-slate-900',
    accentColor: '#A855F7',
    textColor: 'text-white'
  },
  {
    id: 'cinematic-nebula',
    name: 'CINEMATIC NEBULA',
    category: 'Bento & Minimal',
    badge: 'NEW',
    description: 'Deep space dark canvas with warm amber radial gradients, glass navbar, and floating project cards.',
    previewBg: 'bg-gradient-to-b from-zinc-950 via-zinc-900 to-black',
    accentColor: '#FF6B1A',
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
      
      {/* Gallery Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/80 pt-8">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Or, start from a template recommended for you.
        </h2>
        <button
          type="button"
          onClick={() => setActiveCategory('All (6)')}
          className="text-xs font-bold text-[#0053ff] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>See All ({TEMPLATE_PRESETS.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Filter Category Pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
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
            className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
          >
            {/* Top Mockup Preview Frame */}
            <div className={`h-48 ${tmpl.previewBg} p-4 relative flex flex-col justify-between border-b border-slate-100 overflow-hidden`}>
              
              {/* Browser Mac Dots Header */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <span className="text-[9px] font-mono font-bold bg-white/80 dark:bg-black/60 px-2 py-0.5 rounded-full uppercase text-slate-800 dark:text-slate-200">
                  {tmpl.badge}
                </span>
              </div>

              {/* Inner Mini Mockup Content */}
              <div className="my-auto space-y-2 z-10">
                <div className="w-24 h-3 bg-slate-900/20 dark:bg-white/20 rounded-full" />
                <h4 className={`text-lg font-black tracking-tight ${tmpl.textColor}`}>
                  {tmpl.name}
                </h4>
                <div className="flex gap-1.5">
                  <span className="w-12 h-2 rounded bg-[#0053ff]/40" />
                  <span className="w-8 h-2 rounded bg-amber-500/40" />
                </div>
              </div>

              {/* Hover Overlay Button */}
              <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20 backdrop-blur-2xs">
                <button
                  type="button"
                  onClick={() => handleSelectTemplate(tmpl.id)}
                  className="bg-[#0053ff] text-white font-bold text-xs px-4 py-2 rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
                >
                  Use Template
                </button>
              </div>

            </div>

            {/* Card Details & Actions */}
            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-[#0053ff] transition-colors">
                  {tmpl.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {tmpl.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleSelectTemplate(tmpl.id)}
                  className="bg-[#0053ff] hover:bg-[#0043cc] text-white font-bold text-xs px-4 py-2 rounded-xl flex-1 text-center shadow-xs transition-colors cursor-pointer"
                >
                  🚀 Open in Studio
                </button>

                <button
                  type="button"
                  onClick={() => window.open('/preview', '_blank')}
                  className="border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs px-3 py-2 rounded-xl transition-colors cursor-pointer"
                  title="Preview Template Fullscreen"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
