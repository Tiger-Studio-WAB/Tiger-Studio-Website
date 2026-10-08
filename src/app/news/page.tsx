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
          <div className="mx-auto flex max-w-3xl flex-col gap-10">
            {posts.map((post) => (
              <Link key={post.slug} href={post.href} className="studio-card" data-reveal>
                <SoftImage src={post.cover} alt="" className="h-72 w-full object-cover" />
                <div className="p-7 md:p-8">
                  <p className="text-sm font-semibold text-brand-red">
                    {post.date} · {copy.newsBy} {post.author}
                  </p>
                  <h2 className="mt-3 text-[1.7rem] leading-snug">{post.title}</h2>
                  {post.summary ? (
                    <p className="mt-3 text-base leading-7 text-muted-foreground">{post.summary}</p>
                  ) : null}
                  {post.usedFallback ? (
                    <p className="mt-3 text-sm text-muted-foreground">{copy.newsFallbackNote}</p>
                  ) : null}
                  <span className="btn btn-outline mt-6">{copy.newsRead}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </PageShell>
    </>
  );
}
