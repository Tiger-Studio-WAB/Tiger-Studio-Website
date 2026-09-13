import { CONTENT_LANGUAGES, type ContentLanguage } from "@/lib/help-types";

const LOCALE_MARKDOWN = /^(.*)\.(zh|de)\.md$/i;

export function splitLocaleMarkdownPath(filePath: string): {
  canonical: string;
  locale: ContentLanguage;
} {
  const normalized = filePath.replace(/\\/g, "/").replace(/^\.\//, "");
  const match = normalized.match(LOCALE_MARKDOWN);
  if (match) {
    return { canonical: `${match[1]}.md`, locale: match[2].toLowerCase() as ContentLanguage };
  }
  return { canonical: normalized, locale: "en" };
}

export function isLocaleMarkdownPath(filePath: string) {
  return LOCALE_MARKDOWN.test(filePath.replace(/\\/g, "/"));
}

export function localeMarkdownPath(canonical: string, locale: ContentLanguage) {
  if (locale === "en") return canonical.replace(/\\/g, "/");
  return canonical.replace(/\\/g, "/").replace(/\.md$/i, `.${locale}.md`);
}

export function stripLocaleMarkdownSuffix(value: string) {
  return value.replace(/\.(zh|de)$/i, "");
}

export function pickLocalizedText<T>(
  variants: Partial<Record<ContentLanguage, T>>,
  locale: ContentLanguage,
): { value: T | undefined; locale: ContentLanguage; usedFallback: boolean } {
  const requested = variants[locale];
  if (requested) return { value: requested, locale, usedFallback: false };
  const english = variants.en;
  if (english) return { value: english, locale: "en", usedFallback: locale !== "en" };
  for (const item of CONTENT_LANGUAGES) {
    const fallback = variants[item];
    if (fallback) return { value: fallback, locale: item, usedFallback: item !== locale };
  }
  return { value: undefined, locale, usedFallback: false };
}
