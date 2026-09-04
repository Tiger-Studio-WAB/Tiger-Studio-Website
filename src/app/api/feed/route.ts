import { destinations, pointers } from "@/lib/content";
import { site } from "@/lib/site";

export function GET() {
  const body = {
    organization: site.name,
    tagline: site.tagline,
    generatedAt: new Date().toISOString(),
    pointers,
    destinations,
  };

  return Response.json(body, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
