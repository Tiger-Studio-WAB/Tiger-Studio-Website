# Tiger Studio

Public website for **Tiger Studio**, a passion club of the [Western Academy of Beijing](https://wab.edu/).

The site is an organization hub: home, about, news, changelog, destinations, and contact. News, changelogs, and posts are **pointers** — each card opens the website that actually hosts the story (WAB Learning News, GitHub, and other destinations).

## Theme

Visual language follows [wab.edu](https://wab.edu/): navy `#0E2034`, WAB red `#D72316`, blue `#2262D5`, gold `#F4D348`, and the teal / cyan / purple three-bar mark.

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

Production deploys follow the Git integration once the project is linked.
