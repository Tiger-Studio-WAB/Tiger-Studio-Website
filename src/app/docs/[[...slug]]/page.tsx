import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsShell } from "@/components/docs-shell";
import { getDocPage, getDocsTree } from "@/lib/docs";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug = [] } = await params;
  const page = await getDocPage(slug);
  return {
    title: page?.title ?? "Docs",
    description: page?.description ?? "Tiger Studio documentation.",
  };
}

export default async function DocsCatchAllPage({ params }: Props) {
  const { slug = [] } = await params;
  const [tree, page] = await Promise.all([getDocsTree(), getDocPage(slug)]);
  if (!page) notFound();

  return <DocsShell tree={tree} page={page} landing={slug.length === 0} />;
}
