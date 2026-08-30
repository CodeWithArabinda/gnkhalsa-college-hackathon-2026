import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Tablet, Smartphone, ExternalLink, ChevronDown, RotateCcw, RotateCw, Zap, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { morphSchemaArchetype } from '../../lib/geminiBuilder';

export default function StudioNavbar({
  deviceMode,
  setDeviceMode,
  schema,
  onPublish,
  onUndo,
  canUndo,
  onRedo,
  canRedo,
  saveStatus = 'saved',
  onResetDefault,
  onMorphArchetype
}) {
  const handlePublish = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    if (onPublish) onPublish();
  };

  const activeArchetype = schema?.archetype || 'humanist-light';

  return (
    <header className="h-[52px] bg-white border-b-[2.5px] border-black px-4 flex items-center justify-between shrink-0 text-slate-900 text-xs font-sans select-none z-30 shadow-[0_3px_0px_#000000]">
      
      {/* Left Core Navigation & Brand */}
      <div className="flex items-center space-x-3">
        <Link to="/dashboard" className="flex items-center space-x-2 group">
          <div className="w-7 h-7 bg-[#FFE600] border-2 border-black rounded-lg flex items-center justify-center font-heading font-black text-xs text-black shadow-[1.5px_1.5px_0px_#000000] group-hover:rotate-6 transition-transform">
            ⚡
          </div>
          <span className="font-heading font-black text-sm tracking-tight text-black">StackFolio</span>
          <span className="bg-pink-400 text-black font-mono font-black text-[9px] px-1.5 py-0.5 border border-black rounded shadow-[1.5px_1.5px_0px_#000000] rotate-[-2deg]">
            BETA
          </span>
        </Link>

        <div className="h-4 w-[2px] bg-black/20" />

        {/* 1-CLICK ARCHETYPE SWITCHER PILL SEGMENT */}
        <div className="hidden xl:flex items-center bg-slate-100 p-0.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000000]">
          <button
            type="button"
            onClick={() => onMorphArchetype && onMorphArchetype('bento-minimal')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer ${
              activeArchetype === 'bento-minimal'
                ? 'bg-slate-900 text-white border-2 border-black shadow-[1px_1px_0px_#000]'
                : 'text-slate-700 hover:text-black border-2 border-transparent'
            }`}
          >
            🍏 Bento Minimal
          </button>

          <button
            type="button"
            onClick={() => onMorphArchetype && onMorphArchetype('cyber-terminal')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer ${
              activeArchetype === 'cyber-terminal' || activeArchetype === 'cyber-ai'
                ? 'bg-[#00f5ff] text-black border-2 border-black shadow-[1px_1px_0px_#000]'
                : 'text-slate-700 hover:text-black border-2 border-transparent'
            }`}
          >
            ⚡ Cyber Terminal
          </button>

          <button
            type="button"
            onClick={() => onMorphArchetype && onMorphArchetype('neo-brutalist')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer ${
              activeArchetype === 'neo-brutalist'
                ? 'bg-[#FFE600] text-black border-2 border-black shadow-[1px_1px_0px_#000]'
                : 'text-slate-700 hover:text-black border-2 border-transparent'
            }`}
          >
            💛 Neo Brutalist
          </button>

          <button
            type="button"
            onClick={() => onMorphArchetype && onMorphArchetype('warm-editorial')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer ${
              activeArchetype === 'warm-editorial' || activeArchetype === 'humanist-light'
                ? 'bg-[#C2410C] text-white border-2 border-black shadow-[1px_1px_0px_#000]'
                : 'text-slate-700 hover:text-black border-2 border-transparent'
            }`}
          >
            📖 Warm Editorial
          </button>
        </div>
      </div>

      {/* Center Viewport & Device Switcher */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000000]">
          <button
            type="button"
            onClick={() => setDeviceMode('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
              deviceMode === 'desktop'
                ? 'bg-[#FFE600] text-black border-2 border-black shadow-[1.5px_1.5px_0px_#000000]'
                : 'text-slate-700 hover:text-black border-2 border-transparent'
            }`}
            title="Desktop View"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>

          <button
            type="button"
            onClick={() => setDeviceMode('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
              deviceMode === 'tablet'
                ? 'bg-[#FFE600] text-black border-2 border-black shadow-[1.5px_1.5px_0px_#000000]'
                : 'text-slate-700 hover:text-black border-2 border-transparent'
            }`}
            title="Tablet View"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>

          <button
            type="button"
            onClick={() => setDeviceMode('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
              deviceMode === 'mobile'
                ? 'bg-[#FFE600] text-black border-2 border-black shadow-[1.5px_1.5px_0px_#000000]'
                : 'text-slate-700 hover:text-black border-2 border-transparent'
            }`}
            title="Mobile View"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>
      </div>

      {/* Right Controls & Publish CTA */}
      <div className="flex items-center space-x-2.5">
        
        {/* Undo / Redo */}
        <div className="flex items-center bg-white rounded-xl p-0.5 border-2 border-black shadow-[2px_2px_0px_#000000]">
          <button
            type="button"
            onClick={onUndo}
            disabled={!canUndo}
            className="p-1 hover:bg-slate-100 rounded-md text-black disabled:opacity-30 transition-colors cursor-pointer"
            title="Undo (Ctrl+Z)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onRedo}
            disabled={!canRedo}
            className="p-1 hover:bg-slate-100 rounded-md text-black disabled:opacity-30 transition-colors cursor-pointer"
            title="Redo (Ctrl+Y)"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Live Site Trigger */}
        <button
          type="button"
          onClick={() => window.open('/preview', '_blank')}
          className="bg-white hover:bg-slate-100 text-black border-2 border-black font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-[2px_2px_0px_#000000] hover:translate-x-[0.5px] hover:translate-y-[0.5px] transition-all flex items-center gap-1.5 cursor-pointer"
          title="Open Fullscreen Live Website in New Tab"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-black" />
        </button>

        {/* Publish CTA Button */}
        <button
          type="button"
          onClick={handlePublish}
          className="bg-[#FFE600] hover:bg-[#ebd300] text-black border-2 border-black font-black px-5 py-2 rounded-xl text-xs shadow-[3px_3px_0px_#000000] hover:translate-x-[0.5px] hover:translate-y-[0.5px] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 fill-black text-black" />
          <span>Publish</span>
        </button>

      </div>

    </header>
  );
}
