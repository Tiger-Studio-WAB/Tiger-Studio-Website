import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { getSupportPage } from "@/lib/docs";
import { getCopy } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await getCopy();
  return { title: copy.support, description: copy.supportLede };
}

export default async function SupportPage() {
  const { locale, copy } = await getCopy();
  const support = await getSupportPage(locale);

  return (
    <>
      <PageHero kicker={copy.supportKicker} title={copy.supportTitle} lede={copy.supportLede} />
      <PageShell>
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="panel p-6 lg:col-span-2">
            <h2 className="text-2xl font-bold italic">{copy.supportWhatTitle}</h2>
            <span className="rule-yellow mt-3" />
            <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
              <li>{copy.supportBulletSignin}</li>
              <li>{copy.supportBulletBroken}</li>
              <li>{copy.supportBulletHuman}</li>
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
              <a href={support.issuesUrl} target="_blank" rel="noopener noreferrer" className="btn btn-red">
                {copy.supportOpenIssue}
              </a>
              <a
                href={support.issuesListUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-brand-red hover:underline"
              >
                {copy.supportOpenIssues}
              </a>
            </div>
          </article>
          <aside className="space-y-4">
            <div className="panel p-5">
              <p className="section-kicker">{copy.docs}</p>
              <h2 className="mt-2 text-lg font-bold italic">{copy.supportDocsTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.supportDocsBody}</p>
              <Link href="/docs" className="mt-4 inline-block text-sm font-semibold text-brand-red hover:underline">
                {copy.supportOpenDocs}
              </Link>
            </div>
            <div className="panel p-5">
              <p className="section-kicker">{copy.join}</p>
              <h2 className="mt-2 text-lg font-bold italic">{copy.supportJoinTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.supportJoinBody}</p>
              <Link href="/join" className="mt-4 inline-block text-sm font-semibold text-brand-red hover:underline">
                {copy.supportOpenJoin}
              </Link>
            </div>
            <div className="panel p-5">
              <p className="section-kicker">{copy.docsSource}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {copy.supportSource}{" "}
                <a
                  href={support.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-red hover:underline"
                >
                  {copy.supportRepo}
                </a>
                .
              </p>
            </div>
          </aside>
        </div>
      </PageShell>
    </>
  );
}
