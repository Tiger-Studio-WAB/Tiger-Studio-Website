import type { Badge, Profile } from "@/lib/help-types";
import type { UiCopy } from "@/lib/i18n";

export function authorLabel(
  copy: UiCopy,
  options: { isAnonymous?: boolean; profile?: Profile | null },
) {
  if (options.isAnonymous) return copy.anonymousName;
  return options.profile?.display_name || copy.member;
}

export function visibleBadges(badges?: Badge[]) {
  return badges ?? [];
}
