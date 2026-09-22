import { HomeLinks } from "@/components/home-links";
import { HomeStory } from "@/components/home-story";
import { OrbitHero } from "@/components/orbit-hero";
import { clubProductDestinations, getHub } from "@/lib/hub";
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
      <HomeStory copy={copy} products={clubProductDestinations(hub.destinations)} />
      <HomeLinks
        links={[
          { href: "/join", title: copy.join, body: copy.homeJoinBody },
          { href: "/help", title: copy.help, body: copy.homeHelpBody },
          { href: "/news", title: copy.news, body: copy.resourcesNewsBody },
          { href: "/docs", title: copy.docs, body: copy.aboutDocs },
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
