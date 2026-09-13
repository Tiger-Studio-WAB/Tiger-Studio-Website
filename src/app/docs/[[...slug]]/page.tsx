import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsShell } from "@/components/docs-shell";
import { getDocPage, getDocsTree, localizeTree } from "@/lib/docs";
import { getCopy } from "@/lib/locale";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug = [] } = await params;
  const { locale, copy } = await getCopy();
  const page = await getDocPage(slug, locale);
  return {
    title: page?.title ?? copy.docs,
    description: page?.description ?? copy.docs,
  };
}

export default async function DocsCatchAllPage({ params }: Props) {
  const { slug = [] } = await params;
  const { locale, copy } = await getCopy();
  const rawTree = await getDocsTree();
  const page = await getDocPage(slug, locale);
  if (!page) notFound();

  return (
    <DocsShell
      tree={localizeTree(rawTree, locale)}
      page={page}
      landing={slug.length === 0}
      copy={copy}
    />
  );
}
