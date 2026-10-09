import { routes, type VercelConfig } from "@vercel/config/v1";

export const config: VercelConfig = {
  framework: "services",
  experimentalServices: {
    web: {
      root: ".",
      routePrefix: "/",
      framework: "nextjs",
      buildCommand: "npm run build",
      runtime: "nodejs24.x",
    },
  },
  headers: [
    routes.cacheControl("/api/feed", {
      public: true,
      maxAge: "2minutes",
      staleWhileRevalidate: "1hour",
    }),
  ],
};
