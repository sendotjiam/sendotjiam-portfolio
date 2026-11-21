import { spokenLanguages, programmingLanguages } from '@/data/languages';

export default function Languages() {
  return (
    <section
      id="languages"
      className="min-h-[100dvh] w-full py-16 flex flex-col justify-center border-t border-[var(--separator)] scroll-mt-16"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-8">
        <div>
          <h2 className="text-[13px] font-semibold text-apple-secondary">
            Languages &amp; Code
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-label mt-1 text-balance">
            Linguistic &amp; Technical Fluency
          </h3>
        </div>
        <span className="text-[13px] font-medium text-apple-secondary">
          Global Communication &amp; Code Syntax
        </span>
      </div>

      {/* Bento Grid: Spoken Languages (Left) & Programming Languages (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full">
        {/* Left Bento: Spoken Languages (5 cols on lg) */}
        <div className="lg:col-span-5 apple-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[var(--teal)]">
              <svg
                aria-hidden="true"
                className="w-4 h-4 stroke-current stroke-2 fill-none"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              <h4 className="text-[17px] font-bold text-apple-label">
                Spoken Languages
              </h4>
            </div>

            <p className="text-[14px] text-apple-secondary leading-relaxed">
              Multilingual communication across global engineering teams and international markets.
            </p>
          </div>

          {/* Spoken Language List */}
          <div className="flex flex-col gap-3.5 divide-y divide-[var(--separator)]">
            {spokenLanguages.map((lang, idx) => (
              <div
                key={lang.name}
                className={`flex flex-col gap-1.5 ${idx > 0 ? 'pt-3.5' : ''}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[15px] font-semibold text-apple-label">
                      {lang.name}
                    </span>
                    <span className="text-[12px] font-medium text-apple-tertiary">
                      {lang.nativeName}
                    </span>
                  </div>

                  {lang.status === 'fluent' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[var(--teal-soft)] text-[var(--teal)] border border-[var(--teal-border)] shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)]" />
                      {lang.proficiency}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[var(--shuiro-soft)] text-[var(--shuiro)] border border-[var(--shuiro-border)] shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--shuiro)]" />
                      {lang.proficiency}
                    </span>
                  )}
                </div>

                {lang.desc && (
                  <p className="text-[13px] text-apple-secondary leading-snug">
                    {lang.desc}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[var(--separator)] flex items-center justify-between text-[12px] text-apple-secondary">
            <span>4 Languages</span>
            <span>Southeast Asia &amp; East Asia Focus</span>
          </div>
        </div>

        {/* Right Bento: Programming Languages (7 cols on lg) */}
        <div className="lg:col-span-7 apple-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[var(--tint)]">
              <svg
                aria-hidden="true"
                className="w-4 h-4 stroke-current stroke-2 fill-none"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              <h4 className="text-[17px] font-bold text-apple-label">
                Programming Languages
              </h4>
            </div>

            <p className="text-[14px] text-apple-secondary leading-relaxed">
              Core programming languages used to architect iOS production apps, fullstack web systems, and tooling.
            </p>
          </div>

          {/* Programming Languages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {programmingLanguages.map((plang) => {
              const isPrimary = plang.proficiency === 'Primary';
              return (
                <div
                  key={plang.name}
                  className={`p-3.5 rounded-xl border transition-colors flex flex-col justify-between gap-2 ${
                    isPrimary
                      ? 'bg-[var(--tint-soft)]/40 border-[var(--tint-border)]'
                      : 'bg-black/[0.02] dark:bg-white/[0.03] border-[var(--separator)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-[14px] font-bold text-apple-label truncate">
                        {plang.name}
                      </span>
                      {isPrimary && (
                        <span className="px-1.5 py-0.5 rounded text-[11px] font-medium bg-[var(--shuiro-soft)] text-[var(--shuiro)] border border-[var(--shuiro-border)]">
                          Core
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] font-medium text-apple-tertiary px-2 py-0.5 rounded-md bg-black/[0.03] dark:bg-white/[0.06] shrink-0">
                      {plang.category}
                    </span>
                  </div>

                  <p className="text-[12px] text-apple-secondary leading-snug">
                    {plang.role}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[var(--separator)] flex flex-wrap items-center justify-between gap-2 text-[12px] text-apple-secondary">
            <span>Specialized in Native Mobile and Fullstack Web</span>
            <span className="text-[12px] text-apple-secondary">Swift, TypeScript, Python</span>
          </div>
        </div>
      </div>
    </section>
  );
}
