import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, ArrowRight, Sparkles, Play } from 'lucide-react';

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
    <div className="w-full max-w-4xl mx-auto space-y-6 pt-2 pb-8 font-sans select-none">
      
      {/* Top Sticker Tagline */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-white text-black border-2 border-black font-mono text-xs font-bold px-3.5 py-1 rounded-full shadow-[2.5px_2.5px_0px_#000000] mb-3">
          <Play className="w-3 h-3 fill-black text-black" />
          <span>AI RESUME-TO-PORTFOLIO ENGINE</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight uppercase text-center">
          DESIGN YOUR SITE WITH ARIA.
        </h1>
        <p className="text-sm font-semibold text-slate-700 text-center max-w-xl mx-auto mt-2.5 mb-6">
          Describe the site you want. Aria generates high-converting architecture and stays by your side as you build.
        </p>
      </div>

      {/* Central Floating Neo-Brutalist Prompt Dock */}
      <div className="max-w-2xl w-full mx-auto bg-white border-[2.5px] border-black shadow-[6px_6px_0px_#000000] rounded-2xl p-5 space-y-3 relative transition-all hover:shadow-[8px_8px_0px_#000000]">
        
        {/* Top Prompt Badge */}
        <div className="inline-flex items-center gap-1.5 bg-[#FFE600] border-2 border-black text-black font-black text-xs px-3 py-1 rounded-md shadow-[2px_2px_0px_#000000]">
          <Sparkles className="w-3.5 h-3.5 text-black" />
          <span>Prompt Engine Ready</span>
        </div>

        {/* Textarea */}
        <textarea
          rows={3}
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          placeholder="Describe the site you want Aria to build..."
          className="w-full bg-transparent font-bold text-slate-900 text-base leading-relaxed placeholder:text-slate-400 focus:outline-none border-none resize-none"
        />

        {/* Bottom Dock Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t-2 border-black/10">
          
          <button
            type="button"
            onClick={() => {
              const url = window.prompt("Enter existing portfolio or LinkedIn URL to clone structure:", "https://kshitij.dev");
              if (url) {
                setPromptText(`Generate a sleek fullstack portfolio matching the structure and project highlights of ${url}`);
              }
            }}
            className="border-2 border-black bg-slate-100 hover:bg-slate-200 text-black font-bold text-xs px-3.5 py-2 rounded-lg shadow-[2px_2px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-black" />
            <span>Create from URL</span>
          </button>

          <button
            type="button"
            onClick={handleGenerate}
            className="bg-[#FFE600] hover:bg-[#ebd300] text-black border-2 border-black font-black text-sm px-6 py-2.5 rounded-xl shadow-[3px_3px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Generate Site</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>

        </div>

      </div>

      <p className="text-[11px] font-mono font-bold text-slate-500 text-center block">
        AI can make mistakes. Always double-check the results.
      </p>

    </div>
  );
}
