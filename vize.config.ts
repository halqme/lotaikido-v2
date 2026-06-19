import { defineConfig } from "vize";

export default defineConfig({
  compiler: {
    sourceMap: true,
    templateSyntax: "standard",
    vapor: false,
    customRenderer: false,
  },
  vite: {
    scanPatterns: ["src/**/*.vue"],
  },
  linter: {
    preset: "essential",
  },
  typeChecker: {
    enabled: true,
    strict: true,
  },
  formatter: {
    printWidth: 100,
  },
});
