import { cache } from "react";
import { accents, toolDestinations } from "@/lib/content";
import {
  DOCS_REPO,
  SUPPORT_REPO,
  fetchStudioEvents,
  fetchStudioOrbit,
  fetchStudioRepos,
  repoShortName,
  type GitHubEvent,
  type GitHubRepo,
} from "@/lib/github";
import type { Destination, HubData, Pointer } from "@/lib/types";

function publicText(value: string) {
  return value
    .replace(/Western Academy of Beijing/gi, "")
    .replace(/\bWab\b/gi, "")
    .replace(/\bWAB[-_]?/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/^[-_:\s"]+|[-_:\s"]+$/g, "")
    .trim();
}

function day(iso: string) {
  return iso.slice(0, 10);
}

function excerpt(text: string | null | undefined, fallback: string) {
  const trimmed = (text ?? "").replace(/\s+/g, " ").trim();
  if (!trimmed) return fallback;
  return trimmed.length > 180 ? `${trimmed.slice(0, 177)}…` : trimmed;
}

function githubRepoUrl(fullName: string) {
  return `https://github.com/${fullName}`;
}

function pointerFromRepo(repo: GitHubRepo): Pointer {
  const name = publicText(repo.name) || repo.name;
  const description = publicText(repo.description ?? "") || undefined;
  return {
    slug: `repo-${repo.name}`,
    title: description || `${name} is public`,
    excerpt: excerpt(
      description,
      `Updated ${day(repo.pushed_at)}. Open the repository for commits, issues, and notes.`,
    ),
    date: day(repo.pushed_at || repo.updated_at),
    source: "GitHub",
    url: repo.homepage?.trim() || repo.html_url,
    kind: "news",
    category: "Projects",
  };
}

const STUDIO_GUIDES: Record<string, Omit<Destination, "accent">> = {
  [DOCS_REPO]: {
    slug: "docs",
    name: "Docs",
    description: "Guides from the public docs repository.",
    url: "/docs",
    category: "Docs",
  },
  [SUPPORT_REPO]: {
    slug: "support",
    name: "Support",
    description: "Help, issue templates, and how to get unstuck.",
    url: "/docs#support",
    category: "Docs",
  },
};

function destinationFromRepo(repo: GitHubRepo, index: number): Destination {
  const pinned = STUDIO_GUIDES[repo.name.toLowerCase()];
  if (pinned) {
    return {
      ...pinned,
      accent: accents[index % accents.length],
    };
  }

  const homepage = repo.homepage?.trim();
  const name = publicText(repo.name) || repo.name;
  const description = publicText(repo.description ?? "");
  return {
    slug: repo.name.toLowerCase(),
    name,
    description:
      description ||
      `${repo.language ? `${repo.language} project` : "Studio project"} on GitHub.`,
    url: homepage || repo.html_url,
    category: homepage ? "Community" : "Engineering",
    accent: accents[index % accents.length],
  };
}

function pinnedGuideDestinations(): Destination[] {
  return [
    { ...STUDIO_GUIDES[DOCS_REPO], accent: "gold" },
    { ...STUDIO_GUIDES[SUPPORT_REPO], accent: "teal" },
  ];
}

function sortDestinations(items: Destination[]) {
  const rank = (item: Destination) => {
    if (item.slug === "docs") return 0;
    if (item.slug === "support") return 1;
    if (item.category === "Docs") return 2;
    return 3;
  };
  return [...items].sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name));
}

