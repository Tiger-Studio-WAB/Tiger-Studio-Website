import { getLocale, getRequestPath } from "@/lib/locale";
import { withLocale } from "@/lib/paths";
import type { ContentLanguage } from "@/lib/help-types";

const CHOICES: { locale: ContentLanguage; label: string; lang: string }[] = [
  { locale: "en", label: "EN", lang: "en" },
  { locale: "zh", label: "中文", lang: "zh-CN" },
  { locale: "de", label: "DE", lang: "de" },
];

export async function LanguageMenu({ label }: { label: string }) {
  const [locale, path] = await Promise.all([getLocale(), getRequestPath()]);
  const current = CHOICES.find((item) => item.locale === locale) ?? CHOICES[0];

  return (
    <details className="lang-menu">
      <summary aria-label={label}>{current.label}</summary>
      <div className="lang-menu-panel">
        {CHOICES.map((item) => (
          <a
            key={item.locale}
            href={withLocale(path, item.locale)}
            hrefLang={item.lang}
            lang={item.lang}
            aria-current={item.locale === locale ? "true" : undefined}
          >
            {item.label}
          </a>
        ))}
      </div>
    </details>
  );
}
