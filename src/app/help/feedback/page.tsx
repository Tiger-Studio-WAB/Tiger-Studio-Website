import { redirect } from "next/navigation";

export default async function HelpFeedbackRedirect({
  searchParams,
}: {
  searchParams: Promise<{ share_id?: string }>;
}) {
  const { share_id } = await searchParams;
  redirect(share_id ? `/help/share/${share_id}` : "/help/share");
}
