import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { getCopy } from "@/lib/locale";
import { site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await getCopy();
  return { title: `${copy.helpNavResources} · ${copy.help}`, description: copy.resourcesLede };
}

export default async function HelpResourcesPage() {
  const { copy } = await getCopy();
  const cards = [
    { href: "/docs", title: copy.resourcesHandbook, body: copy.resourcesHandbookBody },
    { href: "/support", title: copy.support, body: copy.resourcesSupportBody },
    { href: "/ideas", title: copy.ideas, body: copy.resourcesIdeasBody },
    { href: "/news", title: copy.news, body: copy.resourcesNewsBody },
    { href: site.links.github, title: "GitHub", body: copy.joinGithubNote, external: true },
  ];

  return (
    <>
      <PageHero kicker={copy.resourcesKicker} title={copy.resourcesTitle} lede={copy.resourcesLede} />
      <PageShell>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) =>
            card.external ? (
              <a
                key={card.href}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="panel tap-card p-5"
                data-reveal
              >
                <h2 className="text-xl font-bold italic">{card.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{card.body}</p>
              </a>
            ) : (
              <Link key={card.href} href={card.href} className="panel tap-card p-5" data-reveal>
                <h2 className="text-xl font-bold italic">{card.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{card.body}</p>
              </Link>
            ),
          )}
        </div>
      </PageShell>
    </>
  );
}
