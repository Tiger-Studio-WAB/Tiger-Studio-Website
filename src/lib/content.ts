import { site } from "@/lib/site";
import type { Destination } from "@/lib/types";

export const nav = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/join", label: "Join" },
  { href: "/docs", label: "Docs" },
] as const;

export const toolDestinations: Destination[] = [
  {
    slug: "github-org",
    name: "Tiger Studio on GitHub",
    description: "Repositories, issues, and the living changelog for every studio project.",
    url: site.links.github,
    category: "Engineering",
    accent: "purple",
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

export const accents = ["red", "blue", "gold", "teal", "purple", "orange"] as const;
