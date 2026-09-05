import Link from "next/link";
import type { DocsTree } from "@/lib/docs";

export function DocsSidebar({
  tree,
  currentHref,
}: {
  tree: DocsTree;
  currentHref: string;
}) {
  return (
    <nav aria-label="Documentation" className="text-sm">
      <p className="section-kicker">Docs</p>
      <Link
        href="/docs"
        className={`mt-3 block font-semibold ${currentHref === "/docs" ? "text-brand-red" : "hover:text-brand-red"}`}
      >
        Overview
      </Link>
      <div className="mt-6 space-y-5">
        {tree.sections.map((section) => (
          <div key={section.id}>
            {section.href ? (
              <Link
                href={section.href}
                className={`block text-xs font-semibold uppercase tracking-[0.16em] ${
                  currentHref === section.href ? "text-brand-red" : "text-muted-foreground hover:text-brand-red"
                }`}
              >
                {section.label}
              </Link>
            ) : (
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {section.label}
              </p>
            )}
            <ul className="mt-2 space-y-1.5">
              {section.pages
                .filter((page) => !(page.isIndex && page.slug.length === 1))
                .map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className={`block leading-6 ${
                        currentHref === page.href ? "font-semibold text-brand-red" : "hover:text-brand-red"
                      }`}
                    >
                      {page.sidebarLabel}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-8 text-xs leading-6 text-muted-foreground">
        Need help?{" "}
        <Link href="/support" className="font-semibold text-brand-red hover:underline">
          Support
        </Link>
      </p>
    </nav>
  );
}
