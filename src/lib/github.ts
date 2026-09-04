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
  stargazers_count: number;
};

type GitHubEvent = {
  id: string;
  type: string | null;
  created_at: string;
  repo: { name: string; url: string };
  payload: Record<string, unknown>;
};

async function github<T>(path: string): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "tiger-studio-hub",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`https://api.github.com${path}`, {
    headers,
    next: { revalidate: 120, tags: ["github-hub"] },
  });

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

export function repoShortName(fullName: string) {
  return fullName.includes("/") ? fullName.split("/")[1] : fullName;
}

export type { GitHubRepo, GitHubEvent };
