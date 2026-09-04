import Link from "next/link";
import { LanguageToggle } from "@/components/language-toggle";
import { SignOutButton } from "@/components/sign-out-button";
import { nav } from "@/lib/content";
import type { UiCopy } from "@/lib/i18n";
import type { ContentLanguage, Profile } from "@/lib/help-types";

export function SiteHeader({
  copy,
  locale,
  profile,
}: {
  copy: UiCopy;
  locale: ContentLanguage;
  profile: Profile | null;
}) {
  const labels: Record<(typeof nav)[number]["href"], string> = {
    "/products": copy.products,
    "/about": copy.about,
    "/join": copy.join,
    "/docs": copy.docs,
  };

  return (
    <header className="sticky top-0 z-40 bg-brand-red text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="text-lg font-bold italic text-white">
          {copy.brand}
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm font-semibold">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:underline">
              {labels[item.href]}
            </Link>
          ))}
          {profile ? (
            <>
              <Link href="/ideas" className="hover:underline">
                {copy.ideas}
              </Link>
              <Link href="/me" className="hidden hover:underline sm:inline">
                {copy.myBoard}
              </Link>
              <SignOutButton label={copy.signOut} />
            </>
          ) : (
            <Link href="/login" className="hover:underline">
              {copy.signIn}
            </Link>
          )}
          <LanguageToggle locale={locale} />
        </nav>
      </div>
    </header>
  );
}
