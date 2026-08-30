import React, { useState, useRef, useEffect } from 'react';
import {
  Plus, FileText, Palette, FolderOpen, Layers,
  HelpCircle
} from 'lucide-react';
import UserProfileDropup from './UserProfileDropup';
import AddElementsDrawer from './drawers/AddElementsDrawer';
import SiteStylesDrawer from './drawers/SiteStylesDrawer';
import PagesSectionsDrawer from './drawers/PagesSectionsDrawer';
import MediaAssetsDrawer from './drawers/MediaAssetsDrawer';
import LayersHelpDrawer from './drawers/LayersHelpDrawer';

const NAV_ITEMS = [
  { id: 'add', label: 'Add Elements', icon: Plus, iconColor: 'text-[#0053ff]' },
  { id: 'styles', label: 'Site Styles & Themes', icon: Palette, iconColor: 'text-amber-500' },
  { id: 'pages', label: 'Pages & Sections', icon: FileText, iconColor: 'text-[#ff5100]' },
  { id: 'media', label: 'Media Assets', icon: FolderOpen, iconColor: 'text-emerald-600' },
  { id: 'layers', label: 'Layer Tree', icon: Layers, iconColor: 'text-cyan-600' },
  { id: 'help', label: 'Help & Shortcuts', icon: HelpCircle, iconColor: 'text-slate-500' }
];

export default function LeftSidebar({
  schema,
  onAddElement,
  onReplaceImage,
  onMoveBlock,
  onDuplicateBlock,
  onDeleteBlock,
  onOpenSettings,
  selectedElement
}) {
  const [activeDrawer, setActiveDrawer] = useState(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        const isSidebar = e.target.closest('#left-studio-sidebar');
        if (!isSidebar) {
          setActiveDrawer(null);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDrawer = (id) => {
    setActiveDrawer(prev => prev === id ? null : id);
  };

  return (
    <>
      {/* 230px Light Studio Labeled Left Sidebar */}
      <aside
        id="left-studio-sidebar"
        className="w-[230px] bg-white text-slate-700 border-r border-slate-200 flex flex-col justify-between h-full z-30 select-none shrink-0"
      >
        {/* Top Navigation Items */}
        <div className="p-3 space-y-1 overflow-y-auto font-sans text-xs">
          <p className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5">
            Studio Tools
          </p>

          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const IconComp = item.icon;
              const isActive = (activeDrawer === item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleDrawer(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left text-xs ${
                    isActive
                      ? 'bg-blue-50 text-[#0053ff] font-bold border-r-2 border-[#0053ff] shadow-2xs'
                      : 'text-slate-700 font-semibold hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className={`p-1 rounded-lg ${isActive ? 'bg-[#0053ff] text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : item.iconColor}`} />
                  </div>
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* DOCKED USER PROFILE CARD AT SIDEBAR BOTTOM */}
        <UserProfileDropup onOpenSettings={onOpenSettings} />
      </aside>

      {/* Slide-Out Flyout Drawer Panel */}
      {activeDrawer && (
        <div
          ref={drawerRef}
          className="w-[300px] bg-white border-r border-slate-200 shadow-2xl h-[calc(100vh-48px)] fixed left-[230px] top-[48px] z-20 overflow-y-auto p-4 transition-all duration-200 animate-in fade-in slide-in-from-left-2"
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

          {(activeDrawer === 'layers' || activeDrawer === 'help') && (
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
