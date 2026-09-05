import { cache } from "react";
import {
  DOCS_REPO,
  fetchNamedRepo,
  fetchRepoFileText,
  fetchRepoMarkdownFiles,
  SUPPORT_REPO,
  STUDIO_ORG,
  type GitHubRepo,
  type RepoMarkdownFile,
} from "@/lib/github";

export type StudioDoc = {
  slug: string;
  title: string;
  path: string;
  markdown: string;
  href: string;
};

export type StudioGuide = {
  repo: GitHubRepo;
  files: RepoMarkdownFile[];
  pages: StudioDoc[];
  githubUrl: string;
};

function titleFromMarkdown(markdown: string, fallback: string) {
  const heading = markdown.match(/^#\s+(.+)$/m);
  return heading?.[1]?.trim() || fallback;
}

function titleFromPath(path: string) {
  const base = path.replace(/\.md$/i, "").split("/").pop() ?? path;
  if (/^readme$/i.test(base)) return "Overview";
  return base
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function hrefForDoc(slug: string) {
  return slug === "readme" ? "/docs" : `/docs/${slug}`;
}

async function loadGuide(repoName: string): Promise<StudioGuide | null> {
  const repo = await fetchNamedRepo(repoName);
  if (!repo) return null;

  const files = await fetchRepoMarkdownFiles(repoName);
  const pages = (
    await Promise.all(
      files.map(async (file) => {
        const markdown = await fetchRepoFileText(repoName, file.path);
        if (!markdown) return null;
        const title = titleFromMarkdown(markdown, titleFromPath(file.path));
        return {
          slug: file.slug,
          title,
          path: file.path,
          markdown,
          href: hrefForDoc(file.slug),
        };
      }),
    )
  ).filter((page): page is StudioDoc => page !== null);

  return {
    repo,
    files,
    pages,
    githubUrl: repo.html_url,
  };
}

export const getDocsGuide = cache(() => loadGuide(DOCS_REPO));
export const getSupportGuide = cache(() => loadGuide(SUPPORT_REPO));

export function studioRepoUrl(name: string) {
  return `https://github.com/${STUDIO_ORG}/${name}`;
}

export function supportIssuesUrl() {
  return `${studioRepoUrl(SUPPORT_REPO)}/issues/new`;
}
