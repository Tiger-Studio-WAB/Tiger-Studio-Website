import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import {
  DOCS_REPO,
  SUPPORT_REPO,
  fetchNamedRepo,
  fetchRepoFileText,
  fetchRepoGuideSources,
  STUDIO_ORG,
} from "@/lib/github";

export type DocFrontmatter = {
  title?: string;
  description?: string;
  order?: number;
  sidebar_label?: string;
};

export type DocPage = {
  slug: string[];
  href: string;
  path: string;
  title: string;
  description?: string;
  sidebarLabel: string;
  order: number;
  section: string[];
  isIndex: boolean;
  body: string;
  source: "local" | "github";
};

export type DocSection = {
  id: string;
  label: string;
  href?: string;
  order: number;
  pages: DocPage[];
};

export type DocsTree = {
  pages: DocPage[];
  sections: DocSection[];
  home: DocPage | null;
  githubUrl: string;
};

type CategoryMeta = {
  label?: string;
  order?: number;
};

type SourceFile = {
  path: string;
  text: string;
  source: "local" | "github";
};

const LOCAL_DOCS = path.join(process.cwd(), "content/docs");

function parseFrontmatter(raw: string): { data: DocFrontmatter; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, body: raw };
  const data: DocFrontmatter = {};
  for (const line of match[1].split("\n")) {
    const item = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!item) continue;
    const key = item[1];
    const value = item[2].trim().replace(/^["']|["']$/g, "");
    if (key === "order") {
      const order = Number(value);
      if (!Number.isNaN(order)) data.order = order;
      continue;
    }
    if (key === "title" || key === "description" || key === "sidebar_label") {
      data[key] = value;
    }
  }
  return { data, body: raw.slice(match[0].length) };
}

