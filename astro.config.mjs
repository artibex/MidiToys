import { defineConfig } from 'astro/config';
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  distDir: "./public",
  // pages: {base: "/src"},
  // root: "./src",
  integrations: [solidJs()],
});