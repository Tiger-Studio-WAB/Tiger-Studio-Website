import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import type { Badge, Idea, PlaytestShare, ProductFeedback, ProfileBadge, ResponsePost } from "@/lib/help-types";

export async function listIdeas(options?: {
  authorId?: string;
  category?: string;
}): Promise<Idea[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = await createClient();
  let query = supabase
    .from("ideas")
    .select("*, profiles(*), responses(count)")
    .order("created_at", { ascending: false });

  if (options?.authorId) {
    query = query.eq("author_id", options.authorId);
  }
  if (options?.category && options.category !== "all") {
    query = query.eq("category", options.category);
  }

  const { data, error } = await query;
  if (!error && data) {
    return data.map((row) => {
      const responses = row.responses as { count: number }[] | null;
      return {
        ...(row as Idea),
        response_count: responses?.[0]?.count ?? 0,
      };
    });
  }

  // Guests can read `ideas` after the public-select migration, but profile /
  // response embeds still fail under member-only RLS. Fall back so the board
  // is not empty for signed-out visitors.
  let fallback = supabase.from("ideas").select("*").order("created_at", { ascending: false });
  if (options?.authorId) {
    fallback = fallback.eq("author_id", options.authorId);
  }
  if (options?.category && options.category !== "all") {
    fallback = fallback.eq("category", options.category);
  }

  const { data: ideasOnly, error: ideasError } = await fallback;
  if (ideasError || !ideasOnly) {
    console.error("[ideas] list failed", error, ideasError);
    return [];
  }

  return ideasOnly.map((row) => ({
    ...(row as Idea),
    profiles: null,
    response_count: 0,
  }));
}

export async function getIdea(id: string): Promise<Idea | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ideas")
    .select("*, profiles(*)")
    .eq("id", id)
    .maybeSingle();

  if (!error && data) return data as Idea;

  const { data: ideaOnly, error: ideaError } = await supabase
    .from("ideas")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (ideaError) {
    console.error("[ideas] get failed", error, ideaError);
    return null;
  }

  if (!ideaOnly) return null;
  return { ...(ideaOnly as Idea), profiles: null };
}

export async function listResponses(ideaId: string): Promise<ResponsePost[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("responses")
    .select("*, profiles(*)")
    .eq("idea_id", ideaId)
    .order("created_at", { ascending: true });

  if (error || !data) return [];
  return data as ResponsePost[];
}

export async function listMyResponses(authorId: string): Promise<ResponsePost[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("responses")
    .select("*, profiles(*)")
    .eq("author_id", authorId)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as ResponsePost[];
}

async function badgesByAuthors(authorIds: string[]): Promise<Map<string, Badge[]>> {
  const map = new Map<string, Badge[]>();
  if (!isSupabaseConfigured() || authorIds.length === 0) return map;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profile_badges")
    .select("profile_id, badges(id, slug, name, description)")
    .in("profile_id", authorIds);

  if (error || !data) return map;

  for (const row of data) {
    const badge = (row as { profile_id: string; badges?: Badge | Badge[] | null }).badges;
    const item = Array.isArray(badge) ? badge[0] : badge;
    if (!item) continue;
    const list = map.get(row.profile_id) ?? [];
    list.push(item);
    map.set(row.profile_id, list);
  }
  return map;
}

export async function listPlaytestShares(): Promise<PlaytestShare[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("playtest_shares")
    .select("*, profiles(*)")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  const badges = await badgesByAuthors(data.map((row) => row.author_id));
  return data.map((row) => ({
    ...(row as PlaytestShare),
    badges: badges.get(row.author_id) ?? [],
  }));
}

export async function getPlaytestShare(id: string): Promise<PlaytestShare | null> {
  if (!isSupabaseConfigured() || !id) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("playtest_shares")
    .select("*, profiles(*)")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  const badges = await badgesByAuthors([data.author_id]);
  return {
    ...(data as PlaytestShare),
    badges: badges.get(data.author_id) ?? [],
  };
}

export async function listProductFeedback(): Promise<ProductFeedback[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("product_feedback")
    .select("*, profiles(*)")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  const badges = await badgesByAuthors(data.map((row) => row.author_id));
  return data.map((row) => ({
    ...(row as ProductFeedback),
    badges: badges.get(row.author_id) ?? [],
  }));
}

export async function listProductFeedbackForShare(shareId: string): Promise<ProductFeedback[]> {
  if (!isSupabaseConfigured() || !shareId) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("product_feedback")
    .select("*, profiles(*)")
    .eq("share_id", shareId)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  const badges = await badgesByAuthors(data.map((row) => row.author_id));
  return data.map((row) => ({
    ...(row as ProductFeedback),
    badges: badges.get(row.author_id) ?? [],
  }));
}

export async function listMyBadges(profileId: string): Promise<ProfileBadge[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profile_badges")
    .select("awarded_at, badges(id, slug, name, description)")
    .eq("profile_id", profileId)
    .order("awarded_at", { ascending: false });

  if (error || !data) return [];
  return data.flatMap((row) => {
    const badge = (row as { awarded_at: string; badges?: Badge | Badge[] | null }).badges;
    const item = Array.isArray(badge) ? badge[0] : badge;
    return item ? [{ badge: item, awarded_at: row.awarded_at }] : [];
  });
}

export async function awardBadge(profileId: string, slug: string) {
  if (!isSupabaseConfigured() || slug === "studio_member") return;

  const supabase = await createClient();
  const { data: badge } = await supabase.from("badges").select("id").eq("slug", slug).maybeSingle();
  if (!badge) return;

  await supabase.from("profile_badges").upsert(
    { profile_id: profileId, badge_id: badge.id },
    { onConflict: "profile_id,badge_id" },
  );
}
