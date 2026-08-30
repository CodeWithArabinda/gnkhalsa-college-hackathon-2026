import React, { useRef } from 'react';
import {
  Plus, Sparkles, Image as ImageIcon, Link as LinkIcon, Type,
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Box,
  Trash2, ChevronDown, Minus, Plus as PlusIcon, Code, Grid, Upload, Sliders, Crop, Settings, Maximize2
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
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-white/95 backdrop-blur-md border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-full px-3.5 py-1.5 flex items-center gap-1.5 text-slate-800 text-xs select-none pointer-events-auto">
      
      {/* Hidden File Input for Native Image Uploads */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* + Add Pill */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowAddMenu(!showAddMenu)}
          className="flex items-center gap-1 bg-slate-100 text-slate-900 font-bold px-3 py-1 rounded-full text-xs hover:bg-slate-200 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 text-slate-900" />
          <span>Add</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
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
        className="flex items-center gap-1 px-2.5 py-1 hover:bg-slate-100 rounded-full font-medium text-slate-700 transition-colors"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#0053ff]" />
        <span>Ask Aria</span>
      </button>

      {/* 🖼 Replace Image */}
      <button
        type="button"
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
        className="flex items-center gap-1 px-2.5 py-1 hover:bg-slate-100 rounded-full font-medium text-slate-700 transition-colors"
      >
        <Upload className="w-3.5 h-3.5 text-amber-600" />
        <span>Replace Image</span>
      </button>

      {/* 🔗 Link */}
      <button
        type="button"
        onClick={() => onAddLink && onAddLink(selectedElement)}
        className="flex items-center gap-1 px-2.5 py-1 hover:bg-slate-100 rounded-full font-medium text-slate-700 transition-colors"
      >
        <LinkIcon className="w-3.5 h-3.5 text-emerald-600" />
        <span>Link</span>
      </button>

      {/* Divider */}
      <div className="h-4 w-[1px] bg-slate-200 mx-1" />

      {/* Image Specific Formatting Pill */}
      {isImageElement && (
        <div className="flex items-center space-x-1 bg-slate-100 px-2 py-0.5 rounded-full font-sans text-xs">
          <span className="text-[10px] text-[#0053ff] font-bold uppercase">Size:</span>
          <button type="button" onClick={() => { updateStyle('width', 144); updateStyle('height', 144); }} className="px-1.5 py-0.5 hover:bg-white rounded font-bold">S</button>
          <button type="button" onClick={() => { updateStyle('width', 240); updateStyle('height', 240); }} className="px-1.5 py-0.5 hover:bg-white rounded font-bold">M</button>
          <button type="button" onClick={() => { updateStyle('width', 360); updateStyle('height', 360); }} className="px-1.5 py-0.5 hover:bg-white rounded font-bold">L</button>
        </div>
      )}

      {/* Formatting Tools */}
      <button
        type="button"
        onClick={() => updateStyle('fontWeight', isBold ? '400' : '900')}
        className={`p-1 rounded-full transition-colors ${isBold ? 'bg-[#0053ff] text-white' : 'hover:bg-slate-100 text-slate-600'}`}
        title="Bold"
      >
        <Bold className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={() => updateStyle('textAlign', textAlign === 'left' ? 'center' : 'left')}
        className="p-1 hover:bg-slate-100 rounded-full text-slate-600"
        title="Align Text"
      >
        <AlignLeft className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        className="p-1 hover:bg-slate-100 rounded-full text-slate-600"
        title="Crop Image / Mask"
      >
        <Crop className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        className="p-1 hover:bg-slate-100 rounded-full text-slate-600"
        title="Stretch Element Width"
      >
        <Maximize2 className="w-3.5 h-3.5" />
      </button>

      {/* Delete Trigger */}
      <button
        type="button"
        onClick={() => onDeleteSelected && onDeleteSelected(selectedElement)}
        disabled={!selectedElement}
        className="p-1 text-red-500 hover:bg-red-50 disabled:opacity-30 rounded-full transition-colors ml-1"
        title="Delete Selected Element"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>

    </div>
  );
}