function pointerFromEvent(event: GitHubEvent): Pointer | null {
  const repoName = publicText(repoShortName(event.repo.name)) || repoShortName(event.repo.name);
  if (repoShortName(event.repo.name) === ".github") return null;
  const repoUrl = githubRepoUrl(event.repo.name);
  const payload = event.payload;
  const date = day(event.created_at);

  if (event.type === "ReleaseEvent") {
    const release = payload.release as { name?: string; body?: string; html_url?: string } | undefined;
    return {
      slug: `release-${event.id}`,
      title: publicText(release?.name || "") || `Release on ${repoName}`,
      excerpt: excerpt(publicText(release?.body || ""), `A new release landed in ${repoName}.`),
      date,
      source: "GitHub",
      url: release?.html_url || repoUrl,
      kind: "changelog",
      category: repoName,
    };
  }

  if (event.type === "PushEvent") {
    const commits = (payload.commits as { message?: string }[] | undefined) ?? [];
    const size = typeof payload.size === "number" ? payload.size : commits.length;
    if (!size) return null;
    const head = publicText(commits[0]?.message?.split("\n")[0] ?? "");
    return {
      slug: `push-${event.id}`,
      title: head || `${size} commit${size === 1 ? "" : "s"} to ${repoName}`,
      excerpt: `${size} commit${size === 1 ? "" : "s"} pushed to ${repoName}. Open GitHub for the full diff.`,
      date,
      source: "GitHub",
      url: repoUrl,
      kind: "changelog",
      category: repoName,
    };
  }

  if (event.type === "PullRequestEvent") {
    const action = payload.action as string | undefined;
    const pr = payload.pull_request as
      | { title?: string; body?: string; html_url?: string; merged?: boolean }
      | undefined;
    if (action !== "opened" && action !== "closed") return null;
    const merged = Boolean(pr?.merged);
    return {
      slug: `pr-${event.id}`,
      title: publicText(pr?.title || "") || `Pull request on ${repoName}`,
      excerpt: excerpt(
        publicText(pr?.body || ""),
        merged ? `A pull request merged in ${repoName}.` : `A pull request ${action} in ${repoName}.`,
      ),
      date,
      source: "GitHub",
      url: pr?.html_url || repoUrl,
      kind: "changelog",
      category: repoName,
    };
  }

  if (event.type === "IssuesEvent") {
    const action = payload.action as string | undefined;
    const issue = payload.issue as { title?: string; body?: string; html_url?: string } | undefined;
    if (action !== "opened") return null;
    return {
      slug: `issue-${event.id}`,
      title: publicText(issue?.title || "") || `Issue opened on ${repoName}`,
      excerpt: excerpt(publicText(issue?.body || ""), `A new issue was opened in ${repoName}.`),
      date,
      source: "GitHub",
      url: issue?.html_url || repoUrl,
      kind: "news",
      category: "Issues",
    };
  }

  if (event.type === "CreateEvent") {
    const refType = payload.ref_type as string | undefined;
    if (refType !== "repository" && refType !== "tag") return null;
    return {
      slug: `create-${event.id}`,
      title: refType === "tag" ? `New tag on ${repoName}` : `${repoName} created`,
      excerpt:
        refType === "tag"
          ? `A tag was published for ${repoName}.`
          : `A new public repository appeared in the studio organization.`,
      date,
      source: "GitHub",
      url: repoUrl,
      kind: refType === "tag" ? "changelog" : "news",
      category: repoName,
    };
  }

  if (event.type === "PublicEvent") {
    return {
      slug: `public-${event.id}`,
      title: `${repoName} is public`,
      excerpt: `${repoName} was published. Open it for source, issues, and release notes.`,
      date,
      source: "GitHub",
      url: repoUrl,
      kind: "news",
      category: "Projects",
    };
  }

  return null;
}

function uniqueByKey<T extends { slug: string; url: string }>(items: T[], key: (item: T) => string) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const id = key(item);
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

export const getHub = cache(async (): Promise<HubData> => {
  try {
    const [repos, events] = await Promise.all([fetchStudioRepos(), fetchStudioEvents()]);
    const orbit = await fetchStudioOrbit(repos);
    const repoDestinations = repos.map((repo, index) => destinationFromRepo(repo, index));
    const destinations = sortDestinations(
      uniqueByKey([...pinnedGuideDestinations(), ...repoDestinations, ...toolDestinations], (item) =>
        item.slug === "docs" || item.slug === "support" ? item.slug : item.url,
      ),
    );

    const fromEvents = events
      .map(pointerFromEvent)
      .filter((item): item is Pointer => item !== null);
    const fromRepos = repos.map(pointerFromRepo);
    const pointers = uniqueByKey(
      [...fromEvents, ...fromRepos].sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug)),
      (item) => item.slug,
    );

    const news = pointers.filter((item) => item.kind === "news" || item.kind === "post");
    const changelog = pointers.filter((item) => item.kind === "changelog");

    return {
      pointers,
      destinations,
      news,
      changelog,
      stats: [
        { value: String(repos.length), label: "Public projects" },
        { value: String(orbit.pullRequestCount), label: "Pull requests" },
        { value: String(orbit.commitCount), label: "Commits" },
        { value: String(orbit.languages.length), label: "Languages" },
      ],
      languages: orbit.languages,
      pullRequestCount: orbit.pullRequestCount,
      commitCount: orbit.commitCount,
      fetchedAt: new Date().toISOString(),
      ok: true,
    };
  } catch (error) {
    console.error("Failed to load GitHub hub data", error);
    return {
      pointers: [],
      destinations: sortDestinations(
        uniqueByKey([...pinnedGuideDestinations(), ...toolDestinations], (item) => item.slug),
      ),
      news: [],
      changelog: [],
      stats: [
        { value: "—", label: "Public projects" },
        { value: "—", label: "Pull requests" },
        { value: "—", label: "Commits" },
        { value: "—", label: "Languages" },
      ],
      languages: [],
      pullRequestCount: 0,
      commitCount: 0,
      fetchedAt: new Date().toISOString(),
      ok: false,
    };
  }
});
