'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isZest = pathname?.startsWith('/zest');
  const isIosSkills = pathname?.startsWith('/ios-agent-skills');

  return (
    <footer className="w-full border-t border-[var(--separator)] mt-16 py-10 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[13px] text-apple-secondary">
        
        {/* Left Info: Copyright & Tagline */}
        <div className="flex flex-col items-center md:items-start gap-1.5 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
            <span className="font-semibold text-apple-label whitespace-nowrap">
              © {new Date().getFullYear()} Sendo Tjiamis
            </span>
            <span className="hidden sm:inline w-px h-3 bg-[var(--separator)]" aria-hidden="true" />
            <span className="text-apple-secondary text-[12px] sm:text-[13px] whitespace-nowrap">
              Crafted with Apple Design standards
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-apple-tertiary text-[12px] sm:text-[13px]">
            <span className="w-2 h-2 rounded-full bg-[var(--teal)] animate-pulse" aria-hidden="true" />
            <span>Open to remote opportunities worldwide</span>
          </div>
        </div>

        {/* Right Links */}
        <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
          {/* Mobile Quick Links */}
          <nav
            aria-label="Footer Quick Links"
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 sm:hidden w-full text-center text-[13px] font-medium"
          >
            {isZest || isIosSkills ? (
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-1.5 min-h-[44px] py-2 px-2 text-apple-secondary hover:text-apple-label active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded-lg"
              >
                <svg aria-hidden="true" className="w-3.5 h-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>Portfolio</span>
              </Link>
            ) : null}

            {!isIosSkills && (
              <Link
                href="/ios-agent-skills"
                className="inline-flex items-center justify-center gap-1.5 min-h-[44px] py-2 px-2 text-apple-secondary hover:text-apple-label active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded-lg"
              >
                <svg aria-hidden="true" className="w-3.5 h-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 17 10 11 4 5" />
                  <line x1="12" y1="19" x2="20" y2="19" />
                </svg>
                <span>iOS Skills</span>
              </Link>
            )}

            {!isZest && (
              <Link
                href="/zest"
                className="inline-flex items-center justify-center gap-1.5 min-h-[44px] py-2 px-2 text-apple-secondary hover:text-apple-label active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded-lg"
              >
                <svg aria-hidden="true" className="w-3.5 h-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                <span>Zest macOS</span>
              </Link>
            )}

            <a
              href="https://github.com/sendotjiam"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[44px] py-2 px-2 text-apple-secondary hover:text-apple-label active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded-lg"
            >
              GitHub
            </a>

            <a
              href="https://apps.apple.com/us/app/grab-driver-app-for-partners/id1257641454"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[44px] py-2 px-2 text-apple-secondary hover:text-apple-label active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded-lg"
            >
              App Store
            </a>

            <a
              href="https://www.linkedin.com/in/sendo-tjiamis-a03a73192"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[44px] py-2 px-2 text-apple-secondary hover:text-apple-label active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded-lg"
            >
              LinkedIn
            </a>
          </nav>

          {/* Desktop Single-row Flex */}
          <nav
            aria-label="Footer Desktop Links"
            className="hidden sm:flex items-center gap-3 md:gap-4 text-[13px] font-medium"
          >
            {isZest || isIosSkills ? (
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 min-h-[44px] py-2 px-2 text-apple-secondary hover:text-apple-label active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded-lg"
              >
                <svg aria-hidden="true" className="w-3.5 h-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>Portfolio</span>
              </Link>
            ) : null}

            {!isIosSkills && (
              <Link
                href="/ios-agent-skills"
                className="inline-flex items-center gap-1.5 min-h-[44px] py-2 px-2 text-apple-secondary hover:text-apple-label active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded-lg"
              >
                <svg aria-hidden="true" className="w-3.5 h-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 17 10 11 4 5" />
                  <line x1="12" y1="19" x2="20" y2="19" />
                </svg>
                <span>iOS Agent Skills</span>
              </Link>
            )}

            {!isZest && (
              <Link
                href="/zest"
                className="inline-flex items-center gap-1.5 min-h-[44px] py-2 px-2 text-apple-secondary hover:text-apple-label active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded-lg"
              >
                <svg aria-hidden="true" className="w-3.5 h-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                <span>Zest for macOS</span>
              </Link>
            )}

            <a
              href="https://github.com/sendotjiam"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center min-h-[44px] py-2 px-2 text-apple-secondary hover:text-apple-label active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded-lg"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/sendo-tjiamis-a03a73192"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center min-h-[44px] py-2 px-2 text-apple-secondary hover:text-apple-label active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded-lg"
            >
              LinkedIn
            </a>

            <a
              href="https://apps.apple.com/us/app/grab-driver-app-for-partners/id1257641454"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center min-h-[44px] py-2 px-2 text-apple-secondary hover:text-apple-label active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded-lg"
            >
              App Store
            </a>

            <a
              href="mailto:sendotjiamis9898@gmail.com"
              className="inline-flex items-center justify-center min-h-[40px] px-3.5 py-1.5 rounded-full text-apple-tint font-semibold bg-apple-tint/[0.08] dark:bg-apple-tint/[0.12] hover:bg-apple-tint/[0.16] active:scale-95 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint"
            >
              <span>Get in touch</span>
            </a>
          </nav>

          {/* Mobile Get in touch Button */}
          <a
            href="mailto:sendotjiamis9898@gmail.com"
            className="sm:hidden inline-flex items-center justify-center min-h-[44px] w-full max-w-[240px] px-4 py-2 rounded-full text-apple-tint font-semibold bg-apple-tint/[0.08] dark:bg-apple-tint/[0.12] hover:bg-apple-tint/[0.16] active:scale-95 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint text-[13px]"
          >
            <span>Get in touch</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
