import React from 'react';
import { Sparkles, Download, ArrowUpRight, Github, Linkedin, Twitter } from 'lucide-react';

export default function Hero({ data = {} }) {
  const name = data.name || "GUPTA";
  const tagline = data.tagline || "Full Stack Web Developer & 3D Interactive Architect";
  const bio = data.bio || "Building high-throughput WebGL applications, 3D interactive canvases, and modern web software with GSAP and Spline.";
  const socials = data.socials || {};

  return (
    <section id="hero" className="min-h-[80vh] px-6 sm:px-12 py-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative">
      <div className="lg:col-span-8 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFE600]/10 border border-[#FFE600]/30 rounded-full text-xs font-mono font-bold text-[#FFE600]">
          <Sparkles className="w-3.5 h-3.5 text-[#FFE600]" />
          <span>3D INTERACTIVE DEVELOPER ARCHITECTURE</span>
        </div>

        <h1 className="text-6xl sm:text-8xl font-black text-white leading-none tracking-tight uppercase font-heading">
          {name}
        </h1>

        <p className="text-xl sm:text-2xl font-bold text-[#FFE600] font-heading tracking-tight">
          {tagline}
        </p>

        <p className="text-slate-400 text-base leading-relaxed max-w-xl font-normal font-sans">
          {bio}
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href="#contact"
            className="px-8 py-4 bg-[#FFE600] hover:bg-[#ebd300] text-black font-black text-xs font-mono rounded-xl shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2"
          >
            <span>HIRE ME</span>
            <ArrowUpRight className="w-4 h-4 text-black" />
          </a>

          <button
            type="button"
            onClick={() => alert("Downloading resume...")}
            className="px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-300" />
            <span>RESUME</span>
          </button>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 pt-4 text-slate-400">
          <a href={socials.github || "https://github.com"} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FFE600] hover:text-black transition-colors">
            <Github className="w-4 h-4" />
          </a>
          <a href={socials.linkedin || "https://linkedin.com"} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FFE600] hover:text-black transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href={socials.twitter || "https://x.com"} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FFE600] hover:text-black transition-colors">
            <Twitter className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
