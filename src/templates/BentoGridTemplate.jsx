import React from 'react';
import { Github, Linkedin, Mail, MapPin, ExternalLink, Terminal, Briefcase, GraduationCap, Award, ArrowUpRight } from 'lucide-react';

export default function BentoGridTemplate({ portfolio, viewMode = 'desktop' }) {
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

  const isMobile = viewMode === 'mobile';

  return (
    <div className={`min-h-screen bg-[#FAFAFA] text-[#111] font-sans antialiased ${isMobile ? 'p-4' : 'p-5 sm:p-8 md:p-12'} w-full overflow-x-hidden`}>
      <div className="max-w-6xl mx-auto space-y-5">

        {/* ROW 1: Hero + Quick Stats */}
        <div className={`${isMobile ? 'flex flex-col gap-4' : 'grid grid-cols-1 md:grid-cols-3 gap-5'}`}>
          {/* Hero Card */}
          <div className={`${isMobile ? 'w-full' : 'md:col-span-2'} bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E5E5] shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left`}>
            {profile_image_url && (
              <img src={profile_image_url} alt={full_name} className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border border-[#E5E5E5] shrink-0" />
            )}
            <div className="space-y-2">
              <h1 className={`${isMobile ? 'text-2xl font-black' : 'text-3xl md:text-4xl font-extrabold'} tracking-tight text-[#111] break-words`}>{full_name}</h1>
              <p className="text-sm sm:text-base font-medium text-[#666]">{headline}</p>
              <p className="text-xs sm:text-sm text-[#888] leading-relaxed max-w-lg">{bio}</p>
            </div>
          </div>

          {/* Quick Links Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#E5E5E5] shadow-sm flex flex-col justify-center space-y-3 w-full">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#999]">Connect</h3>
            <div className="space-y-2">
              {email && (
                <a href={`mailto:${email}`} className="flex items-center gap-2 text-xs sm:text-sm text-[#333] hover:text-black transition-colors group truncate">
                  <Mail className="w-4 h-4 text-[#999] group-hover:text-black shrink-0" /> <span className="truncate">{email}</span>
                </a>
              )}
              {github_url && (
                <a href={github_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs sm:text-sm text-[#333] hover:text-black transition-colors group">
                  <Github className="w-4 h-4 text-[#999] group-hover:text-black shrink-0" /> GitHub
                </a>
              )}
              {linkedin_url && (
                <a href={linkedin_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs sm:text-sm text-[#333] hover:text-black transition-colors group">
                  <Linkedin className="w-4 h-4 text-[#999] group-hover:text-black shrink-0" /> LinkedIn
                </a>
              )}
              {location && (
                <span className="flex items-center gap-2 text-xs sm:text-sm text-[#666]">
                  <MapPin className="w-4 h-4 text-[#999] shrink-0" /> {location}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ROW 2: Skills Pill Cloud */}
        {skills.length > 0 && (
          <div className="bg-white rounded-3xl p-6 border border-[#E5E5E5] shadow-sm w-full box-border">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#999] mb-4">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="px-3 py-1.5 bg-[#F5F5F5] rounded-full text-[11px] sm:text-[12px] font-semibold text-[#333] border border-[#E5E5E5] hover:bg-[#111] hover:text-white transition-all cursor-default">
                  {skill.name}
                  {skill.level && <span className="ml-1.5 text-[10px] text-[#999] font-normal">· {skill.level}</span>}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ROW 3: Projects Bento Grid */}
        {projects.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#999] px-1">Featured Projects</h2>
            <div className={`${isMobile ? 'flex flex-col gap-4 w-full' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'}`}>
              {projects.map((proj, idx) => (
                <div key={proj.id} className={`bg-white rounded-3xl border border-[#E5E5E5] shadow-sm overflow-hidden hover:shadow-md transition-shadow group w-full box-border ${(!isMobile && idx === 0) ? 'md:col-span-2 lg:col-span-2' : ''}`}>
                  {proj.image_url && (
                    <div className={`overflow-hidden border-b border-[#E5E5E5] ${(!isMobile && idx === 0) ? 'h-48' : 'h-36'}`}>
                      <img src={proj.image_url} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold text-base text-[#111]">{proj.title}</h3>
                      <div className="flex gap-1.5 shrink-0 ml-2">
                        {proj.github_url && (
                          <a href={proj.github_url} target="_blank" rel="noreferrer" className="p-1.5 bg-[#F5F5F5] hover:bg-[#111] hover:text-white rounded-lg transition-colors">
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {proj.live_url && (
                          <a href={proj.live_url} target="_blank" rel="noreferrer" className="p-1.5 bg-[#F5F5F5] hover:bg-[#111] hover:text-white rounded-lg transition-colors">
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-[#888] leading-relaxed line-clamp-3">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {proj.technologies.map(t => (
                          <span key={t} className="px-2 py-0.5 bg-[#F5F5F5] rounded-full text-[10px] font-semibold text-[#555] border border-[#E5E5E5]">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ROW 4: Experience + Education */}
        <div className={`${isMobile ? 'flex flex-col gap-4 w-full' : 'grid grid-cols-1 md:grid-cols-2 gap-5'}`}>
          {experiences.length > 0 && (
            <div className="bg-white rounded-3xl p-6 border border-[#E5E5E5] shadow-sm space-y-4 w-full box-border">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#999]">Work Experience</h3>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-[#111] pl-4 space-y-1">
                    <div className="flex justify-between items-baseline flex-wrap gap-1">
                      <h4 className="font-bold text-sm text-[#111]">{exp.company}</h4>
                      <span className="text-[10px] text-[#999] font-medium">{exp.start_date} – {exp.end_date}</span>
                    </div>
                    <div className="text-xs font-semibold text-[#666]">{exp.role}</div>
                    {exp.description && <p className="text-[11px] text-[#888] leading-relaxed">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="bg-white rounded-3xl p-6 border border-[#E5E5E5] shadow-sm space-y-4 w-full box-border">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#999]">Education</h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="border-l-2 border-[#111] pl-4 space-y-1">
                    <div className="flex justify-between items-baseline flex-wrap gap-1">
                      <h4 className="font-bold text-sm text-[#111]">{edu.institution}</h4>
                      <span className="text-[10px] text-[#999] font-medium">{edu.start_year} – {edu.end_year}</span>
                    </div>
                    <div className="text-xs font-semibold text-[#666]">{edu.degree}{edu.field ? ` · ${edu.field}` : ''}</div>
                    {edu.description && <p className="text-[11px] text-[#888] leading-relaxed">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ROW 5: Achievements */}
        {achievements.length > 0 && (
          <div className="bg-white rounded-3xl p-6 border border-[#E5E5E5] shadow-sm space-y-4 w-full box-border">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#999]">Certifications & Awards</h3>
            <div className={`${isMobile ? 'flex flex-col gap-3 w-full' : 'grid grid-cols-1 sm:grid-cols-2 gap-3'}`}>
              {achievements.map((ach) => (
                <div key={ach.id} className="flex items-start gap-3 p-3 bg-[#FAFAFA] rounded-xl border border-[#E5E5E5] w-full box-border">
                  <div className="w-8 h-8 rounded-xl bg-[#111] text-white flex items-center justify-center text-xs font-bold shrink-0">★</div>
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-[#111] truncate">{ach.title}</h4>
                    <p className="text-[10px] text-[#888]">{ach.issuer} · {ach.date}</p>
                    {ach.credential_url && (
                      <a href={ach.credential_url} target="_blank" rel="noreferrer" className="text-[10px] text-blue-600 hover:underline inline-flex items-center gap-0.5">
                        Verify <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center py-6 text-[10px] text-[#CCC] font-medium">
          Built with StackFolio · {full_name}'s Portfolio
        </div>
      </div>
    </div>
  );
}

