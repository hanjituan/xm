<template>
    <div class="chart-section">
        <h4>图表效果</h4>
        <div class="chart-wrapper">
            <XmEcharts :option="chartOption" :theme="selectedTheme" width="100%" height="400px" />
        </div>
    </div>
</template>

<script setup>
import { XmEcharts } from "vue3-xm";

defineProps({
    chartOption: Object,
    selectedTheme: String,
});
</script>

<style scoped>
.chart-section {
    background: white;
    border: 1px solid #e1e4e8;
    border-radius: 8px;
    padding: 20px;
    min-height: 500px;
}

.chart-section h4 {
    margin-top: 0;
    color: #333;
    font-size: 16px;
    margin-bottom: 15px;
    border-bottom: 2px solid #28a745;
    padding-bottom: 8px;
}

.chart-wrapper {
    min-height: 400px;
    min-width: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #f1f3f4;
    border-radius: 4px;
    background: #fafbfc;
}

@media (max-width: 1024px) {
    .chart-wrapper {
        min-width: 100%;
    }
}

@media (max-width: 768px) {
    .chart-wrapper {
        min-height: 300px;
    }
}

@media (max-width: 480px) {
    .chart-wrapper {
        min-height: 250px;
    }
}
</style>
