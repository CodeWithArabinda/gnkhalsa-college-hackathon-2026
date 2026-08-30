import React from "react";
import { useBuilder } from "../../context/BuilderContext";
import { TEMPLATE_REGISTRY } from "../../templates/registry";
import { Check, Sparkles, ExternalLink, Eye, ArrowRight } from "lucide-react";

export default function TemplateSelector() {
  const { portfolio, switchTemplate, setActiveTab, openStandalonePreview } = useBuilder();

  const handleSelectTemplate = (templateId: string) => {
    switchTemplate(templateId);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5" />
          Content Stays 100% Intact
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Select Your Design
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Switch between existing frontend templates instantly. Your extracted content, projects, and work history automatically adapt to each design without rewriting code.
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATE_REGISTRY.map((template) => {
          const isSelected = portfolio.selected_template === template.id;

          return (
            <div
              key={template.id}
              onClick={() => handleSelectTemplate(template.id)}
              className={`group rounded-3xl overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col justify-between bg-slate-900/90 hover:-translate-y-1.5 shadow-xl ${
                isSelected
                  ? "border-purple-500 ring-2 ring-purple-500/30 shadow-purple-500/20"
                  : "border-slate-800 hover:border-slate-700"
              }`}
            >
              {/* Image Preview Thumbnail */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <img
                  src={template.previewImage}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />

                {template.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 text-white backdrop-blur-md border border-white/10">
                    {template.badge}
                  </span>
                )}

                {isSelected && (
                  <div className="absolute top-3 right-3 h-7 w-7 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>

              {/* Card Meta Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                      {template.name}
                    </h3>
                    <span className="text-[10px] font-mono text-purple-400">
                      {template.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {template.description}
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {template.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] bg-slate-950 text-slate-400 border border-slate-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectTemplate(template.id);
                        setActiveTab("editor");
                      }}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                          : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                      }`}
                    >
                      {isSelected ? "Active Design ✓" : "Select & Apply"}
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openStandalonePreview(template.id);
                      }}
                      title="Preview in new tab"
                      className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-all text-xs"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
