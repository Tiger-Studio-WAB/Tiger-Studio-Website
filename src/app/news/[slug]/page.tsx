import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownDoc } from "@/components/markdown-doc";
import { PageShell } from "@/components/page-shell";
import { getCopy } from "@/lib/locale";
import { getNewsPost } from "@/lib/news";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { locale } = await getCopy();
  const post = await getNewsPost(slug, locale);
  return {
    title: post?.title ?? "News",
    description: post?.summary,
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const { locale, copy } = await getCopy();
  const post = await getNewsPost(slug, locale);
  if (!post) notFound();

  return (
    <PageShell>
      <Link href="/news" className="text-sm font-semibold text-brand-red hover:underline">
        ← {copy.newsBack}
      </Link>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {post.date} · {copy.newsBy} {post.author}
      </p>
      <h1 className="mt-3 text-4xl font-bold italic">{post.title}</h1>
      <span className="rule-yellow mt-4" />
      {post.usedFallback ? (
        <p className="mt-4 text-sm text-muted-foreground">{copy.newsFallbackNote}</p>
      ) : null}
      <article className="panel mt-8 p-6 md:p-8">
        <MarkdownDoc source={post.body} imageBase={post.imageBase} omitHeading={post.title} />
      </article>
    </PageShell>
  );
}
