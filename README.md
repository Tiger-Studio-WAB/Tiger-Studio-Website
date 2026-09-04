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

## After connecting Supabase on Vercel

The Marketplace integration only syncs environment variables. Join still needs a schema, Microsoft login, and a redeploy.

1. **Confirm env vars** in the Vercel project → Settings → Environment Variables. You should see at least:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (or `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   Scoped to Production, Preview, and Development.
2. **Redeploy** the site after those variables appear. `NEXT_PUBLIC_` values are baked in at build time.
3. **Open Supabase Studio** from the Vercel project → Storage → Supabase → **Open in Supabase**.
4. **Run the schema** in Studio’s **SQL Editor** (left sidebar): paste the full file `supabase/migrations/20260904112922_init_proj_help.sql` and Run.

   Do **not** paste that file into Vercel Storage → Browser → Query. That box only accepts one statement and returns `cannot insert multiple commands into a prepared statement`.

   Alternative: copy `POSTGRES_URL` from Vercel env vars and run locally:

   ```bash
   psql "$POSTGRES_URL" -f supabase/migrations/20260904112922_init_proj_help.sql
   ```
5. **Authentication → URL configuration**
   - Site URL: your live Vercel URL, e.g. `https://tiger-studio-website.vercel.app`
   - Redirect URLs:
     - `https://tiger-studio-website.vercel.app/auth/callback`
     - `https://*-*.vercel.app/auth/callback` (preview deploys)
     - `http://localhost:3000/auth/callback` (local)
6. **Authentication → Providers**
   - Disable Email.
   - Enable **Azure**. You still have to create an Entra ID app (see below) and paste the client ID, secret, and optional tenant URL.
7. **Authentication → Hooks** (optional but recommended): set Before User Created to `hook_restrict_signup_to_school` from the migration.

### Microsoft Entra ID

The Vercel integration does **not** create Microsoft login. In [Azure Portal](https://portal.azure.com) → Microsoft Entra ID → App registrations → New registration:

- Name: Tiger Studio
- Supported accounts: the school tenant only if you have admin access, otherwise accounts in any org directory
- Redirect URI (Web): `https://<project-ref>.supabase.co/auth/v1/callback`  
  Find `<project-ref>` in `NEXT_PUBLIC_SUPABASE_URL` (`https://<project-ref>.supabase.co`)
- Create a client secret and copy the **Value**
- Optional claims on the ID token: `email` and `xms_edov`

Then paste the client ID, secret, and optional tenant URL (`https://login.microsoftonline.com/<tenant-id>`) into Supabase → Authentication → Providers → Azure.

Only school Microsoft emails on the allowed domain can use Join. The domain is not shown in the UI.

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
