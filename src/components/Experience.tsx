'use client';

import React from 'react';
import Image from 'next/image';
import { experiences } from '@/data/experiences';

// Helper to format bold markdown syntax (**text**) with custom styled highlight spans
function renderHighlightedText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong
          key={i}
          className="font-semibold text-apple-label bg-apple-tint/[0.08] dark:bg-apple-tint/[0.15] text-apple-tint dark:text-sky-300 px-1 py-0.5 rounded"
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

export default function Experience() {
  return (
    <section id="experience" className="w-full py-10 border-t border-[var(--separator)] scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-8">
        <div>
          <h2 className="text-[14px] font-semibold text-apple-secondary">
            Career
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-label mt-1 text-balance">
            Experience
          </h3>
        </div>
        <span className="text-[13px] font-medium text-apple-secondary">
          2021 — Present (3+ Years)
        </span>
      </div>

      {/* Experience Cards Stack */}
      <div className="flex flex-col gap-5">
        {experiences.map((exp, index) => {
          const isCurrent = index === 0;
          const primaryBullets = exp.desc.slice(0, 3);
          const extraBullets = exp.desc.slice(3);

          return (
            <div
              key={`${exp.company}-${exp.date}`}
              className="apple-card p-6 sm:p-7 rounded-2xl flex flex-col gap-4"
            >
              {/* Header: Logo, Company, Title, Date */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-[var(--separator)]">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 shrink-0 shadow-apple-sm relative">
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-[17px] font-bold text-apple-label">
                        {exp.company}
                      </h4>
                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-[14px] text-apple-tint font-medium">
                      {exp.jobTitle}
                    </p>
                  </div>
                </div>

                <div className="text-[12px] sm:text-[13px] font-medium text-apple-secondary">
                  {exp.date}
                </div>
              </div>

              {/* Responsibilities & Achievements */}
              <ul className="flex flex-col gap-2.5 pl-1">
                {primaryBullets.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-[14px] sm:text-[15px] text-apple-secondary leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-apple-tint shrink-0 mt-2"></span>
                    <span className="text-apple-label/90">{renderHighlightedText(item)}</span>
                  </li>
                ))}
              </ul>

              {/* Expandable Extra Bullets (Progressive Disclosure) */}
              {extraBullets.length > 0 && (
                <details className="group">
                  <summary className="text-[13px] font-medium text-apple-tint hover:underline cursor-pointer list-none flex items-center gap-1 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded">
                    <span className="group-open:hidden">Show {extraBullets.length} more highlights ↓</span>
                    <span className="hidden group-open:inline">Show fewer highlights ↑</span>
                  </summary>
                  <ul className="flex flex-col gap-2.5 pl-1 pt-3 mt-1">
                    {extraBullets.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-[14px] sm:text-[15px] text-apple-secondary leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-apple-tint shrink-0 mt-2"></span>
                        <span className="text-apple-label/90">{renderHighlightedText(item)}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              )}

              {/* Tech Stack & App Store link */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[var(--separator)]">
                <div className="flex flex-wrap gap-1.5">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-[12px] font-medium bg-black/[0.04] dark:bg-white/[0.06] text-apple-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {exp.appStoreLink && (
                  <a
                    href={exp.appStoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[13px] font-semibold text-apple-tint hover:underline shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded"
                  >
                    <span>View on App Store</span>
                    <svg aria-hidden="true" className="w-3.5 h-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
