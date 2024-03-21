<template>
    <div class="rent">
        <h1>房屋租赁价值计算</h1>
        <client-only>
            <el-form label-position="top" label-width="auto" :model="formData" style="max-width: 600px">
                <el-form-item label="房屋出售价">
                    <el-input-number
                        v-model="formData.saleAmount"
                        :min="1"
                        :max="10000000"
                        :step="10000"
                        size="large"
                        style="width: 100%"
                    />
                </el-form-item>
                <el-form-item label="杂费（中介费等）">
                    <el-input-number
                        v-model="formData.feeAmount"
                        :min="0"
                        :max="10000000"
                        :step="100"
                        size="large"
                        style="width: 100%"
                    />
                </el-form-item>
                <el-form-item label="月租金">
                    <el-input-number
                        v-model="formData.rentAmount"
                        :min="1"
                        :max="10000000"
                        :step="100"
                        size="large"
                        style="width: 100%"
                    />
                </el-form-item>
            </el-form>
            <el-divider />
            <el-row>
                <el-col :span="12">
                    <el-statistic title="总售价" :value="totalSaleAmount" />
                </el-col>
                <el-col :span="12">
                    <el-statistic title="年租金" :value="yearRentAmount" />
                </el-col>
                <el-divider />
                <el-col :span="12">
                    <el-statistic title="回本(月)" :value="rentSaleRatio" />
                </el-col>
                <el-col :span="12">
                    <el-statistic title="回本(年)" :value="rentSaleRatioYear" />
                </el-col>
                <el-divider />
                <el-col :span="12">
                    <el-statistic title="年回报率" :value="yearReturnRate" />
                </el-col>
            </el-row>
        </client-only>
    </div>
</template>
<script lang="ts" setup>
useHead({
    title: "房屋租赁价值计算",
});
// 设置页面标题
const formData = reactive({
    saleAmount: 600000, // 房屋出售价
    feeAmount: 0, // 杂费（中介费等）
    rentAmount: 3000, // 租金
});
// 计算总售价
const totalSaleAmount = computed(() => {
    return formData.saleAmount + formData.feeAmount;
});
// 计算年租金
const yearRentAmount = computed(() => {
    return formData.rentAmount * 12;
});
// 计算几个月回本
const rentSaleRatio = computed(() => {
    const month = totalSaleAmount.value / formData.rentAmount;
    return `${month.toFixed(0)} 个月回本`;
});
// 租售比按照年计算
const rentSaleRatioYear = computed(() => {
    const year = totalSaleAmount.value / (formData.rentAmount * 12);
    return `${year.toFixed(1)} 年回本`;
});
// 计算年回报率
const yearReturnRate = computed(() => {
    console.log("yearRentAmount.value:", yearRentAmount.value);
    console.log("totalSaleAmount.value:", totalSaleAmount.value);
    const rate = yearRentAmount.value / totalSaleAmount.value;
    return `${(rate * 100).toFixed(2)}%`;
});
onMounted(() => {
    const rent = localStorage.getItem("rent");
    if (rent) {
        Object.assign(formData, JSON.parse(rent));
    }
});

watch(
    () => formData,
    () => {
        localStorage.setItem("rent", JSON.stringify(formData));
    },
    { deep: true }
);
</script>

<style lang="less">
.rent {
    padding: 30px 20px;
    .el-input-number {
        .el-input-number__decrease,
        .el-input-number__increase {
            width: 100px;
        }
        .el-input__wrapper {
            padding-left: 110px !important;
            padding-right: 110px !important;
        }
    }
}
</style>
