import React from 'react';
import { Github, Linkedin, Mail, MapPin, ExternalLink, ArrowUpRight } from 'lucide-react';

export default function MinimalEditorialTemplate({ portfolio }) {
  if (!portfolio) return null;

  const {
    full_name = 'Developer',
    headline = '',
    bio = '',
    profile_image_url = '',
    location = '',
    email = '',
    github_url = '',
    linkedin_url = '',
    experiences = [],
    education = [],
    projects = [],
    skills = [],
    achievements = []
  } = portfolio;

  return (
    <div className="min-h-screen bg-white text-[#111] antialiased">
      {/* Clean top accent line */}
      <div className="h-px bg-[#111]" />

      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 space-y-20">

        {/* Header */}
        <header className="space-y-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {profile_image_url && (
              <img src={profile_image_url} alt={full_name} className="w-20 h-20 rounded-full object-cover grayscale hover:grayscale-0 transition-all border border-[#E5E5E5] shrink-0" />
            )}
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight leading-tight text-[#111]">
                {full_name}
              </h1>
              <p className="text-base font-sans font-medium text-[#666] tracking-wide">{headline}</p>
            </div>
          </div>
          {bio && (
            <p className="text-sm text-[#555] leading-[1.8] max-w-2xl font-sans border-l-2 border-[#111] pl-4">
              {bio}
            </p>
          )}
          <div className="flex flex-wrap gap-4 text-xs text-[#999] font-sans">
            {location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {location}</span>}
            {email && <a href={`mailto:${email}`} className="flex items-center gap-1 hover:text-[#111] transition-colors"><Mail className="w-3 h-3" /> {email}</a>}
            {github_url && <a href={github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#111] transition-colors"><Github className="w-3 h-3" /> GitHub</a>}
            {linkedin_url && <a href={linkedin_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#111] transition-colors"><Linkedin className="w-3 h-3" /> LinkedIn</a>}
          </div>
          <div className="h-px bg-[#E5E5E5]" />
        </header>

        {/* Projects */}
        {projects.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#999]">Selected Work</h2>
            <div className="space-y-10">
              {projects.map((proj, idx) => (
                <article key={proj.id} className="group space-y-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-xl font-serif font-bold text-[#111]">{proj.title}</h3>
                    <div className="flex gap-2 shrink-0">
                      {proj.github_url && <a href={proj.github_url} target="_blank" rel="noreferrer" className="text-[#999] hover:text-[#111] transition-colors"><Github className="w-4 h-4" /></a>}
                      {proj.live_url && <a href={proj.live_url} target="_blank" rel="noreferrer" className="text-[#999] hover:text-[#111] transition-colors"><ArrowUpRight className="w-4 h-4" /></a>}
                    </div>
                  </div>
                  <p className="text-sm text-[#666] leading-relaxed font-sans">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {proj.technologies.map(t => (
                        <span key={t} className="text-[10px] font-sans font-medium text-[#999] border-b border-dashed border-[#CCC]">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  {proj.image_url && (
                    <div className="overflow-hidden rounded-sm border border-[#E5E5E5] mt-2">
                      <img src={proj.image_url} alt={proj.title} className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                  )}
                  {idx < projects.length - 1 && <div className="h-px bg-[#F0F0F0] mt-6" />}
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#999]">Expertise</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {skills.map((skill) => (
                <span key={skill.id} className="text-sm font-sans text-[#333]">
                  {skill.name}
                  {skill.level && <span className="text-[#BBB] text-xs ml-1">({skill.level})</span>}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#999]">Experience</h2>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="grid grid-cols-[auto_1fr] gap-x-6 items-baseline">
                  <div className="text-xs text-[#999] font-mono shrink-0 w-28">{exp.start_date}–{exp.end_date}</div>
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-[#111]">{exp.role}</div>
                    <div className="text-xs text-[#666]">{exp.company}</div>
                    {exp.description && <p className="text-xs text-[#888] leading-relaxed">{exp.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#999]">Education</h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="grid grid-cols-[auto_1fr] gap-x-6 items-baseline">
                  <div className="text-xs text-[#999] font-mono shrink-0 w-28">{edu.start_year}–{edu.end_year}</div>
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-[#111]">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                    <div className="text-xs text-[#666]">{edu.institution}</div>
                    {edu.description && <p className="text-xs text-[#888] leading-relaxed">{edu.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {achievements.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#999]">Certifications</h2>
            <div className="space-y-3">
              {achievements.map((ach) => (
                <div key={ach.id} className="flex items-baseline justify-between gap-4 text-sm">
                  <div>
                    <span className="text-[#111] font-medium">{ach.title}</span>
                    <span className="text-[#999] text-xs ml-2">{ach.issuer}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-[#CCC] font-mono">{ach.date}</span>
                    {ach.credential_url && (
                      <a href={ach.credential_url} target="_blank" rel="noreferrer" className="text-[#999] hover:text-[#111]">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="border-t border-[#E5E5E5] pt-8 text-center text-[10px] text-[#CCC] font-sans tracking-wider uppercase">
          {full_name} · Portfolio · {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}
