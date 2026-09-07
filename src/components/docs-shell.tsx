import Link from "next/link";
import { DocsSidebar } from "@/components/docs-sidebar";
import { MarkdownDoc } from "@/components/markdown-doc";
import type { DocPage, DocsTree } from "@/lib/docs";
import { neighbors } from "@/lib/docs";

export function DocsShell({
  tree,
  page,
  landing,
}: {
  tree: DocsTree;
  page: DocPage;
  landing?: boolean;
}) {
  const crumbs = [
    { href: "/docs", label: "Docs" },
    ...page.slug.map((part, index) => ({
      href: `/docs/${page.slug.slice(0, index + 1).join("/")}`,
      label: part
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase()),
    })),
  ];
  const { previous, next } = neighbors(tree, page);
  const sections = landing
    ? tree.sections.map((section) => ({
        href: section.href ?? section.pages[0]?.href,
        label: section.label,
        body: section.pages[0]?.description ?? `${section.pages.length} page${section.pages.length === 1 ? "" : "s"}`,
      }))
    : [];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-10 lg:flex-row">
      <aside className="lg:w-56 lg:shrink-0">
        <details className="lg:hidden">
          <summary className="cursor-pointer text-sm font-semibold">On this site</summary>
          <div className="mt-4">
            <DocsSidebar tree={tree} currentHref={page.href} />
          </div>
        </details>
        <div className="hidden lg:block">
          <DocsSidebar tree={tree} currentHref={page.href} />
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {crumbs.map((crumb, index) => (
            <span key={crumb.href}>
              {index > 0 ? <span className="px-1.5 text-border">/</span> : null}
              <Link href={crumb.href} className="hover:text-brand-red">
                {crumb.label}
              </Link>
            </span>
          ))}
        </p>
        <article className="panel mt-4 p-6 md:p-8">
          <MarkdownDoc source={page.body} currentSlug={page.slug} />
          {landing && sections.length ? (
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {sections.map((section) =>
                section.href ? (
                  <Link key={section.label} href={section.href} className="panel lift-card p-5 hover:border-brand-red">
                    <h2 className="text-lg font-bold italic">{section.label}</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{section.body}</p>
                  </Link>
                ) : null,
              )}
            </div>
          ) : null}
        </article>
        <div className="mt-6 flex flex-wrap justify-between gap-4 text-sm font-semibold">
          {previous ? (
            <Link href={previous.href} className="text-brand-red hover:underline">
              ← {previous.sidebarLabel}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={next.href} className="text-brand-red hover:underline">
              {next.sidebarLabel} →
            </Link>
          ) : null}
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          Source:{" "}
          <a
            href={`${tree.githubUrl}/blob/main/${page.path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-red hover:underline"
          >
            {page.path}
          </a>
          {page.source === "local" ? " (starter copy on this site until the docs repo has this file)" : ""}
        </p>
      </div>
    </div>
  );
}
