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
                        :min="0"
                        :step="10000"
                        placeholder="请输入现有存款"
                        style="margin-right: 20px"
                    />
                    <el-tag v-show="currentSavingWang > 1" style="height: 32px">{{ currentSavingWang }}万</el-tag>
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
            <el-form-item label="每月存款">
                <div>
                    <p>税后工资 - 支出 ： {{ formatMoney(monthlySaving) }}</p>
                    <p>利息所得 ： {{ formatMoney(monthlyInterest) }}</p>
                    <p>
                        月总存款：
                        {{ formatMoney(monthlyInterest + monthlySaving) }}
                    </p>
                </div>
            </el-form-item>
        </el-form>
        <div v-if="result.totalNeeded > 0" class="result-block">
            <el-divider>计算结果</el-divider>
            <div>
                覆盖月支出所需总存款：<b>{{ formatMoney(result.totalNeeded) }}</b> 元 （约
                <b>{{ formatMoney(result.totalNeeded / 10000) }}</b> 万）
            </div>
            <div>
                当前年化收益：<b>{{ formatMoney(annualReturnMoney) }} 元</b>
            </div>
            <div>
                剩余工作时间：<b>{{ formatMoney(result.monthsLeft) }}</b> 个月（约 <b>{{ result.yearsLeft }}</b> 年）
            </div>
            <div>
                倒计时：<b>{{ result.daysDetail.years }}</b> 年 <b>{{ result.daysDetail.months }}</b> 月
                <b>{{ result.daysDetail.days }}</b> 天
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, watch } from "vue";

const form = ref({
    currentSaving: 1000000,
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
        saving = saving * (1 + monthlyRate) + monthlyEarning;
        months++;
    }
    const yearsLeft = (months / 12).toFixed(1);
    const daysLeft = months * 30;
    // 拆分为年、月、天
    const years = Math.floor(daysLeft / 365);
    const monthsRemain = Math.floor((daysLeft % 365) / 30);
    const daysRemain = Math.floor((daysLeft % 365) % 30);
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
    }
}
</style>
