'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Demo', href: '#demo' },
  { label: 'Simulator', href: '#simulator' },
  { label: 'Why Zest', href: '#why' },
  { label: 'Features', href: '#features' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Shortcuts', href: '#shortcuts' },
  { label: 'Download', href: '#download' },
];

const SWITCH_PROFILES: {
  id: 'thock' | 'tactile' | 'clicky';
  name: string;
  dotColor: string;
}[] = [
  { id: 'thock', name: 'Linear Thock', dotColor: 'bg-[#d9381e]' },
  { id: 'tactile', name: 'Holy Panda', dotColor: 'bg-[#0066cc]' },
  { id: 'clicky', name: 'Kailh Jade', dotColor: 'bg-[#0d9488]' },
];

export default function ZestNav() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [switchProfile, setSwitchProfile] = useState<'thock' | 'tactile' | 'clicky'>('thock');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);

    const initialSwitch = (document.documentElement.dataset.switchTheme ||
      localStorage.getItem('switchProfile') ||
      'thock') as 'thock' | 'tactile' | 'clicky';
    setSwitchProfile(initialSwitch);

    const onSwitchChange = (e: CustomEvent<{ profile: 'thock' | 'tactile' | 'clicky' }>) => {
      if (e.detail?.profile) {
        setSwitchProfile(e.detail.profile);
      }
    };
    window.addEventListener('switch-profile-change' as any, onSwitchChange);
    return () => {
      window.removeEventListener('switch-profile-change' as any, onSwitchChange);
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

  const cycleSwitchProfile = () => {
    const currentIdx = SWITCH_PROFILES.findIndex((p) => p.id === switchProfile);
    const nextProfile = SWITCH_PROFILES[(currentIdx + 1) % SWITCH_PROFILES.length];
    setSwitchProfile(nextProfile.id);
    document.documentElement.dataset.switchTheme = nextProfile.id;
    try {
      localStorage.setItem('switchProfile', nextProfile.id);
      window.dispatchEvent(
        new CustomEvent('switch-profile-change', {
          detail: { profile: nextProfile.id, name: nextProfile.name },
        })
      );
    } catch {}
  };

  const currentSwitch = SWITCH_PROFILES.find((p) => p.id === switchProfile) || SWITCH_PROFILES[0];

  return (
    <header className="fixed top-0 inset-x-0 z-50 apple-glass transition-colors duration-200">
      <div className="h-14 max-w-5xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-3">
        {/* Left: Back to Portfolio + Zest Brand */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="group flex items-center gap-1.5 text-[13px] font-medium text-apple-secondary hover:text-apple-label transition-colors min-h-[44px] py-1 px-2.5 sm:px-3 rounded-full hover:bg-black/5 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint apple-btn-active"
            title="Return to Sendo's Portfolio"
          >
            <svg
              aria-hidden="true"
              className="w-4 h-4 text-apple-tertiary group-hover:-translate-x-0.5 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline whitespace-nowrap">Portfolio</span>
          </Link>

          <span className="text-apple-tertiary select-none" aria-hidden="true">/</span>

          <a
            href="#top"
            className="flex items-center gap-2 group py-1 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded-full apple-btn-active shrink-0"
          >
            <div className="w-7 h-7 rounded-[22%] overflow-hidden bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 shrink-0 shadow-apple-sm relative transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/assets/project-logo/zest-logo.png"
                alt="Zest icon"
                width={28}
                height={28}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="font-bold text-[15px] tracking-tight text-apple-label whitespace-nowrap">Zest</span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-apple-tertiary border border-black/5 dark:border-white/10 shrink-0">v1.2</span>
            </div>
          </a>
        </div>

        {/* Center: Desktop Nav Anchors */}
        <nav
          aria-label="Zest In-page Navigation"
          className="hidden md:flex items-center p-1 rounded-full bg-black/[0.04] dark:bg-white/[0.08] border border-[var(--separator)]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1 rounded-full text-[13px] font-medium text-apple-secondary hover:text-apple-label transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: GitHub Star & Theme Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href="https://github.com/sendotjiam/zest"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-apple-label border border-[var(--separator)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint shadow-apple-sm apple-btn-active min-h-[36px]"
          >
            <svg
              aria-hidden="true"
              className="w-3.5 h-3.5 text-apple-secondary"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>GitHub</span>
          </a>

          {/* Keypad Switch Theme Toggle */}
          {mounted && (
            <button
              type="button"
              onClick={cycleSwitchProfile}
              aria-label={`Keypad switch profile: ${currentSwitch.name}. Click to switch theme.`}
              title={`Keypad switch profile: ${currentSwitch.name} (Click to switch)`}
              className="min-h-[36px] px-2.5 sm:px-3 rounded-full text-[12px] font-medium text-apple-secondary hover:text-apple-label bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint apple-btn-active border border-black/5 dark:border-white/10"
            >
              <span
                className={`w-2 h-2 rounded-full ${currentSwitch.dotColor} shrink-0 animate-pulse`}
                aria-hidden="true"
              />
              <span className="hidden sm:inline font-mono">{currentSwitch.name}</span>
            </button>
          )}

          {/* Theme switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            className="w-11 h-11 rounded-full flex items-center justify-center text-apple-secondary hover:text-apple-label hover:bg-black/[0.05] dark:hover:bg-white/[0.1] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-colors apple-btn-active cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint"
          >
            {mounted && isDark ? (
              <svg aria-hidden="true" className="w-4 h-4 fill-none stroke-current stroke-[1.75]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg aria-hidden="true" className="w-4 h-4 fill-none stroke-current stroke-[1.75]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>

          {/* Mobile hamburger button */}
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
          <nav className="flex flex-col gap-1" aria-label="Zest Mobile Navigation">
            {/* Return to Portfolio Pill */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between min-h-[44px] px-3.5 mb-1 rounded-xl text-[15px] font-semibold text-apple-secondary hover:text-apple-label bg-black/[0.03] dark:bg-white/[0.05] transition-colors"
            >
              <span className="flex items-center gap-2">
                <svg aria-hidden="true" className="w-4 h-4 text-apple-tertiary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>Return to Portfolio</span>
              </span>
              <span className="text-[12px] text-apple-tertiary">Sendo Tjiamis</span>
            </Link>

            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center min-h-[44px] px-3.5 rounded-xl text-[15px] font-medium text-apple-label hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-2 mt-2 border-t border-[var(--separator)]">
              <a
                href="https://github.com/sendotjiam/zest"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between min-h-[44px] px-3.5 rounded-xl text-[15px] font-medium text-apple-label hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <svg aria-hidden="true" className="w-4 h-4 text-apple-secondary" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub Repository</span>
                </span>
                <svg aria-hidden="true" className="w-4 h-4 text-apple-tertiary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
