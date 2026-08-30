import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, User, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UserProfileDropup({ onOpenSettings }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropupRef = useRef(null);
  const navigate = useNavigate();

  const userName = 'Kshitij Pilankar';
  const userEmail = 'kshitijpilankar@gmail.com';
  const userInitials = 'KP';

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropupRef.current && !dropupRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropupRef} className="relative w-full p-2 border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121216] select-none">
      
      {/* Expandable Menu Popover (Expands Upwards above Sidebar Trigger) */}
      {isOpen && (
        <div className="absolute bottom-16 left-2 w-[210px] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl rounded-2xl p-2 z-50 space-y-1 font-sans text-xs animate-in fade-in slide-in-from-bottom-2 duration-150">
          
          {/* Header Info */}
          <div className="px-2.5 py-2 border-b border-slate-100 dark:border-zinc-800 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#0053ff] text-white font-extrabold flex items-center justify-center text-xs shrink-0 shadow-xs">
              {userInitials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-slate-900 dark:text-white text-xs truncate">{userName}</p>
              <p className="text-[10px] text-slate-500 dark:text-zinc-400 truncate">{userEmail}</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="pt-1 space-y-0.5 font-sans">
            <button
              type="button"
              onClick={() => { setIsOpen(false); }}
              className="w-full flex items-center gap-2 px-2.5 py-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-xl text-left font-semibold text-amber-600 text-xs transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ff5100]" /> Upgrade Plan
              <span className="ml-auto text-[9px] bg-[#ff5100] text-white px-1.5 py-0.5 rounded uppercase font-extrabold">Pro</span>
            </button>

            <button
              type="button"
              onClick={() => { setIsOpen(false); navigate('/dashboard'); }}
              className="w-full flex items-center gap-2 px-2.5 py-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-xl text-left text-slate-700 dark:text-zinc-200 text-xs transition-colors"
            >
              <User className="w-3.5 h-3.5 text-[#0053ff]" /> Account Profile
            </button>

            <button
              type="button"
              onClick={() => { setIsOpen(false); onOpenSettings && onOpenSettings(); }}
              className="w-full flex items-center gap-2 px-2.5 py-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-xl text-left text-slate-700 dark:text-zinc-200 text-xs transition-colors"
            >
              <Settings className="w-3.5 h-3.5 text-amber-500" /> Settings
            </button>

            <div className="w-full h-px bg-slate-100 dark:bg-zinc-800 my-1" />

            <button
              type="button"
              onClick={() => { setIsOpen(false); navigate('/dashboard'); }}
              className="w-full flex items-center gap-2 px-2.5 py-2 hover:bg-red-50 text-red-500 rounded-xl text-left text-xs transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> Exit Studio
            </button>
          </div>

        </div>
      )}

      {/* High Contrast Docked Profile Card Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/60 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer text-left"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#0053ff] text-white font-bold text-xs flex items-center justify-center shadow-sm shrink-0">
            {userInitials}
          </div>

          <div className="text-left font-sans min-w-0">
            <p className="text-xs font-bold text-slate-900 dark:text-white truncate block text-left leading-tight">
              {userName}
            </p>
            <p className="text-[10px] font-semibold text-slate-500 dark:text-zinc-400 block text-left leading-tight">
              Free Plan
            </p>
          </div>
        </div>

        <Settings className="w-4 h-4 text-slate-400 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-white shrink-0 transition-colors" />
      </button>

    </div>
  );
}
