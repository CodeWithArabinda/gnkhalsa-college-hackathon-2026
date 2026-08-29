import React from 'react';
import { Github, Linkedin, Mail, MapPin, ExternalLink, Briefcase, GraduationCap, Award } from 'lucide-react';

export default function NeoBrutalistTemplate({ portfolio }) {
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

  const colors = ['bg-[#4DEEEA]', 'bg-[#FF70A6]', 'bg-[#A8FF78]', 'bg-[#FFE600]', 'bg-[#FFAA00]'];

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#0F172A] font-sans antialiased">
      {/* Thick top accent */}
      <div className="h-3 bg-[#FFE600] border-b-3 border-black" />

      <div className="p-6 sm:p-10 md:p-14 max-w-5xl mx-auto space-y-12">

        {/* Hero Card */}
        <div className="bg-white border-3 border-black p-8 rounded-2xl shadow-[6px_6px_0px_0px_#000]">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {profile_image_url && (
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-3 border-black shadow-[4px_4px_0px_0px_#FFE600] bg-[#FFE600] shrink-0">
                <img src={profile_image_url} alt={full_name} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="space-y-3 text-center md:text-left flex-1">
              <div className="inline-block bg-[#FF70A6] text-black font-extrabold px-3 py-1 border-2 border-black rounded-full text-xs uppercase rotate-[-2deg] shadow-[2px_2px_0px_0px_#000]">
                ★ Portfolio Spotlight
              </div>
              <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tight leading-none">{full_name}</h1>
              <p className="text-lg font-heading font-bold text-[#0F172A]/80">{headline}</p>
              <p className="text-sm text-slate-600 leading-relaxed max-w-2xl font-medium">{bio}</p>

              {/* Social Stickers */}
              <div className="flex flex-wrap gap-2.5 justify-center md:justify-start pt-2 font-mono">
                {location && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border-2 border-black rounded-md text-xs font-bold shadow-[2px_2px_0px_0px_#000]">
                    <MapPin className="w-3.5 h-3.5" /> {location}
                  </span>
                )}
                {email && (
                  <a href={`mailto:${email}`} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFE600] border-2 border-black rounded-md text-xs font-bold shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
                    <Mail className="w-3.5 h-3.5" /> {email}
                  </a>
                )}
                {github_url && (
                  <a href={github_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#4DEEEA] border-2 border-black rounded-md text-xs font-bold shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
                    <Github className="w-3.5 h-3.5" /> GitHub
                  </a>
                )}
                {linkedin_url && (
                  <a href={linkedin_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#A8FF78] border-2 border-black rounded-md text-xs font-bold shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
                    <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-3xl font-heading font-black inline-block bg-[#FFE600] px-4 py-1.5 border-3 border-black shadow-[4px_4px_0px_0px_#000] rotate-[-1deg]">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              {projects.map((proj, idx) => (
                <div key={proj.id} className="bg-white border-3 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 transition-transform flex flex-col">
                  {proj.image_url && (
                    <div className="h-44 overflow-hidden border-b-3 border-black">
                      <img src={proj.image_url} alt={proj.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-heading font-extrabold">{proj.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">{proj.description}</p>
                    </div>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {proj.technologies.map((tech, tIdx) => (
                          <span key={tech} className={`px-2 py-0.5 border-2 border-black text-xs font-mono font-bold text-black rounded ${colors[(tIdx + idx) % colors.length]}`}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-4 text-xs font-bold pt-2 border-t-2 border-black">
                      {proj.github_url && (
                        <a href={proj.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-slate-800 hover:text-black">
                          <Github className="w-4 h-4" /> Code
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
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-3xl font-heading font-black inline-block bg-[#4DEEEA] px-4 py-1.5 border-3 border-black shadow-[4px_4px_0px_0px_#000] rotate-[1deg]">
              Skills & Tools
            </h2>
            <div className="bg-white border-3 border-black p-6 rounded-2xl shadow-[4px_4px_0px_0px_#000] flex flex-wrap gap-3">
              {skills.map((skill, idx) => (
                <div key={skill.id} className={`px-3 py-1.5 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000] ${colors[idx % colors.length]}`}>
                  <span className="text-xs font-bold text-black">{skill.name}</span>
                  {skill.level && <span className="ml-1 text-[9px] font-mono px-1 bg-white text-black border border-black rounded uppercase font-bold">{skill.level}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience + Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.length > 0 && (
            <section className="space-y-5">
              <h2 className="text-2xl font-heading font-black inline-block bg-[#A8FF78] px-3.5 py-1.5 border-3 border-black shadow-[4px_4px_0px_0px_#000] rotate-[-2deg]">
                Experience
              </h2>
              <div className="space-y-5">
                {experiences.map((exp) => (
                  <div key={exp.id} className="bg-white border-3 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_#000] space-y-2">
                    <div className="flex justify-between items-start flex-wrap gap-1">
                      <h3 className="font-heading font-black text-base">{exp.company}</h3>
                      <span className="text-[10px] font-mono font-bold bg-[#FFE600] px-2 py-0.5 border-2 border-black rounded">{exp.start_date} – {exp.end_date}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-600 flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {exp.role}</div>
                    {exp.description && <p className="text-xs text-slate-600 leading-relaxed font-medium">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section className="space-y-5">
              <h2 className="text-2xl font-heading font-black inline-block bg-[#FF70A6] px-3.5 py-1.5 border-3 border-black shadow-[4px_4px_0px_0px_#000] rotate-[2deg]">
                Education
              </h2>
              <div className="space-y-5">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-white border-3 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_#000] space-y-2">
                    <div className="flex justify-between items-start flex-wrap gap-1">
                      <h3 className="font-heading font-black text-base">{edu.institution}</h3>
                      <span className="text-[10px] font-mono font-bold bg-[#FFE600] px-2 py-0.5 border-2 border-black rounded">{edu.start_year} – {edu.end_year}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-600 flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5" /> {edu.degree}{edu.field ? ` · ${edu.field}` : ''}</div>
                    {edu.description && <p className="text-xs text-slate-600 leading-relaxed font-medium">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Achievements */}
        {achievements.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-3xl font-heading font-black inline-block bg-[#FFAA00] px-4 py-1.5 border-3 border-black shadow-[4px_4px_0px_0px_#000] rotate-[-1deg]">
              Certificates & Honors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {achievements.map((ach) => (
                <div key={ach.id} className="bg-white border-3 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_#000] flex gap-3 items-start">
                  <div className="w-10 h-10 rounded-xl bg-[#FFE600] border-2 border-black flex items-center justify-center text-black font-black text-base shrink-0 shadow-[2px_2px_0px_0px_#000]">★</div>
                  <div className="space-y-1 flex-1 min-w-0">
                    <h4 className="font-heading font-extrabold text-sm">{ach.title}</h4>
                    <p className="text-[10px] font-bold text-slate-500">{ach.issuer} · {ach.date}</p>
                    {ach.credential_url && (
                      <a href={ach.credential_url} target="_blank" rel="noreferrer" className="text-[11px] font-bold text-blue-600 hover:underline inline-flex items-center gap-0.5">
                        View Credential <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
