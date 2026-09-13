import type { ReactNode } from "react";
import { HelpNav } from "@/components/help-nav";
import { getCopy } from "@/lib/locale";

export default async function HelpLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { copy } = await getCopy();
  return (
    <div className="help-shell min-h-full">
      <HelpNav copy={copy} />
      {children}
    </div>
  );
}
