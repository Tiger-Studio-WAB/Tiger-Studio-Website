# Tiger Studio

Public website for **Tiger Studio**, a student passion club.

The hub is: home, products, about, join, and docs. News and changelogs remain pointers to GitHub. Join hosts **Proj.Help** — post an idea, get replies, translate English/Chinese — behind school Microsoft sign-in.

## Stack

- Next.js App Router on Vercel
- TypeScript and Tailwind CSS
- Live GitHub org data (repos, languages, pull requests, commits, events)
- Optional Supabase + Microsoft (Entra ID) for the ideas board

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local`. `GITHUB_TOKEN` raises GitHub rate limits. `GITHUB_ORG` defaults to `Tiger-Studio-WAB`.

To turn on Join / ideas:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- Microsoft provider on the Supabase project
- Apply `supabase/migrations/20260904112922_init_proj_help.sql`

Without those, Join and Login show a setup message instead of a broken board.

## Docs and support

There is no docs or support repository in the organization yet. Create public repos named `docs` and `support`, then this site can point at them from `/docs` and Products.

## Deploy on Vercel

Import the GitHub repo in the Vercel dashboard, or from the CLI:

```bash
npx vercel
```
