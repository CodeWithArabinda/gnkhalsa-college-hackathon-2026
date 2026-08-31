import React, { useState } from 'react';
import DeviceFrameWrapper from './DeviceFrameWrapper';
import TemplateRenderer from '../templates/TemplateRenderer';
import { Laptop, Tablet, Smartphone, ExternalLink } from 'lucide-react';

export default function LivePreviewContainer({ portfolio, onTemplateChange }) {
  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'

  if (!portfolio) return null;

  const handleOpenNewTab = () => {
    const slug = portfolio.public_slug || 'aarya-shah-r4x9';
    const publicUrl = `${window.location.origin}/p/${slug}`;
    window.open(publicUrl, '_blank', 'noopener,noreferrer');
  };

  const getSelectValue = (templateKey) => {
    if (!templateKey) return 'portfolio1';
    if (templateKey === 'dark_developer') return 'portfolio1';
    if (templateKey === 'light_corporate') return 'portfolio2';
    if (templateKey === 'glass_modern') return 'portfolio3';
    if (templateKey === 'minimalist_clean') return 'portfolio4';
    if (templateKey === 'doodle_playful' || templateKey === 'playful_doodle') return 'portfolio5';
    return templateKey;
  };

  const templateOptions = [
    { value: 'portfolio1', label: 'Template 1: Dark Developer 💻', bg: 'bg-slate-900 text-white' },
    { value: 'portfolio2', label: 'Template 2: Modern Sleek Dark ⚡', bg: 'bg-[#0b0f17] text-cyan-300' },
    { value: 'portfolio3', label: 'Template 3: 3D Space Cyberpunk 🚀', bg: 'bg-[#050816] text-[#00CEA8]' },
    { value: 'portfolio4', label: 'Template 4: Retro VSCode IDE 📝', bg: 'bg-[#1e1e1e] text-amber-400' },
    { value: 'portfolio5', label: 'Template 5: Playful Doodle 🎨', bg: 'bg-[#09090b] text-orange-400' },
  ];

  const selectedValue = getSelectValue(portfolio.selected_template);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      {/* Top Controls Bar */}
      <div className="absolute top-4 left-4 right-4 sm:left-6 sm:right-6 flex flex-wrap gap-2 justify-between items-center z-20">

        {/* Template Layout Selector Dropdown */}
        <div className="flex items-center space-x-2 glass-panel px-3 py-1.5 rounded-2xl border border-slate-300 dark:border-slate-700 shadow-lg text-xs font-bold font-mono">
          <span className="text-slate-700 dark:text-slate-300 font-bold hidden sm:inline">Template:</span>
          <select
            value={selectedValue}
            onChange={onTemplateChange}
            aria-label="Select Portfolio Layout Template"
            className="bg-transparent text-slate-900 dark:text-white font-heading font-black focus:outline-none cursor-pointer text-xs"
          >
            {templateOptions.map((opt) => {
              const isSelected = opt.value === selectedValue;
              return (
                <option key={opt.value} value={opt.value} className={opt.bg}>
                  {isSelected ? `✓ ${opt.label}` : `   ${opt.label}`}
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex items-center gap-2">
          {/* Apple Device Mode Switcher (MacBook / iPad / iPhone) */}
          <nav
            aria-label="Device Preview Viewports"
            className="flex items-center glass-panel p-1 rounded-2xl border border-slate-300 dark:border-slate-700 shadow-lg"
          >
            {/* MacBook / Desktop Button */}
            <button
              type="button"
              onClick={() => setDeviceMode('desktop')}
              aria-label="Switch to MacBook Desktop Preview"
              aria-pressed={deviceMode === 'desktop'}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${deviceMode === 'desktop'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                }`}
            >
              <Laptop className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden md:inline">MacBook</span>
            </button>

            {/* iPad / Tablet Button */}
            <button
              type="button"
              onClick={() => setDeviceMode('tablet')}
              aria-label="Switch to iPad Tablet Preview"
              aria-pressed={deviceMode === 'tablet'}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${deviceMode === 'tablet'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                }`}
            >
              <Tablet className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden md:inline">iPad</span>
            </button>

            {/* iPhone / Mobile Button */}
            <button
              type="button"
              onClick={() => setDeviceMode('mobile')}
              aria-label="Switch to iPhone Mobile Preview"
              aria-pressed={deviceMode === 'mobile'}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${deviceMode === 'mobile'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                }`}
            >
              <Smartphone className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden md:inline">iPhone</span>
            </button>
          </nav>

          {/* Open in New Tab Button */}
          <button
            type="button"
            onClick={handleOpenNewTab}
            aria-label="Open portfolio preview in new tab"
            title="Open Live Portfolio in New Tab"
            className="flex items-center space-x-1.5 glass-panel px-3 py-1.5 rounded-2xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/40 shadow-lg text-xs font-bold cursor-pointer transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <ExternalLink className="w-3.5 h-3.5 text-indigo-500" />
            <span className="hidden sm:inline">Open ↗</span>
          </button>
        </div>
      </div>

      {/* Device Mockup Display Canvas */}
      <div className="w-full flex justify-center items-center h-full pt-16 pb-4 resume-preview-isolated overflow-hidden">
        <DeviceFrameWrapper mode={deviceMode}>
          <TemplateRenderer portfolio={portfolio} />
        </DeviceFrameWrapper>
      </div>
    </div>
  );
}
