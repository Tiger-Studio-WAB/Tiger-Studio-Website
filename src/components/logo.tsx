import Link from "next/link";

function Mark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="24" fill="#131313" />
      <path d="M14 16h20" stroke="#f4d348" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M24 16v17" stroke="#f4d348" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M16 34h16" stroke="#e24b2d" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3 text-navy no-underline">
      <Mark />
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="text-[1.15rem] font-semibold tracking-tight">Tiger Studio</span>
        {!compact ? (
          <span className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-studio-muted">
            Student passion club
          </span>
        ) : null}
      </span>
    </Link>
  );
}

export function MenuGlyph({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="24" fill="#131313" />
      <path d="M15 18h18" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M15 24h18" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M15 30h18" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
