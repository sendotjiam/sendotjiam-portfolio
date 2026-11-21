'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isZest = pathname?.startsWith('/zest');
  const isIosSkills = pathname?.startsWith('/ios-agent-skills');
  const isSubpage = isZest || isIosSkills;

  return (
    <footer className="w-full border-t border-[var(--separator)] mt-16 py-10 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[13px] text-apple-secondary">
        
        {/* Left Column: Copyright & Dateline Status */}
        <div className="flex flex-col items-center md:items-start gap-1.5 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1">
            <span className="font-semibold text-apple-label whitespace-nowrap">
              © {new Date().getFullYear()} Sendo Tjiamis
            </span>
            <span className="hidden sm:inline w-px h-3 bg-[var(--separator)]" aria-hidden="true" />
            <span className="text-apple-secondary text-[12px] sm:text-[13px] whitespace-nowrap">
              iOS &amp; AI Application Engineer · Swift &amp; Applied AI
            </span>
          </div>

          <div className="inline-flex items-center gap-2 text-apple-tertiary text-[12px] sm:text-[13px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] shrink-0" aria-hidden="true" />
            <span className="whitespace-nowrap">Jakarta &amp; Remote Worldwide</span>
          </div>
        </div>

        {/* Right Column: Clean, Responsive Navigation Links + Contact CTA */}
        <nav
          aria-label="Footer Navigation Links"
          className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 sm:gap-x-5 gap-y-2 text-[13px] font-medium"
        >
          {isSubpage && (
            <Link
              href="/"
              className="min-h-[36px] py-1.5 px-1 text-apple-secondary hover:text-apple-label active:opacity-70 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded-lg"
            >
              Portfolio
            </Link>
          )}

          {!isIosSkills && (
            <Link
              href="/ios-agent-skills"
              className="min-h-[36px] py-1.5 px-1 text-apple-secondary hover:text-apple-label active:opacity-70 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded-lg"
            >
              iOS Agent Skills
            </Link>
          )}

          {!isZest && (
            <Link
              href="/zest"
              className="min-h-[36px] py-1.5 px-1 text-apple-secondary hover:text-apple-label active:opacity-70 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded-lg"
            >
              Zest for macOS
            </Link>
          )}

          <a
            href="https://github.com/sendotjiam"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[36px] py-1.5 px-1 text-apple-secondary hover:text-apple-label active:opacity-70 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded-lg"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/sendo-tjiamis-a03a73192"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[36px] py-1.5 px-1 text-apple-secondary hover:text-apple-label active:opacity-70 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded-lg"
          >
            LinkedIn
          </a>

          <a
            href="https://apps.apple.com/us/app/grab-driver-app-for-partners/id1257641454"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[36px] py-1.5 px-1 text-apple-secondary hover:text-apple-label active:opacity-70 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded-lg"
          >
            App Store
          </a>

          <a
            href="mailto:sendotjiamis9898@gmail.com"
            className="inline-flex items-center justify-center min-h-[36px] px-3.5 py-1.5 rounded-full text-apple-tint font-semibold bg-apple-tint/[0.08] dark:bg-apple-tint/[0.12] hover:bg-apple-tint/[0.16] active:scale-95 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint ml-1"
          >
            Get in touch
          </a>
        </nav>
      </div>
    </footer>
  );
}
