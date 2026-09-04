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
  category: "School" | "News" | "Engineering" | "Community" | "Learning";
  accent: "red" | "blue" | "gold" | "teal" | "purple" | "orange";
};

export const pointers: Pointer[] = [
  {
    slug: "wab-podcast-joy-learning",
    title: "WAB Podcast | Joy, Learning and What Comes Next",
    excerpt:
      "Dr. Marta Medved Krajnovic and Stephen Taylor celebrate a strong start and explore what learning looks like in 2026–2027.",
    date: "2026-08-28",
    source: "WAB Learning News",
    url: "https://www.wab-edu.cn/whats-happening/learning-news",
    kind: "news",
    category: "Whole School",
  },
  {
    slug: "university-pathways",
    title: "Building Strong University Pathways for Every WAB Student",
    excerpt:
      "The High School Counseling team travels the world — and brings 60–80 universities to campus each year — so every student finds a right-fit pathway.",
    date: "2026-08-20",
    source: "WAB Learning News",
    url: "https://wab.edu/news",
    kind: "news",
    category: "High School",
  },
  {
    slug: "ib-results-2026",
    title: "Celebrating the IB Results of WAB's Class of 2026",
    excerpt:
      "From WAB to the world: the Class of 2026 celebrates outstanding IB results and exciting futures ahead.",
    date: "2026-07-08",
    source: "WAB Learning News",
    url: "https://wab.edu/news",
    kind: "news",
    category: "High School",
  },
  {
    slug: "refreshed-es-spaces",
    title: "Designed for Deeper Learning — Our Refreshed ES Spaces",
    excerpt:
      "From the Silk Road to the water towns of Jiangnan, WAB's new Elementary School spaces take learning on a journey through China.",
    date: "2026-06-18",
    source: "WAB Learning News",
    url: "https://wab.edu/news",
    kind: "news",
    category: "Elementary School",
  },
  {
    slug: "madfest-2026",
    title: "MADFest 2026: A Day That Belonged to Every Student",
    excerpt:
      "MADFest is a joyful, community-wide Middle School celebration where every student showcases creative growth in the arts.",
    date: "2026-05-22",
    source: "WAB Learning News",
    url: "https://wab.edu/news",
    kind: "news",
    category: "Middle School",
  },
  {
    slug: "tiger-leadership-2025",
    title: "Building Confidence Through Tiger Leadership",
    excerpt:
      "Students coach teams, produce live events, and create moments that bring the community together — including media production through TSEN.",
    date: "2025-11-12",
    source: "WAB Learning News",
    url: "https://www.wab-edu.cn/whats-happening/learning-news/view-page/~board/news/post/tiger-leadership-2025",
    kind: "post",
    category: "Community",
  },
  {
    slug: "website-origin",
    title: "Tiger Studio Website — origin commit",
    excerpt:
      "The public home for Tiger Studio launches as a hub that points to news, changelogs, and other club destinations across the web.",
    date: "2026-09-04",
    source: "GitHub",
    url: site.links.websiteRepo,
    kind: "changelog",
    category: "Website",
  },
  {
    slug: "org-created",
    title: "Tiger Studio WAB organization on GitHub",
    excerpt:
      "The club's GitHub organization is the source of truth for repositories, project notes, and release history.",
    date: "2026-09-02",
    source: "GitHub",
    url: site.links.github,
    kind: "changelog",
    category: "Organization",
  },
  {
    slug: "wab-project-1",
    title: "WAB-Project-1 — first Tiger Studio project",
    excerpt:
      "The first project of WAB Tiger Studio is tracked on GitHub. Follow the repository for commits, issues, and future release notes.",
    date: "2026-09-02",
    source: "GitHub",
    url: site.links.firstProject,
    kind: "changelog",
    category: "Projects",
  },
];

export const destinations: Destination[] = [
  {
    slug: "wab",
    name: "Western Academy of Beijing",
    description:
      "The official school website — admissions, learning, campus life, and the WAB story.",
    url: site.links.wab,
    category: "School",
    accent: "red",
  },
  {
    slug: "wab-news",
    name: "WAB Learning News",
    description:
      "Day-to-day learning stories from Elementary, Middle, and High School.",
    url: site.links.wabNews,
    category: "News",
    accent: "blue",
  },
  {
    slug: "github",
    name: "Tiger Studio on GitHub",
    description:
      "Repositories, issues, and the living changelog for every club project.",
    url: site.links.github,
    category: "Engineering",
    accent: "purple",
  },
  {
    slug: "website-repo",
    name: "This website's source",
    description:
      "The Next.js codebase for the Tiger Studio hub, deployed on Vercel.",
    url: site.links.websiteRepo,
    category: "Engineering",
    accent: "teal",
  },
  {
    slug: "project-1",
    name: "WAB-Project-1",
    description: "The first Tiger Studio project. Follow it for posts and release notes.",
    url: site.links.firstProject,
    category: "Engineering",
    accent: "gold",
  },
  {
    slug: "tiger-leadership",
    name: "Tiger Leadership",
    description:
      "WABX leadership pathways — coaching, event management, and student media.",
    url: "https://www.wab-edu.cn/student-experience/athletics/tiger-leadership",
    category: "Community",
    accent: "orange",
  },
  {
    slug: "how-we-learn",
    name: "How we learn",
    description:
      "WAB's IB curriculum and the learning model that shapes Tiger Studio's work.",
    url: "https://www.wab-edu.cn/how-we-learn",
    category: "Learning",
    accent: "teal",
  },
  {
    slug: "wab-contact",
    name: "Contact WAB",
    description: "Campus address, phone, and official school contact channels.",
    url: site.links.contactWab,
    category: "School",
    accent: "blue",
  },
];

export const stats = [
  { value: "1", label: "Passion club at WAB" },
  { value: String(destinations.length), label: "Destinations we point to" },
  { value: String(pointers.filter((p) => p.kind === "news").length), label: "News pointers" },
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
  { href: site.links.wab, label: "WAB", external: true },
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
