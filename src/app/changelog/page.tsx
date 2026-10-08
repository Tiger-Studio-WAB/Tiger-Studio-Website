import { redirect } from "next/navigation";
import { localizedPath } from "@/lib/locale";

export default async function ChangelogPage() {
  redirect(await localizedPath("/news"));
}
