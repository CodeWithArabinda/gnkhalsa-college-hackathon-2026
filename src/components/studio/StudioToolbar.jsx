import React, { useRef } from 'react';
import {
  Plus, Sparkles, Image as ImageIcon, Link as LinkIcon, Type,
  Bold, AlignLeft, Trash2, ChevronDown, Code, Grid, Upload, Crop, Maximize2
} from 'lucide-react';

export default function StudioToolbar({
  selectedElement,
  elementStyle = {},
  onUpdateElementStyle,
  onAddElement,
  onAskAria,
  onReplaceImage,
  onAddLink,
  onDeleteSelected
}) {
  const [showAddMenu, setShowAddMenu] = React.useState(false);
  const fileInputRef = useRef(null);

  const isBold = elementStyle?.fontWeight === '700' || elementStyle?.fontWeight === '900' || elementStyle?.fontWeight === 'bold';
  const textAlign = elementStyle?.textAlign || 'left';

  const updateStyle = (key, val) => {
    if (onUpdateElementStyle) {
      onUpdateElementStyle(key, val);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (onReplaceImage) {
        onReplaceImage(evt.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-white border-[2.5px] border-black shadow-[5px_5px_0px_#000000] rounded-2xl px-4 py-2 flex items-center gap-2 text-black select-none pointer-events-auto">
      
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* + Add Primary Pill */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowAddMenu(!showAddMenu)}
          className="flex items-center gap-1 bg-[#FFE600] hover:bg-[#ebd300] text-black border-2 border-black font-black text-xs px-4 py-1.5 rounded-xl shadow-[2px_2px_0px_#000000] hover:translate-x-[0.5px] hover:translate-y-[0.5px] transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 text-black" />
          <span>Add</span>
          <ChevronDown className="w-3.5 h-3.5 text-black" />
        </button>

        {showAddMenu && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-white border-2 border-black rounded-xl p-1.5 shadow-[4px_4px_0px_#000000] z-50 space-y-1 font-sans text-xs text-black">
            <button
              type="button"
              onClick={() => { onAddElement('text'); setShowAddMenu(false); }}
              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#FFE600] rounded-lg text-left font-bold"
            >
              <Type className="w-4 h-4 text-black" /> Add Text Block
            </button>
            <button
              type="button"
              onClick={() => { onAddElement('image'); setShowAddMenu(false); }}
              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#FFE600] rounded-lg text-left font-bold"
            >
              <ImageIcon className="w-4 h-4 text-black" /> Add Image Frame
            </button>
            <button
              type="button"
              onClick={() => { onAddElement('project'); setShowAddMenu(false); }}
              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#FFE600] rounded-lg text-left font-bold"
            >
              <Grid className="w-4 h-4 text-black" /> Add Project Card
            </button>
            <button
              type="button"
              onClick={() => { onAddElement('skill'); setShowAddMenu(false); }}
              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#FFE600] rounded-lg text-left font-bold"
            >
              <Code className="w-4 h-4 text-black" /> Add Skill Badge
            </button>
          </div>
        )}
      </div>

      {/* ✨ Ask Aria */}
      <button
        type="button"
        onClick={() => onAskAria && onAskAria(selectedElement)}
        className="text-black hover:bg-slate-100 border-2 border-transparent hover:border-black font-bold text-xs px-2.5 py-1 rounded-xl hover:shadow-[1.5px_1.5px_0px_#000000] transition-all flex items-center gap-1.5 cursor-pointer"
      >
        <Sparkles className="w-3.5 h-3.5 text-black" />
        <span>Ask Aria</span>
      </button>

      {/* 🖼 Replace Image */}
      <button
        type="button"
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
        className="text-black hover:bg-slate-100 border-2 border-transparent hover:border-black font-bold text-xs px-2.5 py-1 rounded-xl hover:shadow-[1.5px_1.5px_0px_#000000] transition-all flex items-center gap-1.5 cursor-pointer"
      >
        <Upload className="w-3.5 h-3.5 text-black" />
        <span>Replace Image</span>
      </button>

      {/* 🔗 Link */}
      <button
        type="button"
        onClick={() => onAddLink && onAddLink(selectedElement)}
        className="text-black hover:bg-slate-100 border-2 border-transparent hover:border-black font-bold text-xs px-2.5 py-1 rounded-xl hover:shadow-[1.5px_1.5px_0px_#000000] transition-all flex items-center gap-1.5 cursor-pointer"
      >
        <LinkIcon className="w-3.5 h-3.5 text-black" />
        <span>Link</span>
      </button>

      {/* Divider */}
      <div className="h-4 w-[2px] bg-black/20" />

      {/* Utility Formatting Buttons */}
      <button
        type="button"
        onClick={() => updateStyle('fontWeight', isBold ? '400' : '900')}
        className={`p-1.5 border-2 rounded-xl transition-all cursor-pointer ${
          isBold
            ? 'bg-[#FFE600] text-black border-black shadow-[1.5px_1.5px_0px_#000000]'
            : 'border-transparent text-slate-700 hover:border-black hover:bg-slate-100'
        }`}
        title="Bold"
      >
        <Bold className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={() => updateStyle('textAlign', textAlign === 'left' ? 'center' : 'left')}
        className="text-slate-700 hover:text-black border-2 border-transparent hover:border-black p-1.5 rounded-xl hover:bg-slate-100 transition-all cursor-pointer"
        title="Align Text"
      >
        <AlignLeft className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        className="text-slate-700 hover:text-black border-2 border-transparent hover:border-black p-1.5 rounded-xl hover:bg-slate-100 transition-all cursor-pointer"
        title="Crop Image / Mask"
      >
        <Crop className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        className="text-slate-700 hover:text-black border-2 border-transparent hover:border-black p-1.5 rounded-xl hover:bg-slate-100 transition-all cursor-pointer"
        title="Stretch Element Width"
      >
        <Maximize2 className="w-3.5 h-3.5" />
      </button>

      {/* Delete Trigger */}
      <button
        type="button"
        onClick={() => onDeleteSelected && onDeleteSelected(selectedElement)}
        disabled={!selectedElement}
        className="text-red-600 hover:text-red-800 border-2 border-transparent hover:border-black p-1.5 rounded-xl hover:bg-red-50 disabled:opacity-30 transition-all cursor-pointer"
        title="Delete Selected Element"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>

    </div>
  );
}
