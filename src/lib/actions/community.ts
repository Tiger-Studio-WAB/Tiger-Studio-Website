"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSessionUser } from "@/lib/auth";
import { localizedPath } from "@/lib/locale";
import { allLocalePaths } from "@/lib/paths";
import { awardBadge, getPlaytestShare } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { safeHttpUrl } from "@/lib/urls";

function sharePath(shareId?: string, query?: string) {
  const base = shareId ? `/help/share/${shareId}` : "/help/share";
  return query ? `${base}?${query}` : base;
}

async function go(path: string): Promise<never> {
  redirect(await localizedPath(path));
}

function refreshPaths(paths: string[]) {
  for (const path of paths) {
    for (const variant of allLocalePaths(path)) revalidatePath(variant);
  }
}

export async function createPlaytestShare(formData: FormData) {
  const user = await requireSessionUser();
  const title = String(formData.get("title") ?? "").trim();
  const whatToTry = String(formData.get("what_to_try") ?? "").trim();
  const rawLink = String(formData.get("link") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();
  const isAnonymous = formData.get("is_anonymous") === "on";
  const link = rawLink ? safeHttpUrl(rawLink) : null;

  if (title.length < 3 || whatToTry.length < 10 || (rawLink && !link)) {
    return go("/help/share?error=validation");
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("playtest_shares")
    .insert({
      author_id: user.id,
      title,
      what_to_try: whatToTry,
      link,
      notes: notes || null,
      is_anonymous: isAnonymous,
    })
    .select("id")
    .maybeSingle();

  if (error) {
    return go("/help/share?error=save");
  }

  await awardBadge(user.id, "first_playtest");
  refreshPaths(["/help", "/help/share", ...(data?.id ? [`/help/share/${data.id}`] : []), "/me"]);
  return go(data?.id ? sharePath(data.id, "ok=1") : "/help/share?ok=1");
}

export async function createProductFeedback(formData: FormData) {
  const user = await requireSessionUser();
  const shareId = String(formData.get("share_id") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const isAnonymous = formData.get("is_anonymous") === "on";

  if (!shareId || body.length < 10) {
    return go(sharePath(shareId || undefined, "error=validation"));
  }

  const share = await getPlaytestShare(shareId);
  if (!share) {
    return go(sharePath(shareId, "error=save"));
  }

  const supabase = await createClient();
  const { error } = await supabase.from("product_feedback").insert({
    author_id: user.id,
    share_id: share.id,
    target: share.title,
    body,
    is_anonymous: isAnonymous,
  });

  if (error) {
    return go(sharePath(share.id, "error=save"));
  }

  await awardBadge(user.id, "first_feedback");
  refreshPaths(["/help", "/help/share", `/help/share/${share.id}`, "/me"]);
  return go(sharePath(share.id, "ok=1"));
}
