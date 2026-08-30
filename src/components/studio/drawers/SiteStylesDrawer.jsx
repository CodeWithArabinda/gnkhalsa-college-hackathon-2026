import React from 'react';
import { Palette, Type, Check, Sparkles, X } from 'lucide-react';
import { useStudioTheme } from '../../../context/ThemeContext';

const PALETTE_PRESET_CARDS = [
  {
    id: 'dark-obsidian',
    name: 'Dark Obsidian',
    themeMode: 'dark',
    accent: '#ff5100',
    accentBg: '#12141D',
    desc: 'Jet-black canvas with vibrant neon orange highlights'
  },
  {
    id: 'clean-light',
    name: 'Clean Studio Light',
    themeMode: 'light',
    accent: '#0053ff',
    accentBg: '#ffffff',
    desc: 'Pure white canvas with Royal Blue accents'
  },
  {
    id: 'emerald-terminal',
    name: 'Emerald Terminal',
    themeMode: 'dark',
    accent: '#10b981',
    accentBg: '#0f172a',
    desc: 'Charcoal slate with cyber emerald green glows'
  },
  {
    id: 'cyber-violet',
    name: 'Cyber Violet',
    themeMode: 'dark',
    accent: '#8b5cf6',
    accentBg: '#181825',
    desc: 'Deep purple obsidian with neon violet highlights'
  }
];

const FONT_PAIRINGS = [
  { name: 'Wix Madefor / Inter', font: 'Plus Jakarta Sans, sans-serif' },
  { name: 'Plus Jakarta / Outfit', font: 'Outfit, sans-serif' },
  { name: 'Space Grotesk / Mono', font: 'Space Grotesk, sans-serif' }
];

export default function SiteStylesDrawer({ onClose, onApplyThemePreset }) {
  const { studioTheme, toggleStudioTheme } = useStudioTheme();

  return (
    <div className="space-y-4 font-sans text-xs">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-md bg-amber-500 text-white flex items-center justify-center font-bold">
            <Palette className="w-4 h-4" />
          </div>
          <h3 className="font-heading font-extrabold text-sm text-slate-900">Site Styles & Themes</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-800 rounded-md hover:bg-slate-100"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* 1-Click Theme Palette Presets */}
      <div className="space-y-2">
        <p className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Theme Palette Presets
        </p>
        <div className="space-y-2">
          {PALETTE_PRESET_CARDS.map((preset) => {
            const isCurrent = (studioTheme === preset.themeMode);
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  toggleStudioTheme(preset.themeMode);
                  if (onApplyThemePreset) onApplyThemePreset(preset);
                }}
                className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  isCurrent
                    ? 'border-[#0053ff] bg-blue-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                }`}
              >
                <div className="space-y-1 min-w-0 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: preset.accent }} />
                    <span className="font-bold text-slate-900 text-xs">{preset.name}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">{preset.desc}</p>
                </div>
                {isCurrent && <Check className="w-4 h-4 text-[#0053ff] shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Typography Font Pairings */}
      <div className="space-y-2 pt-2 border-t border-slate-200">
        <p className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Typography Pairings
        </p>
        <div className="space-y-1.5">
          {FONT_PAIRINGS.map((fp) => (
            <button
              key={fp.name}
              type="button"
              className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-left font-medium text-slate-800 transition-colors"
              style={{ fontFamily: fp.font }}
            >
              {fp.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
