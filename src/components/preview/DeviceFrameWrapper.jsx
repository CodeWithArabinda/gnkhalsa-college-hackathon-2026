import React from 'react';

export default function DeviceFrameWrapper({ mode, children }) {
  if (mode === 'mobile') {
    return (
      <div className="w-[390px] max-w-full h-[720px] rounded-[36px] border-[6px] border-black bg-[#FFFDF8] shadow-[8px_8px_0px_0px_#000] overflow-hidden flex flex-col relative shrink-0 box-border">
        {/* Simulated Mobile Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-b-xl z-50 pointer-events-none" />
        
        {/* Screen Content Wrapper */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden pt-4 h-full w-full">
          {children}
        </div>
      </div>
    );
  }

  // Desktop Mode
  return (
    <div className="w-full max-w-[1280px] h-[90%] rounded-xl border-3 border-black bg-[#FFFDF8] shadow-brutal overflow-hidden flex flex-col box-border">
      {/* Window Title Bar */}
      <div className="bg-slate-100 border-b-3 border-black px-4 py-2 flex items-center justify-between text-xs font-mono select-none shrink-0 gap-2">
        <div className="flex items-center space-x-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 border border-black/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 border border-black/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 border border-black/40" />
        </div>
        <div className="text-slate-500 font-semibold truncate max-w-xs text-[11px]">
          portfolio-preview-canvas.html
        </div>
        <div className="w-8 shrink-0" />
      </div>

      {/* Screen Content Wrapper */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden w-full">
        {children}
      </div>
    </div>
  );
}

