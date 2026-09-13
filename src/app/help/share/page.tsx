import type { Metadata } from "next";
import { GitHubSignIn } from "@/components/github-sign-in";
import { MicrosoftSignIn } from "@/components/microsoft-sign-in";
import { BadgeRow } from "@/components/badge-row";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { ShareForm } from "@/components/share-form";
import { getSessionUser } from "@/lib/auth";
import { listPlaytestShares } from "@/lib/data";
import { authorLabel } from "@/lib/display-name";
import { getCopy } from "@/lib/locale";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await getCopy();
  return { title: `${copy.helpNavShare} · ${copy.help}`, description: copy.shareLede };
}

export default async function HelpSharePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; ok?: string }>;
}) {
  const { error, ok } = await searchParams;
  const [{ copy }, user, shares] = await Promise.all([getCopy(), getSessionUser(), listPlaytestShares()]);
  const configured = isSupabaseConfigured();

  return (
    <>
      <PageHero kicker={copy.shareKicker} title={copy.shareTitle} lede={copy.shareLede} />
      <PageShell>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="panel p-6">
            {user ? (
              <>
                {ok ? <p className="mb-4 text-sm text-muted-foreground">{copy.replyPosted}</p> : null}
                <ShareForm copy={copy} error={error} />
              </>
            ) : (
              <div className="space-y-4">
                <p className="text-sm leading-7">{copy.shareNeedSignIn}</p>
                <GitHubSignIn label={copy.signInGitHub} nextPath="/help/share" disabled={!configured} />
                <MicrosoftSignIn label={copy.signInMicrosoft} nextPath="/help/share" disabled={!configured} />
                {!configured ? <p className="text-sm text-brand-red">{copy.setupNeeded}</p> : null}
              </div>
            )}
          </div>
          <aside className="space-y-4">
            {shares.map((share) => (
              <article key={share.id} className="panel p-5">
                <h2 className="text-lg font-bold italic">{share.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {authorLabel(copy, { isAnonymous: share.is_anonymous, profile: share.profiles })}
                </p>
                <BadgeRow badges={share.badges} copy={copy} />
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{share.what_to_try}</p>
                {share.link ? (
                  <a
                    href={share.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm font-semibold text-brand-red hover:underline"
                  >
                    {share.link}
                  </a>
                ) : null}
              </article>
            ))}
          </aside>
        </div>
      </PageShell>
    </>
  );
}
