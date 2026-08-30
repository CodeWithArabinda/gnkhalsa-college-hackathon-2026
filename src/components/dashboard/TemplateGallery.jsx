import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, ArrowRight, Sparkles, Upload } from 'lucide-react';
import { getArchetypeConfig } from '../../lib/geminiBuilder';

const TEMPLATE_PRESETS = [
  {
    id: 'autono',
    archetype: 'neo-brutalist',
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
    archetype: 'warm-editorial',
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
    archetype: 'warm-editorial',
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
    archetype: 'cyber-terminal',
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
    archetype: 'bento-minimal',
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
    archetype: 'bento-minimal',
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

export default function TemplateGallery({ onSelectArchetype }) {
  const [activeCategory, setActiveCategory] = useState('All (6)');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleCustomUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed) {
          localStorage.setItem('stackfolio_portfolio_schema', JSON.stringify(parsed));
          localStorage.setItem('stackfolio_studio_draft', JSON.stringify(parsed));
          navigate('/studio');
        }
      } catch (err) {
        alert("Invalid JSON template file. Please upload a valid StackFolio schema file.");
      }
    };
    reader.readAsText(file);
  };

  const filteredTemplates = TEMPLATE_PRESETS.filter(t => {
    if (activeCategory.startsWith('All')) return true;
    return t.category === activeCategory;
  });

  const handleSelectTemplate = (template) => {
    const targetArchetype = template.archetype || 'neo-brutalist';
    
    if (onSelectArchetype) {
      onSelectArchetype(targetArchetype);
    }

    const config = getArchetypeConfig(targetArchetype);

    const presetSchema = {
      archetype: config.archetype,
      metadata: {
        slug: "kshitij-pilankar",
        title: `${template.name} — Portfolio`,
        customDomain: "kshitijpilankar.dev"
      },
      theme: config.theme,
      blocks: [
        {
          id: "block-hero",
          type: "HeroBlock",
          layoutVariant: config.variants.hero,
          content: {
            name: "I'm Kshitij Pilankar.",
            headline: "Creative Fullstack Architect",
            bio: "Building high-impact digital experiences with React 18, WebGL, and modern design systems.",
            ctaText: "Explore Projects",
            avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop"
          }
        },
        {
          id: "block-projects",
          type: "ProjectGridBlock",
          layoutVariant: config.variants.works,
          content: {
            title: "Selected Works",
            subtitle: "Selected software and design showcases",
            items: [
              {
                id: "p1",
                title: "3D Space Canvas Engine",
                description: "Interactive WebGL portfolio template with real-time video scrubbing.",
                tags: ["React", "WebGL", "GSAP"],
                link: "https://github.com",
                imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop"
              },
              {
                id: "p2",
                title: "StackFolio Studio Copilot",
                description: "Conversational website builder with live preview frame and inline edits.",
                tags: ["TypeScript", "Tailwind", "AI"],
                link: "https://github.com",
                imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop"
              }
            ]
          }
        },
        {
          id: "block-pillars",
          type: "PillarsBlock",
          layoutVariant: config.variants.pillars,
          content: {
            title: "Engineering Excellence",
            categories: [
              { name: "Frontend Engineering", skills: ["React 18", "Vite", "Tailwind CSS", "GSAP"] },
              { name: "Backend & Cloud", skills: ["Node.js", "Supabase", "PostgreSQL", "Docker"] },
              { name: "Full-Stack Architecture", skills: ["System Design", "GraphQL", "CI/CD", "Vercel"] }
            ]
          }
        },
        {
          id: "block-[#story]",
          type: "StoryBlock",
          layoutVariant: config.variants.story,
          content: {
            title: "The Architect",
            bio: "Engineering software requires an uncompromised balance between aesthetic precision and technical integrity."
          }
        },
        {
          id: "block-contact",
          type: "ContactBlock",
          layoutVariant: config.variants.contact,
          content: {
            title: "Let's Build Something Together",
            subtitle: "Available for full-time opportunities and design system engineering.",
            email: "kshitijpilankar@gmail.com"
          }
        },
        {
          id: "block-footer",
          type: "FooterBlock",
          content: {
            title: "WebDev Portfolio",
            copyright: "© 2026 WebDev Portfolio. All rights reserved."
          }
        }
      ]
    };

    localStorage.setItem('stackfolio_selected_template', template.id);
    localStorage.setItem('stackfolio_portfolio_schema', JSON.stringify(presetSchema));
    localStorage.setItem('stackfolio_studio_draft', JSON.stringify(presetSchema));

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

      {/* Filter Category Pills & Custom Upload Action */}
      <div className="flex flex-wrap items-center justify-between gap-3">
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

        {/* Upload Custom Template Action Button */}
        <div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-black bg-white hover:bg-neutral-100 font-black shadow-[2.5px_2.5px_0px_#000000] px-4 py-1.5 rounded-lg text-xs transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1.5 text-black"
          >
            <Upload className="w-3.5 h-3.5 text-black" />
            <span>Upload Custom Template</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleCustomUpload}
          />
        </div>
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
                  onClick={() => handleSelectTemplate(tmpl)}
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
                  onClick={() => handleSelectTemplate(tmpl)}
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
