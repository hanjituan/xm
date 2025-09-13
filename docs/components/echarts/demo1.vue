<template>
    <div class="echarts-demo">
        <h3>ECharts 智能配置编辑器</h3>
        <p>点击图表的不同区域（标题、图例、坐标轴等）来编辑对应的配置项</p>

        <div class="demo-layout">
            <!-- 左侧配置区域 -->
            <div class="left-panel">
                <!-- 基础配置 -->
                <ChartConfig
                    :chart-type="chartType"
                    :chart-title="chartTitle"
                    :selected-theme="selectedTheme"
                    :chart-data="chartData"
                    :current-config-id="currentConfigId"
                    :available-configs="availableConfigs"
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
                    @select-config="loadConfigById"
                />

                <!-- 动态配置面板 -->
                <DynamicConfigPanel
                    :region="selectedRegion"
                    :chart-option="chartOption"
                    @config-change="handleConfigChange"
                />
            </div>

            <!-- 右侧图表展示 -->
            <ChartDisplay
                :chart-option="chartOption"
                :selected-theme="selectedTheme"
                :current-config="currentConfig"
                :enable-chart-click="enableChartClick"
                :enable-region-click="true"
                @chart-click="handleChartClick"
                @region-click="handleRegionClick"
            />
        </div>

        <!-- 代码展示区域 -->
        <CodeViewer :template-code="templateCode" :script-code="scriptCode" />
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useChartDemo } from "./composables/useChartDemo.js";
import ChartConfig from "./components/ChartConfig.vue";
import ChartDisplay from "./components/ChartDisplay.vue";
import CodeViewer from "./components/CodeViewer.vue";
import DynamicConfigPanel from "./components/DynamicConfigPanel.vue";

// 区域选择状态
const selectedRegion = ref(null);

// 使用组合式函数
const {
    chartType,
    chartTitle,
    selectedTheme,
    chartData,
    chartOption,
    currentConfigId,
    availableConfigs,
    enableChartClick,
    updateChartType,
    updateTitle,
    updateData,
    updateDataItem,
    addDataItem,
    removeDataItem,
    loadPreset,
    handleChartClick,
    loadConfigById,
    switchToConfigType,
    templateCode,
    scriptCode,
    updateChartOption, // 添加更新图表配置的方法
} = useChartDemo();

// 当前配置的计算属性
const currentConfig = computed(() => {
    return availableConfigs.value.find((config) => config.id === currentConfigId.value);
});

// 处理区域点击
const handleRegionClick = (region) => {
    console.log("点击了区域:", region);
    selectedRegion.value = region;
};

// 处理配置变更
const handleConfigChange = (regionType, config) => {
    console.log("配置变更:", regionType, config);

    // 更新图表配置
    const newOption = {
        ...chartOption.value,
        [regionType]: config,
    };

    // 如果 useChartDemo 提供了更新方法，使用它
    if (updateChartOption) {
        updateChartOption(newOption);
    } else {
        // 否则，我们需要修改 chartOption 的值
        // 这里需要依赖 useChartDemo 的内部实现
        console.warn("无法直接更新图表配置，需要修改 useChartDemo.js");
    }
};
</script>

<style scoped>
.echarts-demo {
    padding: 20px;
    max-width: 1400px;
    margin: 0 auto;
}

.demo-layout {
    display: grid;
    grid-template-columns: 450px 1fr;
    gap: 30px;
    margin: 20px 0;
    min-height: 600px;
}

.left-panel {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-height: 800px;
    overflow-y: auto;
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
