import { LanguageMenu } from "@/components/language-menu";
import { LocaleLink as Link } from "@/components/locale-link";
import { SiteNav } from "@/components/site-nav";
import type { Profile } from "@/lib/help-types";
import type { UiCopy } from "@/lib/i18n";

export function SiteHeader({
  copy,
  profile,
}: {
  copy: UiCopy;
  profile: Profile | null;
}) {
  return (
    <header className="site-header sticky top-0 z-40">
      <div className="site-header-bar mx-auto flex w-full max-w-6xl items-center px-5">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 rounded-md text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
        >
          <span className="brand-mark" aria-hidden="true">
            T
          </span>
          <span className="text-lg font-semibold tracking-wide">{copy.brand}</span>
        </Link>
        <SiteNav
          copy={copy}
          profile={profile}
          language={<LanguageMenu label={copy.languagePicker} />}
          menuLanguage={<LanguageMenu label={copy.languagePicker} />}
        />
      </div>
    </header>
  );
}
