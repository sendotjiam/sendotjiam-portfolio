'use client';

import { useState } from 'react';

interface ShortcutItem {
  keys: string[];
  scope: 'Global' | 'HUD' | 'Modifier';
  desc: string;
}

const SHORTCUTS: ShortcutItem[] = [
  { keys: ['⌘', '⇧', 'V'], scope: 'Global', desc: 'Toggle Zest HUD (at cursor, screen center, or menu bar)' },
  { keys: ['⌘', '⇧', '2'], scope: 'Global', desc: 'Block screen area and copy recognized text to clipboard (OCR)' },
  { keys: ['1-9'], scope: 'HUD', desc: 'Instantly paste recent items 1 through 9' },
  { keys: ['0'], scope: 'HUD', desc: 'Instantly paste recent item 10' },
  { keys: ['⌥1-⌥9'], scope: 'HUD', desc: 'Instantly paste pinned snippets 1 through 9' },
  { keys: ['⇧', '1-9 / ↵'], scope: 'Modifier', desc: 'Copy only to clipboard (does not fire simulated ⌘V)' },
  { keys: ['⌥', '↵'], scope: 'Modifier', desc: 'Paste unformatted plain text (strips markdown and rich styling)' },
  { keys: ['↵ Return'], scope: 'HUD', desc: 'Paste highlighted or topmost clip' },
  { keys: ['Space'], scope: 'HUD', desc: 'Toggle Quick-Look expanded monospace preview popover' },
  { keys: ['Tab ⇥'], scope: 'HUD', desc: 'Open In-Flight Transform Deck (JSON, Case, Base64, etc.)' },
  { keys: ['?'], scope: 'HUD', desc: 'Open in-app User Guide and Cheatsheet' },
  { keys: ['⌘', ','], scope: 'Global', desc: 'Open Preferences window' },
  { keys: ['Pin'], scope: 'HUD', desc: 'Pin / Unpin snippet permanently to top of HUD' },
  { keys: ['Delete'], scope: 'HUD', desc: 'Delete single clip from history' },
  { keys: ['Clear All'], scope: 'HUD', desc: '2-tap confirmation wipe of all unpinned clips' },
  { keys: ['Esc'], scope: 'HUD', desc: 'Immediately dismiss HUD' },
];

export default function ZestShortcuts() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Global' | 'HUD' | 'Modifier'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = SHORTCUTS.filter((s) => {
    const matchesCategory = activeCategory === 'All' || s.scope === activeCategory;
    const matchesSearch =
      s.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.keys.join(' ').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="shortcuts" className="py-16 sm:py-20 border-t border-[var(--separator)]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-6">
          <div>
            <h2 className="text-[14px] font-semibold text-apple-secondary flex items-center gap-1.5">
              <span className="font-mono text-[12px] font-bold text-[var(--shuiro)]">05</span>
              <span>Hotkeys &amp; Gestures</span>
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-label mt-1 text-balance">
              Keyboard Cheatsheet
            </h3>
            <p className="text-[14px] text-apple-secondary mt-1">
              Every interaction has an instant tactile hotkey to keep your hands on the home row.
            </p>
          </div>
          <span className="text-[13px] font-medium text-apple-secondary">
            16 Hardware Keys
          </span>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-xl border border-[var(--separator)] w-full sm:w-auto">
            {(['All', 'Global', 'HUD', 'Modifier'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors flex-1 sm:flex-initial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint ${
                  activeCategory === cat
                    ? 'bg-apple-card shadow-apple-sm text-apple-label'
                    : 'text-apple-secondary hover:text-apple-label'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search shortcuts..."
              className="w-full px-3.5 py-1.5 text-[13px] rounded-xl bg-black/5 dark:bg-white/5 border border-[var(--separator)] text-apple-label placeholder-apple-tertiary focus:outline-none focus:ring-2 focus:ring-apple-tint"
            />
          </div>
        </div>

        {/* Shortcuts Table Card */}
        <div className="apple-card rounded-2xl overflow-hidden border border-[var(--separator)] shadow-apple-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13px] sm:text-[14px]">
              <thead>
                <tr className="bg-black/[0.02] dark:bg-white/[0.02] border-b border-[var(--separator)]">
                  <th className="py-3 px-4 sm:px-6 font-semibold text-apple-label w-44 sm:w-56">Shortcut</th>
                  <th className="py-3 px-4 sm:px-6 font-semibold text-apple-secondary w-28">Scope</th>
                  <th className="py-3 px-4 sm:px-6 font-semibold text-apple-label">Action & Behavior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--separator)] font-sans">
                {filtered.map((s, index) => (
                  <tr key={index} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors">
                    <td className="py-3 px-4 sm:px-6">
                      <div className="flex flex-wrap items-center gap-1">
                        {s.keys.map((k) => (
                          <kbd
                            key={k}
                            className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/10 text-apple-label font-mono text-[12px] font-semibold border border-black/10 dark:border-white/10 shadow-apple-sm"
                          >
                            {k}
                          </kbd>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 sm:px-6">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-apple-secondary">
                        {s.scope}
                      </span>
                    </td>
                    <td className="py-3 px-4 sm:px-6 text-apple-secondary leading-relaxed">
                      {s.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
