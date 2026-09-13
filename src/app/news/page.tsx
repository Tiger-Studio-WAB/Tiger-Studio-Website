import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/page-hero";
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
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        {posts.length === 0 ? (
          <EmptyState title={copy.newsEmptyTitle} body={copy.newsEmptyBody} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <article key={post.slug} className="panel lift-card overflow-hidden hover:border-brand-red">
                {post.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.cover} alt="" className="h-44 w-full object-cover" />
                ) : null}
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {post.date} · {copy.newsBy} {post.author}
                  </p>
                  <h2 className="mt-3 text-2xl font-bold italic">
                    <Link href={post.href} className="hover:text-brand-red">
                      {post.title}
                    </Link>
                  </h2>
                  {post.summary ? (
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{post.summary}</p>
                  ) : null}
                  {post.usedFallback ? (
                    <p className="mt-3 text-xs text-muted-foreground">{copy.newsFallbackNote}</p>
                  ) : null}
                  <Link href={post.href} className="mt-4 inline-block text-sm font-semibold text-brand-red hover:underline">
                    {copy.newsRead} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
