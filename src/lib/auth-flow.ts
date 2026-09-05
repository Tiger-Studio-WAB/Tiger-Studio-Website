export const OAUTH_NEXT_COOKIE = "ts_oauth_next";

export function sanitizeAuthError(value: string | null | undefined) {
  if (!value) return "";
  return value.replace(/\s+/g, " ").trim().slice(0, 240);
}

export function authErrorPath(
  reason: "oauth" | "setup" | "domain",
  detail?: string | null,
) {
  const params = new URLSearchParams({ reason });
  const cleaned = sanitizeAuthError(detail);
  if (cleaned) params.set("detail", cleaned);
  return `/auth/error?${params.toString()}`;
}

export function safeNextPath(value: string | null | undefined) {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/ideas";
}

export function supabaseAuthCallbackUrl(supabaseUrl: string) {
  return `${supabaseUrl.replace(/\/$/, "")}/auth/v1/callback`;
}

export function oauthHint(detail: string | null | undefined) {
  const text = (detail ?? "").toLowerCase();
  if (
    text.includes("only accepts microsoft") ||
    text.includes("authorized school") ||
    text.includes("profiles_school") ||
    text.includes("check constraint")
  ) {
    return "sql" as const;
  }
  if (text.includes("not enabled") || text.includes("unsupported provider")) {
    return "provider" as const;
  }
  if (text.includes("redirect") || text.includes("redirect_uri")) {
    return "redirect" as const;
  }
  if (
    text.includes("code verifier") ||
    text.includes("pkce") ||
    text.includes("exchange") ||
    text.includes("invalid request")
  ) {
    return "callback" as const;
  }
  return "callback" as const;
}
