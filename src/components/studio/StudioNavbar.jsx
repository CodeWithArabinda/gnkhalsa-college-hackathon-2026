import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Tablet, Smartphone, ExternalLink, Rocket, Sparkles, ChevronLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StudioNavbar({ deviceMode, setDeviceMode, schema, onPublish }) {
  const handlePublish = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    if (onPublish) onPublish();
  };

  return (
    <header className="h-16 bg-[#0F1117] border-b-2 border-black px-4 sm:px-6 flex items-center justify-between shrink-0 text-white z-40">
      
      {/* Left Brand Badge */}
      <div className="flex items-center space-x-3">
        <Link to="/dashboard" className="flex items-center text-xs font-mono font-bold text-slate-400 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> Dashboard
        </Link>
        
        <div className="h-4 w-px bg-white/20" />

        <div className="flex items-center space-x-2">
          <span className="font-heading font-black text-lg text-white">StackFolio</span>
          <span className="px-2 py-0.5 bg-[#FF70A6] text-black text-[10px] font-mono font-bold rounded-full border border-black shadow-[1.5px_1.5px_0px_0px_#000]">
            AI STUDIO
          </span>
        </div>
      </div>

      {/* Center Device Switcher */}
      <div className="flex items-center bg-[#1A1D27] border border-white/10 rounded-xl p-1 space-x-1 shadow-inner">
        <button
          type="button"
          onClick={() => setDeviceMode('desktop')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
            deviceMode === 'desktop' ? 'bg-[#FFE600] text-black shadow-[2px_2px_0px_0px_#000]' : 'text-slate-400 hover:text-white'
          }`}
          title="Desktop (1280px)"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Desktop</span>
        </button>

        <button
          type="button"
          onClick={() => setDeviceMode('tablet')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
            deviceMode === 'tablet' ? 'bg-[#FFE600] text-black shadow-[2px_2px_0px_0px_#000]' : 'text-slate-400 hover:text-white'
          }`}
          title="Tablet (768px)"
        >
          <Tablet className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Tablet</span>
        </button>

        <button
          type="button"
          onClick={() => setDeviceMode('mobile')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
            deviceMode === 'mobile' ? 'bg-[#FFE600] text-black shadow-[2px_2px_0px_0px_#000]' : 'text-slate-400 hover:text-white'
          }`}
          title="Mobile (390px)"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Mobile</span>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        {schema?.metadata?.slug && (
          <Link
            to={`/p/${schema.metadata.slug}`}
            target="_blank"
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-mono font-bold text-slate-300 hover:text-white transition-all"
          >
            Live Site <ExternalLink className="w-3 h-3 text-[#38BDF8]" />
          </Link>
        )}

        <button
          type="button"
          onClick={handlePublish}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00FFA3] hover:bg-[#20ffb0] text-black font-heading font-black text-xs uppercase tracking-wider rounded-xl border-2 border-black shadow-brutal transition-all hover:scale-105 active:scale-95"
        >
          <Rocket className="w-4 h-4" />
          <span>Publish</span>
        </button>
      </div>

    </header>
  );
}
