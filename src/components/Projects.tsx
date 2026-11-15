'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects, ProjectItem } from '@/data/projects';

type ProjectTrack = 'all' | 'company' | 'personal';

export default function Projects() {
  const [activeTrack, setActiveTrack] = useState<ProjectTrack>('all');
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const movedDistanceRef = useRef(0);

  const filteredProjects: ProjectItem[] =
    activeTrack === 'all'
      ? projects
      : projects.filter((p) => p.track === activeTrack);

  // Update scroll navigation arrow states and active slide index
  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate approximate active card index
    const firstChild = el.children[0] as HTMLElement | undefined;
    if (firstChild && filteredProjects.length > 0) {
      const cardWidth = firstChild.offsetWidth + 20; // 20px gap
      const newIndex = Math.min(
        filteredProjects.length - 1,
        Math.max(0, Math.round(scrollLeft / cardWidth))
      );
      setActiveIndex(newIndex);
    }
  }, [filteredProjects.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState, viewMode, activeTrack]);

  // Handle track filter change
  const handleTrackChange = (track: ProjectTrack) => {
    setActiveTrack(track);
    setActiveIndex(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  // Programmatic scroll step for arrows
  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;

    const firstChild = el.children[0] as HTMLElement | undefined;
    const cardWidth = firstChild ? firstChild.offsetWidth + 20 : 340;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;

    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Scroll to specific index via pagination dots
  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;

    const firstChild = el.children[0] as HTMLElement | undefined;
    const cardWidth = firstChild ? firstChild.offsetWidth + 20 : 340;
    el.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
  };

  // Mouse drag-to-scroll support for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;

    isDraggingRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
    movedDistanceRef.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const el = scrollRef.current;
    if (!el) return;

    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.4; // 1.4x drag multiplier
    movedDistanceRef.current = Math.abs(x - startXRef.current);
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    // Prevent accidental link navigation if user dragged more than 8 pixels
    if (movedDistanceRef.current > 8) {
      e.preventDefault();
    }
  };

  const companyCount = projects.filter((p) => p.track === 'company').length;
  const personalCount = projects.filter((p) => p.track === 'personal').length;

  return (
    <section id="projects" className="min-h-[100dvh] w-full py-16 flex flex-col justify-center border-t border-[var(--separator)] scroll-mt-16">
      {/* Section Header with Intro */}
      <div className="mb-6">
        <h2 className="text-[14px] font-semibold text-apple-secondary flex items-center gap-1.5">
          <span className="font-mono text-[12px] font-bold text-[var(--shuiro)]">03</span>
          <span>Selected Work</span>
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mt-1">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-label text-balance">
            Featured Projects & Products
          </h3>
          <p className="text-[14px] text-apple-secondary">
            Enterprise scale for millions & autonomous 0-to-1 developer tools.
          </p>
        </div>
      </div>

      {/* Track Category Filter Pills (Company Systems vs Indie Studio) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7 pb-2 border-b border-[var(--separator)]">
        {/* Track Segmented Control */}
        <div
          role="tablist"
          aria-label="Filter Projects by Track"
          className="inline-flex flex-wrap items-center p-1 rounded-2xl bg-black/[0.04] dark:bg-white/[0.08] border border-[var(--separator)] max-w-full"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTrack === 'all'}
            onClick={() => handleTrackChange('all')}
            className={`min-h-[44px] px-3.5 py-1.5 rounded-xl text-[13px] font-semibold transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint ${
              activeTrack === 'all'
                ? 'bg-white dark:bg-black text-apple-label shadow-apple-sm'
                : 'text-apple-secondary hover:text-apple-label'
            }`}
          >
            <span>All Work</span>
            <span className="text-[11px] font-mono px-1.5 py-0.2 rounded bg-black/5 dark:bg-white/10 text-apple-tertiary">
              {projects.length}
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTrack === 'company'}
            onClick={() => handleTrackChange('company')}
            className={`min-h-[44px] px-3.5 py-1.5 rounded-xl text-[13px] font-semibold transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint ${
              activeTrack === 'company'
                ? 'bg-white dark:bg-black text-apple-label shadow-apple-sm'
                : 'text-apple-secondary hover:text-apple-label'
            }`}
          >
            <svg aria-hidden="true" className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2" />
              <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
            </svg>
            <span>Company Systems</span>
            <span className="text-[11px] font-mono px-1.5 py-0.2 rounded bg-black/5 dark:bg-white/10 text-apple-tertiary">
              {companyCount}
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTrack === 'personal'}
            onClick={() => handleTrackChange('personal')}
            className={`min-h-[44px] px-3.5 py-1.5 rounded-xl text-[13px] font-semibold transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint ${
              activeTrack === 'personal'
                ? 'bg-white dark:bg-black text-apple-label shadow-apple-sm'
                : 'text-apple-secondary hover:text-apple-label'
            }`}
          >
            <svg aria-hidden="true" className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
            <span>Indie Studio & Tools</span>
            <span className="text-[11px] font-mono px-1.5 py-0.2 rounded bg-black/5 dark:bg-white/10 text-apple-tertiary">
              {personalCount}
            </span>
          </button>
        </div>

        {/* View Switcher & Carousel Controls */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Segmented Control: Carousel vs Grid */}
          <div className="inline-flex items-center p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.08] border border-[var(--separator)]">
            <button
              onClick={() => setViewMode('carousel')}
              className={`min-h-[44px] px-3.5 py-2 rounded-lg text-[13px] font-semibold transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint ${
                viewMode === 'carousel'
                  ? 'bg-white dark:bg-black text-apple-label shadow-apple-xs'
                  : 'text-apple-secondary hover:text-apple-label'
              }`}
              aria-label="Carousel Shelf View"
            >
              <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M2 10h20" />
              </svg>
              <span>Shelf</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`min-h-[44px] px-3.5 py-2 rounded-lg text-[13px] font-semibold transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-black text-apple-label shadow-apple-xs'
                  : 'text-apple-secondary hover:text-apple-label'
              }`}
              aria-label="Grid View"
            >
              <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
              </svg>
              <span>Grid</span>
            </button>
          </div>

          {/* Carousel Arrows (Active in Shelf view) */}
          {viewMode === 'carousel' && (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className="w-11 h-11 rounded-full flex items-center justify-center border border-[var(--separator)] bg-black/[0.02] dark:bg-white/[0.05] text-apple-label disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/[0.06] dark:hover:bg-white/[0.1] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint"
              >
                <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className="w-11 h-11 rounded-full flex items-center justify-center border border-[var(--separator)] bg-black/[0.02] dark:bg-white/[0.05] text-apple-label disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/[0.06] dark:hover:bg-white/[0.1] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint"
              >
                <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}

          {/* View All GitHub Link */}
          <a
            href="https://github.com/sendotjiam"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 text-[13px] font-semibold text-apple-tint hover:underline transition-colors ml-2"
          >
            <span>GitHub</span>
            <svg aria-hidden="true" className="w-3.5 h-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>

      {/* Content: Carousel Shelf Mode or Grid Mode */}
      {viewMode === 'carousel' ? (
        <div className="relative w-full">
          {/* Scrollable Shelf */}
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className="apple-shelf-carousel flex gap-4 sm:gap-5 overflow-x-auto pb-5 pt-1 -mx-5 px-5 sm:-mx-8 sm:px-8 cursor-grab active:cursor-grabbing select-none"
            style={{
              scrollSnapType: 'x proximity',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-x pan-y',
              scrollPaddingLeft: '1.25rem',
              scrollPaddingRight: '1.25rem',
              scrollbarWidth: 'none',
            }}
          >
            {filteredProjects.map((proj) => {
              const targetUrl = proj.detailUrl || proj.link || '#';
              const isInternal = Boolean(proj.detailUrl);
              return (
                <Link
                  key={proj.id}
                  href={targetUrl}
                  target={isInternal ? undefined : '_blank'}
                  rel={isInternal ? undefined : 'noopener noreferrer'}
                  onClick={handleLinkClick}
                  className="apple-card group snap-start shrink-0 w-[290px] sm:w-[340px] md:w-[380px] p-5 sm:p-6 rounded-2xl flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div>
                    {/* Top Bar: Icon + Badge */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 aspect-square rounded-[22%] overflow-hidden bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 shrink-0 shadow-apple-sm relative transition-transform duration-200 group-hover:scale-105 motion-reduce:transform-none">
                        {proj.logo ? (
                          <Image
                            src={proj.logo}
                            alt={`${proj.title} icon`}
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-apple-tint font-bold text-lg">
                            {proj.title.charAt(0)}
                          </div>
                        )}
                      </div>

                      {proj.detailUrl ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-apple-tint/10 text-apple-tint border border-apple-tint/25">
                          <span className="w-1.5 h-1.5 rounded-full bg-apple-tint animate-pulse" />
                          <span>Interactive Showcase</span>
                        </span>
                      ) : proj.badge ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[var(--shuiro-soft)] text-[var(--shuiro)] border border-[var(--shuiro-border)]">
                          {proj.badge}
                        </span>
                      ) : null}
                    </div>

                    {/* Track Indicator Chip */}
                    <div className="flex items-center gap-2 mb-2">
                      {proj.track === 'company' ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-apple-secondary bg-black/[0.04] dark:bg-white/[0.06] px-2 py-0.5 rounded-md">
                          <svg aria-hidden="true" className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="4" y="2" width="16" height="20" rx="2" />
                            <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
                          </svg>
                          <span>{proj.companyName || 'Enterprise'}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-apple-tint bg-apple-tint/10 px-2 py-0.5 rounded-md">
                          <svg aria-hidden="true" className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                          </svg>
                          <span>Indie Tool & OSS</span>
                        </span>
                      )}
                      {proj.category && (
                        <span className="text-[11px] text-apple-tertiary">
                          • {proj.category}
                        </span>
                      )}
                    </div>

                    {/* Title & External Link Indicator */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <h4 className="text-[17px] font-bold text-apple-label group-hover:text-apple-tint transition-colors">
                        {proj.title}
                      </h4>
                      <svg
                        aria-hidden="true"
                        className="w-3.5 h-3.5 text-apple-tertiary group-hover:text-apple-tint transition-colors shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>

                    {/* Description */}
                    <p className="text-[13px] sm:text-[14px] text-apple-secondary leading-relaxed line-clamp-3">
                      {proj.desc}
                    </p>
                  </div>

                  {/* Bottom Tech Stack Tags */}
                  <div className="pt-4 mt-4 flex flex-wrap gap-1.5 border-t border-[var(--separator)]">
                    {proj.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-black/[0.03] dark:bg-white/[0.05] text-[11px] font-medium text-apple-secondary"
                      >
                        {t}
                      </span>
                    ))}
                    {proj.tech.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded-md text-[11px] text-apple-tertiary font-medium">
                        +{proj.tech.length - 4}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Apple-Style Pagination Indicators */}
          <div className="flex items-center justify-center gap-1 mt-5">
            {filteredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className="min-h-[44px] min-w-[32px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded-full cursor-pointer"
              >
                <span
                  className={`h-1.5 w-6 rounded-full transition-[transform,background-color] duration-300 block ${
                    activeIndex === index
                      ? 'scale-x-100 bg-[var(--shuiro)]'
                      : 'scale-x-[0.35] bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* 2-Column Responsive Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          {filteredProjects.map((proj) => {
            const targetUrl = proj.detailUrl || proj.link || '#';
            const isInternal = Boolean(proj.detailUrl);
            return (
              <Link
                key={proj.id}
                href={targetUrl}
                target={isInternal ? undefined : '_blank'}
                rel={isInternal ? undefined : 'noopener noreferrer'}
                className="apple-card group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="flex flex-col gap-3.5">
                  {/* Top: Icon & Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 aspect-square rounded-[22%] overflow-hidden bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 shrink-0 shadow-apple-sm relative transition-transform duration-200 group-hover:scale-105 motion-reduce:transform-none">
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

                    {proj.detailUrl ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-apple-tint/10 text-apple-tint border border-apple-tint/25">
                        <span className="w-1.5 h-1.5 rounded-full bg-apple-tint animate-pulse" />
                        <span>Interactive Showcase</span>
                      </span>
                    ) : proj.badge ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[var(--shuiro-soft)] text-[var(--shuiro)] border border-[var(--shuiro-border)]">
                        {proj.badge}
                      </span>
                    ) : null}
                  </div>

                  {/* Track Indicator Chip */}
                  <div className="flex items-center gap-2">
                    {proj.track === 'company' ? (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-apple-secondary bg-black/[0.04] dark:bg-white/[0.06] px-2 py-0.5 rounded-md">
                        <svg aria-hidden="true" className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="4" y="2" width="16" height="20" rx="2" />
                          <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
                        </svg>
                        <span>{proj.companyName || 'Enterprise'}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-apple-tint bg-apple-tint/10 px-2 py-0.5 rounded-md">
                        <svg aria-hidden="true" className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                        </svg>
                        <span>Indie Tool & OSS</span>
                      </span>
                    )}
                    {proj.category && (
                      <span className="text-[11px] text-apple-tertiary">
                        • {proj.category}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-[17px] font-bold text-apple-label group-hover:text-apple-tint transition-colors">
                        {proj.title}
                      </h4>
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 text-apple-tertiary group-hover:text-apple-tint transition-colors shrink-0"
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
                    <p className="text-[14px] text-apple-secondary leading-relaxed">
                      {proj.desc}
                    </p>
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="pt-4 mt-4 flex flex-wrap gap-1.5 border-t border-[var(--separator)]">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-md bg-black/[0.03] dark:bg-white/[0.05] text-[12px] font-medium text-apple-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
