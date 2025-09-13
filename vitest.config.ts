import { fileURLToPath } from "node:url";
import { mergeConfig, defineConfig } from "vitest/config";
import viteConfig from "./vite.config";
import { aurelia } from '@aurelia/vite-plugin';

export default mergeConfig(
  viteConfig,
  defineConfig({
    base: '/ChicksGold-FE-Challenge/', // para la publicación en GitHub Pages
    plugins: [aurelia()]
    ,
    test: {
      environment: "jsdom",
      watch: false,
      root: fileURLToPath(new URL("./", import.meta.url)),
      setupFiles: ["./test/setup.ts"]
    },
  }),
);