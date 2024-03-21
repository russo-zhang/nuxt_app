<template>
    <div class="app">
        <nav>
            <nuxt-link to="/">home</nuxt-link>
            <nuxt-link to="/device">device</nuxt-link>
            <nuxt-link to="/rent">rent</nuxt-link>
        </nav>
        <hr />
        <NuxtPage />
    </div>
</template>
<script lang="ts" setup></script>
<style lang="less">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
}
.app {
    > nav {
        padding: 10px;
        background-color: #f0f0f0;
        a {
            margin-right: 10px;
        }
    }
}
</style>
