import { HomeLinks } from "@/components/home-links";
import { OrbitHero } from "@/components/orbit-hero";
import { getHub } from "@/lib/hub";
import { getCopy } from "@/lib/locale";
import { site } from "@/lib/site";

export default async function HomePage() {
  const [hub, { copy }] = await Promise.all([getHub(), getCopy()]);

  return (
    <>
      <JsonLd />
      <OrbitHero
        languages={hub.languageStats}
        recentCommits={hub.recentCommits}
        pullRequestCount={hub.pullRequestCount}
        commitCount={hub.commitCount}
        copy={copy}
      />
      <HomeLinks
        links={[
          { href: "/products", title: copy.products, body: copy.homeProductsBody },
          { href: "/about", title: copy.about, body: copy.homeAboutBody },
          { href: "/join", title: copy.join, body: copy.homeJoinBody },
          { href: "/help", title: copy.help, body: copy.homeHelpBody },
        ]}
      />
    </>
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
