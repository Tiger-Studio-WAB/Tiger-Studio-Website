import { site } from "@/lib/site";

export type PointerKind = "news" | "changelog" | "post";

export type Pointer = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  source: string;
  url: string;
  kind: PointerKind;
  category: string;
};

export type Destination = {
  slug: string;
  name: string;
  description: string;
  url: string;
  category: "Engineering" | "News" | "Community" | "Tools";
  accent: "red" | "blue" | "gold" | "teal" | "purple" | "orange";
};

export const pointers: Pointer[] = [
  {
    slug: "hub-opens",
    title: "Tiger Studio hub is open",
    excerpt:
      "The public home for the studio launches as a doorway. News, changelogs, and projects stay on the sites that own them.",
    date: "2026-09-04",
    source: "Tiger Studio",
    url: site.links.websiteRepo,
    kind: "news",
    category: "Studio",
  },
  {
    slug: "pointers-not-copies",
    title: "We publish by pointing outward",
    excerpt:
      "Each card on this site is a pointer. Follow it to the canonical page — a repository, a release note, or another destination.",
    date: "2026-09-04",
    source: "Tiger Studio",
    url: site.links.github,
    kind: "post",
    category: "Studio",
  },
  {
    slug: "first-project",
    title: "First studio project is on GitHub",
    excerpt:
      "The first Tiger Studio project is tracked in its own repository. Follow it for commits, issues, and future release notes.",
    date: "2026-09-02",
    source: "GitHub",
    url: site.links.firstProject,
    kind: "news",
    category: "Projects",
  },
  {
    slug: "website-origin",
    title: "Website origin commit",
    excerpt:
      "The Next.js codebase for this hub is public. Clone it, open an issue, or add a pointer in the content file.",
    date: "2026-09-04",
    source: "GitHub",
    url: site.links.websiteRepo,
    kind: "changelog",
    category: "Website",
  },
  {
    slug: "org-created",
    title: "Studio organization on GitHub",
    excerpt:
      "The GitHub organization is the source of truth for repositories, project notes, and release history.",
    date: "2026-09-02",
    source: "GitHub",
    url: site.links.github,
    kind: "changelog",
    category: "Organization",
  },
  {
    slug: "project-1-repo",
    title: "Project 1 repository created",
    excerpt:
      "The first project repository is live. Watch it for the living changelog as work lands.",
    date: "2026-09-02",
    source: "GitHub",
    url: site.links.firstProject,
    kind: "changelog",
    category: "Projects",
  },
];

export const destinations: Destination[] = [
  {
    slug: "github",
    name: "Tiger Studio on GitHub",
    description: "Repositories, issues, and the living changelog for every studio project.",
    url: site.links.github,
    category: "Engineering",
    accent: "purple",
  },
  {
    slug: "website-repo",
    name: "This website's source",
    description: "The Next.js codebase for the Tiger Studio hub, deployed on Vercel.",
    url: site.links.websiteRepo,
    category: "Engineering",
    accent: "teal",
  },
  {
    slug: "project-1",
    name: "Project 1",
    description: "The first Tiger Studio project. Follow it for posts and release notes.",
    url: site.links.firstProject,
    category: "Engineering",
    accent: "gold",
  },
  {
    slug: "vercel",
    name: "Vercel",
    description: "Where this hub is hosted. Docs, deploys, and the platform we ship on.",
    url: "https://vercel.com/docs",
    category: "Tools",
    accent: "blue",
  },
  {
    slug: "nextjs",
    name: "Next.js",
    description: "The framework behind the hub — App Router, metadata, and static pages.",
    url: "https://nextjs.org/docs",
    category: "Tools",
    accent: "orange",
  },
];

export const stats = [
  { value: "1", label: "Student passion club" },
  { value: String(destinations.length), label: "Destinations we point to" },
  { value: String(pointers.filter((p) => p.kind === "news" || p.kind === "post").length), label: "News pointers" },
  { value: String(pointers.filter((p) => p.kind === "changelog").length), label: "Changelog entries" },
] as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/news", label: "News" },
  { href: "/changelog", label: "Changelog" },
  { href: "/destinations", label: "Destinations" },
  { href: "/contact", label: "Contact" },
] as const;

export const utilityNav = [
  { href: "/destinations", label: "Quick Links", external: false },
  { href: site.links.github, label: "GitHub", external: true },
  { href: "/contact", label: "Join", external: false },
] as const;

export function newsPointers() {
  return pointers
    .filter((p) => p.kind === "news" || p.kind === "post")
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function changelogPointers() {
  return pointers
    .filter((p) => p.kind === "changelog")
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function latestPointers(limit = 4) {
  return [...pointers].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}

export const newsCategories = [
  "All",
  ...Array.from(new Set(newsPointers().map((p) => p.category))),
];

export const destinationCategories = [
  "All",
  ...Array.from(new Set(destinations.map((d) => d.category))),
];
