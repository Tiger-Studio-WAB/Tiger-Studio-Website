import Link from "next/link";
import type { DocsTree } from "@/lib/docs";
import type { UiCopy } from "@/lib/i18n";

export function DocsSidebar({
  tree,
  currentHref,
  copy,
}: {
  tree: DocsTree;
  currentHref: string;
  copy: UiCopy;
}) {
  return (
    <nav aria-label={copy.docs} className="text-sm">
      <p className="section-kicker">{copy.docs}</p>
      <Link
        href="/docs"
        className={`docs-nav-link mt-3 block font-semibold ${currentHref === "/docs" ? "is-active" : ""}`}
      >
        {copy.docsOverview}
      </Link>
      <div className="mt-6 space-y-5">
        {tree.sections.map((section) => (
          <div key={section.id}>
            {section.href ? (
              <Link
                href={section.href}
                className={`docs-nav-link block text-xs font-semibold uppercase tracking-[0.16em] ${
                  currentHref === section.href ? "is-active" : "text-muted-foreground"
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
                      className={`docs-nav-link block rounded-[var(--radius-sm)] px-2 py-1 leading-6 ${
                        currentHref === page.href ? "is-active font-semibold" : ""
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
        {copy.docsNeedHelp}{" "}
        <Link href="/help" className="font-semibold text-brand-red hover:underline">
          {copy.help}
        </Link>
        {" · "}
        <Link href="/support" className="font-semibold text-brand-red hover:underline">
          {copy.support}
        </Link>
      </p>
    </nav>
  );
}
