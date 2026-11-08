import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-[var(--separator)] mt-16 py-10 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[13px] text-apple-secondary">
        
        {/* Left Info */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-apple-label">
              © {new Date().getFullYear()} Sendo Tjiamis
            </span>
            <span className="w-px h-3 bg-[var(--separator)]" aria-hidden="true" />
            <span>Crafted with Apple Design standards</span>
          </div>

          <div className="flex items-center gap-1.5 text-apple-tertiary">
            <span className="w-2 h-2 rounded-full bg-[var(--teal)]" aria-hidden="true"></span>
            <span>Open to remote opportunities worldwide</span>
          </div>
        </div>

        {/* Right Links */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-5 font-medium">
          <Link
            className="inline-flex items-center gap-1.5 text-apple-secondary hover:text-apple-tint active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded"
            href="/zest"
          >
            <svg aria-hidden="true" className="w-3.5 h-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span>Zest for macOS</span>
          </Link>
          <a
            className="text-apple-secondary hover:text-apple-tint active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded"
            href="https://github.com/sendotjiam"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="text-apple-secondary hover:text-apple-tint active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded"
            href="https://www.linkedin.com/in/sendo-tjiamis-a03a73192"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="text-apple-secondary hover:text-apple-tint active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded"
            href="https://apps.apple.com/us/app/grab-driver-app-for-partners/id1257641454"
            target="_blank"
            rel="noopener noreferrer"
          >
            App Store
          </a>
          <a
            className="text-apple-tint hover:underline active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded"
            href="mailto:sendotjiamis9898@gmail.com"
          >
            Get in touch
          </a>
        </div>
      </div>
    </footer>
  );
}
