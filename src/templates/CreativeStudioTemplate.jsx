import React from 'react';
import {
  Sparkles, Layers, Briefcase, GraduationCap, Github, Linkedin, Mail, MapPin, ExternalLink, Cpu, Terminal, Award
} from 'lucide-react';
import { normalizePortfolioData } from './ExecutiveSlateTemplate';

export default function CreativeStudioTemplate({ portfolio, viewMode = 'desktop' }) {
  const data = normalizePortfolioData(portfolio);
  const {
    full_name, headline, bio, profile_image_url, location, email, github_url, linkedin_url,
    projects, skills, experiences, education, achievements, blocks
  } = data;

  // Default section order when schema.blocks is not provided
  const defaultSections = [
    'hero',
    'projects',
    'skills',
    'experience',
    'education',
    'achievements',
    'contact'
  ];

  // Map block types to section keys if blocks array exists
  const activeSections = (blocks && blocks.length > 0)
    ? blocks.map(b => {
        if (b.type === 'HeroBlock') return 'hero';
        if (b.type === 'ProjectGridBlock') return 'projects';
        if (b.type === 'SkillsBlock' || b.type === 'PillarsBlock') return 'skills';
        if (b.type === 'StoryBlock') return 'experience';
        if (b.type === 'EducationBlock') return 'education';
        if (b.type === 'ContactBlock') return 'contact';
        return null;
      }).filter(Boolean)
    : defaultSections;

  const uniqueSections = Array.from(new Set(activeSections));

  const renderSection = (sectionKey) => {
    switch (sectionKey) {
      case 'hero':
        return (
          <section key="hero" className="relative bg-gradient-to-br from-purple-950/40 via-[#0D0B18] to-[#0A0A0F] border-2 border-purple-500/30 rounded-3xl p-8 sm:p-12 overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.15)] space-y-8">
            <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
              {profile_image_url && (
                <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-3xl overflow-hidden border-2 border-purple-400/50 shadow-[0_0_25px_rgba(168,85,247,0.3)] bg-purple-950">
                  <img src={profile_image_url} alt={full_name} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="space-y-4 text-center md:text-left flex-1">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-purple-500/15 border border-purple-400/40 rounded-full text-purple-300 text-xs font-mono font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Creative Studio & Portfolio
                </div>
                <h1 className="text-4xl sm:text-6xl font-heading font-black tracking-tight text-white">
                  {full_name}
                </h1>
                <p className="text-xl sm:text-2xl font-sans font-extrabold bg-gradient-to-r from-purple-300 via-pink-300 to-amber-300 bg-clip-text text-transparent">
                  {headline}
                </p>
                {bio && (
                  <p className="text-sm font-sans text-purple-100/80 leading-relaxed max-w-3xl">
                    {bio}
                  </p>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div className="border-t border-purple-500/20 pt-6 flex flex-wrap gap-3 justify-center md:justify-start text-xs font-mono relative z-10">
              {location && (
                <span className="flex items-center gap-1.5 px-3.5 py-2 bg-purple-950/50 rounded-xl border border-purple-500/30 text-purple-200">
                  <MapPin className="w-3.5 h-3.5 text-purple-400" /> {location}
                </span>
              )}
              {email && (
                <a href={`mailto:${email}`} className="flex items-center gap-1.5 px-3.5 py-2 bg-purple-950/50 rounded-xl border border-purple-500/30 text-purple-200 hover:border-purple-400 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-purple-400" /> {email}
                </a>
              )}
              {github_url && (
                <a href={github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3.5 py-2 bg-purple-950/50 rounded-xl border border-purple-500/30 text-purple-200 hover:border-purple-400 transition-colors">
                  <Github className="w-3.5 h-3.5 text-purple-400" /> GitHub
                </a>
              )}
              {linkedin_url && (
                <a href={linkedin_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3.5 py-2 bg-purple-950/50 rounded-xl border border-purple-500/30 text-purple-200 hover:border-purple-400 transition-colors">
                  <Linkedin className="w-3.5 h-3.5 text-purple-400" /> LinkedIn
                </a>
              )}
            </div>
          </section>
        );

      case 'projects':
        if (projects.length === 0) return null;
        return (
          <section key="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-heading font-extrabold text-white flex items-center gap-3">
                <Layers className="w-6 h-6 text-purple-400" /> Selected Works & Showcases
              </h2>
              <span className="text-xs font-mono font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                {projects.length} PROJECTS
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj, idx) => {
                const title = proj.title || proj.name || 'Project';
                const desc = proj.description || '';
                const techs = Array.isArray(proj.technologies) ? proj.technologies : [];
                const liveUrl = proj.live_url || proj.demoUrl || '';
                const githubUrl = proj.github_url || proj.githubUrl || '';

                return (
                  <div key={proj.id || idx} className="group bg-[#120F24]/80 border border-purple-500/20 hover:border-purple-400/60 rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(168,85,247,0.2)]">
                    <div className="space-y-2">
                      <h3 className="font-heading font-black text-lg text-white group-hover:text-purple-300 transition-colors">{title}</h3>
                      {desc && <p className="text-xs text-purple-100/70 font-sans leading-relaxed">{desc}</p>}
                    </div>

                    <div className="space-y-4 pt-2">
                      {techs.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {techs.map((t) => (
                            <span key={t} className="px-2.5 py-1 bg-purple-950/80 text-purple-300 font-mono text-[10px] rounded-lg border border-purple-500/30 font-bold">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-xs font-mono pt-3 border-t border-purple-500/20">
                        {githubUrl && (
                          <a href={githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-purple-200 hover:text-purple-400">
                            <Github className="w-3.5 h-3.5" /> Source
                          </a>
                        )}
                        {liveUrl && (
                          <a href={liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-amber-300 hover:underline font-bold">
                            <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );

      case 'skills':
        if (skills.length === 0) return null;
        return (
          <section key="skills" className="space-y-4">
            <h2 className="text-2xl font-heading font-extrabold text-white flex items-center gap-3">
              <Cpu className="w-6 h-6 text-purple-400" /> Core Tech Stack & Tools
            </h2>
            <div className="bg-[#120F24]/80 border border-purple-500/20 p-6 rounded-2xl flex flex-wrap gap-2.5">
              {skills.map((skill, idx) => {
                const name = typeof skill === 'string' ? skill : (skill.name || skill.label || '');
                const level = typeof skill === 'object' ? skill.level : null;
                if (!name) return null;

                return (
                  <div key={idx} className="flex items-center gap-2 px-3.5 py-2 bg-purple-950/60 border border-purple-500/30 rounded-xl text-xs font-mono text-purple-100 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span>{name}</span>
                    {level && (
                      <span className="text-[9px] px-1.5 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded uppercase font-bold">
                        {level}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );

      case 'experience':
        if (experiences.length === 0) return null;
        return (
          <section key="experience" className="space-y-4">
            <h2 className="text-2xl font-heading font-extrabold text-white flex items-center gap-3">
              <Briefcase className="w-6 h-6 text-purple-400" /> Career Journey
            </h2>
            <div className="space-y-4">
              {experiences.map((exp, idx) => {
                const role = exp.role || exp.title || 'Role';
                const company = exp.company || exp.organization || '';
                const period = exp.period || (exp.start_date ? `${exp.start_date} - ${exp.end_date || 'Present'}` : '');
                const desc = exp.description || '';

                return (
                  <div key={exp.id || idx} className="bg-[#120F24]/80 border border-purple-500/20 p-6 rounded-2xl space-y-2 hover:border-purple-400/50 transition-all">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div>
                        <h3 className="font-heading font-bold text-base text-white">{role}</h3>
                        {company && <p className="text-xs font-mono text-purple-400 font-semibold">{company}</p>}
                      </div>
                      {period && (
                        <span className="text-[11px] font-mono text-purple-300 bg-purple-950/80 px-3 py-1 rounded-full border border-purple-500/30">
                          {period}
                        </span>
                      )}
                    </div>
                    {desc && <p className="text-xs text-purple-100/70 font-sans leading-relaxed pt-1">{desc}</p>}
                  </div>
                );
              })}
            </div>
          </section>
        );

      case 'education':
        if (education.length === 0) return null;
        return (
          <section key="education" className="space-y-4">
            <h2 className="text-2xl font-heading font-extrabold text-white flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-purple-400" /> Academic Foundation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {education.map((edu, idx) => {
                const school = edu.institution || edu.school || '';
                const degree = edu.degree || '';
                const field = edu.field || '';
                const period = edu.period || (edu.start_year ? `${edu.start_year} - ${edu.end_year || 'Present'}` : '');

                return (
                  <div key={idx} className="bg-[#120F24]/80 border border-purple-500/20 p-5 rounded-2xl space-y-1">
                    <h3 className="font-heading font-bold text-sm text-white">{school}</h3>
                    <p className="text-xs font-mono text-purple-300">{degree} {field && `| ${field}`}</p>
                    {period && <p className="text-[10px] font-mono text-purple-200/60">{period}</p>}
                  </div>
                );
              })}
            </div>
          </section>
        );

      case 'achievements':
        if (achievements.length === 0) return null;
        return (
          <section key="achievements" className="space-y-4">
            <h2 className="text-2xl font-heading font-extrabold text-white flex items-center gap-3">
              <Award className="w-6 h-6 text-purple-400" /> Recognition & Badges
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((ach, idx) => (
                <div key={idx} className="bg-[#120F24]/80 border border-purple-500/20 p-5 rounded-2xl space-y-1">
                  <h3 className="font-heading font-bold text-xs text-white">{ach.title}</h3>
                  {ach.issuer && <p className="text-[11px] font-mono text-purple-300">{ach.issuer}</p>}
                  {ach.description && <p className="text-[11px] text-purple-100/70">{ach.description}</p>}
                </div>
              ))}
            </div>
          </section>
        );

      case 'contact':
        return (
          <section key="contact" className="bg-gradient-to-tr from-purple-900/40 via-purple-950/60 to-[#120F24] border-2 border-purple-500/40 p-10 rounded-3xl text-center space-y-4 shadow-[0_0_40px_rgba(168,85,247,0.2)]">
            <h2 className="text-3xl font-heading font-black text-white">Let's Collaborate</h2>
            <p className="text-xs text-purple-200/80 max-w-md mx-auto">
              Have a high-impact project, creative product idea, or engineering leadership opportunity?
            </p>
            {email && (
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-heading font-bold text-xs px-8 py-3.5 rounded-full transition-all shadow-xl shadow-purple-500/30"
              >
                <Mail className="w-4 h-4" /> Send Email Inquiry
              </a>
            )}
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-purple-100 font-sans p-6 sm:p-12 antialiased">
      <div className="max-w-4xl mx-auto space-y-12">
        {uniqueSections.map(renderSection)}
      </div>
    </div>
  );
}
