export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <span className="relative flex h-12 w-12">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand/30" />
          <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M2 20L8.5 7l4 7 2.5-4L22 20H2Z" fill="currentColor" />
            </svg>
          </span>
        </span>
        <p className="text-sm font-medium tracking-wide text-warmbrown/70">
          Loading…
        </p>
      </div>
    </div>
  );
}
