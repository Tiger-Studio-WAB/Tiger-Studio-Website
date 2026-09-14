import { IDEA_CATEGORIES, type ContentLanguage, type IdeaCategory } from "@/lib/help-types";

export const UI_COOKIE = "locale";
export const LOCALES: ContentLanguage[] = ["en", "zh", "de"];

export type UiCopy = {
  brand: string;
  tagline: string;
  restricted: string;
  signIn: string;
  signInGitHub: string;
  signInMicrosoft: string;
  signOut: string;
  ideas: string;
  publish: string;
  myBoard: string;
  readMore: string;
  helpNeeded: string;
  responses: string;
  canHelp: string;
  writeResponse: string;
  postResponse: string;
  postingReply: string;
  replyPosted: string;
  showingTranslation: string;
  showOriginal: string;
  translationUnavailable: string;
  emptyIdeas: string;
  emptyResponses: string;
  title: string;
  description: string;
  category: string;
  language: string;
  submitIdea: string;
  backToIdeas: string;
  signedInAs: string;
  setupNeeded: string;
  browseCta: string;
  domainError: string;
  authError: string;
  authErrorDetail: string;
  authFixTitle: string;
  authFixCallback: string;
  authFixRedirect: string;
  authFixSiteUrlLabel: string;
  authFixRedirectUrlLabel: string;
  authFixSql: string;
  authFixProvider: string;
  howPost: string;
  howReply: string;
  howTranslate: string;
  all: string;
  products: string;
  about: string;
  join: string;
  docs: string;
  support: string;
  supportShort: string;
  help: string;
  news: string;
  changelog: string;
  destinations: string;
  skipToMain: string;
  home: string;
  member: string;
  anonymousName: string;
  formValidation: string;
  formSaveError: string;
  replyValidation: string;
  germanReviewNote: string;
  languagePicker: string;
  languageEn: string;
  languageZh: string;
  languageDe: string;
  homeProductsBody: string;
  homeAboutBody: string;
  homeJoinBody: string;
  homeHelpBody: string;
  productsKicker: string;
  productsTitle: string;
  productsLede: string;
  productsBoard: string;
  productsHelpName: string;
  productsHelpBody: string;
  productsOpenJoin: string;
  productsPublic: string;
  productsNewsLink: string;
  productsChangelogLink: string;
  aboutKicker: string;
  aboutTitle: string;
  aboutP1: string;
  aboutP2: string;
  aboutHowTitle: string;
  aboutProducts: string;
  aboutJoin: string;
  aboutDocs: string;
  aboutSupport: string;
  aboutHelp: string;
  aboutNews: string;
  joinKicker: string;
  joinTitle: string;
  joinLede: string;
  joinGithubNote: string;
  joinOpenGithub: string;
  docsOverview: string;
  docsOnThisSite: string;
  docsSourceDraft: string;
  docsNeedHelp: string;
  docsSource: string;
  docsLocalNote: string;
  docsPages: string;
  docsCopy: string;
  docsOpenGithub: string;
  docsSectionGettingStarted: string;
  docsSectionProducts: string;
  docsSectionGuides: string;
  docsSectionWebsite: string;
  supportKicker: string;
  supportTitle: string;
  supportLede: string;
  supportWhatTitle: string;
  supportBulletSignin: string;
  supportBulletBroken: string;
  supportBulletHuman: string;
  supportOpenIssue: string;
  supportOpenIssues: string;
  supportDocsTitle: string;
  supportDocsBody: string;
  supportOpenDocs: string;
  supportJoinTitle: string;
  supportJoinBody: string;
  supportOpenJoin: string;
  supportSource: string;
  supportRepo: string;
  newsKicker: string;
  newsTitle: string;
  newsLede: string;
  newsEmptyTitle: string;
  newsEmptyBody: string;
  newsBy: string;
  newsFallbackNote: string;
  newsBack: string;
  newsRead: string;
  destinationsKicker: string;
  destinationsTitle: string;
  destinationsLede: string;
  notFoundTitle: string;
  notFoundBody: string;
  backHome: string;
  tryAgain: string;
  hubErrorTitle: string;
  hubErrorBody: string;
  helpKicker: string;
  helpTitle: string;
  helpLede: string;
  helpNavHome: string;
  helpNavResources: string;
  helpNavShare: string;
  helpNavFeedback: string;
  helpHowBadges: string;
  helpHowBadgesBody: string;
  helpKickerShares: string;
  helpKickerNotes: string;
  helpKickerBadges: string;
  helpRecentShares: string;
  helpRecentFeedback: string;
  helpEmptyShares: string;
  helpEmptyFeedback: string;
  helpOpenResources: string;
  helpOpenShare: string;
  helpOpenFeedback: string;
  helpFeedbackHint: string;
  shareBack: string;
  shareOpen: string;
  shareNotFoundTitle: string;
  shareNotFoundBody: string;
  shareEmptyTitle: string;
  shareEmptyBody: string;
  shareFeedbackTitle: string;
  shareFeedbackEmpty: string;
  shareFirstHint: string;
  resourcesKicker: string;
  resourcesTitle: string;
  resourcesLede: string;
  resourcesHandbook: string;
  resourcesHandbookBody: string;
  resourcesSupportBody: string;
  resourcesGithubBody: string;
  resourcesIdeasBody: string;
  resourcesNewsBody: string;
  shareKicker: string;
  shareTitle: string;
  shareLede: string;
  shareWhatToTry: string;
  shareLink: string;
  shareNotes: string;
  shareAnonymous: string;
  shareSubmit: string;
  shareNeedSignIn: string;
  sharePosted: string;
  feedbackKicker: string;
  feedbackTitle: string;
  feedbackLede: string;
  feedbackTarget: string;
  feedbackTargetFree: string;
  feedbackBody: string;
  feedbackAnonymous: string;
  feedbackSubmit: string;
  feedbackNeedSignIn: string;
  feedbackPosted: string;
  badgesTitle: string;
  badgeFirstFeedback: string;
  badgeFirstPlaytest: string;
  badgeHelpfulReply: string;
  badgeStudioMember: string;
  noBadges: string;
  orbitStudio: string;
  orbitCommits: string;
  orbitCommitsMeta: string;
  orbitPullRequests: string;
  orbitPrsMeta: string;
  orbitLanguage: string;
  orbitCommit: string;
  orbitCodeShare: string;
  orbitCodeShareTiny: string;
  categories: Record<IdeaCategory, string>;
};

