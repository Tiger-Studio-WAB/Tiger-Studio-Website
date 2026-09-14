import Link from "next/link";
import { nav } from "@/lib/content";
import type { ContentLanguage } from "@/lib/help-types";
import type { UiCopy } from "@/lib/i18n";

export function SiteFooter({ copy, locale }: { copy: UiCopy; locale: ContentLanguage }) {
  const labels: Record<(typeof nav)[number]["href"], string> = {
    "/products": copy.products,
    "/about": copy.about,
    "/join": copy.join,
    "/docs": copy.docs,
    "/help": copy.help,
  };

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-8 text-sm sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-bold italic">{copy.brand}</p>
          <p className="mt-2 max-w-sm text-white/70">{copy.tagline}</p>
          {locale === "de" ? <p className="mt-3 max-w-sm text-white/50">{copy.germanReviewNote}</p> : null}
        </div>
        <nav className="flex flex-wrap gap-4 font-semibold">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-sm hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              {labels[item.href]}
            </Link>
          ))}
          <Link href="/news" className="rounded-sm hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            {copy.news}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
