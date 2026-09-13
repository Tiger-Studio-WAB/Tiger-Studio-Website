# Tiger Studio

**Tiger Studio** 学生兴趣社团的公开网站。

站点包括首页、产品、关于、加入、文档和**帮助**。帮助是站点里的站点：资源、试玩分享和反馈。新闻是社团自己写的 Markdown。加入页仍然承载 **Proj.Help** —— 想法、回复和翻译 —— 需要 GitHub 或 Microsoft 登录。

界面提供**英文**、**中文**和**德文**。手册或新闻缺译文时，显示英文。

对照： [README.md](README.md) · [README.de.md](README.de.md)

## 技术栈

- Vercel 上的 Next.js App Router
- TypeScript 和 Tailwind CSS
- 实时 GitHub 组织数据（仓库、语言、拉取请求、提交）
- 文档来自 `docs` 仓库，新闻来自 `news` 仓库或 `content/news/`
- 可选 Supabase + GitHub 或 Microsoft 登录，用于想法、分享、反馈和徽章

## 本地开发

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

把 `.env.example` 复制为 `.env.local`。`GITHUB_TOKEN` 可以提高公开站点的 GitHub API 限额。`GITHUB_ORG` 默认是 `Tiger-Studio-WAB`。`NEWS_REPO` 默认是 `news`。在那个 GitHub 仓库建好之前，`content/news/` 里的本地文件就够用。

## 在 Vercel 上接好 Supabase 之后

Marketplace 集成只会同步环境变量。加入页还需要数据库结构、OAuth 提供方，以及重新部署。

1. **确认环境变量**，打开 Vercel 项目 → Settings → Environment Variables。至少应有：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`（或 `NEXT_PUBLIC_SUPABASE_ANON_KEY`）
   范围包含 Production、Preview 和 Development。
2. 这些变量出现后**重新部署**。`NEXT_PUBLIC_` 的值会在构建时写进产物。
3. 从 Vercel 项目 → Storage → Supabase → **Open in Supabase** 打开 **Supabase Studio**。
4. 在 Studio 的 **SQL Editor**（不要用 Vercel Query）里运行结构。把下面每个文件整份粘贴并 Run：
   - `supabase/migrations/20260904112922_init_proj_help.sql`
   - `supabase/migrations/20260904140000_allow_github_auth.sql`
   - `supabase/migrations/20260913150000_hub_help_news.sql`（德语、分享、反馈、徽章）
5. **Authentication → URL configuration**
   这些是 Supabase 控制台里的白名单，不是你要访问的页面。
   - **Site URL：** 只要站点源，不要 `/auth/callback`，不要 `**`：
     `https://tiger-studio-website.vercel.app`
   - **Redirect URLs：** **按原文粘贴**，包括两个星号。`**` 是 Supabase 通配符，这样带 `?code=...` 的查询字符串也能匹配。真正的页面是 `/auth/callback`，并不存在 `/auth/callback**`。
     - `https://tiger-studio-website.vercel.app/auth/callback**`
     - `http://localhost:3000/auth/callback**`
6. **Authentication → Providers**
   - 关闭 Email。
   - 启用 **GitHub**（见下）。
   - 如果有 Entra 应用就保留 **Azure**；否则只用 GitHub 也可以。

### GitHub OAuth（加入）

可以在你自己的 GitHub 账户里创建。

如果 GitHub 登录“完不成”，几乎总是 Authorization callback URL 填错了。

1. GitHub → Settings → Developer settings → [OAuth Apps](https://github.com/settings/developers) → **New OAuth App**
2. Application name：`Tiger Studio`
3. Homepage URL：`https://tiger-studio-website.vercel.app`
4. Authorization callback URL 必须是 **Supabase** 回调，不是 Vercel 站点：
   `https://<project-ref>.supabase.co/auth/v1/callback`  
   `<project-ref>` 是 `NEXT_PUBLIC_SUPABASE_URL` 里的子域。  
   **不要**填 `https://tiger-studio-website.vercel.app/auth/callback`。
5. 注册，然后 **Generate a new client secret**
6. 在 Supabase → Authentication → Providers → GitHub：启用，并填入 Client ID 和 secret
7. 重新部署，再试加入。如果还失败，`/auth/error` 会显示真实错误和应粘贴的回调地址。

Microsoft/Azure 仍需要 Entra 应用注册。如果 Azure 门户进不去，就用 GitHub。

Vercel 上的 `GITHUB_TOKEN` 是另一回事。那个令牌只用来读首页的公开组织统计，不用于加入。

## 文档、帮助和新闻

公开的 [`docs`](https://github.com/Tiger-Studio-WAB/docs) 和 [`support`](https://github.com/Tiger-Studio-WAB/support) 仓库已经接到这个站点。

**文档**（`/docs`）是开发手册：左侧边栏，每个英文 Markdown 文件一页，每个文件夹一个边栏分区。译文以 `file.zh.md` 和 `file.de.md` 放在源文件旁边。它们是语言变体，不会变成额外的导航项。缺某个语言文件时，显示英文。

本站的 `content/docs/` 有一份起始树。GitHub `docs` 仓库里的文件会覆盖起始稿（默认的 GitHub README 占位除外）。

**帮助**（`/help`）是社区外壳：资源、分享试玩、留下反馈。`/docs`、`/support` 和 `/ideas` 仍是独立地址，并出现在帮助导航里。

**新闻**（`/news`）渲染 GitHub `news` 仓库里已发布的 Markdown，本地回退是 `content/news/`。`/changelog` 会转到 `/news`。

**支持**（`/support`）是分开的。用来提问题和求助，不是写指南。工单模板放在 `support` 仓库。

## 部署到 Vercel

在 Vercel 控制台导入 GitHub 仓库，或用 CLI：

```bash
npx vercel
```
