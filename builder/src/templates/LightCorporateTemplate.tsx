import React from "react";
import { CanonicalPortfolio } from "../types/portfolio";
import { Mail, ExternalLink, MapPin, Building, Award, GraduationCap, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/common/Icons";

export interface TemplateProps {
  portfolio: CanonicalPortfolio;
}

export default function LightCorporateTemplate({ portfolio }: TemplateProps) {
  const name = portfolio.full_name || "Executive Professional";
  const headline = portfolio.headline || "Engineering Executive & Solutions Director";
  const bio = portfolio.bio || "Leading engineering organizations to deliver mission-critical software and digital transformations.";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white text-xs py-2 px-6 text-center font-medium">
        Executive Portfolio & Technical Leadership Dossier
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* Header Profile Section */}
        <header className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-200">
              Verified Dossier
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              {name}
            </h1>
            <p className="text-lg sm:text-xl text-blue-600 font-semibold">
              {headline}
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              {bio}
            </p>
            {portfolio.location && (
              <p className="text-xs text-slate-500 flex items-center justify-center md:justify-start gap-1">
                <MapPin className="h-3.5 w-3.5 text-blue-500" /> {portfolio.location}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 min-w-[200px] w-full md:w-auto">
            {portfolio.email && (
              <a
                href={`mailto:${portfolio.email}`}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all"
              >
                <Mail className="h-4 w-4" /> Contact Directly
              </a>
            )}
            {portfolio.linkedin_url && (
              <a
                href={portfolio.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs text-center flex items-center justify-center gap-2 transition-all border border-slate-200"
              >
                <LinkedinIcon className="h-4 w-4 text-blue-600" /> LinkedIn Profile
              </a>
            )}
            {portfolio.github_url && (
              <a
                href={portfolio.github_url}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs text-center flex items-center justify-center gap-2 transition-all border border-slate-200"
              >
                <GithubIcon className="h-4 w-4 text-slate-800" /> GitHub Repository
              </a>
            )}
          </div>
        </header>

        {/* Skills Section */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600" /> Core Competencies & Skills
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {portfolio.skills.map((skill) => (
                <div key={skill.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                  <p className="text-xs font-bold text-slate-800">{skill.name}</p>
                  <p className="text-[10px] text-blue-600 font-medium">{skill.level || "Proficient"}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Featured Key Initiatives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.projects.map((project) => (
                <div key={project.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900">{project.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{project.description}</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {project.technologies && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((t) => (
                          <span key={t} className="px-2.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 border border-slate-200">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-4 text-xs font-semibold pt-2 border-t border-slate-100">
                      {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                          <ExternalLink className="h-3.5 w-3.5" /> Launch Live Case
                        </a>
                      )}
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900 flex items-center gap-1 ml-auto">
                          <GithubIcon className="h-3.5 w-3.5" /> Code Repo
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
          <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Building className="h-5 w-5 text-blue-600" /> Career Milestones
            </h2>
            <div className="space-y-6 divide-y divide-slate-100">
              {portfolio.experiences.map((exp) => (
                <div key={exp.id} className="pt-4 first:pt-0 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-base font-bold text-slate-900">{exp.role}</h3>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">{exp.start_date} — {exp.end_date}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700">{exp.company}</p>
                  <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="text-center text-xs text-slate-400 py-6 border-t border-slate-200">
          <p>© {new Date().getFullYear()} {name}. Enterprise Profile Architecture.</p>
        </footer>
      </div>
    </div>
  );
}
