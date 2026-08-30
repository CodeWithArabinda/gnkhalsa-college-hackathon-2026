import React, { useState } from 'react';
import { ExternalLink, Terminal } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

export default function Projects({ projects = [] }) {
  const [selectedProject, setSelectedProject] = useState(null);

  const fallbackProjects = [
    {
      id: "p1",
      title: "Spline 3D Interactive Canvas",
      description: "Real-time 3D viewport with smooth WebGL camera control and custom GLTF models.",
      tags: ["Spline", "Three.js", "GSAP"],
      image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
      project_url: "https://github.com"
    },
    {
      id: "p2",
      title: "GSAP Lenis Kinetic Physics",
      description: "High-performance scroll-driven animations with inertial physics.",
      tags: ["GSAP", "Lenis", "React 18"],
      image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
      project_url: "https://github.com"
    },
    {
      id: "p3",
      title: "Distributed Telemetry Engine",
      description: "Real-time streaming telemetry dashboard with WebSocket hooks.",
      tags: ["Node.js", "TypeScript", "Redis"],
      image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop",
      project_url: "https://github.com"
    }
  ];

  const listToUse = projects.length > 0 ? projects : fallbackProjects;

  return (
    <section id="projects" className="px-6 sm:px-12 py-20 max-w-7xl mx-auto border-t border-white/10 space-y-10">
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight font-heading">FEATURED SHOWCASES</h2>
          <p className="text-xs text-slate-400 font-mono mt-1">High-impact WebGL software & creative applications</p>
        </div>
        <span className="text-xs font-mono text-[#FFE600] bg-[#FFE600]/10 px-3 py-1 rounded-md border border-[#FFE600]/30 font-bold">
          TOTAL: {listToUse.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {listToUse.map((proj, idx) => (
          <div
            key={proj.id || proj.title || idx}
            onClick={() => setSelectedProject(proj)}
            className="bg-[#121212] border border-white/15 rounded-2xl p-5 space-y-4 hover:border-[#FFE600] transition-all cursor-pointer group shadow-lg"
          >
            <div className="rounded-xl overflow-hidden aspect-[16/10] bg-slate-900 relative">
              <img src={proj.image_url || proj.imageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop"} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-4 py-2 bg-[#FFE600] text-black font-mono font-black text-xs rounded-lg shadow-md">INSPECT SHOWCASE ➔</span>
              </div>
            </div>
            <h3 className="font-mono font-black text-lg text-white group-hover:text-[#FFE600] transition-colors">{proj.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{proj.description}</p>
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
              {proj.tags?.map((t) => (
                <span key={t} className="px-2.5 py-0.5 bg-white/5 text-slate-300 font-mono text-[10px] rounded border border-white/10">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* RADIX DIALOG SHOWCASE MODAL */}
      <Dialog.Root open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-fadeIn" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-[#121212] border-2 border-[#FFE600] p-6 rounded-2xl shadow-[0_0_40px_rgba(255,230,0,0.25)] z-50 font-sans space-y-5">
            <div className="flex justify-between items-start">
              <Dialog.Title className="text-2xl font-mono font-black text-white">{selectedProject?.title}</Dialog.Title>
              <Dialog.Close className="text-slate-400 hover:text-white font-bold text-lg cursor-pointer">✕</Dialog.Close>
            </div>
            <div className="rounded-xl overflow-hidden aspect-video bg-slate-900">
              <img src={selectedProject?.image_url || selectedProject?.imageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop"} alt={selectedProject?.title} className="w-full h-full object-cover" />
            </div>
            <Dialog.Description className="text-sm text-slate-300 leading-relaxed font-normal">
              {selectedProject?.description}
            </Dialog.Description>
            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <a href={selectedProject?.project_url || '#'} target="_blank" rel="noreferrer" className="px-5 py-2.5 bg-[#FFE600] text-black font-mono font-black text-xs rounded-lg flex items-center gap-1.5">
                <span>OPEN SHOWCASE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
