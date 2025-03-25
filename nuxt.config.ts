// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-03-25",
    devtools: { enabled: true },
    modules: ["@element-plus/nuxt", "@pinia/nuxt", "@nuxtjs/i18n", "@vueuse/nuxt"],
    css: ["@/assets/css/base.less"],
    i18n: {
        locales: [
            { code: "en", language: "en-US", name: "English" },
            { code: "tc", language: "zh", name: "Traditional Chinese" },
        ],
        defaultLocale: "en",
        strategy: "prefix_except_default", // 使路径前缀区分语言
        vueI18n: "./locales/index.ts", // if you are using custom path, default
    },
});
