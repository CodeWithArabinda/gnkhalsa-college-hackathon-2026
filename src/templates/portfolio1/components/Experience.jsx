import React from 'react';
import { Briefcase, Calendar, Building, Sparkles } from 'lucide-react';

export default function Experience({ experience = [] }) {
  const fallbackExperience = [
    {
      company: "Acme Creative Studio",
      role: "Lead 3D & WebGL Architect",
      period: "2024 — Present",
      description: "Pioneered real-time WebGL interactive 3D viewports, GSAP motion physics, and high-performance React architectures."
    },
    {
      company: "Nexus Software Labs",
      role: "Senior Full Stack Engineer",
      period: "2022 — 2024",
      description: "Engineered distributed microservice API pipelines, WebSocket streaming state, and modern design system tokens."
    }
  ];

  const listToUse = experience.length > 0 ? experience : fallbackExperience;

  return (
    <section id="experience" className="px-6 sm:px-12 py-20 max-w-7xl mx-auto border-t border-white/10 space-y-10">
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight font-heading">WORK EXPERIENCE</h2>
          <p className="text-xs text-slate-400 font-mono mt-1">Career timeline & engineering milestones</p>
        </div>
        <span className="text-xs font-mono text-[#FFE600] bg-[#FFE600]/10 px-3 py-1 rounded-md border border-[#FFE600]/30 font-bold">
          MILESTONES: {listToUse.length}
        </span>
      </div>

      <div className="relative border-l-2 border-white/20 ml-4 pl-6 sm:pl-10 space-y-8">
        {listToUse.map((exp, idx) => (
          <div key={exp.company + idx} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-black border-2 border-[#FFE600] flex items-center justify-center shadow-[0_0_10px_rgba(255,230,0,0.5)]">
              <span className="w-2 h-2 rounded-full bg-[#FFE600]" />
            </div>

            <div className="bg-[#121212] border border-white/15 rounded-2xl p-6 space-y-3 shadow-lg group-hover:border-[#FFE600] transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#FFE600]" />
                  <span className="text-sm font-mono font-bold text-white uppercase tracking-wider">{exp.company}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#FFE600] bg-[#FFE600]/10 px-3 py-0.5 rounded-full border border-[#FFE600]/20 font-bold">
                  <Calendar className="w-3.5 h-3.5 text-[#FFE600]" />
                  <span>{exp.period || exp.dates}</span>
                </div>
              </div>

              <h3 className="text-xl font-black text-white font-heading">{exp.role || exp.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">{exp.description || exp.details}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
