import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialPortfolioSchema } from '../types/schema';
import { Sparkles, Mail, ExternalLink, Globe } from 'lucide-react';

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

    // Storage event listener for cross-tab updates
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

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 relative">
      
      {/* Dynamic Blocks Stream matching CanvasPreview 1:1 */}
      {schema.blocks && schema.blocks.length > 0 ? (
        schema.blocks.map((block) => {
          return (
            <div key={block.id} className="w-full">
              
              {/* 1. HeroBlock (Wix Harmony Light Layout) */}
              {block.type === 'HeroBlock' && (
                <section className="px-6 py-16 sm:py-24 max-w-6xl mx-auto flex flex-col justify-center min-h-[520px]">
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">
                    
                    <div className="space-y-6">
                      {/* Tagline Badge */}
                      <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-blue-50 border border-blue-200/60 rounded-full text-xs font-semibold text-[#0053ff]">
                        <Sparkles className="w-4 h-4 text-[#ff5100]" />
                        <span>{block.content?.headline || "Creative Developer & Designer"}</span>
                      </div>

                      {/* Headline Name */}
                      <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-tight">
                        {block.content?.name || "Engineering Digital Excellence"}
                      </h1>

                      {/* Bio Paragraph */}
                      <p className="text-slate-600 font-normal leading-relaxed text-base sm:text-lg max-w-xl">
                        {block.content?.bio || "Building high-impact digital experiences with React, WebGL, and modern design systems."}
                      </p>

                      {/* Action CTA Buttons */}
                      <div className="flex flex-wrap gap-4 pt-2">
                        {block.content?.ctaText && (
                          <a
                            href="#projects-section"
                            className="bg-[#ff5100] hover:bg-[#d64400] text-white font-bold px-7 py-3.5 rounded-full text-sm shadow-md transition-all cursor-pointer"
                          >
                            {block.content.ctaText}
                          </a>
                        )}

                        {block.content?.secondaryCta && (
                          <a
                            href="#contact-section"
                            className="px-7 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-full transition-all cursor-pointer"
                          >
                            {block.content.secondaryCta}
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right Avatar / Diagram Card */}
                    <div
                      className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-cover bg-center transition-all"
                      style={{
                        backgroundImage: `url(${block.content?.avatarUrl || '/photo/Sarang.png'})`
                      }}
                    />

                  </div>
                </section>
              )}

              {/* 2. ProjectGridBlock */}
              {block.type === 'ProjectGridBlock' && (
                <section id="projects-section" className="py-16 px-6 bg-slate-50/60 border-t border-b border-slate-100">
                  <div className="max-w-6xl mx-auto space-y-8">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-extrabold text-slate-900">{block.content?.title || "Featured Works"}</h2>
                      <p className="text-xs text-slate-500 font-mono">{block.content?.subtitle || "Selected software and design showcases"}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {block.content?.items?.map((item) => (
                        <div key={item.id} className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-4 shadow-xs hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <h3 className="font-extrabold text-lg text-slate-900">{item.title}</h3>
                            <a href={item.link || '#'} target="_blank" rel="noreferrer" className="text-[#0053ff] p-1.5 hover:bg-blue-50 rounded-lg transition-colors">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-sans">{item.description}</p>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {item.tags?.map((t) => (
                              <span key={t} className="px-2.5 py-1 bg-blue-50 text-[#0053ff] text-[10px] font-mono rounded-md font-bold">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* 3. SkillsBlock */}
              {block.type === 'SkillsBlock' && (
                <section className="py-16 px-6 bg-white">
                  <div className="max-w-6xl mx-auto space-y-8">
                    <h2 className="text-3xl font-extrabold text-slate-900">{block.content?.title || "Technical Stack"}</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {block.content?.categories?.map((cat) => (
                        <div key={cat.name} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 space-y-4">
                          <h3 className="text-xs font-mono font-bold text-[#ff5100] uppercase tracking-wider">{cat.name}</h3>
                          <div className="flex flex-wrap gap-2">
                            {cat.skills?.map((s) => (
                              <span key={s} className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 shadow-2xs">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* 4. ContactBlock */}
              {block.type === 'ContactBlock' && (
                <section id="contact-section" className="py-20 px-6 text-center bg-blue-50/40 border-t border-slate-100">
                  <div className="max-w-md mx-auto space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">{block.content?.title || "Let's Build Something Cool"}</h2>
                      <p className="text-sm text-slate-600">{block.content?.subtitle || "Available for full-time opportunities and creative projects."}</p>
                    </div>

                    {block.content?.email && (
                      <a
                        href={`mailto:${block.content.email}`}
                        className="inline-flex items-center space-x-2 bg-[#ff5100] hover:bg-[#d64400] text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Email {block.content.email}</span>
                      </a>
                    )}
                  </div>
                </section>
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
