import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { NEWS_ORG, NEWS_REPO, fetchNewsRepoSources, fetchRepoFileText } from "@/lib/github";
import type { ContentLanguage } from "@/lib/help-types";
import { pickLocalizedText, splitLocaleMarkdownPath } from "@/lib/locale-files";
import { markdownAssetBase, prepareMarkdownBody } from "@/lib/markdown";

export type NewsFrontmatter = {
  title?: string;
  date?: string;
  author?: string;
  published?: boolean;
  summary?: string;
};

export type NewsPost = {
  slug: string;
  href: string;
  title: string;
  date: string;
  author: string;
  summary: string;
  body: string;
  cover?: string;
  path: string;
  source: "local" | "github";
  locale: ContentLanguage;
  usedFallback: boolean;
  imageBase: string;
};

type SourceFile = {
  path: string;
  text: string;
  source: "local" | "github";
};

const LOCAL_NEWS = path.join(process.cwd(), "content/news");

function parseFrontmatter(raw: string): { data: NewsFrontmatter; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, body: raw };
  const data: NewsFrontmatter = {};
  for (const line of match[1].split("\n")) {
    const item = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!item) continue;
    const key = item[1];
    const value = item[2].trim().replace(/^["']|["']$/g, "");
    if (key === "published") {
      data.published = /^(true|yes|1)$/i.test(value);
      continue;
    }
    if (key === "title" || key === "date" || key === "author" || key === "summary") {
      data[key] = value;
    }
  }
  return { data, body: raw.slice(match[0].length) };
}

function slugFromCanonical(filePath: string) {
  const normalized = filePath.replace(/\\/g, "/").replace(/^posts\//, "").replace(/\.md$/i, "");
  return normalized
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function dateFromSlug(slug: string, fallback?: string) {
  const match = slug.match(/^(\d{4}-\d{2}-\d{2})/);
  return fallback || match?.[1] || "";
}

function titleFromMarkdown(body: string, fallback: string) {
  return body.match(/^#\s+(.+)$/m)?.[1]?.trim() || fallback;
}

function allowlistedAuthor(author: string) {
  const raw = process.env.NEWS_AUTHORS?.trim();
  if (!raw) return true;
  const allowed = raw.split(",").map((item) => item.trim().toLowerCase()).filter(Boolean);
  return allowed.includes(author.toLowerCase());
}

function assetBase(source: "local" | "github", canonical: string) {
  return markdownAssetBase(source, canonical, {
    localPrefix: "/api/news-media",
    githubBase: `https://raw.githubusercontent.com/${NEWS_ORG}/${NEWS_REPO}/main`,
    stemFolder: true,
  });
}

function firstImage(body: string, imageBase: string, source: "local" | "github") {
  const match = body.match(/!\[[^\]]*]\(([^)]+)\)/);
  if (!match) return undefined;
  const src = match[1].trim();
  if (/^https?:\/\//i.test(src) || src.startsWith("/")) return src;
  if (source !== "local") return undefined;
  return `${imageBase}/${src.replace(/^\.\//, "")}`;
}

async function walkLocalNews(
  dir: string,
  prefix = "",
): Promise<{ path: string; text: string }[]> {
  const markdown: { path: string; text: string }[] = [];
  let entries: import("node:fs").Dirent[] = [];
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return markdown;
  }

  for (const entry of entries) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith(".")) {
      markdown.push(...(await walkLocalNews(full, relative)));
      continue;
    }
    if (!entry.isFile() || entry.name.startsWith(".") || !/\.md$/i.test(entry.name)) continue;
    markdown.push({ path: relative, text: await readFile(full, "utf8") });
  }
  return markdown;
}

function mergeNewsSources(local: { path: string; text: string }[], remote: { path: string; text: string }[]) {
  const files = new Map<string, SourceFile>();
  for (const file of local) {
    files.set(file.path.replace(/\\/g, "/"), { ...file, source: "local" });
  }
  for (const file of remote) {
    files.set(file.path.replace(/\\/g, "/"), { ...file, source: "github" });
  }
  return [...files.values()];
}

