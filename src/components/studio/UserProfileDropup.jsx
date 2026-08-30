import React, { useState, useRef, useEffect } from 'react';
import { ChevronUp, Sparkles, User, Settings, LogOut, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStudioTheme } from '../../context/ThemeContext';

export default function UserProfileDropup({ onOpenSettings }) {
  const { isLight } = useStudioTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropupRef = useRef(null);
  const navigate = useNavigate();

  // User details (Reads from localStorage or default hackathon user profile)
  const userName = 'Kshitij Pilankar';
  const userEmail = 'kshitijpilankar@gmail.com';
  const userInitials = 'KP';

  // Outside click listener to auto-dismiss popover
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
    <div ref={dropupRef} className="fixed bottom-4 left-4 z-40 select-none">
      
      {/* ANIMATED EXPANDABLE FLYOUT MENU (Expands Upwards) */}
      {isOpen && (
        <div className={`absolute bottom-full left-0 mb-3 w-72 border-2 rounded-2xl p-2.5 shadow-2xl z-50 space-y-1 font-sans text-xs animate-in fade-in slide-in-from-bottom-2 duration-150 transition-colors ${
          isLight ? 'bg-white border-slate-200 text-slate-800 shadow-2xl' : 'bg-[#181A24] border-black text-white shadow-2xl'
        }`}>
          
          {/* Header Info */}
          <div className={`px-3 py-2.5 border-b flex items-center gap-3 ${
            isLight ? 'border-slate-200' : 'border-white/10'
          }`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF6B1A] via-amber-400 to-amber-300 text-black font-extrabold flex items-center justify-center text-sm shrink-0 shadow-md">
              {userInitials}
            </div>
            <div className="min-w-0 flex-1">
              <p className={`font-bold text-sm truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>{userName}</p>
              <p className={`text-xs truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{userEmail}</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="pt-1.5 space-y-1 font-mono">
            <button
              type="button"
              onClick={() => { setIsOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left font-bold transition-colors text-xs ${
                isLight ? 'hover:bg-slate-100 text-amber-600' : 'hover:bg-white/10 text-amber-400'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#FF6B1A]" /> Upgrade Plan
              <span className="ml-auto text-[9px] bg-[#FF6B1A] text-black px-1.5 py-0.5 rounded uppercase font-black">Pro</span>
            </button>

            <button
              type="button"
              onClick={() => { setIsOpen(false); navigate('/dashboard'); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors text-xs ${
                isLight ? 'hover:bg-slate-100 text-slate-700 hover:text-slate-900' : 'hover:bg-white/10 text-slate-200 hover:text-white'
              }`}
            >
              <User className="w-4 h-4 text-[#38BDF8]" /> Account Profile
            </button>

            <button
              type="button"
              onClick={() => { setIsOpen(false); onOpenSettings && onOpenSettings(); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors text-xs ${
                isLight ? 'hover:bg-slate-100 text-slate-700 hover:text-slate-900' : 'hover:bg-white/10 text-slate-200 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4 text-[#FFE600]" /> Settings
            </button>

            <div className={`w-full h-px my-1 ${isLight ? 'bg-slate-200' : 'bg-white/10'}`} />

            <button
              type="button"
              onClick={() => { setIsOpen(false); navigate('/dashboard'); }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-red-500/10 text-red-500 rounded-xl text-left transition-colors text-xs"
            >
              <LogOut className="w-4 h-4" /> Exit Studio / Dashboard
            </button>
          </div>

        </div>
      )}

      {/* ENLARGED COLLAPSED TRIGGER BUTTON */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`min-w-[220px] px-3.5 py-2.5 rounded-xl border backdrop-blur-md flex items-center justify-between gap-3 transition-all hover:scale-105 active:scale-95 cursor-pointer ${
          isLight
            ? 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-lg'
            : 'bg-zinc-900/90 border-zinc-800 text-white hover:bg-zinc-800/90 shadow-2xl'
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FF6B1A] via-amber-400 to-amber-300 text-black font-extrabold flex items-center justify-center text-xs shadow-md shrink-0">
            {userInitials}
          </div>

          <div className="text-left font-sans min-w-0">
            <p className={`text-sm font-semibold tracking-wide truncate ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>{userName}</p>
            <p className={`text-xs font-medium flex items-center gap-1 ${
              isLight ? 'text-amber-600' : 'text-amber-400/90'
            }`}>Free Plan</p>
          </div>
        </div>

        <ChevronUp className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
          isOpen ? 'rotate-180 text-amber-500' : isLight ? 'text-slate-400' : 'text-slate-400'
        }`} />
      </button>

    </div>
  );
}
