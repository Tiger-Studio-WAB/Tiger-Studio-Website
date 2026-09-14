import type { Metadata } from "next";
import Link from "next/link";
import { BadgeRow } from "@/components/badge-row";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { SharePreview } from "@/components/share-preview";
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
  const showNotes = shares.length > 0 || feedback.length > 0;

  return (
    <>
      <PageHero kicker={copy.helpKicker} title={copy.helpTitle} lede={copy.helpLede} />
      <PageShell>
        <div className={`grid gap-6 ${showNotes ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
          <article className="panel p-6" data-reveal>
            <p className="section-kicker">{copy.helpKickerShares}</p>
            <h2 className="mt-2 text-2xl font-bold italic">{copy.helpRecentShares}</h2>
            <div className="mt-5 space-y-4">
              {shares.length === 0 ? (
                <p className="text-sm leading-7 text-muted-foreground">{copy.shareFirstHint}</p>
              ) : (
                shares.slice(0, 4).map((share) => (
                  <SharePreview
                    key={share.id}
                    share={share}
                    copy={copy}
                    href={`/help/share/${share.id}`}
                    compact
                    framed={false}
                  />
                ))
              )}
            </div>
            <Link href="/help/share" className="mt-5 inline-block text-sm font-semibold text-brand-red hover:underline">
              {copy.helpOpenShare}
            </Link>
          </article>

          {showNotes ? (
            <article className="panel p-6" data-reveal>
              <p className="section-kicker">{copy.helpKickerNotes}</p>
              <h2 className="mt-2 text-2xl font-bold italic">{copy.helpRecentFeedback}</h2>
              <div className="mt-5 space-y-4">
                {feedback.length === 0 ? (
                  <p className="text-sm leading-7 text-muted-foreground">{copy.helpEmptyFeedback}</p>
                ) : (
                  feedback.slice(0, 4).map((item) => {
                    const href = item.share_id ? `/help/share/${item.share_id}` : undefined;
                    const inner = (
                      <>
                        <h3 className="font-bold">{item.target}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {authorLabel(copy, { isAnonymous: item.is_anonymous, profile: item.profiles })}
                        </p>
                        <BadgeRow badges={item.badges} copy={copy} />
                        <p className="mt-2 line-clamp-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
                      </>
                    );
                    return href ? (
                      <Link
                        key={item.id}
                        href={href}
                        className="tap-card block border-t border-border pt-4 first:border-t-0 first:pt-0"
                      >
                        {inner}
                      </Link>
                    ) : (
                      <div key={item.id} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
                        {inner}
                      </div>
                    );
                  })
                )}
              </div>
            </article>
          ) : null}

          <aside className="space-y-4" data-reveal>
            <div className="panel p-5">
              <p className="section-kicker">{copy.helpKickerBadges}</p>
              <h2 className="mt-2 text-lg font-bold italic">{copy.helpHowBadges}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{copy.helpHowBadgesBody}</p>
            </div>
            <Link href="/help/resources" className="panel tap-card block p-5">
              <p className="section-kicker">{copy.helpNavResources}</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{copy.resourcesLede}</p>
              <p className="mt-4 text-sm font-semibold text-brand-red">{copy.helpOpenResources}</p>
            </Link>
          </aside>
        </div>
      </PageShell>
    </>
  );
}
