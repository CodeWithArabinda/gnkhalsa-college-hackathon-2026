import React, { useState } from 'react';
import { X, Moon, Sun, Monitor, Key, Sparkles, Check, Settings, ShieldCheck, Cpu } from 'lucide-react';
import { useStudioTheme } from '../../context/ThemeContext';

export default function StudioSettingsModal({ isOpen, onClose }) {
  const { studioTheme, toggleStudioTheme } = useStudioTheme();
  const [activeTab, setActiveTab] = useState('theme'); // 'general' | 'theme' | 'api'

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#181A24] border-2 border-black rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row text-white animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Sidebar */}
        <div className="w-full md:w-56 bg-[#12141D] border-b md:border-b-0 md:border-r border-white/10 p-4 space-y-2 shrink-0">
          <div className="flex items-center gap-2 px-3 py-2 font-heading font-extrabold text-sm text-[#FF6B1A]">
            <Settings className="w-4 h-4" />
            <span>Studio Settings</span>
          </div>

          <nav className="space-y-1 font-mono text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('theme')}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
                activeTab === 'theme'
                  ? 'bg-[#FF6B1A] text-black font-bold shadow-[2px_2px_0px_0px_#000]'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Sun className="w-4 h-4" /> Theme & Appearance
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('general')}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
                activeTab === 'general'
                  ? 'bg-[#FF6B1A] text-black font-bold shadow-[2px_2px_0px_0px_#000]'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Monitor className="w-4 h-4" /> General Studio
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('api')}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
                activeTab === 'api'
                  ? 'bg-[#FF6B1A] text-black font-bold shadow-[2px_2px_0px_0px_#000]'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Key className="w-4 h-4" /> AI Model & API
            </button>
          </nav>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 p-6 space-y-6 flex flex-col justify-between">
          
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <div>
                <h3 className="font-heading font-extrabold text-lg text-white">
                  {activeTab === 'theme' && 'Theme & Visual Styling'}
                  {activeTab === 'general' && 'General Studio Settings'}
                  {activeTab === 'api' && 'AI Model & Architecture'}
                </h3>
                <p className="text-xs text-slate-400 font-mono">Customize your StackFolio editor environment.</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* TAB 1: Theme & Appearance */}
            {activeTab === 'theme' && (
              <div className="space-y-4">
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Select Studio Mode:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Dark Obsidian Theme Option */}
                  <div
                    onClick={() => toggleStudioTheme('dark')}
                    className={`cursor-pointer rounded-2xl p-4 border-2 transition-all space-y-3 relative ${
                      studioTheme === 'dark'
                        ? 'border-[#FF6B1A] bg-[#0F1117] shadow-[0_0_20px_rgba(255,107,26,0.3)]'
                        : 'border-white/10 bg-[#0F1117]/50 opacity-60 hover:opacity-100 hover:border-white/30'
                    }`}
                  >
                    {studioTheme === 'dark' && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-[#FF6B1A] rounded-full flex items-center justify-center text-black">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Moon className="w-4 h-4 text-[#FF6B1A]" />
                      <span className="font-bold text-sm">Dark Obsidian</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
                      Jet-black canvas with neon accents, high contrast glass panels & dark dot grid.
                    </p>
                    <div className="h-10 bg-black/60 rounded-xl border border-white/10 p-2 flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#FF6B1A]" />
                      <div className="w-12 h-2 rounded bg-white/20" />
                      <div className="w-6 h-2 rounded bg-[#00FFA3]" />
                    </div>
                  </div>

                  {/* Light Studio Theme Option */}
                  <div
                    onClick={() => toggleStudioTheme('light')}
                    className={`cursor-pointer rounded-2xl p-4 border-2 transition-all space-y-3 relative ${
                      studioTheme === 'light'
                        ? 'border-[#FF6B1A] bg-white text-slate-900 shadow-[0_0_20px_rgba(255,107,26,0.3)]'
                        : 'border-white/10 bg-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                    }`}
                  >
                    {studioTheme === 'light' && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-[#FF6B1A] rounded-full flex items-center justify-center text-black">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-[#FF6B1A]" />
                      <span className="font-bold text-sm text-slate-900">Light Studio</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono leading-relaxed">
                      Clean minimal white studio, slate-50 canvas grid, blueprint borders & crisp text.
                    </p>
                    <div className="h-10 bg-slate-100 rounded-xl border border-slate-300 p-2 flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#FF6B1A]" />
                      <div className="w-12 h-2 rounded bg-slate-400" />
                      <div className="w-6 h-2 rounded bg-[#38BDF8]" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: General Studio */}
            {activeTab === 'general' && (
              <div className="space-y-4 font-mono text-xs">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">Debounced Auto-Save</span>
                    <span className="px-2 py-0.5 bg-[#00FFA3]/20 text-[#00FFA3] rounded text-[10px]">Active (500ms)</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Draft changes are persisted to localStorage automatically on every stroke.</p>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">Default Frame Viewport</span>
                    <span className="text-slate-300 font-bold">1280px Desktop</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Responsive breakpoint viewports support Desktop, Tablet (768px), and Mobile (390px).</p>
                </div>
              </div>
            )}

            {/* TAB 3: AI Model & API */}
            {activeTab === 'api' && (
              <div className="space-y-4 font-mono text-xs">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-[#FFE600] font-bold">
                    <Cpu className="w-4 h-4" />
                    <span>Gemini 3.6 Flash Direct Integration</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Direct REST fetch call to Google Generative Language API using VITE_GEMINI_API_KEY.
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-[#38BDF8] font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Schema Validation</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Strict schema object validation enabled for block-level content updates.</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-[#FF6B1A] text-black font-heading font-extrabold text-xs uppercase tracking-wider rounded-xl border border-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#ff843d] transition-all"
            >
              Done
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
