import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxt/eslint",
    "@nuxt/test-utils",
    "@nuxt/fonts",
    "@nuxt/image",
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: {
    families: [{ name: "Manrope", weights: [400, 600, 700] }],
  },
});