export default function ZestComparison() {
  const comparisonRows = [
    {
      dimension: 'Paste Latency',
      bloated: '3-4 steps (Summon -> Search -> Select -> Enter)',
      zest: '1 Action (⌘⇧V -> Tap digit 1-9)',
      advantage: true,
    },
    {
      dimension: 'Active Cursor Focus',
      bloated: 'Steals window focus; cursor deactivates',
      zest: '.nonactivatingPanel keeps cursor blinking',
      advantage: true,
    },
    {
      dimension: 'RAM Footprint',
      bloated: '150 MB to 350 MB (Electron / Chromium)',
      zest: '< 20 MB (Native AppKit & SwiftUI)',
      advantage: true,
    },
    {
      dimension: 'Idle CPU Consumption',
      bloated: 'Constant runloop wakes & heavy polling',
      zest: '~0.001% CPU via 64-bit changeCount tick',
      advantage: true,
    },
    {
      dimension: 'Pinned Snippets',
      bloated: 'Complex nested sub-menus',
      zest: 'Dedicated ⌥1 to ⌥9 Instant Hardware Keys',
      advantage: true,
    },
    {
      dimension: 'Quick Look Preview',
      bloated: 'Separate slow floating window',
      zest: 'Monospace HUD Overlay (Space)',
      advantage: true,
    },
    {
      dimension: 'In-Flight Data Transforms',
      bloated: 'None (requires external websites/tools)',
      zest: 'Pure Swift Transform Deck (Tab)',
      advantage: true,
    },
    {
      dimension: 'Password Security',
      bloated: 'Inconsistent string regex matching',
      zest: 'Native ConcealedType + App Blacklist',
      advantage: true,
    },
    {
      dimension: 'Telemetry & Cloud',
      bloated: 'Analytics, telemetry & background sync',
      zest: '100% On-Device, Zero Network Entitlements',
      advantage: true,
    },
  ];

  const engineeringSecrets = [
    {
      num: '01',
      title: 'The Silent Watcher',
      tech: 'NSPasteboard.changeCount',
      desc: 'macOS increments an internal 64-bit integer whenever pasteboard contents change. Comparing two integers every 400ms takes < 0.0001ms, consuming 0.001% CPU and zero battery.',
    },
    {
      num: '02',
      title: 'The Password Shield',
      tech: 'ConcealedType & TransientType',
      desc: 'Zest immediately inspects pasteboard metadata for password manager flags before reading content. Passwords from 1Password, Bitwarden, and Apple Keychain are dropped before touching RAM.',
    },
    {
      num: '03',
      title: 'The Ghost Window',
      tech: 'NSPanel.StyleMask.nonactivatingPanel',
      desc: 'Traditional clipboard managers steal active window focus, breaking terminal states and IDE cursors. Zest renders as a non-activating panel: your editor cursor stays blinking and ready.',
    },
    {
      num: '04',
      title: 'Quartz Synthetic Keystrokes',
      tech: 'CGEvent Direct Injection',
      desc: 'Tapping a single digit writes the clip to the pasteboard and fires synthetic ⌘V key-down/up sequences straight into the macOS event tap in sub-milliseconds.',
    },
  ];

  return (
    <section id="why" className="py-16 sm:py-20 border-t border-[var(--separator)]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-6">
          <div>
            <h2 className="text-[14px] font-semibold text-apple-secondary flex items-center gap-1.5">
              <span className="font-mono text-[12px] font-bold text-[var(--shuiro)]">02</span>
              <span>Benchmarks &amp; Design</span>
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-label mt-1 text-balance">
              Why Zest Exists
            </h3>
            <p className="text-[14px] text-apple-secondary mt-1">
              Engineered from bare-metal macOS subsystems to keep your hands on the home row without stealing window focus.
            </p>
          </div>
          <span className="text-[13px] font-medium text-apple-secondary">
            Zero Electron Bloat
          </span>
        </div>

        {/* The Raw Comparison Table */}
        <div className="apple-card rounded-2xl overflow-hidden border border-[var(--separator)] mb-14 shadow-apple-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13px] sm:text-[14px]">
              <thead>
                <tr className="bg-black/[0.02] dark:bg-white/[0.02] border-b border-[var(--separator)]">
                  <th className="py-3.5 px-4 sm:px-6 font-semibold text-apple-label">Capability</th>
                  <th className="py-3.5 px-4 sm:px-6 font-semibold text-apple-secondary">Generic Clipboard Tools</th>
                  <th className="py-3.5 px-4 sm:px-6 font-bold text-apple-tint bg-apple-tint/[0.04]">Zest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--separator)]">
                {comparisonRows.map((row) => (
                  <tr key={row.dimension} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors">
                    <td className="py-3 px-4 sm:px-6 font-medium text-apple-label">
                      {row.dimension}
                    </td>
                    <td className="py-3 px-4 sm:px-6 text-apple-secondary">
                      {row.bloated}
                    </td>
                    <td className="py-3 px-4 sm:px-6 font-semibold text-apple-label bg-apple-tint/[0.04]">
                      {row.zest}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* The 4 Architectural Secrets */}
        <div>
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-apple-label tracking-tight">
              The 4 Bare-Metal Engineering Secrets
            </h3>
            <p className="text-[13px] sm:text-[14px] text-apple-secondary mt-1">
              How Zest achieves sub-millisecond execution while remaining entirely invisible to your battery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {engineeringSecrets.map((secret) => (
              <div key={secret.num} className="apple-card p-5 sm:p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-sm font-bold text-apple-tertiary">
                      {secret.num}
                    </span>
                    <span className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-apple-secondary">
                      {secret.tech}
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-apple-label mb-2">
                    {secret.title}
                  </h4>
                  <p className="text-[13px] text-apple-secondary leading-relaxed">
                    {secret.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
