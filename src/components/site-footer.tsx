import Link from "next/link";
import { nav } from "@/lib/content";
import type { UiCopy } from "@/lib/i18n";

export function SiteFooter({ copy }: { copy: UiCopy }) {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-8 text-sm sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-bold italic">{copy.brand}</p>
          <p className="mt-2 max-w-sm text-white/70">{copy.tagline}</p>
        </div>
        <nav className="flex flex-wrap gap-4 font-semibold">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:underline">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
