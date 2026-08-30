import React, { useState } from 'react';
import { AlertTriangle, Sparkles, Edit3, X, Loader2, CheckCircle2 } from 'lucide-react';
import { completeMissingGapsWithAI, completeGapsWithPlaceholders, transformToPortfolioSchema } from '../../services/gapEngine';

export default function GapResolutionModal({
  isOpen,
  onClose,
  parsedData,
  missingFields = [],
  onResolve
}) {
  const [isAiLoading, setIsAiLoading] = useState(false);

  if (!isOpen) return null;

  const handleAiAutoComplete = async () => {
    setIsAiLoading(true);
    try {
      const completedData = await completeMissingGapsWithAI(parsedData, missingFields);
      const finalSchema = transformToPortfolioSchema(completedData);
      if (onResolve) onResolve(finalSchema);
    } catch (err) {
      console.error("AI Gap Auto-Complete error:", err);
      const placeholderData = completeGapsWithPlaceholders(parsedData, missingFields);
      const fallbackSchema = transformToPortfolioSchema(placeholderData);
      if (onResolve) onResolve(fallbackSchema);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleStudioPlaceholderEdit = () => {
    const placeholderData = completeGapsWithPlaceholders(parsedData, missingFields);
    const finalSchema = transformToPortfolioSchema(placeholderData);
    if (onResolve) onResolve(finalSchema);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FFFDF8] border-3 border-black p-6 rounded-2xl max-w-lg w-full shadow-brutal-lg space-y-6 animate-fadeIn relative text-slate-900 font-sans select-none">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-3 border-b-2 border-black">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#FFE600] border-2 border-black flex items-center justify-center text-black font-black text-sm shadow-[1.5px_1.5px_0px_#000]">
              <AlertTriangle className="w-4 h-4 text-black" />
            </div>
            <div>
              <h3 className="font-heading font-black text-base text-black">Missing Resume Details Detected</h3>
              <p className="text-[11px] font-mono text-slate-600">Schema Gap Engine Alert</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isAiLoading}
            className="p-1 text-slate-500 hover:text-black border border-black rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Missing Fields List */}
        <div className="bg-[#FFF4E5] border-2 border-black p-4 rounded-xl space-y-2 shadow-[2px_2px_0px_#000]">
          <p className="text-xs font-bold text-slate-800">
            The OCR engine extracted candidate data, but detected missing required portfolio sections:
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {missingFields.map((field, idx) => (
              <span
                key={idx}
                className="bg-red-400 text-black border border-black text-[11px] font-black px-2.5 py-0.5 rounded-md shadow-[1px_1px_0px_#000]"
              >
                ⚠️ Missing: {field}
              </span>
            ))}
          </div>
        </div>

        {/* 2-CHOICE RESOLUTION ENGINE */}
        <div className="space-y-3 pt-1">
          <p className="text-xs font-black text-black uppercase tracking-wider">Select Gap Resolution Workflow:</p>

          {/* CHOICE 1: 1-CLICK AI GAP COMPLETER */}
          <button
            type="button"
            onClick={handleAiAutoComplete}
            disabled={isAiLoading}
            className="w-full text-left p-4 rounded-xl border-2 border-black bg-[#FFE600] hover:bg-[#ebd300] text-black shadow-[3px_3px_0px_#000] hover:translate-x-[0.5px] hover:translate-y-[0.5px] transition-all cursor-pointer group disabled:opacity-50"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-black text-[#FFE600] flex items-center justify-center font-black shrink-0">
                  {isAiLoading ? <Loader2 className="w-4 h-4 animate-spin text-[#FFE600]" /> : <Sparkles className="w-4 h-4" />}
                </div>
                <div>
                  <h4 className="font-heading font-black text-sm text-black flex items-center gap-1.5">
                    <span>Option 1: 1-Click AI Auto-Complete</span>
                    <span className="bg-black text-[#FFE600] text-[9px] px-1.5 py-0.2 rounded font-mono font-bold">RECOMMENDED</span>
                  </h4>
                  <p className="text-xs text-slate-900 font-medium">
                    AI generates realistic missing bio & projects based on your skills & role.
                  </p>
                </div>
              </div>
            </div>
          </button>

          {/* CHOICE 2: EDIT IN STUDIO WITH PLACEHOLDERS */}
          <button
            type="button"
            onClick={handleStudioPlaceholderEdit}
            disabled={isAiLoading}
            className="w-full text-left p-4 rounded-xl border-2 border-black bg-white hover:bg-slate-50 text-black shadow-[3px_3px_0px_#000] hover:translate-x-[0.5px] hover:translate-y-[0.5px] transition-all cursor-pointer group disabled:opacity-50"
          >
            <div className="flex items-start space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-100 border border-black text-black flex items-center justify-center font-black shrink-0">
                <Edit3 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-black text-sm text-black">Option 2: Place Editable Tags & Open Studio</h4>
                <p className="text-xs text-slate-600 font-medium">
                  Insert editable placeholder tags (e.g. [Add Project]) and jump directly to Canvas Editor.
                </p>
              </div>
            </div>
          </button>

        </div>

      </div>
    </div>
  );
}
