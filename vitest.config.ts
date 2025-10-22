import { defineConfig } from "vitest/config";
import { defineVitestProject } from "@nuxt/test-utils/config";
import path from "path";

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: "unit",
          include: ["test/{e2e,unit}/*.{test,spec}.ts"],
          environment: "node",
        },
      },
      await defineVitestProject({
        test: {
          name: "nuxt",
          globals: true,
          include: ["test/nuxt/*.{test,spec}.ts"],
          environment: "nuxt",
        },
      }),
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
      "#imports": path.resolve(__dirname, "./"),
      "~": path.resolve(__dirname, "./"),
    },
  },
});
