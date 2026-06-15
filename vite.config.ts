import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Prerender the landing page to static HTML so the build output works on
    // static hosts like Netlify. Output: dist/client/index.html.
    prerender: {
      enabled: true,
      crawlLinks: false,
      autoStaticPathsDiscovery: false,
      failOnError: false,
    },
    pages: [{ path: "/" }],
  },
  nitro: {
    preset: "static",
  },
});
