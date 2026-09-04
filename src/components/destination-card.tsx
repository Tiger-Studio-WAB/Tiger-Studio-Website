import { ExternalLink } from "@/components/external-link";
import { hostname } from "@/lib/format";
import type { Destination } from "@/lib/content";

const accents: Record<Destination["accent"], string> = {
  red: "bg-wab-red",
  blue: "bg-wab-blue",
  gold: "bg-wab-gold",
  teal: "bg-wab-teal",
  purple: "bg-wab-purple",
  orange: "bg-wab-orange",
};

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <article className="flex h-full flex-col overflow-hidden bg-navy text-white">
      <div className={`h-2 ${accents[destination.accent]}`} />
      <div className="flex flex-1 flex-col gap-4 p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-wab-gold">
          {destination.category}
        </p>
        <h3 className="text-2xl font-semibold leading-snug">{destination.name}</h3>
        <p className="flex-1 text-[0.98rem] leading-relaxed text-white/75">
          {destination.description}
        </p>
        <ExternalLink
          href={destination.url}
          className="mt-2 inline-flex items-center text-sm font-semibold text-wab-gold hover:text-white"
        >
          Go to {hostname(destination.url)} →
        </ExternalLink>
      </div>
    </article>
  );
}
