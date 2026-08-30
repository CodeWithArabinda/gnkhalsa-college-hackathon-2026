import React from 'react';
import { Mail, Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

export default function Contact({ contact = {}, name = "GUPTA" }) {
  const email = contact.email || "nilesh@example.com";
  const github = contact.github || "https://github.com";
  const linkedin = contact.linkedin || "https://linkedin.com";
  const twitter = contact.twitter || "https://x.com";

  return (
    <footer id="contact" className="border-t border-white/10 bg-black py-16 px-6 sm:px-12 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/10 pb-12">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-3xl font-black text-white uppercase font-heading">LET'S BUILD TOGETHER</h3>
          <p className="text-sm text-slate-400 font-mono">Available for full-time roles, WebGL engineering & design system consulting.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${email}`}
            className="px-8 py-3.5 bg-[#FFE600] hover:bg-[#ebd300] text-black font-black text-xs font-mono rounded-xl shadow-[4px_4px_0px_#000] transition-all flex items-center gap-2"
          >
            <Mail className="w-4 h-4 text-black" />
            <span>EMAIL {email}</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
        <p>© 2026 {name}. Built with StackFolio 3D Interactive Engine.</p>
        <div className="flex items-center gap-4 text-slate-400">
          <a href={github} target="_blank" rel="noreferrer" className="hover:text-[#FFE600] transition-colors"><Github className="w-4 h-4" /></a>
          <a href={linkedin} target="_blank" rel="noreferrer" className="hover:text-[#FFE600] transition-colors"><Linkedin className="w-4 h-4" /></a>
          <a href={twitter} target="_blank" rel="noreferrer" className="hover:text-[#FFE600] transition-colors"><Twitter className="w-4 h-4" /></a>
        </div>
      </div>
    </footer>
  );
}
