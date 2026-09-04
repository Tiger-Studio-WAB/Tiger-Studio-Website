import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Docs",
  description: "Tiger Studio documentation will live here once a docs repository exists.",
};

export default function DocsPage() {
  return (
    <>
      <PageHero
        kicker="Docs"
        title="Documentation is not wired yet"
        lede="This page is a placeholder. The organization does not have dedicated docs or support repositories to point at."
      />
      <PageShell>
        <article className="panel max-w-2xl p-6">
          <h2 className="text-2xl font-bold italic">Set up two repos</h2>
          <span className="rule-yellow mt-3" />
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Create public repositories named <code className="font-semibold">docs</code> and{" "}
            <code className="font-semibold">support</code> on the Tiger Studio GitHub organization.
            Put guides in docs and issue templates or help copy in support. This site will pick them
            up from GitHub like the other products.
          </p>
          <ol className="mt-6 list-decimal space-y-2 pl-5 text-sm leading-7">
            <li>
              Create{" "}
              <a
                href={`${site.links.github}/docs`}
                className="font-semibold text-brand-red hover:underline"
              >
                docs
              </a>
            </li>
            <li>
              Create{" "}
              <a
                href={`${site.links.github}/support`}
                className="font-semibold text-brand-red hover:underline"
              >
                support
              </a>
            </li>
            <li>Optional: set each repo&apos;s homepage to the published docs URL.</li>
          </ol>
        </article>
      </PageShell>
    </>
  );
}
