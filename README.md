# Tiger Studio

Public website for **Tiger Studio**, a student passion club.

The hub is: home, products, about, join, and docs. News and changelogs remain pointers to GitHub. Join hosts **Proj.Help** — post an idea, get replies, translate English/Chinese — behind GitHub or Microsoft sign-in.

## Stack

- Next.js App Router on Vercel
- TypeScript and Tailwind CSS
- Live GitHub org data (repos, languages, pull requests, commits, events)
- Optional Supabase + GitHub or Microsoft sign-in for the ideas board

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local`. `GITHUB_TOKEN` raises GitHub API rate limits for the public hub. `GITHUB_ORG` defaults to `Tiger-Studio-WAB`.

## After connecting Supabase on Vercel

The Marketplace integration only syncs environment variables. Join still needs a schema, OAuth providers, and a redeploy.

1. **Confirm env vars** in the Vercel project → Settings → Environment Variables. You should see at least:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (or `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   Scoped to Production, Preview, and Development.
2. **Redeploy** after those variables appear. `NEXT_PUBLIC_` values are baked in at build time.
3. **Open Supabase Studio** from the Vercel project → Storage → Supabase → **Open in Supabase**.
4. **Run the schema** in Studio’s **SQL Editor** (not Vercel Query). Paste each of these files in full and Run:
   - `supabase/migrations/20260904112922_init_proj_help.sql`
   - `supabase/migrations/20260904140000_allow_github_auth.sql`
5. **Authentication → URL configuration**
   These are allowlist entries in the Supabase dashboard, not pages you visit.
   - **Site URL:** the site origin only (no `/auth/callback`, no `**`):
     `https://tiger-studio-website.vercel.app`
   - **Redirect URLs:** paste these **as written**, including the two asterisks. `**` is a Supabase wildcard so query strings (`?code=...`) still match. The real page is `/auth/callback`; there is no `/auth/callback**` URL to find.
     - `https://tiger-studio-website.vercel.app/auth/callback**`
     - `http://localhost:3000/auth/callback**`
6. **Authentication → Providers**
   - Disable Email.
   - Enable **GitHub** (see below).
   - Keep **Azure** enabled if you have an Entra app; otherwise GitHub still works.

### GitHub OAuth (Join)

You can create this in your own GitHub account.

If GitHub sign-in “doesn’t finish”, the Authorization callback URL is almost always wrong.

1. GitHub → Settings → Developer settings → [OAuth Apps](https://github.com/settings/developers) → **New OAuth App**
2. Application name: `Tiger Studio`
3. Homepage URL: `https://tiger-studio-website.vercel.app`
4. Authorization callback URL must be the **Supabase** callback, not the Vercel site:
   `https://<project-ref>.supabase.co/auth/v1/callback`  
   `<project-ref>` is the subdomain in `NEXT_PUBLIC_SUPABASE_URL`.  
   Do **not** put `https://tiger-studio-website.vercel.app/auth/callback` here.
5. Register, then **Generate a new client secret**
6. In Supabase → Authentication → Providers → GitHub: enable it and paste the Client ID and secret
7. Redeploy, then try Join. If it still fails, `/auth/error` now shows the real error and the exact callback URL to paste.

Microsoft/Azure still needs an Entra app registration. If Azure portal is blocked, use GitHub.

`GITHUB_TOKEN` on Vercel is separate. That token is only for reading public org stats on the home page. It is not used for Join.

## Docs and support

The public [`docs`](https://github.com/Tiger-Studio-WAB/docs) and [`support`](https://github.com/Tiger-Studio-WAB/support) repositories are wired into the hub.

**Docs** (`/docs`) is a developer handbook: left sidebar, one page per Markdown file, one sidebar section per folder. That matches how Meta and Microsoft Fabric organize docs. A starter tree lives in `content/docs/` on this site. Files in the GitHub `docs` repo override the starter (except the default GitHub README stub).

To add a section: create a folder in the `docs` repo, add `index.md`, and optionally `_category.json`. See `content/docs/how-to-format.md`.

**Support** (`/support`) is separate. It is for issues and help, not guides. Issue templates belong in the `support` repo.

## Deploy on Vercel

Import the GitHub repo in the Vercel dashboard, or from the CLI:

```bash
npx vercel
```
