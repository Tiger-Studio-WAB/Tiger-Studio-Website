import Link from "next/link";
import { hostname } from "@/lib/format";

export function isInternalHref(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

export function StudioLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  if (isInternalHref(href)) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> (opens on {hostname(href)})</span>
    </a>
  );
}
