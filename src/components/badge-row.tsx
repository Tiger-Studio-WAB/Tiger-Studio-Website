import { badgeLabel, type UiCopy } from "@/lib/i18n";
import type { Badge } from "@/lib/help-types";

export function BadgeRow({ badges, copy }: { badges?: Badge[]; copy: UiCopy }) {
  if (!badges?.length) return null;
  return (
    <p className="mt-2 flex flex-wrap gap-2">
      {badges.map((badge) => (
        <span key={badge.id} className="badge-chip" title={badge.description}>
          {badgeLabel(copy, badge.slug, badge.name)}
        </span>
      ))}
    </p>
  );
}
