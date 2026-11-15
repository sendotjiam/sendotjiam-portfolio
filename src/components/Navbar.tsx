'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import RecentProjectsModal from '@/components/RecentProjectsModal';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Languages', href: '#languages' },
  { label: 'Education', href: '#education' },
];

export default function Navbar() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [projectsModalOpen, setProjectsModalOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [scrolledPastHero, setScrolledPastHero] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Smart reveal: Show navbar once scrolled past the hero (threshold ~200px)
      setScrolledPastHero(scrollY > 200);

      const sections = document.querySelectorAll('section[id]');
      sections.forEach((current) => {
        const el = current as HTMLElement;
        const sectionHeight = el.offsetHeight;
        const sectionTop = el.offsetTop - 120;
        const sectionId = el.getAttribute('id') || '';

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setProjectsModalOpen((prev) => !prev);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleGlobalKeyDown);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 apple-glass transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none ${
        scrolledPastHero || mobileMenuOpen
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="h-14 max-w-5xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-4">
        {/* Brand Profile & Name */}
        <a
          href="#about"
          className="flex items-center gap-2.5 group apple-btn-active min-h-[44px] py-1 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border border-black/10 dark:border-white/15 shrink-0 shadow-apple-sm relative transition-transform duration-200 group-hover:scale-105 motion-reduce:transform-none">
            <Image
              src="/assets/photo/sendo.jpg"
              alt="Sendo Tjiamis"
              width={32}
              height={32}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <span className="text-[15px] font-semibold text-apple-label tracking-tight font-sans">
            Sendo Tjiamis
          </span>
        </a>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Recent Projects Modal Trigger */}
          <button
            type="button"
            onClick={() => setProjectsModalOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={projectsModalOpen}
            className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-[12px] sm:text-[13px] font-semibold text-apple-label bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.14] border border-[var(--separator)] transition-colors apple-btn-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint min-h-[36px]"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--teal)] animate-pulse motion-reduce:animate-none" aria-hidden="true" />
            <span className="sm:hidden">Projects</span>
            <span className="hidden sm:inline">My Recent Projects</span>
            <span className="hidden md:inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-apple-tertiary border border-black/5 dark:border-white/10">
              ⌘K
            </span>
          </button>

          {/* Dark / Light Mode Switcher with 44px hit target */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            className="w-11 h-11 rounded-full flex items-center justify-center text-apple-secondary hover:text-apple-label hover:bg-black/[0.05] dark:hover:bg-white/[0.1] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-colors apple-btn-active cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint"
          >
            {mounted && isDark ? (
              /* Sun icon */
              <svg aria-hidden="true" className="w-4 h-4 fill-none stroke-current stroke-[1.75]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              /* Moon icon */
              <svg aria-hidden="true" className="w-4 h-4 fill-none stroke-current stroke-[1.75]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>

          {/* Mobile Menu Button with 44px hit target */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden w-11 h-11 rounded-full flex items-center justify-center text-apple-secondary hover:text-apple-label hover:bg-black/[0.05] dark:hover:bg-white/[0.1] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-colors apple-btn-active cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint"
          >
            {mobileMenuOpen ? (
              <svg aria-hidden="true" className="w-5 h-5 fill-none stroke-current stroke-[1.75]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg aria-hidden="true" className="w-5 h-5 fill-none stroke-current stroke-[1.75]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Navigation Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden apple-glass border-b border-[var(--separator)] px-6 py-4 animate-in fade-in duration-150">
          <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
            {/* Recent Projects Modal Trigger on Mobile */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setProjectsModalOpen(true);
              }}
              className="flex items-center justify-between min-h-[44px] px-3.5 mb-2 rounded-xl text-[15px] font-semibold text-apple-label bg-black/[0.04] dark:bg-white/[0.08] border border-[var(--separator)] hover:bg-black/[0.08] dark:hover:bg-white/[0.14] transition-colors"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--teal)] animate-pulse motion-reduce:animate-none" aria-hidden="true" />
                <span>My Recent Projects</span>
              </span>
              <span className="text-[12px] text-apple-tertiary font-mono">4 Apps ▾</span>
            </button>

            <div className="pt-2 border-t border-[var(--separator)] flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center min-h-[44px] px-3.5 rounded-xl text-[15px] font-medium transition-colors ${
                      isActive
                        ? 'bg-apple-tint/10 text-apple-tint font-semibold'
                        : 'text-apple-label hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </nav>
        </div>
      )}

      {/* Recent Projects Dialog (macOS Spotlight / Sheet) */}
      <RecentProjectsModal
        isOpen={projectsModalOpen}
        onClose={() => setProjectsModalOpen(false)}
      />
    </header>
  );
}
