import { routes, type VercelConfig } from "@vercel/config/v1";

export const config = {
  framework: "nextjs",
  buildCommand: "npm run build",
  nodeVersion: "24.x",
  headers: [
    routes.cacheControl("/api/feed", {
      public: true,
      maxAge: "2minutes",
      staleWhileRevalidate: "1hour",
    }),
  ],
} satisfies VercelConfig & { nodeVersion: "24.x" };
