import React from 'react';
import { Github, Linkedin, Mail, MapPin, ExternalLink, GraduationCap, Briefcase, Award, Star, Compass } from 'lucide-react';

export default function LightCorporateTemplate({ portfolio }) {
  if (!portfolio) return null;

  const {
    full_name = 'Anonymous Professional',
    headline = 'Corporate Analyst & Leader',
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

  // Background arrays for sticker pills
  const badgeColors = [
    'bg-[#4DEEEA]', // Cyan
    'bg-[#FF70A6]', // Bubblegum Pink
    'bg-[#A8FF78]', // Neon Mint
    'bg-[#FFE600]', // Yellow
    'bg-[#FFAA00]', // Amber Gold
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#0F172A] font-sans antialiased p-6 sm:p-12 border-t-8 border-black">
      <div className="max-w-4xl mx-auto space-y-16">

        {/* HERO HEADER SECTION */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-3 border-black bg-white p-6 md:p-8 rounded-2xl shadow-brutal animate-fadeIn">
          {profile_image_url && (
            <div className="w-32 h-32 md:w-36 md:h-36 shrink-0 rounded-2xl overflow-hidden border-3 border-black shadow-brutal bg-[#FFE600]">
              <img src={profile_image_url} alt={full_name} className="w-full h-full object-cover" />
            </div>
          )}
          
          <div className="space-y-4 text-center md:text-left flex-1">
            {/* Tag Sticker */}
            <div className="inline-block bg-[#FF70A6] text-black font-extrabold px-3 py-1 border-2 border-black rounded-full text-xs uppercase rotate-[-2deg] shadow-[2px_2px_0px_0px_#000]">
              ★ Portfolio Spotlight
            </div>

            <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tight leading-none text-[#0F172A]">
              {full_name}
            </h1>
            <p className="text-lg md:text-xl font-heading font-bold text-brand-light-primary">
              {headline}
            </p>
            <p className="text-sm font-medium text-slate-700 leading-relaxed max-w-2xl">
              {bio}
            </p>

            {/* Social Links as Stickers */}
            <div className="flex flex-wrap gap-2.5 justify-center md:justify-start pt-2 font-mono">
              {location && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border-2 border-black rounded-md text-xs font-bold shadow-[2px_2px_0px_0px_#000]">
                  <MapPin className="w-3.5 h-3.5" /> {location}
                </span>
              )}
              {email && (
                <a href={`mailto:${email}`} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFE600] border-2 border-black rounded-md text-xs font-bold shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] transition-all">
                  <Mail className="w-3.5 h-3.5" /> {email}
                </a>
              )}
              {github_url && (
                <a href={github_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#4DEEEA] border-2 border-black rounded-md text-xs font-bold shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] transition-all">
                  <Github className="w-3.5 h-3.5" /> GitHub
                </a>
              )}
              {linkedin_url && (
                <a href={linkedin_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#A8FF78] border-2 border-black rounded-md text-xs font-bold shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] transition-all">
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>

        {/* PROJECTS SECTION */}
        {projects.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-heading font-black text-black inline-block bg-[#FFE600] px-4 py-1.5 border-3 border-black shadow-brutal rotate-[-1deg]">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              {projects.map((proj, idx) => (
                <div key={proj.id} className="bg-white border-3 border-black rounded-2xl overflow-hidden shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all flex flex-col">
                  {proj.image_url && (
                    <div className="h-48 overflow-hidden border-b-3 border-black relative">
                      <img src={proj.image_url} alt={proj.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-heading font-extrabold text-[#0F172A]">{proj.title}</h3>
                      <p className="text-xs font-medium text-slate-600 leading-relaxed">{proj.description}</p>
                    </div>

                    <div className="space-y-4">
                      {/* Tech stack badges */}
                      {proj.technologies && proj.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {proj.technologies.map((tech, tIdx) => {
                            const color = badgeColors[(tIdx + idx) % badgeColors.length];
                            return (
                              <span key={tech} className={`px-2 py-0.5 border-2 border-black text-xs font-mono font-bold text-black rounded ${color}`}>
                                {tech}
                              </span>
                            );
                          })}
                        </div>
                      )}

                      {/* Links */}
                      <div className="flex items-center gap-4 text-xs font-bold pt-3 border-t-2 border-black">
                        {proj.github_url && (
                          <a href={proj.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-slate-800 hover:text-black">
                            <Github className="w-4 h-4" /> Code Repository
                          </a>
                        )}
                        {proj.live_url && (
                          <a href={proj.live_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                            <ExternalLink className="w-4 h-4" /> Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SKILLS SECTION */}
        {skills.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-heading font-black text-black inline-block bg-[#4DEEEA] px-4 py-1.5 border-3 border-black shadow-brutal rotate-[1deg]">
              Skills & Expertise
            </h2>
            <div className="bg-white border-3 border-black p-6 rounded-2xl shadow-brutal flex flex-wrap gap-3.5">
              {skills.map((skill, idx) => {
                const color = badgeColors[idx % badgeColors.length];
                return (
                  <div key={skill.id} className={`flex items-center space-x-2 px-3 py-1.5 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000] ${color}`}>
                    <span className="text-xs font-bold text-black">{skill.name}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 bg-white text-black border border-black rounded uppercase font-bold">
                      {skill.level}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* EXPERIENCE & EDUCATION SPLIT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Work Experiences */}
          {experiences.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-heading font-black text-black inline-block bg-[#A8FF78] px-3.5 py-1.5 border-3 border-black shadow-brutal rotate-[-2deg]">
                Experience
              </h2>
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id} className="bg-white border-3 border-black p-6 rounded-2xl shadow-brutal space-y-3">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <h3 className="font-heading font-black text-base text-[#0F172A]">{exp.company}</h3>
                      <span className="text-[10px] font-mono font-bold bg-[#FFE600] px-2 py-0.5 border-2 border-black rounded">
                        {exp.start_date} - {exp.end_date}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-600 flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5" /> {exp.role}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-heading font-black text-black inline-block bg-[#FF70A6] px-3.5 py-1.5 border-3 border-black shadow-brutal rotate-[2deg]">
                Education
              </h2>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-white border-3 border-black p-6 rounded-2xl shadow-brutal space-y-3">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <h3 className="font-heading font-black text-base text-[#0F172A]">{edu.institution}</h3>
                      <span className="text-[10px] font-mono font-bold bg-[#FFE600] px-2 py-0.5 border-2 border-black rounded">
                        {edu.start_year} - {edu.end_year}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-600 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5" /> {edu.degree}
                    </div>
                    {edu.field && <div className="text-[11px] font-bold text-slate-500 font-mono">Field: {edu.field}</div>}
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ACHIEVEMENTS */}
        {achievements.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-heading font-black text-black inline-block bg-[#FFAA00] px-4 py-1.5 border-3 border-black shadow-brutal rotate-[-1deg]">
              Certificates & Honors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {achievements.map((ach) => (
                <div key={ach.id} className="bg-white border-3 border-black p-6 rounded-2xl shadow-brutal flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-[#FFE600] border-2 border-black flex items-center justify-center text-black font-black text-base shrink-0 shadow-[2px_2px_0px_0px_#000]">
                    ★
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex justify-between items-start flex-wrap gap-1">
                      <h3 className="font-heading font-extrabold text-sm text-[#0F172A]">{ach.title}</h3>
                      <span className="text-[10px] font-mono font-bold text-slate-500">{ach.date}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-500">{ach.issuer}</p>
                    {ach.description && <p className="text-xs text-slate-500 leading-relaxed pt-1 font-medium">{ach.description}</p>}
                    {ach.credential_url && (
                      <a href={ach.credential_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:underline pt-1">
                        View Credential <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
