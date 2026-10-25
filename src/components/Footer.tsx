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
            <span>•</span>
            <span>Crafted with Apple Design standards</span>
          </div>

          <div className="flex items-center gap-1.5 text-apple-tertiary">
            <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true"></span>
            <span>Open to remote opportunities worldwide</span>
          </div>
        </div>

        {/* Right Links */}
        <div className="flex items-center gap-6 font-medium">
          <a
            className="text-apple-secondary hover:text-apple-tint transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded"
            href="https://github.com/sendotjiam"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="text-apple-secondary hover:text-apple-tint transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded"
            href="https://www.linkedin.com/in/sendo-tjiamis-a03a73192"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="text-apple-secondary hover:text-apple-tint transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded"
            href="https://apps.apple.com/us/app/grab-driver-app-for-partners/id1257641454"
            target="_blank"
            rel="noopener noreferrer"
          >
            App Store
          </a>
          <a
            className="text-apple-tint hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint rounded"
            href="mailto:sendotjiamis9898@gmail.com"
          >
            Get in touch
          </a>
        </div>
      </div>
    </footer>
  );
}
