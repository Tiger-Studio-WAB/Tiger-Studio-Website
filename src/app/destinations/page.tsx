import type { Metadata } from "next";
import { DestinationFilter } from "@/components/destination-filter";
import { PageHero } from "@/components/page-hero";
import { getHub, otherSiteDestinations } from "@/lib/hub";
import { getCopy } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await getCopy();
  return { title: copy.destinations, description: copy.destinationsLede };
}

export default async function DestinationsPage() {
  const [hub, { copy }] = await Promise.all([getHub(), getCopy()]);

  return (
    <>
      <PageHero
        kicker={copy.destinationsKicker}
        title={copy.destinationsTitle}
        lede={copy.destinationsLede}
      />
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <DestinationFilter items={otherSiteDestinations(hub.destinations)} />
      </div>
    </>
  );
}
