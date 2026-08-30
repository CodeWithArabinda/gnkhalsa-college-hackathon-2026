import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialPortfolioSchema } from '../types/schema';
import { Sparkles } from 'lucide-react';
import SiteHeaderNavbar from '../components/studio/sections/SiteHeaderNavbar';
import HeroSection from '../components/studio/sections/HeroSection';
import WorksGridSection from '../components/studio/sections/WorksGridSection';
import PillarsSection from '../components/studio/sections/PillarsSection';
import StorySection from '../components/studio/sections/StorySection';
import ContactSection from '../components/studio/sections/ContactSection';
import FooterSection from '../components/studio/sections/FooterSection';

export default function LivePortfolioPreview() {
  const [schema, setSchema] = useState(null);
  const navigate = useNavigate();

  const loadSchema = () => {
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
      console.error("Error reading live preview schema:", e);
    }
    setSchema(initialPortfolioSchema);
  };

  useEffect(() => {
    loadSchema();
    const handleStorageChange = (e) => {
      if (e.key === 'stackfolio_studio_draft' || e.key === 'stackfolio_portfolio_schema') {
        loadSchema();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (!schema) return null;

  const customDomain = schema?.metadata?.customDomain;

  // Render dummy wrapper component for read-only preview mode
  const DummyEditableCanvasItem = ({ children }) => <>{children}</>;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 relative">
      
      {/* Persistent Site Header Navbar */}
      <SiteHeaderNavbar
        title={schema?.metadata?.title || "Kshitij Pilankar"}
        archetype={schema?.archetype}
        scrollToProjects={() => {
          const el = document.getElementById('projects-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        scrollToContact={() => {
          const el = document.getElementById('contact-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Polymorphic Section Stream */}
      {schema.blocks && schema.blocks.length > 0 ? (
        schema.blocks.map((block, index) => {
          return (
            <div key={block.id} className="w-full border-b last:border-b-0 border-slate-100">
              
              {block.type === 'HeroBlock' && (
                <HeroSection
                  block={block}
                  index={index}
                  schema={schema}
                  handleInlineChange={() => {}}
                  EditableCanvasItem={DummyEditableCanvasItem}
                />
              )}

              {block.type === 'ProjectGridBlock' && (
                <WorksGridSection
                  block={block}
                  index={index}
                  schema={schema}
                  handleInlineChange={() => {}}
                  EditableCanvasItem={DummyEditableCanvasItem}
                />
              )}

              {(block.type === 'PillarsBlock' || block.type === 'SkillsBlock') && (
                <PillarsSection
                  block={block}
                  index={index}
                  schema={schema}
                  handleInlineChange={() => {}}
                  EditableCanvasItem={DummyEditableCanvasItem}
                />
              )}

              {block.type === 'StoryBlock' && (
                <StorySection
                  block={block}
                  index={index}
                  schema={schema}
                  handleInlineChange={() => {}}
                  EditableCanvasItem={DummyEditableCanvasItem}
                />
              )}

              {block.type === 'ContactBlock' && (
                <ContactSection
                  block={block}
                  index={index}
                  schema={schema}
                  handleInlineChange={() => {}}
                  EditableCanvasItem={DummyEditableCanvasItem}
                />
              )}

              {block.type === 'FooterBlock' && (
                <FooterSection />
              )}

            </div>
          );
        })
      ) : null}

      {/* Floating Bottom-Right StackFolio Live Site Badge */}
      <div className="fixed bottom-5 right-5 z-50 bg-white/95 border border-slate-200/90 shadow-2xl rounded-full px-4 py-2 flex items-center gap-3 text-xs font-sans text-slate-800 backdrop-blur-md animate-in fade-in duration-300">
        <div className="flex items-center gap-2 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-900 font-mono text-[11px]">
            {customDomain ? `https://${customDomain}` : 'kshitijpilankar.dev'}
          </span>
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
