import { headers } from "next/headers";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { oauthHint, supabaseAuthCallbackUrl } from "@/lib/auth-flow";
import { getCopy } from "@/lib/locale";
import { getSupabasePublicEnv } from "@/lib/supabase/env";

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string; detail?: string; error?: string; error_description?: string }>;
}) {
  const params = await searchParams;
  const { copy } = await getCopy();
  const detail = params.detail ?? params.error_description ?? params.error;
  const hint = params.reason === "domain" ? null : oauthHint(detail);
  const message =
    params.reason === "domain"
      ? copy.domainError
      : params.reason === "setup"
        ? copy.setupNeeded
        : copy.authError;

  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  const proto = headerStore.get("x-forwarded-proto") ?? "https";
  const origin = host ? `${proto}://${host.split(",")[0]!.trim()}` : "";
  const env = getSupabasePublicEnv();
  const githubCallback = env ? supabaseAuthCallbackUrl(env.url) : null;

  return (
    <PageShell>
      <div className="max-w-xl">
        <h1 className="text-3xl font-bold italic">{copy.brand}</h1>
        <span className="rule-yellow mt-3" />
        <p className="mt-5 text-base leading-7">{message}</p>
        {detail ? (
          <div className="panel mt-5 p-4">
            <p className="section-kicker">{copy.authErrorDetail}</p>
            <p className="mt-2 font-mono text-sm leading-6 text-brand-red">{detail}</p>
          </div>
        ) : null}
        {params.reason !== "domain" ? (
          <div className="mt-8 space-y-5">
            <h2 className="text-xl font-bold italic">{copy.authFixTitle}</h2>
            <FixStep
              active={hint === "callback"}
              text={copy.authFixCallback}
              value={githubCallback}
            />
            <FixStep
              active={hint === "redirect"}
              text={copy.authFixRedirect}
              value={origin ? `${origin}/auth/callback**` : null}
            />
            <FixStep active={hint === "sql"} text={copy.authFixSql} />
            <FixStep active={hint === "provider"} text={copy.authFixProvider} />
          </div>
        ) : null}
        <Link href="/login" className="btn btn-red mt-8">
          {copy.signIn}
        </Link>
      </div>
    </PageShell>
  );
}

function FixStep({
  active,
  text,
  value,
}: {
  active: boolean;
  text: string;
  value?: string | null;
}) {
  return (
    <div className={`panel p-4 ${active ? "border-brand-red" : ""}`}>
      <p className="text-sm leading-7">{text}</p>
      {value ? (
        <p className="mt-2 break-all font-mono text-xs leading-6 text-brand-blue">{value}</p>
      ) : null}
    </div>
  );
}
