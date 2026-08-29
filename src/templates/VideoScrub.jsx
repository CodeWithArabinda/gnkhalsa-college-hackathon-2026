import React, { useEffect, useRef, useState } from 'react';

export default function VideoScrub({ activeTab = 'overview' }) {
  const fwdRef = useRef(null);
  const revRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [videoSrc, setVideoSrc] = useState('/optimized.mp4');

  useEffect(() => {
    setMounted(true);
  }, []);

  // When activeTab changes, seek smooth timestamp offsets if needed
  useEffect(() => {
    if (!fwdRef.current) return;
    const v = fwdRef.current;
    if (v.duration) {
      let targetTime = 0;
      if (activeTab === 'projects') targetTime = v.duration * 0.33;
      else if (activeTab === 'about') targetTime = v.duration * 0.66;
      else if (activeTab === 'contact') targetTime = v.duration * 0.95;

      try {
        v.currentTime = targetTime;
      } catch (e) {
        // ignore seek error
      }
    }
  }, [activeTab]);

  // Fallback handler if /optimized.mp4 path fails
  const handleError = () => {
    if (videoSrc === '/optimized.mp4') {
      setVideoSrc('/videos/optimized.mp4');
    }
  };

  if (!mounted) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 opacity-60 mix-blend-screen overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.webp')" }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-60 mix-blend-screen overflow-hidden flex items-center justify-center">
      <video
        ref={fwdRef}
        src={videoSrc}
        poster="/hero.webp"
        className="fixed inset-0 w-full h-full object-contain md:object-cover pointer-events-none z-0 opacity-60 mix-blend-screen"
        autoPlay
        muted
        playsInline
        loop
        onError={handleError}
      />
      <video
        ref={revRef}
        src="/optimized-rev.mp4"
        className="hidden"
        muted
        playsInline
        loop
      />
    </div>
  );
}
