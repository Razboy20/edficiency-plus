import { crx } from "@crxjs/vite-plugin";
import { resolve } from "path";
import solid from "solid-start/vite";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import manifest from "./src/manifest";

const root = resolve(__dirname, "src");
const pagesDir = resolve(root, "pages");
const assetsDir = resolve(root, "assets");
const outDir = resolve(__dirname, "dist");
const publicDir = resolve(__dirname, "public");

const isDev = process.env.__DEV__ === "true";

export default defineConfig({
  plugins: [
    // solidPlugin(),
    solid({
      appRoot: "src/pages/content",
      // clientEntry: "src/content/entry-client.tsx",
      // serverEntry: "src/content/entry-server.tsx",
      // rootEntry: "src/pages/root.tsx",
      // adapter: staticAdapter(),
      ssr: false,
    }),
    crx({ manifest }),
    Icons({ compiler: "solid" }),
  ],
  resolve: {
    alias: {
      "@src": root,
      "@assets": assetsDir,
      "@pages": pagesDir,
      "@content": resolve(pagesDir, "content"),
    },
  },
  ssr: {
    noExternal: true,
  },
  publicDir,
  build: {
    outDir,
    sourcemap: isDev,
  },
});
