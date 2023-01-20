import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import createSvgSpritePlugin from "vite-plugin-svg-sprite";

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    // envDir: "./",
    resolve: {
      alias: {
        vue: "vue/dist/vue.esm-bundler.js",
      },
    },
    // base: "/static",
    server: {
      host: "0.0.0.0",
      port: 8080,
    },
    build: {
      emptyOutDir: true,
      manifest: true,
      outDir: "./static/dist",
      minify: true,
      cssCodeSplit: true,
      rollupOptions: {
        input: {
          app: "./vue/main.ts",
        },
      },
    },
    plugins: [
      vue(),
      createSvgSpritePlugin({
        symbolId: "icon-[name]",
      }),
    ],
  });
};
