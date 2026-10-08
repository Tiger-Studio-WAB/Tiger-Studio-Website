import { redirect } from "next/navigation";
import { localizedPath } from "@/lib/locale";

export default async function HelpFeedbackRedirect({
  searchParams,
}: {
  searchParams: Promise<{ share_id?: string }>;
}) {
  const { share_id } = await searchParams;
  redirect(await localizedPath(share_id ? `/help/share/${share_id}` : "/help/share"));
}
