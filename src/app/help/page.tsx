import type { Metadata } from "next";
import Link from "next/link";
import { BadgeRow } from "@/components/badge-row";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { listPlaytestShares, listProductFeedback } from "@/lib/data";
import { authorLabel } from "@/lib/display-name";
import { getCopy } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await getCopy();
  return { title: copy.help, description: copy.helpLede };
}

export default async function HelpHomePage() {
  const { copy } = await getCopy();
  const [shares, feedback] = await Promise.all([listPlaytestShares(), listProductFeedback()]);

  return (
    <>
      <PageHero kicker={copy.helpKicker} title={copy.helpTitle} lede={copy.helpLede} />
      <PageShell>
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="panel p-6">
            <p className="section-kicker">{copy.helpRecentShares}</p>
            <h2 className="mt-2 text-2xl font-bold italic">{copy.helpRecentShares}</h2>
            <div className="mt-5 space-y-4">
              {shares.length === 0 ? (
                <p className="text-sm leading-7 text-muted-foreground">{copy.helpEmptyShares}</p>
              ) : (
                shares.slice(0, 4).map((share) => (
                  <div key={share.id} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
                    <h3 className="font-bold">{share.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {authorLabel(copy, { isAnonymous: share.is_anonymous, profile: share.profiles })}
                    </p>
                    <BadgeRow badges={share.badges} copy={copy} />
                    <p className="mt-2 line-clamp-3 text-sm leading-7 text-muted-foreground">{share.what_to_try}</p>
                  </div>
                ))
              )}
            </div>
            <Link href="/help/share" className="mt-5 inline-block text-sm font-semibold text-brand-red hover:underline">
              {copy.helpOpenShare}
            </Link>
          </article>

          <article className="panel p-6">
            <p className="section-kicker">{copy.helpRecentFeedback}</p>
            <h2 className="mt-2 text-2xl font-bold italic">{copy.helpRecentFeedback}</h2>
            <div className="mt-5 space-y-4">
              {feedback.length === 0 ? (
                <p className="text-sm leading-7 text-muted-foreground">{copy.helpEmptyFeedback}</p>
              ) : (
                feedback.slice(0, 4).map((item) => (
                  <div key={item.id} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
                    <h3 className="font-bold">{item.target}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {authorLabel(copy, { isAnonymous: item.is_anonymous, profile: item.profiles })}
                    </p>
                    <BadgeRow badges={item.badges} copy={copy} />
                    <p className="mt-2 line-clamp-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
                  </div>
                ))
              )}
            </div>
            <Link href="/help/feedback" className="mt-5 inline-block text-sm font-semibold text-brand-red hover:underline">
              {copy.helpOpenFeedback}
            </Link>
          </article>

          <aside className="space-y-4">
            <div className="panel p-5">
              <p className="section-kicker">{copy.helpHowBadges}</p>
              <h2 className="mt-2 text-lg font-bold italic">{copy.helpHowBadges}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{copy.helpHowBadgesBody}</p>
            </div>
            <div className="panel p-5">
              <p className="section-kicker">{copy.helpNavResources}</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{copy.resourcesLede}</p>
              <Link href="/help/resources" className="mt-4 inline-block text-sm font-semibold text-brand-red hover:underline">
                {copy.helpOpenResources}
              </Link>
            </div>
          </aside>
        </div>
      </PageShell>
    </>
  );
}
