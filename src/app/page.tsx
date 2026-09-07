import { HomeLinks } from "@/components/home-links";
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
      <HomeLinks />
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
