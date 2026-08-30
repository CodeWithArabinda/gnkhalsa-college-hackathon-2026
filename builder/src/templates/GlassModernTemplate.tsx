import React from "react";
import { CanonicalPortfolio } from "../types/portfolio";
import { Mail, ExternalLink, MapPin, Sparkles, Compass, Rocket, Award, GraduationCap } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/common/Icons";

export interface TemplateProps {
  portfolio: CanonicalPortfolio;
}

export default function GlassModernTemplate({ portfolio }: TemplateProps) {
  const name = portfolio.full_name || "Cosmic Explorer";
  const headline = portfolio.headline || "Digital Architect & Systems Creator";
  const bio = portfolio.bio || "Engineering cosmic web experiences and scalable intelligent software systems.";

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black relative overflow-hidden">
      {/* Dynamic Cosmic Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))] pointer-events-none" />
      <div className="fixed top-1/4 -left-40 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/60 border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center font-black text-slate-950 text-base shadow-lg shadow-cyan-500/20">
              {name.charAt(0).toUpperCase()}
            </div>
            <span className="font-extrabold text-white text-base tracking-tight">
              {name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {portfolio.email && (
              <a
                href={`mailto:${portfolio.email}`}
                className="px-4 py-2 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Mail className="h-3.5 w-3.5" /> Contact
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-cyan-400 text-xs font-medium backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            Next-Generation Portfolio
          </div>

          <h1 className="text-4xl sm:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Building the <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">Future</span> of Web
          </h1>

          <p className="text-xl sm:text-2xl text-cyan-200/90 font-medium">
            {headline}
          </p>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {bio}
          </p>

          {portfolio.location && (
            <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs">
              <MapPin className="h-3.5 w-3.5 text-cyan-400" />
              <span>{portfolio.location}</span>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {portfolio.github_url && (
              <a
                href={portfolio.github_url}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/10 backdrop-blur-md flex items-center gap-2 transition-all shadow-lg"
              >
                <GithubIcon className="h-4 w-4" /> GitHub
              </a>
            )}
            {portfolio.linkedin_url && (
              <a
                href={portfolio.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-200 font-semibold text-xs border border-cyan-500/30 backdrop-blur-md flex items-center gap-2 transition-all shadow-lg"
              >
                <LinkedinIcon className="h-4 w-4" /> LinkedIn
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Skills Matrix */}
      {portfolio.skills && portfolio.skills.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Compass className="h-5 w-5 text-cyan-400" /> Tech Capabilities
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {portfolio.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/40 text-slate-200 text-xs font-semibold transition-all flex items-center gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <span>{skill.name}</span>
                  {skill.level && <span className="text-[10px] text-cyan-400/70 font-mono">({skill.level})</span>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Grid */}
      {portfolio.projects && portfolio.projects.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white">Highlighted Creations</h2>
            <p className="text-xs text-slate-400 mt-1">A curated collection of impactful software systems</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.projects.map((project) => (
              <div
                key={project.id}
                className="group p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-xl"
              >
                <div className="space-y-4">
                  {project.image_url ? (
                    <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
                      <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  ) : null}

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-300/90 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="pt-6 space-y-4">
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-white/5 text-cyan-300 border border-white/5">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-3 border-t border-white/10 text-xs">
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold">
                        <ExternalLink className="h-3.5 w-3.5" /> Launch
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

      {/* Experience Section */}
      {portfolio.experiences && portfolio.experiences.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center gap-2">
            <Rocket className="h-5 w-5 text-cyan-400" /> Professional Track
          </h2>

          <div className="space-y-4">
            {portfolio.experiences.map((exp) => (
              <div key={exp.id} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-base font-bold text-white">{exp.role}</h3>
                  <span className="text-xs text-cyan-400 font-mono">{exp.start_date} — {exp.end_date}</span>
                </div>
                <p className="text-xs font-semibold text-cyan-300/80">{exp.company}</p>
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line pt-1">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950/80 py-10 text-center text-xs text-slate-400">
        <p>© {new Date().getFullYear()} {name}. Powered by FolioCraft Canvas Engine.</p>
      </footer>
    </div>
  );
}
