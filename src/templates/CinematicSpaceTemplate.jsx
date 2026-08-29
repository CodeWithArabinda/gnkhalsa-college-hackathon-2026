import React from 'react';
import { Github, Linkedin, Mail, MapPin, ExternalLink, Briefcase, GraduationCap, Award } from 'lucide-react';

export default function CinematicSpaceTemplate({ portfolio }) {
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
    <div className="min-h-screen bg-[#0A0A0F] text-white font-sans antialiased relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 p-6 sm:p-10 md:p-16 max-w-5xl mx-auto space-y-16">

        {/* Hero Section */}
        <div className="text-center space-y-6 py-12">
          {profile_image_url && (
            <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-cyan-500/40 shadow-[0_0_40px_rgba(56,189,248,0.15)]">
              <img src={profile_image_url} alt={full_name} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="space-y-3">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
              {full_name}
            </h1>
            <p className="text-lg md:text-xl text-cyan-400 font-medium font-mono">
              {'> '}{headline}
            </p>
            <p className="text-sm text-[#8B8FA3] max-w-2xl mx-auto leading-relaxed">{bio}</p>
          </div>

          {/* Contact Badges */}
          <div className="flex flex-wrap justify-center gap-2.5 pt-2">
            {location && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 text-xs text-[#A0A3B1]">
                <MapPin className="w-3 h-3 text-cyan-400" /> {location}
              </span>
            )}
            {email && (
              <a href={`mailto:${email}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 text-xs text-[#A0A3B1] hover:border-cyan-500/40 transition-colors">
                <Mail className="w-3 h-3 text-cyan-400" /> {email}
              </a>
            )}
            {github_url && (
              <a href={github_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 text-xs text-[#A0A3B1] hover:border-cyan-500/40 transition-colors">
                <Github className="w-3 h-3 text-cyan-400" /> GitHub
              </a>
            )}
            {linkedin_url && (
              <a href={linkedin_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 text-xs text-[#A0A3B1] hover:border-purple-400/40 transition-colors">
                <Linkedin className="w-3 h-3 text-purple-400" /> LinkedIn
              </a>
            )}
          </div>
        </div>

        {/* Projects Section */}
        {projects.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full" />
              <h2 className="text-2xl font-bold text-white">Featured Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all group">
                  {proj.image_url && (
                    <div className="h-40 overflow-hidden border-b border-white/10">
                      <img src={proj.image_url} alt={proj.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                    </div>
                  )}
                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-base text-white">{proj.title}</h3>
                    <p className="text-xs text-[#8B8FA3] leading-relaxed">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {proj.technologies.map(t => (
                          <span key={t} className="px-2 py-0.5 bg-cyan-500/10 text-cyan-300 text-[10px] font-medium rounded border border-cyan-500/20">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-3 pt-2 border-t border-white/5 text-xs">
                      {proj.github_url && (
                        <a href={proj.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors">
                          <Github className="w-3.5 h-3.5" /> Code
                        </a>
                      )}
                      {proj.live_url && (
                        <a href={proj.live_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors">
                          <ExternalLink className="w-3.5 h-3.5" /> Live Demo
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
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full" />
              <h2 className="text-2xl font-bold text-white">Tech Arsenal</h2>
            </div>
            <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill) => (
                  <div key={skill.id} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-white hover:border-cyan-500/30 transition-colors cursor-default">
                    {skill.name}
                    <span className="ml-1.5 text-[10px] text-cyan-400/70">({skill.level})</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Experience & Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-cyan-500 rounded-full" />
                <h2 className="text-xl font-bold text-white">Experience</h2>
              </div>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-2 hover:border-green-500/20 transition-colors">
                    <div className="flex justify-between items-start flex-wrap gap-1">
                      <h3 className="font-bold text-sm text-white">{exp.company}</h3>
                      <span className="text-[10px] text-green-400/70 font-mono">{exp.start_date} – {exp.end_date}</span>
                    </div>
                    <div className="text-xs text-cyan-400 font-medium">{exp.role}</div>
                    {exp.description && <p className="text-[11px] text-[#8B8FA3] leading-relaxed">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full" />
                <h2 className="text-xl font-bold text-white">Education</h2>
              </div>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-2 hover:border-amber-500/20 transition-colors">
                    <div className="flex justify-between items-start flex-wrap gap-1">
                      <h3 className="font-bold text-sm text-white">{edu.institution}</h3>
                      <span className="text-[10px] text-amber-400/70 font-mono">{edu.start_year} – {edu.end_year}</span>
                    </div>
                    <div className="text-xs text-purple-400 font-medium">{edu.degree}{edu.field ? ` · ${edu.field}` : ''}</div>
                    {edu.description && <p className="text-[11px] text-[#8B8FA3] leading-relaxed">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Achievements */}
        {achievements.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-pink-500 rounded-full" />
              <h2 className="text-xl font-bold text-white">Certifications & Awards</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((ach) => (
                <div key={ach.id} className="bg-white/[0.03] border border-white/10 rounded-xl p-4 flex items-start gap-3 hover:border-yellow-500/20 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold shrink-0">★</div>
                  <div className="space-y-1 flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-white truncate">{ach.title}</h4>
                    <p className="text-[10px] text-[#8B8FA3]">{ach.issuer} · {ach.date}</p>
                    {ach.credential_url && (
                      <a href={ach.credential_url} target="_blank" rel="noreferrer" className="text-[10px] text-cyan-400 hover:underline inline-flex items-center gap-0.5">
                        Verify <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="text-center py-8 text-[10px] text-white/20 font-mono">
          {full_name} · Built with StackFolio
        </footer>
      </div>
    </div>
  );
}
