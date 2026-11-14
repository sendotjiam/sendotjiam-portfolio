'use client';

import { useState } from 'react';

export default function ZestDownload() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const gatekeeperCmd = 'xattr -cr /Applications/Zest.app';
  const buildCmd = 'git clone https://github.com/sendotjiam/zest.git && cd zest && ./package-app.sh';

  return (
    <section id="download" className="py-16 sm:py-24 border-t border-[var(--separator)]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-6">
          <div>
            <h2 className="text-[14px] font-semibold text-apple-secondary flex items-center gap-1.5">
              <span className="font-mono text-[12px] font-bold text-[var(--shuiro)]">06</span>
              <span>Setup &amp; Releases</span>
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-label mt-1 text-balance">
              Quick Installation
            </h3>
            <p className="text-[14px] text-apple-secondary mt-1">
              Universal binary compiled for Apple Silicon and Intel Macs running macOS 14.0+ Sonoma and Sequoia.
            </p>
          </div>
          <span className="text-[13px] font-medium text-apple-secondary">
            v1.2.0 Universal
          </span>
        </div>

        {/* Installation Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Option 1: Direct Download */}
          <div className="apple-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between border-2 border-apple-tint/30 shadow-apple-md relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-apple-tint text-white text-[11px] font-bold rounded-bl-xl">
              Recommended
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-apple-tint/10 text-apple-tint flex items-center justify-center">
                  <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-apple-label">Direct DMG Download</h3>
              </div>
              <p className="text-[13px] text-apple-secondary leading-relaxed mb-5">
                Universal binary for Apple Silicon (M1/M2/M3/M4) and Intel Macs on macOS 14.0+ Sonoma or Sequoia.
              </p>

              <ol className="space-y-2.5 text-[13px] text-apple-secondary mb-6 list-decimal list-inside font-sans">
                <li>Download <strong className="text-apple-label font-medium">Zest.dmg</strong> from GitHub Releases.</li>
                <li>Open the DMG and drag <strong className="text-apple-label font-medium">Zest</strong> into your Applications folder.</li>
                <li>Launch Zest and grant Accessibility permission to enable simulated paste.</li>
              </ol>
            </div>

            <div>
              <a
                href="https://github.com/sendotjiam/zest/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-[14px] font-semibold bg-apple-tint text-white hover:bg-apple-tint-hover active:scale-[0.98] transition-colors shadow-apple-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint"
              >
                <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Zest (v1.2.0 DMG)</span>
              </a>

              {/* Gatekeeper Tip */}
              <div className="mt-4 p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-[var(--separator)] text-[12px]">
                <div className="flex items-center justify-between text-apple-tertiary mb-1 font-medium">
                  <span>First-Launch Gatekeeper Notice:</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(gatekeeperCmd, 'gatekeeper')}
                    className="text-apple-tint hover:underline font-mono text-[11px] min-h-[44px] inline-flex items-center px-1"
                  >
                    {copiedCmd === 'gatekeeper' ? 'Copied ✓' : 'Copy command'}
                  </button>
                </div>
                <code className="text-apple-label font-mono text-[11px] block select-all break-all">
                  {gatekeeperCmd}
                </code>
              </div>
            </div>
          </div>

          {/* Option 2: Build From Source */}
          <div className="apple-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/10 text-apple-secondary flex items-center justify-center">
                  <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-apple-label">Build from Source</h3>
              </div>
              <p className="text-[13px] text-apple-secondary leading-relaxed mb-5">
                For developers with Swift 6 and Xcode Command Line Tools who prefer inspecting source code and compiling locally.
              </p>

              <div className="p-3.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.04] text-apple-label font-sans text-[12px] leading-relaxed mb-5 relative group border border-[var(--separator)]">
                <div className="text-apple-tertiary select-none mb-1 font-sans text-[11px]">Clone and compile universal app bundle:</div>
                <div className="font-mono text-apple-tint select-all break-all font-semibold">{buildCmd}</div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(buildCmd, 'build')}
                  className="mt-2.5 min-h-[44px] px-3.5 py-2 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-apple-label text-[12px] font-medium transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint"
                >
                  {copiedCmd === 'build' ? 'Copied to Clipboard ✓' : 'Copy command'}
                </button>
              </div>

              <div className="text-[12px] text-apple-secondary leading-relaxed">
                Build script generates the universal application bundle, codesigns it locally, and automatically installs it to <code className="font-mono text-apple-label">~/Applications/Zest.app</code>.
              </div>
            </div>

            {/* Launch on Login Tip */}
            <div className="mt-6 pt-4 border-t border-[var(--separator)] text-[12px] text-apple-secondary">
              <strong className="text-apple-label font-semibold block mb-1">Launch on Login (Persistent Daemon):</strong>
              Open <strong>System Settings → General → Login Items</strong>, click <strong>+</strong>, and add Zest to keep it ready in the background.
            </div>
          </div>
        </div>

        {/* Permissions & Security Box */}
        <div className="p-5 sm:p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-[var(--separator)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[13px]">
          <div>
            <h4 className="font-bold text-apple-label mb-1">Required macOS Permissions</h4>
            <p className="text-apple-secondary text-[12px] leading-relaxed">
              <strong>Accessibility:</strong> Required solely to simulate the synthetic <kbd className="font-mono">⌘V</kbd> keystroke into your active target application.
              <br />
              <strong>Screen Recording:</strong> Optional, requested only when you trigger Screen Snip OCR (<kbd className="font-mono">⌘⇧2</kbd>).
            </p>
          </div>

          <a
            href="https://github.com/sendotjiam/zest/blob/main/PRIVACY.md"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-4 py-2 rounded-xl text-apple-secondary hover:text-apple-label bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-medium text-[12px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint"
          >
            Read Privacy Policy (Zero Telemetry)
          </a>
        </div>
      </div>
    </section>
  );
}
