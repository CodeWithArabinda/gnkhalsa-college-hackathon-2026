import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Tablet, Smartphone, ExternalLink, Rocket, ChevronLeft, RotateCcw, RotateCw, RefreshCw, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStudioTheme } from '../../context/ThemeContext';

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
  onResetDefault
}) {
  const { isLight } = useStudioTheme();

  const handlePublish = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    if (onPublish) onPublish();
  };

  return (
    <header className={`h-16 border-b-2 px-4 sm:px-6 flex items-center justify-between shrink-0 transition-colors duration-200 z-40 ${
      isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-[#0F1117] border-black text-white'
    }`}>
      
      {/* Left Brand Badge */}
      <div className="flex items-center space-x-3">
        <Link to="/dashboard" className={`flex items-center text-xs font-mono font-bold transition-colors ${
          isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
        }`}>
          <ChevronLeft className="w-4 h-4 mr-1" /> Dashboard
        </Link>
        
        <div className={`h-4 w-px ${isLight ? 'bg-slate-300' : 'bg-white/20'}`} />

        <div className="flex items-center space-x-2">
          <span className={`font-heading font-black text-lg ${isLight ? 'text-slate-900' : 'text-white'}`}>StackFolio</span>
          <span className="px-2 py-0.5 bg-[#FF70A6] text-black text-[10px] font-mono font-bold rounded-full border border-black shadow-[1.5px_1.5px_0px_0px_#000]">
            AI STUDIO
          </span>
        </div>
      </div>

      {/* Center Device Switcher & Undo/Redo */}
      <div className="flex items-center space-x-3">
        
        {/* Undo / Redo */}
        <div className={`flex items-center border rounded-xl p-1 space-x-1 shadow-inner ${
          isLight ? 'bg-slate-100 border-slate-300' : 'bg-[#1A1D27] border-white/10'
        }`}>
          <button
            type="button"
            onClick={onUndo}
            disabled={!canUndo}
            className={`p-1.5 rounded-lg disabled:opacity-30 transition-colors ${
              isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
            }`}
            title="Undo (Ctrl+Z)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onRedo}
            disabled={!canRedo}
            className={`p-1.5 rounded-lg disabled:opacity-30 transition-colors ${
              isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
            }`}
            title="Redo (Ctrl+Y)"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Viewport Device Switcher */}
        <div className={`flex items-center border rounded-xl p-1 space-x-1 shadow-inner ${
          isLight ? 'bg-slate-100 border-slate-300' : 'bg-[#1A1D27] border-white/10'
        }`}>
          <button
            type="button"
            onClick={() => setDeviceMode('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              deviceMode === 'desktop'
                ? 'bg-[#FFE600] text-black shadow-[2px_2px_0px_0px_#000]'
                : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
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
              deviceMode === 'tablet'
                ? 'bg-[#FFE600] text-black shadow-[2px_2px_0px_0px_#000]'
                : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
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
              deviceMode === 'mobile'
                ? 'bg-[#FFE600] text-black shadow-[2px_2px_0px_0px_#000]'
                : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
            }`}
            title="Mobile (390px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

      </div>

      {/* Right Controls & Autosave Status */}
      <div className="flex items-center space-x-3">
        
        {/* Live Autosave Status Indicator */}
        <div className={`hidden lg:flex items-center space-x-1.5 px-2.5 py-1 border rounded-full font-mono text-[10px] ${
          isLight ? 'bg-slate-100 border-slate-300' : 'bg-white/5 border-white/10'
        }`}>
          {saveStatus === 'saving' ? (
            <>
              <RefreshCw className="w-3 h-3 text-amber-500 animate-spin" />
              <span className="text-amber-500 font-bold">Saving...</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-[#00FFA3]" />
              <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>Saved</span>
            </>
          )}
        </div>

        {/* Reset Draft */}
        <button
          type="button"
          onClick={onResetDefault}
          className={`hidden md:inline-flex text-[10px] font-mono transition-colors ${
            isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white'
          }`}
          title="Reset to initial draft"
        >
          Reset
        </button>

        {schema?.metadata?.slug && (
          <Link
            to={`/p/${schema.metadata.slug}`}
            target="_blank"
            className={`hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 border rounded-xl text-xs font-mono font-bold transition-all ${
              isLight ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800' : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white'
            }`}
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
