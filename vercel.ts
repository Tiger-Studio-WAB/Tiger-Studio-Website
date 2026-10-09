import { routes, type VercelConfig } from "@vercel/config/v1";

export const config = {
  services: {
    web: {
      root: ".",
      framework: "nextjs",
      buildCommand: "npm run build",
      runtime: "nodejs24.x",
    },
  },
  rewrites: [
    {
      source: "/(.*)",
      destination: { service: "web" },
    },
  ],
  headers: [
    routes.cacheControl("/api/feed", {
      public: true,
      maxAge: "2minutes",
      staleWhileRevalidate: "1hour",
    }),
  ],
} satisfies {
  services: {
    web: {
      root: string;
      framework: "nextjs";
      buildCommand: string;
      runtime: "nodejs24.x";
    };
  };
  rewrites: Array<{ source: string; destination: { service: "web" } }>;
  headers: VercelConfig["headers"];
};
