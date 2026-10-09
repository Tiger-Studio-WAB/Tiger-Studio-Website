import { StudioHome } from "@/components/studio-home";
import { getHub } from "@/lib/hub";
import { getCopy } from "@/lib/locale";
import { site } from "@/lib/site";

export default async function HomePage() {
  const [hub, { copy }] = await Promise.all([getHub(), getCopy()]);

  return (
    <>
      <JsonLd />
      <StudioHome
        copy={copy}
        motto={site.motto}
        commitCount={hub.commitCount}
        pullRequestCount={hub.pullRequestCount}
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
