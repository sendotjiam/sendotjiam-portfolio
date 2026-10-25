import { skillCategories } from '@/data/skills';

export default function Skills() {
  return (
    <section className="w-full pt-16 pb-12" id="skills">
      {/* Header */}
      <div className="flex items-center justify-between gap-space-md mb-8">
        <div className="flex items-center gap-space-sm">
          <span className="font-mono-label text-mono-label text-primary dark:text-sky-400 font-semibold tracking-wider">
            03 / SKILLS
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
          <h2 className="font-headline-lg text-headline-lg text-slate-900 dark:text-white font-bold">
            Technical Expertise
          </h2>
        </div>
        <span className="font-mono-label text-mono-label text-slate-400 dark:text-slate-500 hidden sm:inline-block">
          IOS &amp; RUNTIME
        </span>
      </div>

      {/* 2x2 Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {skillCategories.map((cat) => (
          <div
            key={cat.title}
            className="p-6 sm:p-7 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all duration-200 flex flex-col gap-3.5"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-primary dark:text-sky-400 text-[22px]">
                {cat.icon}
              </span>
              <h3 className="font-headline-sm text-headline-sm text-slate-900 dark:text-white font-semibold">
                {cat.title}
              </h3>
            </div>

            <p className="font-body-sm text-body-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {cat.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {cat.skills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-mono-label text-mono-label"
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
