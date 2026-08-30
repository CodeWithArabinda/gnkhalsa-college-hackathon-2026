import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, ArrowRight, Sparkles, Play, Loader2, Upload, FileCode } from 'lucide-react';
import { generatePortfolioSchema, getArchetypeConfig } from '../../lib/geminiBuilder';
import ModelSelectorDropdown from '../common/ModelSelectorDropdown';

export default function AriaSiteGenerator({ onTriggerResumeUpload }) {
  const [promptText, setPromptText] = useState(
    "Create a modern, high-impact portfolio for a Creative Fullstack Developer showcasing WebGL projects, interactive tech stack matrix, and contact conversion hooks."
  );
  const [selectedModel, setSelectedModel] = useState(() => localStorage.getItem('stackfolio_selected_model') || 'auto');
  
  // Ingestion State Architecture
  const [selectedArchetype, setSelectedArchetype] = useState('warm-editorial');
  const [customTemplateSchema, setCustomTemplateSchema] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [isParsingResume, setIsParsingResume] = useState(false);
  const [gapResolutionModalOpen, setGapResolutionModalOpen] = useState(false);
  const [parsedData, setParsedData] = useState(null);
  const [missingFields, setMissingFields] = useState([]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [statusText, setStatusText] = useState('');
  
  const templateInputRef = useRef(null);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!promptText.trim() || isGenerating) return;

    // If resume is missing, optionally trigger resume modal
    if (!resumeFile && onTriggerResumeUpload) {
      // Allow proceeding with AI prompt generation
    }

    setIsGenerating(true);

    try {
      setStatusText('✦ Analyzing design intent & persona...');
      await new Promise(r => setTimeout(r, 600));

      setStatusText('✦ Generating custom project case studies & copy...');
      await new Promise(r => setTimeout(r, 800));

      setStatusText('✦ Assembling layout schema...');
      await new Promise(r => setTimeout(r, 600));

      const schema = await generatePortfolioSchema(promptText.trim(), selectedModel);

      localStorage.setItem('stackfolio_portfolio_schema', JSON.stringify(schema));
      localStorage.setItem('stackfolio_studio_draft', JSON.stringify(schema));
      localStorage.setItem('stackfolio_latest_prompt', promptText.trim());
      localStorage.setItem('stackfolio_just_generated', 'true');

      navigate('/studio');
    } catch (err) {
      console.error("Site generation error:", err);
      setIsGenerating(false);
    }
  };

  const handleTemplateUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed) {
          setCustomTemplateSchema(parsed);
          localStorage.setItem('stackfolio_portfolio_schema', JSON.stringify(parsed));
          localStorage.setItem('stackfolio_studio_draft', JSON.stringify(parsed));
          navigate('/studio');
        }
      } catch (err) {
        alert("Invalid JSON template file. Please upload a valid StackFolio schema file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full font-sans select-none">
      
      {/* Top Hero Container */}
      <div className="max-w-5xl mx-auto space-y-6 pt-2 pb-4">
        
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
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 bg-[#FFE600] border-2 border-black text-black font-black text-xs px-3 py-1 rounded-md shadow-[2px_2px_0px_#000000]">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>{isGenerating ? "Gemini AI Engine Active" : "Prompt Engine Ready"}</span>
            </div>

            {isGenerating && (
              <span className="text-xs font-mono font-black text-black bg-emerald-300 border-2 border-black px-2.5 py-0.5 rounded shadow-[1.5px_1.5px_0px_#000] animate-pulse">
                {statusText}
              </span>
            )}
          </div>

          {/* Textarea */}
          <textarea
            rows={3}
            disabled={isGenerating}
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="Describe the site you want Aria to build..."
            className="w-full bg-transparent font-bold text-slate-900 text-base leading-relaxed placeholder:text-slate-400 focus:outline-none border-none resize-none disabled:opacity-60"
          />

          {/* Bottom Dock Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t-2 border-black/10">
            
            <div className="flex flex-wrap items-center gap-2">
              {/* Model Selector Dropdown */}
              <ModelSelectorDropdown
                selectedModel={selectedModel}
                onSelect={setSelectedModel}
              />

              {/* Upload Custom Template Button */}
              <button
                type="button"
                disabled={isGenerating}
                onClick={() => templateInputRef.current?.click()}
                className="border-2 border-black bg-white hover:bg-slate-100 disabled:opacity-50 text-black font-bold text-xs px-3 py-2 rounded-lg shadow-[2px_2px_0px_#000000] transition-all flex items-center gap-1.5 cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
                title="Upload Custom JSON Template Schema"
              >
                <Upload className="w-3.5 h-3.5 text-black" />
                <span className="hidden sm:inline">Upload Template</span>
              </button>

              <input
                ref={templateInputRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleTemplateUpload}
              />

              {/* Create from URL Button */}
              <button
                type="button"
                disabled={isGenerating}
                onClick={() => {
                  const url = window.prompt("Enter existing portfolio or LinkedIn URL to clone structure:", "https://kshitij.dev");
                  if (url) {
                    setPromptText(`Generate a sleek fullstack portfolio matching the structure and project highlights of ${url}`);
                  }
                }}
                className="border-2 border-black bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-black font-bold text-xs px-3 py-2 rounded-lg shadow-[2px_2px_0px_#000000] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-black" />
                <span className="hidden sm:inline">Create from URL</span>
              </button>
            </div>

            {/* Generate Site Trigger */}
            <button
              type="button"
              disabled={isGenerating || !promptText.trim()}
              onClick={handleGenerate}
              className="bg-[#FFE600] hover:bg-[#ebd300] disabled:opacity-50 text-black border-2 border-black font-black text-sm px-6 py-2.5 rounded-xl shadow-[3px_3px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-2 cursor-pointer min-w-[160px] justify-center"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <span>Generate Site</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </>
              )}
            </button>

          </div>

        </div>

        <p className="text-[11px] font-mono font-bold text-slate-500 text-center block mt-3">
          AI can make mistakes. Always double-check the results.
        </p>

      </div>

      {/* 1. FULL-WIDTH MARQUEE TICKER BAR */}
      <div className="w-[calc(100%+3rem)] sm:w-[calc(100%+5rem)] -mx-6 sm:-mx-10 border-y-[2.5px] border-black bg-white py-3 my-8 overflow-hidden select-none shadow-[2px_2px_0px_#000000]">
        <div className="animate-marquee whitespace-nowrap flex gap-4 text-xs font-mono font-black text-black uppercase tracking-widest opacity-95">
          <span>✦ AI RESUME PARSER • DUAL NEO-BRUTALIST TEMPLATES • RECRUITER READINESS ENGINE • PERMANENT PUBLIC SLUG • 100% MANUAL OVERRIDE • 1-CLICK AI GAP COMPLETER ✦</span>
          <span>✦ AI RESUME PARSER • DUAL NEO-BRUTALIST TEMPLATES • RECRUITER READINESS ENGINE • PERMANENT PUBLIC SLUG • 100% MANUAL OVERRIDE • 1-CLICK AI GAP COMPLETER ✦</span>
          <span>✦ AI RESUME PARSER • DUAL NEO-BRUTALIST TEMPLATES • RECRUITER READINESS ENGINE • PERMANENT PUBLIC SLUG • 100% MANUAL OVERRIDE • 1-CLICK AI GAP COMPLETER ✦</span>
        </div>
      </div>

      {/* 2. STANDALONE CENTER-BADGE DIVIDER */}
      <div className="w-[calc(100%+3rem)] sm:w-[calc(100%+5rem)] -mx-6 sm:-mx-10 relative flex items-center justify-center mt-8 mb-10 select-none">
        <div className="w-full border-t-[2.5px] border-black absolute left-0 top-1/2 -translate-y-1/2 z-0" />
        <div className="relative z-10 bg-[#FFE600] text-black border-2 border-black font-mono font-black text-xs px-4 py-1.5 rounded-md shadow-[2.5px_2.5px_0px_#000000] uppercase tracking-wider flex items-center gap-2">
          <span>✦</span>
          <span>CURATED TEMPLATES REPOSITORY</span>
          <span>✦</span>
        </div>
      </div>

    </div>
  );
}
