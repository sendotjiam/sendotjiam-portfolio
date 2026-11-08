'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

interface SectionDetent {
  id: string;
  numeral: string;
  label: string;
}

const SECTION_DETENTS: SectionDetent[] = [
  { id: 'about', numeral: '01', label: 'About' },
  { id: 'experience', numeral: '02', label: 'Experience' },
  { id: 'projects', numeral: '03', label: 'Projects' },
  { id: 'skills', numeral: '04', label: 'Skills' },
  { id: 'languages', numeral: '05', label: 'Languages' },
  { id: 'education', numeral: '06', label: 'Education' },
];

const RAIL_HEIGHT_PX = 224;
const THUMB_HEIGHT_PX = 28;

export default function TactileScrollbar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeId, setActiveId] = useState<string>('about');
  const [detentOffsets, setDetentOffsets] = useState<number[]>([0, 0.2, 0.4, 0.6, 0.8, 1]);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);

  const measureAndSync = useCallback(() => {
    const docEl = document.documentElement;
    const maxScroll = Math.max(1, docEl.scrollHeight - window.innerHeight);
    const currentScroll = Math.max(0, Math.min(maxScroll, window.scrollY));
    const ratio = currentScroll / maxScroll;
    setScrollProgress(ratio);

    const offsets: number[] = [];
    let currentActive = SECTION_DETENTS[0].id;
    const viewportTrigger = window.scrollY + window.innerHeight * 0.36;

    SECTION_DETENTS.forEach((sec, idx) => {
      const el = document.getElementById(sec.id);
      if (el) {
        const top = el.offsetTop;
        const norm = Math.max(0, Math.min(1, top / maxScroll));
        offsets.push(norm);
        if (viewportTrigger >= top - 40) {
          currentActive = sec.id;
        }
      } else {
        offsets.push(idx / (SECTION_DETENTS.length - 1));
      }
    });

    setDetentOffsets(offsets);
    setActiveId(currentActive);
  }, []);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    measureAndSync();
    window.addEventListener('scroll', measureAndSync, { passive: true });
    window.addEventListener('resize', measureAndSync);

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      window.removeEventListener('scroll', measureAndSync);
      window.removeEventListener('resize', measureAndSync);
      observer.disconnect();
    };
  }, [measureAndSync]);

  const toggleTheme = () => {
    const nextDark = !document.documentElement.classList.contains('dark');
    setIsDark(nextDark);
    document.documentElement.classList.toggle('dark', nextDark);
    document.documentElement.classList.toggle('light', !nextDark);
    try {
      localStorage.setItem('theme', nextDark ? 'dark' : 'light');
    } catch {
      // Ignore storage errors
    }
  };

  const scrubToClientY = useCallback((clientY: number, smooth = false) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    if (!rect.height) return;
    const clampedY = Math.max(0, Math.min(rect.height, clientY - rect.top));
    const ratio = clampedY / rect.height;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({
      top: ratio * maxScroll,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, []);

  const handleTrackPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button[data-detent-btn]')) {
      return;
    }
    e.preventDefault();
    isDraggingRef.current = true;
    setIsScrubbing(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    scrubToClientY(e.clientY, false);
  };

  const handleTrackPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    scrubToClientY(e.clientY, false);
  };

  const handleTrackPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsScrubbing(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture already released
    }
  };

  const jumpToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const thumbTravelPx = Math.max(0, RAIL_HEIGHT_PX - THUMB_HEIGHT_PX);
  const thumbOffsetY = scrollProgress * thumbTravelPx;
  const activeDetent = SECTION_DETENTS.find((d) => d.id === activeId) || SECTION_DETENTS[0];

  return (
    <aside
      aria-label="Tactile Section Scrollbar"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="hidden sm:flex fixed right-3.5 md:right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-2 select-none"
    >
      {/* Top Identity & Active Numeral Cap (Scrolls to Top / About) */}
      <button
        type="button"
        onClick={() => jumpToSection('about')}
        title="Back to top (Sendo Tjiamis)"
        aria-label="Scroll to top (About Sendo Tjiamis)"
        className="pl-1 pr-2 py-1 rounded-full bg-apple-card/90 border border-[var(--separator)] hover:border-[var(--tint-border)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-apple-sm flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint"
      >
        <span className="w-5 h-5 rounded-full overflow-hidden border border-[var(--separator)] shrink-0">
          <Image
            src="/assets/photo/sendo.jpg"
            alt="Sendo Tjiamis"
            width={20}
            height={20}
            className="w-full h-full object-cover"
          />
        </span>
        <span className="font-mono text-[11px] font-bold text-apple-label">
          {activeDetent.numeral}
        </span>
      </button>

      {/* Main Tactile Detent Rail */}
      <div className="relative flex items-center">
        {/* Section Detent Callout Buttons (Left of the rail) */}
        <div
          className="relative mr-2"
          style={{ height: `${RAIL_HEIGHT_PX}px`, width: '112px' }}
        >
          {SECTION_DETENTS.map((sec, idx) => {
            const normY = detentOffsets[idx] ?? idx / (SECTION_DETENTS.length - 1);
            const yPx = Math.round(normY * thumbTravelPx + THUMB_HEIGHT_PX / 2);
            const isActive = activeId === sec.id;
            const showLabel = isHovered || isScrubbing || isActive;

            return (
              <button
                key={sec.id}
                type="button"
                data-detent-btn="true"
                onClick={() => jumpToSection(sec.id)}
                aria-label={`Jump to ${sec.label} section (${sec.numeral})`}
                aria-current={isActive ? 'location' : undefined}
                style={{
                  transform: `translate3d(0, ${yPx - 12}px, 0)`,
                }}
                className="group absolute right-0 top-0 h-6 px-2 rounded-full flex items-center justify-end gap-1.5 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint"
              >
                <span
                  className={`text-[12px] font-medium whitespace-nowrap px-2.5 py-0.5 rounded-full border transition-[transform,opacity] duration-150 ${
                    isActive
                      ? 'bg-apple-card text-apple-label border-[var(--separator)] shadow-apple-sm opacity-100 translate-x-0 font-semibold'
                      : showLabel
                        ? 'bg-apple-card/90 text-apple-secondary group-hover:text-apple-label border-[var(--separator)] opacity-95 translate-x-0'
                        : 'opacity-0 translate-x-1 pointer-events-none border-transparent'
                  }`}
                >
                  <span className="font-mono text-[10px] font-bold text-[var(--shuiro)] mr-1">
                    {sec.numeral}
                  </span>
                  <span>{sec.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Machined Vertical Track Housing */}
        <div
          ref={trackRef}
          role="scrollbar"
          aria-controls="main-content"
          aria-orientation="vertical"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(scrollProgress * 100)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
              e.preventDefault();
              window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
              e.preventDefault();
              window.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
            }
          }}
          onPointerDown={handleTrackPointerDown}
          onPointerMove={handleTrackPointerMove}
          onPointerUp={handleTrackPointerUp}
          onPointerCancel={handleTrackPointerUp}
          style={{ height: `${RAIL_HEIGHT_PX}px` }}
          className="relative w-3.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-[var(--separator)] cursor-pointer flex justify-center overflow-hidden shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint"
        >
          {/* Active Cobalt-Teal Progress Fill Line */}
          <div
            aria-hidden="true"
            style={{
              height: `${RAIL_HEIGHT_PX}px`,
              transform: `scaleY(${Math.max(0.02, scrollProgress)})`,
              transformOrigin: 'top center',
            }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] bg-[var(--teal)] opacity-60 pointer-events-none"
          />

          {/* Micro Ruler Detent Notches along Track */}
          {SECTION_DETENTS.map((sec, idx) => {
            const normY = detentOffsets[idx] ?? idx / (SECTION_DETENTS.length - 1);
            const yPx = Math.round(normY * thumbTravelPx + THUMB_HEIGHT_PX / 2);
            const isActive = activeId === sec.id;

            return (
              <span
                key={sec.id}
                aria-hidden="true"
                style={{
                  transform: `translate3d(0, ${yPx - 2}px, 0)`,
                }}
                className={`absolute top-0 w-2 h-1 rounded-full pointer-events-none transition-opacity duration-150 ${
                  isActive
                    ? 'bg-[var(--shuiro)] opacity-100'
                    : 'bg-apple-secondary opacity-45'
                }`}
              />
            );
          })}

          {/* Sliding Conflicting Accent (Shu-iro Vermilion) Mechanical Thumb */}
          <div
            aria-hidden="true"
            style={{
              height: `${THUMB_HEIGHT_PX}px`,
              transform: `translate3d(0, ${thumbOffsetY}px, 0)`,
            }}
            className="absolute top-0 inset-x-0.5 rounded-full bg-[var(--shuiro)] border border-[var(--brass)] shadow-apple-sm flex flex-col items-center justify-center gap-0.5 pointer-events-none"
          >
            <span className="w-1.5 h-[1.5px] rounded-full bg-white/85" />
            <span className="w-1.5 h-[1.5px] rounded-full bg-white/85" />
          </div>
        </div>
      </div>

      {/* Bottom Scroll Readout & Theme Switcher Cap */}
      <div className="flex flex-col items-end gap-1.5">
        <div className="px-1.5 py-0.5 rounded bg-apple-card/85 border border-[var(--separator)] font-mono text-[10px] font-semibold text-apple-secondary">
          {String(Math.round(scrollProgress * 100)).padStart(2, '0')}%
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="w-7 h-7 rounded-full bg-apple-card/90 border border-[var(--separator)] hover:border-[var(--tint-border)] active:scale-95 text-apple-secondary hover:text-apple-label flex items-center justify-center shadow-apple-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint"
        >
          {isDark ? (
            <svg aria-hidden="true" className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          ) : (
            <svg aria-hidden="true" className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          )}
        </button>
      </div>
    </aside>
  );
}