const en: UiCopy = {
  brand: "Tiger Studio",
  tagline: "A student passion club. Products, ideas, and the public doorway.",
  restricted: "Sign in with GitHub or Microsoft to post and reply.",
  signIn: "Sign in",
  signInGitHub: "Sign in with GitHub",
  signInMicrosoft: "Sign in with Microsoft",
  signOut: "Sign out",
  ideas: "Ideas",
  publish: "Post an idea",
  myBoard: "My posts",
  readMore: "Open",
  helpNeeded: "Help needed",
  responses: "Replies",
  canHelp: "I can help",
  writeResponse: "Reply",
  postResponse: "Post reply",
  postingReply: "Posting…",
  replyPosted: "Reply posted.",
  showingTranslation: "Translation",
  showOriginal: "Original",
  translationUnavailable: "Translation is not set up yet.",
  emptyIdeas: "No ideas posted yet.",
  emptyResponses: "No replies yet.",
  title: "Title",
  description: "What is the idea?",
  category: "Category",
  language: "Language",
  submitIdea: "Post idea",
  backToIdeas: "Ideas",
  signedInAs: "Signed in as",
  setupNeeded: "Sign-in needs Supabase. GitHub needs an OAuth app; Microsoft needs Entra ID.",
  browseCta: "See ideas",
  domainError: "That account is not allowed to use this site.",
  authError: "Sign-in did not finish. The usual cause is the GitHub callback URL.",
  authErrorDetail: "What came back",
  authFixTitle: "Check these settings",
  authFixCallback:
    "In the GitHub OAuth App, Authorization callback URL must be the Supabase callback below — not this website.",
  authFixRedirect:
    "In Supabase → Authentication → URL configuration, paste the two values below. The ** at the end of Redirect URLs is a wildcard you type into that box — it is not a page on this site. Keep the asterisks.",
  authFixSiteUrlLabel: "Site URL",
  authFixRedirectUrlLabel: "Redirect URLs (paste exactly, including **)",
  authFixSql:
    "In Supabase Studio → SQL Editor, run the migration files. Later files add GitHub accounts, German, share, feedback, and badges.",
  authFixProvider: "In Supabase → Authentication → Providers, enable GitHub and paste the Client ID and secret.",
  howPost: "Post an idea you want help with.",
  howReply: "Reply if you can help, or have a question.",
  howTranslate: "Translate a post between English, Chinese, and German.",
  all: "All",
  products: "Products",
  about: "About",
  join: "Join",
  docs: "Docs",
  support: "Support",
  supportShort: "Support",
  help: "Help",
  news: "News",
  changelog: "Changelog",
  destinations: "Destinations",
  skipToMain: "Skip to main content",
  home: "Home",
  member: "Member",
  anonymousName: "Anonymous",
  formValidation: "Add a longer title and description.",
  formSaveError: "Could not save this. Try again.",
  replyValidation: "Write a little more before posting.",
  germanReviewNote: "German copy is a draft for Mingli29 to review.",
  languagePicker: "Language",
  languageEn: "EN",
  languageZh: "中文",
  languageDe: "DE",
  homeProductsBody: "Public projects the studio ships.",
  homeAboutBody: "What Tiger Studio is, and how the hub works.",
  homeJoinBody: "Post ideas, reply, and ship with the club.",
  homeHelpBody: "Playtests, feedback, docs, and support in one place.",
  productsKicker: "Products",
  productsTitle: "What the studio ships",
  productsLede: "Public repositories, the ideas board, and the websites those projects point to.",
  productsBoard: "Board",
  productsHelpName: "Proj.Help",
  productsHelpBody:
    "Post a project idea and ask for help. Members can reply, and posts can be translated between English, Chinese, and German. Sign in with GitHub or Microsoft.",
  productsOpenJoin: "Open Join",
  productsPublic: "Public projects",
  productsNewsLink: "Studio news →",
  productsChangelogLink: "News archive →",
  aboutKicker: "About",
  aboutTitle: "A studio with a public doorway",
  aboutP1:
    "Tiger Studio is a student passion club. We make, publish, and ship work across several homes on the web instead of a single feed.",
  aboutP2:
    "This website is the club's front door. Products live on GitHub and other destinations. Join is the ideas board — post something you want help with, and people can reply.",
  aboutHowTitle: "How the hub is organized",
  aboutProducts: "Products lists public repositories and studio tools.",
  aboutJoin: "Join is Proj.Help: ideas, replies, and translation.",
  aboutDocs: "Docs is the handbook: folders and Markdown, with a sidebar like other developer docs.",
  aboutSupport: "Support is separate — issues and help, not guides.",
  aboutHelp: "Help is a site inside the hub: share a build, leave feedback on that playtest, and find resources.",
  aboutNews: "News is studio-written Markdown, not a raw GitHub event dump.",
  joinKicker: "Join",
  joinTitle: "Post an idea. Ask for help.",
  joinLede:
    "Proj.Help lives on this site now. Sign in with GitHub or Microsoft, then publish an idea or reply to someone else's.",
  joinGithubNote:
    "Club work still happens on GitHub. The ideas board is for asking, matching, and translating. Repositories stay the record of what shipped.",
  joinOpenGithub: "Open GitHub →",
  docsOverview: "Overview",
  docsOnThisSite: "On this site",
  docsSourceDraft: "German draft · {topic}",
  docsNeedHelp: "Need help?",
  docsSource: "Source",
  docsLocalNote: " (starter copy on this site until the docs repo has this file)",
  docsPages: "{count} pages",
  docsCopy: "Copy",
  docsOpenGithub: "Open on GitHub",
  docsSectionGettingStarted: "Getting started",
  docsSectionProducts: "Products",
  docsSectionGuides: "Guides",
  docsSectionWebsite: "Website",
  supportKicker: "Support",
  supportTitle: "Get help",
  supportLede: "Support is for problems and questions. Guides and how-tos live in Docs.",
  supportWhatTitle: "What to use this for",
  supportBulletSignin: "Sign-in did not finish (GitHub or Microsoft)",
  supportBulletBroken: "A page on this site is broken or missing",
  supportBulletHuman: "You need a human from the club",
  supportOpenIssue: "Open a support issue",
  supportOpenIssues: "View open issues",
  supportDocsTitle: "Looking up how something works?",
  supportDocsBody: "Product guides and writing rules are in the handbook, not here.",
  supportOpenDocs: "Open docs →",
  supportJoinTitle: "Ideas board",
  supportJoinBody: "Post an idea or reply after you sign in.",
  supportOpenJoin: "Open Join →",
  supportSource: "Issue templates live in the",
  supportRepo: "support repository",
  newsKicker: "Studio news",
  newsTitle: "Notes from the studio",
  newsLede:
    "Certified members write these posts in Markdown. Missing Chinese or German files fall back to English.",
  newsEmptyTitle: "No news yet",
  newsEmptyBody: "When the studio publishes a Markdown post, it will show up here.",
  newsBy: "By",
  newsFallbackNote: "This language is not ready yet, so you are reading the English source.",
  newsBack: "All news",
  newsRead: "Read",
  destinationsKicker: "Quick links",
  destinationsTitle: "Other websites we point to",
  destinationsLede:
    "Public repositories are loaded from GitHub as they appear. If a repo has a homepage, we point there instead of the source tree.",
  notFoundTitle: "This page is not on the hub",
  notFoundBody: "The path you asked for is not a Tiger Studio page.",
  backHome: "Back home",
  tryAgain: "Try again",
  hubErrorTitle: "The hub could not load this page",
  hubErrorBody: "Try again, or return home.",
  helpKicker: "Help",
  helpTitle: "A place to try work and talk back",
  helpLede:
    "Share a build for humans to playtest, leave feedback on that playtest, and find docs. Badges stay visible even when a name is hidden.",
  helpNavHome: "Community",
  helpNavResources: "Resources",
  helpNavShare: "Share",
  helpNavFeedback: "Feedback",
  helpHowBadges: "How badges work",
  helpHowBadgesBody:
    "Sign in, then post a playtest, leave feedback, or mark that you can help on an idea. The first time you do each of those, a badge is added to your profile. Studio member is awarded by the club.",
  helpKickerShares: "Playtests",
  helpKickerNotes: "Notes",
  helpKickerBadges: "Badges",
  helpRecentShares: "Playtests to try",
  helpRecentFeedback: "Recent notes",
  helpEmptyShares: "No playtests yet. Share a build after you sign in.",
  helpEmptyFeedback: "Open a playtest to write a note.",
  helpOpenResources: "Open resources →",
  helpOpenShare: "Share a build →",
  helpOpenFeedback: "Open a playtest →",
  helpFeedbackHint: "Feedback lives on a playtest, not as its own tab. Open a share to reply.",
  shareBack: "All playtests",
  shareOpen: "Open playtest",
  shareNotFoundTitle: "This playtest is not here",
  shareNotFoundBody:
    "It may have been removed, or the share tables are not set up yet. You can still browse resources and docs.",
  shareEmptyTitle: "No playtests yet",
  shareEmptyBody: "Share a build first. Then others can open it and reply here.",
  shareFeedbackTitle: "Feedback on this playtest",
  shareFeedbackEmpty: "No feedback on this playtest yet.",
  shareFirstHint: "Share a build first. Other people leave feedback on that playtest, not on a separate tab.",
  resourcesKicker: "Resources",
  resourcesTitle: "Handbook, support, and the board",
  resourcesLede: "Handbook pages, the support desk, ideas, and studio news — still the same login.",
  resourcesHandbook: "Handbook",
  resourcesHandbookBody: "How the hub, Git, Godot, and TypeScript work.",
  resourcesSupportBody: "Broken pages, sign-in trouble, or a human from the club.",
  resourcesGithubBody: "Public repos and club work live here.",
  resourcesIdeasBody: "Ask for help on a project idea after you sign in.",
  resourcesNewsBody: "Studio-written posts, with English if a translation is missing.",
  shareKicker: "Share",
  shareTitle: "Put a build in front of people",
  shareLede:
    "This is the anti-AI-tester loop: a human tries your product. You must be signed in. Hide your name if you want; badges still show.",
  shareWhatToTry: "What should people try?",
  shareLink: "Link",
  shareNotes: "Notes",
  shareAnonymous: "Hide my name (badges still show)",
  shareSubmit: "Share playtest",
  shareNeedSignIn: "Sign in to share a build.",
  sharePosted: "Playtest shared.",
  feedbackKicker: "Feedback",
  feedbackTitle: "Tell someone what you found",
  feedbackLede:
    "Write feedback on this playtest. You must be signed in so we can award badges and keep spam down. Anonymous hides your name, not the badge.",
  feedbackTarget: "What is this about?",
  feedbackTargetFree: "Something else",
  feedbackBody: "What did you notice?",
  feedbackAnonymous: "Hide my name (badges still show)",
  feedbackSubmit: "Post feedback",
  feedbackNeedSignIn: "Sign in to leave feedback.",
  feedbackPosted: "Feedback posted.",
  badgesTitle: "Badges",
  badgeFirstFeedback: "First feedback",
  badgeFirstPlaytest: "First playtest",
  badgeHelpfulReply: "Helpful reply",
  badgeStudioMember: "Studio member",
  noBadges: "No badges yet. Share a build, leave feedback, or mark that you can help.",
  orbitStudio: "Studio",
  orbitCommits: "{count} commits",
  orbitCommitsMeta: "Across public repos",
  orbitPullRequests: "{count} pull requests",
  orbitPrsMeta: "Opened in the org",
  orbitLanguage: "Language",
  orbitCommit: "Commit",
  orbitCodeShare: "{percent}% of code",
  orbitCodeShareTiny: "<1% of code",
  categories: {
    stem: "STEM",
    arts: "Arts",
    community: "Community",
    research: "Research",
    entrepreneurship: "Entrepreneurship",
    service: "Service",
    other: "Other",
  },
};

