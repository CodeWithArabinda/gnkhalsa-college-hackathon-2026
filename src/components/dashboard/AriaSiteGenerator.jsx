import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, ArrowRight, Sparkles, Wand2 } from 'lucide-react';

export default function AriaSiteGenerator() {
  const [promptText, setPromptText] = useState(
    "Create a modern, high-impact portfolio for a Creative Fullstack Developer showcasing WebGL projects, interactive tech stack matrix, and contact conversion hooks."
  );
  const navigate = useNavigate();

  const handleGenerate = () => {
    if (!promptText.trim()) return;
    localStorage.setItem('stackfolio_pending_prompt', promptText.trim());
    navigate('/studio');
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pt-4 pb-8 font-sans select-none">
      
      {/* Header Section */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Design your site with Aria
        </h1>
        <p className="text-base text-slate-500 font-normal max-w-xl mx-auto leading-relaxed">
          Describe the site you want. Aria will generate it and stay by your side as you work.
        </p>
      </div>

      {/* Central Floating AI Prompt Box */}
      <div className="bg-white border border-slate-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.06)] rounded-3xl p-6 space-y-3 relative transition-shadow hover:shadow-[0_16px_50px_rgba(0,0,0,0.08)]">
        
        {/* Mascot Status Chip */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50/80 border border-blue-100 rounded-full text-xs font-bold text-[#0053ff]">
          <div className="w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center text-[8px] font-black shrink-0 relative">
            <span className="w-1 h-1 bg-[#00FFA3] rounded-full animate-ping" />
          </div>
          <span>Your prompt is ready.</span>
        </div>

        {/* Prompt Textarea */}
        <textarea
          rows={3}
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          placeholder="Describe the site you want Aria to build..."
          className="w-full bg-transparent text-slate-800 font-medium text-base sm:text-lg leading-relaxed focus:outline-none border-none resize-none placeholder-slate-400"
        />

        {/* Bottom Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          
          <button
            type="button"
            onClick={() => {
              const url = window.prompt("Enter existing portfolio or LinkedIn URL to clone structure:", "https://kshitij.dev");
              if (url) {
                setPromptText(`Generate a sleek fullstack portfolio matching the structure and project highlights of ${url}`);
              }
            }}
            className="text-xs font-semibold text-slate-700 hover:text-slate-950 flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Globe className="w-4 h-4 text-[#0053ff]" />
            <span>Create from URL</span>
          </button>

          <button
            type="button"
            onClick={handleGenerate}
            className="bg-[#0053ff] hover:bg-[#0043cc] text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>Generate Site</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </div>

      <p className="text-[11px] text-slate-400 text-center block">
        AI can make mistakes. Always double-check the results.
      </p>

    </div>
  );
}
