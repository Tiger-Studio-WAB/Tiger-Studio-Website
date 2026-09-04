import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3 text-navy no-underline">
      <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white shadow-[0_0_0_1px_rgba(19,19,19,0.08)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 65 68"
          className="h-10 w-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect fill="#131313" height="66.55" rx="32.5" width="65" y="0.6" />
          <path
            d="M45 25.9c0 1.22-5.77 2.21-12.9 2.21S19.2 27.12 19.2 25.9s5.77-2.21 12.9-2.21S45 24.67 45 25.9Z"
            fill="#53D0AB"
          />
          <path
            d="M45 33.82c0 1.22-5.77 2.21-12.9 2.21S19.2 35.04 19.2 33.82s5.77-2.21 12.9-2.21S45 32.6 45 33.82Z"
            fill="#16C1F1"
          />
          <path
            d="M45 41.76c0 1.22-5.77 2.21-12.9 2.21S19.2 42.98 19.2 41.76s5.77-2.21 12.9-2.21S45 40.54 45 41.76Z"
            fill="#948EFF"
          />
        </svg>
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="text-[1.15rem] font-semibold tracking-tight">Tiger Studio</span>
        {!compact ? (
          <span className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-wab-muted">
            Western Academy of Beijing
          </span>
        ) : null}
      </span>
    </Link>
  );
}

export function MenuGlyph({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 65 68"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="#131313" height="66.55" rx="32.5" width="65" y="0.6" />
      <path
        d="M45 25.9c0 1.22-5.77 2.21-12.9 2.21S19.2 27.12 19.2 25.9s5.77-2.21 12.9-2.21S45 24.67 45 25.9Z"
        fill="#53D0AB"
      />
      <path
        d="M45 33.82c0 1.22-5.77 2.21-12.9 2.21S19.2 35.04 19.2 33.82s5.77-2.21 12.9-2.21S45 32.6 45 33.82Z"
        fill="#16C1F1"
      />
      <path
        d="M45 41.76c0 1.22-5.77 2.21-12.9 2.21S19.2 42.98 19.2 41.76s5.77-2.21 12.9-2.21S45 40.54 45 41.76Z"
        fill="#948EFF"
      />
    </svg>
  );
}