const zh: UiCopy = {
  brand: "Tiger Studio",
  tagline: "学生兴趣社团。产品、想法，以及对外的入口。",
  restricted: "请使用 GitHub 或 Microsoft 登录后发布和回复。",
  signIn: "登录",
  signInGitHub: "使用 GitHub 登录",
  signInMicrosoft: "使用 Microsoft 登录",
  signOut: "退出",
  ideas: "想法",
  publish: "发布想法",
  myBoard: "我的发布",
  readMore: "打开",
  helpNeeded: "需要的帮助",
  responses: "回复",
  canHelp: "我可以帮忙",
  writeResponse: "回复",
  postResponse: "发布回复",
  postingReply: "发布中…",
  replyPosted: "回复已发布。",
  showingTranslation: "译文",
  showOriginal: "原文",
  translationUnavailable: "翻译还没有开通。",
  emptyIdeas: "还没有人发布想法。",
  emptyResponses: "还没有回复。",
  title: "标题",
  description: "这个想法是什么？",
  category: "分类",
  language: "语言",
  submitIdea: "发布",
  backToIdeas: "想法",
  signedInAs: "当前账户",
  setupNeeded: "需要先接好 Supabase。GitHub 需要 OAuth 应用，Microsoft 需要 Entra ID。",
  browseCta: "查看想法",
  domainError: "这个账户不能使用本站。",
  authError: "登录没有完成。通常是 GitHub 回调地址填错了。",
  authErrorDetail: "返回的错误",
  authFixTitle: "核对这些设置",
  authFixCallback:
    "GitHub OAuth 应用的 Authorization callback URL 必须是下面的 Supabase 回调地址，不能填本站。",
  authFixRedirect:
    "打开 Supabase → Authentication → URL configuration，把下面两个值分别填进去。Redirect URLs 末尾的 ** 是通配符，要原样输入，不是本站上的某个页面。",
  authFixSiteUrlLabel: "Site URL",
  authFixRedirectUrlLabel: "Redirect URLs（原样粘贴，包含 **）",
  authFixSql: "在 Supabase Studio → SQL Editor 中运行全部迁移。后面的文件会打开 GitHub、德语、分享、反馈和徽章。",
  authFixProvider: "在 Supabase → Authentication → Providers 中启用 GitHub，并填入 Client ID 和 secret。",
  howPost: "发布一个需要帮助的想法。",
  howReply: "能帮忙，或者有问题，就回复。",
  howTranslate: "把内容在英语、中文和德语之间翻译。",
  all: "全部",
  products: "产品",
  about: "关于",
  join: "加入",
  docs: "文档",
  support: "支持",
  supportShort: "支持",
  help: "帮助",
  news: "新闻",
  changelog: "更新记录",
  destinations: "去处",
  skipToMain: "跳到正文",
  home: "首页",
  member: "成员",
  anonymousName: "匿名",
  formValidation: "标题和说明再写完整一点。",
  formSaveError: "没保存成功，请再试一次。",
  replyValidation: "回复再写完整一点。",
  germanReviewNote: "德语文案仍是草稿，交给 Mingli29 审阅。",
  languagePicker: "语言",
  languageEn: "EN",
  languageZh: "中文",
  languageDe: "DE",
  homeProductsBody: "社团已经公开的项目。",
  homeAboutBody: "Tiger Studio 是什么，以及这个站点怎么用。",
  homeJoinBody: "发布想法、回复，并一起把作品做出来。",
  homeHelpBody: "试玩、反馈、文档和支持都在这里。",
  productsKicker: "产品",
  productsTitle: "社团在做的东西",
  productsLede: "公开仓库、想法板，以及这些项目指向的网站。",
  productsBoard: "看板",
  productsHelpName: "Proj.Help",
  productsHelpBody:
    "发布一个项目想法并请求帮助。成员可以回复，内容可以在英语、中文和德语之间翻译。用 GitHub 或 Microsoft 登录。",
  productsOpenJoin: "打开加入页",
  productsPublic: "公开项目",
  productsNewsLink: "社团新闻 →",
  productsChangelogLink: "新闻归档 →",
  aboutKicker: "关于",
  aboutTitle: "一扇对外的门",
  aboutP1: "Tiger Studio 是学生兴趣社团。我们在多个网站上制作、发布和上线作品，而不是挤在一条动态里。",
  aboutP2: "这个网站是社团的大门。产品在 GitHub 和其他去处。加入页是想法板——写下你需要帮助的事，别人可以回复。",
  aboutHowTitle: "这个站点怎么组织",
  aboutProducts: "产品列出公开仓库和社团工具。",
  aboutJoin: "加入就是 Proj.Help：想法、回复和翻译。",
  aboutDocs: "文档是手册：按文件夹放 Markdown，侧栏和其他开发者文档类似。",
  aboutSupport: "支持是分开的——用来提问题和求助，不是写指南。",
  aboutHelp: "帮助是站点里的站点：分享作品，在该试玩上留下反馈，并找到资料。",
  aboutNews: "新闻是社团自己写的 Markdown，不是 GitHub 事件流水。",
  joinKicker: "加入",
  joinTitle: "发布一个想法，请求帮助。",
  joinLede: "Proj.Help 现在就在这个网站上。用 GitHub 或 Microsoft 登录，然后发布想法，或回复别人的想法。",
  joinGithubNote: "社团的正式工作仍在 GitHub。想法板用来提问、对接和翻译。仓库才是已经上线作品的记录。",
  joinOpenGithub: "打开 GitHub →",
  docsOverview: "概览",
  docsOnThisSite: "本站目录",
  docsSourceDraft: "德文草稿 · {topic}",
  docsNeedHelp: "需要帮助？",
  docsSource: "来源",
  docsOpenGithub: "在 GitHub 打开",
  docsSectionGettingStarted: "入门",
  docsSectionProducts: "产品",
  docsSectionGuides: "指南",
  docsSectionWebsite: "网站",
  docsLocalNote: "（文档仓库还没有这个文件时，先用本站的起始文稿）",
  docsPages: "{count} 页",
  docsCopy: "复制",
  supportKicker: "支持",
  supportTitle: "获取帮助",
  supportLede: "支持用来处理问题和疑问。指南和教程在文档里。",
  supportWhatTitle: "适合用在这些情况",
  supportBulletSignin: "登录没有完成（GitHub 或 Microsoft）",
  supportBulletBroken: "本站某个页面坏了或找不到",
  supportBulletHuman: "你需要社团里的人来看一眼",
  supportOpenIssue: "开一个支持工单",
  supportOpenIssues: "查看已有工单",
  supportDocsTitle: "在查某件事怎么做？",
  supportDocsBody: "产品指南和写作规则在手册里，不在这里。",
  supportOpenDocs: "打开文档 →",
  supportJoinTitle: "想法板",
  supportJoinBody: "登录后可以发布想法或回复。",
  supportOpenJoin: "打开加入页 →",
  supportSource: "工单模板在",
  supportRepo: "support 仓库",
  newsKicker: "社团新闻",
  newsTitle: "来自工作室的笔记",
  newsLede: "有仓库写权限的成员用 Markdown 写这些文章。没有中文或德文文件时，会显示英文。",
  newsEmptyTitle: "还没有新闻",
  newsEmptyBody: "社团发布 Markdown 文章后，会出现在这里。",
  newsBy: "作者",
  newsFallbackNote: "这个语言还没有译好，所以你正在读英文原文。",
  newsBack: "全部新闻",
  newsRead: "阅读",
  destinationsKicker: "快捷链接",
  destinationsTitle: "我们指向的其他网站",
  destinationsLede: "公开仓库会随 GitHub 更新。如果仓库有主页，我们会指向主页而不是源码树。",
  notFoundTitle: "这个页面不在站点上",
  notFoundBody: "你打开的路径不是 Tiger Studio 的页面。",
  backHome: "回首页",
  tryAgain: "再试一次",
  hubErrorTitle: "这一页没有加载出来",
  hubErrorBody: "请再试一次，或回到首页。",
  helpKicker: "帮助",
  helpTitle: "试玩作品，并说回自己的感受",
  helpLede: "把作品交给真人试玩，在该试玩上留下反馈，并找到文档。即使隐藏名字，徽章仍然会显示。",
  helpNavHome: "社区",
  helpNavResources: "资源",
  helpNavShare: "分享",
  helpNavFeedback: "反馈",
  helpHowBadges: "徽章怎么获得",
  helpHowBadgesBody:
    "先登录，然后发布试玩、留下反馈，或在想法上标记“我可以帮忙”。每件事的第一次都会加一枚徽章。社团成员徽章由社团发放。",
  helpKickerShares: "试玩",
  helpKickerNotes: "笔记",
  helpKickerBadges: "徽章",
  helpRecentShares: "可以试玩的作品",
  helpRecentFeedback: "最近的笔记",
  helpEmptyShares: "还没有试玩。登录后可以分享。",
  helpEmptyFeedback: "打开一个试玩再写笔记。",
  helpOpenResources: "打开资源 →",
  helpOpenShare: "分享作品 →",
  helpOpenFeedback: "打开试玩 →",
  helpFeedbackHint: "反馈写在具体试玩上，不是单独的标签页。打开分享后再回复。",
  shareBack: "全部试玩",
  shareOpen: "打开试玩",
  shareNotFoundTitle: "这个试玩不在这里",
  shareNotFoundBody: "它可能已删除，或分享表还没有建好。你仍然可以看资源和文档。",
  shareEmptyTitle: "还没有试玩",
  shareEmptyBody: "先分享一个作品，别人才能打开并在这里回复。",
  shareFeedbackTitle: "对这次试玩的反馈",
  shareFeedbackEmpty: "这次试玩还没有反馈。",
  shareFirstHint: "先分享作品。反馈写在那次试玩上，不是单独的标签页。",
  resourcesKicker: "资源",
  resourcesTitle: "指南、支持和看板",
  resourcesLede: "手册、支持台、想法板和社团新闻——登录方式不变。",
  resourcesHandbook: "手册",
  resourcesHandbookBody: "这个站点、Git、Godot 和 TypeScript 怎么用。",
  resourcesSupportBody: "页面坏了、登录出问题，或需要社团里的人。",
  resourcesGithubBody: "公开仓库和社团工作都在这里。",
  resourcesIdeasBody: "登录后，为项目想法请求帮助。",
  resourcesNewsBody: "社团自己写的文章；缺译文时显示英文。",
  shareKicker: "分享",
  shareTitle: "把作品放到人面前",
  shareLede: "这是给真人试玩的通道，不是给 AI 测试员的。必须登录。可以隐藏名字，徽章仍会显示。",
  shareWhatToTry: "请别人试什么？",
  shareLink: "链接",
  shareNotes: "备注",
  shareAnonymous: "隐藏我的名字（徽章仍显示）",
  shareSubmit: "发布试玩",
  shareNeedSignIn: "登录后才能分享作品。",
  sharePosted: "试玩已分享。",
  feedbackKicker: "反馈",
  feedbackTitle: "告诉对方你发现了什么",
  feedbackLede: "请针对这次试玩写反馈。需要登录才能发徽章并减少垃圾内容。匿名只隐藏名字，不隐藏徽章。",
  feedbackTarget: "这是关于什么？",
  feedbackTargetFree: "其他",
  feedbackBody: "你注意到了什么？",
  feedbackAnonymous: "隐藏我的名字（徽章仍显示）",
  feedbackSubmit: "发布反馈",
  feedbackNeedSignIn: "登录后才能留下反馈。",
  feedbackPosted: "反馈已发布。",
  badgesTitle: "徽章",
  badgeFirstFeedback: "第一次反馈",
  badgeFirstPlaytest: "第一次试玩分享",
  badgeHelpfulReply: "有帮助的回复",
  badgeStudioMember: "社团成员",
  noBadges: "还没有徽章。去分享作品、留下反馈，或标记你可以帮忙。",
  orbitStudio: "工作室",
  orbitCommits: "{count} 次提交",
  orbitCommitsMeta: "来自公开仓库",
  orbitPullRequests: "{count} 个拉取请求",
  orbitPrsMeta: "组织里已打开",
  orbitLanguage: "语言",
  orbitCommit: "提交",
  orbitCodeShare: "占代码 {percent}%",
  orbitCodeShareTiny: "占代码不到 1%",
  categories: {
    stem: "STEM",
    arts: "艺术",
    community: "社区",
    research: "研究",
    entrepreneurship: "创业",
    service: "服务",
    other: "其他",
  },
};

