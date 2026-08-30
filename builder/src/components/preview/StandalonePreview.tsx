import React, { useEffect, useState } from "react";
import { CanonicalPortfolio } from "../../types/portfolio";
import { loadActivePortfolio, subscribeToPortfolioSync, saveActivePortfolio } from "../../services/storage";
import TemplateRenderer from "../renderer/TemplateRenderer";
import { TEMPLATE_REGISTRY } from "../../templates/registry";
import { Sparkles, Layers, ArrowLeft } from "lucide-react";

export default function StandalonePreview() {
  const [portfolio, setPortfolio] = useState<CanonicalPortfolio>(() => {
    const active = loadActivePortfolio();
    // Check if url search query specifies a template override
    const params = new URLSearchParams(window.location.search);
    const templateParam = params.get("template");
    if (templateParam) {
      return { ...active, selected_template: templateParam };
    }
    return active;
  });

  const [showControls, setShowControls] = useState(false);

  // Subscribe to real-time updates from editor in the other tab!
  useEffect(() => {
    const unsubscribe = subscribeToPortfolioSync((updatedPortfolio) => {
      setPortfolio((prev) => ({
        ...updatedPortfolio,
        selected_template: prev.selected_template, // preserve active view template
      }));
    });
    return unsubscribe;
  }, []);

  const handleSwitchTemplate = (templateId: string) => {
    setPortfolio((prev) => {
      const next = { ...prev, selected_template: templateId };
      saveActivePortfolio(next);
      return next;
    });
  };

  return (
    <div className="min-h-screen w-full relative">
      {/* Floating Design Switcher Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <button
          onClick={() => setShowControls(!showControls)}
          className="px-4 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white font-bold text-xs border border-purple-500/40 shadow-2xl backdrop-blur-xl flex items-center gap-2 transition-all transform hover:scale-105"
        >
          <Layers className="h-4 w-4 text-purple-400" />
          <span>Switch Design ({portfolio.selected_template})</span>
        </button>
      </div>

      {/* Floating Template Picker Panel */}
      {showControls && (
        <div className="fixed bottom-20 right-6 z-50 w-80 p-4 rounded-3xl bg-slate-900/95 border border-slate-800 shadow-2xl backdrop-blur-2xl space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              Live Template Switcher
            </span>
            <button
              onClick={() => setShowControls(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
            {TEMPLATE_REGISTRY.map((t) => {
              const isSelected = portfolio.selected_template === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleSwitchTemplate(t.id)}
                  className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all ${
                    isSelected
                      ? "bg-purple-600 text-white shadow-md"
                      : "bg-slate-950/60 hover:bg-slate-800 text-slate-300 border border-slate-800/80"
                  }`}
                >
                  <span>{t.name}</span>
                  {isSelected && <span className="text-[10px] font-bold">Active ✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Lazy-Loaded Portfolio Template */}
      <TemplateRenderer portfolio={portfolio} />
    </div>
  );
}
