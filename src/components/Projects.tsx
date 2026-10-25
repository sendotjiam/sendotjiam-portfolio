import Image from 'next/image';
import { projects } from '@/data/projects';

export default function Projects() {
  return (
    <section className="w-full pt-16 pb-12" id="projects">
      {/* Header */}
      <div className="flex items-center justify-between gap-space-md mb-8">
        <div className="flex items-center gap-space-sm">
          <span className="font-mono-label text-mono-label text-primary dark:text-sky-400 font-semibold tracking-wider">
            02 / SELECTED WORK
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
          <h2 className="font-headline-lg text-headline-lg text-slate-900 dark:text-white font-bold">
            Featured Projects
          </h2>
        </div>

        <a
          className="font-mono-label text-mono-label text-primary dark:text-sky-400 hover:text-blue-700 dark:hover:text-sky-300 transition-colors hidden sm:inline-flex items-center gap-1 font-semibold"
          href="https://github.com/sendotjiam"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span>VIEW ALL REPOS</span>
          <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
        </a>
      </div>

      {/* 2-Column Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all duration-200"
          >
            <div className="flex flex-col gap-3">
              {/* Card Top: Logo / Icon & Badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="w-11 h-11 rounded-lg overflow-hidden border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center bg-blue-50/50 dark:bg-slate-800 shrink-0 group-hover:scale-105 transition-transform relative shadow-sm">
                  {proj.logo ? (
                    <Image
                      src={proj.logo}
                      alt={`${proj.title} icon`}
                      width={44}
                      height={44}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-primary text-[22px]">widgets</span>
                  )}
                </div>

                {proj.badge && (
                  <span
                    className={`font-mono-label text-mono-label px-2.5 py-1 rounded-full border ${
                      proj.badgeType === 'accent'
                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-primary dark:text-sky-400 font-medium'
                        : proj.badgeType === 'highlight'
                        ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 font-medium flex items-center gap-1'
                        : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {proj.stars && (
                      <span className="material-symbols-outlined text-[13px] text-amber-500">star</span>
                    )}
                    <span>{proj.badge}</span>
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div className="flex flex-col gap-1.5 mt-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-headline-sm text-headline-sm text-slate-900 dark:text-white font-semibold group-hover:text-primary dark:group-hover:text-sky-400 transition-colors">
                    {proj.title}
                  </h3>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${proj.title}`}
                      className="text-slate-400 group-hover:text-primary dark:group-hover:text-sky-400 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                    </a>
                  )}
                </div>
                <p className="font-body-md text-body-md text-slate-600 dark:text-slate-300 leading-relaxed">
                  {proj.desc}
                </p>
              </div>
            </div>

            {/* Bottom: Tech Tags */}
            <div className="pt-4 mt-3 flex flex-wrap gap-1.5 border-t border-slate-100 dark:border-slate-800/80">
              {proj.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono-label text-mono-label text-slate-700 dark:text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
