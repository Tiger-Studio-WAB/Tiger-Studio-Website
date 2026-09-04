export const site = {
  name: "Tiger Studio",
  shortName: "Tiger Studio",
  tagline: "A passion club of the Western Academy of Beijing",
  description:
    "Tiger Studio is a WAB passion club and public hub. News, changelogs, posts, and projects live on the sites that own them — this website points the way.",
  motto: "Connect, Inspire, Challenge",
  url: "https://tiger-studio-wab.vercel.app",
  affiliation: "Western Academy of Beijing",
  address: {
    line1: "10 Lai Guang Ying Dong Lu",
    line2: "Chao Yang District",
    city: "Beijing",
    postal: "100102",
    phone: "+86 10 2618 5588",
  },
  links: {
    wab: "https://wab.edu/",
    wabNews: "https://wab.edu/news",
    wabCn: "https://www.wab-edu.cn/",
    github: "https://github.com/Tiger-Studio-WAB",
    websiteRepo: "https://github.com/Tiger-Studio-WAB/Tiger-Studio-Website",
    firstProject: "https://github.com/Tiger-Studio-WAB/WAB-Project-1",
    githubOrgProfile: "https://github.com/Tiger-Studio-WAB",
    contactWab: "https://www.wab-edu.cn/join-us/contact-us",
  },
} as const;

export type Site = typeof site;
