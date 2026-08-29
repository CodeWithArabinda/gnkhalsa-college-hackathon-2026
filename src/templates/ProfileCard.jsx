import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import './ProfileCard.css';

const DEFAULT_INNER_GRADIENT = 'linear-gradient(145deg, rgba(255,107,26,0.2) 0%, rgba(11,11,14,0.95) 100%)';

const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v, precision = 3) => parseFloat(v.toFixed(precision));
const adjust = (v, fMin, fMax, tMin, tMax) => round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

export default function ProfileCard({
  avatarUrl = '',
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor = 'rgba(255, 107, 26, 0.45)',
  behindGlowSize = '40%',
  className = '',
  enableTilt = true,
  name = 'Developer',
  title = 'Creative Developer & Designer',
  handle = 'developer',
  status = 'Available for Hire',
  contactText = 'Contact',
  showUserInfo = true,
  onContactClick
}) {
  const wrapRef = useRef(null);
  const shellRef = useRef(null);
  const enterTimerRef = useRef(null);
  const leaveRafRef = useRef(null);

  const tiltEngine = useMemo(() => {
    if (!enableTilt) return null;

    let rafId = null;
    let running = false;
    let lastTs = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const setVarsFromXY = (x, y) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;

      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;
      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);
      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
        '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        '--pointer-from-top': `${percentY / 100}`,
        '--pointer-from-left': `${percentX / 100}`,
        '--rotate-x': `${round(-(centerX / 5))}deg`,
        '--rotate-y': `${round(centerY / 4)}deg`
      };

      for (const [k, v] of Object.entries(properties)) wrap.style.setProperty(k, v);
    };

    const step = (ts) => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const k = 1 - Math.exp(-dt / 0.15);
      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;

      setVarsFromXY(currentX, currentY);

      const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;
      if (stillFar) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    return {
      setImmediate(x, y) {
        currentX = x;
        currentY = y;
        setVarsFromXY(currentX, currentY);
      },
      setTarget(x, y) {
        targetX = x;
        targetY = y;
        start();
      },
      toCenter() {
        const shell = shellRef.current;
        if (!shell) return;
        this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      cancel() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        running = false;
      }
    };
  }, [enableTilt]);

  const getOffsets = (evt, el) => {
    const rect = el.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const handlePointerMove = useCallback(
    (event) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerEnter = useCallback(
    (event) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      shell.classList.add('active');
      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerLeave = useCallback(() => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;
    tiltEngine.toCenter();
    shell.classList.remove('active');
  }, [tiltEngine]);

  useEffect(() => {
    if (!enableTilt || !tiltEngine) return;
    const shell = shellRef.current;
    if (!shell) return;

    shell.addEventListener('pointerenter', handlePointerEnter);
    shell.addEventListener('pointermove', handlePointerMove);
    shell.addEventListener('pointerleave', handlePointerLeave);

    const initialX = (shell.clientWidth || 300) / 2;
    const initialY = (shell.clientHeight || 500) / 2;
    tiltEngine.setImmediate(initialX, initialY);

    return () => {
      shell.removeEventListener('pointerenter', handlePointerEnter);
      shell.removeEventListener('pointermove', handlePointerMove);
      shell.removeEventListener('pointerleave', handlePointerLeave);
      tiltEngine.cancel();
    };
  }, [enableTilt, tiltEngine, handlePointerEnter, handlePointerMove, handlePointerLeave]);

  const cardStyle = useMemo(
    () => ({
      '--inner-gradient': innerGradient ?? DEFAULT_INNER_GRADIENT,
      '--behind-glow-color': behindGlowColor,
      '--behind-glow-size': behindGlowSize
    }),
    [innerGradient, behindGlowColor, behindGlowSize]
  );

  return (
    <div ref={wrapRef} className={`pc-card-wrapper ${className}`.trim()} style={cardStyle}>
      {behindGlowEnabled && <div className="pc-behind" />}
      <div ref={shellRef} className="pc-card-shell">
        <section className="pc-card">
          <div className="pc-inside" />
          <div className="pc-shine" />
          <div className="pc-glare" />

          <div className="pc-avatar-content">
            {/* Header info */}
            <div className="space-y-1 text-center pt-2">
              <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#FF6B1A] font-bold">
                PRO CARD
              </span>
              <h3 className="text-xl font-heading font-black text-white">{name}</h3>
              <p className="text-xs font-mono text-slate-300">{title}</p>
            </div>

            {/* Avatar Image */}
            <div className="avatar-container">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={name}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full bg-[#FF6B1A]/20 flex items-center justify-center text-3xl font-black text-[#FF6B1A]">
                  {name.charAt(0)}
                </div>
              )}
            </div>

            {/* User Info Bottom Dock */}
            {showUserInfo && (
              <div className="pc-user-info">
                <div className="pc-user-details">
                  <div className="pc-mini-avatar">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt={name} />
                    ) : (
                      <div className="w-full h-full bg-[#FF6B1A] text-black font-bold flex items-center justify-center text-xs">
                        {name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="pc-user-text">
                    <span className="pc-handle">@{handle}</span>
                    <span className="pc-status">⚡ {status}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="pc-contact-btn"
                  onClick={onContactClick}
                >
                  {contactText}
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
