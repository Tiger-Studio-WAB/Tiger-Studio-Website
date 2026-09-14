import type { Metadata } from "next";
import Link from "next/link";
import { BadgeRow } from "@/components/badge-row";
import { EmptyState } from "@/components/empty-state";
import { FeedbackForm } from "@/components/feedback-form";
import { GitHubSignIn } from "@/components/github-sign-in";
import { MicrosoftSignIn } from "@/components/microsoft-sign-in";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { SharePreview } from "@/components/share-preview";
import { getSessionUser } from "@/lib/auth";
import { getPlaytestShare, listProductFeedbackForShare } from "@/lib/data";
import { authorLabel } from "@/lib/display-name";
import { getCopy } from "@/lib/locale";
import { isSupabaseConfigured } from "@/lib/supabase/env";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; ok?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const [{ copy }, share] = await Promise.all([getCopy(), getPlaytestShare(id)]);
  return {
    title: `${share?.title ?? copy.shareNotFoundTitle} · ${copy.help}`,
    description: copy.feedbackLede,
  };
}

export default async function HelpShareDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { error, ok } = await searchParams;
  const [{ copy }, user, share, feedback] = await Promise.all([
    getCopy(),
    getSessionUser(),
    getPlaytestShare(id),
    listProductFeedbackForShare(id),
  ]);
  const configured = isSupabaseConfigured();
  const nextPath = `/help/share/${id}`;

  if (!share) {
    return (
      <>
        <PageHero kicker={copy.helpNavShare} title={copy.shareNotFoundTitle} lede={copy.shareNotFoundBody} />
        <PageShell>
          <Link href="/help/share" className="text-sm font-semibold text-brand-red hover:underline">
            ← {copy.shareBack}
          </Link>
          <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
            <Link href="/help/resources" className="text-brand-red hover:underline">
              {copy.helpOpenResources}
            </Link>
            <Link href="/docs" className="text-brand-red hover:underline">
              {copy.supportOpenDocs}
            </Link>
          </p>
        </PageShell>
      </>
    );
  }

  return (
    <>
      <PageHero kicker={copy.helpNavShare} title={share.title} lede={copy.feedbackLede} />
      <PageShell>
        <Link href="/help/share" className="text-sm font-semibold text-brand-red hover:underline">
          ← {copy.shareBack}
        </Link>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6" data-reveal>
            <SharePreview share={share} copy={copy} />
            <section className="panel p-6">
              <p className="section-kicker">{copy.helpNavFeedback}</p>
              <h2 className="mt-2 text-2xl font-bold italic">{copy.shareFeedbackTitle}</h2>
              {ok ? <p className="mt-4 text-sm text-muted-foreground">{copy.feedbackPosted}</p> : null}
              {user ? (
                <div className="mt-5">
                  <FeedbackForm copy={copy} shareId={share.id} error={error} />
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  <p className="text-sm leading-7">{copy.feedbackNeedSignIn}</p>
                  <GitHubSignIn label={copy.signInGitHub} nextPath={nextPath} disabled={!configured} />
                  <MicrosoftSignIn label={copy.signInMicrosoft} nextPath={nextPath} disabled={!configured} />
                  {!configured ? <p className="text-sm text-brand-red">{copy.setupNeeded}</p> : null}
                </div>
              )}
            </section>
          </div>
          <aside className="space-y-4" data-reveal>
            <p className="section-kicker">{copy.helpRecentFeedback}</p>
            {feedback.length === 0 ? (
              <EmptyState title={copy.shareFeedbackEmpty} body={copy.helpFeedbackHint} />
            ) : (
              feedback.map((item) => (
                <article key={item.id} className="panel p-5">
                  <p className="text-sm text-muted-foreground">
                    {authorLabel(copy, { isAnonymous: item.is_anonymous, profile: item.profiles })}
                  </p>
                  <BadgeRow badges={item.badges} copy={copy} />
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
                </article>
              ))
            )}
          </aside>
        </div>
      </PageShell>
    </>
  );
}
