<template>
    <div class="chart-section">
        <h4>图表效果</h4>
        <div class="chart-info" v-if="currentConfig">
            <p><strong>当前配置:</strong> {{ currentConfig.name }}</p>
            <p>
                <small>{{ currentConfig.description }}</small>
            </p>
            <p v-if="enableChartClick"><small>💡 点击图表可以切换到下一个配置</small></p>
            <p v-if="enableRegionClick"><small>🎯 点击图表的不同区域（标题、图例、坐标轴）来编辑配置</small></p>
        </div>
        <div class="chart-wrapper">
            <XmEcharts
                :option="chartOption"
                :theme="selectedTheme"
                :on-click="enableChartClick"
                :enable-region-click="enableRegionClick"
                @click="handleChartClick"
                @region-click="handleRegionClick"
                width="100%"
                height="400px"
            />
        </div>
    </div>
</template>

<script setup>
import { XmEcharts } from "vue3-xm";

defineProps({
    chartOption: Object,
    selectedTheme: String,
    currentConfig: Object,
    enableChartClick: {
        type: Boolean,
        default: false,
    },
    enableRegionClick: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["chartClick", "regionClick"]);

const handleChartClick = (params) => {
    emit("chartClick", params);
};

const handleRegionClick = (region) => {
    emit("regionClick", region);
};
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

.chart-info {
    margin-bottom: 15px;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 4px;
    border-left: 4px solid #28a745;
}

.chart-info p {
    margin: 4px 0;
    color: #333;
}

.chart-info small {
    color: #666;
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
    cursor: pointer;
    transition: box-shadow 0.2s;
}

.chart-wrapper:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
