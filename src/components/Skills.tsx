import { skillDomains } from '@/data/skills';

export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-[100dvh] w-full py-16 flex flex-col justify-center border-t border-[var(--separator)] scroll-mt-16"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-8">
        <div>
          <h2 className="text-[13px] font-semibold text-apple-secondary">
            Capabilities
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-label mt-1 text-balance">
            Systems Architecture &amp; Engineering
          </h3>
        </div>
        <span className="text-[13px] font-medium text-apple-secondary">
          iOS Systems &amp; Applied AI
        </span>
      </div>

      {/* Systems Architecture Matrix (Xcode-inspired Inspector Layout) */}
      <div className="w-full rounded-2xl border border-[var(--separator)] bg-apple-card shadow-apple-sm overflow-hidden divide-y divide-[var(--separator)]">
        {/* Matrix Header Bar */}
        <div className="px-5 py-3 bg-black/[0.02] dark:bg-white/[0.02] flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-apple-secondary">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--teal)]" aria-hidden="true" />
            <span className="font-semibold text-apple-label">SUBSYSTEM_INSPECTOR</span>
            <span className="text-apple-tertiary">/</span>
            <span>5 SPECIALIZED DOMAINS</span>
          </div>
          <div className="flex items-center gap-3">
            <span>TARGET: iOS 16–18+</span>
            <span className="text-apple-tertiary">·</span>
            <span>PARADIGM: SWIFT 6 DATA RACE SAFETY</span>
          </div>
        </div>

        {/* Domain Rows */}
        <div className="divide-y divide-[var(--separator)]">
          {skillDomains.map((domain, index) => {
            const isHighlighted = domain.id === 'runtime';
            return (
              <div
                key={domain.id}
                className={`p-5 sm:p-6 transition-colors duration-150 ${
                  isHighlighted ? 'bg-[var(--teal-soft)]/20' : 'hover:bg-black/[0.015] dark:hover:bg-white/[0.015]'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                  {/* Left Column: Domain Tag, Title & Description (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[11px] font-mono font-semibold tracking-wider text-[var(--shuiro)]">
                        {domain.tag}
                      </span>
                      <span className="text-apple-tertiary text-[11px]">•</span>
                      <span className="text-[12px] font-medium text-apple-secondary">
                        {domain.subtitle}
                      </span>
                    </div>

                    <h4 className="text-[18px] sm:text-[19px] font-bold text-apple-label tracking-tight">
                      {domain.title}
                    </h4>

                    <p className="text-[13.5px] sm:text-[14px] text-apple-secondary leading-relaxed">
                      {domain.description}
                    </p>

                    {/* Production Focus Line */}
                    <div className="mt-1 flex items-center gap-2 text-[12px] text-apple-secondary">
                      <span className="font-semibold text-apple-label">Focus:</span>
                      <span className="font-mono text-[11.5px] text-[var(--teal)]">
                        {domain.productionFocus}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Core Competency Pills (5 cols) */}
                  <div className="lg:col-span-5 flex flex-wrap gap-1.5 pt-1 lg:pt-0 lg:justify-end">
                    {domain.coreCompetencies.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md text-[12px] font-medium bg-black/[0.03] dark:bg-white/[0.05] border border-[var(--separator)] text-apple-label transition-colors hover:border-[var(--teal-border)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Matrix Footer / Summary Dateline */}
        <div className="px-5 py-3.5 bg-black/[0.02] dark:bg-white/[0.02] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[12px] text-apple-secondary">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-apple-label">Architecture Core:</span>
            <span>Modular SPM, TCA &amp; Clean Architecture with zero external runtime bloat</span>
          </div>
          <span className="font-mono text-[11px] text-apple-tertiary">
            AUDITED: STRICT TYPING &amp; A11Y AA
          </span>
        </div>
      </div>
    </section>
  );
}
