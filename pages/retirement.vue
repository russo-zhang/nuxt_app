<template>
    <div class="retirement">
        <h1>Retirement Plan</h1>
        <div style="text-align: right">
            <el-button type="primary" style="margin: 10px 0" @click="resetForm">重置表单</el-button>
        </div>
        <el-form :model="form" ref="formRef" label-width="120px" class="ratio-form">
            <el-form-item label="现有存款">
                <div style="display: flex">
                    <el-input-number
                        v-model="form.currentSaving"
                        :step="10000"
                        placeholder="请输入现有存款"
                        style="margin-right: 20px"
                    />
                    <el-tag v-show="currentSavingWang < -1 || currentSavingWang > 1" style="height: 32px"
                        >{{ currentSavingWang }}万</el-tag
                    >
                </div>
            </el-form-item>
            <el-form-item label="税后工资">
                <el-input-number v-model="form.monthlyEarning" :min="0" :step="1000" placeholder="请输入税后工资" />
            </el-form-item>
            <el-form-item label="理财年化收益(%)">
                <el-input-number v-model="form.annualReturn" :min="0" :step="0.1" placeholder="请输入年化收益" />
            </el-form-item>
            <el-form-item label="月支出">
                <el-input-number v-model="form.monthlyExpense" :min="0" :step="1000" placeholder="请输入月支出" />
            </el-form-item>
        </el-form>
        <div v-if="result.totalNeeded > 0" class="result-block">
            <el-divider>计算结果</el-divider>
            <div>
                收支差额
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="收支差额 = 月税后工资 - 月支出"
                    placement="top-start"
                >
                    <svg style="width: 16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                        <path
                            fill="currentColor"
                            d="M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64m67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344M590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"
                        ></path>
                    </svg>
                </el-tooltip>
                ：
                <b>{{ formatMoney(monthlySaving) }} 元</b>
            </div>
            <div>
                利息所得 ：<b>{{ formatMoney(monthlyInterest) }} 元</b>
            </div>
            <div style="color: skyblue">
                月总存款：<b>{{ formatMoney(monthlyInterest + monthlySaving) }} 元</b>
            </div>
            <div>
                覆盖月支出所需总存款：<b>{{ formatMoney(result.totalNeeded) }}</b> 元 （约
                <b>{{ formatMoney(result.totalNeeded / 10000) }}</b> 万）
            </div>
            <div>
                还需资金：<b>{{ formatMoney(needTotalMoney) }}</b> 元 （约
                <b>{{ formatMoney(needTotalMoney / 10000) }}</b> 万）
            </div>

            <div>
                本年度年化收益：<b>{{ formatMoney(annualReturnMoney) }} 元</b>
            </div>
            <div>
                剩余工作时间：<b>{{ result.monthsLeft }}</b> 个月（约 <b>{{ result.yearsLeft }}</b> 年）
            </div>
            <div>
                倒计时：<b>{{ result.daysDetail.years }}</b> 年 <b>{{ result.daysDetail.months }}</b> 月
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, watch } from "vue";

const form = ref({
    currentSaving: 100000,
    monthlyEarning: 10000,
    annualReturn: 5,
    monthlyExpense: 6000,
});
const formRef = ref();
const currentSavingWang = computed(() => {
    return form.value.currentSaving ? form.value.currentSaving / 10000 : 0;
});
// 月收入存款
const monthlySaving = computed(() => {
    return form.value.monthlyEarning - form.value.monthlyExpense;
});
// 年化收益金额
const annualReturnMoney = computed(() => {
    const { currentSaving, annualReturn } = form.value;
    return currentSaving && annualReturn ? (currentSaving * annualReturn) / 100 : 0;
});
// 月利息所得
const monthlyInterest = computed(() => {
    return Number(annualReturnMoney.value) ? Number(annualReturnMoney.value) / 12 : 0;
});
// 还需资金计算
const needTotalMoney = computed(() => {
    return result.value.totalNeeded - form.value.currentSaving;
});

const result = computed(() => {
    const { currentSaving, monthlyEarning, annualReturn, monthlyExpense } = form.value;
    if (!currentSaving && !monthlyEarning && !annualReturn && !monthlyExpense)
        return {
            totalNeeded: 0,
            monthsLeft: 0,
            yearsLeft: 0,
            daysLeft: 0,
            daysDetail: { years: 0, months: 0, days: 0 },
        };
    if (monthlyExpense <= 0)
        return {
            totalNeeded: 0,
            monthsLeft: 0,
            yearsLeft: 0,
            daysLeft: 0,
            daysDetail: { years: 0, months: 0, days: 0 },
        };
    // 假设安全退休金额 = 月支出 * 12
    const totalNeeded = Math.round(((monthlyExpense * 12) / annualReturn) * 100);
    // 计算每月收益率
    const monthlyRate = annualReturn > 0 ? Math.pow(1 + annualReturn / 100, 1 / 12) - 1 : 0;
    // 复利计算达到目标金额所需月数
    let months = 0;
    let saving = currentSaving;
    while (saving < totalNeeded && months < 1000 * 12) {
        saving = saving * (1 + monthlyRate) + (monthlyEarning - monthlyExpense);
        months++;
    }
    const yearsLeft = (months / 12).toFixed(1);
    const daysLeft = months * 30;
    // 拆分为年、月、天
    const years = Math.floor(months / 12);
    const monthsRemain = months % 12;
    const daysRemain = 0; // 忽略天数
    return {
        totalNeeded,
        monthsLeft: months,
        yearsLeft,
        daysLeft,
        daysDetail: { years, months: monthsRemain, days: daysRemain },
    };
});

function resetForm() {
    form.value = { currentSaving: 0, monthlyEarning: 0, annualReturn: 0, monthlyExpense: 0 };
}
const formatMoney = (value: number) => {
    if (isNaN(value)) return 0;
    if (value === Infinity) return "∞";
    return value ? Math.round(value * 100) / 100 : 0;
};
</script>

<style lang="less" scoped>
.retirement {
    max-width: 500px;
    margin: 40px auto;
    padding: 0 20px;
    .ratio-form {
        margin-top: 20px;
    }
    .result-block {
        margin-top: 30px;
        background: #f8f8f8;
        padding: 20px;
        border-radius: 8px;
        > div {
            margin-bottom: 10px;
            svg {
            }
        }
    }
}
</style>
