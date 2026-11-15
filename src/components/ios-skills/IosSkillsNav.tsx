'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Simulator', href: '#simulator' },
  { label: '10 Skills', href: '#skills' },
  { label: 'CLI & Xcode', href: '#cli' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Install', href: '#install' },
];

export default function IosSkillsNav() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
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
    <header className="fixed top-0 inset-x-0 z-50 apple-glass transition-colors duration-200">
      <div className="h-14 max-w-5xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-3">
        {/* Left: Back to Portfolio + Brand */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="group flex items-center gap-1.5 text-[13px] font-medium text-apple-secondary hover:text-apple-label transition-colors min-h-[44px] py-1 px-2.5 sm:px-3 rounded-full hover:bg-black/5 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint apple-btn-active"
            title="Return to Sendo's Portfolio"
          >
            <svg
              aria-hidden="true"
              className="w-4 h-4 text-apple-tertiary group-hover:-translate-x-0.5 motion-reduce:transform-none transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="hidden sm:inline">Portfolio</span>
          </Link>

          <div className="w-px h-4 bg-[var(--separator)]" aria-hidden="true" />

          <Link
            href="#hero"
            className="flex items-center gap-2 min-h-[44px] py-1 px-1.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint"
          >
            <div className="w-7 h-7 rounded-[7px] overflow-hidden border border-black/10 dark:border-white/10 shrink-0 shadow-apple-sm">
              <Image
                src="/assets/project-logo/ios-agent-skills-logo.svg"
                alt="iOS Agent Skills Logo"
                width={28}
                height={28}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[14px] font-bold tracking-tight text-apple-label">
                iOS Agent Skills
              </span>
              <span className="hidden md:inline text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">
                v1.0
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Nav Links */}
        <nav
          aria-label="iOS Agent Skills Section Navigation"
          className="hidden md:flex items-center gap-1 text-[13px] text-apple-secondary font-medium"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="min-h-[44px] px-3 py-1 flex items-center rounded-full hover:text-apple-label hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint apple-btn-active"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Actions (Theme Toggle + GitHub Repo) */}
        <div className="flex items-center gap-2">
          {/* Theme Switcher Button */}
          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              className="min-w-[44px] min-h-[44px] p-2 rounded-full text-apple-secondary hover:text-apple-label hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint apple-btn-active"
            >
              {isDark ? (
                <svg
                  className="w-4 h-4 text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 text-apple-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          )}

          {/* GitHub Star/Repo Link */}
          <a
            href="https://github.com/sendotjiam/ios-agent-skills"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[12px] font-semibold text-apple-label bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition-colors min-h-[44px] px-3 py-1 rounded-full border border-black/10 dark:border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint apple-btn-active"
            title="View on GitHub"
          >
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="hidden sm:inline">GitHub</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile navigation menu"
            aria-expanded={mobileMenuOpen}
            className="md:hidden min-w-[44px] min-h-[44px] p-2 rounded-lg text-apple-secondary hover:text-apple-label hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden border-t border-[var(--separator)] bg-[var(--bg)]/95 backdrop-blur-xl px-5 py-4 flex flex-col gap-1 transition-colors duration-150"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] px-3 py-2 text-[14px] font-medium text-apple-label rounded-lg hover:bg-black/5 dark:hover:bg-white/5 flex items-center"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
