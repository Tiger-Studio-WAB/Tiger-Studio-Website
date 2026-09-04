import type { Metadata } from "next";
import { GitHubSignIn } from "@/components/github-sign-in";
import { MicrosoftSignIn } from "@/components/microsoft-sign-in";
import { PageShell } from "@/components/page-shell";
import { getCopy } from "@/lib/locale";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to the Tiger Studio ideas board with GitHub or Microsoft.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const { copy } = await getCopy();
  const configured = isSupabaseConfigured();

  return (
    <PageShell>
      <div className="max-w-lg">
        <h1 className="text-3xl font-bold italic">{copy.signIn}</h1>
        <span className="rule-yellow mt-3" />
        <p className="mt-5 text-base leading-7">{copy.restricted}</p>
        <div className="mt-6 space-y-3">
          <GitHubSignIn label={copy.signInGitHub} nextPath={next} disabled={!configured} />
          <MicrosoftSignIn label={copy.signInMicrosoft} nextPath={next} disabled={!configured} />
          {!configured ? <p className="text-sm text-brand-red">{copy.setupNeeded}</p> : null}
        </div>
      </div>
    </PageShell>
  );
}
