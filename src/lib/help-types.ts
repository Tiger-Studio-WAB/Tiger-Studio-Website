export const IDEA_CATEGORIES = [
  "stem",
  "arts",
  "community",
  "research",
  "entrepreneurship",
  "service",
  "other",
] as const;

export const CONTENT_LANGUAGES = ["en", "zh", "de"] as const;

export type IdeaCategory = (typeof IDEA_CATEGORIES)[number];
export type ContentLanguage = (typeof CONTENT_LANGUAGES)[number];

export type Profile = {
  id: string;
  email: string;
  display_name: string;
  avatar_url: string | null;
  created_at: string;
};

export type Badge = {
  id: string;
  slug: string;
  name: string;
  description: string;
};

export type ProfileBadge = {
  badge: Badge;
  awarded_at: string;
};

export type Idea = {
  id: string;
  author_id: string;
  title: string;
  body: string;
  help_needed: string | null;
  category: IdeaCategory;
  source_language: ContentLanguage;
  created_at: string;
  updated_at: string;
  profiles?: Profile | null;
  response_count?: number;
};

export type ResponsePost = {
  id: string;
  idea_id: string;
  author_id: string;
  body: string;
  can_help: boolean;
  source_language: ContentLanguage;
  created_at: string;
  profiles?: Profile | null;
};

export type ContentTranslation = {
  id: string;
  entity_type: "idea" | "response";
  entity_id: string;
  language: ContentLanguage;
  title: string | null;
  body: string;
  help_needed: string | null;
};

export type PlaytestShare = {
  id: string;
  author_id: string;
  title: string;
  what_to_try: string;
  link: string | null;
  notes: string | null;
  is_anonymous: boolean;
  created_at: string;
  profiles?: Profile | null;
  badges?: Badge[];
};

export type ProductFeedback = {
  id: string;
  author_id: string;
  share_id: string | null;
  target: string;
  body: string;
  is_anonymous: boolean;
  created_at: string;
  profiles?: Profile | null;
  badges?: Badge[];
};
