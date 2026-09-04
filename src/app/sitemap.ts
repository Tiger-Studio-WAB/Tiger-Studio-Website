import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/products",
    "/about",
    "/join",
    "/docs",
    "/news",
    "/changelog",
    "/destinations",
    "/login",
  ];
  return routes.map((route) => ({
    url: `${site.url}${route || "/"}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}