function titleFromMarkdown(body: string, fallback: string) {
  const heading = body.match(/^#\s+(.+)$/m);
  return heading?.[1]?.trim() || fallback;
}

function humanize(value: string) {
  return value
    .replace(/^\d+[-_]/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function stripOrderPrefix(name: string) {
  const match = name.match(/^(\d+)[-_](.+)$/);
  if (!match) return { order: undefined as number | undefined, slug: name };
  return { order: Number(match[1]), slug: match[2] };
}

function slugPartsFromPath(filePath: string) {
  const normalized = filePath.replace(/\\/g, "/").replace(/^\.\//, "");
  const parts = normalized.split("/").filter(Boolean);
  const file = parts.pop() ?? normalized;
  const base = file.replace(/\.md$/i, "");
  const isIndex = /^readme$/i.test(base) || /^index$/i.test(base);
  const folders = parts.map((part) => stripOrderPrefix(part).slug);
  if (isIndex) return { slug: folders, isIndex: true, fileOrder: stripOrderPrefix(base).order };
  const fileSlug = stripOrderPrefix(base);
  return { slug: [...folders, fileSlug.slug], isIndex: false, fileOrder: fileSlug.order };
}

function hrefFromSlug(slug: string[]) {
  return slug.length ? `/docs/${slug.join("/")}` : "/docs";
}

function isStubMarkdown(filePath: string, text: string) {
  const name = filePath.split("/").pop() ?? "";
  if (!/^readme\.md$/i.test(name) && !/^index\.md$/i.test(name)) return false;
  const body = text.replace(/^---[\s\S]*?---/, "").trim();
  return /^(#\s*)?(docs|support)\s*(\r?\n+(docs repository|support repo))?$/i.test(body);
}

function pageFromSource(filePath: string, text: string, source: SourceFile["source"]): DocPage {
  const { data, body } = parseFrontmatter(text);
  const { slug, isIndex, fileOrder } = slugPartsFromPath(filePath);
  const fallback =
    isIndex && slug.length ? humanize(slug[slug.length - 1]!) : humanize(slug[slug.length - 1] ?? "Docs");
  const title = data.title || titleFromMarkdown(body, fallback);
  return {
    slug,
    href: hrefFromSlug(slug),
    path: filePath.replace(/\\/g, "/"),
    title,
    description: data.description,
    sidebarLabel: data.sidebar_label || title,
    order: data.order ?? fileOrder ?? (isIndex ? 0 : 50),
    section: slug.slice(0, Math.max(0, slug.length - (isIndex ? 0 : 1))),
    isIndex,
    body,
    source,
  };
}

function parseCategory(text: string): CategoryMeta {
  try {
    const data = JSON.parse(text) as CategoryMeta;
    return {
      label: typeof data.label === "string" ? data.label : undefined,
      order: typeof data.order === "number" ? data.order : undefined,
    };
  } catch {
    return {};
  }
}

async function walkLocalDocs(
  dir: string,
  prefix = "",
): Promise<{ markdown: { path: string; text: string }[]; categories: { path: string; text: string }[] }> {
  const markdown: { path: string; text: string }[] = [];
  const categories: { path: string; text: string }[] = [];
  let entries: import("node:fs").Dirent[] = [];
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return { markdown, categories };
  }

  for (const entry of entries) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith(".")) {
      const nested = await walkLocalDocs(full, relative);
      markdown.push(...nested.markdown);
      categories.push(...nested.categories);
      continue;
    }
    if (!entry.isFile() || entry.name.startsWith(".")) continue;
    if (/\.md$/i.test(entry.name) && !entry.name.startsWith("_")) {
      markdown.push({ path: relative, text: await readFile(full, "utf8") });
    }
    if (entry.name === "_category.json") {
      categories.push({ path: relative, text: await readFile(full, "utf8") });
    }
  }

  return { markdown, categories };
}

function buildTree(
  markdown: SourceFile[],
  categories: { path: string; text: string }[],
  githubUrl: string,
): DocsTree {
  const pages = markdown
    .map((file) => pageFromSource(file.path, file.text, file.source))
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

  const categoryByDir = new Map<string, CategoryMeta>();
  for (const file of categories) {
    const dir = file.path.replace(/\\/g, "/").replace(/\/_category\.json$/i, "");
    categoryByDir.set(dir, parseCategory(file.text));
  }

  const groups = new Map<string, DocSection>();
  const unsectioned: DocPage[] = [];

  for (const page of pages) {
    if (page.slug.length === 0) continue;
    const sectionId = page.section[0] ?? page.slug[0]!;
    if (!sectionId) continue;
    if (page.section.length === 0 && !page.isIndex) {
      unsectioned.push(page);
      continue;
    }
    const existing = groups.get(sectionId);
    const meta = categoryByDir.get(sectionId) ?? {};
    if (!existing) {
      groups.set(sectionId, {
        id: sectionId,
        label: meta.label || humanize(sectionId),
        href: page.isIndex && page.slug.length === 1 ? page.href : undefined,
        order: meta.order ?? page.order,
        pages: [page],
      });
      continue;
    }
    existing.pages.push(page);
    if (page.isIndex && page.slug.length === 1) existing.href = page.href;
    if (meta.order !== undefined) existing.order = meta.order;
  }

  const guideSection: DocSection = {
    id: "guides",
    label: "Guides",
    order: 80,
    pages: unsectioned,
  };

  const sections = [...groups.values(), ...(unsectioned.length ? [guideSection] : [])]
    .map((section) => ({
      ...section,
      pages: [...section.pages].sort((a, b) => {
        if (a.isIndex && a.slug.length === 1) return -1;
        if (b.isIndex && b.slug.length === 1) return 1;
        return a.order - b.order || a.title.localeCompare(b.title);
      }),
    }))
    .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));

  return {
    pages,
    sections,
    home: pages.find((page) => page.slug.length === 0) ?? null,
    githubUrl,
  };
}

