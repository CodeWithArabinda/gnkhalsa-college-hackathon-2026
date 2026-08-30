import React, { useState, useRef, useEffect } from 'react';
import {
  Plus, FileText, Palette, LayoutGrid, FolderOpen, Layers,
  HelpCircle
} from 'lucide-react';
import AddElementsDrawer from './drawers/AddElementsDrawer';
import SiteStylesDrawer from './drawers/SiteStylesDrawer';
import PagesSectionsDrawer from './drawers/PagesSectionsDrawer';
import MediaAssetsDrawer from './drawers/MediaAssetsDrawer';
import LayersHelpDrawer from './drawers/LayersHelpDrawer';

export default function LeftSidebarRail({
  schema,
  onAddElement,
  onReplaceImage,
  onMoveBlock,
  onDuplicateBlock,
  onDeleteBlock,
  onOpenSettings,
  selectedElement
}) {
  const [activeDrawer, setActiveDrawer] = useState(null); // 'add' | 'pages' | 'styles' | 'media' | 'layers' | null
  const drawerRef = useRef(null);

  // Auto-dismiss drawer on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        // Only close if click is not inside left rail
        const isLeftRail = e.target.closest('#left-sidebar-rail');
        if (!isLeftRail) {
          setActiveDrawer(null);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDrawer = (drawerName) => {
    setActiveDrawer(prev => prev === drawerName ? null : drawerName);
  };

  return (
    <>
      {/* Far-Left Vertical Icon Rail */}
      <aside id="left-sidebar-rail" className="w-[48px] bg-white border-r border-slate-200 flex flex-col items-center justify-between py-3 shrink-0 select-none z-30 shadow-xs relative">
        
        {/* Top Core Editor Tools */}
        <div className="flex flex-col items-center space-y-2">
          
          {/* + Add Element Tool */}
          <button
            type="button"
            onClick={() => toggleDrawer('add')}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
              activeDrawer === 'add'
                ? 'bg-[#0053ff] text-white shadow-xs'
                : 'bg-blue-50 hover:bg-blue-100 text-[#0053ff]'
            }`}
            title="Add Elements (+)"
          >
            <Plus className="w-5 h-5" />
          </button>

          <div className="w-6 h-px bg-slate-200 my-1" />

          {/* Pages & Sections */}
          <button
            type="button"
            onClick={() => toggleDrawer('pages')}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              activeDrawer === 'pages'
                ? 'bg-blue-50 text-[#0053ff] border-r-2 border-[#0053ff]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Pages & Sections"
          >
            <FileText className="w-4.5 h-4.5" />
          </button>

          {/* Site Styles */}
          <button
            type="button"
            onClick={() => toggleDrawer('styles')}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              activeDrawer === 'styles'
                ? 'bg-blue-50 text-[#0053ff] border-r-2 border-[#0053ff]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Site Styles & Themes"
          >
            <Palette className="w-4.5 h-4.5 text-amber-500" />
          </button>

          {/* Media & Assets */}
          <button
            type="button"
            onClick={() => toggleDrawer('media')}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              activeDrawer === 'media'
                ? 'bg-blue-50 text-[#0053ff] border-r-2 border-[#0053ff]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Media & Stock Assets"
          >
            <FolderOpen className="w-4.5 h-4.5 text-emerald-600" />
          </button>

          {/* Layer Tree & Shortcuts */}
          <button
            type="button"
            onClick={() => toggleDrawer('layers')}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              activeDrawer === 'layers'
                ? 'bg-blue-50 text-[#0053ff] border-r-2 border-[#0053ff]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Layers & Shortcuts"
          >
            <Layers className="w-4.5 h-4.5 text-cyan-600" />
          </button>

        </div>

        {/* Bottom Preferences & DOCKED USER PROFILE AVATAR */}
        <div className="flex flex-col items-center space-y-2.5">
          <button
            type="button"
            onClick={onOpenSettings}
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-900 transition-colors"
            title="Studio Settings"
          >
            <HelpCircle className="w-4.5 h-4.5" />
          </button>

          {/* DOCKED USER PROFILE TRIGGER (KP Avatar Circle) */}
          <button
            type="button"
            onClick={onOpenSettings}
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF6B1A] via-amber-400 to-amber-300 text-black font-extrabold text-xs flex items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer"
            title="Kshitij Pilankar (Free Plan) - Open Settings"
          >
            KP
          </button>
        </div>

      </aside>

      {/* Slide-Out Flyout Drawer Panel */}
      {activeDrawer && (
        <div
          ref={drawerRef}
          className="w-[300px] bg-white border-r border-slate-200 shadow-2xl h-[calc(100vh-48px)] fixed left-[48px] top-[48px] z-20 overflow-y-auto p-4 transition-all duration-200 animate-in fade-in slide-in-from-left-2"
        >
          {activeDrawer === 'add' && (
            <AddElementsDrawer
              onClose={() => setActiveDrawer(null)}
              onAddElement={(type) => {
                onAddElement && onAddElement(type);
                setActiveDrawer(null);
              }}
            />
          )}

          {activeDrawer === 'styles' && (
            <SiteStylesDrawer
              onClose={() => setActiveDrawer(null)}
            />
          )}

          {activeDrawer === 'pages' && (
            <PagesSectionsDrawer
              schema={schema}
              onClose={() => setActiveDrawer(null)}
              onMoveBlock={onMoveBlock}
              onDuplicateBlock={onDuplicateBlock}
              onDeleteBlock={onDeleteBlock}
            />
          )}

          {activeDrawer === 'media' && (
            <MediaAssetsDrawer
              onClose={() => setActiveDrawer(null)}
              onReplaceImage={(url) => {
                onReplaceImage && onReplaceImage(url);
                setActiveDrawer(null);
              }}
            />
          )}

          {activeDrawer === 'layers' && (
            <LayersHelpDrawer
              schema={schema}
              selectedElement={selectedElement}
              onClose={() => setActiveDrawer(null)}
            />
          )}
        </div>
      )}
    </>
  );
}
