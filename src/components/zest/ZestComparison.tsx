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

        {/* Mobile Comparison Cards (Eliminates horizontal clipping on mobile screens) */}
        <div className="sm:hidden flex flex-col gap-3">
          {comparisonRows.map((row) => (
            <div
              key={row.dimension}
              className="apple-card p-3.5 rounded-xl flex flex-col gap-2"
            >
              <div className="font-semibold text-apple-label text-[13px] border-b border-[var(--separator)] pb-1.5 flex items-center justify-between">
                <span>{row.dimension}</span>
                <span className="text-[10px] font-sans font-bold text-apple-tint bg-apple-tint/10 px-1.5 py-0.5 rounded border border-apple-tint/20">
                  Advantaged
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[12px]">
                <div className="p-2 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-[var(--separator)] flex flex-col justify-between">
                  <span className="text-[10px] font-medium text-apple-tertiary block mb-1">Generic Tools</span>
                  <span className="text-apple-secondary leading-snug">{row.bloated}</span>
                </div>
                <div className="p-2 rounded-lg bg-apple-tint/[0.06] border border-apple-tint/20 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-apple-tint block mb-1">Zest</span>
                  <span className="text-apple-label font-medium leading-snug">{row.zest}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop / Tablet Comparison Table */}
        <div className="hidden sm:block apple-card rounded-2xl overflow-hidden border border-[var(--separator)] shadow-apple-sm">
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
      </div>
    </section>
  );
}
