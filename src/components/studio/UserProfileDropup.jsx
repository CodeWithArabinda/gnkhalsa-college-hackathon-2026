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
    <div ref={dropupRef} className="relative w-full p-2 border-t-2 border-black/10 bg-white select-none">
      
      {/* Neo-Brutalist Expandable Menu Popover */}
      {isOpen && (
        <div className="absolute bottom-16 left-2 w-[220px] bg-white border-[2.5px] border-black shadow-[6px_6px_0px_#000000] rounded-2xl p-2.5 z-50 space-y-1 font-sans text-xs animate-in fade-in slide-in-from-bottom-2 duration-150">
          
          {/* Header Info */}
          <div className="p-2 bg-slate-50 border-2 border-black rounded-xl shadow-[2px_2px_0px_#000000] flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FFE600] border-2 border-black text-black font-black flex items-center justify-center text-xs shrink-0 shadow-[1.5px_1.5px_0px_#000000]">
              {userInitials}
            </div>
            <div className="min-w-0 flex-1 font-sans">
              <p className="font-black text-black text-xs truncate">{userName}</p>
              <p className="text-[10px] font-mono font-bold text-slate-600 truncate">{userEmail}</p>
            </div>
          </div>

          {/* Menu Actions */}
          <div className="pt-1 space-y-1 font-sans">
            <button
              type="button"
              onClick={() => { setIsOpen(false); }}
              className="w-full bg-[#FFE600] text-black font-black border-2 border-black shadow-[2px_2px_0px_#000000] hover:bg-[#ebd300] rounded-xl p-2 my-1 flex items-center justify-between text-xs cursor-pointer transition-all"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>Upgrade Plan</span>
              </div>
              <span className="text-[9px] bg-black text-white px-1.5 py-0.5 rounded font-black uppercase">
                PRO
              </span>
            </button>

            <button
              type="button"
              onClick={() => { setIsOpen(false); navigate('/dashboard'); }}
              className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 font-bold text-xs text-black border border-transparent hover:border-black cursor-pointer transition-all"
            >
              <User className="w-4 h-4 text-black" />
              <span>Account Profile</span>
            </button>

            <button
              type="button"
              onClick={() => { setIsOpen(false); onOpenSettings && onOpenSettings(); }}
              className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 font-bold text-xs text-black border border-transparent hover:border-black cursor-pointer transition-all"
            >
              <Settings className="w-4 h-4 text-black" />
              <span>Settings</span>
            </button>

            <div className="border-t-2 border-black my-1.5" />

            <button
              type="button"
              onClick={() => { setIsOpen(false); navigate('/dashboard'); }}
              className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-rose-50 font-black text-xs text-rose-600 border border-transparent hover:border-black transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-rose-600" />
              <span>Exit to Dashboard</span>
            </button>
          </div>

        </div>
      )}

      {/* Docked Profile Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_#000000] hover:bg-slate-50 cursor-pointer transition-all text-black"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#FFE600] border-2 border-black text-black font-black text-xs flex items-center justify-center shadow-[1.5px_1.5px_0px_#000000] shrink-0">
            {userInitials}
          </div>

          <div className="text-left font-sans min-w-0">
            <p className="text-xs font-black text-black truncate block text-left leading-tight">
              {userName}
            </p>
            <p className="text-[10px] font-bold text-slate-600 block text-left leading-tight">
              Free Plan
            </p>
          </div>
        </div>

        <Settings className="w-4 h-4 text-black hover:rotate-45 transition-transform shrink-0" />
      </button>

    </div>
  );
}
