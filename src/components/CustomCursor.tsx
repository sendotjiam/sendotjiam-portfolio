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
  const springConfig = { damping: 26, stiffness: 380, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only activate for fine pointer devices (desktop mouse/trackpad), never touch devices
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, input, textarea, select, [role="button"], .liquid-glass-pill, .bubble-btn, .scenery-card'
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
      {/* Outer Apple VisionOS Liquid Glass Follower Aura */}
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
            width: isPointer ? 44 : 30,
            height: isPointer ? 44 : 30,
            scale: isClicking ? 0.82 : 1,
            backgroundColor: isPointer
              ? 'rgba(0, 102, 204, 0.14)'
              : 'rgba(0, 102, 204, 0.06)',
            borderColor: isPointer
              ? 'rgba(0, 102, 204, 0.55)'
              : 'rgba(0, 102, 204, 0.28)',
          }}
          transition={{ type: 'spring', damping: 22, stiffness: 320 }}
          className="rounded-full border backdrop-blur-[2px] shadow-[0_0_16px_rgba(0,102,204,0.18)] -translate-x-1/2 -translate-y-1/2"
        />
      </motion.div>

      {/* Inner Precision Glass Droplet */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150"
        style={{
          x: mouseX,
          y: mouseY,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.65 : isPointer ? 1.35 : 1,
          }}
          transition={{ type: 'spring', damping: 18, stiffness: 450 }}
          className="w-2.5 h-2.5 rounded-full bg-primary dark:bg-sky-400 shadow-[0_1px_4px_rgba(0,102,204,0.4)] -translate-x-1/2 -translate-y-1/2"
        />
      </motion.div>
    </>
  );
}
