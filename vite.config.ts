import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
let fcmdark = "/fcmdark.png";
let fcm = "/fcm.png";
let faviconURL = "/favicon.svg";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: [faviconURL, fcmdark, fcm],
      manifest: {
        name: "Kortlabbet",
        theme_color: "#ffffff",
        icons: [
          {
            src: faviconURL,
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
          {
            src: faviconURL,
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    cors: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
