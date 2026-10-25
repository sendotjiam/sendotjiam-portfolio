import { skillCategories } from '@/data/skills';

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'code':
      return (
        <svg className="w-5 h-5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case 'layers':
      return (
        <svg className="w-5 h-5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    case 'architecture':
      return (
        <svg className="w-5 h-5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <rect width="8" height="8" x="3" y="3" rx="2" />
          <path d="M7 11v4a2 2 0 0 0 2 2h4" />
          <rect width="8" height="8" x="13" y="13" rx="2" />
        </svg>
      );
    case 'construction':
      return (
        <svg className="w-5 h-5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case 'smart_toy':
    default:
      return (
        <svg className="w-5 h-5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      );
  }
};

export default function Skills() {
  return (
    <section id="skills" className="w-full py-10 border-t border-[var(--separator)]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-8">
        <div>
          <h2 className="text-[13px] font-semibold text-apple-secondary uppercase tracking-wider">
            Capabilities
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-label mt-1">
            Technical Expertise
          </h3>
        </div>
        <span className="text-[13px] font-medium text-apple-secondary">
          iOS Systems &amp; Concurrency
        </span>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {skillCategories.map((cat, idx) => {
          const isFullWidth = idx === 4; // AI Engineering card spans across both columns nicely
          return (
            <div
              key={cat.title}
              className={`liquid-glass-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between gap-3.5 ${
                isFullWidth ? 'md:col-span-2' : ''
              }`}
            >
              <div>
                <div className="flex items-center gap-2.5 mb-1.5 text-apple-tint">
                  {getCategoryIcon(cat.icon)}
                  <h4 className="text-[17px] font-bold text-apple-label">
                    {cat.title}
                  </h4>
                </div>

                <p className="text-[14px] text-apple-secondary leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--separator)]">
                {cat.skills.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 rounded-lg bg-black/[0.03] dark:bg-white/[0.05] text-[13px] font-medium text-apple-label"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