function mergeSources(
  localMarkdown: { path: string; text: string }[],
  localCategories: { path: string; text: string }[],
  remoteMarkdown: { path: string; text: string }[],
  remoteCategories: { path: string; text: string }[],
) {
  const markdown = new Map<string, SourceFile>();
  for (const file of localMarkdown) {
    markdown.set(file.path.replace(/\\/g, "/"), { ...file, source: "local" });
  }
  for (const file of remoteMarkdown) {
    const key = file.path.replace(/\\/g, "/");
    if (isStubMarkdown(key, file.text) && markdown.has(key)) continue;
    markdown.set(key, { ...file, source: "github" });
  }

  const categories = new Map(localCategories.map((file) => [file.path.replace(/\\/g, "/"), file]));
  for (const file of remoteCategories) {
    categories.set(file.path.replace(/\\/g, "/"), file);
  }

  return {
    markdown: [...markdown.values()],
    categories: [...categories.values()],
  };
}

async function loadDocsTree(): Promise<DocsTree> {
  const githubUrl = `https://github.com/${STUDIO_ORG}/${DOCS_REPO}`;
  const local = await walkLocalDocs(LOCAL_DOCS);
  let remote = { markdown: [] as { path: string; text: string }[], categories: [] as { path: string; text: string }[] };
  try {
    remote = await fetchRepoGuideSources(DOCS_REPO);
  } catch {
    remote = { markdown: [], categories: [] };
  }

  const merged = mergeSources(local.markdown, local.categories, remote.markdown, remote.categories);
  return buildTree(merged.markdown, merged.categories, githubUrl);
}

export const getDocsTree = cache(loadDocsTree);

export async function getDocPage(slug: string[]) {
  const tree = await getDocsTree();
  const key = slug.join("/");
  return tree.pages.find((page) => page.slug.join("/") === key) ?? null;
}

export function neighbors(tree: DocsTree, page: DocPage) {
  const flat = [
    ...(tree.home ? [tree.home] : []),
    ...tree.sections.flatMap((section) => section.pages),
  ].filter((item, index, list) => list.findIndex((other) => other.href === item.href) === index);
  const index = flat.findIndex((item) => item.href === page.href);
  return {
    previous: index > 0 ? flat[index - 1] : null,
    next: index >= 0 && index < flat.length - 1 ? flat[index + 1] : null,
  };
}

export async function getSupportPage() {
  const repo = await fetchNamedRepo(SUPPORT_REPO);
  const readme = await fetchRepoFileText(SUPPORT_REPO, "README.md");
  const stub = !readme || isStubMarkdown("README.md", readme);
  return {
    repo,
    githubUrl: `https://github.com/${STUDIO_ORG}/${SUPPORT_REPO}`,
    issuesUrl: `https://github.com/${STUDIO_ORG}/${SUPPORT_REPO}/issues/new`,
    issuesListUrl: `https://github.com/${STUDIO_ORG}/${SUPPORT_REPO}/issues`,
    body: stub ? null : readme,
  };
}

export function studioRepoUrl(name: string) {
  return `https://github.com/${STUDIO_ORG}/${name}`;
}

export function supportIssuesUrl() {
  return `${studioRepoUrl(SUPPORT_REPO)}/issues/new`;
}

export function resolveDocHref(href: string | undefined, current: string[]) {
  if (!href || href.startsWith("http") || href.startsWith("/") || href.startsWith("#") || href.startsWith("mailto:")) {
    return href;
  }
  const [file, hash] = href.split("#");
  const cleaned = (file ?? "").replace(/\.md$/i, "");
  const base = current.slice(0, current.length ? current.length - 1 : 0);
  const parts = [...base];
  for (const part of cleaned.split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") {
      parts.pop();
      continue;
    }
    const slug = stripOrderPrefix(part).slug;
    if (/^index$/i.test(slug) || /^readme$/i.test(slug)) continue;
    parts.push(slug);
  }
  const next = hrefFromSlug(parts);
  return hash ? `${next}#${hash}` : next;
}
