import type { Metadata } from "next";
import { BadgeRow } from "@/components/badge-row";
import { FeedbackForm } from "@/components/feedback-form";
import { GitHubSignIn } from "@/components/github-sign-in";
import { MicrosoftSignIn } from "@/components/microsoft-sign-in";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { getSessionUser } from "@/lib/auth";
import { listPlaytestShares, listProductFeedback } from "@/lib/data";
import { authorLabel } from "@/lib/display-name";
import { getCopy } from "@/lib/locale";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await getCopy();
  return { title: `${copy.helpNavFeedback} · ${copy.help}`, description: copy.feedbackLede };
}

export default async function HelpFeedbackPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; ok?: string }>;
}) {
  const { error, ok } = await searchParams;
  const [{ copy }, user, shares, feedback] = await Promise.all([
    getCopy(),
    getSessionUser(),
    listPlaytestShares(),
    listProductFeedback(),
  ]);
  const configured = isSupabaseConfigured();

  return (
    <>
      <PageHero kicker={copy.feedbackKicker} title={copy.feedbackTitle} lede={copy.feedbackLede} />
      <PageShell>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="panel p-6">
            {user ? (
              <>
                {ok ? <p className="mb-4 text-sm text-muted-foreground">{copy.feedbackPosted}</p> : null}
                <FeedbackForm copy={copy} shares={shares} error={error} />
              </>
            ) : (
              <div className="space-y-4">
                <p className="text-sm leading-7">{copy.feedbackNeedSignIn}</p>
                <GitHubSignIn label={copy.signInGitHub} nextPath="/help/feedback" disabled={!configured} />
                <MicrosoftSignIn label={copy.signInMicrosoft} nextPath="/help/feedback" disabled={!configured} />
                {!configured ? <p className="text-sm text-brand-red">{copy.setupNeeded}</p> : null}
              </div>
            )}
          </div>
          <aside className="space-y-4">
            {feedback.map((item) => (
              <article key={item.id} className="panel p-5">
                <h2 className="text-lg font-bold italic">{item.target}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {authorLabel(copy, { isAnonymous: item.is_anonymous, profile: item.profiles })}
                </p>
                <BadgeRow badges={item.badges} copy={copy} />
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </aside>
        </div>
      </PageShell>
    </>
  );
}
