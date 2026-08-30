import React, { useState } from "react";
import { useBuilder } from "../../context/BuilderContext";
import TemplateRenderer from "../renderer/TemplateRenderer";
import { RefreshCw, ExternalLink, Monitor, Tablet, Smartphone, Maximize2 } from "lucide-react";

export default function LivePreviewFrame() {
  const { portfolio, previewDevice, setPreviewDevice, openStandalonePreview } = useBuilder();
  const [reloadKey, setReloadKey] = useState(0);

  const getWidthClass = () => {
    switch (previewDevice) {
      case "mobile":
        return "max-w-[375px] h-[90%] border-4 border-slate-700 rounded-[36px] shadow-2xl overflow-hidden my-auto";
      case "tablet":
        return "max-w-[768px] h-[95%] border-2 border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-auto";
      case "desktop":
      default:
        return "w-full h-full";
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-950 text-white overflow-hidden">
      {/* Mini Top Control Bar */}
      <div className="h-10 px-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-slate-300 font-bold">{portfolio.selected_template}</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-500">props-driven</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setReloadKey((k) => k + 1)}
            className="p-1 hover:text-white transition-colors"
            title="Reload Frame"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => openStandalonePreview()}
            className="p-1 hover:text-white transition-colors"
            title="Open in Full New Tab"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Frame Container */}
      <div className="flex-1 w-full bg-slate-950/60 overflow-y-auto flex items-start justify-center p-0 sm:p-2">
        <div key={reloadKey} className={`transition-all duration-300 bg-slate-950 overflow-y-auto ${getWidthClass()}`}>
          <TemplateRenderer portfolio={portfolio} />
        </div>
      </div>
    </div>
  );
}
