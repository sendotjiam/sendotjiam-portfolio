'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface TechBubble {
  id: string;
  name: string;
  subtitle: string;
  desc: string;
  className: string;
  style: React.CSSProperties;
  colorClass: string;
  icon: React.ReactNode;
  isBottomRow?: boolean;
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const email = 'sendotjiamis9898@gmail.com';

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch (_) {}
  };

  // 9 Carefully Spaced & Positioned Non-Overlapping Pills
  const bubbles: TechBubble[] = [
    // --- Row 1 (Top) ---
    {
      id: 'swiftui',
      name: 'SwiftUI',
      subtitle: 'Declarative UI',
      desc: 'Declarative UI • Reactive State Bindings & MatchedGeometryEffect',
      className: 'bubble-float-2',
      style: { top: '3%', left: '4%' },
      colorClass: 'bg-blue-500/15 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30',
      icon: (
        <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
          <path d="M2 17l10 5 10-5"></path>
          <path d="M2 12l10 5 10-5"></path>
        </svg>
      ),
    },
    {
      id: 'claude',
      name: 'Claude Code',
      subtitle: 'Reasoning Agent',
      desc: 'Anthropic Harness • Agentic coding loops, tool execution & prompt-driven refactors',
      className: 'bubble-float-4',
      style: { top: '3%', right: '6%' },
      colorClass: 'bg-gradient-to-tr from-amber-500/80 to-orange-500/90 text-white shadow-amber-500/25',
      icon: <span className="material-symbols-outlined text-[18px]">psychology</span>,
    },

    // --- Row 2 (Upper Middle) ---
    {
      id: 'xcode-spm',
      name: 'Xcode SPM',
      subtitle: 'Build Tools',
      desc: 'Modular Build Systems • Instruments Profiling, LLDB & SPM Modules',
      className: 'bubble-float-1',
      style: { top: '22%', left: '30%' },
      colorClass: 'bg-slate-500/10 dark:bg-slate-500/20 text-primary dark:text-sky-400 border border-slate-300/40 dark:border-slate-600/40',
      icon: <span className="material-symbols-outlined text-[15px]">construction</span>,
    },

    // --- Row 3 (Center) ---
    {
      id: 'swift-6',
      name: 'Swift 6',
      subtitle: 'Language Core',
      desc: 'Modern Runtime • Strict Concurrency, Data Race Safety & Swift Macros',
      className: 'bubble-float-3',
      style: { top: '42%', left: '4%' },
      colorClass: 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-orange-500/30',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M20.25 14.5c-.3 0-.6.1-.9.2-1.9 1-4.2 1.4-6.3.7 1.8-.7 3.2-2.1 4-3.8-2.6 1.1-5.5 1-7.8-.5 3.3.4 6.7-.8 8.6-3.2-1.7.5-3.5.3-5-.5 3.4-1.2 5.3-4.4 5.2-4.4s-1 .8-2.1 1.4C14.7 3.5 12.8 3.5 11 4.5c-.6.3-1.1.7-1.6 1.2-.2.2-.4.4-.6.6C5.9 8.9 3 14 3.7 19.3c.1.7.3 1.4.6 2 .3-.4.7-.8 1.1-1.1 1.3-1 2.9-1.6 4.5-1.7-.8-.5-1.5-1.2-1.9-2 .9.4 1.9.6 2.9.5-1-.7-1.7-1.8-1.9-3 1 .6 2.1.8 3.3.7-1.3-1.2-1.9-3-1.6-4.8 1.5 1.6 3.5 2.7 5.7 3 0 0-.1 0 0 0 1.1.2 2.2.1 3.2-.2.2.4.4.8.6 1.2z" />
        </svg>
      ),
    },
    {
      id: 'antigravity',
      name: 'Antigravity',
      subtitle: 'Agentic Harness',
      desc: 'Google DeepMind • Multi-agent delegation, autonomous pair programming & skills',
      className: 'bubble-float-2',
      style: { top: '40%', right: '6%' },
      colorClass: 'bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 text-white shadow-indigo-500/35',
      icon: <span className="material-symbols-outlined text-[19px]">rocket_launch</span>,
    },

    // --- Row 4 (Lower Middle) ---
    {
      id: 'combine',
      name: 'Combine',
      subtitle: 'Async Streams',
      desc: 'Reactive Streams • Threading, Backpressure & Async Sequences',
      className: 'bubble-float-5',
      style: { top: '61%', left: '4%' },
      colorClass: 'bg-sky-500/15 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30',
      icon: <span className="material-symbols-outlined text-[18px]">alt_route</span>,
    },
    {
      id: 'gemini',
      name: 'Gemini 3.8',
      subtitle: 'Multimodal AI',
      desc: 'Google AI • 2M+ context window, multimodal perception & Live API streaming',
      className: 'bubble-float-6',
      style: { top: '60%', right: '4%' },
      colorClass: 'bg-gradient-to-tr from-blue-600 via-sky-500 to-purple-600 text-white shadow-blue-500/30',
      icon: <span className="material-symbols-outlined text-[18px]">auto_awesome</span>,
    },

    // --- Row 5 (Bottom Row - Tooltips appear above) ---
    {
      id: 'uikit',
      name: 'UIKit',
      subtitle: 'Programmatic',
      desc: 'Programmatic Autolayout • CoreAnimation, View Recycling & High-FPS Lists',
      className: 'bubble-float-1',
      style: { top: '80%', left: '10%' },
      colorClass: 'bg-indigo-500/15 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30',
      icon: <span className="material-symbols-outlined text-[18px]">layers</span>,
      isBottomRow: true,
    },
    {
      id: 'mcp',
      name: 'MCP Protocol',
      subtitle: 'Tool Standard',
      desc: 'Model Context Protocol • Tool orchestration, REA reverse engineering & custom servers',
      className: 'bubble-float-4',
      style: { top: '80%', right: '12%' },
      colorClass: 'bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30',
      icon: <span className="material-symbols-outlined text-[18px]">hub</span>,
      isBottomRow: true,
    },
  ];

  return (
    <section className="w-full pt-28 pb-12" id="about">
      {/* Ambient Radial Glass Glow */}
      <div className="relative w-full overflow-hidden pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[760px] h-[360px] liquid-glow -z-10"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full">
        {/* Left Column: Intro & Profile Bio */}
        <div className="flex flex-col items-start gap-5 md:col-span-7">
          
          {/* Liquid Glass Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono-label text-mono-label text-slate-700 dark:text-slate-300 tracking-wide font-medium">
              Building iOS at Grab
            </span>
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-1.5">
            <h1 className="font-display text-display text-slate-900 dark:text-white tracking-tight font-bold">
              Sendo Tjiamis
            </h1>
            <p className="font-headline-md text-headline-md text-primary dark:text-sky-400 font-normal">
              iOS Engineer building apps used by millions.
            </p>
          </div>

          {/* Bio Description */}
          <p className="font-body-lg text-body-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Senior iOS Engineer with 3+ years of dedicated craft in <span className="font-semibold text-slate-900 dark:text-white">Swift</span>, <span className="font-semibold text-slate-900 dark:text-white">SwiftUI</span>, <span className="font-semibold text-slate-900 dark:text-white">UIKit</span>, and high-throughput mobile architecture. Augmented with modern <span className="font-semibold text-slate-900 dark:text-white">AI Agent Harnesses</span> (Claude, Gemini, Antigravity) for autonomous workflows and test automation. Currently scaling driver and consumer experiences at <span className="text-slate-900 dark:text-white font-semibold">Grab</span>.
          </p>

          {/* Merged Minimalist Contact Hub */}
          <div id="contact" className="flex flex-col gap-3 pt-2 w-full">
            <div className="flex flex-wrap items-center gap-2.5 w-full">
              {/* Primary CTA: Get in touch */}
              <a
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-blue-700 text-white font-body-sm text-body-sm font-medium transition-all duration-150 shadow-md active:scale-[0.98] border border-white/20"
                href={`mailto:${email}`}
              >
                <span className="material-symbols-outlined text-[18px]">outgoing_mail</span>
                <span>Get in touch</span>
              </a>

              {/* Secondary CTA: Resume PDF */}
              <a
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl liquid-glass text-slate-700 dark:text-slate-200 font-body-sm text-body-sm font-medium hover:opacity-95 transition-all duration-150 shadow-sm active:scale-95"
                href={`mailto:${email}?subject=Resume%20Request%20-%20Sendo%20Tjiamis`}
              >
                <span className="material-symbols-outlined text-[18px]">description</span>
                <span>Resume PDF</span>
              </a>

              {/* Minimalist Segmented Glass Capsule: Copy Email & Socials */}
              <div className="inline-flex items-center rounded-xl liquid-glass p-1 border border-white/50 dark:border-white/10 shadow-sm">
                {/* One-Click Copy Email */}
                <button
                  type="button"
                  onClick={copyEmail}
                  title={`Click to copy ${email}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800/80 font-mono-label text-[11px] font-medium transition-all active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px] text-primary dark:text-sky-400">
                    {copied ? 'check' : 'content_copy'}
                  </span>
                  <span>{copied ? 'Copied!' : 'Copy email'}</span>
                </button>

                {/* Vertical Divider */}
                <div className="w-px h-4 bg-slate-300/80 dark:bg-slate-700/80 mx-0.5"></div>

                {/* GitHub */}
                <a
                  aria-label="GitHub Profile"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/80 transition-colors"
                  href="https://github.com/sendotjiam"
                  rel="noopener noreferrer"
                  target="_blank"
                  title="GitHub"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </a>

                {/* Vertical Divider */}
                <div className="w-px h-4 bg-slate-300/80 dark:bg-slate-700/80 mx-0.5"></div>

                {/* LinkedIn */}
                <a
                  aria-label="LinkedIn Profile"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/80 transition-colors"
                  href="https://www.linkedin.com/in/sendo-tjiamis-a03a73192"
                  rel="noopener noreferrer"
                  target="_blank"
                  title="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.76-1.75 1.76m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Availability Status Footnote */}
            <div className="inline-flex items-center gap-1.5 pt-1 font-mono-label text-[11px] text-slate-500 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-700 dark:text-slate-300 font-medium">Open to remote worldwide</span>
            </div>
          </div>
        </div>

        {/* Right Column: Liquid Glass Interactive Constellation */}
        <div className="md:col-span-5 relative flex flex-col items-center justify-center py-4">
          
          {/* Subtle drag hint */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass font-mono-label text-[10px] text-slate-600 dark:text-slate-400 mb-2 select-none shadow-sm">
            <span className="material-symbols-outlined text-[13px] text-primary">drag_pan</span>
            <span>Liquid Glass Orbit • Drag &amp; Hover</span>
          </div>

          <div
            ref={containerRef}
            className="relative w-full max-w-[460px] h-[450px] sm:h-[480px] select-none mx-auto flex items-center justify-center"
          >
            {/* Chromatic Liquid Ambient Glow Backdrop */}
            <div className="absolute w-84 h-84 rounded-full liquid-glow -z-10 pointer-events-none"></div>

            {/* Render 9 Apple Liquid Glass Badges */}
            {bubbles.map((b) => {
              const isHovered = hoveredId === b.id && !isDragging;

              return (
                <motion.div
                  key={b.id}
                  drag
                  dragConstraints={containerRef}
                  dragElastic={0.15}
                  onDragStart={() => {
                    setIsDragging(true);
                    setHoveredId(null);
                  }}
                  onDragEnd={() => {
                    setIsDragging(false);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
                  className="absolute cursor-grab touch-none"
                  style={{
                    ...b.style,
                    zIndex: isHovered || isDragging ? 50 : 20,
                  }}
                >
                  {/* Floating animation wrapper - pauses on hover/drag */}
                  <div
                    className={`${b.className} relative flex flex-col items-center group`}
                    onMouseEnter={() => !isDragging && setHoveredId(b.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setHoveredId(hoveredId === b.id ? null : b.id)}
                  >
                    {/* Liquid Glass Badge Pill */}
                    <div className="liquid-glass liquid-glass-pill relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-inner shrink-0 group-hover:scale-105 transition-transform ${b.colorClass}`}>
                        {b.icon}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-headline-sm text-[13px] font-semibold text-slate-900 dark:text-white leading-none whitespace-nowrap">
                          {b.name}
                        </span>
                        <span className="font-mono-label text-[10px] text-primary dark:text-sky-400 font-medium mt-0.5 whitespace-nowrap">
                          {b.subtitle}
                        </span>
                      </div>
                    </div>

                    {/* Apple VisionOS Liquid Glass Tooltip: Anchored Directly to THIS Pill */}
                    {isHovered && (
                      <div
                        className={`liquid-tooltip absolute z-50 pointer-events-none w-60 sm:w-64 p-3.5 rounded-2xl text-white dark:text-slate-900 text-center transition-all duration-200 animate-in fade-in zoom-in-95 ${
                          b.isBottomRow
                            ? 'bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2'
                            : 'top-[calc(100%+12px)] left-1/2 -translate-x-1/2'
                        }`}
                      >
                        {/* Smooth VisionOS Caret Beak */}
                        {b.isBottomRow ? (
                          <svg
                            className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-4 h-2 pointer-events-none"
                            viewBox="0 0 16 8"
                            fill="none"
                          >
                            <path
                              d="M0 0 C3.5 0 6 6.8 7.2 7.7 C7.6 8 8.4 8 8.8 7.7 C10 6.8 12.5 0 16 0 Z"
                              className="fill-slate-900/95 dark:fill-white"
                            />
                            <path
                              d="M0 0 C3.5 0 6 6.8 7.2 7.7 C7.6 8 8.4 8 8.8 7.7 C10 6.8 12.5 0 16 0"
                              className="stroke-white/15 dark:stroke-slate-200"
                              strokeWidth="1"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-4 h-2 pointer-events-none"
                            viewBox="0 0 16 8"
                            fill="none"
                          >
                            <path
                              d="M0 8 C3.5 8 6 1.2 7.2 0.3 C7.6 0 8.4 0 8.8 0.3 C10 1.2 12.5 8 16 8 Z"
                              className="fill-slate-900/95 dark:fill-white"
                            />
                            <path
                              d="M0 8 C3.5 8 6 1.2 7.2 0.3 C7.6 0 8.4 0 8.8 0.3 C10 1.2 12.5 8 16 8"
                              className="stroke-white/15 dark:stroke-slate-200"
                              strokeWidth="1"
                            />
                          </svg>
                        )}

                        <div className="flex items-center justify-center gap-1.5 font-headline-sm text-[12px] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse"></span>
                          <span>{b.name}</span>
                        </div>
                        <p className="font-body-sm text-[11px] text-slate-200 dark:text-slate-700 leading-snug mt-1.5">
                          {b.desc}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
