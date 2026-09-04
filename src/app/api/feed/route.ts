import { getHub } from "@/lib/hub";
import { site } from "@/lib/site";

export const revalidate = 120;

export async function GET() {
  const hub = await getHub();
  const body = {
    organization: site.name,
    tagline: site.tagline,
    generatedAt: hub.fetchedAt,
    ok: hub.ok,
    pointers: hub.pointers,
    destinations: hub.destinations,
    news: hub.news,
    changelog: hub.changelog,
    stats: hub.stats,
    languages: hub.languages,
    pullRequestCount: hub.pullRequestCount,
    commitCount: hub.commitCount,
  };

  return Response.json(body, {
    headers: {
      "Cache-Control": "public, s-maxage=120, stale-while-revalidate=3600",
    },
  });
}
