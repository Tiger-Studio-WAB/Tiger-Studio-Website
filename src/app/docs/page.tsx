import type { Metadata } from "next";
import Link from "next/link";
import { MarkdownDoc } from "@/components/markdown-doc";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { getDocsGuide, getSupportGuide, studioRepoUrl, supportIssuesUrl } from "@/lib/docs";
import { DOCS_REPO, SUPPORT_REPO } from "@/lib/github";

export const metadata: Metadata = {
  title: "Docs",
  description: "Tiger Studio documentation from the public docs repository.",
};

export default async function DocsPage() {
  const [docs, support] = await Promise.all([getDocsGuide(), getSupportGuide()]);
  const overview = docs?.pages.find((page) => page.slug === "readme");
  const guides = docs?.pages.filter((page) => page.slug !== "readme") ?? [];
  const supportOverview = support?.pages.find((page) => page.slug === "readme");

  return (
    <>
      <PageHero
        kicker="Docs"
        title="Guides from the studio"
        lede="These pages are read from the public docs repository. Support lives in its own repo and is linked below."
      />
      <PageShell>
        {docs ? (
          <article className="panel max-w-3xl p-6">
            {overview ? <MarkdownDoc source={overview.markdown} /> : (
              <p className="text-sm leading-7 text-muted-foreground">
                The docs repository is public, but it does not have a README yet.
              </p>
            )}
            {guides.length ? (
              <div className="mt-8">
                <h2 className="text-xl font-bold italic">More guides</h2>
                <span className="rule-yellow mt-3" />
                <ul className="mt-5 space-y-3">
                  {guides.map((guide) => (
                    <li key={guide.slug}>
                      <Link href={guide.href} className="font-semibold text-brand-red hover:underline">
                        {guide.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <p className="mt-8 text-sm leading-7 text-muted-foreground">
              Source:{" "}
              <a
                href={docs.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-red hover:underline"
              >
                {DOCS_REPO} on GitHub
              </a>
              . Add more Markdown files there and they will show up here.
            </p>
          </article>
        ) : (
          <article className="panel max-w-3xl p-6">
            <h2 className="text-2xl font-bold italic">Docs repo is not reachable</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              The site expects a public{" "}
              <a
                href={studioRepoUrl(DOCS_REPO)}
                className="font-semibold text-brand-red hover:underline"
              >
                docs
              </a>{" "}
              repository. If it was just created, wait a minute and refresh.
            </p>
          </article>
        )}

        <article id="support" className="panel mt-8 max-w-3xl scroll-mt-24 p-6">
          <p className="section-kicker">Support</p>
          <h2 className="mt-2 text-2xl font-bold italic">Get help</h2>
          <span className="rule-yellow mt-3" />
          {supportOverview ? (
            <div className="mt-5">
              <MarkdownDoc source={supportOverview.markdown} />
            </div>
          ) : (
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Help copy and issue templates live in the public support repository.
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={supportIssuesUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-red">
              Open a support issue
            </a>
            <a
              href={studioRepoUrl(SUPPORT_REPO)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-white border border-brand-red"
            >
              Support repo
            </a>
          </div>
        </article>
      </PageShell>
    </>
  );
}
