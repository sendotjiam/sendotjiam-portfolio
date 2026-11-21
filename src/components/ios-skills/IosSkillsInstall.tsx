'use client';

import { useState } from 'react';

export default function IosSkillsInstall() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const installSnippets = [
    {
      label: 'Agent Universal Setup (Antigravity • Claude • Codex)',
      command: 'git clone https://github.com/sendotjiam/ios-agent-skills.git ~/.agents/ios-agent-skills && ~/.agents/sync-skills.sh',
      note: 'Symlinks all 10 skills directly into your global agent environment.',
    },
    {
      label: 'Run Standalone Audit CLI in Project',
      command: 'git clone https://github.com/sendotjiam/ios-agent-skills.git && ./ios-agent-skills/bin/ios-audit . --all',
      note: 'Zero prerequisites beyond python3 (pre-installed on macOS).',
    },
  ];

  const handleCopy = async (index: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="install" className="py-12 sm:py-20 border-t border-[var(--separator)]">
      <div className="apple-card p-5 sm:p-10 rounded-2xl sm:rounded-3xl shadow-apple-md text-center max-w-4xl mx-auto relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-apple-label mb-4">
            Installation &amp; Xcode CI Integration
          </h2>
          <p className="text-[15px] sm:text-[16px] text-apple-secondary leading-relaxed mb-8">
            Install the 10 skills across your favorite AI coding assistants, or integrate the auditor CLI directly into your Xcode build process and GitHub CI.
          </p>

          {/* Installation Command Snippet Cards */}
          <div className="space-y-4 mb-8 text-left">
            {installSnippets.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:p-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-[var(--separator)] min-w-0"
              >
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 mb-2">
                  <span className="text-[12px] font-bold text-apple-label break-words">{item.label}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(idx, item.command)}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-apple-tint text-white hover:bg-apple-tint/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint shrink-0 min-h-[30px] flex items-center"
                  >
                    {copiedIndex === idx ? 'Copied!' : 'Copy Command'}
                  </button>
                </div>

                <div className="p-2.5 rounded-lg bg-[var(--terminal-bg)] text-zinc-200 font-mono text-[11.5px] sm:text-[12px] overflow-x-auto select-all">
                  <span className="text-apple-tertiary mr-2 select-none">$</span>
                  {item.command}
                </div>

                <p className="mt-2 text-[11.5px] text-apple-secondary">{item.note}</p>
              </div>
            ))}
          </div>

          {/* Direct GitHub Link CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://github.com/sendotjiam/ios-agent-skills"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-2.5 rounded-xl bg-apple-tint text-white font-semibold text-[14px] hover:bg-apple-tint/90 transition-colors shadow-apple-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint w-full sm:w-auto"
            >
              <svg aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>View Source on GitHub</span>
            </a>

            <a
              href="/"
              className="inline-flex items-center justify-center gap-1.5 min-h-[46px] px-5 py-2.5 rounded-xl bg-black/5 dark:bg-white/10 text-apple-label font-medium text-[14px] hover:bg-black/10 dark:hover:bg-white/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint w-full sm:w-auto"
            >
              <span>Back to Portfolio</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
