<template>
    <div class="ratio">
        <h1>计算图片的等比例缩放尺寸</h1>
        <div style="text-align: right">
            <el-button
                type="primary"
                @click="form = { originWidth: 0, originHeight: 0, newWidth: 0, newHeight: 0 }"
                style="margin: 10px 0"
            >
                重置表单
            </el-button>
        </div>
        <el-form :model="form" label-width="100px" class="ratio-form">
            <el-form-item label="原始宽度">
                <el-input
                    v-model.number="form.originWidth"
                    type="number"
                    placeholder="请输入原始宽度"
                    min="1"
                    :clearable="true"
                />
            </el-form-item>
            <el-form-item label="原始高度">
                <el-input
                    v-model.number="form.originHeight"
                    type="number"
                    placeholder="请输入原始高度"
                    min="1"
                    :clearable="true"
                />
            </el-form-item>
            <el-form-item label="宽高比">
                <p>{{ ratio }}</p>
            </el-form-item>
            <el-form-item label="新宽度">
                <el-input
                    v-model.number="form.newWidth"
                    type="number"
                    placeholder="输入新宽度或留空"
                    min="1"
                    :clearable="true"
                    @input="onWidthInput"
                />
            </el-form-item>
            <el-form-item label="新高度">
                <el-input
                    v-model.number="form.newHeight"
                    type="number"
                    placeholder="输入新高度或留空"
                    min="1"
                    :clearable="true"
                    @input="onHeightInput"
                />
            </el-form-item>
        </el-form>
        <div v-if="result">
            <el-alert :title="result" type="success" show-icon />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, watch } from "vue";

const form = ref({
    originWidth: 0 as number,
    originHeight: 0 as number,
    newWidth: 0 as number,
    newHeight: 0 as number,
});
const ratio = computed(() => {
    if (form.value.originWidth && form.value.originHeight) {
        return Math.round((form.value.originWidth / form.value.originHeight) * 100) / 100;
    }
    return 0;
});
function onWidthInput() {
    if (form.value.originWidth && form.value.originHeight && form.value.newWidth) {
        form.value.newHeight = Math.round((form.value.newWidth * form.value.originHeight) / form.value.originWidth);
    } else if (!form.value.newWidth) {
        form.value.newHeight = 0;
    }
}

function onHeightInput() {
    if (form.value.originWidth && form.value.originHeight && form.value.newHeight) {
        form.value.newWidth = Math.round((form.value.newHeight * form.value.originWidth) / form.value.originHeight);
    } else if (!form.value.newHeight) {
        form.value.newWidth = 0;
    }
}

const result = computed(() => {
    if (form.value.originWidth && form.value.originHeight && (form.value.newWidth || form.value.newHeight)) {
        return `缩放后尺寸：${form.value.newWidth || ""} x ${form.value.newHeight || ""}`;
    }
    return "";
});
</script>

<style lang="less" scoped>
.ratio {
    max-width: 400px;
    margin: 40px auto;
    .ratio-form {
        margin-top: 20px;
    }
}
</style>
