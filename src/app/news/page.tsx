import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState } from "@/components/empty-state";
import { SoftImage } from "@/components/soft-image";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { getCopy } from "@/lib/locale";
import { listNewsPosts } from "@/lib/news";

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await getCopy();
  return {
    title: copy.news,
    description: copy.newsLede,
  };
}

export default async function NewsPage() {
  const { locale, copy } = await getCopy();
  const posts = await listNewsPosts(locale);

  return (
    <>
      <PageHero kicker={copy.newsKicker} title={copy.newsTitle} lede={copy.newsLede} />
      <PageShell className="md:px-8 md:py-16">
        {posts.length === 0 ? (
          <EmptyState title={copy.newsEmptyTitle} body={copy.newsEmptyBody} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={post.href}
                className="panel tap-card block overflow-hidden"
                data-reveal
              >
                <SoftImage src={post.cover} alt="" className="h-44 w-full object-cover" />
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {post.date} · {copy.newsBy} {post.author}
                  </p>
                  <h2 className="mt-3 text-2xl font-bold italic">{post.title}</h2>
                  {post.summary ? (
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{post.summary}</p>
                  ) : null}
                  {post.usedFallback ? (
                    <p className="mt-3 text-xs text-muted-foreground">{copy.newsFallbackNote}</p>
                  ) : null}
                  <p className="mt-4 text-sm font-semibold text-brand-red">
                    {copy.newsRead} →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </PageShell>
    </>
  );
}
