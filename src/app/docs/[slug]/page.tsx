import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { MarkdownDoc } from "@/components/markdown-doc";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { getDocsGuide } from "@/lib/docs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const docs = await getDocsGuide();
  const page = docs?.pages.find((item) => item.slug === slug);
  return {
    title: page?.title ?? "Docs",
    description: page ? `${page.title} — Tiger Studio docs` : "Tiger Studio documentation",
  };
}

export default async function DocArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === "readme") {
    redirect("/docs");
  }

  const docs = await getDocsGuide();
  const page = docs?.pages.find((item) => item.slug === slug);
  if (!page) notFound();

  const others = docs?.pages.filter((item) => item.slug !== slug) ?? [];

  return (
    <>
      <PageHero kicker="Docs" title={page.title} lede={`From ${page.path} in the docs repository.`} />
      <PageShell>
        <article className="panel max-w-3xl p-6">
          <MarkdownDoc source={page.markdown} />
          <p className="mt-8 text-sm leading-7">
            <Link href="/docs" className="font-semibold text-brand-red hover:underline">
              ← All docs
            </Link>
          </p>
        </article>
        {others.length ? (
          <aside className="mt-8 max-w-3xl">
            <h2 className="text-lg font-bold italic">Other guides</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link href={item.href} className="font-semibold text-brand-red hover:underline">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </PageShell>
    </>
  );
}
