import { headers } from "next/headers";
import type { ContentLanguage } from "@/lib/help-types";
import { dictionaries, parseLocale, type UiCopy } from "@/lib/i18n";
import { LOCALE_HEADER, PATH_HEADER, localeFromPathname, withLocale } from "@/lib/paths";

export async function getLocale(): Promise<ContentLanguage> {
  const headerStore = await headers();
  const explicit = headerStore.get(LOCALE_HEADER);
  if (explicit) return parseLocale(explicit);
  const nextUrl = headerStore.get("next-url") ?? "";
  if (nextUrl.startsWith("/")) return localeFromPathname(nextUrl);
  const referer = headerStore.get("referer");
  if (referer) {
    try {
      return localeFromPathname(new URL(referer).pathname);
    } catch {
      return "en";
    }
  }
  return "en";
}

export async function getRequestPath() {
  const headerStore = await headers();
  const value = headerStore.get(PATH_HEADER);
  return value && value.startsWith("/") ? value : "/";
}

export async function localizedPath(path: string) {
  return withLocale(path, await getLocale());
}

export async function getCopy(): Promise<{ locale: ContentLanguage; copy: UiCopy }> {
  const locale = await getLocale();
  return { locale, copy: dictionaries[locale] };
}
