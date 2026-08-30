import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Briefcase, Code, Sparkles, Terminal, Layers, ArrowUpRight, Cpu } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

export default function Portfolio1Template({ portfolio = {} }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const heroRef = useRef(null);

  // Extract schema props with fallbacks
  const fullName = portfolio.full_name || portfolio.name || 'Nilesh Portfolio';
  const headline = portfolio.headline || portfolio.title || '3D Interactive Developer & Creative Architect';
  const bio = portfolio.bio || portfolio.summary || 'Crafting immersive 3D digital experiences with WebGL, GSAP, and modern web architectures.';
  const email = portfolio.contact_email || portfolio.email || 'nilesh@example.com';
  const githubUrl = portfolio.github_url || 'https://github.com';
  const linkedinUrl = portfolio.linkedin_url || 'https://linkedin.com';
  const projects = portfolio.projects?.length > 0 ? portfolio.projects : [
    {
      title: "Spline 3D Interactive Canvas",
      description: "Real-time 3D viewport with smooth WebGL camera control and custom GLTF models.",
      tags: ["Spline", "Three.js", "GSAP"],
      image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
      project_url: "https://github.com"
    },
    {
      title: "GSAP Lenis Micro-Interactions",
      description: "High-performance scroll-driven animations with inertial kinetic physics.",
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

  const skills = portfolio.skills?.length > 0 ? portfolio.skills : [
    { category: "3D & ANIMATION", name: "Spline 3D / WebGL / GSAP" },
    { category: "FRONTEND ARCHITECTURE", name: "React 18 / Vite / Tailwind CSS" },
    { category: "PERFORMANCE", name: "Lenis / Framer Motion / TypeScript" }
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black relative overflow-x-hidden">
      
      {/* 1. TOP STICKY GLASS NAVBAR */}
      <header className="w-full h-16 px-6 sm:px-12 flex items-center justify-between sticky top-0 z-40 bg-[#07090e]/80 backdrop-blur-md border-b border-cyan-500/20">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,245,255,0.8)]" />
          <span className="font-mono font-bold text-sm text-cyan-400 tracking-wider uppercase">{fullName}</span>
        </div>

        <nav className="flex items-center space-x-6 text-xs font-mono">
          <a href="#hero" className="text-slate-300 hover:text-cyan-400 transition-colors">// HERO</a>
          <a href="#works" className="text-slate-300 hover:text-cyan-400 transition-colors">// WORKS</a>
          <a href="#skills" className="text-slate-300 hover:text-cyan-400 transition-colors">// SKILLS</a>
          <a href={`mailto:${email}`} className="px-4 py-1.5 bg-cyan-400 text-black font-black rounded-lg shadow-[0_0_15px_rgba(0,245,255,0.3)] hover:bg-cyan-300 transition-all">
            CONNECT
          </a>
        </nav>
      </header>

      {/* 2. 3D HERO SECTION WITH SPLINE CANVAS FALLBACK */}
      <section id="hero" ref={heroRef} className="min-h-[85vh] px-6 sm:px-12 py-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-mono text-cyan-400 shadow-[0_0_15px_rgba(0,245,255,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>PORTFOLIO1 // 3D INTERACTIVE ENGINE</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-black text-white leading-[1.05] tracking-tight uppercase">
            {fullName}
          </h1>

          <p className="text-cyan-400 font-mono text-sm font-bold tracking-wide">
            {headline}
          </p>

          <p className="text-slate-400 text-base leading-relaxed max-w-xl font-normal">
            {bio}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#works"
              className="px-7 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-black font-black text-xs font-mono rounded-xl shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all flex items-center gap-2"
            >
              <Cpu className="w-4 h-4 text-black" />
              <span>EXPLORE 3D PROJECTS</span>
            </a>
          </div>
        </div>

        {/* 3D Spline Canvas / Viewport Box */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="w-full aspect-square rounded-3xl bg-[#0f1524] border border-cyan-500/30 shadow-[0_0_30px_rgba(0,245,255,0.15)] overflow-hidden relative group">
            {/* Embedded Interactive Spline 3D Scene Viewport */}
            <iframe
              src="https://my.spline.design/cubes-99a38ffed1a24d5885c3bb2034bc4465/"
              frameBorder="0"
              width="100%"
              height="100%"
              title="Spline 3D Scene"
              className="w-full h-full object-cover pointer-events-auto"
            />
            <div className="absolute bottom-3 left-3 right-3 bg-[#07090e]/90 backdrop-blur-md border border-cyan-500/20 rounded-xl p-2.5 flex items-center justify-between text-[11px] font-mono text-cyan-400">
              <span>● 3D INTERACTIVE CANVAS</span>
              <span className="text-emerald-400">FPS: 60</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WORKS SECTION WITH RADIX DIALOG MODAL */}
      <section id="works" className="px-6 sm:px-12 py-20 max-w-7xl mx-auto border-t border-cyan-500/20 space-y-10">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <h2 className="text-2xl font-mono font-black text-white uppercase">FEATURED 3D SHOWCASES</h2>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-md border border-cyan-500/20">
            TOTAL: {projects.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <div
              key={proj.title || idx}
              onClick={() => setSelectedProject(proj)}
              className="bg-[#0e1424] border border-cyan-500/30 rounded-2xl p-5 space-y-4 hover:border-cyan-400 shadow-[0_0_20px_rgba(0,245,255,0.08)] transition-all cursor-pointer group"
            >
              <div className="rounded-xl overflow-hidden aspect-[16/10] bg-slate-900 relative">
                <img src={proj.image_url || proj.imageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop"} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-cyan-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 bg-cyan-400 text-black font-mono font-bold text-xs rounded-lg shadow-md">VIEW DETAILS ➔</span>
                </div>
              </div>
              <h3 className="font-mono font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">{proj.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 font-sans">{proj.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-cyan-500/20">
                {proj.tags?.map((t) => (
                  <span key={t} className="px-2 py-0.5 bg-cyan-500/10 text-cyan-300 font-mono text-[10px] rounded border border-cyan-500/20">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SKILLS MATRIX SECTION */}
      <section id="skills" className="px-6 sm:px-12 py-20 max-w-7xl mx-auto border-t border-cyan-500/20 space-y-10">
        <h2 className="text-2xl font-mono font-black text-white uppercase">ENGINEERING & 3D STACK</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((s, idx) => (
            <div key={s.name || idx} className="bg-[#0e1424] border border-cyan-500/30 rounded-2xl p-6 space-y-3">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">{s.category || 'SKILLS'}</span>
              <h3 className="text-lg font-bold text-white font-mono">{s.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* RADIX DIALOG MODAL */}
      <Dialog.Root open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-fadeIn" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-[#0e1424] border-2 border-cyan-400 p-6 rounded-2xl shadow-[0_0_40px_rgba(0,245,255,0.3)] z-50 font-sans space-y-5">
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
            <div className="flex justify-end gap-3 pt-3 border-t border-cyan-500/20">
              <a href={selectedProject?.project_url || '#'} target="_blank" rel="noreferrer" className="px-5 py-2 bg-cyan-400 text-black font-mono font-bold text-xs rounded-lg flex items-center gap-1.5">
                <span>OPEN PROJECT</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* FOOTER */}
      <footer className="py-10 text-center font-mono text-xs text-slate-500 border-t border-cyan-500/20 bg-[#05080e]">
        <p>© 2026 {fullName}. Built with StackFolio 3D Interactive Engine.</p>
      </footer>
    </div>
  );
}
