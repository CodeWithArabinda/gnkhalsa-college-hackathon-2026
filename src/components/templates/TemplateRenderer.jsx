import React from 'react';
import LightCorporateTemplate from './LightCorporateTemplate';
import DarkDeveloperTemplate from './DarkDeveloperTemplate';

export default function TemplateRenderer({ portfolio }) {
  if (!portfolio) return null;

  const isBlank = !portfolio.full_name || portfolio.full_name.trim() === '';

  if (isBlank) {
    return (
      <div className="min-h-full w-full bg-[#0F1117] bg-grid-pattern-dark p-8 flex flex-col items-center justify-center text-center space-y-5 text-white font-sans">
        <div className="w-16 h-16 rounded-2xl bg-[#FFE600] border-3 border-black flex items-center justify-center text-black font-black text-2xl shadow-brutal animate-bounce">
          ⚡
        </div>
        <div className="space-y-2">
          <h3 className="font-heading font-extrabold text-2xl text-white">Live Portfolio Canvas</h3>
          <p className="font-hand text-xl md:text-2xl text-slate-300 max-w-md leading-relaxed">
            ⚡ Upload a resume or fill details on the left to see your live portfolio render here.
          </p>
        </div>
        <div className="bg-[#1A1D27] border-2 border-[#38BDF8] px-4 py-2.5 rounded-xl shadow-[3px_3px_0px_0px_#38BDF8] font-mono text-xs text-[#38BDF8]">
          Status: Awaiting Resume PDF / Image Upload or Manual Input
        </div>
      </div>
    );
  }

  if (portfolio.selected_template === 'light_corporate') {
    return <LightCorporateTemplate portfolio={portfolio} />;
  }
  return <DarkDeveloperTemplate portfolio={portfolio} />;
}
