import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const MODELS = [
  {
    id: 'auto',
    name: 'Auto Mode',
    icon: '✨',
    desc: 'Smart router based on prompt',
    badge: 'Fast'
  },
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    icon: '⚡',
    desc: 'Low latency rapid generation',
    badge: '1 Credit'
  },
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    icon: '🧠',
    desc: 'High reasoning & deep architecture',
    badge: '3 Credits'
  }
];

export default function ModelSelectorDropdown({ selectedModel, onSelect, compact = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeModel = MODELS.find(m => m.id === selectedModel) || MODELS[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectModel = (id) => {
    localStorage.setItem('stackfolio_selected_model', id);
    onSelect && onSelect(id);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block select-none">
      
      {/* Trigger Button Pill */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`border-2 border-black bg-white hover:bg-slate-50 text-black font-black text-xs rounded-lg shadow-[2px_2px_0px_#000000] flex items-center gap-1.5 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 transition-all ${
          compact ? 'px-2 py-1 text-[11px]' : 'px-3 py-2'
        }`}
      >
        <span>{activeModel.icon}</span>
        <span className="truncate max-w-[110px]">{activeModel.name}</span>
        <ChevronDown className="w-3.5 h-3.5 text-black shrink-0" />
      </button>

      {/* Popover Menu (Opens Upward) */}
      {isOpen && (
        <div className="absolute bottom-full mb-2 left-0 w-72 bg-white border-2 border-black shadow-[5px_5px_0px_#000000] rounded-xl p-1.5 z-50 font-sans text-xs space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="px-2.5 py-1 text-[10px] font-mono font-black text-slate-500 uppercase border-b border-slate-100 mb-1">
            SELECT AI ENGINE MODEL
          </div>

          {MODELS.map((model) => {
            const isSelected = model.id === activeModel.id;
            return (
              <div
                key={model.id}
                onClick={() => handleSelectModel(model.id)}
                className={`p-2 rounded-lg flex items-start gap-2.5 cursor-pointer transition-colors border ${
                  isSelected
                    ? 'bg-[#FFE600]/30 border-black shadow-[1.5px_1.5px_0px_#000000]'
                    : 'bg-white border-transparent hover:bg-slate-100'
                }`}
              >
                <span className="text-base leading-none pt-0.5">{model.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-black text-black text-xs">{model.name}</p>
                    <span className="text-[9px] font-mono font-bold bg-black text-white px-1.5 py-0.2 rounded uppercase">
                      {model.badge}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-600 truncate mt-0.5 font-normal">
                    {model.desc}
                  </p>
                </div>
                {isSelected && <Check className="w-4 h-4 text-black shrink-0 mt-0.5" />}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
