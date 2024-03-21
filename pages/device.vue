<template>
    <div class="device">
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
    </div>
</template>

<script lang="ts" setup>
const devicePixelRatio = ref(0);
if (!process.server) {
    devicePixelRatio.value = window.devicePixelRatio;
}
</script>

<style>
@media screen and (min-width: 1200px) {
    .device {
        width: 1200px;
        margin: 0 auto;
    }
}
</style>
