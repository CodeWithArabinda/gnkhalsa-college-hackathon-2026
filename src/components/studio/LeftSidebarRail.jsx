import React from 'react';
import {
  Plus, FileText, Palette, LayoutGrid, FolderOpen, Layers,
  HelpCircle, User
} from 'lucide-react';

export default function LeftSidebarRail({ onAddClick, onOpenSettings }) {
  return (
    <aside className="w-[48px] bg-white border-r border-slate-200 flex flex-col items-center justify-between py-3 shrink-0 select-none z-20 shadow-xs">
      
      {/* Top Core Editor Tools */}
      <div className="flex flex-col items-center space-y-3">
        
        {/* + Add Element Tool */}
        <button
          type="button"
          onClick={onAddClick}
          className="w-8 h-8 rounded-lg bg-[#0053ff] hover:bg-[#0043cc] text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
          title="Add Elements (+)"
        >
          <Plus className="w-5 h-5 text-white" />
        </button>

        <div className="w-6 h-px bg-slate-200 my-1" />

        {/* Pages & Menu */}
        <button
          type="button"
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
          title="Pages & Menu"
        >
          <FileText className="w-4 h-4" />
        </button>

        {/* Site Styles */}
        <button
          type="button"
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
          title="Site Styles & Typography"
        >
          <Palette className="w-4 h-4 text-amber-500" />
        </button>

        {/* Apps & Widgets */}
        <button
          type="button"
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
          title="Apps & Section Blocks"
        >
          <LayoutGrid className="w-4 h-4 text-[#ff5100]" />
        </button>

        {/* Media & Assets */}
        <button
          type="button"
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
          title="Media & Image Uploads"
        >
          <FolderOpen className="w-4 h-4 text-emerald-600" />
        </button>

        {/* Layer Tree */}
        <button
          type="button"
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
          title="Layers & Section Tree"
        >
          <Layers className="w-4 h-4 text-cyan-600" />
        </button>

      </div>

      {/* Bottom Preferences & Help */}
      <div className="flex flex-col items-center space-y-2">
        <button
          type="button"
          onClick={onOpenSettings}
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition-colors"
          title="Help & Studio Settings"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* User Profile Initial Avatar Trigger */}
        <button
          type="button"
          onClick={onOpenSettings}
          className="w-7 h-7 rounded-full bg-amber-400 text-black font-extrabold text-[10px] flex items-center justify-center shadow-xs hover:scale-105 transition-transform cursor-pointer"
          title="User Account & Settings"
        >
          KP
        </button>
      </div>

    </aside>
  );
}
