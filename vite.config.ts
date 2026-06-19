import { defineConfig, lazyPlugins } from "vite-plus";
import vize from "@vizejs/vite-plugin";
import vueDevTools from "vite-plugin-vue-devtools";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  fmt: {},
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  run: {
    tasks: {
      quality: {
        command: "vize ready src",
        cache: false,
      },
      build: {
        command: ["wrangler types", "vp build"],
        cache: false,
        dependsOn: ["type-check"],
      },
      "type-check": {
        command: "vue-tsc --build",
      },
      deploy: {
        command: "wrangler deploy",
        cache: false,
        dependsOn: ["build"],
      },
      preview: {
        command: "wrangler dev",
        cache: false,
        dependsOn: ["build"],
      },
      "vize:fmt": {
        command: "vize fmt --write src",
      },
      "vize:lint": {
        command: "vize lint --preset essential src",
      },
      "vize:check": {
        command: "vize check src",
      },
      "vize:build": {
        command: "vize build src",
      },
      "vize:ready": {
        command: "vize ready src",
      },
    },
  },
  base: "/lotAikido/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: lazyPlugins(() => [vize(), vueDevTools()]),
});
