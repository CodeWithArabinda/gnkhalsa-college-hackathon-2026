import React from 'react';

export default function SiteHeaderNavbar({ title = "Kshitij Pilankar", scrollToProjects, scrollToContact }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToStory = () => {
    const el = document.getElementById('story-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="w-full h-16 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 sm:px-12 flex items-center justify-between sticky top-0 z-30 font-sans select-none">
      
      {/* Left Brand Title */}
      <div
        onClick={scrollToTop}
        className="font-bold text-base text-slate-900 tracking-tight hover:opacity-80 transition-opacity cursor-pointer flex items-center gap-2"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#0053ff]" />
        <span>{title}</span>
      </div>

      {/* Right Desktop Nav Links */}
      <nav className="flex items-center space-x-1 sm:space-x-4 text-xs sm:text-sm font-medium text-slate-600">
        <button
          type="button"
          onClick={scrollToTop}
          className="hover:text-slate-950 transition-colors cursor-pointer px-3 py-1.5 rounded-full hover:bg-slate-50"
        >
          Home
        </button>

        <button
          type="button"
          onClick={scrollToStory}
          className="hover:text-slate-950 transition-colors cursor-pointer px-3 py-1.5 rounded-full hover:bg-slate-50"
        >
          About
        </button>

        <button
          type="button"
          onClick={scrollToProjects}
          className="hover:text-slate-950 transition-colors cursor-pointer px-3 py-1.5 rounded-full hover:bg-slate-50"
        >
          Selected Works
        </button>

        <button
          type="button"
          onClick={scrollToContact}
          className="bg-[#ff5100] hover:bg-[#e04700] text-white font-bold text-xs px-4 py-2 rounded-full transition-all cursor-pointer shadow-2xs"
        >
          Contact
        </button>
      </nav>

    </header>
  );
}
