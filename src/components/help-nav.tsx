"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { UiCopy } from "@/lib/i18n";

const items = [
  { href: "/help", key: "helpNavHome" },
  { href: "/help/resources", key: "helpNavResources" },
  { href: "/help/share", key: "helpNavShare" },
  { href: "/help/feedback", key: "helpNavFeedback" },
  { href: "/docs", key: "docs" },
  { href: "/support", key: "support" },
  { href: "/ideas", key: "ideas" },
] as const;

export function HelpNav({ copy }: { copy: UiCopy }) {
  const pathname = usePathname();

  return (
    <nav className="help-nav" aria-label={copy.help}>
      <div className="mx-auto flex w-full max-w-6xl flex-wrap gap-2 px-5 py-3">
        {items.map((item) => {
          const active =
            item.href === "/help"
              ? pathname === "/help"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
                active ? "bg-brand-red text-white" : "bg-white text-ink hover:bg-brand-yellow"
              }`}
            >
              {copy[item.key]}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
