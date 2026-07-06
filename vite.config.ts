import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // node-server produces a fetch handler used by scripts/prerender-static.mjs (Netlify static)
  // Set NITRO_PRESET=cloudflare-module for Lovable/Cloudflare deploys
  nitro: {
    preset: process.env.NITRO_PRESET || "node-server",
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});