import { LocaleLink as Link } from "@/components/locale-link";
import { nav } from "@/lib/content";
import type { ContentLanguage } from "@/lib/help-types";
import type { UiCopy } from "@/lib/i18n";
import { site } from "@/lib/site";

export function SiteFooter({ copy, locale }: { copy: UiCopy; locale: ContentLanguage }) {
  const labels: Record<(typeof nav)[number]["href"], string> = {
    "/products": copy.products,
    "/about": copy.about,
    "/join": copy.join,
    "/docs": copy.docs,
    "/help": copy.help,
  };

  return (
    <footer className="border-t border-black/5 bg-white text-ink">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-6 py-10 text-center text-sm">
        <p className="font-semibold tracking-wide">{copy.brand}</p>
        <p className="text-muted-foreground">{site.motto}</p>
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 font-medium">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-sm hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
            >
              {labels[item.href]}
            </Link>
          ))}
          <Link
            href="/news"
            className="rounded-sm hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
          >
            {copy.news}
          </Link>
        </nav>
        {locale === "de" ? <p className="max-w-md text-muted-foreground">{copy.germanReviewNote}</p> : null}
      </div>
    </footer>
  );
}
