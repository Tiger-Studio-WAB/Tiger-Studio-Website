import Link from "next/link";
import { BadgeRow } from "@/components/badge-row";
import { authorLabel } from "@/lib/display-name";
import type { PlaytestShare } from "@/lib/help-types";
import type { UiCopy } from "@/lib/i18n";
import { safeHttpUrl } from "@/lib/urls";

export function SharePreview({
  share,
  copy,
  href,
  compact,
  framed = true,
}: {
  share: PlaytestShare;
  copy: UiCopy;
  href?: string;
  compact?: boolean;
  framed?: boolean;
}) {
  const safeLink = safeHttpUrl(share.link);
  const body = (
    <>
      <h2 className={`font-bold italic ${compact ? "text-base" : "text-lg"}`}>{share.title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {authorLabel(copy, { isAnonymous: share.is_anonymous, profile: share.profiles })}
      </p>
      <BadgeRow badges={share.badges} copy={copy} />
      <p className={`mt-3 text-sm leading-7 text-muted-foreground ${compact ? "line-clamp-3" : ""}`}>
        {share.what_to_try}
      </p>
      {share.notes ? (
        <p className={`mt-2 text-sm leading-7 text-muted-foreground ${compact ? "line-clamp-2" : ""}`}>
          {share.notes}
        </p>
      ) : null}
      {safeLink && !href ? (
        <a
          href={safeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-semibold text-brand-red hover:underline"
        >
          {safeLink}
        </a>
      ) : null}
      {href ? <p className="mt-4 text-sm font-semibold text-brand-red">{copy.shareOpen} →</p> : null}
    </>
  );

  const frame = framed ? "panel tap-card" : "tap-card border-t border-border pt-4 first:border-t-0 first:pt-0";

  if (href) {
    return (
      <Link href={href} className={`${frame} block ${framed ? "p-5" : ""}`}>
        {body}
      </Link>
    );
  }

  return <article className={`${framed ? "panel p-5 md:p-6" : ""}`}>{body}</article>;
}
