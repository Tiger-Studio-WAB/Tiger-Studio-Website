import type { LanguageStat, OrbitCommit } from "@/lib/types";

export const STUDIO_ORG = process.env.GITHUB_ORG ?? "Tiger-Studio-WAB";
const ORG = STUDIO_ORG;
export const DOCS_REPO = "docs";
export const SUPPORT_REPO = "support";
const PINNED_REPOS = [DOCS_REPO, SUPPORT_REPO];

type GitHubRepo = {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  created_at: string;
  updated_at: string;
  language: string | null;
  default_branch: string;
  stargazers_count: number;
};

type GitHubEvent = {
  id: string;
  type: string | null;
  created_at: string;
  repo: { name: string; url: string };
  payload: Record<string, unknown>;
};

export type StudioOrbit = {
  languages: LanguageStat[];
  pullRequestCount: number;
  commitCount: number;
};

function githubHeaders(extra?: Record<string, string>) {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "tiger-studio-hub",
    "X-GitHub-Api-Version": "2022-11-28",
    ...extra,
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function githubResponse(path: string, extraHeaders?: Record<string, string>) {
  return fetch(`https://api.github.com${path}`, {
    headers: githubHeaders(extraHeaders),
    next: { revalidate: 120, tags: ["github-hub"] },
  });
}

async function github<T>(path: string): Promise<T> {
  const response = await githubResponse(path);
  if (!response.ok) {
    throw new Error(`GitHub ${response.status} for ${path}`);
  }
  return response.json() as Promise<T>;
}

export async function fetchNamedRepo(name: string): Promise<GitHubRepo | null> {
  try {
    const repo = await github<GitHubRepo>(`/repos/${ORG}/${name}`);
    if (repo.fork || repo.archived) return null;
    return repo;
  } catch {
    return null;
  }
}

export async function fetchStudioRepos(): Promise<GitHubRepo[]> {
  const repos = await github<GitHubRepo[]>(
    `/orgs/${ORG}/repos?per_page=100&sort=updated&type=public`,
  );
  const visible = repos.filter((repo) => !repo.fork && !repo.archived && repo.name !== ".github");
  const known = new Set(visible.map((repo) => repo.name.toLowerCase()));

  const extras = await Promise.all(
    PINNED_REPOS.filter((name) => !known.has(name)).map((name) => fetchNamedRepo(name)),
  );
  for (const extra of extras) {
    if (extra) visible.push(extra);
  }

  return visible;
}

type GitHubContent = {
  name: string;
  path: string;
  type: "file" | "dir" | string;
  download_url: string | null;
};

export type RepoMarkdownFile = {
  name: string;
  path: string;
  slug: string;
};

export function markdownSlug(path: string) {
  const withoutExt = path.replace(/\.md$/i, "");
  if (/^readme$/i.test(withoutExt)) return "readme";
  return withoutExt
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function listRepoContents(repo: string, path = ""): Promise<GitHubContent[]> {
  const suffix = path ? `/${path}` : "";
  try {
    const data = await github<GitHubContent | GitHubContent[]>(
      `/repos/${ORG}/${repo}/contents${suffix}`,
    );
    return Array.isArray(data) ? data : [data];
  } catch {
    return [];
  }
}

export async function fetchRepoMarkdownFiles(repo: string): Promise<RepoMarkdownFile[]> {
  const collected: RepoMarkdownFile[] = [];

  async function walk(path = "") {
    const items = await listRepoContents(repo, path);
    await Promise.all(
      items.map(async (item) => {
        if (item.type === "dir" && !item.name.startsWith(".")) {
          await walk(item.path);
          return;
        }
        if (item.type === "file" && /\.md$/i.test(item.name) && !item.name.startsWith(".")) {
          collected.push({
            name: item.name,
            path: item.path,
            slug: markdownSlug(item.path),
          });
        }
      }),
    );
  }

  await walk();
  return collected.sort((a, b) => {
    if (a.slug === "readme") return -1;
    if (b.slug === "readme") return 1;
    return a.path.localeCompare(b.path);
  });
}

export async function fetchRepoFileText(repo: string, path: string): Promise<string | null> {
  const response = await githubResponse(`/repos/${ORG}/${repo}/contents/${path}`, {
    Accept: "application/vnd.github.raw",
  });
  if (!response.ok) return null;
  return response.text();
}

export type RepoGuideFile = {
  path: string;
  text: string;
};

export async function fetchRepoGuideSources(repo: string): Promise<{
  markdown: RepoGuideFile[];
  categories: RepoGuideFile[];
}> {
  const markdown: RepoGuideFile[] = [];
  const categories: RepoGuideFile[] = [];

  async function walk(path = "") {
    const items = await listRepoContents(repo, path);
    await Promise.all(
      items.map(async (item) => {
        if (item.type === "dir" && !item.name.startsWith(".")) {
          await walk(item.path);
          return;
        }
        if (item.type !== "file" || item.name.startsWith(".") ) return;
        if (/\.md$/i.test(item.name) && !item.name.startsWith("_")) {
          const text = await fetchRepoFileText(repo, item.path);
          if (text) markdown.push({ path: item.path, text });
          return;
        }
        if (item.name === "_category.json") {
          const text = await fetchRepoFileText(repo, item.path);
          if (text) categories.push({ path: item.path, text });
        }
      }),
    );
  }

  await walk();
  return { markdown, categories };
}

export async function fetchStudioEvents(): Promise<GitHubEvent[]> {
  return github<GitHubEvent[]>(`/orgs/${ORG}/events?per_page=100`);
}

async function fetchRepoLanguages(fullName: string): Promise<Record<string, number>> {
  try {
    return await github<Record<string, number>>(`/repos/${fullName}/languages`);
  } catch {
    return {};
  }
}

async function countPullRequests(): Promise<number> {
  try {
    const data = await github<{ total_count: number }>(
      `/search/issues?q=${encodeURIComponent(`org:${ORG} is:pr`)}&per_page=1`,
    );
    return data.total_count ?? 0;
  } catch {
    return 0;
  }
}

function lastPageFromLink(link: string | null) {
  if (!link) return null;
  const match = link.match(/[?&]page=(\d+)>;\s*rel="last"/);
  return match ? Number(match[1]) : null;
}

async function countRepoCommits(repo: GitHubRepo): Promise<number> {
  const sha = encodeURIComponent(repo.default_branch || "main");
  try {
    const response = await githubResponse(
      `/repos/${repo.full_name}/commits?per_page=1&sha=${sha}`,
    );
    if (!response.ok) return 0;
    const last = lastPageFromLink(response.headers.get("link"));
    if (last) return last;
    const body = (await response.json()) as unknown[];
    return Array.isArray(body) ? body.length : 0;
  } catch {
    return 0;
  }
}

async function countCommits(repos: GitHubRepo[]): Promise<number> {
  try {
    const data = await github<{ total_count: number }>(
      `/search/commits?q=${encodeURIComponent(`org:${ORG}`)}&per_page=1`,
    );
    if (typeof data.total_count === "number") return data.total_count;
  } catch {
    // Unauthenticated commit search is often blocked; fall back per repo.
  }

  const counts = await Promise.all(repos.map((repo) => countRepoCommits(repo)));
  return counts.reduce((sum, value) => sum + value, 0);
}

async function collectLanguages(repos: GitHubRepo[]): Promise<LanguageStat[]> {
  const tallies = new Map<string, number>();

  const results = await Promise.all(
    repos.map(async (repo) => {
      const languages = await fetchRepoLanguages(repo.full_name);
      if (Object.keys(languages).length === 0 && repo.language) {
        return { [repo.language]: 1 };
      }
      return languages;
    }),
  );

  for (const languages of results) {
    for (const [name, bytes] of Object.entries(languages)) {
      tallies.set(name, (tallies.get(name) ?? 0) + bytes);
    }
  }

  return [...tallies.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name, bytes]) => ({ name, bytes }));
}

