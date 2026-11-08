'use client';

import { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const Macropad3D = dynamic(() => import('@/components/Macropad3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] sm:h-[360px] flex flex-col items-center justify-center gap-3 motion-safe:animate-pulse">
      <div className="w-7 h-7 rounded-full border-2 border-[var(--shuiro)]/30 border-t-[var(--shuiro)] motion-safe:animate-spin" />
      <span className="text-[12px] font-medium text-apple-secondary">
        Initializing Macropad…
      </span>
    </div>
  ),
});

export default function Hero() {
  const [copied, setCopied] = useState<boolean>(false);
  const email = 'sendotjiamis9898@gmail.com';

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
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-apple-label text-balance">
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
              className="inline-flex items-center gap-2 h-11 px-4 rounded-full bg-apple-card hover:bg-black/[0.04] dark:hover:bg-white/[0.06] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-apple-label text-[13px] font-medium border border-[var(--separator)] transition-colors apple-btn-active cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint focus-visible:ring-offset-2 whitespace-nowrap shadow-apple-sm"
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
                    Copied to clipboard
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

        {/* Right Column: Bespoke 2-Row Proportional 3D Mechanical Macropad (6 cols) */}
        <div className="lg:col-span-6 w-full flex flex-col items-center justify-center">
          <Macropad3D />
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
