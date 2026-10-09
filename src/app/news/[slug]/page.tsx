import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/locale-link";
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
      <article className="mx-auto max-w-3xl">
        <Link href="/news" className="text-sm font-semibold text-brand-red hover:underline">
          ← {copy.newsBack}
        </Link>
        <p className="mt-6 text-sm font-semibold text-brand-red">
          {post.date} · {copy.newsBy} {post.author}
        </p>
        <h1 className="mt-3 text-[clamp(2.1rem,4vw,3rem)] leading-[1.15]">{post.title}</h1>
        {post.usedFallback ? (
          <p className="mt-4 text-sm text-muted-foreground">{copy.newsFallbackNote}</p>
        ) : null}
        <div className="mt-8">
          <MarkdownDoc source={post.body} imageBase={post.imageBase} omitHeading={post.title} />
        </div>
      </article>
    </PageShell>
  );
}
