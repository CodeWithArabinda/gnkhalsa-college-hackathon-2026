import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Layers, Type, Palette, Layout, MousePointer2 } from 'lucide-react';

export default function CanvasBuildingState() {
  return (
    <div className="absolute inset-0 z-30 bg-[#0B0B0E]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
      
      {/* Background Subtle Mesh Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-[#FF6B1A]/20 via-[#FFE600]/15 to-[#38BDF8]/20 rounded-full blur-[130px] animate-pulse" />
      </div>

      {/* Interactive Floating Wireframe Cards */}
      <div className="relative w-full max-w-lg h-56 mb-8 flex items-center justify-center">
        
        {/* Floating Card 1: Hero Mockup */}
        <motion.div
          className="absolute left-6 top-2 bg-[#181A24] border-2 border-white/10 rounded-2xl p-4 w-48 shadow-2xl z-10"
          animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B1A]" />
            <div className="h-2 w-16 bg-white/20 rounded" />
          </div>
          <div className="h-3 w-28 bg-white/40 rounded mb-2" />
          <div className="h-2 w-36 bg-white/20 rounded" />
        </motion.div>

        {/* Floating Card 2: Font Scale Badge */}
        <motion.div
          className="absolute right-8 top-6 bg-[#FFE600] text-black border-2 border-black rounded-xl p-3 shadow-[4px_4px_0px_0px_#000] z-20 flex items-center gap-2 font-mono font-black"
          animate={{ y: [0, 12, 0], rotate: [3, -3, 3] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Type className="w-4 h-4" />
          <span className="text-sm">AaBb</span>
          <span className="text-[10px] bg-black text-white px-1.5 py-0.5 rounded">GROTESK</span>
        </motion.div>

        {/* Floating Card 3: Color Palette Swatches */}
        <motion.div
          className="absolute left-16 bottom-4 bg-[#141622] border-2 border-white/10 rounded-xl p-3 shadow-xl z-20 flex items-center gap-2"
          animate={{ y: [0, -8, 0], rotate: [-1, 1, -1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Palette className="w-4 h-4 text-[#38BDF8]" />
          <div className="flex space-x-1.5">
            <span className="w-4 h-4 rounded-full bg-[#FF6B1A] border border-black" />
            <span className="w-4 h-4 rounded-full bg-[#FFE600] border border-black" />
            <span className="w-4 h-4 rounded-full bg-[#00FFA3] border border-black" />
            <span className="w-4 h-4 rounded-full bg-[#38BDF8] border border-black" />
          </div>
        </motion.div>

        {/* Floating Card 4: Logo Emblem */}
        <motion.div
          className="absolute right-14 bottom-2 bg-[#0F1117] border-2 border-[#00FFA3]/40 rounded-2xl p-3 shadow-2xl z-10 flex items-center gap-2"
          animate={{ y: [0, 10, 0], rotate: [2, -2, 2] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-6 h-6 rounded-lg bg-[#00FFA3] text-black font-black font-heading text-xs flex items-center justify-center">
            S
          </div>
          <span className="font-mono text-xs font-bold text-white">StackFolio</span>
        </motion.div>

        {/* Simulated Animated Cursor with Tooltip */}
        <motion.div
          className="absolute z-30 flex items-start gap-1 pointer-events-none"
          animate={{
            x: [-60, 80, -20, 60, -60],
            y: [-30, 40, 20, -40, -30]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <MousePointer2 className="w-6 h-6 text-[#FF6B1A] fill-[#FF6B1A] drop-shadow-[0_0_8px_rgba(255,107,26,0.8)]" />
          <div className="bg-[#FF6B1A] text-black font-mono font-bold text-[10px] px-2 py-0.5 rounded-md shadow-lg border border-black">
            Drafting high-impact layout...
          </div>
        </motion.div>

      </div>

      {/* Main Title & Subtitle */}
      <div className="max-w-md space-y-3 z-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
          <span>Creating without limits</span>
          <Sparkles className="w-6 h-6 text-[#FFE600] animate-spin" />
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
          StackFolio Aria is structuring your custom portfolio architecture and assembling interactive assets.
        </p>
      </div>

      {/* Bottom Floating Status Pill */}
      <div className="mt-8 px-4 py-2 bg-[#181A24] border border-white/10 rounded-full text-xs font-mono text-slate-300 flex items-center gap-2 shadow-xl z-10">
        <span className="w-2 h-2 rounded-full bg-[#00FFA3] animate-ping" />
        <span>ⓘ Designing layout... Live preview will update momentarily.</span>
      </div>

    </div>
  );
}
