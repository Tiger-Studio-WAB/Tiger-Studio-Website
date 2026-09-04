const ORG = process.env.GITHUB_ORG ?? "Tiger-Studio-WAB";

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
  languages: string[];
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

export async function fetchStudioRepos(): Promise<GitHubRepo[]> {
  const repos = await github<GitHubRepo[]>(
    `/orgs/${ORG}/repos?per_page=100&sort=updated&type=public`,
  );
  return repos.filter((repo) => !repo.fork && !repo.archived && repo.name !== ".github");
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

async function collectLanguages(repos: GitHubRepo[]): Promise<string[]> {
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
    .map(([name]) => name);
}

export async function fetchStudioOrbit(repos: GitHubRepo[]): Promise<StudioOrbit> {
  const [languages, pullRequestCount, commitCount] = await Promise.all([
    collectLanguages(repos),
    countPullRequests(),
    countCommits(repos),
  ]);

  return { languages, pullRequestCount, commitCount };
}

export function repoShortName(fullName: string) {
  return fullName.includes("/") ? fullName.split("/")[1] : fullName;
}

export type { GitHubRepo, GitHubEvent };
