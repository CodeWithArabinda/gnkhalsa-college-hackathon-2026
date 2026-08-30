import React, { useRef } from 'react';
import {
  Plus, Sparkles, Image as ImageIcon, Link as LinkIcon, Type,
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Box,
  Trash2, ChevronDown, Minus, Plus as PlusIcon, Code, Grid, Upload, Sliders, Crop
} from 'lucide-react';

const FONTS = [
  'Plus Jakarta Sans, sans-serif',
  'Inter, sans-serif',
  'Outfit, sans-serif',
  'Space Grotesk, sans-serif',
  'JetBrains Mono, monospace'
];

const PRESET_COLORS = [
  '#000000', '#0053ff', '#ff5100', '#00FFA3', '#38BDF8', '#A855F7', '#FFFFFF'
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
  const [showAddMenu, setShowAddMenu] = React.useState(false);
  const [showFontMenu, setShowFontMenu] = React.useState(false);
  const [showColorMenu, setShowColorMenu] = React.useState(false);
  const fileInputRef = useRef(null);

  const currentFontSize = elementStyle?.fontSize || 16;
  const currentFontFamily = elementStyle?.fontFamily || 'Plus Jakarta Sans, sans-serif';
  const currentColor = elementStyle?.color || '#000000';
  const isBold = elementStyle?.fontWeight === '700' || elementStyle?.fontWeight === '900' || elementStyle?.fontWeight === 'bold';
  const isItalic = elementStyle?.fontStyle === 'italic';
  const isUnderline = elementStyle?.textDecoration === 'underline';
  const textAlign = elementStyle?.textAlign || 'left';
  const isImageElement = selectedElement?.key === 'hero-avatar' || selectedElement?.label?.toLowerCase().includes('image');

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
    <div className="bg-white/95 border border-slate-200 shadow-md rounded-xl px-3 py-1.5 flex items-center justify-between z-30 shrink-0 text-slate-800 select-none overflow-x-auto my-2 mx-4">
      
      {/* Hidden File Input for Native Image Uploads */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Left Core Actions Ribbon */}
      <div className="flex items-center space-x-2 shrink-0">
        
        {/* + Add Primary Pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0053ff] hover:bg-[#0043cc] text-white font-bold text-xs rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>Add</span>
            <ChevronDown className="w-3 h-3 text-white ml-0.5" />
          </button>

          {showAddMenu && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl p-1.5 shadow-xl z-50 space-y-1 font-sans text-xs text-slate-800">
              <button
                type="button"
                onClick={() => { onAddElement('text'); setShowAddMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-100 rounded-lg text-left font-medium"
              >
                <Type className="w-4 h-4 text-[#0053ff]" /> Add Text Block
              </button>
              <button
                type="button"
                onClick={() => { onAddElement('image'); setShowAddMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-100 rounded-lg text-left font-medium"
              >
                <ImageIcon className="w-4 h-4 text-amber-500" /> Add Image Frame
              </button>
              <button
                type="button"
                onClick={() => { onAddElement('project'); setShowAddMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-100 rounded-lg text-left font-medium"
              >
                <Grid className="w-4 h-4 text-[#ff5100]" /> Add Project Card
              </button>
              <button
                type="button"
                onClick={() => { onAddElement('skill'); setShowAddMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-100 rounded-lg text-left font-medium"
              >
                <Code className="w-4 h-4 text-emerald-600" /> Add Skill Badge
              </button>
            </div>
          )}
        </div>

        {/* ✨ Ask Aria */}
        <button
          type="button"
          onClick={() => onAskAria && onAskAria(selectedElement)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#0053ff]" />
          <span>Ask Aria</span>
        </button>

        {/* 🖼 Replace Image */}
        <button
          type="button"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-colors"
        >
          <Upload className="w-3.5 h-3.5 text-amber-600" />
          <span>Replace Image</span>
        </button>

        {/* 🔗 Link */}
        <button
          type="button"
          onClick={() => onAddLink && onAddLink(selectedElement)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-colors"
        >
          <LinkIcon className="w-3.5 h-3.5 text-emerald-600" />
          <span>Link</span>
        </button>

      </div>

      {/* Center Formatting Ribbon */}
      <div className="flex items-center space-x-1.5 border-x border-slate-200 px-3 mx-2 shrink-0">
        
        {/* Dedicated Image Formatting Tools */}
        {isImageElement && (
          <div className="flex items-center space-x-1.5 mr-2 bg-slate-100 p-1 rounded-lg border border-slate-200 font-sans text-xs">
            <span className="text-[10px] text-[#0053ff] font-bold uppercase px-1">Size:</span>
            <button
              type="button"
              onClick={() => { updateStyle('width', 144); updateStyle('height', 144); }}
              className="px-2 py-0.5 hover:bg-white rounded text-slate-700 font-bold"
              title="Small (144px)"
            >
              S
            </button>
            <button
              type="button"
              onClick={() => { updateStyle('width', 240); updateStyle('height', 240); }}
              className="px-2 py-0.5 hover:bg-white rounded text-slate-700 font-bold"
              title="Medium (240px)"
            >
              M
            </button>
            <button
              type="button"
              onClick={() => { updateStyle('width', 360); updateStyle('height', 360); }}
              className="px-2 py-0.5 hover:bg-white rounded text-slate-700 font-bold"
              title="Large (360px)"
            >
              L
            </button>
            <div className="w-px h-3 bg-slate-300" />
            <button
              type="button"
              onClick={() => updateStyle('borderRadius', (elementStyle?.borderRadius || 0) === 9999 ? 24 : 9999)}
              className="px-2 py-0.5 hover:bg-white rounded text-[#ff5100] font-bold"
              title="Toggle Circle/Box"
            >
              Circle
            </button>
          </div>
        )}

        {/* Color Picker */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowColorMenu(!showColorMenu)}
            className="p-1.5 hover:bg-slate-100 rounded-md flex items-center gap-1 text-xs font-medium"
            title="Text Color"
          >
            <span className="w-4 h-4 rounded-full border border-slate-300 shadow-xs" style={{ backgroundColor: currentColor }} />
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>

          {showColorMenu && (
            <div className="absolute top-full left-0 mt-2 p-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 flex gap-1.5">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => { updateStyle('color', c); setShowColorMenu(false); }}
                  className="w-5 h-5 rounded-full border border-slate-300 hover:scale-125 transition-transform"
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
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-md text-xs font-semibold text-slate-700"
          >
            <span className="max-w-[90px] truncate">{currentFontFamily.split(',')[0]}</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>

          {showFontMenu && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl p-1 shadow-xl z-50 space-y-1 font-sans text-xs text-slate-800">
              {FONTS.map((font) => (
                <button
                  key={font}
                  type="button"
                  onClick={() => { updateStyle('fontFamily', font); setShowFontMenu(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-slate-100 rounded-md truncate font-medium"
                  style={{ fontFamily: font }}
                >
                  {font.split(',')[0]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Font Size Step Controls */}
        <div className="flex items-center bg-slate-100 border border-slate-200 rounded-md px-1 space-x-1 text-xs">
          <button
            type="button"
            onClick={() => updateStyle('fontSize', Math.max(10, currentFontSize - 2))}
            className="p-1 hover:bg-white rounded text-slate-700"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="px-1 font-bold text-slate-900 min-w-[28px] text-center">{currentFontSize}px</span>
          <button
            type="button"
            onClick={() => updateStyle('fontSize', Math.min(120, currentFontSize + 2))}
            className="p-1 hover:bg-white rounded text-slate-700"
          >
            <PlusIcon className="w-3 h-3" />
          </button>
        </div>

        <div className="w-px h-4 bg-slate-200 my-auto" />

        {/* Bold, Italic, Underline */}
        <button
          type="button"
          onClick={() => updateStyle('fontWeight', isBold ? '400' : '900')}
          className={`p-1.5 rounded-md transition-colors ${isBold ? 'bg-[#0053ff] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}
          title="Bold"
        >
          <Bold className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => updateStyle('fontStyle', isItalic ? 'normal' : 'italic')}
          className={`p-1.5 rounded-md transition-colors ${isItalic ? 'bg-[#0053ff] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}
          title="Italic"
        >
          <Italic className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => updateStyle('textDecoration', isUnderline ? 'none' : 'underline')}
          className={`p-1.5 rounded-md transition-colors ${isUnderline ? 'bg-[#0053ff] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}
          title="Underline"
        >
          <Underline className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-4 bg-slate-200 my-auto" />

        {/* Text Alignment */}
        <button
          type="button"
          onClick={() => updateStyle('textAlign', 'left')}
          className={`p-1.5 rounded-md transition-colors ${textAlign === 'left' ? 'bg-[#0053ff] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}
          title="Align Left"
        >
          <AlignLeft className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => updateStyle('textAlign', 'center')}
          className={`p-1.5 rounded-md transition-colors ${textAlign === 'center' ? 'bg-[#0053ff] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}
          title="Align Center"
        >
          <AlignCenter className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => updateStyle('textAlign', 'right')}
          className={`p-1.5 rounded-md transition-colors ${textAlign === 'right' ? 'bg-[#0053ff] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}
          title="Align Right"
        >
          <AlignRight className="w-3.5 h-3.5" />
        </button>

      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-1.5 shrink-0">
        <button
          type="button"
          onClick={() => onDeleteSelected && onDeleteSelected(selectedElement)}
          disabled={!selectedElement}
          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 disabled:opacity-30 rounded-lg border border-red-200 transition-all"
          title="Delete Selected Element"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
