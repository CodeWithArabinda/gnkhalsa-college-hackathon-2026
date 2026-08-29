import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VideoScrub({ containerRef }) {
  const videoRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [videoSrc, setVideoSrc] = useState('/optimized.mp4');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const video = videoRef.current;
    if (!video) return;

    const initScrollTrigger = () => {
      ScrollTrigger.create({
        trigger: containerRef?.current || document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8, // Smooth bidirectional scrubbing on scroll down & rewind up
        onUpdate: (self) => {
          if (video.duration && !isNaN(video.duration)) {
            try {
              video.currentTime = self.progress * video.duration;
            } catch (e) {
              // ignore seek exception
            }
          }
        },
      });
    };

    if (video.readyState >= 1) {
      initScrollTrigger();
    } else {
      video.addEventListener('loadedmetadata', initScrollTrigger, { once: true });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [mounted, containerRef, videoSrc]);

  const handleError = () => {
    if (videoSrc === '/optimized.mp4') {
      setVideoSrc('/videos/optimized.mp4');
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <video
        ref={videoRef}
        src={videoSrc}
        poster="/hero.webp"
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover object-center md:object-right opacity-80 mix-blend-screen"
        onError={handleError}
      />
    </div>
  );
}
