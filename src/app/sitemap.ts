import type { MetadataRoute } from "next";
import { withLocale } from "@/lib/paths";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/products",
    "/about",
    "/join",
    "/docs",
    "/support",
    "/help",
    "/help/resources",
    "/help/share",
    "/news",
    "/changelog",
    "/destinations",
    "/login",
  ];
  return (["en", "zh", "de"] as const).flatMap((locale) =>
    routes.map((route) => ({
      url: `${site.url}${withLocale(route || "/", locale)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" && locale === "en" ? 1 : 0.7,
    })),
  );
}
