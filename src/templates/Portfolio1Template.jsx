import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ExternalLink, Download, ArrowUpRight, Cpu, Sparkles, Terminal, Code, Layers } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

export default function Portfolio1Template({ portfolio = {} }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSkillKey, setActiveSkillKey] = useState(0);

  // Safely extract props with fallbacks
  const fullName = portfolio.full_name || portfolio.name || portfolio.personal?.name || 'GUPTA';
  const headline = portfolio.headline || portfolio.title || portfolio.personal?.tagline || 'Full Stack Web Developer & 3D Interactive Architect';
  const bio = portfolio.bio || portfolio.summary || portfolio.personal?.bio || 'Building high-throughput WebGL applications, 3D interactive canvases, and modern web software.';
  const email = portfolio.contact_email || portfolio.email || portfolio.contact?.email || 'nilesh@example.com';
  const githubUrl = portfolio.github_url || portfolio.contact?.github || 'https://github.com';
  const linkedinUrl = portfolio.linkedin_url || portfolio.contact?.linkedin || 'https://linkedin.com';
  const twitterUrl = portfolio.twitter_url || portfolio.contact?.twitter || 'https://x.com';

  const projects = portfolio.projects?.length > 0 ? portfolio.projects : [
    {
      title: "Spline 3D Interactive Canvas",
      description: "Real-time 3D viewport with smooth WebGL camera control and custom GLTF models.",
      tags: ["Spline", "Three.js", "GSAP"],
      image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
      project_url: "https://github.com"
    },
    {
      title: "GSAP Lenis Kinetic Physics",
      description: "High-performance scroll-driven animations with inertial physics.",
      tags: ["GSAP", "Lenis", "React 18"],
      image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
      project_url: "https://github.com"
    },
    {
      title: "Distributed Telemetry Engine",
      description: "Real-time streaming telemetry dashboard with WebSocket hooks.",
      tags: ["Node.js", "TypeScript", "Redis"],
      image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop",
      project_url: "https://github.com"
    }
  ];

  // Map skills to keycaps for 3D Interactive Tech Stack Keyboard
  const rawSkills = portfolio.skills?.length > 0 ? portfolio.skills : [
    { name: "React 18", key: "Q", category: "FRONTEND" },
    { name: "TypeScript", key: "W", category: "LANGUAGES" },
    { name: "Three.js / WebGL", key: "E", category: "3D & GRAPHICS" },
    { name: "GSAP Animation", key: "R", category: "MOTION" },
    { name: "Node.js", key: "T", category: "BACKEND" },
    { name: "Tailwind CSS", key: "Y", category: "STYLING" },
    { name: "Supabase DB", key: "U", category: "DATABASE" },
    { name: "Docker & Cloud", key: "I", category: "DEVOPS" }
  ];

  const skillKeys = rawSkills.map((s, idx) => ({
    name: typeof s === 'string' ? s : (s.name || s.skill_name || 'React'),
    category: s.category || (idx % 2 === 0 ? 'ENGINEERING' : 'ARCHITECTURE'),
    key: s.key || String.fromCharCode(65 + (idx % 26))
  }));

  const activeSkill = skillKeys[activeSkillKey] || skillKeys[0];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-100 font-sans selection:bg-[#FFE600] selection:text-black relative overflow-x-hidden">
      
      {/* 1. TOP STICKY GLASS NAVBAR */}
      <header className="w-full h-20 px-6 sm:px-12 flex items-center justify-between sticky top-0 z-40 bg-[#0A0A0A]/85 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FFE600] text-black font-black flex items-center justify-center border border-black shadow-[2px_2px_0px_#000]">
            ⚡
          </div>
          <span className="font-heading font-black text-xl tracking-tight text-white uppercase">{fullName}</span>
        </div>

        <nav className="flex items-center space-x-6 text-xs font-mono font-bold">
          <a href="#hero" className="text-slate-400 hover:text-[#FFE600] transition-colors">// HERO</a>
          <a href="#projects" className="text-slate-400 hover:text-[#FFE600] transition-colors">// WORKS</a>
          <a href="#skills-keyboard" className="text-slate-400 hover:text-[#FFE600] transition-colors">// TECH KEYBOARD</a>
          <a href={`mailto:${email}`} className="px-5 py-2 bg-[#FFE600] text-black font-black rounded-lg shadow-[3px_3px_0px_#000] hover:bg-[#ebd300] transition-all">
            HIRE ME
          </a>
        </nav>
      </header>

      {/* 2. RESTORED 3D HERO SECTION (LEFT DISPLAY TITLE + RIGHT 3D KEYBOARD ENGINE) */}
      <section id="hero" className="min-h-[85vh] px-6 sm:px-12 py-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
        
        {/* HERO LEFT COLUMN */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFE600]/10 border border-[#FFE600]/30 rounded-full text-xs font-mono font-bold text-[#FFE600]">
            <Sparkles className="w-3.5 h-3.5 text-[#FFE600]" />
            <span>3D INTERACTIVE DEVELOPER ARCHITECTURE</span>
          </div>

          <h1 className="text-6xl sm:text-8xl font-black text-white leading-none tracking-tight uppercase">
            {fullName}
          </h1>

          <p className="text-xl sm:text-2xl font-bold text-[#FFE600] font-heading tracking-tight">
            {headline}
          </p>

          <p className="text-slate-400 text-base leading-relaxed max-w-lg font-normal">
            {bio}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={`mailto:${email}`}
              className="px-8 py-4 bg-[#FFE600] hover:bg-[#ebd300] text-black font-black text-xs font-mono rounded-xl shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2"
            >
              <span>HIRE ME</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </a>

            <button
              type="button"
              onClick={() => alert("Downloading resume...")}
              className="px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs rounded-xl border border-white/20 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-slate-300" />
              <span>DOWNLOAD RESUME</span>
            </button>
          </div>

          {/* Social Icon Links */}
          <div className="flex items-center gap-4 pt-4 text-slate-400">
            <a href={githubUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FFE600] hover:text-black transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href={linkedinUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FFE600] hover:text-black transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href={twitterUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FFE600] hover:text-black transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* HERO RIGHT COLUMN: 3D INTERACTIVE KEYBOARD WIDGET & SPLINE CANVAS */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
          <div className="w-full bg-[#121212] border-2 border-white/15 rounded-3xl p-6 shadow-[0_0_40px_rgba(255,230,0,0.1)] space-y-6 relative overflow-hidden">
            
            {/* Viewport Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs font-mono text-slate-400 ml-2">tech-keyboard-3d.view</span>
              </div>
              <span className="text-[10px] font-mono text-[#FFE600] bg-[#FFE600]/10 px-2.5 py-0.5 rounded border border-[#FFE600]/30 font-bold">
                INTERACTIVE 3D
              </span>
            </div>

            {/* Embedded 3D Spline Canvas Frame */}
            <div className="w-full h-48 rounded-2xl overflow-hidden bg-black/60 relative border border-white/10">
              <iframe
                src="https://my.spline.design/cubes-99a38ffed1a24d5885c3bb2034bc4465/"
                frameBorder="0"
                width="100%"
                height="100%"
                title="3D Keyboard Viewport"
                className="w-full h-full object-cover"
              />
            </div>

            {/* 3D Tech Stack Keycaps Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>PRESS KEYCAP TO INSPECT SKILL:</span>
                <span className="text-[#FFE600] font-bold">{activeSkill.category}</span>
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {skillKeys.map((s, idx) => {
                  const isActive = idx === activeSkillKey;
                  return (
                    <button
                      key={s.key + idx}
                      type="button"
                      onClick={() => setActiveSkillKey(idx)}
                      className={`p-3 rounded-xl border font-mono font-black text-sm flex flex-col items-center justify-center transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#FFE600] text-black border-black shadow-[3px_3px_0px_#000] scale-105'
                          : 'bg-white/5 text-white border-white/15 hover:bg-white/15'
                      }`}
                    >
                      <span className="text-lg">{s.key}</span>
                      <span className="text-[9px] font-semibold tracking-tighter truncate max-w-full">{s.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Skill Inspector Box */}
              <div className="bg-black/80 border border-white/15 p-3 rounded-xl flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">ACTIVE MODULE:</span>
                <span className="text-[#FFE600] font-bold text-sm">{activeSkill.name}</span>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 3. PROJECTS CAROUSEL / SHOWCASE SECTION */}
      <section id="projects" className="px-6 sm:px-12 py-20 max-w-7xl mx-auto border-t border-white/10 space-y-10">
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">FEATURED SHOWCASES</h2>
            <p className="text-xs text-slate-400 font-mono mt-1">High-impact WebGL software & creative applications</p>
          </div>
          <span className="text-xs font-mono text-[#FFE600] bg-[#FFE600]/10 px-3 py-1 rounded-md border border-[#FFE600]/30 font-bold">
            SHOWCASES: {projects.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <div
              key={proj.title || idx}
              onClick={() => setSelectedProject(proj)}
              className="bg-[#121212] border border-white/15 rounded-2xl p-5 space-y-4 hover:border-[#FFE600] transition-all cursor-pointer group shadow-lg"
            >
              <div className="rounded-xl overflow-hidden aspect-[16/10] bg-slate-900 relative">
                <img src={proj.image_url || proj.imageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop"} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 bg-[#FFE600] text-black font-mono font-black text-xs rounded-lg shadow-md">INSPECT PROJECT ➔</span>
                </div>
              </div>
              <h3 className="font-mono font-black text-lg text-white group-hover:text-[#FFE600] transition-colors">{proj.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{proj.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                {proj.tags?.map((t) => (
                  <span key={t} className="px-2.5 py-0.5 bg-white/5 text-slate-300 font-mono text-[10px] rounded border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RADIX DIALOG SHOWCASE MODAL */}
      <Dialog.Root open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-fadeIn" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-[#121212] border-2 border-[#FFE600] p-6 rounded-2xl shadow-[0_0_40px_rgba(255,230,0,0.25)] z-50 font-sans space-y-5">
            <div className="flex justify-between items-start">
              <Dialog.Title className="text-2xl font-mono font-black text-white">{selectedProject?.title}</Dialog.Title>
              <Dialog.Close className="text-slate-400 hover:text-white font-bold text-lg cursor-pointer">✕</Dialog.Close>
            </div>
            <div className="rounded-xl overflow-hidden aspect-video bg-slate-900">
              <img src={selectedProject?.image_url || selectedProject?.imageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop"} alt={selectedProject?.title} className="w-full h-full object-cover" />
            </div>
            <Dialog.Description className="text-sm text-slate-300 leading-relaxed font-normal">
              {selectedProject?.description}
            </Dialog.Description>
            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <a href={selectedProject?.project_url || '#'} target="_blank" rel="noreferrer" className="px-5 py-2.5 bg-[#FFE600] text-black font-mono font-black text-xs rounded-lg flex items-center gap-1.5">
                <span>OPEN PROJECT</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* FOOTER */}
      <footer className="py-12 text-center font-mono text-xs text-slate-500 border-t border-white/10 bg-black">
        <p>© 2026 {fullName}. Built with StackFolio 3D Interactive Engine.</p>
      </footer>
    </div>
  );
}
