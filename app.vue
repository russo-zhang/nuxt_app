<template>
    <div class="app">
        <el-header>
            <nav>
                <nuxt-link to="/">home</nuxt-link>
                <nuxt-link to="/device">device</nuxt-link>
                <nuxt-link to="/rent">rent</nuxt-link>
            </nav>
            <el-dropdown @command="selectLang">
                <span class="el-dropdown-link">
                    {{ commonStore.currentLangItem.label }}
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item
                            v-for="(item, index) in commonStore.langList"
                            :key="index"
                            :command="item.code"
                            >{{ item.name }}</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-header>
        <hr />
        <NuxtPage />
    </div>
</template>
<script lang="ts" setup>
import { useCommonStore } from "@/stores/common";
import { useI18n } from "vue-i18n";
const { setLocale } = useI18n();

const commonStore = useCommonStore();
const selectLang = (lang: string | any) => {
    commonStore.currentLang = lang;
    setLocale(lang);
};
</script>
<style lang="less">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
}
.app {
    .el-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        > nav {
            padding: 10px;
            background-color: #f0f0f0;
            a {
                margin-right: 10px;
            }
        }
    }
}
</style>
