import Image from 'next/image';
import { projects } from '@/data/projects';

export default function Projects() {
  return (
    <section id="projects" className="w-full py-10 border-t border-[var(--separator)] scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-8">
        <div>
          <h2 className="text-[14px] font-semibold text-apple-secondary">
            Selected Work
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-label mt-1 text-balance">
            Featured Projects
          </h3>
        </div>

        <a
          href="https://github.com/sendotjiam"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-apple-tint hover:underline transition-colors mt-2 sm:mt-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded"
        >
          <span>View all repositories</span>
          <svg aria-hidden="true" className="w-3.5 h-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>
      </div>

      {/* 2-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="apple-card group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl"
          >
            <div className="flex flex-col gap-3.5">
              {/* Card Top: Logo / Icon & Badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="w-12 h-12 rounded-[22%] overflow-hidden bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 shrink-0 shadow-apple-sm relative transition-transform duration-200 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none">
                  {proj.logo ? (
                    <Image
                      src={proj.logo}
                      alt={`${proj.title} icon`}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-apple-tint font-bold text-base">
                      {proj.title.charAt(0)}
                    </div>
                  )}
                </div>

                {proj.badge && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/[0.04] dark:bg-white/[0.08] text-apple-secondary border border-[var(--separator)]">
                    {proj.badge}
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-[17px] font-bold text-apple-label group-hover:text-apple-tint transition-colors">
                    {proj.title}
                  </h4>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${proj.title}`}
                      className="text-apple-secondary hover:text-apple-tint transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded"
                    >
                      <svg aria-hidden="true" className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </a>
                  )}
                </div>
                <p className="text-[14px] text-apple-secondary leading-relaxed">
                  {proj.desc}
                </p>
              </div>
            </div>

            {/* Bottom Tech Tags */}
            <div className="pt-4 mt-3 flex flex-wrap gap-1.5 border-t border-[var(--separator)]">
              {proj.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-0.5 rounded-md bg-black/[0.03] dark:bg-white/[0.05] text-[12px] font-medium text-apple-secondary"
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
