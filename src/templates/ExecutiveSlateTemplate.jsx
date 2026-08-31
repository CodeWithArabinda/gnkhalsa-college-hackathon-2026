import React from 'react';
import {
  Briefcase, GraduationCap, Github, Linkedin, Mail, MapPin, ExternalLink, Cpu, Terminal, Award, ChevronRight
} from 'lucide-react';

/**
 * Normalizes portfolio data to guarantee fallbacks and non-mutative derived data.
 */
export function normalizePortfolioData(portfolio) {
  if (!portfolio) return {};
  const profile = portfolio.profile || portfolio || {};

  const full_name = portfolio.full_name || profile.full_name || 'Executive Professional';
  const headline = portfolio.headline || profile.headline || 'Senior Software Engineering Leader';
  const bio = portfolio.bio || profile.bio || '';
  const profile_image_url = portfolio.profile_image_url || profile.profile_image_url || profile.avatar_url || '';
  const location = portfolio.location || profile.location || '';
  const email = portfolio.email || profile.email || '';
  const github_url = portfolio.github_url || profile.github_url || '';
  const linkedin_url = portfolio.linkedin_url || profile.linkedin_url || '';

  const rawProjects = Array.isArray(portfolio.projects) ? portfolio.projects : (Array.isArray(profile.projects) ? profile.projects : []);
  const rawSkills = Array.isArray(portfolio.skills) ? portfolio.skills : (Array.isArray(profile.skills) ? profile.skills : []);
  const rawExperiences = Array.isArray(portfolio.experiences) ? portfolio.experiences : (Array.isArray(profile.experiences) ? profile.experiences : []);
  const rawEducation = Array.isArray(portfolio.education) ? portfolio.education : (Array.isArray(profile.education) ? profile.education : []);
  const rawAchievements = Array.isArray(portfolio.achievements) ? portfolio.achievements : (Array.isArray(profile.achievements) ? profile.achievements : []);
  const blocks = Array.isArray(portfolio.blocks) ? portfolio.blocks : (Array.isArray(profile.blocks) ? profile.blocks : []);

  return {
    full_name,
    headline,
    bio,
    profile_image_url,
    location,
    email,
    github_url,
    linkedin_url,
    projects: rawProjects.filter(Boolean),
    skills: rawSkills.filter(Boolean),
    experiences: rawExperiences.filter(Boolean),
    education: rawEducation.filter(Boolean),
    achievements: rawAchievements.filter(Boolean),
    blocks
  };
}

