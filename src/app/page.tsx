import Link from "next/link";
import { OrbitHero } from "@/components/orbit-hero";
import { getHub } from "@/lib/hub";
import { site } from "@/lib/site";

export default async function HomePage() {
  const hub = await getHub();

  return (
    <>
      <JsonLd />
      <OrbitHero
        languages={hub.languageStats}
        recentCommits={hub.recentCommits}
        pullRequestCount={hub.pullRequestCount}
        commitCount={hub.commitCount}
      />
      <section className="mx-auto grid w-full max-w-6xl gap-4 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <HomeLink href="/products" title="Products" body="Public projects the studio ships." />
        <HomeLink href="/about" title="About" body="What Tiger Studio is, and how the hub works." />
        <HomeLink href="/join" title="Join" body="Post ideas, reply, and ship with the club." />
        <HomeLink href="/docs" title="Docs" body="Handbook from folders and Markdown. Support is a separate page." />
      </section>
    </>
  );
}

function HomeLink({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <Link href={href} className="panel p-5 hover:border-brand-red">
      <h2 className="text-xl font-bold italic">{title}</h2>
      <span className="rule-yellow mt-3 w-16" />
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
    </Link>
  );
}

function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: site.name,
          description: site.description,
          url: site.url,
        }),
      }}
    />
  );
}
