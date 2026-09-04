import type { Metadata } from "next";
import { DestinationFilter } from "@/components/destination-filter";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "A directory of websites Tiger Studio points to — WAB, Learning News, GitHub, leadership, and club projects.",
};

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        kicker="Quick links"
        title="Other websites we point to"
        lede="Use this directory the way an organization uses a mega-menu: school, news, engineering, community, and learning — each card leaves Tiger Studio on purpose."
      />
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <DestinationFilter />
      </div>
    </>
  );
}
