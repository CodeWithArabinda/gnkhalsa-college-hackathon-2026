import React, { useRef } from 'react';
import { FolderOpen, Upload, Image as ImageIcon, Check, X } from 'lucide-react';

const STOCK_AVATARS = [
  '/photo/Sarang.png',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80'
];

export default function MediaAssetsDrawer({ onClose, onReplaceImage }) {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (onReplaceImage) {
        onReplaceImage(evt.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4 font-sans text-xs">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold">
            <FolderOpen className="w-4 h-4" />
          </div>
          <h3 className="font-heading font-extrabold text-sm text-slate-900">Media & Assets</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-800 rounded-md hover:bg-slate-100"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <button
        type="button"
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
        className="w-full p-3 bg-blue-50 border border-dashed border-[#0053ff] rounded-xl text-[#0053ff] font-bold flex items-center justify-center gap-2 hover:bg-blue-100/50 transition-colors cursor-pointer"
      >
        <Upload className="w-4 h-4" />
        <span>Upload Local Image File</span>
      </button>

      <div className="space-y-2 pt-2">
        <p className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Stock Avatars & Banners
        </p>
        <div className="grid grid-cols-2 gap-2">
          {STOCK_AVATARS.map((url, i) => (
            <button
              key={url}
              type="button"
              onClick={() => onReplaceImage && onReplaceImage(url)}
              className="h-24 rounded-xl border border-slate-200 bg-cover bg-center hover:scale-105 transition-transform overflow-hidden shadow-2xs cursor-pointer"
              style={{ backgroundImage: `url(${url})` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