type NewsRecord = {
  slug: string;
  canonical: string;
  variants: Partial<Record<ContentLanguage, { file: SourceFile; data: NewsFrontmatter; body: string }>>;
};

function recordsFromFiles(files: SourceFile[]): NewsRecord[] {
  const groups = new Map<string, NewsRecord>();
  for (const file of files) {
    const { canonical, locale } = splitLocaleMarkdownPath(file.path);
    const inPosts = canonical.replace(/\\/g, "/");
    if (!inPosts.startsWith("posts/") || !inPosts.endsWith(".md")) continue;
    const { data, body } = parseFrontmatter(file.text);
    const slug = slugFromCanonical(inPosts);
    const current = groups.get(inPosts) ?? { slug, canonical: inPosts, variants: {} };
    current.variants[locale] = { file, data, body: prepareMarkdownBody(body) };
    groups.set(inPosts, current);
  }
  return [...groups.values()];
}

function postFromRecord(record: NewsRecord, locale: ContentLanguage): NewsPost | null {
  const english = record.variants.en;
  if (!english || english.data.published === false) return null;
  if (english.data.published !== true) return null;
  const author = english.data.author || "tiger-studio";
  if (!allowlistedAuthor(author)) return null;

  const picked = pickLocalizedText(record.variants, locale);
  const chosen = picked.value ?? english;
  const title =
    chosen.data.title || titleFromMarkdown(chosen.body, record.slug.replace(/-/g, " "));
  const imageBase = assetBase(english.file.source, record.canonical);
  return {
    slug: record.slug,
    href: `/news/${record.slug}`,
    title,
    date: chosen.data.date || english.data.date || dateFromSlug(record.slug),
    author,
    summary: chosen.data.summary || english.data.summary || "",
    body: chosen.body,
    cover: firstImage(chosen.body, imageBase, english.file.source),
    path: chosen.file.path,
    source: chosen.file.source,
    locale: picked.locale,
    usedFallback: picked.usedFallback,
    imageBase,
  };
}

async function loadNewsRecords(): Promise<NewsRecord[]> {
  const local = await walkLocalNews(LOCAL_NEWS);
  let remote: { path: string; text: string }[] = [];
  try {
    remote = await fetchNewsRepoSources();
  } catch {
    remote = [];
  }
  return recordsFromFiles(mergeNewsSources(local, remote));
}

const getNewsRecords = cache(loadNewsRecords);

function isLocalLaunchNote(post: NewsPost) {
  if (post.source !== "local") return false;
  return /welcome|starts-here|studio-news-starts/i.test(`${post.slug} ${post.title}`);
}

function preferRepoLaunchNotes(posts: NewsPost[]) {
  if (!posts.some((post) => post.source === "github")) return posts;
  return posts.filter((post) => !isLocalLaunchNote(post));
}

export async function listNewsPosts(locale: ContentLanguage): Promise<NewsPost[]> {
  const records = await getNewsRecords();
  return preferRepoLaunchNotes(
    records
      .map((record) => postFromRecord(record, locale))
      .filter((post): post is NewsPost => Boolean(post))
      .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title)),
  );
}

export async function getNewsPost(slug: string, locale: ContentLanguage): Promise<NewsPost | null> {
  const records = await getNewsRecords();
  const record = records.find((item) => item.slug === slug);
  return record ? postFromRecord(record, locale) : null;
}

export async function readLocalNewsAsset(relativePath: string) {
  const cleaned = relativePath.replace(/\\/g, "/").replace(/^\/+/, "");
  if (!cleaned || cleaned.includes("..")) return null;
  try {
    return await readFile(path.join(LOCAL_NEWS, cleaned));
  } catch {
    return null;
  }
}

export { resolveMarkdownImage as resolveNewsImage } from "@/lib/markdown";

export async function fetchNewsReadme(locale: ContentLanguage) {
  if (locale !== "en") {
    const localized = await fetchRepoFileText(NEWS_REPO, `README.${locale}.md`, NEWS_ORG);
    if (localized) return localized;
  }
  return fetchRepoFileText(NEWS_REPO, "README.md", NEWS_ORG);
}
