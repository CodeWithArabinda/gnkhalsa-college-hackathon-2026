import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialPortfolioSchema } from '../types/schema';
import { Sparkles, Mail, ExternalLink, Globe, Github, Linkedin, Twitter, Youtube, Instagram, Code, Server, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';
import SiteHeaderNavbar from '../components/studio/sections/SiteHeaderNavbar';

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

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 relative">
      
      {/* Site Header Navbar */}
      <SiteHeaderNavbar
        title={schema?.metadata?.title || "Kshitij Pilankar"}
        scrollToProjects={() => {
          const el = document.getElementById('projects-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        scrollToContact={() => {
          const el = document.getElementById('contact-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 6 Wix Section Stream */}
      {schema.blocks && schema.blocks.length > 0 ? (
        schema.blocks.map((block) => {
          const content = block.content || {};

          return (
            <div key={block.id} className="w-full border-b last:border-b-0 border-slate-100">
              
              {/* 1. HeroSection */}
              {block.type === 'HeroBlock' && (
                <section className="p-8 sm:p-20 flex flex-col justify-center min-h-[520px] bg-white">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-6xl mx-auto w-full">
                    <div className="lg:col-span-7 space-y-6">
                      <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-blue-50 border border-blue-200/60 rounded-full text-xs font-semibold text-[#0053ff]">
                        <Sparkles className="w-3.5 h-3.5 text-[#ff5100]" />
                        <span>{content.headline || "Creative Developer & Designer"}</span>
                      </div>
                      <h1 className="text-5xl sm:text-6xl font-black text-slate-900 leading-[1.08] tracking-tight">
                        {content.name || "I'm Kshitij Pilankar."}
                      </h1>
                      <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
                        {content.bio || "Building high-impact digital experiences with React, WebGL, and modern design systems."}
                      </p>
                      <div className="flex flex-wrap gap-4 pt-2">
                        <a href="#projects-section" className="bg-[#ff5100] hover:bg-[#e04700] text-white font-bold text-sm px-7 py-3.5 rounded-full shadow-sm transition-all">
                          {content.ctaText || "Explore Projects"}
                        </a>
                        {content.secondaryCta && (
                          <a href="#contact-section" className="px-7 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-full transition-all">
                            {content.secondaryCta}
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="lg:col-span-5 flex justify-center">
                      <div className="w-full max-w-sm aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 bg-slate-100">
                        <img src={content.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop"} alt="Portrait" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* 2. WorksGridSection */}
              {block.type === 'ProjectGridBlock' && (
                <section id="projects-section" className="p-8 sm:p-20 space-y-8 bg-slate-50/60">
                  <div className="max-w-6xl mx-auto space-y-8">
                    <div className="flex items-end justify-between border-b border-slate-200 pb-5">
                      <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">{content.title || "Selected Works"}</h2>
                        <p className="text-xs text-slate-500 font-mono mt-1">{content.subtitle || "Selected software and design showcases"}</p>
                      </div>
                      <button type="button" className="border border-slate-300 rounded-full px-5 py-2 text-xs font-semibold text-slate-800 hidden sm:block">View All Work</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {content.items?.map((item, pIdx) => {
                        const formattedIndex = String(pIdx + 1).padStart(2, '0');
                        const defaultImg = pIdx === 0 ? "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop" : pIdx === 1 ? "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop" : "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop";
                        return (
                          <div key={item.id || pIdx} className="bg-white border border-slate-200/90 rounded-3xl p-5 space-y-4 shadow-xs">
                            <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100">
                              <img src={item.imageUrl || defaultImg} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex justify-between items-start pt-1">
                              <div>
                                <h3 className="font-bold text-lg text-slate-900">{item.title}</h3>
                                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mt-1.5">{item.description}</p>
                              </div>
                              <span className="font-mono text-sm font-black text-slate-400 shrink-0 ml-3">{formattedIndex}</span>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                              <div className="flex flex-wrap gap-1.5">
                                {item.tags?.map((t) => (
                                  <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-mono rounded-md font-semibold">{t}</span>
                                ))}
                              </div>
                              <a href={item.link || '#'} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#0053ff] p-1"><ExternalLink className="w-4 h-4" /></a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              )}

              {/* 3. PillarsSection */}
              {(block.type === 'PillarsBlock' || block.type === 'SkillsBlock') && (
                <section className="p-8 sm:p-20 bg-white">
                  <div className="max-w-6xl mx-auto space-y-10">
                    <h2 className="text-3xl font-black text-slate-900 text-center tracking-tight">{content.title || "Engineering Excellence"}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-[#eff6ff] rounded-3xl p-8 flex flex-col justify-between border border-blue-100/80">
                        <div className="space-y-4">
                          <div className="w-12 h-12 rounded-2xl bg-white border border-blue-200 text-[#0053ff] flex items-center justify-center"><Code className="w-6 h-6" /></div>
                          <h3 className="text-xl font-bold text-slate-900">Frontend Engineering</h3>
                          <p className="text-xs text-slate-600 leading-relaxed">Building responsive, pixel-perfect user interfaces with micro-animations and fast DOM rendering.</p>
                        </div>
                        <button type="button" className="bg-[#ff5100] text-white rounded-full font-bold text-xs py-2.5 px-5 w-fit mt-8">Learn More</button>
                      </div>

                      <div className="bg-[#fffbeb] rounded-3xl p-8 flex flex-col justify-between border border-amber-100/80">
                        <div className="space-y-4">
                          <div className="w-12 h-12 rounded-2xl bg-white border border-amber-200 text-amber-600 flex items-center justify-center"><Server className="w-6 h-6" /></div>
                          <h3 className="text-xl font-bold text-slate-900">Backend Architecture</h3>
                          <p className="text-xs text-slate-600 leading-relaxed">Designing resilient REST APIs, real-time database schemas, and serverless edge functions.</p>
                        </div>
                        <button type="button" className="bg-[#ff5100] text-white rounded-full font-bold text-xs py-2.5 px-5 w-fit mt-8">Learn More</button>
                      </div>

                      <div className="bg-[#f8fafc] rounded-3xl p-8 flex flex-col justify-between border border-slate-200/80">
                        <div className="space-y-4">
                          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-800 flex items-center justify-center"><Layers className="w-6 h-6" /></div>
                          <h3 className="text-xl font-bold text-slate-900">Full-Stack Solutions</h3>
                          <p className="text-xs text-slate-600 leading-relaxed">End-to-end product architecture from wireframing to production deployment and monitoring.</p>
                        </div>
                        <button type="button" className="bg-[#ff5100] text-white rounded-full font-bold text-xs py-2.5 px-5 w-fit mt-8">Learn More</button>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* 4. StorySection */}
              {block.type === 'StoryBlock' && (
                <section className="p-8 sm:p-20 bg-slate-50/50">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    <div className="rounded-[32px] overflow-hidden shadow-xl aspect-square bg-slate-200 border border-slate-200">
                      <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&auto=format&fit=crop" alt="Workstation" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-6">
                      <h2 className="text-4xl font-black text-slate-900 tracking-tight">The Architect</h2>
                      <div className="text-slate-600 text-sm leading-relaxed space-y-4">
                        <p>Engineering digital software requires an uncompromised balance between aesthetic precision and technical integrity.</p>
                        <p>My design philosophy is grounded in Humanist UI principles — clean contrast, accessible typography, fluid micro-animations, and fast page loads.</p>
                        <p>Whether engineering complex stateful canvases or setting up CI/CD pipelines, I ensure every line of code is structured for scale.</p>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* 5. ContactSection */}
              {block.type === 'ContactBlock' && (
                <section id="contact-section" className="p-8 sm:p-20 bg-white">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto w-full">
                    <div className="lg:col-span-5 space-y-6">
                      <h2 className="text-4xl sm:text-5xl font-black text-[#ff5100] leading-tight tracking-tight">{content.title || "Let's Build Something Together"}</h2>
                      <p className="text-slate-600 text-sm leading-relaxed">{content.subtitle || "Available for full-time opportunities, technical leadership roles, and high-impact design system engineering."}</p>
                      <div className="space-y-3 pt-4 border-t border-slate-100">
                        <a href={`mailto:${content.email || 'kshitijpilankar@gmail.com'}`} className="flex items-center gap-3 text-slate-800 hover:text-[#0053ff] font-semibold text-sm">
                          <div className="w-9 h-9 rounded-full bg-blue-50 text-[#0053ff] flex items-center justify-center"><Mail className="w-4 h-4" /></div>
                          <span>{content.email || 'kshitijpilankar@gmail.com'}</span>
                        </a>
                      </div>
                    </div>

                    <div className="lg:col-span-7 bg-slate-50 border border-slate-200/80 rounded-3xl p-8 shadow-xs">
                      <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">Full Name *</label>
                          <input type="text" required placeholder="Kshitij Pilankar" className="w-full bg-white border-b-2 border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none rounded-t-lg" />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                          <input type="email" required placeholder="kshitij@example.com" className="w-full bg-white border-b-2 border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none rounded-t-lg" />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">Message *</label>
                          <textarea rows={3} required placeholder="Tell me about your project goals..." className="w-full bg-white border-b-2 border-slate-200 p-3 text-sm text-slate-900 outline-none rounded-t-lg resize-none" />
                        </div>
                        <button type="submit" className="w-full bg-[#ff5100] text-white font-bold py-3.5 rounded-full text-sm shadow-md flex items-center justify-center gap-2">
                          <span>Submit Message</span>
                          <ArrowRight className="w-4 h-4 text-white" />
                        </button>
                      </form>
                    </div>
                  </div>
                </section>
              )}

              {/* 6. FooterSection */}
              {block.type === 'FooterBlock' && (
                <footer className="bg-slate-900 text-white py-12 px-8 font-sans">
                  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-8">
                    <div className="space-y-1 text-center md:text-left">
                      <h3 className="font-extrabold text-lg tracking-tight text-white">WebDev Portfolio</h3>
                      <p className="text-xs text-slate-400 font-normal max-w-sm">Architecting modern digital experiences with React 18 and Vite.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center"><Github className="w-4 h-4" /></a>
                      <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center"><Linkedin className="w-4 h-4" /></a>
                    </div>
                  </div>
                  <div className="max-w-6xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono">
                    <p>© 2026 WebDev Portfolio. All rights reserved.</p>
                    <p className="mt-2 sm:mt-0">Built with StackFolio AI Studio</p>
                  </div>
                </footer>
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
