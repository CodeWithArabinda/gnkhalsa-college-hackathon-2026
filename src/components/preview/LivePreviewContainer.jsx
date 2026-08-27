import React, { useState } from 'react';
import DeviceFrameWrapper from './DeviceFrameWrapper';
import TemplateRenderer from '../templates/TemplateRenderer';
import { Laptop, Smartphone } from 'lucide-react';

export default function LivePreviewContainer({ portfolio, onTemplateChange }) {
  const [deviceMode, setDeviceMode] = useState('desktop');

  if (!portfolio) return null;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      {/* Top Controls Bar */}
      <div className="absolute top-4 left-6 right-6 flex justify-between items-center z-10">
        
        {/* Template Selector Sticker */}
        <div className="flex items-center space-x-2 bg-white px-3 py-1.5 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000] text-xs font-bold font-mono">
          <span className="text-slate-500">Layout:</span>
          <select
            value={portfolio.selected_template || 'dark_developer'}
            onChange={onTemplateChange}
            className="bg-transparent text-black font-extrabold focus:outline-none cursor-pointer"
          >
            <option value="dark_developer">Dark Developer</option>
            <option value="light_corporate">Light Corporate</option>
          </select>
        </div>

        {/* Desktop / Mobile Switcher (Sticker) */}
        <div className="flex bg-white p-1 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000]">
          <button
            type="button"
            onClick={() => setDeviceMode('desktop')}
            className={`p-1.5 rounded-md border-2 transition-all ${
              deviceMode === 'desktop'
                ? 'bg-[#FFE600] border-black text-black shadow-[1px_1px_0px_0px_#000] translate-x-[-1px] translate-y-[-1px]'
                : 'bg-transparent border-transparent text-slate-500 hover:text-black'
            }`}
          >
            <Laptop className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode('mobile')}
            className={`p-1.5 rounded-md border-2 transition-all ${
              deviceMode === 'mobile'
                ? 'bg-[#FFE600] border-black text-black shadow-[1px_1px_0px_0px_#000] translate-x-[-1px] translate-y-[-1px]'
                : 'bg-transparent border-transparent text-slate-500 hover:text-black'
            }`}
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Frame Wrapper Canvas */}
      <div className="w-full flex justify-center items-center h-full pt-16">
        <DeviceFrameWrapper mode={deviceMode}>
          <TemplateRenderer portfolio={portfolio} />
        </DeviceFrameWrapper>
      </div>
    </div>
  );
}
