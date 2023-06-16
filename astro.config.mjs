import { defineConfig } from 'astro/config';
import solidJs from "@astrojs/solid-js";
import dotenv from 'dotenv'
import { env } from 'process';

dotenv.config({})

// https://astro.build/config
export default defineConfig({
  // distDir: "./public",
  // pages: {base: "/src"},
  // root: "./src",
  integrations: [solidJs()],
});