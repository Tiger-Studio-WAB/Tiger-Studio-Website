import { getHub } from "@/lib/hub";
import { listNewsPosts } from "@/lib/news";
import { site } from "@/lib/site";

export const revalidate = 120;

export async function GET() {
  const [hub, articles] = await Promise.all([getHub(), listNewsPosts("en")]);
  const body = {
    organization: site.name,
    tagline: site.tagline,
    generatedAt: hub.fetchedAt,
    ok: hub.ok,
    pointers: hub.pointers,
    destinations: hub.destinations,
    news: articles.length
      ? articles.map((post) => ({
          slug: post.slug,
          title: post.title,
          excerpt: post.summary,
          date: post.date,
          url: `${site.url}${post.href}`,
          source: post.source,
          author: post.author,
        }))
      : hub.news,
    changelog: hub.changelog,
    stats: hub.stats,
    languages: hub.languages,
    languageStats: hub.languageStats,
    recentCommits: hub.recentCommits,
    pullRequestCount: hub.pullRequestCount,
    commitCount: hub.commitCount,
  };

  return Response.json(body, {
    headers: {
      "Cache-Control": "public, s-maxage=120, stale-while-revalidate=3600",
    },
  });
}
