import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isAllowedMember } from "@/lib/domain";
import { LOCALE_HEADER, PATH_HEADER, localeFromPathname, stripLocalePath, withLocale } from "@/lib/paths";
import { getSupabasePublicEnv } from "@/lib/supabase/env";

function isProtectedPath(pathname: string) {
  if (pathname === "/me" || pathname.startsWith("/me/")) return true;
  if (pathname === "/ideas/new" || pathname.startsWith("/ideas/new/")) return true;
  return false;
}

export async function updateSession(request: NextRequest) {
  const visiblePath = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  const locale = localeFromPathname(request.nextUrl.pathname);
  const stripped = stripLocalePath(request.nextUrl.pathname);

  function continueResponse() {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(LOCALE_HEADER, locale);
    requestHeaders.set(PATH_HEADER, `${stripped}${request.nextUrl.search}`);
    const init = { request: { headers: requestHeaders } };
    if (locale === "en") return NextResponse.next(init);
    const dest = request.nextUrl.clone();
    dest.pathname = stripped;
    return NextResponse.rewrite(dest, init);
  }

  function redirectTo(path: string) {
    return NextResponse.redirect(new URL(withLocale(path, locale), request.url));
  }

  if (!getSupabasePublicEnv()) {
    if (isProtectedPath(stripped)) {
      const login = new URL(withLocale("/login", locale), request.url);
      login.searchParams.set("next", visiblePath);
      return NextResponse.redirect(login);
    }
    return continueResponse();
  }

  const env = getSupabasePublicEnv()!;
  let supabaseResponse = continueResponse();

  const supabase = createServerClient(env.url, env.key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = continueResponse();
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
        Object.entries(headers).forEach(([key, value]) =>
          supabaseResponse.headers.set(key, value),
        );
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  const email = typeof claims?.email === "string" ? claims.email : null;
  const provider =
    typeof claims?.app_metadata === "object" &&
    claims.app_metadata &&
    "provider" in claims.app_metadata
      ? String(claims.app_metadata.provider)
      : null;

  const signedIn = Boolean(claims);
  const allowed = signedIn && isAllowedMember(email, provider);

  if (signedIn && !allowed) {
    await supabase.auth.signOut();
    const errorUrl = new URL(withLocale("/auth/error", locale), request.url);
    errorUrl.searchParams.set("reason", "domain");
    return NextResponse.redirect(errorUrl);
  }

  if (isProtectedPath(stripped) && !allowed) {
    const login = new URL(withLocale("/login", locale), request.url);
    login.searchParams.set("next", visiblePath);
    return NextResponse.redirect(login);
  }

  if ((stripped === "/login" || request.nextUrl.pathname === "/login") && allowed) {
    return redirectTo("/ideas");
  }

  return supabaseResponse;
}
