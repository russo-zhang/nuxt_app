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
const getPath = () => {
    return locale.value === "en" ? "" : locale.value;
};
const shareUrl = `https://shijilu.online/${getPath()}/share/${route.params.query}`;
useHead({
    title: t("share_title"),
    meta: [
        { name: "description", content: t("share_description") },
        { name: "keywords", content: t("share_keywords") },
        { name: "og:title", content: t("share_title") },
        { name: "og:description", content: t("share_description") },
        { name: "og:image", content: `${useAssetsImage(`images/result/${locale.value}/${route.params.query}.png`)}` },
        { name: "og:url", content: shareUrl },
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
    const text = "This is share text example";
    const via = "Your Twitter username example";
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
