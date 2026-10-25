export default function Footer() {
  return (
    <footer className="w-full bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200/80 dark:border-slate-800 mt-16 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-margin-mobile md:px-margin py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 dark:text-slate-400">
        
        {/* Left Info */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <span className="font-mono-label text-mono-label font-medium text-slate-700 dark:text-slate-300">
              © {new Date().getFullYear()} Sendo Tjiamis
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
            <span className="font-body-sm text-body-sm">
              Designed &amp; built with craftsmanship
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono-label text-mono-label text-slate-400 dark:text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Open to remote worldwide</span>
          </div>
        </div>

        {/* Right Links */}
        <div className="flex items-center gap-6 font-mono-label text-mono-label">
          <a
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            href="https://github.com/sendotjiam"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            href="https://www.linkedin.com/in/sendo-tjiamis-a03a73192"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            href="https://apps.apple.com/us/app/grab-driver-app-for-partners/id1257641454"
            target="_blank"
            rel="noopener noreferrer"
          >
            App Store
          </a>
          <a
            className="text-primary dark:text-sky-400 hover:text-blue-700 dark:hover:text-sky-300 transition-colors font-medium"
            href="mailto:sendotjiamis9898@gmail.com?subject=Resume%20Request%20-%20Sendo%20Tjiamis"
          >
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
