import React, { useState } from 'react';
import { Globe, Trash2, Save, UserCheck } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useAuth } from '../../context/AuthContext';

export default function SettingsTab() {
  const { portfolio, updateProfileFields, savePortfolio, showToast } = usePortfolio();
  const { user } = useAuth();
  const [slugInput, setSlugInput] = useState(portfolio?.public_slug || 'my-portfolio');

  if (!portfolio) return null;

  const handleSlugUpdate = () => {
    const cleanSlug = slugInput.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
    updateProfileFields({ public_slug: cleanSlug });
    showToast && showToast('success', `Updated portfolio URL slug to /p/${cleanSlug}`);
  };

  const handleResetDraft = () => {
    if (window.confirm('Are you sure you want to clear this draft to blank?')) {
      localStorage.removeItem('stackfolio_active_draft');
      window.location.reload();
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-[#0F172A]">Workspace Settings</h1>
        <p className="font-hand text-xl text-slate-700 font-medium tracking-wide mt-1">
          Manage your public URL slug, account settings, and data preferences.
        </p>
      </div>

      {/* URL Customizer Card */}
      <div className="bg-white border-3 border-black p-6 rounded-2xl shadow-brutal space-y-4">
        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-black" />
          <h3 className="font-heading font-black text-lg text-black">Public URL Slug</h3>
        </div>

        <p className="text-xs text-slate-600 font-medium">
          Customize your permanent public URL link shared with recruiters.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex-1 bg-slate-50 border-2 border-black rounded-xl p-2.5 flex items-center space-x-1 text-xs font-mono font-bold">
            <span className="text-slate-400 select-none">{window.location.origin}/p/</span>
            <input
              type="text"
              value={slugInput}
              onChange={(e) => setSlugInput(e.target.value)}
              className="bg-transparent text-black font-extrabold focus:outline-none flex-1"
            />
          </div>
          <button
            type="button"
            onClick={handleSlugUpdate}
            className="px-5 py-2.5 bg-[#FFE600] text-black font-heading font-black text-xs border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
          >
            Update Slug
          </button>
        </div>
      </div>

      {/* Account Info Card */}
      <div className="bg-white border-3 border-black p-6 rounded-2xl shadow-brutal space-y-4 font-mono text-xs">
        <div className="flex items-center space-x-2">
          <UserCheck className="w-5 h-5 text-black" />
          <h3 className="font-heading font-black text-lg text-black">Account Details</h3>
        </div>

        <div className="space-y-2 pt-1">
          <div>
            <span className="text-slate-500 font-bold block text-[10px] uppercase">Authenticated Email</span>
            <span className="font-bold text-black text-sm">{user?.email || 'guest@stackfolio.demo'}</span>
          </div>
          <div>
            <span className="text-slate-500 font-bold block text-[10px] uppercase">User Session ID</span>
            <span className="font-bold text-slate-700 text-[11px] truncate block">{user?.id || 'guest-user-id'}</span>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-[#FF70A6]/20 border-3 border-black p-6 rounded-2xl shadow-brutal space-y-4">
        <h3 className="font-heading font-black text-lg text-black">Reset Workspace Draft</h3>
        <p className="text-xs text-slate-700 font-medium">
          Clears local draft memory and resets the editor to a clean blank state.
        </p>
        <button
          type="button"
          onClick={handleResetDraft}
          className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#FF70A6] text-black border-2 border-black rounded-xl text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#000] hover:bg-[#ff5290] transition-all"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear Active Draft</span>
        </button>
      </div>

    </div>
  );
}
