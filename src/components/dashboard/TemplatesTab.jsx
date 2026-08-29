import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function TemplatesTab() {
  const { portfolio, updateProfileFields, showToast } = usePortfolio();

  if (!portfolio) return null;

  const handleSelect = (templateId) => {
    updateProfileFields({ selected_template: templateId });
    showToast && showToast('success', `Switched layout template to ${templateId === 'dark_developer' ? 'Dark Developer' : 'Light Corporate'}!`);
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-[#0F172A]">Design Layout Templates</h1>
        <p className="font-hand text-xl text-slate-700 font-medium tracking-wide mt-1">
          Select a template style. Your content automatically refits without code edits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Dark Developer Card */}
        <div
          onClick={() => handleSelect('dark_developer')}
          className={`border-3 border-black p-6 rounded-2xl cursor-pointer transition-all space-y-4 bg-[#0F1117] text-white shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] relative ${
            portfolio.selected_template === 'dark_developer' ? 'ring-4 ring-[#FFE600]' : ''
          }`}
        >
          {portfolio.selected_template === 'dark_developer' && (
            <div className="absolute top-4 right-4 bg-[#00FFA3] text-black font-mono font-bold text-xs px-3 py-1 border border-black rounded-md shadow-[1.5px_1.5px_0px_0px_#000]">
              ACTIVE TEMPLATE ✓
            </div>
          )}

          <div className="space-y-2">
            <span className="px-2.5 py-1 bg-[#38BDF8] text-slate-900 font-mono font-bold text-xs rounded border border-white">
              OBSIDIAN TERMINAL
            </span>
            <h3 className="font-heading font-black text-2xl text-white">Dark Developer</h3>
            <p className="font-hand text-lg text-slate-300">
              Developer terminal theme with cyan borders, monospaced tech tags, and terminal window card headers.
            </p>
          </div>

          <div className="bg-[#1A1D27] border-2 border-[#38BDF8] p-4 rounded-xl shadow-[3px_3px_0px_0px_#38BDF8] font-mono text-xs text-[#38BDF8]">
            &gt; cat tech_stack.json<br/>
            [ "React 18", "Vite", "Tailwind CSS", "Supabase" ]
          </div>
        </div>

        {/* Light Corporate Card */}
        <div
          onClick={() => handleSelect('light_corporate')}
          className={`border-3 border-black p-6 rounded-2xl cursor-pointer transition-all space-y-4 bg-[#FFFDF8] text-black shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] relative ${
            portfolio.selected_template === 'light_corporate' ? 'ring-4 ring-[#FFE600]' : ''
          }`}
        >
          {portfolio.selected_template === 'light_corporate' && (
            <div className="absolute top-4 right-4 bg-[#FFE600] text-black font-mono font-bold text-xs px-3 py-1 border border-black rounded-md shadow-[1.5px_1.5px_0px_0px_#000]">
              ACTIVE TEMPLATE ✓
            </div>
          )}

          <div className="space-y-2">
            <span className="px-2.5 py-1 bg-[#FF70A6] text-black font-mono font-bold text-xs rounded border border-black">
              NEO-BRUTALIST CREATIVE
            </span>
            <h3 className="font-heading font-black text-2xl text-black">Light Corporate</h3>
            <p className="font-hand text-lg text-slate-800">
              High contrast warm retro theme with 3px solid black borders, shadow offsets, and vibrant badges.
            </p>
          </div>

          <div className="bg-white border-2 border-black p-4 rounded-xl shadow-[3px_3px_0px_0px_#000] font-mono text-xs text-black">
            ⚡ Professional Portfolio<br/>
            Recruiter readiness score: 100/100
          </div>
        </div>

      </div>
    </div>
  );
}
