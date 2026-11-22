import Image from 'next/image';

export default function ZestHero() {
  const pillars = [
    { title: '< 20 MB RAM', subtitle: 'Native AppKit & SwiftUI unibody' },
    { title: '~0.001% CPU', subtitle: 'Zero-polling changeCount tick' },
    { title: '< 5 ms Latency', subtitle: 'Quartz CGEvent synthetic keystroke' },
    { title: '100% On-Device', subtitle: 'Zero telemetry & no network calls' },
    { title: 'Vision Snip OCR', subtitle: 'Apple Neural Engine text recognition' },
  ];

  return (
    <section id="top" className="min-h-[100dvh] py-16 sm:py-20 flex flex-col justify-center gap-10 w-full">
      {/* 2-Column Split: Identity & Specs (6 cols) + Interactive Mini-Stage (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
        {/* Left Column (6 cols) */}
        <div className="lg:col-span-6 flex flex-col items-start gap-5">
          {/* Availability Pill (Mineral Teal Harmonious Accent) */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--teal-soft)] border border-[var(--teal-border)]">
            <span className="w-2 h-2 rounded-full bg-[var(--teal)]" aria-hidden="true" />
            <span className="text-[12px] font-medium text-apple-label">
              Open Source <strong className="font-semibold text-[var(--teal)]">Swift 6</strong> utility for macOS 14+
            </span>
          </div>

          {/* Icon + Title Lockup */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-[74px] sm:h-[74px] rounded-2xl overflow-hidden border-2 border-[var(--separator-opaque)] shadow-apple-md bg-apple-card">
                <Image
                  src="/assets/project-logo/zest-logo.png"
                  alt="Zest for macOS App Icon"
                  width={148}
                  height={148}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                aria-hidden="true"
                className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[var(--teal)] border-[2.5px] border-[var(--bg)] shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-apple-label text-balance break-words min-w-0">
                Zest for macOS
              </h1>
              <p className="text-[17px] sm:text-xl text-[var(--tint)] font-semibold tracking-tight text-balance">
                Sub-millisecond, 1-tap clipboard HUD for developers.
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-[15px] sm:text-[16px] text-apple-secondary leading-relaxed font-normal">
            Stop wrestling with 3-step search dialogs. Press{' '}
            <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-apple-label font-mono text-[13px] border border-[var(--separator)]">
              ⌘⇧V
            </kbd>
            , tap a single digit (<kbd className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono text-[13px]">1-9</kbd>), and your snippet pastes instantly into your code without stealing active editor focus.
          </p>

          {/* Actions Row */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {/* Primary CTA (Conflicting Focal Color: Shu-iro Vermilion) */}
            <a
              href="https://github.com/sendotjiam/zest/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[var(--shuiro)] hover:opacity-90 active:scale-95 text-white text-[14px] font-semibold transition-opacity shadow-apple-sm apple-btn-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--shuiro)] focus-visible:ring-offset-2 whitespace-nowrap"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4 fill-none stroke-current stroke-2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download v1.2.0 DMG</span>
            </a>

            {/* Secondary CTA */}
            <a
              href="#simulator"
              className="inline-flex items-center gap-2 h-11 px-4 rounded-full bg-apple-card hover:bg-black/[0.04] dark:hover:bg-white/[0.06] active:scale-95 text-apple-label text-[13px] font-medium border border-[var(--separator)] transition-colors apple-btn-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint focus-visible:ring-offset-2 whitespace-nowrap shadow-apple-sm"
            >
              <span>Try Simulator</span>
              <span className="text-apple-tertiary">↵</span>
            </a>

            {/* GitHub Button */}
            <a
              href="https://github.com/sendotjiam/zest"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="w-11 h-11 rounded-full flex items-center justify-center bg-apple-card text-apple-secondary hover:text-apple-label active:scale-95 hover:border-[var(--tint-border)] border border-[var(--separator)] transition-colors apple-btn-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint shadow-apple-sm"
            >
              <svg aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Column (6 cols): Visual Stage Card (Desktop only; on mobile, ZestSimulator below provides the interactive experience) */}
        <div className="hidden lg:flex lg:col-span-6 w-full flex-col items-center justify-center">
          <div className="w-full p-5 sm:p-6 rounded-2xl border border-[var(--separator)] bg-apple-bg-grouped shadow-apple-md">
            {/* Top Bar with technical session indicator */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--separator)] text-[12px]">
              <span className="font-sans font-medium text-apple-secondary text-[12px]">
                Target Process: Terminal.app
              </span>
              <code className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--teal-soft)] text-[var(--teal)] border border-[var(--teal-border)] font-semibold">
                .nonactivatingPanel
              </code>
            </div>

            {/* Target Editor Line with Blinking Cursor */}
            <div className="p-3.5 rounded-xl bg-apple-card border border-[var(--separator)] font-mono text-[13px] mb-4">
              <span className="text-apple-tertiary select-none font-sans text-[11px] block mb-1">$ echo $DATABASE_URL</span>
              <span className="text-[var(--tint)]">postgres://user:pass@localhost:5432/zest</span>
              <span aria-hidden="true" className="inline-block w-2 h-4 bg-apple-tint animate-pulse ml-0.5 align-middle" />
            </div>

            {/* Micro HUD Snapshot Block (Warm Citrus Glass & Telemetry) */}
            <div className="relative overflow-hidden rounded-xl bg-apple-card text-apple-label p-3.5 border border-[#ff8a00]/35 shadow-apple-sm flex flex-col gap-2 font-sans">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-56 h-20 rounded-full bg-[#ff8a00]/15 blur-xl"
              />
              <div className="relative flex items-center justify-between text-[11px] text-apple-tertiary pb-2 border-b border-[var(--separator)]">
                <span className="font-semibold text-apple-label text-[12px]">Zest Floating HUD</span>
                <span className="inline-flex items-center gap-1 font-mono text-[9.5px] text-white font-bold px-2 py-0.5 rounded-md bg-gradient-to-b from-[var(--zest-amber-from)] to-[var(--zest-amber-to)] shadow-apple-sm">
                  ⚡ ZEST • ⌘⇧V
                </span>
              </div>
              <div className="relative flex items-center justify-between gap-2 text-[12px] h-[34px] px-2.5 rounded-lg bg-gradient-to-r from-[#ff6b00]/[0.14] to-[#f59e0b]/[0.05] border border-[#ff6b00]/40">
                <span
                  aria-hidden="true"
                  className="absolute left-0.5 top-1.5 bottom-1.5 w-[2.5px] rounded-full bg-gradient-to-b from-[var(--zest-amber-from)] to-[var(--zest-amber-to)]"
                />
                <div className="flex items-center gap-2 overflow-hidden pl-1">
                  <span className="w-[18px] h-[18px] rounded-[4px] bg-gradient-to-b from-[var(--zest-amber-from)] to-[var(--zest-amber-to)] text-white font-bold text-[11px] flex items-center justify-center shrink-0 font-mono border border-white/40 shadow-apple-sm">
                    1
                  </span>
                  <span className="font-sans font-bold text-[9px] px-1 py-0.5 rounded bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30 shrink-0">
                    JSON
                  </span>
                  <span className="truncate text-apple-label font-mono text-[11px]">{'{ "status": 200, "user": "sendo" }'}</span>
                </div>
                <span className="text-[10.5px] text-[#ea580c] dark:text-[#ff7a18] font-semibold shrink-0">Tap 1 to Paste ↵</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Engineering Pillars Banner (Matching Hero.tsx) */}
      <div className="w-full pt-8 mt-2 border-t border-[var(--separator)]">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {pillars.map((pillar, idx) => (
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
