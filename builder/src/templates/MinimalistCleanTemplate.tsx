import React from "react";
import { CanonicalPortfolio } from "../types/portfolio";
import { Mail, ExternalLink, ArrowUpRight, MapPin } from "lucide-react";

export interface TemplateProps {
  portfolio: CanonicalPortfolio;
}

export default function MinimalistCleanTemplate({ portfolio }: TemplateProps) {
  const name = portfolio.full_name || "Minimalist Designer";
  const headline = portfolio.headline || "Designer & Developer";
  const bio = portfolio.bio || "Focused on clarity, typography, and simplicity in digital products.";

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
      <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24 space-y-24">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-zinc-200 pb-6">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900">{name}</h1>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">{headline}</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            {portfolio.github_url && (
              <a href={portfolio.github_url} target="_blank" rel="noreferrer" className="text-zinc-600 hover:text-zinc-950 underline underline-offset-4">
                GitHub
              </a>
            )}
            {portfolio.linkedin_url && (
              <a href={portfolio.linkedin_url} target="_blank" rel="noreferrer" className="text-zinc-600 hover:text-zinc-950 underline underline-offset-4">
                LinkedIn
              </a>
            )}
            {portfolio.email && (
              <a href={`mailto:${portfolio.email}`} className="text-zinc-900 font-semibold underline underline-offset-4">
                Email
              </a>
            )}
          </div>
        </header>

        {/* Bio Hero */}
        <section className="space-y-6">
          <p className="text-2xl sm:text-4xl font-normal leading-snug tracking-tight text-zinc-900">
            {bio}
          </p>
          {portfolio.location && (
            <p className="text-xs text-zinc-500 font-mono flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> Based in {portfolio.location}
            </p>
          )}
        </section>

        {/* Projects Section */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 border-b border-zinc-200 pb-2">
              Selected Works
            </h2>

            <div className="space-y-12">
              {portfolio.projects.map((project) => (
                <div key={project.id} className="group grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
                  <div className="md:col-span-4">
                    <h3 className="text-base font-bold text-zinc-900 group-hover:text-emerald-700 transition-colors flex items-center gap-1">
                      {project.title}
                      {project.live_url && <ArrowUpRight className="h-4 w-4 inline opacity-60" />}
                    </h3>
                    {project.technologies && project.technologies.length > 0 && (
                      <p className="text-[11px] font-mono text-zinc-500 mt-1">
                        {project.technologies.join(" · ")}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-8 space-y-2">
                    <p className="text-sm text-zinc-700 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs font-mono pt-1">
                      {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noreferrer" className="text-zinc-900 underline font-semibold">
                          View Project
                        </a>
                      )}
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-zinc-900">
                          Source Code
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
          <section className="space-y-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 border-b border-zinc-200 pb-2">
              Work History
            </h2>

            <div className="space-y-8">
              {portfolio.experiences.map((exp) => (
                <div key={exp.id} className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-4 font-mono text-xs text-zinc-500">
                    <p className="font-bold text-zinc-900 font-sans text-sm">{exp.role}</p>
                    <p className="text-zinc-600 mt-0.5">{exp.company}</p>
                    <p className="text-zinc-400 mt-1">{exp.start_date} — {exp.end_date}</p>
                  </div>

                  <div className="md:col-span-8">
                    <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 border-b border-zinc-200 pb-2">
              Core Stack
            </h2>
            <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs text-zinc-700">
              {portfolio.skills.map((skill) => (
                <span key={skill.id} className="px-3 py-1 bg-zinc-100 rounded-md border border-zinc-200">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="border-t border-zinc-200 pt-8 text-center text-xs text-zinc-400 font-mono">
          <p>© {new Date().getFullYear()} {name}.</p>
        </footer>
      </div>
    </div>
  );
}
