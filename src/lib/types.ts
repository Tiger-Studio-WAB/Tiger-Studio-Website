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
  category: "Engineering" | "News" | "Community" | "Tools" | "Docs" | "Support";
  accent: "red" | "blue" | "gold" | "teal" | "purple" | "orange";
};

export type HubStat = {
  value: string;
  label: string;
};

export type LanguageStat = {
  name: string;
  bytes: number;
};

export type OrbitCommit = {
  id: string;
  message: string;
  repo: string;
  url: string;
};

export type HubData = {
  pointers: Pointer[];
  destinations: Destination[];
  news: Pointer[];
  changelog: Pointer[];
  stats: HubStat[];
  languages: string[];
  languageStats: LanguageStat[];
  recentCommits: OrbitCommit[];
  pullRequestCount: number;
  commitCount: number;
  fetchedAt: string;
  ok: boolean;
};
