import React, { useState } from 'react';
import {
  Plus, Sparkles, Image as ImageIcon, Link as LinkIcon, Palette, Type,
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Box,
  Trash2, ChevronDown, Minus, Plus as PlusIcon, Code, Grid
} from 'lucide-react';

const FONTS = [
  'Inter, sans-serif',
  'Plus Jakarta Sans, sans-serif',
  'Outfit, sans-serif',
  'Space Grotesk, sans-serif',
  'JetBrains Mono, monospace'
];

const PRESET_COLORS = [
  '#FFFFFF', '#FF6B1A', '#FFE600', '#00FFA3', '#38BDF8', '#A855F7', '#000000'
];

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
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showFontMenu, setShowFontMenu] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);

  const currentFontSize = elementStyle?.fontSize || 16;
  const currentFontFamily = elementStyle?.fontFamily || 'Space Grotesk, sans-serif';
  const currentColor = elementStyle?.color || '#FFFFFF';
  const isBold = elementStyle?.fontWeight === '700' || elementStyle?.fontWeight === '900' || elementStyle?.fontWeight === 'bold';
  const isItalic = elementStyle?.fontStyle === 'italic';
  const isUnderline = elementStyle?.textDecoration === 'underline';
  const textAlign = elementStyle?.textAlign || 'left';

  const updateStyle = (key, val) => {
    if (onUpdateElementStyle) {
      onUpdateElementStyle(key, val);
    }
  };

  return (
    <div className="bg-[#12141D] border-b border-black px-4 py-2 flex items-center justify-between z-30 shrink-0 text-white select-none overflow-x-auto shadow-md">
      
      {/* Left Core Actions Ribbon */}
      <div className="flex items-center space-x-2 shrink-0">
        
        {/* + Add */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black font-heading font-extrabold text-xs rounded-xl border border-black shadow-[2px_2px_0px_0px_#000] hover:bg-amber-100 transition-all"
          >
            <Plus className="w-4 h-4 text-black" />
            <span>Add</span>
            <ChevronDown className="w-3 h-3 text-black ml-0.5" />
          </button>

          {showAddMenu && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-[#181A24] border-2 border-black rounded-xl p-1.5 shadow-2xl z-50 space-y-1 font-mono text-xs text-white">
              <button
                type="button"
                onClick={() => { onAddElement('text'); setShowAddMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded-lg text-left"
              >
                <Type className="w-4 h-4 text-[#FFE600]" /> Add Text Block
              </button>
              <button
                type="button"
                onClick={() => { onAddElement('image'); setShowAddMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded-lg text-left"
              >
                <ImageIcon className="w-4 h-4 text-[#38BDF8]" /> Add Image Frame
              </button>
              <button
                type="button"
                onClick={() => { onAddElement('project'); setShowAddMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded-lg text-left"
              >
                <Grid className="w-4 h-4 text-[#FF6B1A]" /> Add Project Card
              </button>
              <button
                type="button"
                onClick={() => { onAddElement('skill'); setShowAddMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded-lg text-left"
              >
                <Code className="w-4 h-4 text-[#00FFA3]" /> Add Skill Badge
              </button>
            </div>
          )}
        </div>

        {/* ✨ Ask Aria */}
        <button
          type="button"
          onClick={() => onAskAria && onAskAria(selectedElement)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1D27] hover:bg-[#252836] border border-white/10 rounded-xl text-xs font-mono text-slate-200 hover:text-white transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FFE600]" />
          <span>Ask Aria</span>
        </button>

        {/* 🖼 Replace Image */}
        <button
          type="button"
          onClick={() => onReplaceImage && onReplaceImage(selectedElement)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1D27] hover:bg-[#252836] border border-white/10 rounded-xl text-xs font-mono text-slate-200 hover:text-white transition-all"
        >
          <ImageIcon className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>Replace Image</span>
        </button>

        {/* 🔗 Link */}
        <button
          type="button"
          onClick={() => onAddLink && onAddLink(selectedElement)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1D27] hover:bg-[#252836] border border-white/10 rounded-xl text-xs font-mono text-slate-200 hover:text-white transition-all"
        >
          <LinkIcon className="w-3.5 h-3.5 text-[#00FFA3]" />
          <span>Link</span>
        </button>

      </div>

      {/* Center Formatting Ribbon */}
      <div className="flex items-center space-x-1 border-x border-white/10 px-3 mx-2 shrink-0">
        
        {/* Color Picker */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowColorMenu(!showColorMenu)}
            className="p-1.5 hover:bg-white/10 rounded flex items-center gap-1 text-xs font-mono"
            title="Text & Accent Color"
          >
            <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: currentColor }} />
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showColorMenu && (
            <div className="absolute top-full left-0 mt-2 p-2 bg-[#181A24] border-2 border-black rounded-xl shadow-2xl z-50 flex gap-1.5">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => { updateStyle('color', c); setShowColorMenu(false); }}
                  className="w-5 h-5 rounded-full border border-black hover:scale-125 transition-transform"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Font Family Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowFontMenu(!showFontMenu)}
            className="flex items-center gap-1 px-2.5 py-1 bg-[#1A1D27] border border-white/10 rounded-lg text-xs font-mono text-slate-200"
          >
            <span className="max-w-[80px] truncate">{currentFontFamily.split(',')[0]}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showFontMenu && (
            <div className="absolute top-full left-0 mt-2 w-44 bg-[#181A24] border-2 border-black rounded-xl p-1 shadow-2xl z-50 space-y-1 font-mono text-xs text-white">
              {FONTS.map((font) => (
                <button
                  key={font}
                  type="button"
                  onClick={() => { updateStyle('fontFamily', font); setShowFontMenu(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-white/10 rounded truncate"
                  style={{ fontFamily: font }}
                >
                  {font.split(',')[0]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Font Size Step Controls */}
        <div className="flex items-center bg-[#1A1D27] border border-white/10 rounded-lg px-1 space-x-1 font-mono text-xs">
          <button
            type="button"
            onClick={() => updateStyle('fontSize', Math.max(10, currentFontSize - 2))}
            className="p-1 hover:bg-white/10 rounded text-slate-300"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="px-1 font-bold text-white min-w-[28px] text-center">{currentFontSize}px</span>
          <button
            type="button"
            onClick={() => updateStyle('fontSize', Math.min(120, currentFontSize + 2))}
            className="p-1 hover:bg-white/10 rounded text-slate-300"
          >
            <PlusIcon className="w-3 h-3" />
          </button>
        </div>

        <div className="w-px h-4 bg-white/10 my-auto" />

        {/* Bold, Italic, Underline */}
        <button
          type="button"
          onClick={() => updateStyle('fontWeight', isBold ? '400' : '900')}
          className={`p-1.5 rounded transition-colors ${isBold ? 'bg-[#FFE600] text-black font-black' : 'hover:bg-white/10 text-slate-300'}`}
          title="Bold"
        >
          <Bold className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => updateStyle('fontStyle', isItalic ? 'normal' : 'italic')}
          className={`p-1.5 rounded transition-colors ${isItalic ? 'bg-[#FFE600] text-black font-black' : 'hover:bg-white/10 text-slate-300'}`}
          title="Italic"
        >
          <Italic className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => updateStyle('textDecoration', isUnderline ? 'none' : 'underline')}
          className={`p-1.5 rounded transition-colors ${isUnderline ? 'bg-[#FFE600] text-black font-black' : 'hover:bg-white/10 text-slate-300'}`}
          title="Underline"
        >
          <Underline className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-4 bg-white/10 my-auto" />

        {/* Text Alignment */}
        <button
          type="button"
          onClick={() => updateStyle('textAlign', 'left')}
          className={`p-1.5 rounded transition-colors ${textAlign === 'left' ? 'bg-[#38BDF8] text-black font-black' : 'hover:bg-white/10 text-slate-300'}`}
          title="Align Left"
        >
          <AlignLeft className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => updateStyle('textAlign', 'center')}
          className={`p-1.5 rounded transition-colors ${textAlign === 'center' ? 'bg-[#38BDF8] text-black font-black' : 'hover:bg-white/10 text-slate-300'}`}
          title="Align Center"
        >
          <AlignCenter className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => updateStyle('textAlign', 'right')}
          className={`p-1.5 rounded transition-colors ${textAlign === 'right' ? 'bg-[#38BDF8] text-black font-black' : 'hover:bg-white/10 text-slate-300'}`}
          title="Align Right"
        >
          <AlignRight className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-4 bg-white/10 my-auto" />

        {/* Border Radius */}
        <button
          type="button"
          onClick={() => updateStyle('borderRadius', (elementStyle?.borderRadius || 0) === 24 ? 0 : 24)}
          className="p-1.5 hover:bg-white/10 rounded text-slate-300 flex items-center gap-1 font-mono text-xs"
          title="Toggle Border Radius"
        >
          <Box className="w-3.5 h-3.5 text-[#FF6B1A]" />
        </button>

      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2 shrink-0">
        <button
          type="button"
          onClick={() => onDeleteSelected && onDeleteSelected(selectedElement)}
          disabled={!selectedElement}
          className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 disabled:opacity-30 rounded-xl border border-red-500/20 transition-all"
          title="Delete Selected Element"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
