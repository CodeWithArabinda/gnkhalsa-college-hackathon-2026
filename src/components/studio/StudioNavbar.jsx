import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Tablet, Smartphone, ExternalLink, Rocket, ChevronDown, RotateCcw, RotateCw, RefreshCw, Search } from 'lucide-react';
import confetti from 'canvas-confetti';

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
  const handlePublish = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    if (onPublish) onPublish();
  };

  return (
    <header className="h-[48px] bg-white border-b border-slate-200 px-4 flex items-center justify-between shrink-0 text-slate-800 text-xs font-sans select-none z-40 shadow-xs">
      
      {/* Left Core Navigation */}
      <div className="flex items-center space-x-3">
        <Link to="/dashboard" className="flex items-center gap-1.5 font-bold text-slate-900 hover:text-[#0053ff] transition-colors">
          <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#0053ff] to-blue-400 text-white font-bold text-[10px] flex items-center justify-center">
            SF
          </span>
          <span className="font-heading font-black text-sm tracking-tight text-slate-900">StackFolio</span>
        </Link>

        <div className="h-4 w-px bg-slate-200" />

        {/* User Initial Circle */}
        <div className="w-6 h-6 rounded-full bg-amber-400 text-black font-extrabold text-[10px] flex items-center justify-center shadow-xs">
          KP
        </div>

        {/* Site Switcher Dropdown */}
        <button
          type="button"
          className="flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-md font-medium text-slate-700 transition-colors"
        >
          <span>Webdev Portfolio</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </button>

        {/* Page Switcher */}
        <button
          type="button"
          className="flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-md font-medium text-slate-700 transition-colors"
        >
          <span className="text-slate-400">Page:</span>
          <span className="font-semibold text-slate-900">Home</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </button>
      </div>

      {/* Center Viewport & Zoom Controls */}
      <div className="flex items-center space-x-2">
        
        {/* Device Mode Switcher */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
          <button
            type="button"
            onClick={() => setDeviceMode('desktop')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
              deviceMode === 'desktop' ? 'bg-white text-[#0053ff] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Desktop View"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>

          <button
            type="button"
            onClick={() => setDeviceMode('tablet')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
              deviceMode === 'tablet' ? 'bg-white text-[#0053ff] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Tablet View"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>

          <button
            type="button"
            onClick={() => setDeviceMode('mobile')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
              deviceMode === 'mobile' ? 'bg-white text-[#0053ff] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Mobile View"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        <div className="h-4 w-px bg-slate-200" />

        {/* Zoom Dropdown */}
        <button
          type="button"
          className="flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-md font-mono text-[11px] text-slate-700"
        >
          <span>Fit (85%)</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </button>

        <button type="button" className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500 hover:text-slate-800" title="Search elements">
          <Search className="w-3.5 h-3.5" />
        </button>

      </div>

      {/* Right Controls & Publish CTA */}
      <div className="flex items-center space-x-2.5">
        
        {/* 50% Off Upgrade Badge */}
        <span className="hidden lg:inline-flex items-center gap-1 bg-[#e6f9e6] text-[#008800] border border-[#b8ebb8] font-extrabold text-[10px] px-2.5 py-0.5 rounded-full">
          ⚡ 50% Off Upgrade
        </span>

        {/* Undo / Redo */}
        <div className="flex items-center bg-slate-100 rounded-md p-0.5 border border-slate-200">
          <button
            type="button"
            onClick={onUndo}
            disabled={!canUndo}
            className="p-1 hover:bg-white rounded text-slate-600 disabled:opacity-30 transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onRedo}
            disabled={!canRedo}
            className="p-1 hover:bg-white rounded text-slate-600 disabled:opacity-30 transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Save Status Indicator */}
        <div className="flex items-center gap-1 font-mono text-[11px] text-slate-500">
          {saveStatus === 'saving' ? (
            <span className="text-amber-600 font-bold animate-pulse">⟳ Saving</span>
          ) : (
            <span className="text-emerald-600 font-bold">● Saved</span>
          )}
        </div>

        {/* Publish CTA Button */}
        <button
          type="button"
          onClick={handlePublish}
          className="bg-[#0053ff] hover:bg-[#0043cc] text-white font-bold px-4 py-1.5 rounded-md text-xs shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Rocket className="w-3.5 h-3.5" />
          <span>Publish</span>
        </button>

      </div>

    </header>
  );
}
