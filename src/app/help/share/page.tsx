import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { EmptyState } from "@/components/empty-state";
import { GitHubSignIn } from "@/components/github-sign-in";
import { MicrosoftSignIn } from "@/components/microsoft-sign-in";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { ShareForm } from "@/components/share-form";
import { SharePreview } from "@/components/share-preview";
import { getSessionUser } from "@/lib/auth";
import { listPlaytestShares } from "@/lib/data";
import { getCopy } from "@/lib/locale";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await getCopy();
  return { title: `${copy.helpNavShare} · ${copy.help}`, description: copy.shareLede };
}

export default async function HelpSharePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; ok?: string; share_id?: string }>;
}) {
  const { error, ok, share_id } = await searchParams;
  if (share_id) redirect(`/help/share/${share_id}`);

  const [{ copy }, user, shares] = await Promise.all([getCopy(), getSessionUser(), listPlaytestShares()]);
  const configured = isSupabaseConfigured();

  return (
    <>
      <PageHero kicker={copy.shareKicker} title={copy.shareTitle} lede={copy.shareLede} />
      <PageShell>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="panel p-6" data-reveal>
            {user ? (
              <>
                {ok ? <p className="mb-4 text-sm text-muted-foreground">{copy.sharePosted}</p> : null}
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
          <aside className="space-y-4" data-reveal>
            {shares.length === 0 ? (
              <EmptyState title={copy.shareEmptyTitle} body={copy.shareEmptyBody} />
            ) : (
              shares.map((share) => (
                <SharePreview key={share.id} share={share} copy={copy} href={`/help/share/${share.id}`} compact />
              ))
            )}
          </aside>
        </div>
      </PageShell>
    </>
  );
}
