export const site = {
  name: "Tiger Studio",
  shortName: "Tiger Studio",
  tagline: "A student passion club and public hub",
  description:
    "Tiger Studio is a student passion club. News, changelogs, posts, and projects live on the sites that own them — this website points the way.",
  motto: "Make, ship, share",
  url: "https://tiger-studio-website.vercel.app",
  links: {
    github: "https://github.com/Tiger-Studio-WAB",
  },
} as const;

export type Site = typeof site;
