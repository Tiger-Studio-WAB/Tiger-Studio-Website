import { site } from "@/lib/site";
import type { Destination } from "@/lib/types";

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
