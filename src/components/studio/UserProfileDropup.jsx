import React, { useState, useRef, useEffect } from 'react';
import { ChevronUp, Sparkles, User, Settings, LogOut, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UserProfileDropup({ onOpenSettings }) {
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
        <div className="absolute bottom-full left-0 mb-3 w-64 bg-[#181A24] border-2 border-black rounded-2xl p-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-50 text-white space-y-1 font-mono text-xs animate-in fade-in slide-in-from-bottom-2 duration-150">
          
          {/* Header Info */}
          <div className="px-3 py-2.5 border-b border-white/10 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF6B1A] to-amber-300 text-black font-extrabold flex items-center justify-center text-xs shrink-0 shadow-md">
              {userInitials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-white text-xs truncate">{userName}</p>
              <p className="text-[10px] text-slate-400 truncate">{userEmail}</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="pt-1 space-y-0.5">
            <button
              type="button"
              onClick={() => { setIsOpen(false); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-white/10 rounded-xl text-left text-amber-400 font-bold transition-colors"
            >
              <Sparkles className="w-4 h-4 text-[#FF6B1A]" /> Upgrade Plan
              <span className="ml-auto text-[9px] bg-[#FF6B1A] text-black px-1.5 py-0.5 rounded uppercase font-black">Pro</span>
            </button>

            <button
              type="button"
              onClick={() => { setIsOpen(false); navigate('/dashboard'); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-white/10 rounded-xl text-left text-slate-200 hover:text-white transition-colors"
            >
              <User className="w-4 h-4 text-[#38BDF8]" /> Account Profile
            </button>

            <button
              type="button"
              onClick={() => { setIsOpen(false); onOpenSettings && onOpenSettings(); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-white/10 rounded-xl text-left text-slate-200 hover:text-white transition-colors"
            >
              <Settings className="w-4 h-4 text-[#FFE600]" /> Settings
            </button>

            <div className="w-full h-px bg-white/10 my-1" />

            <button
              type="button"
              onClick={() => { setIsOpen(false); navigate('/dashboard'); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-red-500/10 text-red-400 rounded-xl text-left transition-colors"
            >
              <LogOut className="w-4 h-4" /> Exit Studio / Dashboard
            </button>
          </div>

        </div>
      )}

      {/* COLLAPSED TRIGGER BUTTON (ChatGPT Style Pill) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#181A24]/95 hover:bg-[#202330] border-2 border-black rounded-2xl px-3 py-2 shadow-2xl flex items-center gap-3 text-white transition-all hover:scale-105 active:scale-95"
      >
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FF6B1A] to-amber-300 text-black font-extrabold flex items-center justify-center text-xs shadow">
          {userInitials}
        </div>

        <div className="text-left font-mono">
          <p className="text-xs font-bold leading-none text-white">{userName}</p>
          <p className="text-[9px] text-amber-400 leading-tight">Free Plan</p>
        </div>

        <ChevronUp className={`w-4 h-4 text-slate-400 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180 text-white' : ''}`} />
      </button>

    </div>
  );
}
