import { routes, type VercelConfig } from "@vercel/config/v1";

export const config: VercelConfig = {
  framework: "nextjs",
  buildCommand: "npm run build",
  headers: [
    routes.cacheControl("/api/feed", {
      public: true,
      maxAge: "2minutes",
      staleWhileRevalidate: "1hour",
    }),
  ],
};
