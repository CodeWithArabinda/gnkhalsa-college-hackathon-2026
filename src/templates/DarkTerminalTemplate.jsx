import React from 'react';
import { Github, Linkedin, Mail, MapPin, ExternalLink, Terminal } from 'lucide-react';

export default function DarkTerminalTemplate({ portfolio }) {
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

  const Prompt = ({ children, color = 'text-[#00FFA3]' }) => (
    <div className="flex items-baseline gap-2 mb-1">
      <span className={`font-mono text-xs ${color} shrink-0 select-none`}>&gt;_</span>
      <span className="font-mono text-sm text-white font-bold">{children}</span>
    </div>
  );

  const SectionHeader = ({ cmd, label }) => (
    <div className="bg-[#0D1017] border border-[#1E293B] rounded-lg px-4 py-3 mb-4">
      <div className="font-mono text-xs">
        <span className="text-[#00FFA3]">$ </span>
        <span className="text-[#38BDF8]">{cmd}</span>
        <span className="text-[#475569]"> --format=json</span>
      </div>
      <div className="font-mono text-xs text-[#FFE600] mt-1"># {label}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#E2E8F0] font-mono antialiased">
      {/* Terminal Top Bar */}
      <div className="bg-[#151920] border-b border-[#1E293B] px-4 py-2 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#F43F5E]" />
          <div className="w-3 h-3 rounded-full bg-[#FBBF24]" />
          <div className="w-3 h-3 rounded-full bg-[#00FFA3]" />
          <span className="text-[#475569] text-xs pl-3">zsh — {full_name.toLowerCase().replace(/\s+/g, '-')}-portfolio</span>
        </div>
        <Terminal className="w-4 h-4 text-[#475569]" />
      </div>

      <div className="p-6 sm:p-10 md:p-14 max-w-4xl mx-auto space-y-10">

        {/* Boot Sequence / Hero */}
        <div className="space-y-3">
          <div className="text-[#475569] text-xs">[{new Date().toISOString().slice(0, 10)}] Initializing portfolio server...</div>
          <div className="text-[#00FFA3] text-xs">✓ Portfolio loaded successfully.</div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mt-4">
            {profile_image_url && (
              <div className="w-24 h-24 rounded-lg overflow-hidden border border-[#1E293B] shrink-0">
                <img src={profile_image_url} alt={full_name} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{full_name}</h1>
              <Prompt color="text-[#38BDF8]">{headline}</Prompt>
              <p className="text-xs text-[#94A3B8] leading-relaxed max-w-2xl font-sans">{bio}</p>
            </div>
          </div>

          {/* Contact Environment */}
          <div className="bg-[#0D1017] border border-[#1E293B] rounded-lg p-4 mt-4 text-xs space-y-1.5">
            <div className="text-[#475569] mb-2"># ~/.env.local</div>
            {location && <div><span className="text-[#9CDCFE]">LOCATION</span>=<span className="text-[#CE9178]">"{location}"</span></div>}
            {email && <div><span className="text-[#9CDCFE]">EMAIL</span>=<a href={`mailto:${email}`} className="text-[#CE9178] hover:underline">"{email}"</a></div>}
            {github_url && <div><span className="text-[#9CDCFE]">GITHUB</span>=<a href={github_url} target="_blank" rel="noreferrer" className="text-[#CE9178] hover:underline">"{github_url}"</a></div>}
            {linkedin_url && <div><span className="text-[#9CDCFE]">LINKEDIN</span>=<a href={linkedin_url} target="_blank" rel="noreferrer" className="text-[#CE9178] hover:underline">"{linkedin_url}"</a></div>}
          </div>
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <section className="space-y-2">
            <SectionHeader cmd="cat projects.json" label={`${projects.length} project(s) found`} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-[#0D1017] border border-[#1E293B] rounded-lg overflow-hidden hover:border-[#38BDF8]/40 transition-colors">
                  {proj.image_url && (
                    <div className="h-36 overflow-hidden border-b border-[#1E293B]">
                      <img src={proj.image_url} alt={proj.title} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                    </div>
                  )}
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-sm text-white">{proj.title}</h3>
                    <p className="text-[11px] text-[#94A3B8] font-sans leading-relaxed">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {proj.technologies.map(t => (
                          <span key={t} className="px-1.5 py-0.5 bg-[#151920] text-[#00FFA3] text-[10px] rounded border border-[#00FFA3]/20 font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-3 pt-2 border-t border-[#1E293B] text-xs">
                      {proj.github_url && <a href={proj.github_url} target="_blank" rel="noreferrer" className="text-[#38BDF8] hover:underline flex items-center gap-1"><Github className="w-3 h-3" /> code</a>}
                      {proj.live_url && <a href={proj.live_url} target="_blank" rel="noreferrer" className="text-[#00FFA3] hover:underline flex items-center gap-1"><ExternalLink className="w-3 h-3" /> demo</a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="space-y-2">
            <SectionHeader cmd="echo $TECH_STACK" label="Core competencies" />
            <div className="bg-[#0D1017] border border-[#1E293B] rounded-lg p-5 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="px-2.5 py-1 bg-[#151920] border border-[#38BDF8]/20 rounded text-[11px] text-[#E2E8F0] hover:border-[#38BDF8]/50 transition-colors cursor-default">
                  {skill.name} <span className="text-[#00FFA3] text-[9px]">({skill.level})</span>
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience + Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.length > 0 && (
            <section className="space-y-2">
              <SectionHeader cmd="git log --career" label="Work history" />
              <div className="space-y-3">
                {experiences.map((exp) => (
                  <div key={exp.id} className="bg-[#0D1017] border border-[#1E293B] rounded-lg p-4 space-y-1.5">
                    <div className="flex justify-between items-start flex-wrap gap-1">
                      <span className="font-bold text-xs text-white">{exp.company}</span>
                      <span className="text-[10px] text-[#00FFA3] font-mono">{exp.start_date}–{exp.end_date}</span>
                    </div>
                    <div className="text-[11px] text-[#38BDF8]">{exp.role}</div>
                    {exp.description && <p className="text-[10px] text-[#94A3B8] font-sans leading-relaxed">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section className="space-y-2">
              <SectionHeader cmd="cat education.md" label="Academic background" />
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-[#0D1017] border border-[#1E293B] rounded-lg p-4 space-y-1.5">
                    <div className="flex justify-between items-start flex-wrap gap-1">
                      <span className="font-bold text-xs text-white">{edu.institution}</span>
                      <span className="text-[10px] text-[#00FFA3] font-mono">{edu.start_year}–{edu.end_year}</span>
                    </div>
                    <div className="text-[11px] text-[#38BDF8]">{edu.degree}{edu.field ? ` | ${edu.field}` : ''}</div>
                    {edu.description && <p className="text-[10px] text-[#94A3B8] font-sans leading-relaxed">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Achievements */}
        {achievements.length > 0 && (
          <section className="space-y-2">
            <SectionHeader cmd="ls -la ./certs/" label={`${achievements.length} credential(s)`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {achievements.map((ach) => (
                <div key={ach.id} className="bg-[#0D1017] border border-[#1E293B] rounded-lg p-4 flex items-start gap-3">
                  <div className="w-7 h-7 rounded bg-[#FFE600] border border-black flex items-center justify-center text-black text-xs font-bold shrink-0">★</div>
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <h4 className="font-bold text-[11px] text-white truncate">{ach.title}</h4>
                    <p className="text-[10px] text-[#94A3B8]">{ach.issuer} · {ach.date}</p>
                    {ach.credential_url && (
                      <a href={ach.credential_url} target="_blank" rel="noreferrer" className="text-[10px] text-[#38BDF8] hover:underline inline-flex items-center gap-0.5">
                        verify <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Terminal footer */}
        <div className="text-center text-[10px] text-[#475569] font-mono py-6">
          {full_name.toLowerCase().replace(/\s+/g, '-')}@stackfolio:~$ exit
        </div>
      </div>
    </div>
  );
}
