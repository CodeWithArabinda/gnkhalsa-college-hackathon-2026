import React from 'react';

export default function SiteHeaderNavbar({ title = "Kshitij Pilankar", archetype = "humanist-light", scrollToProjects, scrollToContact }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToStory = () => {
    const el = document.getElementById('story-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const isCyber = archetype === 'cyber-terminal' || archetype === 'cyber-ai';
  const isBento = archetype === 'bento-minimal';

  return (
    <header className={`w-full h-16 px-6 sm:px-12 flex items-center justify-between sticky top-0 z-30 font-sans select-none backdrop-blur-md transition-colors ${
      isCyber
        ? 'bg-[#090d16]/95 border-b border-cyan-500/20 text-white font-mono'
        : isBento
        ? 'bg-slate-50/90 border-b border-slate-200 text-slate-900'
        : 'bg-white/90 border-b border-slate-100 text-slate-900'
    }`}>
      
      {/* Left Brand Title */}
      <div
        onClick={scrollToTop}
        className="font-bold text-base tracking-tight hover:opacity-80 transition-opacity cursor-pointer flex items-center gap-2"
      >
        <span className={`w-2.5 h-2.5 rounded-full ${
          isCyber ? 'bg-cyan-400 shadow-[0_0_10px_rgba(0,245,255,0.8)]' : isBento ? 'bg-[#0053ff]' : 'bg-[#ff5100]'
        }`} />
        <span className={isCyber ? 'text-cyan-400' : 'text-slate-900'}>{title}</span>
      </div>

      {/* Right Desktop Nav Links */}
      <nav className={`flex items-center space-x-1 sm:space-x-4 text-xs sm:text-sm font-medium ${
        isCyber ? 'text-slate-300 font-mono' : 'text-slate-600'
      }`}>
        <button
          type="button"
          onClick={scrollToTop}
          className={`hover:opacity-100 transition-colors cursor-pointer px-3 py-1.5 rounded-full ${
            isCyber ? 'hover:text-cyan-300 hover:bg-cyan-500/10' : 'hover:text-slate-950 hover:bg-slate-100'
          }`}
        >
          Home
        </button>

        <button
          type="button"
          onClick={scrollToStory}
          className={`hover:opacity-100 transition-colors cursor-pointer px-3 py-1.5 rounded-full ${
            isCyber ? 'hover:text-cyan-300 hover:bg-cyan-500/10' : 'hover:text-slate-950 hover:bg-slate-100'
          }`}
        >
          About
        </button>

        <button
          type="button"
          onClick={scrollToProjects}
          className={`hover:opacity-100 transition-colors cursor-pointer px-3 py-1.5 rounded-full ${
            isCyber ? 'hover:text-cyan-300 hover:bg-cyan-500/10' : 'hover:text-slate-950 hover:bg-slate-100'
          }`}
        >
          Selected Works
        </button>

        <button
          type="button"
          onClick={scrollToContact}
          className={`font-bold text-xs px-4 py-2 rounded-full transition-all cursor-pointer shadow-2xs ${
            isCyber
              ? 'bg-[#00f5ff] hover:bg-[#00d0db] text-black font-black font-mono shadow-[0_0_15px_rgba(0,245,255,0.3)]'
              : isBento
              ? 'bg-slate-900 hover:bg-slate-800 text-white font-bold'
              : 'bg-[#ff5100] hover:bg-[#e04700] text-white font-bold'
          }`}
        >
          Contact
        </button>
      </nav>

    </header>
  );
}