export default function ExecutiveSlateTemplate({ portfolio, viewMode = 'desktop' }) {
  const data = normalizePortfolioData(portfolio);
  const {
    full_name, headline, bio, profile_image_url, location, email, github_url, linkedin_url,
    projects, skills, experiences, education, achievements, blocks
  } = data;

  // Default section order when schema.blocks is not provided
  const defaultSections = [
    'hero',
    'experience',
    'projects',
    'skills',
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

  // Deduplicate sections while keeping user order
  const uniqueSections = Array.from(new Set(activeSections));

  const renderSection = (sectionKey) => {
    switch (sectionKey) {
      case 'hero':
        return (
          <section key="hero" className="bg-[#1E293B]/80 border-2 border-slate-700/60 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm space-y-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {profile_image_url && (
                <div className="w-32 h-32 md:w-36 md:h-36 shrink-0 rounded-2xl overflow-hidden border-2 border-blue-400/40 shadow-lg bg-slate-900">
                  <img src={profile_image_url} alt={full_name} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="space-y-4 text-center md:text-left flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-400/30 rounded-full text-blue-400 text-xs font-mono font-semibold">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" /> Executive Portfolio
                </div>
                <h1 className="text-4xl sm:text-5xl font-heading font-black tracking-tight text-slate-100">
                  {full_name}
                </h1>
                <p className="text-xl font-sans font-semibold text-blue-400">
                  {headline}
                </p>
                {bio && (
                  <p className="text-sm font-sans text-slate-300 leading-relaxed max-w-3xl">
                    {bio}
                  </p>
                )}
              </div>
            </div>

            {/* Meta bar */}
            <div className="border-t border-slate-700/60 pt-4 flex flex-wrap gap-3 justify-center md:justify-start text-xs font-mono">
              {location && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/60 rounded-lg border border-slate-700 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" /> {location}
                </span>
              )}
              {email && (
                <a href={`mailto:${email}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/60 rounded-lg border border-slate-700 text-slate-300 hover:border-blue-400 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-blue-400" /> {email}
                </a>
              )}
              {github_url && (
                <a href={github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/60 rounded-lg border border-slate-700 text-slate-300 hover:border-blue-400 transition-colors">
                  <Github className="w-3.5 h-3.5 text-blue-400" /> GitHub
                </a>
              )}
              {linkedin_url && (
                <a href={linkedin_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/60 rounded-lg border border-slate-700 text-slate-300 hover:border-blue-400 transition-colors">
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" /> LinkedIn
                </a>
              )}
            </div>
          </section>
        );

      case 'experience':
        if (experiences.length === 0) return null;
        return (
          <section key="experience" className="space-y-4">
            <h2 className="text-xl font-heading font-extrabold text-slate-100 flex items-center gap-2.5">
              <Briefcase className="w-5 h-5 text-blue-400" /> Professional Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp, idx) => {
                const role = exp.role || exp.title || 'Role';
                const company = exp.company || exp.organization || '';
                const period = exp.period || (exp.start_date ? `${exp.start_date} - ${exp.end_date || 'Present'}` : '');
                const desc = exp.description || '';

                return (
                  <div key={exp.id || idx} className="bg-[#1E293B]/70 border border-slate-700/70 p-6 rounded-xl hover:border-blue-400/50 transition-all space-y-2">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div>
                        <h3 className="font-heading font-bold text-base text-slate-100">{role}</h3>
                        {company && <p className="text-xs font-mono text-blue-400 font-semibold">{company}</p>}
                      </div>
                      {period && (
                        <span className="text-[11px] font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-700">
                          {period}
                        </span>
                      )}
                    </div>
                    {desc && <p className="text-xs text-slate-300 font-sans leading-relaxed pt-1">{desc}</p>}
                  </div>
                );
              })}
            </div>
          </section>
        );

      case 'projects':
        if (projects.length === 0) return null;
        return (
          <section key="projects" className="space-y-4">
            <h2 className="text-xl font-heading font-extrabold text-slate-100 flex items-center gap-2.5">
              <Cpu className="w-5 h-5 text-blue-400" /> Featured Leadership Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj, idx) => {
                const title = proj.title || proj.name || 'Project';
                const desc = proj.description || '';
                const techs = Array.isArray(proj.technologies) ? proj.technologies : [];
                const liveUrl = proj.live_url || proj.demoUrl || '';
                const githubUrl = proj.github_url || proj.githubUrl || '';

                return (
                  <div key={proj.id || idx} className="bg-[#1E293B]/70 border border-slate-700/70 rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-blue-400/50 transition-all">
                    <div className="space-y-2">
                      <h3 className="font-heading font-extrabold text-base text-slate-100">{title}</h3>
                      {desc && <p className="text-xs text-slate-300 font-sans leading-relaxed">{desc}</p>}
                    </div>

                    <div className="space-y-3 pt-2">
                      {techs.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {techs.map((t) => (
                            <span key={t} className="px-2 py-0.5 bg-slate-900/80 text-blue-400 font-mono text-[10px] rounded border border-blue-400/20">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-3 text-xs font-mono pt-2 border-t border-slate-700/50">
                        {githubUrl && (
                          <a href={githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-slate-300 hover:text-blue-400">
                            <Github className="w-3.5 h-3.5" /> Source
                          </a>
                        )}
                        {liveUrl && (
                          <a href={liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-400 hover:underline">
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
            <h2 className="text-xl font-heading font-extrabold text-slate-100 flex items-center gap-2.5">
              <Terminal className="w-5 h-5 text-blue-400" /> Core Competencies
            </h2>
            <div className="bg-[#1E293B]/70 border border-slate-700/70 p-6 rounded-xl flex flex-wrap gap-2.5">
              {skills.map((skill, idx) => {
                const name = typeof skill === 'string' ? skill : (skill.name || skill.label || '');
                const level = typeof skill === 'object' ? skill.level : null;
                if (!name) return null;

                return (
                  <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 border border-slate-700 rounded-lg text-xs font-mono text-slate-200">
                    <ChevronRight className="w-3 h-3 text-blue-400" />
                    <span>{name}</span>
                    {level && (
                      <span className="text-[9px] px-1.5 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded uppercase font-bold">
                        {level}
                      </span>
                    )}
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
            <h2 className="text-xl font-heading font-extrabold text-slate-100 flex items-center gap-2.5">
              <GraduationCap className="w-5 h-5 text-blue-400" /> Education & Credentials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {education.map((edu, idx) => {
                const school = edu.institution || edu.school || '';
                const degree = edu.degree || '';
                const field = edu.field || '';
                const period = edu.period || (edu.start_year ? `${edu.start_year} - ${edu.end_year || 'Present'}` : '');

                return (
                  <div key={idx} className="bg-[#1E293B]/70 border border-slate-700/70 p-5 rounded-xl space-y-1">
                    <h3 className="font-heading font-bold text-sm text-slate-100">{school}</h3>
                    <p className="text-xs font-mono text-blue-400">{degree} {field && `| ${field}`}</p>
                    {period && <p className="text-[10px] font-mono text-slate-400">{period}</p>}
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
            <h2 className="text-xl font-heading font-extrabold text-slate-100 flex items-center gap-2.5">
              <Award className="w-5 h-5 text-blue-400" /> Honors & Awards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((ach, idx) => (
                <div key={idx} className="bg-[#1E293B]/70 border border-slate-700/70 p-4 rounded-xl space-y-1">
                  <h3 className="font-heading font-bold text-xs text-slate-100">{ach.title}</h3>
                  {ach.issuer && <p className="text-[11px] font-mono text-blue-400">{ach.issuer}</p>}
                  {ach.description && <p className="text-[11px] text-slate-300">{ach.description}</p>}
                </div>
              ))}
            </div>
          </section>
        );

      case 'contact':
        return (
          <section key="contact" className="bg-gradient-to-r from-blue-900/30 via-slate-900 to-slate-900 border border-blue-500/30 p-8 rounded-2xl text-center space-y-4">
            <h2 className="text-2xl font-heading font-black text-slate-100">Let's Connect</h2>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Interested in strategic technology consultation, engineering leadership, or advisory roles?
            </p>
            {email && (
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-heading font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20"
              >
                <Mail className="w-4 h-4" /> Reach Out via Email
              </a>
            )}
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans p-6 sm:p-12 antialiased">
      <div className="max-w-4xl mx-auto space-y-10">
        {uniqueSections.map(renderSection)}
      </div>
    </div>
  );
}
