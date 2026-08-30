import React, { useState } from "react";
import { CanonicalPortfolio } from "../types/portfolio";
import { Mail, ExternalLink, MapPin, Terminal, Briefcase, GraduationCap, Award, Code, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/common/Icons";

export interface TemplateProps {
  portfolio: CanonicalPortfolio;
}

export default function DarkDeveloperTemplate({ portfolio }: TemplateProps) {
  const [activeTab, setActiveTab] = useState<"all" | string>("all");

  const name = portfolio.full_name || "Developer Portfolio";
  const headline = portfolio.headline || "Full-Stack Engineer & Builder";
  const bio = portfolio.bio || "Passionate engineer building scalable modern digital applications.";

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 font-mono selection:bg-purple-600 selection:text-white relative overflow-hidden">
      {/* Background Matrix Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f243815_1px,transparent_1px),linear-gradient(to_bottom,#1f243815_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#090a0f]/80 border-b border-slate-800/80 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-purple-600 to-emerald-400 flex items-center justify-center font-bold text-black text-sm">
              &gt;_
            </div>
            <span className="font-bold text-white tracking-wider text-sm sm:text-base">
              {name.toLowerCase().replace(/\s+/g, "_")}
            </span>
          </div>

          <nav className="flex items-center gap-4 text-xs">
            <a href="#about" className="text-slate-400 hover:text-purple-400 transition-colors hidden sm:inline">~/about</a>
            <a href="#skills" className="text-slate-400 hover:text-purple-400 transition-colors hidden sm:inline">~/skills</a>
            <a href="#projects" className="text-slate-400 hover:text-purple-400 transition-colors">~/projects</a>
            <a href="#experience" className="text-slate-400 hover:text-purple-400 transition-colors hidden sm:inline">~/experience</a>
            <a href="#contact" className="px-3 py-1.5 rounded-md bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600 hover:text-white transition-all">
              contact.sh
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="about" className="relative max-w-6xl mx-auto px-6 pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for high-impact projects
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Hey, I'm <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent">{name}</span>
            </h1>

            <p className="text-xl sm:text-2xl text-purple-300 font-semibold">
              {headline}
            </p>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
              {bio}
            </p>

            {portfolio.location && (
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span>{portfolio.location}</span>
              </div>
            )}

            {/* Social & Contact Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {portfolio.email && (
                <a
                  href={`mailto:${portfolio.email}`}
                  className="px-5 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-purple-600/30"
                >
                  <Mail className="h-4 w-4" />
                  Get In Touch
                </a>
              )}

              {portfolio.github_url && (
                <a
                  href={portfolio.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs flex items-center gap-2 transition-all"
                >
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </a>
              )}

              {portfolio.linkedin_url && (
                <a
                  href={portfolio.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs flex items-center gap-2 transition-all"
                >
                  <LinkedinIcon className="h-4 w-4" />
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          {/* Terminal / Avatar Showcase */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-sm rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl p-4 overflow-hidden backdrop-blur-xl">
              <div className="flex items-center gap-1.5 pb-3 border-b border-slate-800/80 mb-3">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] text-slate-500 ml-2 font-mono">user@terminal: ~</span>
              </div>

              {portfolio.profile_image_url ? (
                <div className="aspect-square w-full rounded-xl overflow-hidden mb-3 border border-slate-800">
                  <img src={portfolio.profile_image_url} alt={name} className="w-full h-full object-cover" />
                </div>
              ) : null}

              <div className="space-y-1.5 text-xs font-mono text-slate-400">
                <p className="text-purple-400">$ whoami</p>
                <p className="text-slate-200">❯ {name}</p>
                <p className="text-purple-400">$ echo $ROLE</p>
                <p className="text-slate-200">❯ {headline}</p>
                <p className="text-purple-400">$ status</p>
                <p className="text-emerald-400">❯ Ready to deploy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {portfolio.skills && portfolio.skills.length > 0 && (
        <section id="skills" className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-800/60">
          <div className="flex items-center gap-2 mb-8">
            <Code className="h-5 w-5 text-purple-400" />
            <h2 className="text-2xl font-bold text-white tracking-wide">~/tech_stack</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {portfolio.skills.map((skill) => (
              <div
                key={skill.id}
                className="group p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-200 group-hover:text-purple-300">{skill.name}</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono block">
                  {skill.level || "Expert"}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Projects Section */}
      {portfolio.projects && portfolio.projects.length > 0 && (
        <section id="projects" className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-800/60">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              <h2 className="text-2xl font-bold text-white tracking-wide">~/featured_projects</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.projects.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl bg-slate-900/80 border border-slate-800/80 overflow-hidden hover:border-purple-500/40 transition-all duration-300 flex flex-col group"
              >
                {project.image_url ? (
                  <div className="h-44 w-full overflow-hidden bg-slate-950">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-28 w-full bg-gradient-to-br from-purple-900/30 to-slate-950 flex items-center justify-center p-4 border-b border-slate-800/50">
                    <Terminal className="h-8 w-8 text-purple-400/50" />
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-3 font-sans leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded text-[10px] bg-slate-950 text-slate-300 border border-slate-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-3 pt-2 border-t border-slate-800/50 text-xs">
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                        >
                          <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-white flex items-center gap-1 ml-auto"
                        >
                          <GithubIcon className="h-3.5 w-3.5" /> Source
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience Timeline */}
      {portfolio.experiences && portfolio.experiences.length > 0 && (
        <section id="experience" className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-800/60">
          <div className="flex items-center gap-2 mb-8">
            <Briefcase className="h-5 w-5 text-purple-400" />
            <h2 className="text-2xl font-bold text-white tracking-wide">~/experience</h2>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
            {portfolio.experiences.map((exp) => (
              <div key={exp.id} className="relative pl-10">
                <div className="absolute left-2 top-1.5 h-3.5 w-3.5 rounded-full bg-purple-500 border-4 border-[#090a0f]" />
                <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-base font-bold text-white">{exp.role}</h3>
                    <span className="text-xs text-emerald-400 font-mono">{exp.start_date} — {exp.end_date}</span>
                  </div>
                  <p className="text-xs font-semibold text-purple-300">{exp.company}</p>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Achievements */}
      {((portfolio.education && portfolio.education.length > 0) || (portfolio.achievements && portfolio.achievements.length > 0)) && (
        <section className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-800/60 grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolio.education && portfolio.education.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-emerald-400" />
                <h2 className="text-xl font-bold text-white">~/education</h2>
              </div>
              <div className="space-y-3">
                {portfolio.education.map((edu) => (
                  <div key={edu.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                    <h3 className="text-sm font-bold text-white">{edu.degree} {edu.field ? `in ${edu.field}` : ""}</h3>
                    <p className="text-xs text-purple-300">{edu.institution}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{edu.start_year} — {edu.end_year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {portfolio.achievements && portfolio.achievements.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-400" />
                <h2 className="text-xl font-bold text-white">~/honors_awards</h2>
              </div>
              <div className="space-y-3">
                {portfolio.achievements.map((ach) => (
                  <div key={ach.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                    <h3 className="text-sm font-bold text-white">{ach.title}</h3>
                    {ach.issuer && <p className="text-xs text-yellow-300/80">{ach.issuer} ({ach.date})</p>}
                    {ach.description && <p className="text-xs text-slate-400 font-sans">{ach.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Footer */}
      <footer id="contact" className="border-t border-slate-800/80 bg-slate-950 px-6 py-12 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} {name}. Built with FolioCraft Resume-to-Portfolio Engine.</p>
      </footer>
    </div>
  );
}
