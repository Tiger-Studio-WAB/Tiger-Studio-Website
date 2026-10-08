import { redirect } from "next/navigation";
import { localizedPath } from "@/lib/locale";

export default async function ContactPage() {
  redirect(await localizedPath("/join"));
}
