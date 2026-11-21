'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { projects, type ProjectItem } from '@/data/projects';

interface RecentProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RecentProjectsModal({ isOpen, onClose }: RecentProjectsModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter indie/personal projects and prioritize interactive showcases
  const indieProjects: ProjectItem[] = projects
    .filter((p) => p.track === 'personal')
    .sort((a, b) => (b.detailUrl ? 1 : 0) - (a.detailUrl ? 1 : 0));

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on open
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="recent-projects-title"
      aria-describedby="recent-projects-desc"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-md transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Surface */}
      <div
        ref={dialogRef}
        className="relative w-full max-w-3xl max-h-[calc(100dvh-2rem)] sm:max-h-[88dvh] flex flex-col rounded-2xl bg-apple-bg border border-[var(--separator)] shadow-2xl overflow-hidden motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-[var(--separator)] shrink-0 bg-black/[0.02] dark:bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-apple-tint/10 flex items-center justify-center text-apple-tint border border-apple-tint/20 shrink-0">
              <svg
                aria-hidden="true"
                className="w-5 h-5 fill-none stroke-current stroke-2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </div>
            <div>
              <h2
                id="recent-projects-title"
                className="text-[17px] sm:text-[19px] font-bold text-apple-label tracking-tight"
              >
                Recent Indie Projects
              </h2>
              <p
                id="recent-projects-desc"
                className="text-[12px] sm:text-[13px] text-apple-secondary leading-snug mt-0.5"
              >
                Open-source developer utilities, agentic AI skills, and mobile apps crafted by Sendo.
              </p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close dialog (Escape)"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-apple-secondary hover:text-apple-label hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint"
          >
            <span className="hidden sm:inline-flex text-[10px] font-mono font-medium text-apple-tertiary mr-1.5 px-1.5 py-0.5 rounded border border-[var(--separator)]">
              ESC
            </span>
            <svg
              aria-hidden="true"
              className="w-4 h-4 fill-none stroke-current stroke-2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Scrollable Project Cards Grid */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 overscroll-contain">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {indieProjects.map((project) => {
              const isShowcase = Boolean(project.detailUrl);
              const accentColor =
                project.id === 'ios-agent-skills'
                  ? 'var(--teal)'
                  : project.id === 'zest'
                    ? 'var(--shuiro)'
                    : 'var(--tint)';

              return (
                <div
                  key={project.id}
                  className="flex flex-col justify-between p-4 sm:p-4.5 rounded-xl border border-[var(--separator)] bg-white/40 dark:bg-white/[0.03] hover:border-black/20 dark:hover:border-white/20 transition-colors shadow-apple-sm group"
                >
                  {/* Card Top: Identity & Badges */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl overflow-hidden border border-[var(--separator)] bg-white dark:bg-neutral-900 shrink-0 shadow-apple-sm flex items-center justify-center">
                          {project.logo ? (
                            <Image
                              src={project.logo}
                              alt={project.title}
                              width={36}
                              height={36}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="font-bold text-apple-label text-[14px]">
                              {project.title.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <h3 className="text-[15px] font-bold text-apple-label tracking-tight group-hover:text-[var(--shuiro)] transition-colors leading-snug">
                            {project.title}
                          </h3>
                          <span className="text-[11px] font-medium text-apple-secondary block">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {isShowcase ? (
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border shrink-0"
                          style={{
                            color: accentColor,
                            backgroundColor: `${accentColor}14`,
                            borderColor: `${accentColor}30`,
                          }}
                        >
                          <span
                            aria-hidden="true"
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: accentColor }}
                          />
                          <span>Showcase</span>
                        </span>
                      ) : project.badge ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-black/5 dark:bg-white/10 text-apple-secondary border border-[var(--separator)] shrink-0">
                          {project.badge}
                        </span>
                      ) : null}
                    </div>

                    {/* Description */}
                    <p className="text-[12px] sm:text-[13px] text-apple-secondary leading-relaxed mb-3.5">
                      {project.desc}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono text-apple-tertiary bg-black/[0.03] dark:bg-white/[0.05] border border-[var(--separator)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-3 border-t border-[var(--separator)] flex items-center justify-between gap-2 mt-auto">
                    {project.detailUrl ? (
                      <Link
                        href={project.detailUrl}
                        onClick={onClose}
                        className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--shuiro)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded py-1"
                      >
                        <span>Interactive Showcase</span>
                        <svg
                          aria-hidden="true"
                          className="w-3.5 h-3.5 fill-none stroke-current stroke-2"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </Link>
                    ) : (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-apple-label hover:text-[var(--shuiro)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded py-1"
                      >
                        <span>View Project</span>
                        <svg
                          aria-hidden="true"
                          className="w-3 h-3 fill-none stroke-current stroke-2"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    )}

                    {project.link && project.detailUrl && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} on GitHub`}
                        className="p-1.5 rounded-lg text-apple-tertiary hover:text-apple-label hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-4 h-4 fill-currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer Bar */}
        <div className="p-3.5 sm:p-4 border-t border-[var(--separator)] bg-black/[0.02] dark:bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-apple-secondary shrink-0">
          <span className="hidden sm:inline">
            Press <kbd className="font-mono text-[11px] px-1.5 py-0.5 rounded border border-[var(--separator)] bg-apple-card">⌘K</kbd> to toggle dialog
          </span>
          <a
            href="#projects"
            onClick={onClose}
            className="text-apple-secondary hover:text-apple-label transition-colors font-medium flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded py-1 px-1.5"
          >
            <span>Browse Full Career Portfolio on Page</span>
            <svg
              aria-hidden="true"
              className="w-3.5 h-3.5 fill-none stroke-current stroke-2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
