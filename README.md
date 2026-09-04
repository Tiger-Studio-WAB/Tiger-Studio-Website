# Tiger Studio

Public website for **Tiger Studio**, a student passion club.

The site is an organization hub: home, about, news, changelog, destinations, and contact. News, changelogs, and posts are **pointers** — each card opens the website that actually hosts the story.

## Stack

- Next.js App Router on Vercel
- TypeScript and Tailwind CSS
- Live hub data from the GitHub organization API (repos + events), refreshed about every two minutes

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Optional: copy `.env.example` to `.env.local` and set `GITHUB_TOKEN` to raise GitHub API rate limits. `GITHUB_ORG` defaults to `Tiger-Studio-WAB`.

## How the data stays live

News, changelogs, destinations, stats, search, and `/api/feed` are assembled in `src/lib/hub.ts` from:

- public repositories on the GitHub organization
- recent organization events (pushes, pull requests, issues, releases, new repos)

A repository `homepage` field, if set, is used as the destination URL so the hub can point at another website. Tool links (Vercel, Next.js) stay in `src/lib/content.ts`.

## Deploy on Vercel

This repository is ready for Vercel (Next.js, `vercel.ts`). Import the GitHub repo in the Vercel dashboard, or from the CLI:

```bash
npx vercel
```
