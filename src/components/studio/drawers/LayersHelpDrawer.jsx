import React from 'react';
import { Layers, HelpCircle, Command, X } from 'lucide-react';

export default function LayersHelpDrawer({ schema, onClose, selectedElement }) {
  const KEYBOARD_SHORTCUTS = [
    { key: 'Ctrl + Z / Cmd + Z', label: 'Undo previous edit' },
    { key: 'Ctrl + Y / Cmd + Shift + Z', label: 'Redo reverted edit' },
    { key: 'Delete / Backspace', label: 'Delete selected element' },
    { key: 'Double Click', label: 'Direct inline text edit' },
    { key: 'Escape', label: 'Deselect element' }
  ];

  return (
    <div className="space-y-4 font-sans text-xs">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-md bg-cyan-600 text-white flex items-center justify-center font-bold">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="font-heading font-extrabold text-sm text-slate-900">Layers & Shortcuts</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-800 rounded-md hover:bg-slate-100"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        <p className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Keyboard Shortcuts
        </p>
        <div className="space-y-1.5">
          {KEYBOARD_SHORTCUTS.map((sc) => (
            <div key={sc.key} className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-mono font-bold text-slate-900 text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-300">
                {sc.key}
              </span>
              <span className="text-slate-600 text-[11px]">{sc.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
