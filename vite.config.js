import { defineConfig } from "vite";

export default defineConfig({
  build: {
    assetsInclude: ["**/*.css"],
    rollupOptions: {
      input: "./index.html",
    },
  },
});
