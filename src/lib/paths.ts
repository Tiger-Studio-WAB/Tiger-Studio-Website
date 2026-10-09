import type { ContentLanguage } from "@/lib/help-types";

export const LOCALE_HEADER = "x-locale";
export const PATH_HEADER = "x-pathname";

const PREFIXED: ContentLanguage[] = ["zh", "de"];

export function localeFromPathname(pathname: string): ContentLanguage {
  const path = pathname.split(/[?#]/)[0] ?? pathname;
  const match = path.match(/^\/(zh|de)(?=\/|$)/);
  return match?.[1] === "zh" || match?.[1] === "de" ? match[1] : "en";
}

export function stripLocalePath(pathname: string) {
  const match = pathname.match(/^\/(zh|de)(?=\/|$)/);
  if (!match) return pathname || "/";
  const rest = pathname.slice(match[0].length);
  return rest || "/";
}

function splitPath(path: string) {
  const hashAt = path.indexOf("#");
  const hash = hashAt >= 0 ? path.slice(hashAt) : "";
  const beforeHash = hashAt >= 0 ? path.slice(0, hashAt) : path;
  const queryAt = beforeHash.indexOf("?");
  const query = queryAt >= 0 ? beforeHash.slice(queryAt) : "";
  const pathname = queryAt >= 0 ? beforeHash.slice(0, queryAt) : beforeHash;
  return { pathname: pathname || "/", query, hash };
}

function staysUnprefixed(pathname: string) {
  return (
    pathname.startsWith("/api/") ||
    pathname === "/api" ||
    pathname.startsWith("/_next/") ||
    pathname === "/auth/callback" ||
    pathname.startsWith("/auth/callback/") ||
    /\.[a-z0-9]+$/i.test(pathname)
  );
}

/** English stays at `/about`. Chinese and German use `/zh` and `/de`. */
export function withLocale(path: string, locale: ContentLanguage) {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const { pathname, query, hash } = splitPath(path);
  if (staysUnprefixed(pathname)) return `${pathname}${query}${hash}`;
  const bare = stripLocalePath(pathname);
  if (locale === "en" || !PREFIXED.includes(locale)) return `${bare}${query}${hash}`;
  if (bare === "/") return `/${locale}${query}${hash}`;
  return `/${locale}${bare}${query}${hash}`;
}

export function allLocalePaths(path: string) {
  const bare = stripLocalePath(splitPath(path).pathname);
  return (["en", "zh", "de"] as const).map((locale) => withLocale(bare, locale));
}
