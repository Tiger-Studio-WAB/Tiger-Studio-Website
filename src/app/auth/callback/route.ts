import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { authErrorPath, OAUTH_NEXT_COOKIE, safeNextPath } from "@/lib/auth-flow";
import { isAllowedMember } from "@/lib/domain";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const oauthError =
    searchParams.get("error_description") ??
    searchParams.get("error") ??
    searchParams.get("error_code");

  const cookieStore = await cookies();
  const next = safeNextPath(
    searchParams.get("next") ?? cookieStore.get(OAUTH_NEXT_COOKIE)?.value,
  );
  cookieStore.delete(OAUTH_NEXT_COOKIE);

  if (!code) {
    return NextResponse.redirect(
      `${origin}${authErrorPath("oauth", oauthError ?? "GitHub did not return an auth code")}`,
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(`${origin}${authErrorPath("oauth", error.message)}`);
  }

  const { data } = await supabase.auth.getUser();
  const email = data.user?.email;
  const provider = data.user?.app_metadata?.provider;

  if (!isAllowedMember(email, provider)) {
    await supabase.auth.signOut();
    return NextResponse.redirect(`${origin}${authErrorPath("domain")}`);
  }

  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";
  if (isLocalEnv) {
    return NextResponse.redirect(`${origin}${next}`);
  }
  if (forwardedHost) {
    return NextResponse.redirect(`https://${forwardedHost}${next}`);
  }
  return NextResponse.redirect(`${origin}${next}`);
}
