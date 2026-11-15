'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { hasMacropadAssembled, markMacropadAssembled } from '@/utils/animationSession';

type LoaderStage = 'initializing' | 'assembling' | 'settling' | 'ready';

const Macropad3D = dynamic(() => import('@/components/Macropad3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] sm:h-[360px] flex flex-col items-center justify-center gap-3">
      {/* Visible for reduced-motion or post-watchdog chunk loads; hidden by stageRef opacity-0 during normal initializing */}
      <div className="w-7 h-7 rounded-full border-2 border-[var(--shuiro)]/30 border-t-[var(--shuiro)] motion-safe:animate-spin" />
      <span className="text-[12px] font-medium text-apple-secondary">
        Initializing Macropad…
      </span>
      {/* SSR & Noscript Quick Navigation Fallback */}
      <noscript>
        <nav aria-label="Hero section navigation" className="flex flex-wrap justify-center gap-2 mt-2">
          <a href="#about" className="px-3 py-1 rounded-full bg-apple-card border border-[var(--separator)] text-[12px] font-medium text-apple-label">About</a>
          <a href="#experience" className="px-3 py-1 rounded-full bg-apple-card border border-[var(--separator)] text-[12px] font-medium text-apple-label">Experience</a>
          <a href="#projects" className="px-3 py-1 rounded-full bg-apple-card border border-[var(--separator)] text-[12px] font-medium text-apple-label">Projects</a>
          <a href="#skills" className="px-3 py-1 rounded-full bg-apple-card border border-[var(--separator)] text-[12px] font-medium text-apple-label">Skills</a>
          <a href="#languages" className="px-3 py-1 rounded-full bg-apple-card border border-[var(--separator)] text-[12px] font-medium text-apple-label">Languages</a>
          <a href="#education" className="px-3 py-1 rounded-full bg-apple-card border border-[var(--separator)] text-[12px] font-medium text-apple-label">Education</a>
        </nav>
      </noscript>
    </div>
  ),
});

