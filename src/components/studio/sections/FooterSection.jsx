import React from 'react';
import { Github, Linkedin, Twitter, Youtube, Instagram } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className="bg-slate-900 text-white py-12 px-8 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-8">
        
        {/* Left Brand Stack */}
        <div className="space-y-1 text-center md:text-left">
          <h3 className="font-extrabold text-lg tracking-tight text-white">
            WebDev Portfolio
          </h3>
          <p className="text-xs text-slate-400 font-normal max-w-sm">
            Architecting modern digital experiences with React 18, Vite, and Wix Harmony design systems.
          </p>
        </div>

        {/* Circular Social Badges */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-[#0053ff] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-[#0053ff] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-[#0053ff] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-[#0053ff] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="YouTube"
          >
            <Youtube className="w-4 h-4" />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-[#0053ff] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="max-w-6xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono">
        <p>© 2026 WebDev Portfolio. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">Built with StackFolio AI Studio</p>
      </div>

    </footer>
  );
}
