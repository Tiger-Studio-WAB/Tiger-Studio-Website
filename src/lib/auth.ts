import { redirect } from "next/navigation";
import { isAllowedMember } from "@/lib/domain";
import { getLocale, getRequestPath, localizedPath } from "@/lib/locale";
import { withLocale } from "@/lib/paths";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { Profile } from "@/lib/help-types";

export async function getSessionUser() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    return null;
  }

  const email = typeof data.claims.email === "string" ? data.claims.email : null;
  const provider =
    typeof data.claims.app_metadata === "object" &&
    data.claims.app_metadata &&
    "provider" in data.claims.app_metadata
      ? String(data.claims.app_metadata.provider)
      : null;

  if (!isAllowedMember(email, provider)) {
    return null;
  }

  return {
    id: String(data.claims.sub),
    email,
    provider,
  };
}

export async function requireSessionUser() {
  const user = await getSessionUser();
  if (!user) {
    const [locale, path] = await Promise.all([getLocale(), getRequestPath()]);
    const back = withLocale(path, locale);
    redirect(await localizedPath(`/login?next=${encodeURIComponent(back)}`));
  }
  return user;
}

export async function getProfile(): Promise<Profile | null> {
  const user = await getSessionUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("id, email, display_name, avatar_url, created_at")
    .eq("id", user.id)
    .maybeSingle();

  return data;
}
