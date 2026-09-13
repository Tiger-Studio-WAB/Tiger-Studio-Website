# Tiger Studio

Öffentliche Website für **Tiger Studio**, einen Schüler-Passion-Club.

Der Hub ist Start, Produkte, Über uns, Mitmachen, Docs und **Hilfe**. Hilfe ist eine Seite in der Seite: Ressourcen, Playtest-Teilen und Feedback. News sind vom Studio geschriebene Markdown-Texte. Mitmachen hostet weiter **Proj.Help** — Ideen, Antworten und Übersetzung — hinter GitHub- oder Microsoft-Anmeldung.

Die Oberfläche gibt es auf **Englisch**, **Chinesisch** und **Deutsch**. Fehlt eine Handbuch- oder News-Übersetzung, erscheint Englisch.

Übersetzungen: [README.md](README.md) · [README.zh.md](README.zh.md)

<!-- German draft for Mingli29 to review. -->

## Stack

- Next.js App Router auf Vercel
- TypeScript und Tailwind CSS
- Live-GitHub-Org-Daten (Repos, Sprachen, Pull Requests, Commits)
- Markdown-Docs aus dem `docs`-Repo, News aus dem `news`-Repo oder `content/news/`
- Optionales Supabase + GitHub- oder Microsoft-Login für Ideen, Teilen, Feedback und Abzeichen

## Lokale Entwicklung

```bash
npm install
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000).

Kopiere `.env.example` nach `.env.local`. `GITHUB_TOKEN` erhöht die GitHub-API-Limits für den öffentlichen Hub. `GITHUB_ORG` ist standardmäßig `Tiger-Studio-WAB`. `NEWS_REPO` ist standardmäßig `news`. Solange dieses GitHub-Repo fehlt, reichen lokale Dateien in `content/news/`.

## Nach dem Verbinden von Supabase auf Vercel

Die Marketplace-Integration synchronisiert nur Umgebungsvariablen. Mitmachen braucht weiter ein Schema, OAuth-Provider und ein Redeploy.

1. **Env-Vars prüfen** im Vercel-Projekt → Settings → Environment Variables. Mindestens:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (oder `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   Für Production, Preview und Development.
2. **Neu deployen**, nachdem die Variablen da sind. `NEXT_PUBLIC_`-Werte werden zur Build-Zeit eingebacken.
3. **Supabase Studio öffnen** über Vercel-Projekt → Storage → Supabase → **Open in Supabase**.
4. **Schema ausführen** im **SQL Editor** von Studio (nicht Vercel Query). Jede Datei vollständig einfügen und Run:
   - `supabase/migrations/20260904112922_init_proj_help.sql`
   - `supabase/migrations/20260904140000_allow_github_auth.sql`
   - `supabase/migrations/20260913150000_hub_help_news.sql` (Deutsch, Teilen, Feedback, Abzeichen)
5. **Authentication → URL configuration**
   Das sind Allowlist-Einträge im Supabase-Dashboard, keine Seiten zum Öffnen.
   - **Site URL:** nur der Origin (kein `/auth/callback`, kein `**`):
     `https://tiger-studio-website.vercel.app`
   - **Redirect URLs:** **genau so einfügen**, inklusive der zwei Sterne. `**` ist ein Supabase-Platzhalter, damit Query-Strings (`?code=...`) matchen. Die echte Seite ist `/auth/callback`; es gibt keine URL `/auth/callback**`.
     - `https://tiger-studio-website.vercel.app/auth/callback**`
     - `http://localhost:3000/auth/callback**`
6. **Authentication → Providers**
   - Email aus.
   - **GitHub** an (siehe unten).
   - **Azure** an lassen, wenn eine Entra-App da ist; sonst reicht GitHub.

### GitHub OAuth (Mitmachen)

Das kannst du im eigenen GitHub-Konto anlegen.

Wenn GitHub-Login „nicht fertig wird“, stimmt fast immer die Authorization callback URL nicht.

1. GitHub → Settings → Developer settings → [OAuth Apps](https://github.com/settings/developers) → **New OAuth App**
2. Application name: `Tiger Studio`
3. Homepage URL: `https://tiger-studio-website.vercel.app`
4. Authorization callback URL muss der **Supabase**-Callback sein, nicht die Vercel-Site:
   `https://<project-ref>.supabase.co/auth/v1/callback`  
   `<project-ref>` ist die Subdomain in `NEXT_PUBLIC_SUPABASE_URL`.  
   **Nicht** `https://tiger-studio-website.vercel.app/auth/callback` hier eintragen.
5. Registrieren, dann **Generate a new client secret**
6. In Supabase → Authentication → Providers → GitHub: einschalten und Client ID plus Secret einfügen
7. Neu deployen, dann Mitmachen testen. Wenn es weiter scheitert, zeigt `/auth/error` den echten Fehler und die genaue Callback-URL.

Microsoft/Azure braucht weiter eine Entra-App-Registrierung. Ist das Azure-Portal blockiert, GitHub nutzen.

`GITHUB_TOKEN` auf Vercel ist etwas anderes. Der Token liest nur öffentliche Org-Stats auf der Startseite. Er wird nicht für Mitmachen genutzt.

## Docs, Hilfe und News

Die öffentlichen Repos [`docs`](https://github.com/Tiger-Studio-WAB/docs) und [`support`](https://github.com/Tiger-Studio-WAB/support) sind an den Hub angeschlossen.

**Docs** (`/docs`) ist das Entwicklerhandbuch: linke Sidebar, eine englische Seite pro Markdown-Datei, ein Sidebar-Abschnitt pro Ordner. Übersetzungen liegen als `file.zh.md` und `file.de.md` neben der Quelle. Sie sind Sprachvarianten, keine extra Nav-Einträge. Fehlt die Locale-Datei, erscheint die englische Seite.

Ein Starter-Baum liegt unter `content/docs/` auf dieser Website. Dateien im GitHub-`docs`-Repo überschreiben den Starter (außer dem Standard-GitHub-README-Stub).

**Hilfe** (`/help`) ist die Community-Hülle: Ressourcen, Playtest teilen, Feedback. `/docs`, `/support` und `/ideas` bleiben eigene URLs und stehen in der Hilfe-Navigation.

**News** (`/news`) rendert veröffentlichte Markdown-Texte aus dem GitHub-`news`-Repo, mit `content/news/` als lokalem Fallback. `/changelog` leitet nach `/news` um.

**Support** (`/support`) ist getrennt. Für Issues und Hilfe, nicht für Anleitungen. Issue-Vorlagen gehören ins `support`-Repo.

## Deploy auf Vercel

Das GitHub-Repo im Vercel-Dashboard importieren oder per CLI:

```bash
npx vercel
```