export async function fetchStudioOrbit(repos: GitHubRepo[]): Promise<StudioOrbit> {
  const [languages, pullRequestCount, commitCount] = await Promise.all([
    collectLanguages(repos),
    countPullRequests(),
    countCommits(repos),
  ]);

  return { languages, pullRequestCount, commitCount };
}

type GitHubCommit = {
  sha: string;
  html_url: string;
  commit: { message: string };
};

export async function fetchRecentStudioCommits(repos: GitHubRepo[]): Promise<OrbitCommit[]> {
  const newest = [...repos]
    .filter((repo) => repo.name !== ".github")
    .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))
    .slice(0, 5);

  const groups = await Promise.all(
    newest.map(async (repo) => {
      try {
        const commits = await github<GitHubCommit[]>(`/repos/${repo.full_name}/commits?per_page=2`);
        return commits.map((commit) => ({
          id: commit.sha,
          message: commit.commit.message.split("\n")[0]?.trim() ?? "",
          repo: repo.name,
          url: commit.html_url,
        }));
      } catch {
        return [];
      }
    }),
  );

  const seen = new Set<string>();
  const items: OrbitCommit[] = [];
  for (const commit of groups.flat()) {
    if (!commit.message || seen.has(commit.id) || seen.has(commit.message)) continue;
    if (/^initial commit$/i.test(commit.message) || /^merge (pull request|branch)\b/i.test(commit.message)) {
      continue;
    }
    seen.add(commit.id);
    seen.add(commit.message);
    items.push(commit);
    if (items.length >= 8) break;
  }
  return items;
}

export function repoShortName(fullName: string) {
  return fullName.includes("/") ? fullName.split("/")[1] : fullName;
}

export type { GitHubRepo, GitHubEvent };
