import Image from 'next/image';
import { education } from '@/data/education';

export default function Education() {
  return (
    <section id="education" className="w-full py-10 border-t border-[var(--separator)]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-8">
        <div>
          <h2 className="text-[13px] font-semibold text-apple-secondary uppercase tracking-wider">
            Background
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-label mt-1">
            Education &amp; Fellowships
          </h3>
        </div>
        <span className="text-[13px] font-medium text-apple-secondary">
          Academic Honors &amp; Bootcamps
        </span>
      </div>

      {/* Grid of Education Records */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {education.map((item, idx) => {
          const isFullWidth = idx === 0; // Bachelor Degree gets top priority full width or standard 2-col
          return (
            <div
              key={item.id}
              className={`liquid-glass-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between gap-4 ${
                isFullWidth ? 'md:col-span-2' : ''
              }`}
            >
              <div className="flex flex-col gap-3.5">
                {/* Institution Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 shrink-0 shadow-apple-sm relative">
                      <Image
                        src={item.logo}
                        alt={`${item.institution} logo`}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-[17px] font-bold text-apple-label">
                        {item.degree}
                      </h4>
                      <p className="text-[14px] text-apple-secondary mt-0.5">
                        {item.institution}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Meta row: Date & GPA */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[12px] font-medium text-apple-secondary">
                    {item.date}
                  </span>
                  {item.gpa && (
                    <>
                      <span className="text-apple-secondary text-xs">•</span>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        GPA {item.gpa} (Honors)
                      </span>
                    </>
                  )}
                </div>

                {/* Descriptions */}
                <ul className="flex flex-col gap-2 pl-1">
                  {item.desc.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex items-start gap-2.5 text-[14px] text-apple-secondary leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-apple-tint shrink-0 mt-2"></span>
                      <span className="text-apple-label/90">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Skills Pills */}
              <div className="pt-3 border-t border-[var(--separator)] flex flex-wrap gap-1.5">
                {item.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-0.5 rounded-md bg-black/[0.03] dark:bg-white/[0.05] text-[12px] font-medium text-apple-secondary"
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
