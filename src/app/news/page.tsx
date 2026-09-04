import type { Metadata } from "next";
import { NewsFilter } from "@/components/news-filter";
import { PageHero } from "@/components/page-hero";
import { getHub } from "@/lib/hub";

export const metadata: Metadata = {
  title: "News",
  description:
    "Tiger Studio news pointers — studio notes and project mentions hosted on the sites that own them.",
};

export default async function NewsPage() {
  const hub = await getHub();

  return (
    <>
      <PageHero
        kicker="Studio news"
        title="News that lives on other sites"
        lede="This list is pulled live from GitHub. Each card opens the original repository, issue, or page that owns the story."
      />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <NewsFilter items={hub.news} />
      </div>
    </>
  );
}
