# Tiger Studio

Public website for **Tiger Studio**, a student passion club.

The site is an organization hub: home, about, news, changelog, destinations, and contact. News, changelogs, and posts are **pointers** — each card opens the website that actually hosts the story.

## Stack

- Next.js App Router on Vercel
- TypeScript and Tailwind CSS
- Content in `src/lib/content.ts` and `src/lib/site.ts`

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Add a pointer

Edit `src/lib/content.ts`:

- `pointers` — news, posts, and changelog entries. Set `url` to the canonical page on another site.
- `destinations` — the directory of websites the hub should send people to.

The JSON feed at `/api/feed` lists the same records.

## Deploy on Vercel

This repository is ready for Vercel (Next.js, `vercel.ts`). Import the GitHub repo in the Vercel dashboard, or from the CLI:

```bash
npx vercel
```
