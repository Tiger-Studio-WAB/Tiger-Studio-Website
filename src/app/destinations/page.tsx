import type { Metadata } from "next";
import { DestinationFilter } from "@/components/destination-filter";
import { PageHero } from "@/components/page-hero";
import { getHub } from "@/lib/hub";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "A directory of websites Tiger Studio points to — GitHub, project repos, and the tools we ship with.",
};

export default async function DestinationsPage() {
  const hub = await getHub();

  return (
    <>
      <PageHero
        kicker="Quick links"
        title="Other websites we point to"
        lede="Public repositories are loaded from GitHub as they appear. If a repo has a homepage, we point there instead of the source tree."
      />
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <DestinationFilter items={hub.destinations} />
      </div>
    </>
  );
}
