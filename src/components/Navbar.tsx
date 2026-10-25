'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
];

export default function Navbar() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('about');
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);

    const handleScroll = () => {
      const scrollY = window.scrollY;
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
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
    <header className="fixed top-0 inset-x-0 z-50 liquid-glass border-b border-white/50 dark:border-white/10 shadow-sm transition-colors duration-200">
      <div className="h-16 max-w-5xl mx-auto px-margin-mobile md:px-margin flex items-center justify-between gap-space-md">
        
        {/* Brand Profile & Name */}
        <div className="flex items-center gap-space-md">
          <a className="flex items-center gap-2.5 group" href="#about">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200/90 dark:border-white/10 shrink-0 shadow-sm transition-transform group-hover:scale-105 relative">
              <Image
                src="/assets/photo/sendo.jpg"
                alt="Sendo Tjiamis"
                width={32}
                height={32}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <span className="font-headline-sm text-headline-sm text-slate-900 dark:text-white tracking-tight hidden sm:inline-block font-semibold">
              Sendo Tjiamis
            </span>
          </a>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-space-xs p-1 liquid-glass rounded-full border border-white/50 dark:border-white/10">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.href}
                href={item.href}
                className={`px-3.5 py-1 transition-all font-body-sm text-body-sm rounded-full font-medium ${
                  isActive
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-space-sm">
          {/* Dark / Light Mode Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200/60 dark:border-slate-700 cursor-pointer shadow-sm"
          >
            {mounted && isDark ? (
              <svg className="w-4 h-4 fill-current text-amber-400" viewBox="0 0 24 24">
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0z"></path>
              </svg>
            ) : (
              <svg className="w-4 h-4 fill-current text-slate-700 dark:text-slate-200" viewBox="0 0 24 24">
                <path d="M12.3 2a10 10 0 0 0-.19 19.98 10 10 0 0 0 9.89-8.3 1 1 0 0 0-1.12-1.16 8 8 0 0 1-8.58-8.58 1 1 0 0 0-1.16-1.12A10.2 10.2 0 0 0 12.3 2z"></path>
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
