import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TemplateRenderer from '../components/templates/TemplateRenderer';
import { initialPortfolioSchema } from '../types/schema';
import { Sparkles, ArrowLeft, ExternalLink, Mail, Code, Layout } from 'lucide-react';

export default function LivePortfolioPreview() {
  const [schema, setSchema] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const savedStudio = localStorage.getItem('stackfolio_studio_draft');
      if (savedStudio) {
        setSchema(JSON.parse(savedStudio));
        return;
      }
      const savedPortfolio = localStorage.getItem('stackfolio_portfolio_schema') || localStorage.getItem('stackfolio_active_draft');
      if (savedPortfolio) {
        setSchema(JSON.parse(savedPortfolio));
        return;
      }
    } catch (e) {
      console.error("Error reading preview schema:", e);
    }
    setSchema(initialPortfolioSchema);
  }, []);

  if (!schema) return null;

  // Convert schema blocks to TemplateRenderer structure if needed
  const heroBlock = schema.blocks?.find(b => b.type === 'HeroBlock')?.content || {};
  const projectsBlock = schema.blocks?.find(b => b.type === 'ProjectGridBlock')?.content || {};
  const skillsBlock = schema.blocks?.find(b => b.type === 'SkillsBlock')?.content || {};
  const contactBlock = schema.blocks?.find(b => b.type === 'ContactBlock')?.content || {};

  const portfolioData = {
    full_name: heroBlock.name || "Kshitij Pilankar",
    headline: heroBlock.headline || "Creative Developer & Designer",
    bio: heroBlock.bio || "Building high-impact digital experiences with React, WebGL, and modern design systems.",
    profile_image_url: heroBlock.avatarUrl || "/photo/Sarang.png",
    email: contactBlock.email || "kshitijpilankar@gmail.com",
    selected_template: "bento",
    projects: (projectsBlock.items || []).map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      live_demo_url: p.link,
      github_url: p.link,
      tech_stack: p.tags
    })),
    skills: (skillsBlock.categories || []).flatMap(c => (c.skills || []).map(s => ({
      id: s,
      skill_name: s,
      category: c.name
    })))
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans relative">
      
      {/* Render Template cleanly without Studio Chrome */}
      <TemplateRenderer portfolio={portfolioData} />

      {/* Floating Bottom-Right StackFolio Live Badge */}
      <div className="fixed bottom-5 right-5 z-50 bg-white/95 border border-slate-200/90 shadow-2xl rounded-full px-4 py-2 flex items-center gap-3 text-xs font-sans text-slate-800 backdrop-blur-md animate-in fade-in duration-300">
        <div className="flex items-center gap-2 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Built with StackFolio AI Studio</span>
        </div>

        <div className="w-px h-4 bg-slate-200" />

        <button
          type="button"
          onClick={() => navigate('/studio')}
          className="bg-[#0053ff] hover:bg-[#0043cc] text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <span>Edit Site</span>
          <Sparkles className="w-3 h-3 text-white" />
        </button>
      </div>

    </div>
  );
}
