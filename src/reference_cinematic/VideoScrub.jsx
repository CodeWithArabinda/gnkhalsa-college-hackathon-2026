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

    let targetTime = 0;
    let animationFrameId = null;
    let trigger = null;

    const lerpLoop = () => {
      if (video.duration && !isNaN(video.duration)) {
        const diff = targetTime - video.currentTime;
        if (Math.abs(diff) > 0.001) {
          try {
            video.currentTime += diff * 0.12;
          } catch (e) {
            // ignore seek exception
          }
        }
      }
      animationFrameId = requestAnimationFrame(lerpLoop);
    };

    const initScrollTrigger = () => {
      trigger = ScrollTrigger.create({
        trigger: containerRef?.current || document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        onUpdate: (self) => {
          if (video.duration && !isNaN(video.duration)) {
            targetTime = self.progress * video.duration;
          }
        },
      });
      animationFrameId = requestAnimationFrame(lerpLoop);
    };

    if (video.readyState >= 1) {
      initScrollTrigger();
    } else {
      video.addEventListener('loadedmetadata', initScrollTrigger, { once: true });
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (trigger) trigger.kill();
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
        className="w-full h-full object-cover object-center md:object-right opacity-75 mix-blend-screen"
        onError={handleError}
      />
    </div>
  );
}
