<template>
    <div class="share">
        <h1>{{ $t("share_title") }}</h1>
        <p>description:{{ $t("share_description") }}</p>
        <p>keywords:{{ $t("share_keywords") }}</p>
        <p>og:title:{{ $t("share_title") }}</p>
        <p>og:description:{{ $t("share_description") }}</p>
        <!-- <p>og:url:https://shijilu.online/{{ getPath() }}/share/{{ $route.params.query }}</p> -->
        <!-- <p>og:image:{{ imageSrc() }}</p> -->
        <!-- <img :src="imageSrc()" alt="share" /> -->
        <nuxt-link to="/share/30">30</nuxt-link><br />
        <nuxt-link to="/share/20">20</nuxt-link><br />
        <el-button type="primary" @click="twitterShare">Twitter / X Share</el-button>
    </div>
</template>
<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { useAssetsImage } = useAssets();
const { t, locale } = useI18n();
const route = useRoute();
const domain = "https://shijilu.online";
const getPath = () => {
    return locale.value === "en" ? "" : `/${locale.value}`;
};
const shareUrl = `${domain}${getPath()}/share/${route.params.query}`;
useHead({
    title: t("share_title"),
    meta: [
        { name: "description", content: t("share_description") },
        { name: "keywords", content: t("share_keywords") },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:title", content: t("share_title") },
        { property: "og:description", content: t("share_description") },
        {
            property: "og:image",
            content: `${domain}${useAssetsImage(`images/result/${locale.value}/${route.params.query}.png`)}`,
        },
        { property: "og:url", content: shareUrl },
        // { property: "og:type", content: "article" },
    ],
});
onMounted(() => {
    console.log("query:", route.params.query);
    console.log("locale.value:", locale.value);
});
const openShareWindow = (url: string) => {
    window.open(url, "_blank", "width=550,height=420");
};
const twitterShare = () => {
    const text = `当前分享页面的语言是${locale.value}，所获得的结果是${route.params.query}。`;
    const via = "RiichiCity_JP";
    const hashtags = "hashtags example";
    const intentUrl =
        "https://twitter.com/intent/tweet?text=" +
        encodeURIComponent(text) +
        "&url=" +
        encodeURIComponent(shareUrl) +
        "&via=" +
        encodeURIComponent(via) +
        "&hashtags=" +
        encodeURIComponent(hashtags);
    openShareWindow(intentUrl);
};
</script>

<style lang="less" scoped>
.share {
}
</style>
