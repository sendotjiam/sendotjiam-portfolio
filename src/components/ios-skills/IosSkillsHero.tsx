'use client';

import { useState } from 'react';
import Image from 'next/image';

const AGENT_PLATFORMS = [
  { name: 'Google Antigravity', badge: 'AGY Native', color: 'from-blue-500 to-indigo-600' },
  { name: 'Anthropic Claude Code', badge: 'CLAUDE.md Ready', color: 'from-amber-500 to-orange-600' },
  { name: 'OpenAI Codex', badge: 'AGENTS.md Ready', color: 'from-emerald-500 to-teal-600' },
];

export default function IosSkillsHero() {
  const [copied, setCopied] = useState<boolean>(false);
  const commandText = './bin/ios-audit /path/to/project --all';

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(commandText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="hero" className="pt-24 sm:pt-28 pb-12 sm:pb-16">
      {/* Top Tag & Cross-Agent Platforms */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold bg-apple-tint/10 text-apple-tint border border-apple-tint/20">
          <span className="w-2 h-2 rounded-full bg-apple-tint animate-pulse motion-reduce:animate-none" />
          Open Source Suite
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-medium bg-black/5 dark:bg-white/10 text-apple-secondary border border-black/10 dark:border-white/10">
          Swift 6.0+
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          100% Eval Pass Rate
        </span>
      </div>

      {/* Main Grid: Left Headline & Value Prop, Right Hero Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-apple-label leading-[1.12] mb-5">
            Production-Grade Agentic Audits for{' '}
            <span className="text-apple-tint bg-clip-text">Apple Engineering</span>.
          </h1>

          <p className="text-[16px] sm:text-[18px] text-apple-secondary leading-relaxed mb-6 font-normal">
            Eliminate severe main-thread hangs, SwiftUI render hitches, ARC retain cycles, and Apple Privacy Manifest violations before your code reaches production. Built for senior iOS teams, automated CI quality gates, and AI coding agents.
          </p>

          {/* Cross-Agent Ecosystem Compatibility */}
          <div className="mb-6 p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10">
            <span className="text-[12px] font-semibold text-apple-tertiary block mb-2">
              Cross-agent native ecosystem
            </span>
            <div className="flex flex-wrap gap-2">
              {AGENT_PLATFORMS.map((platform) => (
                <div
                  key={platform.name}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-black/30 border border-black/5 dark:border-white/10 text-[12px] font-medium text-apple-label shadow-apple-sm"
                >
                  <span className={`w-2 h-2 rounded-full bg-gradient-to-tr ${platform.color}`} />
                  <span>{platform.name}</span>
                  <span className="text-[10px] text-apple-tertiary font-mono">({platform.badge})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick CLI Copy Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1 flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 font-mono text-[13px] text-apple-label overflow-x-auto">
              <span className="text-apple-tertiary select-none">$</span>
              <span className="truncate">{commandText}</span>
              <button
                type="button"
                onClick={copyCommand}
                className="shrink-0 text-[11px] font-semibold px-2 py-1 rounded bg-apple-tint text-white hover:bg-apple-tint/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint"
                title="Copy command to clipboard"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <a
              href="#simulator"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-apple-tint text-white font-semibold text-[14px] hover:bg-apple-tint/90 transition-colors shadow-apple-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint"
            >
              <span>Launch Simulator</span>
              <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* Responsible Usage Advisory */}
          <div className="mt-4 flex items-center gap-2 text-[12px] text-apple-secondary">
            <svg aria-hidden="true" className="w-3.5 h-3.5 text-amber-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>
              Assistive engineering tools: not 100% infallible. Use wisely, verify with tests, and{' '}
              <a
                href="https://github.com/sendotjiam/ios-agent-skills/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-apple-tint hover:underline font-medium"
              >
                report or contribute fixes
              </a>
              .
            </span>
          </div>
        </div>

        {/* Right Column: Hero Visual Feature Box */}
        <div className="lg:col-span-5">
          <div className="apple-card p-6 rounded-2xl relative overflow-hidden border border-black/10 dark:border-white/10 shadow-apple-md">
            {/* Top Bar with Icon and Stats */}
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shrink-0 shadow-apple-sm">
                <Image
                  src="/assets/project-logo/ios-agent-skills-logo.svg"
                  alt="iOS Agent Skills Retina Icon"
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-apple-label">ios-agent-skills</h3>
                <p className="text-[12px] text-apple-secondary">10 Specialized Audits, 0 Dependencies</p>
              </div>
            </div>

            {/* Metric KPI Tiles */}
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/5 dark:border-white/5">
                <span className="text-[11px] font-medium text-apple-tertiary block">Execution Speed</span>
                <span className="text-[19px] font-extrabold text-apple-label tracking-tight font-mono">&lt; 25 ms</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block mt-0.5">AST regex parser</span>
              </div>
              <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/5 dark:border-white/5">
                <span className="text-[11px] font-medium text-apple-tertiary block">MetricKit Hang Budget</span>
                <span className="text-[19px] font-extrabold text-apple-label tracking-tight font-mono">&lt; 400 ms</span>
                <span className="text-[10px] text-apple-tint block mt-0.5">Enforces strict 0-hang</span>
              </div>
              <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/5 dark:border-white/5">
                <span className="text-[11px] font-medium text-apple-tertiary block">Xcode Build Phase</span>
                <span className="text-[19px] font-extrabold text-apple-label tracking-tight font-mono">Native</span>
                <span className="text-[10px] text-apple-secondary block mt-0.5">Issue Navigator warnings</span>
              </div>
              <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/5 dark:border-white/5">
                <span className="text-[11px] font-medium text-apple-tertiary block">GitHub CI SARIF</span>
                <span className="text-[19px] font-extrabold text-apple-label tracking-tight font-mono">v3.0</span>
                <span className="text-[10px] text-apple-secondary block mt-0.5">CodeQL scanning integration</span>
              </div>
            </div>

            {/* Quick Link Footer */}
            <div className="pt-3 border-t border-[var(--separator)] flex items-center justify-between text-[12px]">
              <span className="text-apple-secondary font-medium">MIT License • 100% Tested</span>
              <a
                href="https://github.com/sendotjiam/ios-agent-skills"
                target="_blank"
                rel="noopener noreferrer"
                className="text-apple-tint hover:underline font-semibold flex items-center gap-1"
              >
                <span>GitHub Repo</span>
                <svg aria-hidden="true" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
