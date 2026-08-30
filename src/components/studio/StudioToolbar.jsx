import React, { useState } from 'react';
import {
  Plus, Sparkles, Image as ImageIcon, Link as LinkIcon, Eye, Box, Sliders,
  AlignLeft, AlignCenter, AlignRight, Maximize2, Minimize2, Trash2, ChevronDown,
  Type, Layers, Grid, Code
} from 'lucide-react';

export default function StudioToolbar({
  selectedElement,
  onAddElement,
  onAskAria,
  onReplaceImage,
  onAddLink,
  onToggleStyle,
  onAlignChange,
  onDeleteSelected
}) {
  const [showAddMenu, setShowAddMenu] = useState(false);

  return (
    <div className="bg-[#12141D] border-b border-black px-4 py-2 flex items-center justify-between z-30 shrink-0 text-white select-none overflow-x-auto shadow-md">
      
      {/* Left Action Buttons */}
      <div className="flex items-center space-x-2 shrink-0">
        
        {/* + Add Menu */}
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

      {/* Center Style Quick Tools */}
      <div className="flex items-center space-x-1 border-x border-white/10 px-3 mx-2 shrink-0">
        
        {/* Alignment */}
        <button
          type="button"
          onClick={() => onAlignChange && onAlignChange('left')}
          className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white"
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => onAlignChange && onAlignChange('center')}
          className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white"
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => onAlignChange && onAlignChange('right')}
          className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white"
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>

        <div className="w-px h-4 bg-white/10 my-auto" />

        {/* Style Toggles */}
        <button
          type="button"
          onClick={() => onToggleStyle && onToggleStyle('border')}
          className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white"
          title="Toggle Border"
        >
          <Box className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => onToggleStyle && onToggleStyle('opacity')}
          className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white"
          title="Toggle Opacity"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => onToggleStyle && onToggleStyle('shadow')}
          className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white"
          title="Toggle Drop Shadow"
        >
          <Sliders className="w-4 h-4" />
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
