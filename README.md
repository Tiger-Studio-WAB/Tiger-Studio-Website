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
   - Site URL: your live Vercel URL, e.g. `https://tiger-studio-website.vercel.app`
   - Redirect URLs:
     - `https://tiger-studio-website.vercel.app/auth/callback`
     - `http://localhost:3000/auth/callback`
6. **Authentication → Providers**
   - Disable Email.
   - Enable **GitHub** (see below).
   - Keep **Azure** enabled if you have an Entra app; otherwise GitHub still works.

### GitHub OAuth (Join)

You can create this in your own GitHub account.

1. GitHub → Settings → Developer settings → [OAuth Apps](https://github.com/settings/developers) → **New OAuth App**
2. Application name: `Tiger Studio`
3. Homepage URL: `https://tiger-studio-website.vercel.app`
4. Authorization callback URL: `https://<project-ref>.supabase.co/auth/v1/callback`  
   `<project-ref>` is the subdomain in `NEXT_PUBLIC_SUPABASE_URL`
5. Register, then **Generate a new client secret**
6. In Supabase → Authentication → Providers → GitHub: enable it and paste the Client ID and secret
7. Redeploy, then try Join

Microsoft/Azure still needs an Entra app registration. If Azure portal is blocked, use GitHub.

`GITHUB_TOKEN` on Vercel is separate. That token is only for reading public org stats on the home page. It is not used for Join.

## Docs and support

There is no `docs` or `support` repository in the organization yet. Create two **public** repos on [Tiger-Studio-WAB](https://github.com/Tiger-Studio-WAB):

1. [Create `docs`](https://github.com/new?name=docs&owner=Tiger-Studio-WAB)
2. [Create `support`](https://github.com/new?name=support&owner=Tiger-Studio-WAB)

Put guides in `docs` and help/issue templates in `support`. After they exist, this hub will list them under Products. `/docs` stays a placeholder until those repos are created.

## Deploy on Vercel

Import the GitHub repo in the Vercel dashboard, or from the CLI:

```bash
npx vercel
```
