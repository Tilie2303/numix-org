import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // SPA mode: emit a static client-side-rendered shell at dist/client/index.html.
    // This makes the build deployable to static hosts like Netlify.
    spa: {
      enabled: true,
      maskPath: "/",
    },
  },
});
