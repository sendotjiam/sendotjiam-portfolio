'use client';

import Image from 'next/image';
import { projects } from '@/data/projects';

export default function AppShelf() {
  return (
    <div className="w-full my-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[13px] font-semibold text-apple-secondary uppercase tracking-wider">
            Shipped Applications
          </h2>
          <p className="text-[14px] text-apple-label font-medium mt-0.5">
            Production iOS systems scaled for millions of active users
          </p>
        </div>
        <span className="hidden sm:inline-flex text-[12px] text-apple-secondary font-medium">
          Scroll to explore →
        </span>
      </div>

      {/* Snap Scrolling Container */}
      <div className="app-shelf-scroll flex gap-4 overflow-x-auto pb-4 pt-1 -mx-5 px-5 sm:-mx-8 sm:px-8">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.link || '#'}
            target={project.link ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="apple-card group snap-start shrink-0 w-[285px] sm:w-[320px] p-5 rounded-2xl flex flex-col justify-between apple-btn-active"
          >
            <div>
              {/* Header: App Icon + Category Badge */}
              <div className="flex items-start justify-between gap-3 mb-3.5">
                <div className="w-14 h-14 rounded-[22%] overflow-hidden bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 shrink-0 shadow-apple-sm relative group-hover:scale-105 transition-transform duration-200">
                  {project.logo ? (
                    <Image
                      src={project.logo}
                      alt={`${project.title} icon`}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-apple-tint font-bold text-lg">
                      {project.title.charAt(0)}
                    </div>
                  )}
                </div>

                {project.badge && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/[0.04] dark:bg-white/[0.08] text-apple-secondary border border-[var(--separator)]">
                    {project.badge}
                  </span>
                )}
              </div>

              {/* Title & Category */}
              <div className="mb-2">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-[16px] font-semibold text-apple-label group-hover:text-apple-tint transition-colors">
                    {project.title}
                  </h3>
                  <svg
                    className="w-3.5 h-3.5 text-apple-tertiary group-hover:text-apple-tint transition-colors shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
                <p className="text-[12px] text-apple-secondary font-medium">
                  {project.category}
                </p>
              </div>

              {/* Description */}
              <p className="text-[13px] text-apple-secondary leading-relaxed line-clamp-3">
                {project.desc}
              </p>
            </div>

            {/* Footer Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-[var(--separator)]">
              {project.tech.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-black/[0.03] dark:bg-white/[0.05] text-apple-label"
                >
                  {t}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="px-1.5 py-0.5 rounded-md text-[11px] text-apple-tertiary font-medium">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
