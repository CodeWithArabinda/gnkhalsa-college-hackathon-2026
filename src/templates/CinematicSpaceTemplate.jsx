import React, { useState } from 'react';
import { Github, Linkedin, Mail, MapPin, ExternalLink, Briefcase, GraduationCap, Award, ArrowUpRight, Sparkles, Code2, Terminal, Send } from 'lucide-react';

export default function CinematicSpaceTemplate({ portfolio }) {
  const [activeSection, setActiveSection] = useState('overview');

  if (!portfolio) return null;

  const {
    full_name = 'Developer',
    headline = 'Developer & Designer',
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

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0E] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-[#0B0B0E] to-[#0B0B0E] text-white font-sans antialiased relative overflow-x-hidden selection:bg-[#FF5722] selection:text-white">
      
      {/* Background Glowing Ambient Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-[#FF5722]/15 via-amber-600/10 to-transparent rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#FF6B00]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[160px]" />
      </div>

      {/* Floating Glass Navbar */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#121218]/80 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 shadow-2xl flex items-center space-x-1 sm:space-x-3">
        {navTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => scrollToSection(tab.id)}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all relative ${
              activeSection === tab.id
                ? 'text-[#FF5722] font-bold bg-white/5'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
            {activeSection === tab.id && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#FF5722] rounded-full shadow-[0_0_8px_#FF5722]" />
            )}
          </button>
        ))}
      </nav>

      {/* Main Content Area */}
      <div className="relative z-10 pt-28 pb-20 px-6 sm:px-10 max-w-5xl mx-auto space-y-24">

        {/* HERO SECTION */}
        <section id="overview" className="flex flex-col items-center text-center space-y-8 pt-6">
          
          {/* 3D Glow Container for Avatar */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FF5722] to-amber-500 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-[#FF5722]/50 shadow-[0_0_50px_rgba(255,87,34,0.3)] bg-[#14141B] flex items-center justify-center">
              {profile_image_url ? (
                <img src={profile_image_url} alt={full_name} className="w-full h-full object-cover" />
              ) : (
                <Sparkles className="w-12 h-12 text-[#FF5722]" />
              )}
            </div>
          </div>

          {/* Headline & Subtitle */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-mono text-amber-400">
              <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-ping" />
              <span>Available for New Projects</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              I'm <span className="bg-gradient-to-r from-white via-amber-100 to-amber-400 bg-clip-text text-transparent">{full_name}</span>. <br />
              <span className="font-serif italic text-[#FF6B00] font-normal">{headline}</span>.
            </h1>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
              {bio || 'Crafting digital experiences with modern web tools and high-impact visual design.'}
            </p>
          </div>

          {/* Quick Tech Badges Grid */}
          {skills.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 max-w-xl">
              {skills.slice(0, 8).map((skill) => (
                <span
                  key={skill.id}
                  className="px-3 py-1 bg-white/[0.04] border border-white/10 hover:border-[#FF5722]/40 rounded-full text-xs font-mono text-slate-300 transition-colors cursor-default"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          )}

          {/* Social Badges */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {location && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-[#FF5722]" /> {location}
              </span>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#FF5722] hover:bg-[#ff6a38] text-white font-bold rounded-xl text-xs shadow-[0_0_20px_rgba(255,87,34,0.4)] transition-all"
              >
                <Mail className="w-3.5 h-3.5" /> Email Me
              </a>
            )}
            {github_url && (
              <a
                href={github_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/[0.05] hover:bg-white/10 border border-white/10 rounded-xl text-xs text-white transition-all"
              >
                <Github className="w-3.5 h-3.5 text-amber-400" /> GitHub
              </a>
            )}
            {linkedin_url && (
              <a
                href={linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/[0.05] hover:bg-white/10 border border-white/10 rounded-xl text-xs text-white transition-all"
              >
                <Linkedin className="w-3.5 h-3.5 text-amber-400" /> LinkedIn
              </a>
            )}
          </div>

        </section>

        {/* PROJECTS SHOWCASE */}
        {projects.length > 0 && (
          <section id="projects" className="space-y-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Featured <span className="font-serif italic text-[#FF6B00] font-normal">Projects</span>
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-1">Selected software & design showcases</p>
              </div>
              <Code2 className="w-6 h-6 text-[#FF5722]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white/[0.03] border border-white/10 hover:border-[#FF5722]/50 transition-all duration-300 rounded-2xl p-6 flex flex-col justify-between space-y-4 group hover:shadow-[0_0_30px_rgba(255,87,34,0.15)]"
                >
                  {proj.image_url && (
                    <div className="h-44 rounded-xl overflow-hidden border border-white/10 relative">
                      <img
                        src={proj.image_url}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#FF5722] transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">{proj.description}</p>
                  </div>

                  <div className="space-y-4 pt-2">
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {proj.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 bg-[#FF5722]/10 text-[#FF5722] text-[10px] font-mono rounded border border-[#FF5722]/20"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-3 text-xs font-mono pt-3 border-t border-white/10">
                      {proj.github_url && (
                        <a
                          href={proj.github_url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
                        >
                          <Github className="w-3.5 h-3.5 text-[#FF5722]" /> Code
                        </a>
                      )}
                      {proj.live_url && (
                        <a
                          href={proj.live_url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-[#FF5722] hover:underline"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS & EXPERIENCE SECTION (BENTO GRID) */}
        <section id="skills" className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Skills & <span className="font-serif italic text-[#FF6B00] font-normal">Timeline</span>
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-1">Core competencies and work experience</p>
            </div>
            <Terminal className="w-6 h-6 text-[#FF5722]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left: Skills Pill Grid */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF5722]" /> Technical Stack
              </h3>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center space-x-2 px-3 py-1.5 bg-[#14141D] border border-white/10 hover:border-[#FF5722]/40 rounded-xl transition-all"
                  >
                    <span className="text-xs font-medium text-white">{skill.name}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#FF5722]/15 text-[#FF5722] border border-[#FF5722]/30 rounded uppercase font-bold">
                      {skill.level || 'PRO'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Work Experience & Education Timeline */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-6" id="experience">
              
              {/* Experience List */}
              {experiences.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#FF5722]" /> Work Experience
                  </h3>

                  <div className="space-y-4 border-l-2 border-[#FF5722]/30 pl-4">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="space-y-1">
                        <div className="flex justify-between items-baseline flex-wrap gap-1">
                          <h4 className="font-bold text-sm text-white">{exp.company}</h4>
                          <span className="text-[10px] font-mono text-[#FF5722]">{exp.start_date} – {exp.end_date}</span>
                        </div>
                        <div className="text-xs font-mono text-amber-300">{exp.role}</div>
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education List */}
              {education.length > 0 && (
                <div className="space-y-4 pt-2">
                  <h3 className="text-sm font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#FF5722]" /> Education
                  </h3>

                  <div className="space-y-4 border-l-2 border-amber-500/30 pl-4">
                    {education.map((edu) => (
                      <div key={edu.id} className="space-y-1">
                        <div className="flex justify-between items-baseline flex-wrap gap-1">
                          <h4 className="font-bold text-sm text-white">{edu.institution}</h4>
                          <span className="text-[10px] font-mono text-amber-400">{edu.start_year} – {edu.end_year}</span>
                        </div>
                        <div className="text-xs font-mono text-slate-300">{edu.degree} {edu.field && `| ${edu.field}`}</div>
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">{edu.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        </section>

        {/* ACHIEVEMENTS */}
        {achievements.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-extrabold text-white">Certifications & Honors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((ach) => (
                <div key={ach.id} className="bg-white/[0.03] border border-white/10 rounded-xl p-4 flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-lg bg-[#FF5722]/15 border border-[#FF5722]/40 flex items-center justify-center text-[#FF5722] font-bold text-sm shrink-0">
                    ★
                  </div>
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex justify-between items-start flex-wrap gap-1">
                      <h4 className="font-bold text-xs text-white truncate">{ach.title}</h4>
                      <span className="text-[10px] font-mono text-slate-500">{ach.date}</span>
                    </div>
                    <p className="text-[11px] font-mono text-amber-400">{ach.issuer}</p>
                    {ach.credential_url && (
                      <a href={ach.credential_url} target="_blank" rel="noreferrer" className="text-[10px] font-mono text-[#FF5722] hover:underline inline-flex items-center gap-0.5 pt-1">
                        Verify Credential <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CONTACT & FOOTER CTA */}
        <section id="contact" className="bg-gradient-to-r from-[#FF5722]/20 via-amber-600/10 to-[#FF5722]/20 border border-[#FF5722]/30 rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Let's build something <span className="font-serif italic text-[#FF6B00] font-normal">cool together</span>.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              Have a project in mind or interested in collaborating? Feel free to reach out.
            </p>
          </div>

          {email && (
            <div className="relative z-10 pt-2">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center space-x-2 bg-[#FF5722] hover:bg-[#ff6a38] text-white font-heading font-black text-sm px-8 py-3.5 rounded-full shadow-[0_0_30px_rgba(255,87,34,0.5)] transition-all hover:scale-105"
              >
                <Send className="w-4 h-4" />
                <span>Start Conversation ({email})</span>
              </a>
            </div>
          )}

          <div className="pt-8 border-t border-white/10 text-xs font-mono text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
            <span>© {new Date().getFullYear()} {full_name}. Built with StackFolio.</span>
            <span>Cinematic Nebula Engine</span>
          </div>
        </section>

      </div>
    </div>
  );
}
