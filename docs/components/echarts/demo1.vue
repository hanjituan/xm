<template>
    <div class="echarts-demo">
        <h3>ECharts 图表演示</h3>
        <p>左侧可以配置图表选项，右侧实时显示图表效果</p>

        <div class="demo-layout">
            <!-- 左侧配置区域 -->
            <ChartConfig
                :chart-type="chartType"
                :chart-title="chartTitle"
                :selected-theme="selectedTheme"
                :chart-data="chartData"
                @update:chart-type="chartType = $event"
                @update:chart-title="chartTitle = $event"
                @update:selected-theme="selectedTheme = $event"
                @update-chart-type="updateChartType"
                @update-title="updateTitle"
                @update-data="updateData"
                @update-data-item="updateDataItem"
                @add-data-item="addDataItem"
                @remove-data-item="removeDataItem"
                @load-preset="loadPreset"
            />

            <!-- 右侧图表展示 -->
            <ChartDisplay :chart-option="chartOption" :selected-theme="selectedTheme" />
        </div>

        <!-- 代码展示区域 -->
        <CodeViewer :template-code="templateCode" :script-code="scriptCode" />
    </div>
</template>

<script setup>
import { useChartDemo } from "./composables/useChartDemo.js";
import ChartConfig from "./components/ChartConfig.vue";
import ChartDisplay from "./components/ChartDisplay.vue";
import CodeViewer from "./components/CodeViewer.vue";

// 使用组合式函数
const {
    chartType,
    chartTitle,
    selectedTheme,
    chartData,
    chartOption,
    updateChartType,
    updateTitle,
    updateData,
    updateDataItem,
    addDataItem,
    removeDataItem,
    loadPreset,
    templateCode,
    scriptCode,
} = useChartDemo();
</script>

<style scoped>
.echarts-demo {
    padding: 20px;
    max-width: 1400px;
    margin: 0 auto;
}

.demo-layout {
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 30px;
    margin: 20px 0;
    min-height: 500px;
}

/* 响应式设计 */
@media (max-width: 1200px) {
    .demo-layout {
        grid-template-columns: 350px 1fr;
    }
}

@media (max-width: 1024px) {
    .demo-layout {
        grid-template-columns: 1fr;
        gap: 20px;
    }
}

@media (max-width: 768px) {
    .echarts-demo {
        padding: 15px;
    }
}
</style>
