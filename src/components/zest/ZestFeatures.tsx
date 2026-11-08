export default function ZestFeatures() {
  const features = [
    {
      id: 'instant-paste',
      title: '1-Tap Hardware-Speed Pasting',
      badge: 'Core Mechanic',
      desc: 'Summon adjacent to your cursor with ⌘⇧V, then tap a single digit (1-9, 0) to inject. No arrow keys, no enter key, zero mouse movement.',
      chips: ['⌘⇧V Summon', 'Digits 1-9', 'Digit 0 (#10)', 'Esc Dismiss'],
      icon: (
        <svg aria-hidden="true" className="w-6 h-6 text-apple-tint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: 'pinned-snippets',
      title: 'Hardware Pinned Snippets',
      badge: '⌥1 to ⌥9',
      desc: 'Pin your most repetitive tokens, database URLs, and command flags. Dedicated ⌥1 through ⌥9 shortcuts allow instant pasting without browsing history.',
      chips: ['⌥1-⌥9 Hotkeys', 'Exempt from Pruning', 'Boilerplate Ready'],
      icon: (
        <svg aria-hidden="true" className="w-6 h-6 text-apple-tint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      ),
    },
    {
      id: 'classifier',
      title: 'Real-Time Content Classifier',
      badge: 'Microsecond Detection',
      desc: 'Zest inspects string structure in sub-microseconds without regex bottlenecks, badging clips with syntax tags for instant visual recognition.',
      chips: ['[JSON]', '[SQL]', '[TS]', '[PY]', '[GO]', '[RS]', '[URL]', '[HEX]', '[IMG]'],
      icon: (
        <svg aria-hidden="true" className="w-6 h-6 text-apple-tint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
    },
    {
      id: 'transform-deck',
      title: 'In-Flight Transform Deck',
      badge: 'Tab Key',
      desc: 'Tap Tab on any clip to transform data in-flight before pasting. Pure Swift, offline string manipulation without messy browser converter tools.',
      chips: ['JSON Prettify / Minify', 'Case Cycling (camel, snake, kebab)', 'Base64 / URL', 'Strip HTML/Markdown'],
      icon: (
        <svg aria-hidden="true" className="w-6 h-6 text-apple-tint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
    {
      id: 'screen-ocr',
      title: 'Screen Text Snip OCR',
      badge: '⌘ + ⇧ + 2',
      desc: 'Drag a selection marquee over error modals, locked PDFs, video streams, or design canvases. Apple Vision extracts text on Apple Neural Engine in milliseconds.',
      chips: ['Apple Vision API', 'Neural Engine Accelerated', 'Instant Ingestion'],
      icon: (
        <svg aria-hidden="true" className="w-6 h-6 text-apple-tint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: 'security',
      title: 'Zero-Compromise Security',
      badge: '100% On-Device',
      desc: 'Zero network permissions, zero telemetry, and zero cloud sync. Automatically detects ConcealedType flags to drop 1Password and Apple Keychain passwords.',
      chips: ['ConcealedType Dropping', 'App Blacklist', 'RAM-Only Ephemeral Mode', 'Zero Telemetry'],
      icon: (
        <svg aria-hidden="true" className="w-6 h-6 text-apple-tint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-20 border-t border-[var(--separator)]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-6">
          <div>
            <h2 className="text-[14px] font-semibold text-apple-secondary flex items-center gap-1.5">
              <span className="font-mono text-[12px] font-bold text-[var(--shuiro)]">03</span>
              <span>Capabilities</span>
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-label mt-1 text-balance">
              Complete Feature Set
            </h3>
            <p className="text-[14px] text-apple-secondary mt-1">
              Every feature earned its place by removing developer friction and preserving extreme battery efficiency.
            </p>
          </div>
          <span className="text-[13px] font-medium text-apple-secondary">
            6 Core Modules
          </span>
        </div>

        {/* Feature Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.id}
              className="apple-card p-6 rounded-2xl flex flex-col justify-between motion-safe:hover:-translate-y-0.5 transition-transform duration-200 motion-reduce:transform-none"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-apple-tint/10 flex items-center justify-center">
                    {f.icon}
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-apple-secondary">
                    {f.badge}
                  </span>
                </div>

                <h3 className="text-[17px] font-bold text-apple-label mb-2">
                  {f.title}
                </h3>
                <p className="text-[13px] text-apple-secondary leading-relaxed">
                  {f.desc}
                </p>
              </div>

              {/* Tag Chips */}
              <div className="pt-4 mt-4 flex flex-wrap gap-1.5 border-t border-[var(--separator)]">
                {f.chips.map((chip) => (
                  <span
                    key={chip}
                    className="px-2 py-0.5 rounded-md bg-black/[0.03] dark:bg-white/[0.05] text-[11px] font-mono text-apple-tertiary"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