export default function Hero() {
  const [copied, setCopied] = useState<boolean>(false);
  const [loaderStage, setLoaderStage] = useState<LoaderStage>(() =>
    hasMacropadAssembled() ? 'ready' : 'initializing'
  );
  const [stageOffset, setStageOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Untransformed layout anchor in the right Hero column
  const slotRef = useRef<HTMLDivElement>(null);
  // Transformed stage wrapper that centers during assembly and FLIP-glides to (0, 0)
  const stageRef = useRef<HTMLDivElement>(null);
  const settleTimerRef = useRef<number | null>(null);
  const watchdogRef = useRef<number | null>(null);
  const initialHashRef = useRef<string>('');

  const email = 'sendotjiamis9898@gmail.com';

  // Measure the untransformed slotRef relative to viewport center
  const measureSlotOffset = useCallback(() => {
    const slotEl = slotRef.current;
    if (!slotEl || typeof window === 'undefined') return;
    const rect = slotEl.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const canvasHeight = window.innerWidth >= 640 ? 360 : 300;
    const slotCenterX = rect.left + rect.width / 2;
    const slotCenterY = rect.top + canvasHeight / 2;

    const targetCenterX = window.innerWidth / 2;
    const targetCenterY = window.innerHeight / 2 - 16;

    setStageOffset({
      x: Math.round(targetCenterX - slotCenterX),
      y: Math.round(targetCenterY - slotCenterY),
    });
  }, []);

  // Initial scroll alignment, scrollbar-compensated overflowY lock, resize tracking, and chunk watchdog
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      hasMacropadAssembled()
    ) {
      markMacropadAssembled();
      setLoaderStage('ready');
      return;
    }

    initialHashRef.current = window.location.hash;

    // Compensate classic scrollbar width before locking overflowY to prevent horizontal shift on unlock
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.documentElement.style.overflowY = 'hidden';
    document.body.style.overflowY = 'hidden';

    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }

    measureSlotOffset();
    window.addEventListener('resize', measureSlotOffset);

    // Phase 1 watchdog: 3500ms limit for dynamic Three.js chunk download & Frame 1 init
    watchdogRef.current = window.setTimeout(() => {
      setLoaderStage('ready');
    }, 3500);

    return () => {
      window.removeEventListener('resize', measureSlotOffset);
      if (watchdogRef.current) {
        window.clearTimeout(watchdogRef.current);
      }
      if (settleTimerRef.current) {
        window.clearTimeout(settleTimerRef.current);
      }
      document.documentElement.style.overflowY = '';
      document.body.style.overflowY = '';
      document.body.style.paddingRight = '';
    };
  }, [measureSlotOffset]);

  // Keep overflowY & paddingRight locked through 'initializing', 'assembling', and 'settling'; unlock on 'ready'
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (loaderStage === 'ready') {
      document.documentElement.style.overflowY = '';
      document.body.style.overflowY = '';
      document.body.style.paddingRight = '';

      // Restore deep-link hash navigation (e.g. /#projects) once the blocking loader finishes
      const hash = initialHashRef.current;
      if (hash && hash !== '#about') {
        const targetEl = document.querySelector(hash);
        if (targetEl) {
          requestAnimationFrame(() => {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        }
      }
    }
  }, [loaderStage]);

  const handleAssemblyComplete = useCallback(() => {
    markMacropadAssembled();
    if (watchdogRef.current) {
      window.clearTimeout(watchdogRef.current);
      watchdogRef.current = null;
    }
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setLoaderStage('ready');
      return;
    }
    setLoaderStage((prev) => {
      if (prev === 'ready' || prev === 'settling') return prev;
      return 'settling';
    });
    if (settleTimerRef.current) {
      window.clearTimeout(settleTimerRef.current);
    }
    settleTimerRef.current = window.setTimeout(() => {
      setLoaderStage('ready');
    }, 560);
  }, []);

  const handleSceneReady = useCallback(() => {
    if (watchdogRef.current) {
      window.clearTimeout(watchdogRef.current);
      watchdogRef.current = null;
    }
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setLoaderStage('ready');
      return;
    }
    measureSlotOffset();
    setLoaderStage((prev) => (prev === 'initializing' ? 'assembling' : prev));

    // Phase 2 watchdog: if assembly stalls, trigger clean FLIP 'settling' glide rather than teleporting
    watchdogRef.current = window.setTimeout(() => {
      handleAssemblyComplete();
    }, 2500);
  }, [measureSlotOffset, handleAssemblyComplete]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard?.writeText(email);
    } catch {
      // Fallback for restricted clipboard contexts
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const corePillars = [
    { title: 'Swift & Concurrency', subtitle: 'Modern Threading & Data-Race Safety' },
    { title: 'SwiftUI & UIKit', subtitle: 'Declarative & High-Throughput UI' },
    { title: 'Clean Architecture & VIPER', subtitle: 'Modular Enterprise Architecture' },
    { title: 'Unit Tests & Code Quality', subtitle: 'Automated Testing & Code Reliability' },
    { title: 'Agentic AI Harnesses', subtitle: 'Antigravity, Claude & Codex Workflows' },
  ];

  return (
    <section id="about" className="min-h-[100dvh] py-16 sm:py-20 flex flex-col justify-center gap-10 w-full">
      {/* Full-Viewport Blocking Curtain & Minimal SENDO-06 Technical HUD (z-[60]) */}
      {loaderStage !== 'ready' && (
        <div
          role="status"
          aria-live="polite"
          aria-label="Loading SENDO-06 3D Mechanical Macropad"
          className={`fixed inset-0 z-[60] bg-apple-bg flex flex-col items-center justify-center transition-opacity duration-500 ease-out ${
            loaderStage === 'settling'
              ? 'opacity-0 pointer-events-none'
              : 'opacity-100 pointer-events-auto'
          }`}
        >
          {/* Subtle Center-Stage Blueprint Alignment Frame while WebGL chunk initializes */}
          <div
            aria-hidden="true"
            className={`w-[280px] sm:w-[360px] h-[180px] sm:h-[220px] -mt-8 rounded-2xl border border-dashed border-[var(--separator-opaque)] flex items-center justify-center transition-opacity duration-200 ${
              loaderStage === 'initializing' ? 'opacity-70' : 'opacity-0'
            }`}
          >
            <div className="grid grid-cols-3 gap-2 w-[210px] sm:w-[260px] opacity-40">
              {['01', '02', '03', '04', '05', '06'].map((num) => (
                <div
                  key={num}
                  className="h-10 rounded-lg border border-[var(--separator-opaque)] flex items-center justify-center font-mono text-[10px] text-apple-secondary"
                >
                  {num}
                </div>
              ))}
            </div>
          </div>

          {/* Lower-Center Technical Spec Readout Dock (Viewport-clamped for short screens <= 480px) */}
          <div className="fixed top-[min(calc(50%+168px),calc(100dvh-64px))] sm:top-[min(calc(50%+196px),calc(100dvh-68px))] inset-x-0 flex flex-col items-center gap-2.5 px-4">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-apple-card border border-[var(--separator)] shadow-apple-sm">
              <span
                className="w-2 h-2 rounded-full bg-[var(--shuiro)] motion-safe:animate-pulse"
                aria-hidden="true"
              />
              <span className="font-mono text-[11px] sm:text-[12px] font-semibold tracking-wider text-apple-label">
                {loaderStage === 'initializing'
                  ? 'SENDO-06 // INITIALIZING MECHANICS'
                  : 'SENDO-06 // ASSEMBLING KEYCAPS [01–06]'}
              </span>
            </div>

            <div className="w-44 h-[2px] rounded-full bg-[var(--separator-opaque)] overflow-hidden">
              <div
                className={`h-full bg-[var(--shuiro)] transition-all duration-700 ease-out ${
                  loaderStage === 'initializing' ? 'w-1/3' : 'w-full'
                }`}
              />
            </div>
          </div>
        </div>
      )}

      {/* 2-Column Split: Identity & Bio (6 cols) + 2-Row Proportional 3D Macropad (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
        {/* Left Column: Portrait Lockup, Status, Bio, CTAs (6 cols) */}
        <div className="lg:col-span-6 flex flex-col items-start gap-5">
          {/* Availability Pill (Mineral Teal Harmonious Accent) */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--teal-soft)] border border-[var(--teal-border)]">
            <span className="w-2 h-2 rounded-full bg-[var(--teal)]" aria-hidden="true" />
            <span className="text-[12px] font-medium text-apple-label">
              Building iOS at <strong className="font-semibold text-[var(--teal)]">Grab</strong>, open to remote worldwide
            </span>
          </div>

          {/* Portrait + Name & Role Identity Lockup */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-[74px] sm:h-[74px] rounded-2xl overflow-hidden border-2 border-[var(--separator-opaque)] shadow-apple-md bg-apple-card">
                <Image
                  src="/assets/photo/sendo.jpg"
                  alt="Sendo Tjiamis"
                  width={148}
                  height={148}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              {/* Tactile Corner Status Badge */}
              <span
                aria-hidden="true"
                className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[var(--teal)] border-[2.5px] border-[var(--bg)] shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-apple-label text-balance break-words min-w-0">
                Sendo Tjiamis
              </h1>
              <p className="text-[17px] sm:text-xl text-[var(--tint)] font-semibold tracking-tight text-balance">
                iOS Engineer building apps used by millions.
              </p>
            </div>
          </div>

          {/* Biography */}
          <p className="text-[15px] sm:text-[16px] text-apple-secondary leading-relaxed font-normal">
            iOS Engineer with 3+ years crafting high-performance mobile architectures across Southeast Asia. Specializing in Swift, SwiftUI, and programmatic UIKit at scale. Currently engineering critical driver and passenger experiences at{' '}
            <strong className="font-semibold text-apple-label">Grab</strong>, previously at{' '}
            <strong className="font-semibold text-apple-label">ByteDance (TikTok)</strong> and{' '}
            <strong className="font-semibold text-apple-label">Tokopedia</strong>.
          </p>

          {/* Actions Row */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {/* Primary CTA (Conflicting Focal Color: Shu-iro Vermilion matching Key 06) */}
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[var(--shuiro)] hover:opacity-90 active:scale-95 text-white text-[14px] font-semibold transition-opacity shadow-apple-sm apple-btn-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--shuiro)] focus-visible:ring-offset-2 whitespace-nowrap"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4 fill-none stroke-current stroke-2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className="whitespace-nowrap">Get in touch</span>
            </a>

            {/* Copy Email Pill */}
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center justify-center gap-2 h-11 px-4 min-w-[172px] rounded-full bg-apple-card hover:bg-black/[0.04] dark:hover:bg-white/[0.06] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-apple-label text-[13px] font-medium border border-[var(--separator)] transition-colors apple-btn-active cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint focus-visible:ring-offset-2 whitespace-nowrap shadow-apple-sm"
            >
              {copied ? (
                <>
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 text-[var(--teal)] fill-none stroke-current stroke-2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-[var(--teal)] font-semibold whitespace-nowrap">
                    Copied!
                  </span>
                </>
              ) : (
                <>
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 text-apple-secondary fill-none stroke-current stroke-2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                  <span className="whitespace-nowrap">Copy email</span>
                </>
              )}
            </button>

            {/* Social Links */}
            <div className="flex items-center gap-1.5 ml-1">
              <a
                href="https://github.com/sendotjiam"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-11 h-11 rounded-full flex items-center justify-center bg-apple-card text-apple-secondary hover:text-apple-label active:scale-95 hover:border-[var(--tint-border)] border border-[var(--separator)] transition-colors apple-btn-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint shadow-apple-sm"
              >
                <svg aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/sendo-tjiamis"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-11 h-11 rounded-full flex items-center justify-center bg-apple-card text-apple-secondary hover:text-apple-label active:scale-95 hover:border-[var(--tint-border)] border border-[var(--separator)] transition-colors apple-btn-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint shadow-apple-sm"
              >
                <svg aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.92 0 1.67-.75 1.67-1.67s-.75-1.67-1.67-1.67a1.67 1.67 0 0 0-1.67 1.67c0 .92.75 1.67 1.67 1.67m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Untransformed Anchor Slot (slotRef) + FLIP Stage Mover (stageRef) */}
        <div
          ref={slotRef}
          className="lg:col-span-6 w-full flex flex-col items-center justify-center"
        >
          <div
            ref={stageRef}
            style={
              loaderStage === 'initializing' || loaderStage === 'assembling'
                ? {
                    transform: `translate3d(${stageOffset.x}px, ${stageOffset.y}px, 0) scale(1.06)`,
                    transition: 'opacity 180ms ease-out',
                  }
                : loaderStage === 'settling'
                  ? {
                      transform: 'translate3d(0px, 0px, 0) scale(1)',
                      transition:
                        'transform 550ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease-out',
                    }
                  : undefined
            }
            className={`w-full flex flex-col items-center justify-center ${
              loaderStage === 'ready'
                ? 'relative z-auto opacity-100 pointer-events-auto'
                : loaderStage === 'initializing'
                  ? 'relative z-[70] opacity-0 pointer-events-none will-change-transform'
                  : 'relative z-[70] opacity-100 pointer-events-none will-change-transform'
            }`}
          >
            <Macropad3D
              onSceneReady={handleSceneReady}
              onAssemblyComplete={handleAssemblyComplete}
              controlsVisible={loaderStage === 'settling' || loaderStage === 'ready'}
              interactive={loaderStage === 'ready'}
              skipAssembly={loaderStage === 'ready' || hasMacropadAssembled()}
            />
          </div>
        </div>
      </div>

      {/* Engineering Pillars Banner */}
      <div className="w-full pt-8 mt-4 border-t border-[var(--separator)]">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {corePillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="apple-card p-3.5 rounded-xl flex flex-col justify-between gap-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[12px] font-semibold text-apple-label leading-tight">
                  {pillar.title}
                </span>
                <span className="font-mono text-[10px] font-bold text-[var(--teal)] shrink-0">
                  0{idx + 1}
                </span>
              </div>
              <span className="text-[11px] text-apple-secondary leading-snug">
                {pillar.subtitle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
