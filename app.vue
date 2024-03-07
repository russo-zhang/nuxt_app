<template>
    <div class="home">
        <!-- <NuxtWelcome /> -->
        <h1>hello world</h1>
        <h2>website for test.</h2>
        <client-only>
            <h2>
                您的屏幕是
                <span style="color: red"> {{ devicePixelRatio }} </span>
                倍屏
            </h2>
        </client-only>
        <!--     <ul v-if="baidu.data && baidu.data.length > 0">
            <template v-for="(item, index) in baidu.data" :key="index">
                <li>
                    <span>{{ item.title }}</span
                    >&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{{ item.summary }}</span>
                </li>
            </template>
        </ul>
        <ul v-if="zhihu.data && zhihu.data.length > 0">
            <template v-for="(item, index) in zhihu.data" :key="index">
                <li>
                    <span>{{ item.title }}</span
                    >&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{{ item.summary }}</span>
                </li>
            </template>
        </ul> -->
    </div>
</template>

<script lang="ts" setup>
// import { useHome } from "~/hooks/home";
// import type { HotspotMapItem } from "~/hooks/home";
/* const baidu = ref<HotspotMapItem>({
    title: "百度热搜",
    data: [],
});
const zhihu = ref<HotspotMapItem>({
    title: "知乎热搜",
    data: [],
});
if (process.server) {
    const { hotspotListMap } = await useHome();
    const { baidu: _baidu, zhihu: _zhihu } = hotspotListMap;
    baidu.value = _baidu;
    zhihu.value = _zhihu;
} */
const devicePixelRatio = ref(0);
if (!process.server) {
    devicePixelRatio.value = window.devicePixelRatio;
}
</script>

<style>
.home {
    width: 1200px;
    margin: 0 auto;
}
</style>
