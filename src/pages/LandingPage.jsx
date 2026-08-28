import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Terminal, ShieldAlert, Award, Star, Compass, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

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
    <div className="min-h-screen bg-grid-pattern text-[#0F172A] font-sans antialiased border-t-8 border-black">
      
      {/* HEADER NAVBAR */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#FFE600] border-2 border-black rounded-lg flex items-center justify-center font-heading font-black text-lg shadow-[2px_2px_0px_0px_#000]">
            ⚡
          </div>
          <span className="font-heading font-extrabold text-xl tracking-tight text-[#0F172A]">StackFolio</span>
        </div>

        <Link
          to="/dashboard"
          className="inline-flex items-center space-x-1.5 text-xs font-black px-4.5 py-2 bg-white border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all"
        >
          <span>Go to Workspace</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </header>

      {/* HERO SECTION */}
      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20 space-y-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Sticker Badges Row */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <span className="inline-block bg-[#FFE600] text-black font-mono font-bold px-3 py-1 border-2 border-black rounded-full text-xs rotate-[-2deg] shadow-[2px_2px_0px_0px_#000]">
                🚀 Resume-to-Portfolio
              </span>
              <span className="inline-block bg-[#4DEEEA] text-black font-mono font-bold px-3 py-1 border-2 border-black rounded-full text-xs rotate-[1deg] shadow-[2px_2px_0px_0px_#000]">
                ⚡ Zero Code Needed
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-heading font-black leading-none tracking-tight text-slate-900">
              Turn your static resume into an <span className="bg-[#FFE600] px-2.5 py-0.5 border-3 border-black inline-block rotate-[-1deg] shadow-brutal my-1">interactive</span> portfolio.
            </h1>
            
            <p className="text-base md:text-lg font-medium text-slate-700 max-w-2xl mx-auto lg:mx-0">
              Stop sending flat PDFs to recruiters. StackFolio turns your job resume into a responsive, beautiful, shareable digital portfolio with live project demos and a permanent public link.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center space-x-2 bg-[#FFE600] text-black font-heading font-black text-base px-8 py-4 border-3 border-black rounded-xl shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all"
              >
                <span>Build Portfolio Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/p/aarya-shah-r4x9"
                className="inline-flex items-center justify-center space-x-2 bg-white text-black font-heading font-black text-base px-8 py-4 border-3 border-black rounded-xl shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all"
              >
                <span>See Demo Profile ★</span>
              </Link>
            </div>
          </div>

          {/* Hero Graphic Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[380px] bg-white border-3 border-black p-6 rounded-2xl shadow-brutal rotate-[1deg] space-y-6">
              <div className="flex justify-between items-center pb-3 border-b-2 border-black/10">
                <span className="font-mono font-bold text-xs text-slate-500">Recruiter Scorecard</span>
                <span className="px-2 py-0.5 bg-[#A8FF78] border-2 border-black rounded text-[10px] font-mono font-bold shadow-[1px_1px_0px_0px_#000]">
                  100/100 🟢
                </span>
              </div>

              {/* Mock profile item */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-black bg-[#FFE600]">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
                    alt="Aarya Shah"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-heading font-black text-base">Aarya Shah</h3>
                  <p className="text-xs text-slate-600 font-mono">BCA Candidate & React Dev</p>
                </div>
              </div>

              {/* Rubric checks showcase */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="font-medium text-slate-700">Name & Headline Added (+10)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="font-medium text-slate-700">3 Projects Sync Links (+35)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="font-medium text-slate-700">8 Core Skills Listed (+10)</span>
                </div>
              </div>

              <div className="bg-[#4DEEEA] border-2 border-black p-3.5 rounded-xl text-center font-mono font-bold text-xs shadow-[2px_2px_0px_0px_#000]">
                Link: /p/aarya-shah-r4x9 📋
              </div>
            </div>
          </div>
        </div>

        {/* FEATURES STEP GRID */}
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-5xl font-heading font-black">How It Works</h2>
            <p className="text-slate-600 max-w-lg mx-auto text-sm font-medium">
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
                    <h3 className="text-lg font-heading font-black">{feat.title}</h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">{feat.desc}</p>
                  </div>
                  <div className="w-full h-1 bg-black/10 rounded" />
                </div>
              );
            })}
          </div>
        </div>

        {/* TEMPLATES PREVIEW SHOWCASE */}
        <div className="bg-white border-3 border-black p-8 rounded-3xl shadow-brutal-lg space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-3xl font-heading font-black text-black">Dual Design Layouts</h2>
              <p className="text-sm font-medium text-slate-600">
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
            {/* Template A card */}
            <div className="border-3 border-black rounded-2xl overflow-hidden shadow-brutal bg-[#FFFDF8] p-6 space-y-4">
              <span className="px-2 py-0.5 bg-[#FF70A6] border-2 border-black text-[10px] font-mono font-bold rounded shadow-[1px_1px_0px_0px_#000]">
                LIGHT CORPORATE
              </span>
              <h3 className="font-heading font-black text-xl">Warm Neo-Brutalist Layout</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                High contrast, solid black borders, and warm retro backgrounds designed to stand out for marketing, creative, or client relations roles.
              </p>
              <div className="h-40 bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0px_0px_#000] flex flex-col justify-between font-mono text-[9px] text-slate-400">
                <div>
                  <div className="font-bold text-black text-[11px] mb-1">Aarya Shah</div>
                  <div>★ Portfolio Spotlight</div>
                </div>
                <div className="flex gap-1.5">
                  <span className="px-2 py-0.5 bg-[#4DEEEA] border border-black rounded text-black font-bold">React.js</span>
                  <span className="px-2 py-0.5 bg-[#A8FF78] border border-black rounded text-black font-bold">Vite</span>
                </div>
              </div>
            </div>

            {/* Template B card */}
            <div className="border-3 border-black rounded-2xl overflow-hidden shadow-brutal bg-[#0F1117] p-6 space-y-4 text-white">
              <span className="px-2 py-0.5 bg-[#38BDF8] border-2 border-white text-[10px] font-mono font-bold text-slate-900 rounded shadow-[1px_1px_0px_0px_#38BDF8]">
                DARK DEVELOPER
              </span>
              <h3 className="font-heading font-black text-xl text-white">Obsidian Terminal Layout</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Developer terminal experience with cyan borders, monospaced tech tags, and terminal window card headers. Perfect for software engineers.
              </p>
              <div className="h-40 bg-[#1A1D27] border-2 border-[#38BDF8] rounded-xl overflow-hidden shadow-[3px_3px_0px_0px_#38BDF8] flex flex-col justify-between font-mono text-[9px] text-slate-400">
                <div className="bg-[#0F1117] border-b border-[#38BDF8] p-1.5 flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="pl-1 text-[8px] text-[#38BDF8]">terminal ~ Aarya Shah</span>
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div className="text-white font-bold">&gt; Software Engineer</div>
                  <div className="flex gap-1.5">
                    <span className="px-1.5 py-0.5 bg-[#0F1117] border border-[#00FFA3]/30 text-[#00FFA3] rounded">React.js</span>
                    <span className="px-1.5 py-0.5 bg-[#0F1117] border border-[#00FFA3]/30 text-[#00FFA3] rounded">Node</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
