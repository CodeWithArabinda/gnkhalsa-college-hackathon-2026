import React, { useState } from 'react';
import { Cpu, Terminal, Sparkles } from 'lucide-react';

export default function SplineTechStack({ skills = [] }) {
  const [activeKeyIdx, setActiveKeyIdx] = useState(0);

  const fallbackSkills = [
    { name: "React 18", key: "Q", category: "FRONTEND" },
    { name: "TypeScript", key: "W", category: "LANGUAGES" },
    { name: "Three.js / WebGL", key: "E", category: "3D GRAPHICS" },
    { name: "GSAP Motion", key: "R", category: "ANIMATION" },
    { name: "Node.js", key: "T", category: "BACKEND" },
    { name: "Tailwind CSS", key: "Y", category: "STYLING" },
    { name: "Supabase DB", key: "U", category: "DATABASE" },
    { name: "Docker Cloud", key: "I", category: "DEVOPS" }
  ];

  const listToUse = skills.length > 0 ? skills : fallbackSkills;

  const keyItems = listToUse.map((s, idx) => ({
    name: typeof s === 'string' ? s : (s.name || s.skill_name || 'React'),
    category: s.category || (idx % 2 === 0 ? 'ENGINEERING' : 'ARCHITECTURE'),
    key: s.key || String.fromCharCode(81 + (idx % 8))
  }));

  const activeItem = keyItems[activeKeyIdx] || keyItems[0];

  return (
    <section id="skills-keyboard" className="px-6 sm:px-12 py-16 max-w-7xl mx-auto border-t border-white/10 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: 3D Viewport Frame */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs font-mono text-slate-400 ml-2">spline-interactive-keyboard.3d</span>
            </div>
            <span className="text-[10px] font-mono text-[#FFE600] bg-[#FFE600]/10 px-2.5 py-0.5 rounded border border-[#FFE600]/30 font-bold">
              3D CANVAS VIEWPORT
            </span>
          </div>

          <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 relative border border-white/10 shadow-[0_0_30px_rgba(255,230,0,0.1)]">
            <iframe
              src="https://my.spline.design/cubes-99a38ffed1a24d5885c3bb2034bc4465/"
              frameBorder="0"
              width="100%"
              height="100%"
              title="Spline 3D Scene Viewport"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Column: 3D Keycaps Interactive Grid */}
        <div className="lg:col-span-6 bg-[#121212] border-2 border-white/15 rounded-3xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#FFE600]" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">3D TECH STACK KEYBOARD</span>
            </div>
            <span className="text-xs font-mono text-[#FFE600] font-bold">{activeItem.category}</span>
          </div>

          <p className="text-xs text-slate-400 font-mono">
            Press or click any keycap to dynamically inspect engineering stack props:
          </p>

          <div className="grid grid-cols-4 gap-3">
            {keyItems.map((item, idx) => {
              const isActive = idx === activeKeyIdx;
              return (
                <button
                  key={item.key + idx}
                  type="button"
                  onClick={() => setActiveKeyIdx(idx)}
                  className={`p-3.5 rounded-xl border font-mono font-black text-sm flex flex-col items-center justify-center transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#FFE600] text-black border-black shadow-[3px_3px_0px_#000] scale-105'
                      : 'bg-white/5 text-white border-white/15 hover:bg-white/15'
                  }`}
                >
                  <span className="text-xl font-extrabold">{item.key}</span>
                  <span className="text-[10px] font-semibold truncate max-w-full tracking-tight">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Skill Inspector Pill */}
          <div className="bg-black/90 border border-white/15 p-4 rounded-xl flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">INSPECTED MODULE:</span>
            <span className="text-[#FFE600] font-bold text-sm tracking-wide">{activeItem.name}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
