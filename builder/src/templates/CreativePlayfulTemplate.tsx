import React from "react";
import { CanonicalPortfolio } from "../types/portfolio";
import { Mail, ExternalLink, Sparkles, Heart, Star, Code2, Zap } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/common/Icons";

export interface TemplateProps {
  portfolio: CanonicalPortfolio;
}

export default function CreativePlayfulTemplate({ portfolio }: TemplateProps) {
  const name = portfolio.full_name || "Creative Thinker";
  const headline = portfolio.headline || "Creative Technologist & UI Artisan";
  const bio = portfolio.bio || "Crafting vibrant digital experiences full of character, motion, and purpose.";

  return (
    <div className="min-h-screen bg-[#0c1017] text-slate-100 font-sans selection:bg-pink-500 selection:text-white relative overflow-hidden">
      {/* Playful Ambient Background */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-amber-500/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-20 relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-400 flex items-center justify-center font-black text-black text-sm">
              ✨
            </span>
            <span className="font-extrabold text-white text-lg tracking-tight">
              {name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {portfolio.email && (
              <a
                href={`mailto:${portfolio.email}`}
                className="px-4 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs shadow-lg shadow-pink-500/25 transition-all transform hover:scale-105"
              >
                Say Hello 👋
              </a>
            )}
          </div>
        </header>

        {/* Playful Hero */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold">
            <Sparkles className="h-3.5 w-3.5" /> Made with Passion & Code
          </div>

          <h1 className="text-4xl sm:text-7xl font-black tracking-tight text-white leading-tight">
            I craft <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400 bg-clip-text text-transparent">vibrant</span> software.
          </h1>

          <p className="text-xl sm:text-2xl text-pink-200/90 font-bold">
            {headline}
          </p>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {bio}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            {portfolio.github_url && (
              <a href={portfolio.github_url} target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-pink-500/50 text-white text-xs font-bold flex items-center gap-2 transition-all">
                <GithubIcon className="h-4 w-4" /> GitHub
              </a>
            )}
            {portfolio.linkedin_url && (
              <a href={portfolio.linkedin_url} target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-pink-500/50 text-white text-xs font-bold flex items-center gap-2 transition-all">
                <LinkedinIcon className="h-4 w-4" /> LinkedIn
              </a>
            )}
          </div>
        </section>

        {/* Skills Pills with Fun Badges */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-black text-white text-center flex items-center justify-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" /> Superpowers & Toolkit
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
              {portfolio.skills.map((skill, idx) => {
                const colors = [
                  "bg-pink-500/10 border-pink-500/30 text-pink-300",
                  "bg-purple-500/10 border-purple-500/30 text-purple-300",
                  "bg-yellow-500/10 border-yellow-500/30 text-yellow-300",
                  "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
                ];
                const colorClass = colors[idx % colors.length];
                return (
                  <span key={skill.id} className={`px-4 py-2 rounded-2xl border text-xs font-bold transition-all transform hover:-translate-y-1 ${colorClass}`}>
                    #{skill.name}
                  </span>
                );
              })}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-2xl font-black text-white text-center flex items-center justify-center gap-2">
              <Star className="h-6 w-6 text-pink-400" /> Notable Creations
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.projects.map((project) => (
                <div key={project.id} className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-pink-500/40 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-xl">
                  <div className="space-y-3">
                    {project.image_url ? (
                      <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                        <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                      </div>
                    ) : null}
                    <h3 className="text-lg font-black text-white">{project.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{project.description}</p>
                  </div>

                  <div className="pt-2 space-y-3">
                    {project.technologies && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-950 text-pink-300 border border-slate-800">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-4 text-xs font-bold pt-2 border-t border-slate-800">
                      {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noreferrer" className="text-pink-400 hover:underline flex items-center gap-1">
                          <ExternalLink className="h-3.5 w-3.5" /> Play Demo
                        </a>
                      )}
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white flex items-center gap-1 ml-auto">
                          <GithubIcon className="h-3.5 w-3.5" /> Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="text-center text-xs text-slate-500 pt-8 border-t border-slate-800 flex items-center justify-center gap-1">
          <span>Crafted with</span> <Heart className="h-3.5 w-3.5 text-pink-500 inline fill-pink-500" /> <span>by {name}.</span>
        </footer>
      </div>
    </div>
  );
}
