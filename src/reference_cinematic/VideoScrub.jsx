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
    let currentTime = 0;
    let rafId;

    const updateVideoFrame = () => {
      if (video.duration && !isNaN(video.duration)) {
        currentTime += (targetTime - currentTime) * 0.08;
        if (Math.abs(currentTime - video.currentTime) > 0.005) {
          try {
            if ('fastSeek' in video && typeof video.fastSeek === 'function') {
              video.fastSeek(currentTime);
            } else {
              video.currentTime = currentTime;
            }
          } catch (e) {
            // ignore seek exception
          }
        }
      }
      rafId = requestAnimationFrame(updateVideoFrame);
    };
    rafId = requestAnimationFrame(updateVideoFrame);

    const st = ScrollTrigger.create({
      trigger: containerRef?.current || document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        if (video.duration) {
          targetTime = self.progress * video.duration;
        }
      },
    });

    return () => {
      cancelAnimationFrame(rafId);
      st.kill();
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
