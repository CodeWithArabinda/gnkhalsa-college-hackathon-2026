import React, { useState, useRef, useEffect } from 'react';
import {
  PlusSquare, FileText, Palette, FolderArchive, Layers,
  HelpCircle
} from 'lucide-react';
import UserProfileDropup from './UserProfileDropup';
import AddElementsDrawer from './drawers/AddElementsDrawer';
import SiteStylesDrawer from './drawers/SiteStylesDrawer';
import PagesSectionsDrawer from './drawers/PagesSectionsDrawer';
import MediaAssetsDrawer from './drawers/MediaAssetsDrawer';
import LayersHelpDrawer from './drawers/LayersHelpDrawer';

const NAV_ITEMS = [
  { id: 'add', label: 'Add Elements', icon: PlusSquare },
  { id: 'styles', label: 'Site Styles & Themes', icon: Palette },
  { id: 'pages', label: 'Pages & Sections', icon: FileText },
  { id: 'media', label: 'Media Assets', icon: FolderArchive },
  { id: 'layers', label: 'Layer Tree', icon: Layers },
  { id: 'help', label: 'Help & Shortcuts', icon: HelpCircle }
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
      {/* 240px Neo-Brutalist Left Sidebar */}
      <aside
        id="left-studio-sidebar"
        className="w-[240px] bg-white border-r-[2.5px] border-black flex flex-col justify-between h-full z-30 select-none shrink-0 shadow-[4px_0px_0px_#000000]"
      >
        {/* Top Navigation Items */}
        <div className="p-3.5 space-y-3 overflow-y-auto font-sans text-xs">
          
          {/* Prominent Section Header */}
          <p className="text-xs font-mono font-black tracking-widest text-black uppercase mb-3 px-1.5 flex items-center gap-1.5 opacity-90">
            <span>STUDIO TOOLS</span>
          </p>

          <div className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const IconComp = item.icon;
              const isActive = (activeDrawer === item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleDrawer(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 transition-all cursor-pointer text-left text-sm ${
                    isActive
                      ? 'bg-[#FFE600] text-black border-black shadow-[3px_3px_0px_#000000] font-black'
                      : 'text-black border-transparent hover:border-black hover:bg-slate-50 hover:shadow-[2px_2px_0px_#000000] font-bold'
                  }`}
                >
                  <IconComp className="w-5 h-5 stroke-[2.2] text-black shrink-0" />
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
          className="w-[300px] bg-white border-2 border-black shadow-[6px_6px_0px_#000000] h-[calc(100vh-52px)] fixed left-[240px] top-[52px] z-20 overflow-y-auto p-4 transition-all duration-200"
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
