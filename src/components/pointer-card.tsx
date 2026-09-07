import { ExternalLink } from "@/components/external-link";
import { formatDate, hostname } from "@/lib/format";
import type { Pointer } from "@/lib/types";

const accents: Record<Pointer["kind"], string> = {
  news: "bg-studio-red",
  post: "bg-studio-blue",
  changelog: "bg-studio-gold",
};

export function PointerCard({ pointer }: { pointer: Pointer }) {
  return (
    <article className="pointer-card group relative z-[1] flex h-full flex-col border border-studio-line bg-white transition hover:z-10 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(14,32,52,0.08)]">
      <div className={`h-1.5 ${accents[pointer.kind]}`} />
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.14em] text-studio-muted">
          <span>{pointer.source}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={pointer.date}>{formatDate(pointer.date)}</time>
        </div>
        <h3 className="text-xl font-semibold leading-snug text-navy">
          <ExternalLink href={pointer.url} className="hover:text-studio-red">
            {pointer.title}
          </ExternalLink>
        </h3>
        <p className="flex-1 text-[0.98rem] leading-relaxed text-studio-muted">{pointer.excerpt}</p>
        <p className="text-sm font-semibold text-studio-blue">
          Read on {hostname(pointer.url)} →
        </p>
      </div>
    </article>
  );
}
