import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { StudioLink } from "@/components/studio-link";
import { getHub } from "@/lib/hub";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products",
  description: "Public Tiger Studio products, boards, and destinations.",
};

export default async function ProductsPage() {
  const hub = await getHub();

  return (
    <>
      <PageHero
        kicker="Products"
        title="What the studio ships"
        lede="Public repositories, the ideas board, and the websites those projects point to."
      />
      <PageShell>
        <article className="panel p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">Board</p>
          <h2 className="mt-2 text-2xl font-bold italic">Proj.Help</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            Post a project idea and ask for help. Members can reply, and posts can be translated
            between English and Chinese. Sign in with GitHub or Microsoft.
          </p>
          <Link href="/join" className="btn btn-red mt-5">
            Open Join
          </Link>
        </article>

        <h2 className="mt-12 text-2xl font-bold italic">Public projects</h2>
        <span className="rule-yellow mt-3" />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {hub.destinations.map((destination) => (
            <StudioLink
              key={destination.slug}
              href={destination.url}
              className="panel lift-card p-5 hover:border-brand-red"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {destination.category}
              </p>
              <h3 className="mt-2 text-xl font-bold">{destination.name}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{destination.description}</p>
            </StudioLink>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/news" className="text-sm font-semibold text-brand-red hover:underline">
            News pointers →
          </Link>
          <Link href="/changelog" className="text-sm font-semibold text-brand-red hover:underline">
            Changelog →
          </Link>
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-brand-red hover:underline"
          >
            GitHub →
          </a>
        </div>
      </PageShell>
    </>
  );
}
