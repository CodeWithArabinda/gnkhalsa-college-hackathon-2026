import React, { useState } from "react";
import { useBuilder } from "../../context/BuilderContext";
import {
  FileText,
  Sliders,
  LayoutTemplate,
  Eye,
  FolderKanban,
  ExternalLink,
  Sparkles,
  Save,
  Share2,
  PlusCircle,
  Monitor,
  Tablet,
  Smartphone,
  Check,
} from "lucide-react";
import PublishModal from "../publish/PublishModal";

export default function Navbar() {
  const {
    activeTab,
    setActiveTab,
    previewDevice,
    setPreviewDevice,
    portfolio,
    saveCurrentRecord,
    createNewPortfolio,
    openStandalonePreview,
  } = useBuilder();

  const [isSavedRecently, setIsSavedRecently] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);

  const handleSave = () => {
    saveCurrentRecord();
    setIsSavedRecently(true);
    setTimeout(() => setIsSavedRecently(false), 2000);
  };

  const navItems = [
    { id: "upload", label: "Upload Resume", icon: FileText },
    { id: "editor", label: "Content Editor", icon: Sliders },
    { id: "templates", label: "Templates", icon: LayoutTemplate },
    { id: "preview", label: "Live Split Preview", icon: Eye },
    { id: "dashboard", label: "My Portfolios", icon: FolderKanban },
  ] as const;

  return (
    <>
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Portfolio Name */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-emerald-400 p-[1.5px] shadow-lg shadow-purple-600/20">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-purple-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white font-display">
                  FolioCraft
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  AI BUILDER
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate max-w-[140px] sm:max-w-[220px]">
                {portfolio.full_name ? `${portfolio.full_name} (${portfolio.selected_template})` : "New Portfolio"}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 p-1 bg-slate-950/80 rounded-xl border border-slate-800/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all duration-150 ${
                    isActive
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2">
            {/* Device Switcher (Visible in preview / editor) */}
            {(activeTab === "editor" || activeTab === "preview") && (
              <div className="hidden lg:flex items-center bg-slate-950 rounded-lg p-1 border border-slate-800 text-slate-400">
                <button
                  onClick={() => setPreviewDevice("desktop")}
                  className={`p-1.5 rounded ${previewDevice === "desktop" ? "bg-slate-800 text-white" : "hover:text-slate-200"}`}
                  title="Desktop Preview"
                >
                  <Monitor className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setPreviewDevice("tablet")}
                  className={`p-1.5 rounded ${previewDevice === "tablet" ? "bg-slate-800 text-white" : "hover:text-slate-200"}`}
                  title="Tablet Preview"
                >
                  <Tablet className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setPreviewDevice("mobile")}
                  className={`p-1.5 rounded ${previewDevice === "mobile" ? "bg-slate-800 text-white" : "hover:text-slate-200"}`}
                  title="Mobile Preview"
                >
                  <Smartphone className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            {/* Open in New Tab (Lazy loads template in dedicated route!) */}
            <button
              onClick={() => openStandalonePreview()}
              title="Open lazy-loaded template in a new tab"
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-all shadow-sm"
            >
              <ExternalLink className="h-3.5 w-3.5 text-purple-400" />
              <span className="hidden sm:inline">New Tab</span>
            </button>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                isSavedRecently
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
              }`}
            >
              {isSavedRecently ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Save className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">{isSavedRecently ? "Saved!" : "Save"}</span>
            </button>

            {/* Export / Publish Button */}
            <button
              onClick={() => setShowPublishModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-600/30 transition-all"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Publish</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <nav className="flex md:hidden items-center justify-around mt-2 pt-2 border-t border-slate-800/80 text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`py-1 px-2 rounded-md flex flex-col items-center gap-0.5 ${
                  isActive ? "text-purple-400 font-bold" : "text-slate-400"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-[10px]">{item.label.split(" ")[0]}</span>
              </button>
            );
          })}
        </nav>
      </header>

      {showPublishModal && <PublishModal onClose={() => setShowPublishModal(false)} />}
    </>
  );
}
