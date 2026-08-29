import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, MapPin, ExternalLink, Briefcase, GraduationCap, Award, ArrowUpRight, Sparkles, Code2, Terminal, Send, ChevronRight, X } from 'lucide-react';
import ProfileCard from './ProfileCard';
import BlurText from './BlurText';
import CircularGallery from './CircularGallery';

export default function CinematicSpaceTemplate({ portfolio }) {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedProject, setSelectedProject] = useState(null);

  if (!portfolio) return null;

  const {
    full_name = 'Developer',
    headline = 'Creative Developer & Designer',
    bio = '',
    profile_image_url = '',
    avatar_url = '',
    location = '',
    email = '',
    contact_email = '',
    github_url = '',
    linkedin_url = '',
    experiences = [],
    education = [],
    projects = [],
    skills = [],
    achievements = []
  } = portfolio;

  const userAvatar = avatar_url || profile_image_url || '/photo/Sarang.png';
  const userEmail = contact_email || email;
  const userHandle = (full_name || 'dev').toLowerCase().replace(/[^a-z0-9]/g, '');

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'profile', label: 'Identity' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  // Map projects for CircularGallery (image + text)
  const galleryItems = (projects.length > 0 ? projects : [
    { title: 'Interactive Web Platform', description: 'Next.js & Tailwind CSS dynamic portal', technologies: ['React', 'Tailwind', 'GSAP'] },
    { title: 'AI Assistant Interface', description: 'Real-time conversational studio', technologies: ['TypeScript', 'Node.js', 'AI'] },
    { title: 'SaaS Command Center', description: 'High-performance recruiter dashboard', technologies: ['Vite', 'Supabase', 'React'] }
  ]).map((p, idx) => ({
    id: p.id || `proj-${idx}`,
    image: p.image_url || `https://picsum.photos/seed/${p.id || idx}/800/600`,
    text: p.title || `Project ${idx + 1}`,
    description: p.description || '',
    technologies: p.technologies || p.tech || [],
    github_url: p.github_url || p.link || '',
    live_url: p.live_url || ''
  }));

  return (
    <div className="min-h-screen bg-[#060608] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FF5722]/20 via-[#0B0B0E] to-[#060608] text-white font-sans antialiased relative overflow-x-hidden selection:bg-[#FF5722] selection:text-white">
      
      {/* Ambient Lighting Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-[#FF5722]/20 via-[#FF6B00]/10 to-transparent rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-[#FF6B1A]/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[160px]" />
      </div>

      {/* Floating Glass Navigation */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#121218]/85 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 shadow-2xl flex items-center space-x-1 sm:space-x-3">
        {navTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => scrollToSection(tab.id)}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all relative ${
              activeSection === tab.id
                ? 'text-[#FF6B1A] font-bold bg-white/5'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
            {activeSection === tab.id && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#FF6B1A] rounded-full shadow-[0_0_8px_#FF6B1A]" />
            )}
          </button>
        ))}
      </nav>

      {/* Main Section Canvas */}
      <div className="relative z-10 pt-28 pb-20 px-6 sm:px-12 max-w-6xl mx-auto space-y-28">

        {/* 1. HERO SECTION */}
        <section id="overview" className="min-h-[75vh] flex flex-col justify-center items-start space-y-8 pt-4">
          <p className="text-[10px] sm:text-xs text-[#FF6B1A] tracking-[0.3em] uppercase font-mono font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF6B1A] animate-ping" />
            <span>Digital Experience & Interactive Development</span>
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-white">
            Hey, I'm <br />
            <span className="bg-gradient-to-r from-white via-amber-100 to-[#FF6B1A] bg-clip-text text-transparent">
              {full_name}.
            </span>
          </h1>

          <div className="max-w-2xl space-y-4">
            <BlurText
              text={bio || `I create *immersive* digital experiences that blend design, motion, and technology into something visually *memorable* and smooth to use.`}
              delay={30}
              animateBy="words"
              direction="bottom"
              className="text-base sm:text-lg text-white/80 font-medium leading-relaxed"
            />
            {headline && (
              <p className="text-xs sm:text-sm font-serif italic text-amber-300/90 leading-relaxed">
                Specialized as {headline}
              </p>
            )}
          </div>

          {/* Quick Badges & Contacts */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {userEmail && (
              <a
                href={`mailto:${userEmail}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6B1A] hover:bg-[#ff853a] text-black font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-[0_0_25px_rgba(255,107,26,0.4)] transition-all hover:scale-105"
              >
                <Mail className="w-4 h-4" /> Get In Touch
              </a>
            )}
            {github_url && (
              <a
                href={github_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-mono text-white transition-all"
              >
                <Github className="w-4 h-4 text-[#FF6B1A]" /> GitHub
              </a>
            )}
            {linkedin_url && (
              <a
                href={linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-mono text-white transition-all"
              >
                <Linkedin className="w-4 h-4 text-[#FF6B1A]" /> LinkedIn
              </a>
            )}
          </div>
        </section>

        {/* 2. 3D TILT PROFILE CARD SECTION (IDENTITY) */}
        <section id="profile" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-10 border-y border-white/10">
          <div className="space-y-6">
            <span className="text-[10px] text-[#FF6B1A] font-mono tracking-[0.3em] uppercase font-bold">
              [ 01 ] Interactive Studio Card
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Identity & <span className="font-serif italic text-[#FF6B1A] font-normal">Atmosphere</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              Hover over the 3D studio card to experience dynamic perspective tilt, directional lighting glare, and backing warm ambient orange reflections.
            </p>

            <div className="space-y-3 font-mono text-xs text-slate-300">
              {location && (
                <div className="flex items-center gap-2 p-3 bg-white/[0.03] border border-white/10 rounded-xl">
                  <MapPin className="w-4 h-4 text-[#FF6B1A]" />
                  <span>Base Location: {location}</span>
                </div>
              )}
              {userEmail && (
                <div className="flex items-center gap-2 p-3 bg-white/[0.03] border border-white/10 rounded-xl">
                  <Mail className="w-4 h-4 text-[#FF6B1A]" />
                  <span>Direct Email: {userEmail}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <ProfileCard
              name={full_name}
              title={headline}
              handle={userHandle}
              avatarUrl={userAvatar}
              status="Available for Hire"
              contactText="Hire Me"
              showUserInfo={true}
              enableTilt={true}
              onContactClick={() => {
                if (userEmail) window.location.href = `mailto:${userEmail}`;
              }}
            />
          </div>
        </section>

        {/* 3. 3D CIRCULAR GALLERY & PROJECT SHOWCASE */}
        <section id="projects" className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-4 gap-2">
            <div>
              <span className="text-[10px] text-[#FF6B1A] font-mono tracking-[0.3em] uppercase font-bold">
                [ 02 ] Selected Works
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                3D Interactive <span className="font-serif italic text-[#FF6B1A] font-normal">Project Deck</span>
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-mono">Drag or scroll to rotate wheel gallery</p>
          </div>

          {/* 3D Wheel Canvas */}
          <div className="w-full h-[400px] bg-[#0A0A0F] border border-white/10 rounded-3xl overflow-hidden relative shadow-2xl">
            <CircularGallery
              items={galleryItems}
              bend={3}
              textColor="gradient"
              borderRadius={0.06}
              font="bold 28px 'Space Grotesk', sans-serif"
              scrollSpeed={2}
              onItemClick={(idx) => {
                setSelectedProject(galleryItems[idx]);
              }}
            />
          </div>

          {/* Fallback Glassmorphic Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {galleryItems.map((proj) => (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="bg-white/[0.03] border border-white/10 hover:border-[#FF6B1A]/60 transition-all duration-300 rounded-2xl p-6 space-y-4 cursor-pointer group hover:shadow-[0_0_30px_rgba(255,107,26,0.2)]"
              >
                {proj.image && (
                  <div className="h-44 rounded-xl overflow-hidden border border-white/10 relative">
                    <img
                      src={proj.image}
                      alt={proj.text}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg text-white group-hover:text-[#FF6B1A] transition-colors">
                      {proj.text}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#FF6B1A] transition-colors" />
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">{proj.description}</p>
                </div>

                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 bg-[#FF6B1A]/10 text-[#FF6B1A] text-[10px] font-mono rounded border border-[#FF6B1A]/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 4. SKILLS & EXPERIENCE MATRIX */}
        <section id="skills" className="space-y-8">
          <div className="border-b border-white/10 pb-4">
            <span className="text-[10px] text-[#FF6B1A] font-mono tracking-[0.3em] uppercase font-bold">
              [ 03 ] Competencies
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Tech Arsenal & <span className="font-serif italic text-[#FF6B1A] font-normal">Career History</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Skills */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-mono font-bold text-[#FF6B1A] uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF6B1A]" /> Technical Stack
              </h3>
              <div className="flex flex-wrap gap-2.5 pt-2">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center space-x-2 px-3.5 py-1.5 bg-[#121218] border border-white/10 hover:border-[#FF6B1A]/50 rounded-xl transition-colors"
                  >
                    <span className="text-xs font-medium text-white">{skill.name}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#FF6B1A]/20 text-[#FF6B1A] rounded uppercase font-bold">
                      {skill.level || 'PRO'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience & Education */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-6" id="experience">
              {experiences.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xs font-mono font-bold text-[#FF6B1A] uppercase tracking-widest flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#FF6B1A]" /> Work Timeline
                  </h3>
                  <div className="space-y-4 border-l-2 border-[#FF6B1A]/40 pl-4">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="space-y-1">
                        <div className="flex justify-between items-baseline flex-wrap gap-1">
                          <h4 className="font-bold text-sm text-white">{exp.company}</h4>
                          <span className="text-[10px] font-mono text-[#FF6B1A]">{exp.start_date} – {exp.end_date}</span>
                        </div>
                        <div className="text-xs font-mono text-amber-300">{exp.role}</div>
                        <p className="text-xs text-slate-400 leading-relaxed">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {education.length > 0 && (
                <div className="space-y-4 pt-2">
                  <h3 className="text-xs font-mono font-bold text-[#FF6B1A] uppercase tracking-widest flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#FF6B1A]" /> Education
                  </h3>
                  <div className="space-y-4 border-l-2 border-amber-500/40 pl-4">
                    {education.map((edu) => (
                      <div key={edu.id} className="space-y-1">
                        <div className="flex justify-between items-baseline flex-wrap gap-1">
                          <h4 className="font-bold text-sm text-white">{edu.institution}</h4>
                          <span className="text-[10px] font-mono text-amber-400">{edu.start_year} – {edu.end_year}</span>
                        </div>
                        <div className="text-xs font-mono text-slate-300">{edu.degree} {edu.field && `| ${edu.field}`}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* 5. CONTACT & FOOTER */}
        <section id="contact" className="bg-gradient-to-r from-[#FF6B1A]/20 via-amber-600/10 to-[#FF6B1A]/20 border border-[#FF6B1A]/30 rounded-3xl p-8 sm:p-14 text-center space-y-6 relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
              Let's build something <span className="font-serif italic text-[#FF6B1A] font-normal">extraordinary</span>.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              Interested in working together or reviewing project technical blueprints? Let's connect.
            </p>
          </div>

          {userEmail && (
            <div className="pt-2">
              <a
                href={`mailto:${userEmail}`}
                className="inline-flex items-center space-x-2 bg-[#FF6B1A] hover:bg-[#ff853a] text-black font-heading font-extrabold text-sm px-8 py-3.5 rounded-full shadow-[0_0_30px_rgba(255,107,26,0.5)] transition-all hover:scale-105"
              >
                <Send className="w-4 h-4" />
                <span>Email {userEmail}</span>
              </a>
            </div>
          )}

          <div className="pt-8 border-t border-white/10 text-xs font-mono text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
            <span>© {new Date().getFullYear()} {full_name}. Built with StackFolio.</span>
            <span>Cinematic Space Engine</span>
          </div>
        </section>

      </div>

      {/* PROJECT SHOWCASE MODAL OVERLAY */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0F1015] border border-white/15 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl p-6 space-y-5 animate-fadeIn relative">
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <h3 className="font-heading font-black text-xl text-white">{selectedProject.text}</h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 text-slate-400 hover:text-white border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedProject.image && (
              <div className="h-56 rounded-xl overflow-hidden border border-white/10">
                <img src={selectedProject.image} alt={selectedProject.text} className="w-full h-full object-cover" />
              </div>
            )}

            <p className="text-xs text-slate-300 leading-relaxed font-sans">{selectedProject.description}</p>

            {selectedProject.technologies && selectedProject.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.technologies.map(t => (
                  <span key={t} className="px-2.5 py-1 bg-[#FF6B1A]/15 text-[#FF6B1A] font-mono text-xs rounded border border-[#FF6B1A]/30">
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              {selectedProject.github_url && (
                <a
                  href={selectedProject.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-4 h-4" /> Code Repo
                </a>
              )}
              {selectedProject.live_url && (
                <a
                  href={selectedProject.live_url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-[#FF6B1A] hover:bg-[#ff853a] text-black font-mono text-xs font-extrabold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
