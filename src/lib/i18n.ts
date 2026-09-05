import { IDEA_CATEGORIES, type ContentLanguage, type IdeaCategory } from "@/lib/help-types";

export const UI_COOKIE = "locale";

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
  howPost: string;
  howReply: string;
  howTranslate: string;
  all: string;
  products: string;
  about: string;
  join: string;
  docs: string;
  support: string;
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
  authError: "Sign-in did not finish. Try GitHub or Microsoft again.",
  howPost: "Post an idea you want help with.",
  howReply: "Reply if you can help, or have a question.",
  howTranslate: "Translate a post between English and Chinese.",
  all: "All",
  products: "Products",
  about: "About",
  join: "Join",
  docs: "Docs",
  support: "Support",
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
  authError: "登录没有完成。请用 GitHub 或 Microsoft 再试一次。",
  howPost: "发布一个需要帮助的想法。",
  howReply: "能帮忙，或者有问题，就回复。",
  howTranslate: "把内容在中英文之间翻译。",
  all: "全部",
  products: "产品",
  about: "关于",
  join: "加入",
  docs: "文档",
  support: "支持",
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

export const dictionaries: Record<ContentLanguage, UiCopy> = { en, zh };

export function parseLocale(value: string | undefined | null): ContentLanguage {
  return value === "zh" ? "zh" : "en";
}

export function oppositeLocale(locale: ContentLanguage): ContentLanguage {
  return locale === "en" ? "zh" : "en";
}

export { IDEA_CATEGORIES };
