'use client';

import React from 'react';
import Image from 'next/image';
import { experiences, ExperienceItem } from '@/data/experiences';

// Helper to format bold markdown syntax (**text**) with clean Cobalt Blue highlight spans
function renderHighlightedText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong
          key={i}
          className="font-semibold bg-[var(--tint-soft)] text-[var(--tint)] px-1.5 py-0.5 rounded"
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

function ExperienceCard({
  exp,
  isCurrent,
  compact = false,
}: {
  exp: ExperienceItem;
  isCurrent: boolean;
  compact?: boolean;
}) {
  const initialCount = compact ? 1 : 2;
  const primaryBullets = exp.desc.slice(0, initialCount);
  const extraBullets = exp.desc.slice(initialCount);
  const visibleTech = compact ? exp.tech.slice(0, 4) : exp.tech.slice(0, 6);
  const hiddenTechCount = Math.max(0, exp.tech.length - visibleTech.length);

  return (
    <div
      className={`apple-card rounded-2xl flex flex-col justify-between gap-3.5 ${
        compact ? 'p-4 sm:p-5' : 'p-5 sm:p-6'
      }`}
    >
      <div className="flex flex-col gap-3">
        {/* Header: Logo, Company, Title, Date */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-[var(--separator)]">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`${
                compact ? 'w-10 h-10' : 'w-11 h-11'
              } rounded-xl overflow-hidden bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 shrink-0 shadow-apple-sm relative`}
            >
              <Image
                src={exp.logo}
                alt={`${exp.company} logo`}
                width={44}
                height={44}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4
                  className={`${
                    compact ? 'text-[15px]' : 'text-[16px] sm:text-[17px]'
                  } font-bold text-apple-label leading-snug`}
                >
                  {exp.company}
                </h4>
                {isCurrent && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[var(--teal-soft)] text-[var(--teal)] border border-[var(--teal-border)]">
                    Current
                  </span>
                )}
              </div>
              <p className="text-[13px] text-[var(--tint)] font-medium leading-snug">
                {exp.jobTitle}
              </p>
              <span className="text-[11px] font-medium text-apple-secondary block mt-0.5">
                {exp.date}
              </span>
            </div>
          </div>

          {exp.appStoreLink && (
            <a
              href={exp.appStoreLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${exp.company} app on App Store`}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/[0.03] dark:bg-white/[0.06] hover:bg-[var(--tint-soft)] text-[11px] font-semibold text-[var(--tint)] shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tint)]"
            >
              <span>App Store</span>
            </a>
          )}
        </div>

        {/* Responsibilities & Achievements */}
        <ul className="flex flex-col gap-2 pl-0.5">
          {primaryBullets.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-[13px] sm:text-[14px] text-apple-secondary leading-relaxed"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] shrink-0 mt-2"></span>
              <span className="text-apple-label/90">{renderHighlightedText(item)}</span>
            </li>
          ))}
        </ul>

        {/* Expandable Extra Bullets (Progressive Disclosure) */}
        {extraBullets.length > 0 && (
          <details className="group">
            <summary className="text-[12px] font-medium text-[var(--tint)] hover:underline cursor-pointer list-none flex items-center gap-1 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tint)] rounded">
              <span className="group-open:hidden">
                Show {extraBullets.length} more {extraBullets.length === 1 ? 'highlight' : 'highlights'}
              </span>
              <span className="hidden group-open:inline">Show fewer highlights</span>
            </summary>
            <ul className="flex flex-col gap-2 pl-0.5 pt-2.5 mt-1">
              {extraBullets.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-[13px] sm:text-[14px] text-apple-secondary leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] shrink-0 mt-2"></span>
                  <span className="text-apple-label/90">{renderHighlightedText(item)}</span>
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>

      {/* Tech Stack Pills */}
      <div className="flex flex-wrap items-center gap-1.5 pt-2.5 border-t border-[var(--separator)]">
        {visibleTech.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-black/[0.04] dark:bg-white/[0.06] text-apple-secondary"
          >
            {t}
          </span>
        ))}
        {hiddenTechCount > 0 && (
          <span className="px-1.5 py-0.5 rounded-md text-[11px] font-medium text-apple-tertiary">
            +{hiddenTechCount}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Experience() {
  const featuredRoles = experiences.slice(0, 2);
  const internshipRoles = experiences.slice(2);

  return (
    <section
      id="experience"
      className="min-h-[100dvh] w-full py-16 flex flex-col justify-center border-t border-[var(--separator)] scroll-mt-16"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-6">
        <div>
          <h2 className="text-[14px] font-semibold text-apple-secondary flex items-center gap-1.5">
            <span className="font-mono text-[12px] font-bold text-[var(--shuiro)]">02</span>
            <span>Career</span>
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-label mt-1 text-balance">
            Experience
          </h3>
        </div>
        <span className="text-[13px] font-medium text-apple-secondary">
          2021 to Present (3+ Years)
        </span>
      </div>

      {/* Tier 1: Core Full-Time Engineering Roles (2-Column Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        {featuredRoles.map((exp, index) => (
          <ExperienceCard
            key={`${exp.company}-${exp.date}`}
            exp={exp}
            isCurrent={index === 0}
            compact={false}
          />
        ))}
      </div>

      {/* Tier 2: Early Career & Internships (Compact 3-Column Row) */}
      {internshipRoles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-4">
          {internshipRoles.map((exp) => (
            <ExperienceCard
              key={`${exp.company}-${exp.date}`}
              exp={exp}
              isCurrent={false}
              compact={true}
            />
          ))}
        </div>
      )}
    </section>
  );
}
