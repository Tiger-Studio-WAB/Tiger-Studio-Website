import type { Metadata } from "next";
import { NewsFilter } from "@/components/news-filter";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "News",
  description:
    "Tiger Studio news pointers — studio notes and project mentions hosted on the sites that own them.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        kicker="Studio news"
        title="News that lives on other sites"
        lede="Tiger Studio does not republish those stories. Each card opens the original note, repository, or board on the website that owns it."
      />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <NewsFilter />
      </div>
    </>
  );
}