const de: UiCopy = {
  brand: "Tiger Studio",
  tagline: "Ein Schüler-Passion-Club. Produkte, Ideen und die öffentliche Tür.",
  restricted: "Melde dich mit GitHub oder Microsoft an, um zu schreiben und zu antworten.",
  signIn: "Anmelden",
  signInGitHub: "Mit GitHub anmelden",
  signInMicrosoft: "Mit Microsoft anmelden",
  signOut: "Abmelden",
  ideas: "Ideen",
  publish: "Idee posten",
  myBoard: "Meine Beiträge",
  readMore: "Öffnen",
  helpNeeded: "Gesuchte Hilfe",
  responses: "Antworten",
  canHelp: "Ich kann helfen",
  writeResponse: "Antworten",
  postResponse: "Antwort posten",
  postingReply: "Wird gesendet…",
  replyPosted: "Antwort ist da.",
  showingTranslation: "Übersetzung",
  showOriginal: "Original",
  translationUnavailable: "Übersetzung ist noch nicht eingerichtet.",
  emptyIdeas: "Noch keine Ideen.",
  emptyResponses: "Noch keine Antworten.",
  title: "Titel",
  description: "Was ist die Idee?",
  category: "Kategorie",
  language: "Sprache",
  submitIdea: "Idee posten",
  backToIdeas: "Ideen",
  signedInAs: "Angemeldet als",
  setupNeeded: "Anmeldung braucht Supabase. GitHub braucht eine OAuth-App, Microsoft braucht Entra ID.",
  browseCta: "Ideen ansehen",
  domainError: "Dieses Konto darf die Seite nicht nutzen.",
  authError: "Die Anmeldung ist nicht fertig. Meist stimmt die GitHub-Callback-URL nicht.",
  authErrorDetail: "Antwort",
  authFixTitle: "Diese Einstellungen prüfen",
  authFixCallback:
    "In der GitHub-OAuth-App muss die Authorization callback URL der Supabase-Callback unten sein — nicht diese Website.",
  authFixRedirect:
    "In Supabase → Authentication → URL configuration die zwei Werte unten einfügen. Die ** am Ende der Redirect URLs sind ein Platzhalter — keine Seite auf dieser Website. Sterne behalten.",
  authFixSiteUrlLabel: "Site URL",
  authFixRedirectUrlLabel: "Redirect URLs (genau so, inklusive **)",
  authFixSql:
    "In Supabase Studio → SQL Editor alle Migrationsdateien ausführen. Spätere Dateien öffnen GitHub, Deutsch, Teilen, Feedback und Abzeichen.",
  authFixProvider: "In Supabase → Authentication → Providers GitHub einschalten und Client ID plus Secret einfügen.",
  howPost: "Poste eine Idee, bei der du Hilfe willst.",
  howReply: "Antworte, wenn du helfen kannst oder eine Frage hast.",
  howTranslate: "Übersetze einen Beitrag zwischen Englisch, Chinesisch und Deutsch.",
  all: "Alle",
  products: "Produkte",
  about: "Über uns",
  join: "Mitmachen",
  docs: "Dokumente",
  support: "Support-Seite",
  supportShort: "Support",
  help: "Hilfe",
  news: "Nachrichten",
  changelog: "Changelog",
  destinations: "Ziele",
  skipToMain: "Zum Inhalt springen",
  home: "Start",
  member: "Mitglied",
  anonymousName: "Anonym",
  formValidation: "Titel und Text bitte etwas länger schreiben.",
  formSaveError: "Speichern hat nicht geklappt. Bitte nochmal.",
  replyValidation: "Schreib ein bisschen mehr, bevor du sendest.",
  germanReviewNote: "Deutscher Text ist ein Entwurf — Mingli29 prüft noch.",
  languagePicker: "Sprache",
  languageEn: "EN",
  languageZh: "中文",
  languageDe: "DE",
  homeProductsBody: "Öffentliche Projekte des Studios.",
  homeAboutBody: "Was Tiger Studio ist und wie der Hub funktioniert.",
  homeJoinBody: "Ideen posten, antworten und mit dem Club shippen.",
  homeHelpBody: "Playtests, Notizen, Dokumente und Support an einem Ort.",
  productsKicker: "Produkte",
  productsTitle: "Was das Studio veröffentlicht",
  productsLede: "Öffentliche Repos, das Ideenboard und die Websites, auf die die Projekte zeigen.",
  productsBoard: "Board",
  productsHelpName: "Proj.Help",
  productsHelpBody:
    "Poste eine Projektidee und bitte um Hilfe. Mitglieder können antworten. Beiträge lassen sich zwischen Englisch, Chinesisch und Deutsch übersetzen. Anmeldung mit GitHub oder Microsoft.",
  productsOpenJoin: "Mitmachen öffnen",
  productsPublic: "Öffentliche Projekte",
  productsNewsLink: "Studio-News →",
  productsChangelogLink: "News-Archiv →",
  aboutKicker: "Über uns",
  aboutTitle: "Ein Studio mit einer öffentlichen Tür",
  aboutP1:
    "Tiger Studio ist ein Schüler-Passion-Club. Wir machen, veröffentlichen und shippen Arbeit auf mehreren Websites, nicht in einem einzigen Feed.",
  aboutP2:
    "Diese Website ist die Haustür des Clubs. Produkte leben auf GitHub und anderen Zielen. Mitmachen ist das Ideenboard — schreib, wobei du Hilfe willst, und andere können antworten.",
  aboutHowTitle: "So ist der Hub aufgebaut",
  aboutProducts: "Produkte listet öffentliche Repos und Studio-Tools.",
  aboutJoin: "Mitmachen ist Proj.Help: Ideen, Antworten und Übersetzung.",
  aboutDocs: "Das Handbuch: Ordner und Markdown, mit einer Sidebar wie andere Entwickler-Handbücher.",
  aboutSupport: "Hier geht es um Issues und Hilfe, nicht um Anleitungen.",
  aboutHelp: "Hilfe ist eine Seite in der Seite: Build teilen, Feedback zu diesem Playtest geben, Ressourcen finden.",
  aboutNews: "Vom Studio geschriebene Markdown-Texte, kein roher GitHub-Event-Feed.",
  joinKicker: "Mitmachen",
  joinTitle: "Poste eine Idee. Bitte um Hilfe.",
  joinLede:
    "Proj.Help lebt jetzt auf dieser Website. Melde dich mit GitHub oder Microsoft an und poste eine Idee oder antworte auf eine andere.",
  joinGithubNote:
    "Die Club-Arbeit bleibt auf GitHub. Das Ideenboard ist zum Fragen, Zusammenfinden und Übersetzen. Repos bleiben die Quelle der Wahrheit.",
  joinOpenGithub: "GitHub öffnen →",
  docsOverview: "Überblick",
  docsOnThisSite: "Auf dieser Seite",
  docsSourceDraft: "Deutscher Entwurf · {topic}",
  docsNeedHelp: "Hilfe nötig?",
  docsSource: "Quelle",
  docsLocalNote: " (Starttext auf dieser Website, bis das Docs-Repo die Datei hat)",
  docsPages: "{count} Seiten",
  docsCopy: "Kopieren",
  docsOpenGithub: "Auf GitHub öffnen",
  docsSectionGettingStarted: "Erste Schritte",
  docsSectionProducts: "Produkte",
  docsSectionGuides: "Anleitungen",
  docsSectionWebsite: "Website",
  supportKicker: "Support",
  supportTitle: "Hilfe holen",
  supportLede: "Support ist für Probleme und Fragen. Anleitungen stehen in den Dokumenten.",
  supportWhatTitle: "Dafür ist diese Seite da",
  supportBulletSignin: "Anmeldung ist nicht fertig (GitHub oder Microsoft)",
  supportBulletBroken: "Eine Seite hier ist kaputt oder fehlt",
  supportBulletHuman: "Du brauchst einen Menschen aus dem Club",
  supportOpenIssue: "Support-Issue öffnen",
  supportOpenIssues: "Offene Issues ansehen",
  supportDocsTitle: "Du suchst, wie etwas funktioniert?",
  supportDocsBody: "Produktanleitungen und Schreibregeln stehen im Handbuch, nicht hier.",
  supportOpenDocs: "Dokumente öffnen →",
  supportJoinTitle: "Ideenboard",
  supportJoinBody: "Nach der Anmeldung Idee posten oder antworten.",
  supportOpenJoin: "Mitmachen öffnen →",
  supportSource: "Issue-Vorlagen liegen im",
  supportRepo: "Support-Repository",
  newsKicker: "Studio-News",
  newsTitle: "Notizen aus dem Studio",
  newsLede:
    "Mitglieder mit Schreibrecht schreiben diese Beiträge in Markdown. Fehlt Chinesisch oder Deutsch, erscheint Englisch.",
  newsEmptyTitle: "Noch keine News",
  newsEmptyBody: "Wenn das Studio einen Markdown-Beitrag veröffentlicht, erscheint er hier.",
  newsBy: "Von",
  newsFallbackNote: "Diese Sprache ist noch nicht fertig, deshalb liest du die englische Quelle.",
  newsBack: "Alle News",
  newsRead: "Lesen",
  destinationsKicker: "Kurzlinks",
  destinationsTitle: "Andere Websites, auf die wir zeigen",
  destinationsLede:
    "Öffentliche Repos kommen live von GitHub. Hat ein Repo eine Homepage, zeigen wir dorthin statt auf den Quellbaum.",
  notFoundTitle: "Diese Seite ist nicht auf dem Hub",
  notFoundBody: "Der Pfad ist keine Tiger-Studio-Seite.",
  backHome: "Zur Startseite",
  tryAgain: "Nochmal versuchen",
  hubErrorTitle: "Diese Seite hat nicht geladen",
  hubErrorBody: "Bitte nochmal versuchen oder nach Hause.",
  helpKicker: "Hilfe",
  helpTitle: "Arbeit ausprobieren und zurückschreiben",
  helpLede:
    "Teile einen Build zum Playtest, hinterlasse Feedback zu diesem Playtest und finde Dokumente. Abzeichen bleiben sichtbar, auch wenn der Name versteckt ist.",
  helpNavHome: "Gemeinschaft",
  helpNavResources: "Ressourcen",
  helpNavShare: "Teilen",
  helpNavFeedback: "Feedback",
  helpHowBadges: "So funktionieren Abzeichen",
  helpHowBadgesBody:
    "Melde dich an, teile einen Playtest, hinterlasse Feedback oder markiere bei einer Idee, dass du helfen kannst. Das erste Mal gibt je ein Abzeichen. Studio-Mitglied vergibt der Club.",
  helpKickerShares: "Playtests",
  helpKickerNotes: "Notizen",
  helpKickerBadges: "Abzeichen",
  helpRecentShares: "Playtests zum Ausprobieren",
  helpRecentFeedback: "Neue Notizen",
  helpEmptyShares: "Noch keine Playtests. Nach der Anmeldung teilen.",
  helpEmptyFeedback: "Öffne einen Playtest, um eine Notiz zu schreiben.",
  helpOpenResources: "Ressourcen öffnen →",
  helpOpenShare: "Build teilen →",
  helpOpenFeedback: "Playtest öffnen →",
  helpFeedbackHint: "Feedback gehört zu einem Playtest, nicht auf einen eigenen Tab. Öffne einen Share, um zu antworten.",
  shareBack: "Alle Playtests",
  shareOpen: "Playtest öffnen",
  shareNotFoundTitle: "Dieser Playtest ist nicht hier",
  shareNotFoundBody:
    "Er wurde entfernt, oder die Share-Tabellen sind noch nicht eingerichtet. Ressourcen und Dokumente bleiben offen.",
  shareEmptyTitle: "Noch keine Playtests",
  shareEmptyBody: "Teile zuerst einen Build. Dann können andere ihn öffnen und hier antworten.",
  shareFeedbackTitle: "Feedback zu diesem Playtest",
  shareFeedbackEmpty: "Noch kein Feedback zu diesem Playtest.",
  shareFirstHint: "Teile zuerst einen Build. Feedback gehört zu diesem Playtest, nicht auf einen eigenen Tab.",
  resourcesKicker: "Ressourcen",
  resourcesTitle: "Handbuch, Support und das Board",
  resourcesLede: "Handbuch, Support, Ideen und Studio-Nachrichten — dieselbe Anmeldung.",
  resourcesHandbook: "Handbuch",
  resourcesHandbookBody: "Wie Hub, Git, Godot und TypeScript funktionieren.",
  resourcesSupportBody: "Kaputte Seiten, Anmeldeprobleme oder ein Mensch aus dem Club.",
  resourcesGithubBody: "Öffentliche Repos und die Club-Arbeit liegen hier.",
  resourcesIdeasBody: "Nach der Anmeldung um Hilfe bei einer Projektidee bitten.",
  resourcesNewsBody: "Vom Studio geschriebene Beiträge; ohne Übersetzung erscheint Englisch.",
  shareKicker: "Teilen",
  shareTitle: "Einen Build vor Menschen stellen",
  shareLede:
    "Das ist die Schleife gegen KI-Tester: ein Mensch spielt dein Produkt. Du musst angemeldet sein. Name verstecken geht; Abzeichen bleiben.",
  shareWhatToTry: "Was sollen Leute ausprobieren?",
  shareLink: "Link",
  shareNotes: "Notizen",
  shareAnonymous: "Meinen Namen verstecken (Abzeichen bleiben)",
  shareSubmit: "Playtest teilen",
  shareNeedSignIn: "Melde dich an, um einen Build zu teilen.",
  sharePosted: "Playtest ist geteilt.",
  feedbackKicker: "Feedback",
  feedbackTitle: "Sag, was du gefunden hast",
  feedbackLede:
    "Schreib Feedback zu diesem Playtest. Anmeldung ist nötig, damit wir Abzeichen geben und Spam klein halten. Anonym versteckt den Namen, nicht das Abzeichen.",
  feedbackTarget: "Worum geht es?",
  feedbackTargetFree: "Etwas anderes",
  feedbackBody: "Was ist dir aufgefallen?",
  feedbackAnonymous: "Meinen Namen verstecken (Abzeichen bleiben)",
  feedbackSubmit: "Feedback posten",
  feedbackNeedSignIn: "Melde dich an, um Feedback zu lassen.",
  feedbackPosted: "Feedback ist da.",
  badgesTitle: "Abzeichen",
  badgeFirstFeedback: "Erstes Feedback",
  badgeFirstPlaytest: "Erster Playtest",
  badgeHelpfulReply: "Hilfreiche Antwort",
  badgeStudioMember: "Studio-Mitglied",
  noBadges: "Noch keine Abzeichen. Teile einen Build, hinterlasse Feedback oder markiere, dass du helfen kannst.",
  orbitStudio: "Studio",
  orbitCommits: "{count} Commits",
  orbitCommitsMeta: "Über öffentliche Repos",
  orbitPullRequests: "{count} Pull Requests",
  orbitPrsMeta: "In der Org geöffnet",
  orbitLanguage: "Sprache",
  orbitCommit: "Commit",
  orbitCodeShare: "{percent}% des Codes",
  orbitCodeShareTiny: "<1% des Codes",
  categories: {
    stem: "MINT",
    arts: "Kunst",
    community: "Community",
    research: "Forschung",
    entrepreneurship: "Gründen",
    service: "Service",
    other: "Sonstiges",
  },
};

export const dictionaries: Record<ContentLanguage, UiCopy> = { en, zh, de };

export function parseLocale(value: string | undefined | null): ContentLanguage {
  if (value === "zh" || value === "de") return value;
  return "en";
}

export function htmlLang(locale: ContentLanguage) {
  if (locale === "zh") return "zh-CN";
  if (locale === "de") return "de";
  return "en";
}

export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}

export function docsSectionLabel(id: string, fallback: string, copy: UiCopy) {
  if (id === "getting-started") return copy.docsSectionGettingStarted;
  if (id === "products") return copy.docsSectionProducts;
  if (id === "guides") return copy.docsSectionGuides;
  if (id === "website") return copy.docsSectionWebsite;
  return fallback;
}

export function badgeLabel(copy: UiCopy, slug: string, fallback: string) {
  if (slug === "first_feedback") return copy.badgeFirstFeedback;
  if (slug === "first_playtest") return copy.badgeFirstPlaytest;
  if (slug === "helpful_reply") return copy.badgeHelpfulReply;
  if (slug === "studio_member") return copy.badgeStudioMember;
  return fallback;
}

export { IDEA_CATEGORIES };
