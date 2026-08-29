import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, ExternalLink, Briefcase, GraduationCap, Award, ArrowUpRight, Download, Sparkles, X } from 'lucide-react';
import ProfileCard from './ProfileCard';
import BlurText from './BlurText';
import CircularGallery from './CircularGallery';
import VideoScrub from './VideoScrub';

function safeUrl(url) {
  if (!url) return '#';
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

/* ─── Magnetic CTA ─── */
function MagneticCTA({ href, children }) {
  const ref = useRef(null);
  return (
    <a
      ref={ref}
      href={safeUrl(href)}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={(e) => {
        if (!ref.current) return;
        const b = ref.current.getBoundingClientRect();
        ref.current.style.transform = `translate(${(e.clientX - b.left - b.width / 2) * 0.25}px,${(e.clientY - b.top - b.height / 2) * 0.25}px)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = 'translate(0,0)';
      }}
      className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#ff6b1a] text-black font-black rounded-xl text-[10px] uppercase tracking-[0.25em] hover:bg-[#ff8c42] will-change-transform"
      style={{ transition: 'transform 0.2s cubic-bezier(.23,1,.32,1), background-color 0.3s' }}
    >
      {children}
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M3.5 9.5L9.5 3.5M9.5 3.5H5.5M9.5 3.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </a>
  );
}

/* ─── Fullscreen Project Showcase Modal ─── */
function ProjectShowcaseModal({ items, startIdx, onClose }) {
  const [idx, setIdx] = useState(startIdx || 0);
  const [dir, setDir] = useState(1);
  const locked = useRef(false);
  const touchY = useRef(0);
  const imgRef = useRef(null);
  const current = items[idx];

  const go = useCallback((next) => {
    if (next < 0 || next >= items.length || locked.current || next === idx) return;
    locked.current = true;
    setDir(next > idx ? 1 : -1);
    setIdx(next);
    setTimeout(() => { locked.current = false; }, 600);
  }, [items, idx]);

  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault();
      if (!locked.current) {
        if (e.deltaY > 25) go(idx + 1);
        else if (e.deltaY < -25) go(idx - 1);
      }
    };
    const onTS = (e) => { touchY.current = e.touches[0].clientY; };
    const onTE = (e) => {
      const d = touchY.current - e.changedTouches[0].clientY;
      if (Math.abs(d) > 40) go(d > 0 ? idx + 1 : idx - 1);
    };
    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'j') go(idx + 1);
      else if (e.key === 'ArrowUp' || e.key === 'k') go(idx - 1);
      else if (e.key === 'Escape') onClose();
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTS, { passive: true });
    window.addEventListener('touchend', onTE, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTS);
      window.removeEventListener('touchend', onTE);
      window.removeEventListener('keydown', onKey);
    };
  }, [go, idx, onClose]);

  const slideV = {
    enter: (d) => ({ y: d > 0 ? '8%' : '-8%', opacity: 0 }),
    center: { y: '0%', opacity: 1 },
    exit: (d) => ({ y: d > 0 ? '-8%' : '8%', opacity: 0 }),
  };
  const imageV = { enter: { scale: 1.12, opacity: 0 }, center: { scale: 1.02, opacity: 1 }, exit: { scale: 0.95, opacity: 0 } };
  const spring = { type: 'tween', duration: 0.6, ease: [0.76, 0, 0.24, 1] };

  if (!current) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#060606] overflow-hidden select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="pointer-events-none fixed inset-0 z-[105]"
        style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)' }}
      />

      <AnimatePresence mode="wait" custom={dir}>
        <motion.div key={idx} className="absolute inset-0 flex flex-col md:flex-row" initial="enter" animate="center" exit="exit" custom={dir}>
          
          {/* Left Media Lens */}
          <motion.div
            className="relative w-full md:w-[56%] h-[42vh] md:h-full shrink-0 overflow-hidden cursor-crosshair"
            variants={imageV}
            transition={{ ...spring, duration: 0.7 }}
            onMouseMove={(e) => {
              if (!imgRef.current) return;
              const r = imgRef.current.getBoundingClientRect();
              imgRef.current.style.transform = `scale(1.06) translate(${((e.clientX - r.left) / r.width - 0.5) * 12}px,${((e.clientY - r.top) / r.height - 0.5) * 8}px)`;
            }}
            onMouseLeave={() => {
              if (imgRef.current) imgRef.current.style.transform = 'scale(1.02) translate(0,0)';
            }}
          >
            {current.image ? (
              <img
                ref={imgRef}
                src={current.image}
                alt={current.text}
                className="w-full h-full object-cover will-change-transform"
                style={{ transform: 'scale(1.02)', transition: 'transform 0.4s cubic-bezier(.23,1,.32,1)' }}
              />
            ) : (
              <div className="w-full h-full bg-[#111] flex items-center justify-center text-white/30 text-xs font-mono">
                Project Preview
              </div>
            )}
            <div className="absolute inset-0 hidden md:block" style={{ background: 'linear-gradient(90deg, transparent 55%, #060606 100%)' }} />
            <div className="absolute inset-0 md:hidden" style={{ background: 'linear-gradient(180deg, transparent 40%, #060606 100%)' }} />
          </motion.div>

          {/* Right Details Panel */}
          <motion.div className="flex-1 flex flex-col justify-center px-8 md:px-16 py-6 md:py-0 relative z-10" variants={slideV} custom={dir} transition={spring}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#ff6b1a] font-mono text-xs font-black tracking-[0.3em]">{String(idx + 1).padStart(2, '0')}</span>
              <div className="w-10 h-px bg-white/10" />
              <span className="text-white/20 font-mono text-xs tracking-[0.3em]">{String(items.length).padStart(2, '0')}</span>
            </div>

            <span
              className="inline-block self-start px-3.5 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.4em] mb-4 border"
              style={{ background: 'rgba(255,107,26,0.08)', borderColor: 'rgba(255,107,26,0.15)', color: '#ff6b1a' }}
            >
              {current.category || 'PROJECT'}
            </span>

            <h1 className="font-black text-white leading-[0.95] tracking-[-0.04em] mb-4 text-3xl sm:text-5xl">
              {current.text}
            </h1>

            {current.description && (
              <p className="text-xs sm:text-sm text-white/50 font-light leading-[1.8] mb-6 max-w-md font-sans">
                {current.description}
              </p>
            )}

            {current.tech && current.tech.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-6">
                {current.tech.map((t, i) => (
                  <span key={i} className="px-3 py-1 bg-white/[0.04] border border-white/[0.08] rounded-lg text-[9px] text-[#ff6b1a] tracking-[0.15em] font-mono uppercase">
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              {current.live_url && <MagneticCTA href={current.live_url}>View Live Demo</MagneticCTA>}
              {current.github_url && (
                <a
                  href={safeUrl(current.github_url)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-white/20 text-white/80 hover:text-white hover:border-white/50 rounded-xl text-[10px] uppercase tracking-[0.25em] font-bold transition-all"
                >
                  <Github className="w-3.5 h-3.5" /> Repository
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Side dots */}
      <div className="fixed right-5 md:right-8 top-1/2 -translate-y-1/2 z-[120] flex flex-col items-center gap-3">
        <button
          onClick={() => go(idx - 1)}
          disabled={idx === 0}
          className={`p-2 rounded-full border backdrop-blur-sm transition-all ${idx === 0 ? 'border-white/[0.04] text-white/[0.08] cursor-default' : 'border-white/10 text-white/40 hover:text-white'}`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 7.5l3.5-3.5 3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div className="flex flex-col gap-[6px] py-2">
          {items.map((_, i) => (
            <button key={i} onClick={() => go(i)} title={items[i]?.text} className="flex items-center justify-center">
              <motion.div
                className="rounded-full"
                animate={{ width: i === idx ? 6 : 4, height: i === idx ? 18 : 4, backgroundColor: i === idx ? '#ff6b1a' : 'rgba(255,255,255,0.15)' }}
                transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
              />
            </button>
          ))}
        </div>
        <button
          onClick={() => go(idx + 1)}
          disabled={idx === items.length - 1}
          className={`p-2 rounded-full border backdrop-blur-sm transition-all ${idx === items.length - 1 ? 'border-white/[0.04] text-white/[0.08] cursor-default' : 'border-white/10 text-white/40 hover:text-white'}`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5l3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 md:right-16 z-[120] flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/10 text-[10px] tracking-[0.3em] uppercase transition-all backdrop-blur-md"
      >
        <X className="w-4 h-4" /> Close
      </button>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN CINEMATIC SPACE TEMPLATE (CONTINUOUS LONG-SCROLL)
   ═══════════════════════════════════════════════ */
export default function CinematicSpaceTemplate({ portfolio }) {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [showcaseIdx, setShowcaseIdx] = useState(null);

  if (!portfolio) return null;

  const {
    full_name = 'Developer',
    headline = 'Digital Experience Designer',
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

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'projects', label: 'Archive' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll observer to highlight active nav pill
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'projects', 'about', 'contact'];
      const scrollPos = window.scrollY + window.innerHeight * 0.33;

      for (const sId of sections) {
        const el = document.getElementById(sId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Format projects array for 3D wheel gallery
  const formattedProjects = useMemo(() => {
    const rawList = projects.length > 0 ? projects : [
      { id: 'p1', title: 'Creative Studio Platform', description: 'Next.js & WebGL interactive experience', technologies: ['React', 'WebGL', 'GSAP'], category: 'WEBSITE' },
      { id: 'p2', title: 'AI Workspace Engine', description: 'Real-time intelligent dashboard interface', technologies: ['TypeScript', 'Tailwind', 'AI'], category: 'DESIGNS' },
      { id: 'p3', title: 'Portfolio Architecture', description: 'Modular multi-layout SaaS engine', technologies: ['Vite', 'Supabase', 'React'], category: 'MOBILE' }
    ];

    return rawList.map((p, idx) => ({
      id: p.id || `proj-${idx}`,
      image: p.image_url || `https://picsum.photos/seed/${p.id || idx}/800/600`,
      text: p.title || `Project ${idx + 1}`,
      description: p.description || '',
      tech: p.technologies || p.tech || [],
      category: (p.category || 'WEBSITE').toUpperCase(),
      github_url: p.github_url || '',
      live_url: p.live_url || ''
    }));
  }, [projects]);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'ALL') return formattedProjects;
    return formattedProjects.filter((p) => (p.category || '').toUpperCase().includes(activeCategory.toUpperCase()));
  }, [formattedProjects, activeCategory]);

  const galleryItems = useMemo(() => {
    return filteredProjects.map((p) => ({
      image: p.image,
      text: p.text
    }));
  }, [filteredProjects]);

  const categories = ['ALL', 'WEBSITE', 'DESIGNS', 'MOBILE'];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#080808] text-white font-sans antialiased relative overflow-x-hidden selection:bg-[#ff6b1a] selection:text-black">
      
      {/* Bidirectional 3D Video Scrub Background */}
      <VideoScrub containerRef={containerRef} />

      {/* Ambient lighting glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#ff6b1a]/15 via-amber-900/10 to-transparent rounded-full blur-[150px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#ff6b1a]/5 rounded-full blur-[120px]" />
      </div>

      {/* 1. FIXED TOP FLOATING NAVBAR */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#0A0A0E]/80 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 shadow-2xl flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all relative ${
                  isActive ? 'text-black font-extrabold' : 'text-white/60 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-[#ff6b1a] rounded-full z-0 shadow-[0_0_15px_rgba(255,107,26,0.5)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Resume Download Action */}
        <div className="pl-2 border-l border-white/15">
          <a
            href={userEmail ? `mailto:${userEmail}` : '#'}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-all flex items-center justify-center"
            title="Download Resume / Contact"
          >
            <Download className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* 2. CONTINUOUS LONG-SCROLL CANVAS */}
      <main className="relative z-10">
        
        {/* SECTION 1: HERO OVERVIEW */}
        <section id="overview" className="min-h-screen flex flex-col justify-center px-8 sm:px-16 md:px-24 max-w-5xl mx-auto space-y-8 pt-20">
          <div>
            <p className="text-[10px] md:text-xs text-[#ff6b1a] font-mono font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff6b1a] animate-ping" />
              <span>{headline || 'Digital Experience Designer'}</span>
            </p>

            <h1 className="font-black tracking-tighter text-[clamp(2.5rem,7vw,6.5rem)] leading-none text-white mb-6">
              Hey, I'm <span className="text-[#ff6b1a]">{full_name || 'Developer'}</span>.
            </h1>
          </div>

          <div className="max-w-2xl space-y-4">
            <BlurText
              text={bio || 'I create *immersive* digital experiences that blend design, motion, and technology into something visually *memorable* and smooth to use.'}
              delay={25}
              animateBy="words"
              className="text-base md:text-lg text-white/70 font-light leading-relaxed"
            />
            <BlurText
              text="Combining development with *cinematic* styling, interactive components, and *modern* recruiter-ready presentation."
              delay={20}
              animateBy="words"
              className="text-xs md:text-sm text-white/40 font-light leading-relaxed"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              className="px-6 py-3.5 bg-[#ff6b1a] hover:bg-[#ff843d] text-black font-mono font-black text-xs uppercase tracking-[0.2em] rounded-xl shadow-[0_0_25px_rgba(255,107,26,0.4)] transition-all hover:scale-105"
            >
              Explore Work ↓
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="px-6 py-3.5 border border-white/20 hover:border-white/50 text-white font-mono font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-white/5 transition-all"
            >
              Get In Touch
            </button>
          </div>
        </section>

        {/* SECTION 2: 3D PROJECT ARCHIVE */}
        <section id="projects" className="relative w-full min-h-screen py-24 px-6 sm:px-12 max-w-6xl mx-auto space-y-8 flex flex-col justify-between">
          
          {/* Header Title */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 z-20">
            <div>
              <p className="text-[10px] text-[#ff6b1a] font-mono tracking-[0.4em] uppercase font-bold mb-1">
                Creative
              </p>
              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter text-white">
                Archive.
              </h2>
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full transition-all ${
                    activeCategory === cat ? 'bg-[#ff6b1a] text-black' : 'text-white/40 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 3D Circular Wheel Canvas */}
          <div className="w-full h-[450px] bg-[#0A0A0E]/80 border border-white/10 rounded-3xl overflow-hidden relative shadow-2xl z-10">
            {galleryItems.length > 0 ? (
              <CircularGallery
                key={activeCategory}
                items={galleryItems}
                bend={3}
                textColor="gradient"
                borderRadius={0.06}
                font="bold 28px 'Space Grotesk', sans-serif"
                scrollSpeed={2}
                onItemClick={(idx) => setShowcaseIdx(idx)}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-white/30 font-mono text-xs uppercase tracking-widest">
                No projects found in this category.
              </div>
            )}
          </div>

          {/* Wheel Control Helper */}
          <div className="text-center z-20 font-mono text-[10px] text-white/40 uppercase tracking-[0.3em]">
            Drag or Scroll Wheel to Rotate • Click Card to Open Showcase
          </div>

        </section>

        {/* SECTION 3: ABOUT & 3D PROFILE CARD */}
        <section id="about" className="px-6 sm:px-14 lg:px-16 py-28 max-w-[1250px] mx-auto space-y-16">
          
          {/* Top Grid: Profile Card + Biography */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-12 items-start">
            
            {/* Left Column: Interactive 3D Profile Card */}
            <div className="flex justify-center sticky top-28">
              <ProfileCard
                name={full_name}
                title={headline}
                handle={userHandle}
                avatarUrl={userAvatar}
                status="Available for Hire"
                contactText="Hire Me"
                showUserInfo={true}
                enableTilt={true}
                onContactClick={() => scrollToSection('contact')}
              />
            </div>

            {/* Right Column: Dynamic Candidate Biography */}
            <div className="space-y-6">
              <p className="text-[10px] text-[#ff6b1a] font-mono tracking-[0.4em] uppercase font-bold">
                Biography & Approach
              </p>
              
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Design, Motion & <br />
                <span className="font-serif italic text-[#ff6b1a] font-normal">Modern Tech</span>.
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-white/60 font-light leading-relaxed font-sans">
                <p>{bio || 'Passionate software engineer focused on building responsive, high-performance web applications with modern frontend frameworks and backend databases.'}</p>
              </div>

              {userEmail && (
                <a
                  href={`mailto:${userEmail}`}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#ff6b1a]/40 text-[#ff6b1a] text-[10px] font-mono font-bold uppercase tracking-widest rounded-xl hover:bg-[#ff6b1a] hover:text-black transition-colors"
                >
                  View Resume / Email <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

          </div>

          {/* Bottom 3-Column Skills & Experience Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/10">
            
            {/* Column 1: Tech Stack */}
            <div className="space-y-4">
              <p className="text-[10px] font-mono font-bold text-[#ff6b1a] uppercase tracking-[0.3em]">
                Tech I Work With
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s.id} className="px-3 py-1.5 bg-white/90 rounded-lg text-[10px] font-mono font-bold text-black uppercase">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Column 2: Tools & Credentials */}
            <div className="space-y-4">
              <p className="text-[10px] font-mono font-bold text-[#ff6b1a] uppercase tracking-[0.3em]">
                Credentials & Honors
              </p>
              <div className="space-y-2 font-mono text-xs">
                {achievements.map((ach) => (
                  <div key={ach.id} className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1">
                    <div className="font-bold text-white text-[11px]">{ach.title}</div>
                    <div className="text-[10px] text-white/50">{ach.issuer} · {ach.date}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Career History */}
            <div className="space-y-4">
              <p className="text-[10px] font-mono font-bold text-[#ff6b1a] uppercase tracking-[0.3em]">
                Work & Education
              </p>
              <div className="space-y-3 font-mono">
                {experiences.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-[#ff6b1a]/40 pl-3 py-0.5 space-y-0.5">
                    <h4 className="text-[11px] text-white font-bold">{exp.role}</h4>
                    <p className="text-[10px] text-[#ff6b1a]">{exp.company} ({exp.start_date} – {exp.end_date})</p>
                  </div>
                ))}
                {education.map((edu) => (
                  <div key={edu.id} className="border-l-2 border-amber-500/40 pl-3 py-0.5 space-y-0.5">
                    <h4 className="text-[11px] text-white font-bold">{edu.institution}</h4>
                    <p className="text-[10px] text-slate-400">{edu.degree} ({edu.start_year} – {edu.end_year})</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </section>

        {/* SECTION 4: CONTACT & FOOTER */}
        <section id="contact" className="min-h-screen flex flex-col justify-center items-center text-center px-8 sm:px-16 max-w-4xl mx-auto space-y-8 py-20">
          <span className="text-[10px] text-[#ff6b1a] font-mono tracking-[0.4em] uppercase font-bold">
            [ Contact Trigger ]
          </span>

          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Let's build something <br />
            <span className="font-serif italic text-[#ff6b1a] font-normal">extraordinary together</span>.
          </h2>

          <p className="text-xs sm:text-sm text-white/50 max-w-lg font-sans leading-relaxed">
            Have an ambitious software project or job opportunity? Send a direct email to collaborate.
          </p>

          {userEmail && (
            <div className="pt-4">
              <MagneticCTA href={`mailto:${userEmail}`}>
                Send Email ({userEmail})
              </MagneticCTA>
            </div>
          )}

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 pt-6 text-xs font-mono">
            {github_url && (
              <a href={safeUrl(github_url)} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors">
                <Github className="w-4 h-4 text-[#ff6b1a]" /> GitHub
              </a>
            )}
            {linkedin_url && (
              <a href={safeUrl(linkedin_url)} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4 text-[#ff6b1a]" /> LinkedIn
              </a>
            )}
          </div>

          <footer className="pt-16 text-[10px] font-mono text-white/20 uppercase tracking-widest">
            © {new Date().getFullYear()} {full_name} • Built with StackFolio
          </footer>
        </section>

      </main>

      {/* FULLSCREEN SHOWCASE MODAL OVERLAY */}
      {showcaseIdx !== null && (
        <ProjectShowcaseModal
          items={filteredProjects}
          startIdx={showcaseIdx}
          onClose={() => setShowcaseIdx(null)}
        />
      )}

    </div>
  );
}
