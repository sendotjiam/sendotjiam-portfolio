'use client';

import { useState } from 'react';

const TABS = [
  { id: 'cli', label: '1. Unified CLI Runner' },
  { id: 'xcode', label: '2. Xcode Build Phase' },
  { id: 'ci', label: '3. GitHub Actions CI' },
  { id: 'suppression', label: '4. Inline Suppression' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export default function IosSkillsCliArchitecture() {
  const [activeTab, setActiveTab] = useState<TabId>('cli');
  const [copied, setCopied] = useState<string | null>(null);

  const copyCode = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Fallback
    }
  };

  const cliSnippet = `# 1. Run all 10 audits simultaneously across your Xcode workspace
./bin/ios-audit /path/to/project --all

# 2. Select targeted audit domains
./bin/ios-audit /path/to/project --skills concurrency,render,memory,privacy

# 3. Export SARIF for GitHub Code Scanning
./bin/ios-audit /path/to/project --all --format sarif -o results.sarif

# 4. Generate formatted Markdown report for PR bot review
./bin/ios-audit /path/to/project --all --format markdown -o pr_audit.md`;

  const xcodeSnippet = `# Add this to your Xcode App Target -> Build Phases -> "New Run Script Phase":
if [ -f "$SRCROOT/bin/ios-audit" ]; then
  python3 "$SRCROOT/bin/ios-audit" "$SRCROOT" --all --format xcode
fi

# Violations will automatically appear in Xcode's Issue Navigator!`;

  const ciSnippet = `name: iOS Agent Security & Performance Audit

on:
  pull_request:
    branches: [main, master]

jobs:
  audit:
    runs-on: macos-14
    steps:
      - uses: actions/checkout@v4

      - name: Run Unified iOS Audit
        run: ./bin/ios-audit . --all --format sarif -o results.sarif --no-exit-code

      - name: Upload SARIF to GitHub Security Scanning
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: results.sarif`;

  const suppressionSnippet = `// 1. Same-line exception suppression:
let data = try? Data(contentsOf: localUrl) // ios-audit:ignore HANG-001

// 2. Next-line suppression:
// ios-audit:ignore-next-line COMBINE_ASSIGN_CYCLE
cancellable = publisher.assign(to: \\.value, on: self)

// 3. Blanket block suppression for intentional legacy bridges:
// ios-audit:ignore-all`;

  return (
    <section id="cli" className="py-12 sm:py-16 border-t border-[var(--separator)]">
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[12px] font-semibold text-apple-tint">
            Developer integration
          </span>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-apple-tint/10 text-apple-tint">
            Zero Dependencies
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-label mb-3">
          CLI, Xcode Build Phases & GitHub CI
        </h2>
        <p className="text-[15px] text-apple-secondary leading-relaxed">
          Designed with zero external npm or pip dependencies. Pure Python 3 AST parsing executes in milliseconds: whether locally in your terminal, inside Xcode’s compiler pipeline, or on CI/CD runners.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap items-center gap-2 mb-6 pb-1 sm:pb-0 max-w-full" id="architecture">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`text-[13px] font-semibold px-4 py-2 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint shrink-0 ${
              activeTab === tab.id
                ? 'bg-apple-tint text-white shadow-apple-sm'
                : 'bg-black/5 dark:bg-white/10 text-apple-secondary hover:text-apple-label'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Code Block Container */}
      <div className="apple-card rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-apple-md">
        <div className="h-11 bg-black/5 dark:bg-white/5 border-b border-[var(--separator)] px-3.5 sm:px-4 flex items-center justify-between gap-2">
          <span className="text-[12px] font-mono text-apple-tertiary truncate mr-2">
            {activeTab === 'cli' && 'Terminal Bash Script'}
            {activeTab === 'xcode' && 'Xcode Run Script Phase'}
            {activeTab === 'ci' && '.github/workflows/ios-audit.yml'}
            {activeTab === 'suppression' && 'Inline Swift Comment Suppression'}
          </span>

          <button
            type="button"
            onClick={() => {
              const text =
                activeTab === 'cli'
                  ? cliSnippet
                  : activeTab === 'xcode'
                  ? xcodeSnippet
                  : activeTab === 'ci'
                  ? ciSnippet
                  : suppressionSnippet;
              copyCode(activeTab, text);
            }}
            className="text-[11px] font-semibold px-2.5 py-1 rounded bg-black/10 dark:bg-white/10 hover:bg-apple-tint hover:text-white transition-colors text-apple-label"
          >
            {copied === activeTab ? 'Copied!' : 'Copy Code'}
          </button>
        </div>

        <div className="p-5 bg-[var(--terminal-card)] text-zinc-200 font-mono text-[12.5px] leading-relaxed overflow-x-auto">
          <pre>
            <code>
              {activeTab === 'cli' && cliSnippet}
              {activeTab === 'xcode' && xcodeSnippet}
              {activeTab === 'ci' && ciSnippet}
              {activeTab === 'suppression' && suppressionSnippet}
            </code>
          </pre>
        </div>

        {/* Informational Callout Bar */}
        <div className="p-4 bg-black/[0.02] dark:bg-white/[0.02] border-t border-[var(--separator)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px] text-apple-secondary">
          <div className="flex items-center gap-2">
            <span className="text-emerald-500 font-bold">✔ Automatic Exclusions:</span>
            <span>Test bundles (<code className="font-mono text-apple-label">Tests/</code>, <code className="font-mono text-apple-label">*Tests.swift</code>) are automatically excluded to eliminate false positives.</span>
          </div>
          <span className="text-[11px] font-mono text-apple-tertiary shrink-0">Pass --include-tests to audit test suites</span>
        </div>
      </div>
    </section>
  );
}
