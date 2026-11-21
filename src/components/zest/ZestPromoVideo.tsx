export default function ZestPromoVideo() {
  return (
    <section
      id="demo"
      aria-labelledby="zest-demo-heading"
      className="py-12 sm:py-16 w-full scroll-mt-16"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="flex flex-col gap-1.5">
            <span className="inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-[var(--teal-soft)] border border-[var(--teal-border)] text-[11px] font-semibold text-[var(--teal)]">
              25s Walkthrough
            </span>
            <h2
              id="zest-demo-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-label"
            >
              See Zest in Action
            </h2>
          </div>
          <p className="text-[14px] text-apple-secondary max-w-md leading-relaxed">
            Press <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-apple-label font-mono text-[12px] border border-black/10 dark:border-white/10">⌘⇧V</kbd>, tap a digit, and paste directly into your active editor.
          </p>
        </div>

        <div className="w-full rounded-2xl overflow-hidden border border-[var(--separator)] bg-black shadow-apple-md">
          <video
            className="w-full aspect-video block bg-black"
            src="/assets/videos/zest-promo.mp4"
            controls
            playsInline
            preload="metadata"
            aria-label="Zest for macOS 25-second promo video"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
