"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSessionUser } from "@/lib/auth";
import { awardBadge, getPlaytestShare } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { safeHttpUrl } from "@/lib/urls";

function sharePath(shareId?: string, query?: string) {
  const base = shareId ? `/help/share/${shareId}` : "/help/share";
  return query ? `${base}?${query}` : base;
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
    redirect("/help/share?error=validation");
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
    redirect("/help/share?error=save");
  }

  await awardBadge(user.id, "first_playtest");
  revalidatePath("/help");
  revalidatePath("/help/share");
  if (data?.id) revalidatePath(`/help/share/${data.id}`);
  revalidatePath("/me");
  redirect(data?.id ? sharePath(data.id, "ok=1") : "/help/share?ok=1");
}

export async function createProductFeedback(formData: FormData) {
  const user = await requireSessionUser();
  const shareId = String(formData.get("share_id") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const isAnonymous = formData.get("is_anonymous") === "on";

  if (!shareId || body.length < 10) {
    redirect(sharePath(shareId || undefined, "error=validation"));
  }

  const share = await getPlaytestShare(shareId);
  if (!share) {
    redirect(sharePath(shareId, "error=save"));
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
    redirect(sharePath(share.id, "error=save"));
  }

  await awardBadge(user.id, "first_feedback");
  revalidatePath("/help");
  revalidatePath("/help/share");
  revalidatePath(`/help/share/${share.id}`);
  revalidatePath("/me");
  redirect(sharePath(share.id, "ok=1"));
}
