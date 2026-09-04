import type { Metadata } from "next";
import { NewsFilter } from "@/components/news-filter";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "News",
  description:
    "Tiger Studio news pointers — campus stories, podcasts, and club mentions hosted on WAB and other sites.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        kicker="Learning News"
        title="News that lives on other sites"
        lede="Learning at WAB is dynamic. Tiger Studio does not republish those stories. Each card opens the original article, podcast, or board on the website that owns it."
      />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <NewsFilter />
      </div>
    </>
  );
}
