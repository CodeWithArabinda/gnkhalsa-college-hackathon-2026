import React from 'react';
import { Github, Linkedin, Mail, MapPin, ExternalLink, Terminal, Cpu, GraduationCap, Briefcase, Award } from 'lucide-react';

export default function DarkDeveloperTemplate({ portfolio }) {
  if (!portfolio) return null;

  const {
    full_name = 'Anonymous Developer',
    headline = 'Software Engineer',
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
    <div className="min-h-screen bg-[#0F1117] text-[#F8FAFC] font-sans antialiased p-6 sm:p-12">
      <div className="max-w-4xl mx-auto space-y-12">

        {/* HEADER SECTION (Terminal Window style) */}
        <div className="bg-[#1A1D27] border-2 border-[#38BDF8] rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_#38BDF8] animate-fadeIn">
          {/* Terminal Title Bar */}
          <div className="bg-[#0F1117] px-4 py-2.5 border-b-2 border-[#38BDF8] flex items-center justify-between text-xs font-mono text-[#38BDF8]">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#00FFA3]" />
              <span className="pl-2">terminal ~ developer-profile</span>
            </div>
            <Terminal className="w-4 h-4" />
          </div>
          
          {/* Terminal Content */}
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {profile_image_url && (
                <div className="w-28 h-28 md:w-32 md:h-32 shrink-0 rounded-xl overflow-hidden border-2 border-[#38BDF8] shadow-[4px_4px_0px_0px_#38BDF8]">
                  <img src={profile_image_url} alt={full_name} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="space-y-3 text-center md:text-left flex-1">
                <h1 className="text-4xl md:text-5xl font-heading font-black tracking-tight text-[#F8FAFC]">
                  {full_name}
                </h1>
                <p className="text-lg font-mono text-[#00FFA3] font-bold">
                  &gt; {headline}
                </p>
                <p className="text-sm font-sans text-[#94A3B8] leading-relaxed max-w-2xl">
                  {bio}
                </p>
              </div>
            </div>

            {/* Socials & Meta */}
            <div className="border-t border-[#38BDF8]/20 pt-4 flex flex-wrap gap-3 justify-center md:justify-start text-xs font-mono">
              {location && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0F1117] rounded-lg border border-[#38BDF8]/30">
                  <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" /> {location}
                </span>
              )}
              {email && (
                <a href={`mailto:${email}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0F1117] rounded-lg border border-[#38BDF8]/30 hover:border-[#38BDF8] transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#38BDF8]" /> {email}
                </a>
              )}
              {github_url && (
                <a href={github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0F1117] rounded-lg border border-[#38BDF8]/30 hover:border-[#38BDF8] transition-colors">
                  <Github className="w-3.5 h-3.5 text-[#38BDF8]" /> GitHub
                </a>
              )}
              {linkedin_url && (
                <a href={linkedin_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0F1117] rounded-lg border border-[#38BDF8]/30 hover:border-[#38BDF8] transition-colors">
                  <Linkedin className="w-3.5 h-3.5 text-[#38BDF8]" /> LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>

        {/* PROJECTS SECTION */}
        {projects.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-mono font-bold text-[#38BDF8] flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#00FFA3]" /> [01] PROJECTS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-[#1A1D27] border-2 border-white rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_#38BDF8] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_#38BDF8] transition-all flex flex-col">
                  {proj.image_url && (
                    <div className="h-44 overflow-hidden border-b-2 border-white relative">
                      <img src={proj.image_url} alt={proj.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-base font-heading font-extrabold text-[#F8FAFC] tracking-tight">{proj.title}</h3>
                      <p className="text-xs text-[#94A3B8] font-sans leading-relaxed">{proj.description}</p>
                    </div>

                    <div className="space-y-3">
                      {/* Tech stack pills */}
                      {proj.technologies && proj.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {proj.technologies.map(tech => (
                            <span key={tech} className="px-2 py-0.5 bg-[#0F1117] text-[#00FFA3] font-mono text-[10px] rounded border border-[#00FFA3]/30">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Project Links */}
                      <div className="flex items-center gap-3 text-xs font-mono pt-2 border-t border-[#38BDF8]/10">
                        {proj.github_url && (
                          <a href={proj.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#38BDF8] hover:underline">
                            <Github className="w-3.5 h-3.5" /> Code
                          </a>
                        )}
                        {proj.live_url && (
                          <a href={proj.live_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#00FFA3] hover:underline">
                            <ExternalLink className="w-3.5 h-3.5" /> Demo
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
          <div className="space-y-4">
            <h2 className="text-xl font-mono font-bold text-[#38BDF8] flex items-center gap-2">
              <Terminal className="w-5 h-5 text-[#00FFA3]" /> [02] CORE_SKILLS
            </h2>
            <div className="bg-[#1A1D27] border-2 border-[#38BDF8] p-6 rounded-xl shadow-[4px_4px_0px_0px_#38BDF8] flex flex-wrap gap-3">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center space-x-2 px-3 py-1.5 bg-[#0F1117] border border-[#38BDF8]/40 rounded-lg">
                  <span className="text-xs font-mono font-bold text-[#F8FAFC]">{skill.name}</span>
                  <span className="text-[9px] font-mono px-1 py-0.2 bg-[#00FFA3]/10 text-[#00FFA3] border border-[#00FFA3]/30 rounded uppercase font-bold">
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EXPERIENCE & EDUCATION SPLIT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Experiences */}
          {experiences.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-mono font-bold text-[#38BDF8] flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#00FFA3]" /> [03] EXPERIENCE
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="bg-[#1A1D27] border-2 border-white p-5 rounded-xl shadow-[4px_4px_0px_0px_#38BDF8] space-y-2">
                    <div className="flex justify-between items-start flex-wrap gap-1">
                      <h3 className="font-heading font-extrabold text-sm text-[#F8FAFC]">{exp.company}</h3>
                      <span className="text-[10px] font-mono text-[#00FFA3] bg-[#00FFA3]/10 px-2 py-0.5 rounded border border-[#00FFA3]/20">
                        {exp.start_date} - {exp.end_date}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-[#38BDF8]">{exp.role}</div>
                    <p className="text-xs text-[#94A3B8] font-sans leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-mono font-bold text-[#38BDF8] flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#00FFA3]" /> [04] EDUCATION
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-[#1A1D27] border-2 border-white p-5 rounded-xl shadow-[4px_4px_0px_0px_#38BDF8] space-y-2">
                    <div className="flex justify-between items-start flex-wrap gap-1">
                      <h3 className="font-heading font-extrabold text-sm text-[#F8FAFC]">{edu.institution}</h3>
                      <span className="text-[10px] font-mono text-[#00FFA3] bg-[#00FFA3]/10 px-2 py-0.5 rounded border border-[#00FFA3]/20">
                        {edu.start_year} - {edu.end_year}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-[#38BDF8]">{edu.degree} {edu.field && `| ${edu.field}`}</div>
                    <p className="text-xs text-[#94A3B8] font-sans leading-relaxed">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ACHIEVEMENTS */}
        {achievements.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-mono font-bold text-[#38BDF8] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#00FFA3]" /> [05] CREDENTIALS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((ach) => (
                <div key={ach.id} className="bg-[#1A1D27] border-2 border-[#38BDF8] p-5 rounded-xl shadow-[4px_4px_0px_0px_#38BDF8] flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-lg bg-[#0F1117] border border-[#38BDF8]/40 flex items-center justify-center text-[#00FFA3] font-bold text-sm shrink-0 font-mono">
                    ★
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between items-start flex-wrap gap-1">
                      <h3 className="font-heading font-extrabold text-xs text-[#F8FAFC]">{ach.title}</h3>
                      <span className="text-[9px] font-mono text-[#94A3B8]">{ach.date}</span>
                    </div>
                    <p className="text-[11px] font-mono text-[#38BDF8]">{ach.issuer}</p>
                    {ach.description && <p className="text-[11px] text-[#94A3B8] font-sans leading-relaxed pt-1">{ach.description}</p>}
                    {ach.credential_url && (
                      <a href={ach.credential_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[10px] font-mono text-[#00FFA3] hover:underline pt-1">
                        Verify URL <ExternalLink className="w-2.5 h-2.5" />
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
