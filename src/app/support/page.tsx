import type { Metadata } from "next";
import Link from "next/link";
import { MarkdownDoc } from "@/components/markdown-doc";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { getSupportPage } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Support",
  description: "Get help with Tiger Studio accounts, the ideas board, and the public hub.",
};

export default async function SupportPage() {
  const support = await getSupportPage();

  return (
    <>
      <PageHero
        kicker="Support"
        title="Get help"
        lede="Support is for problems and questions. Guides and how-tos live in Docs."
      />
      <PageShell>
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="panel p-6 lg:col-span-2">
            <h2 className="text-2xl font-bold italic">What to use this for</h2>
            <span className="rule-yellow mt-3" />
            <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
              <li>Sign-in did not finish (GitHub or Microsoft)</li>
              <li>A page on this site is broken or missing</li>
              <li>You need a human from the club</li>
            </ul>
            {support.body ? (
              <div className="mt-8">
                <MarkdownDoc source={support.body} />
              </div>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={support.issuesUrl} target="_blank" rel="noopener noreferrer" className="btn btn-red">
                Open a support issue
              </a>
              <a
                href={support.issuesListUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-white border border-brand-red"
              >
                Open issues
              </a>
            </div>
          </article>
          <aside className="space-y-4">
            <div className="panel p-5">
              <p className="section-kicker">Docs</p>
              <h2 className="mt-2 text-lg font-bold italic">Looking up how something works?</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Product guides and writing rules are in the handbook, not here.
              </p>
              <Link href="/docs" className="mt-4 inline-block text-sm font-semibold text-brand-red hover:underline">
                Open docs →
              </Link>
            </div>
            <div className="panel p-5">
              <p className="section-kicker">Join</p>
              <h2 className="mt-2 text-lg font-bold italic">Ideas board</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Post an idea or reply after you sign in.
              </p>
              <Link href="/join" className="mt-4 inline-block text-sm font-semibold text-brand-red hover:underline">
                Open Join →
              </Link>
            </div>
            <div className="panel p-5">
              <p className="section-kicker">Source</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Issue templates live in the{" "}
                <a
                  href={support.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-red hover:underline"
                >
                  support repository
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
