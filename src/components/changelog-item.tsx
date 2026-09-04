import { ExternalLink } from "@/components/external-link";
import { formatDate, hostname } from "@/lib/format";
import type { Pointer } from "@/lib/content";

export function ChangelogItem({ pointer }: { pointer: Pointer }) {
  return (
    <li className="grid gap-4 border-b border-studio-line py-8 md:grid-cols-[9rem_1fr]">
      <time dateTime={pointer.date} className="text-sm font-semibold uppercase tracking-[0.12em] text-studio-muted">
        {formatDate(pointer.date)}
      </time>
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-studio-red">
          {pointer.category} · {pointer.source}
        </p>
        <h3 className="text-2xl font-semibold text-navy">
          <ExternalLink href={pointer.url} className="hover:text-studio-red">
            {pointer.title}
          </ExternalLink>
        </h3>
        <p className="mt-3 max-w-2xl leading-relaxed text-studio-muted">{pointer.excerpt}</p>
        <p className="mt-4 text-sm font-semibold text-studio-blue">
          Open changelog on {hostname(pointer.url)} →
        </p>
      </div>
    </li>
  );
}
