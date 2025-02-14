import { defineConfig } from "vite";

export default defineConfig({
  publicDir: "public",
  build: {
    assetsDir: "assets",
    rollupOptions: {
      input: "./index.html",
    },
  },
});
