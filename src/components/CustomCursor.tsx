'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState<boolean>(false);
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [enabled, setEnabled] = useState<boolean>(false);

  // Instantaneous mouse coordinates for the central precision droplet
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring-smoothed coordinates for the fluid liquid follower ring
  const springConfig = { damping: 28, stiffness: 400, mass: 0.35 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only activate for fine pointer devices (desktop mouse/trackpad), never touch devices
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReducedMotion) return;

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, input, textarea, select, [role="button"], summary, .apple-card, .apple-btn-active'
        );
        setIsPointer(Boolean(interactive));
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <>
      {/* Outer Apple iPadOS/VisionOS-style Fluid Follower Ring */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
        style={{
          x: smoothX,
          y: smoothY,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            width: isPointer ? 42 : 26,
            height: isPointer ? 42 : 26,
            scale: isClicking ? 0.85 : 1,
            backgroundColor: isPointer
              ? 'rgba(0, 113, 227, 0.12)'
              : 'rgba(0, 113, 227, 0.05)',
            borderColor: isPointer
              ? 'rgba(0, 113, 227, 0.45)'
              : 'rgba(0, 113, 227, 0.22)',
          }}
          transition={{ type: 'spring', damping: 24, stiffness: 350 }}
          className="rounded-full border backdrop-blur-[2px] -translate-x-1/2 -translate-y-1/2"
        />
      </motion.div>

      {/* Inner Precision Center Droplet */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150"
        style={{
          x: mouseX,
          y: mouseY,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-apple-tint -translate-x-1/2 -translate-y-1/2 shadow-sm" />
      </motion.div>
    </>
  );
}
