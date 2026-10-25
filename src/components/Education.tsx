import Image from 'next/image';
import { education } from '@/data/education';

export default function Education() {
  return (
    <section className="w-full pt-16 pb-12" id="education">
      {/* Header */}
      <div className="flex items-center justify-between gap-space-md mb-8">
        <div className="flex items-center gap-space-sm">
          <span className="font-mono-label text-mono-label text-primary dark:text-sky-400 font-semibold tracking-wider">
            04 / EDUCATION
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
          <h2 className="font-headline-lg text-headline-lg text-slate-900 dark:text-white font-bold">
            Education &amp; Training
          </h2>
        </div>
        <span className="font-mono-label text-mono-label text-slate-400 dark:text-slate-500 hidden sm:inline-block">
          ACADEMIC &amp; BOOTCAMPS
        </span>
      </div>

      {/* Grid of Education Records */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {education.map((item) => (
          <div
            key={item.id}
            className="p-6 sm:p-7 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-4"
          >
            <div className="flex flex-col gap-3">
              {/* Institution Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 flex items-center justify-center bg-slate-50 dark:bg-slate-800 shrink-0 shadow-sm relative">
                    <Image
                      src={item.logo}
                      alt={`${item.institution} logo`}
                      width={44}
                      height={44}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-headline-sm text-headline-sm text-slate-900 dark:text-white font-bold">
                      {item.degree}
                    </h3>
                    <p className="font-body-sm text-body-sm text-slate-500 dark:text-slate-400 mt-0.5">
                      {item.institution}
                    </p>
                  </div>
                </div>
              </div>

              {/* Meta row: Date & GPA */}
              <div className="flex items-center gap-2 flex-wrap pt-1 font-mono-label text-mono-label">
                <span className="px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold">
                  {item.date}
                </span>
                {item.gpa && (
                  <span className="px-2.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 font-semibold">
                    GPA {item.gpa}
                  </span>
                )}
              </div>

              {/* Descriptions */}
              <ul className="flex flex-col gap-2 font-body-md text-body-md text-slate-600 dark:text-slate-300 pt-1">
                {item.desc.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[16px] text-slate-400 dark:text-slate-500 shrink-0 mt-1">
                      school
                    </span>
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom skills pills */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-1.5">
              {item.skills.map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono-label text-mono-label text-slate-700 dark:text-slate-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
