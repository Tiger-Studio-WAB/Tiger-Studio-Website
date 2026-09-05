"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { authErrorPath, OAUTH_NEXT_COOKIE, safeNextPath } from "@/lib/auth-flow";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

function originFromHeaders(headerStore: Headers) {
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  const proto = headerStore.get("x-forwarded-proto") ?? "http";
  if (!host) return "http://localhost:3000";
  return `${proto}://${host}`;
}

async function rememberNextPath(next: string) {
  const store = await cookies();
  store.set(OAUTH_NEXT_COOKIE, next, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV !== "development",
    path: "/",
    maxAge: 60 * 10,
  });
}

async function startOAuth(
  provider: "github" | "azure",
  formData?: FormData,
) {
  if (!isSupabaseConfigured()) {
    redirect(authErrorPath("setup"));
  }

  const headerStore = await headers();
  const origin = originFromHeaders(headerStore);
  const next = safeNextPath(
    typeof formData?.get("next") === "string" ? String(formData.get("next")) : null,
  );
  await rememberNextPath(next);

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      scopes: provider === "github" ? "user:email" : "email openid profile",
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error || !data.url) {
    redirect(authErrorPath("oauth", error?.message ?? `${provider} sign-in did not start`));
  }

  redirect(data.url);
}

export async function signInWithGitHub(formData?: FormData) {
  await startOAuth("github", formData);
}

export async function signInWithMicrosoft(formData?: FormData) {
  await startOAuth("azure", formData);
}

export async function signOut() {
  if (!isSupabaseConfigured()) {
    redirect("/");
  }

  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
