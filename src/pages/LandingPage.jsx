import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Terminal, ShieldAlert, Award, Star, Compass, ArrowRight, CheckCircle2, Globe, BarChart3, Bot, Sparkles, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';

const SectionDivider = ({ text = "SECTION BREAK" }) => (
  <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] my-16 flex items-center justify-center">
    <div className="w-full border-t-2 border-black" />
    <span className="absolute bg-[#FFE600] border-3 border-black px-6 py-2 shadow-[3px_3px_0px_0px_#000] rounded-none md:rounded-md font-mono text-sm md:text-base font-extrabold tracking-widest text-black uppercase">
      ✦ {text} ✦
    </span>
  </div>
);

export default function LandingPage() {
  const features = [
    {
      step: '01',
      title: 'Upload Resume PDF',
      desc: 'Our parser automatically extracts work experiences, education history, skills, and projects, turning dry text into structured database records.',
      color: 'bg-[#4DEEEA]', // Cyan
      icon: Cpu
    },
    {
      step: '02',
      title: 'Evaluate Readiness Score',
      desc: 'Real-time 100-point rubric highlights missing recruiter requirements like social links, profile picture, or project demo URLs.',
      color: 'bg-[#FF70A6]', // Bubblegum Pink
      icon: ShieldAlert
    },
    {
      step: '03',
      title: 'Pick a Designer Layout',
      desc: 'Instantly toggle between a dark obsidian developer terminal template or a warm light corporate portfolio template without writing code.',
      color: 'bg-[#A8FF78]', // Neon Mint
      icon: Terminal
    },
    {
      step: '04',
      title: 'Publish Permanent URL',
      desc: 'Obtain an immutable shareable slug (e.g. /p/aarya-shah-r4x9) that remains active and stable even when you make content updates.',
      color: 'bg-[#FFAA00]', // Amber Gold
      icon: Award
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[#FFFDF8] bg-grid-pattern relative text-[#0F172A] font-sans antialiased overflow-x-hidden">
      
      {/* HEADER NAVBAR (Sticky SaaS Style - Clean border-b-2) */}
      <header className="sticky top-0 z-50 bg-[#FFFDF8]/95 backdrop-blur-sm border-b-2 border-black px-6 py-4 shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] flex justify-between items-center transition-all">
        {/* Left Logo + BETA Badge */}
        <div className="flex items-center space-x-2 shrink-0">
          <div className="w-8 h-8 bg-[#FFE600] border-2 border-black rounded-lg flex items-center justify-center font-heading font-black text-lg shadow-[2px_2px_0px_0px_#000]">
            ⚡
          </div>
          <span className="font-heading font-extrabold text-xl tracking-tight text-[#0F172A]">StackFolio</span>
          <span className="bg-[#FF70A6] text-black font-mono font-bold text-[9px] px-1.5 py-0.5 border border-black rounded shadow-[1px_1px_0px_0px_#000] rotate-[-2deg]">
            BETA
          </span>
        </div>

        {/* Center Links (Patrick Hand Font - text-2xl) */}
        <nav className="hidden md:flex items-center space-x-8 text-2xl font-hand font-bold tracking-wide text-black shrink-0">
          <a href="#features" className="hover:text-[#FF6B6B] transition-colors">Features</a>
          <a href="#templates" className="hover:text-[#FF6B6B] transition-colors">Templates</a>
          <a href="#rubric" className="hover:text-[#FF6B6B] transition-colors">Readiness Rubric</a>
          <a href="#pricing" className="hover:text-[#FF6B6B] transition-colors">Pricing</a>
        </nav>

        {/* Right Action buttons */}
        <div className="flex items-center space-x-4 shrink-0">
          <Link
            to="/auth"
            className="text-2xl font-hand font-bold tracking-wide text-black hover:text-[#FF6B6B] transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-1.5 text-xs font-black px-4 py-2 bg-[#FFE600] border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all"
          >
            <span>Start Building Free →</span>
          </Link>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto px-6">
        
        {/* HERO SECTION (Massive Centered Neo-Brutalist Layout) */}
        <section className="pt-16 pb-12 flex flex-col items-center text-center px-4 max-w-6xl mx-auto">
          
          {/* Top Badge Pill */}
          <div className="bg-white border-2 border-black px-4 py-1.5 text-xs font-mono font-bold rounded-full shadow-[2px_2px_0px_0px_#000] mb-8 inline-flex items-center gap-2">
            <span>▶</span>
            <span>AI RESUME-TO-PORTFOLIO ENGINE</span>
          </div>

          {/* Massive 3-Line Headline (Rubik Mono One / font-heavy) */}
          <h1 className="font-heavy text-5xl sm:text-7xl lg:text-[86px] leading-[1.08] text-[#15130F] tracking-tight uppercase max-w-5xl mx-auto">
            <div>DITCH STATIC RESUMES.</div>
            <div>BUILD LIVE SITES.</div>
            <div className="relative inline-block my-3 transform -rotate-2">
              <span className="bg-[#FFE600] px-5 sm:px-10 py-1.5 sm:py-2.5 border-3 border-black shadow-[6px_6px_0px_0px_#000] text-black inline-block">
                GET HIRED FASTER.
              </span>
            </div>
          </h1>

          {/* Subheading (Patrick Hand Font) */}
          <p className="font-hand text-2xl sm:text-3xl text-slate-800 max-w-2xl mx-auto mt-6 mb-8 leading-relaxed">
            Upload your resume PDF or image. StackFolio auto-extracts your skills, formats your projects, and generates a live recruiter-ready portfolio in seconds.
          </p>

          {/* Social Proof Metric Grid (4 Neo-Brutalist Boxes) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl my-8">
            <div className="bg-white border-2 border-black rounded-lg p-3 sm:p-4 shadow-[3px_3px_0px_0px_#000] font-mono text-center">
              <div className="text-xl sm:text-2xl font-black text-black">1.2K+</div>
              <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">Portfolios Generated</div>
            </div>

            <div className="bg-white border-2 border-black rounded-lg p-3 sm:p-4 shadow-[3px_3px_0px_0px_#000] font-mono text-center">
              <div className="text-xl sm:text-2xl font-black text-black">100/100</div>
              <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">Recruiter Score</div>
            </div>

            <div className="bg-white border-2 border-black rounded-lg p-3 sm:p-4 shadow-[3px_3px_0px_0px_#000] font-mono text-center">
              <div className="text-xl sm:text-2xl font-black text-black">0</div>
              <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">Code Required</div>
            </div>

            <div className="bg-white border-2 border-black rounded-lg p-3 sm:p-4 shadow-[3px_3px_0px_0px_#000] font-mono text-center">
              <div className="text-xl sm:text-2xl font-black text-black">₹0</div>
              <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">Free Forever Starter</div>
            </div>
          </div>

          {/* Twin CTA Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
            <Link
              to="/dashboard"
              className="bg-[#FFE600] text-black text-xl font-bold px-8 py-4 border-3 border-black rounded-xl shadow-brutal-lg hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] transition-all inline-flex items-center space-x-2"
            >
              <span>Create Portfolio Free →</span>
            </Link>
            <Link
              to="/p/aarya-shah-r4x9"
              className="bg-white text-black text-xl font-bold px-8 py-4 border-3 border-black rounded-xl shadow-brutal-lg hover:bg-slate-50 transition-all inline-flex items-center space-x-2"
            >
              <span>Explore Live Demo ★</span>
            </Link>
          </div>

        </section>

        {/* Bottom Infinite Marquee Banner */}
        <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] border-y-2 border-black bg-white py-3 mb-12 overflow-hidden whitespace-nowrap shadow-[0px_2px_0px_0px_#000]">
          <div className="animate-marquee font-mono text-xs md:text-sm font-bold tracking-widest text-black uppercase select-none">
            <span className="px-4">⚡ AI RESUME PARSER • DUAL NEO-BRUTALIST TEMPLATES • RECRUITER READINESS ENGINE • PERMANENT PUBLIC SLUG • 100% MANUAL OVERRIDE • 1-CLICK AI GAP COMPLETER</span>
            <span className="px-4">⚡ AI RESUME PARSER • DUAL NEO-BRUTALIST TEMPLATES • RECRUITER READINESS ENGINE • PERMANENT PUBLIC SLUG • 100% MANUAL OVERRIDE • 1-CLICK AI GAP COMPLETER</span>
          </div>
        </div>

        {/* Hero -> Features divider */}
        <SectionDivider text="ENGINE FEATURES" />

        {/* FEATURES STEP GRID */}
        <section id="features" className="py-20 scroll-mt-24 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-[#0F172A]">Product Features</h2>
            <p className="font-hand text-xl md:text-2xl text-slate-900 font-medium leading-relaxed tracking-wide max-w-lg mx-auto">
              Transform your career credentials into a high-converting recruiter asset in four simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div key={feat.step} className="bg-white border-3 border-black p-6 rounded-2xl shadow-brutal flex flex-col space-y-4 justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-black font-mono text-slate-300">{feat.step}</span>
                      <div className={`w-8 h-8 rounded-lg border-2 border-black flex items-center justify-center text-black font-black shadow-[1.5px_1.5px_0px_0px_#000] ${feat.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    {/* Card Title scaled to text-2xl */}
                    <h3 className="text-2xl font-heading font-bold text-[#0F172A]">{feat.title}</h3>
                    {/* Card text upgraded to Patrick Hand font */}
                    <p className="font-hand text-lg md:text-xl text-slate-900 font-medium leading-relaxed tracking-wide">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Features -> Templates divider */}
        <SectionDivider text="TEMPLATES SHOWCASE" />

        {/* TEMPLATES PREVIEW SHOWCASE */}
        <section id="templates" className="py-20 scroll-mt-24 bg-white border-3 border-black p-8 rounded-3xl shadow-brutal-lg space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-black">Dual Design Layouts</h2>
              <p className="font-hand text-xl md:text-2xl text-slate-900 font-medium leading-relaxed tracking-wide">
                Swap templates instantly. Your content automatically fits each layout.
              </p>
            </div>
            <Link
              to="/dashboard"
              className="inline-flex items-center space-x-1.5 text-xs font-black px-5 py-2.5 bg-[#FFE600] text-black border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
            >
              <span>Build Yours Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Template A card (LIGHT CORPORATE PREVIEW) */}
            <div className="border-3 border-black rounded-2xl overflow-hidden shadow-brutal bg-[#FFFDF8] p-6 space-y-6 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="inline-block px-2.5 py-1 bg-[#FF70A6] border-2 border-black text-[10px] font-mono font-bold rounded-md shadow-[1.5px_1.5px_0px_0px_#000]">
                  LIGHT CORPORATE
                </span>
                <h3 className="font-heading font-extrabold text-2xl text-[#0F172A]">Warm Neo-Brutalist Layout</h3>
                <p className="font-hand text-lg md:text-xl text-slate-900 font-medium leading-relaxed">
                  High contrast, solid black borders, and warm retro backgrounds designed to stand out for marketing, creative, or client relations roles.
                </p>
              </div>

              {/* Populated Mini-Mockup */}
              <div className="bg-white border-2 border-black rounded-xl p-4.5 shadow-[3px_3px_0px_0px_#000] space-y-4 text-left">
                {/* Header */}
                <div className="flex items-center gap-3 pb-3 border-b-2 border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-[#FFE600] border border-black overflow-hidden shrink-0">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-heading font-black text-xs text-[#0F172A]">Aarya Shah</h4>
                    <p className="text-[9px] font-mono text-slate-500">Corporate Strategy Lead</p>
                  </div>
                </div>

                {/* Bio snippet using Patrick Hand */}
                <p className="font-hand text-base text-slate-800 leading-relaxed">
                  Building tech products at startup velocity. Ex-PM intern at Google.
                </p>

                {/* 2 Mini Projects */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="border border-black p-2 bg-slate-50 rounded shadow-[1px_1px_0px_0px_#000]">
                    <div className="text-[9px] font-bold text-[#0F172A] truncate">SaaS Analytics</div>
                    <div className="text-[8px] text-slate-500 scale-95 origin-left">Data Dashboard</div>
                    <span className="inline-block mt-1 text-[7px] font-mono font-bold bg-[#A8FF78] px-1 border border-black rounded">React</span>
                  </div>
                  <div className="border border-black p-2 bg-slate-50 rounded shadow-[1px_1px_0px_0px_#000]">
                    <div className="text-[9px] font-bold text-[#0F172A] truncate">Confetti Engine</div>
                    <div className="text-[8px] text-slate-500 scale-95 origin-left">Vite JS utility</div>
                    <span className="inline-block mt-1 text-[7px] font-mono font-bold bg-[#4DEEEA] px-1 border border-black rounded">Vite</span>
                  </div>
                </div>

                {/* Contact links */}
                <div className="flex gap-2 text-[8px] font-mono font-bold pt-1 text-slate-400">
                  <span className="text-slate-800">Email ✉</span>
                  <span className="text-slate-800">GitHub ⌨</span>
                  <span className="text-slate-800">LinkedIn 🗂</span>
                </div>
              </div>
            </div>

            {/* Template B card (DARK DEVELOPER PREVIEW) */}
            <div className="border-3 border-black rounded-2xl overflow-hidden shadow-brutal bg-[#0F1117] p-6 space-y-6 flex flex-col justify-between text-white">
              <div className="space-y-3">
                <span className="inline-block px-2.5 py-1 bg-[#38BDF8] border-2 border-white text-[10px] font-mono font-bold text-slate-900 rounded-md shadow-[1.5px_1.5px_0px_0px_#38BDF8]">
                  DARK DEVELOPER
                </span>
                <h3 className="font-heading font-extrabold text-2xl text-white">Obsidian Terminal Layout</h3>
                <p className="font-hand text-lg md:text-xl text-slate-300 font-medium leading-relaxed">
                  Developer terminal experience with cyan borders, monospaced tech tags, and terminal window card headers. Perfect for software engineers.
                </p>
              </div>

              {/* Populated Mini-Mockup */}
              <div className="bg-[#1A1D27] border-2 border-[#38BDF8] rounded-xl overflow-hidden shadow-[3px_3px_0px_0px_#38BDF8] text-left">
                {/* Terminal Title Bar */}
                <div className="bg-[#0F1117] border-b border-[#38BDF8] px-3 py-1.5 flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="pl-1 text-[8px] text-[#38BDF8] font-mono">terminal ~ Aarya Shah</span>
                </div>

                {/* Terminal body content */}
                <div className="p-3.5 space-y-3.5 font-mono text-[9px]">
                  <div>
                    <span className="text-[#38BDF8]">&gt; cat bio.md</span>
                    <p className="text-slate-300 pt-1 leading-relaxed">
                      Frontend Architect. Specializing in high performance web apps.
                    </p>
                  </div>

                  {/* 2 Mini Projects */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="border border-[#38BDF8]/40 p-2 bg-[#0F1117] rounded shadow-[1px_1px_0px_0px_#38BDF8]">
                      <div className="text-white font-bold truncate">Rust Parser</div>
                      <div className="text-slate-500 scale-95 origin-left">PDF AST library</div>
                      <span className="inline-block mt-1 text-[7px] text-[#00FFA3] bg-[#0F1117] px-1 border border-[#00FFA3]/30 rounded">Rust</span>
                    </div>
                    <div className="border border-[#38BDF8]/40 p-2 bg-[#0F1117] rounded shadow-[1px_1px_0px_0px_#38BDF8]">
                      <div className="text-white font-bold truncate">CSS Brutal</div>
                      <div className="text-slate-500 scale-95 origin-left">Neo-styling utility</div>
                      <span className="inline-block mt-1 text-[7px] text-[#00FFA3] bg-[#0F1117] px-1 border border-[#00FFA3]/30 rounded">CSS</span>
                    </div>
                  </div>

                  {/* Contacts */}
                  <div className="text-slate-500 pt-1 flex justify-between scale-95 origin-left">
                    <span>github.com/aarya</span>
                    <span>in/aaryashah</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Templates -> Rubric divider */}
        <SectionDivider text="CHECKLIST RUBRIC" />

        {/* READINESS RUBRIC HIGHLIGHT */}
        <section id="rubric" className="py-20 scroll-mt-24 bg-[#FFFDF8] border-3 border-black p-8 rounded-3xl shadow-brutal flex flex-col md:flex-row gap-8 items-center">
          <div className="space-y-4 md:w-3/5 text-center md:text-left">
            <div className="inline-block bg-[#A8FF78] text-black font-extrabold px-3 py-1 border-2 border-black rounded-full text-xs uppercase shadow-[2px_2px_0px_0px_#000]">
              Recruiter-Ready Scoring
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-[#0F172A]">Recruiter Checklist Rubric</h2>
            <p className="font-hand text-xl md:text-2xl text-slate-900 font-medium leading-relaxed tracking-wide">
              Recruiters spend an average of 6 seconds looking at candidate resumes. StackFolio guides you with a real-time scoring engine that checks for standard parameters: avatar photo, work experience details, verified certificate credentials, contact handles, and active project code repo links.
            </p>
          </div>
          <div className="bg-[#FFE600] border-3 border-black p-6 rounded-2xl md:w-2/5 w-full text-center shadow-brutal relative rotate-[1.5deg] shrink-0">
            <div className="text-4xl font-heading font-black text-black">100 Pts</div>
            <div className="text-xs font-mono font-bold text-black uppercase tracking-wider mt-1">recruiter readiness</div>
            <div className="h-0.5 bg-black my-4" />
            <ul className="text-left text-xs font-bold text-black space-y-1.5 font-mono">
              <li>✓ Profile Meta: 15 Pts</li>
              <li>✓ Core Tech Skills: 15 Pts</li>
              <li>✓ Project Code Links: 35 Pts</li>
              <li>✓ Credential Badges: 25 Pts</li>
              <li>✓ Core Work Timeline: 10 Pts</li>
            </ul>
          </div>
        </section>

        {/* Rubric -> Pricing divider */}
        <SectionDivider text="CHOOSE PLAN" />

        {/* PRICING SECTION */}
        <section id="pricing" className="py-20 scroll-mt-24 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-[#0F172A]">Flexible SaaS Pricing</h2>
            <p className="font-hand text-xl md:text-2xl text-slate-900 font-medium leading-relaxed tracking-wide max-w-lg mx-auto">
              Start building for free or unlock powerful SaaS features to boost your hireability rate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-4">
            
            {/* Free Tier */}
            <div className="bg-white border-3 border-black p-8 rounded-2xl shadow-brutal flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-[#0F172A]">Free Developer</h3>
                    <p className="text-xs text-slate-500 font-medium font-mono">Perfect for starters</p>
                  </div>
                  <div className="text-3xl font-heading font-black text-black">₹0</div>
                </div>

                <div className="w-full h-0.5 bg-black/10" />

                <ul className="space-y-3 text-xs font-bold text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="font-hand text-lg md:text-xl text-slate-900">1 Active Portfolio URL (/p/slug)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="font-hand text-lg md:text-xl text-slate-900">Dark Developer Layout template</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="font-hand text-lg md:text-xl text-slate-900">Supabase Database storage sync</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="font-hand text-lg md:text-xl text-slate-900">Standard PDF resume parser</span>
                  </li>
                </ul>
              </div>

              {/* Upgraded Free Tier Button */}
              <Link
                to="/dashboard"
                className="w-full text-center inline-flex items-center justify-center space-x-1.5 text-base py-3 bg-slate-100 border-2 border-black font-bold shadow-[3px_3px_0px_0px_#000] hover:bg-slate-200 text-black rounded-lg transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
              >
                <span>Deploy Free Portfolio</span>
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="bg-[#FFFDF8] border-3 border-black p-8 rounded-2xl shadow-brutal-lg flex flex-col justify-between space-y-6 relative border-t-8 border-t-[#FFE600]">
              {/* Sticker badge */}
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-[#FF70A6] text-black font-mono font-bold text-[9px] px-2 py-0.5 border border-black rounded shadow-[1.5px_1.5px_0px_0px_#000] uppercase">
                Best Value ★
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-[#0F172A]">StackFolio Pro</h3>
                    <p className="text-xs text-slate-500 font-medium font-mono">For serious job seekers</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-heading font-black text-black">₹199<span className="text-xs font-mono font-bold">/yr</span></div>
                    <span className="text-[9px] text-[#FF70A6] font-mono font-bold">Regular Price: ₹499</span>
                  </div>
                </div>

                <div className="w-full h-0.5 bg-black/10" />

                <ul className="space-y-3 text-xs font-bold text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="font-hand text-lg md:text-xl text-slate-900">Custom domain mapping (e.g. yourname.dev)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="font-hand text-lg md:text-xl text-slate-900">Unlock all Premium layouts (Light Corporate + Dark)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="font-hand text-lg md:text-xl text-slate-900">Recruiter Analytics & view counters dashboard</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="font-hand text-lg md:text-xl text-slate-900">Priority resume parsing & auto-fill recommendations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="font-hand text-lg md:text-xl text-slate-900">AI Interview Candidate Q&A bot helper</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/dashboard"
                className="w-full text-center inline-flex items-center justify-center space-x-1.5 text-base py-3 bg-[#FFE600] text-black border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all"
              >
                <span>Upgrade to Pro ⚡</span>
              </Link>
            </div>

          </div>
        </section>

        {/* Pricing -> Roadmap divider */}
        <SectionDivider text="ROADMAP VISION" />

        {/* ROADMAP SECTION */}
        <section className="py-20 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-[#0F172A]">Future Vision Roadmap</h2>
            <p className="font-hand text-xl md:text-2xl text-slate-900 font-medium leading-relaxed tracking-wide max-w-lg mx-auto">
              We are building the future of hiring interactions. Here is what is landing next.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Milestone 1 */}
            <div className="bg-white border-3 border-black p-6 rounded-2xl shadow-brutal space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#4DEEEA] border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_#000]">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-[#0F172A]">Custom Domain Mapping (.dev)</h3>
              <p className="font-hand text-lg md:text-xl text-slate-900 font-medium leading-relaxed tracking-wide">
                Map your custom subdomain or domain name directly to the StackFolio template rendering engine, providing absolute branding control.
              </p>
            </div>

            {/* Milestone 2 */}
            <div className="bg-white border-3 border-black p-6 rounded-2xl shadow-brutal space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#FF70A6] border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_#000]">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-[#0F172A]">Recruiter View Analytics</h3>
              <p className="font-hand text-lg md:text-xl text-slate-900 font-medium leading-relaxed tracking-wide">
                Receive instant dashboard alerts when recruiters view your portfolio, tracking geography, duration, and which project links they click.
              </p>
            </div>

            {/* Milestone 3 */}
            <div className="bg-white border-3 border-black p-6 rounded-2xl shadow-brutal space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#A8FF78] border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_#000]">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-[#0F172A]">AI Candidate Q&A Bot</h3>
              <p className="font-hand text-lg md:text-xl text-slate-900 font-medium leading-relaxed tracking-wide">
                Embed a custom AI chatbot that responds to interview queries autonomously using context from your database experiences.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t-3 border-black py-8 mt-12 text-center text-xs font-mono font-semibold">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-[#FFE600] border-2 border-black rounded flex items-center justify-center font-heading font-black text-sm shadow-[1.5px_1.5px_0px_0px_#000]">
              ⚡
            </div>
            <span className="font-heading font-extrabold text-sm text-[#0F172A] tracking-tight">StackFolio</span>
          </div>
          <div className="text-slate-500">
            © {new Date().getFullYear()} StackFolio by Team Stack Attack. Built for Hackathon 2026.
          </div>
        </div>
      </footer>

    </div>
  );
}
