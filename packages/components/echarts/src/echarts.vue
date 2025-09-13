<template>
    <div ref="chartContainer" class="xm-echarts" :style="{ width, height }"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";

defineOptions({
    name: "XmEcharts",
});

interface EChartsProps {
    option: EChartsOption;
    width?: string;
    height?: string;
    theme?: string;
    onClick?: boolean; // 是否启用点击事件
}

const props = withDefaults(defineProps<EChartsProps>(), {
    width: "100%",
    height: "400px",
    theme: "default",
    onClick: false,
});

const emit = defineEmits<{
    click: [params: any]; // 图表点击事件
    chartReady: [instance: echarts.ECharts]; // 图表初始化完成事件
}>();

const chartContainer = ref<HTMLDivElement>();
let chartInstance: echarts.ECharts | null = null;
let resizeObserver: ResizeObserver | null = null;
let resizeTimer: number | null = null;

const initChart = () => {
    if (chartContainer.value && !chartInstance) {
        chartInstance = echarts.init(chartContainer.value, props.theme);
        chartInstance.setOption(props.option);

        // 添加点击事件监听
        if (props.onClick) {
            chartInstance.on("click", (params) => {
                emit("click", params);
            });
        }

        // 触发图表准备完成事件
        emit("chartReady", chartInstance);
    }
};

const updateChart = () => {
    if (chartInstance) {
        chartInstance.setOption(props.option, true);
    }
};

const resizeChart = () => {
    if (chartInstance) {
        chartInstance.resize();
    }
};

// 防抖版本的 resize
const debouncedResize = () => {
    if (resizeTimer) {
        clearTimeout(resizeTimer);
    }
    resizeTimer = window.setTimeout(() => {
        resizeChart();
        resizeTimer = null;
    }, 100);
};

const initResizeObserver = () => {
    if (chartContainer.value && window.ResizeObserver) {
        resizeObserver = new ResizeObserver((_entries) => {
            // 使用防抖来避免频繁调用
            debouncedResize();
        });
        resizeObserver.observe(chartContainer.value);
    }
};

const destroyResizeObserver = () => {
    if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
    }
    if (resizeTimer) {
        clearTimeout(resizeTimer);
        resizeTimer = null;
    }
};

watch(() => props.option, updateChart, { deep: true });

onMounted(async () => {
    await nextTick();
    initChart();
    initResizeObserver();
    // 保留 window resize 作为后备方案，也使用防抖
    window.addEventListener("resize", debouncedResize);
});

onUnmounted(() => {
    if (chartInstance) {
        // 移除所有事件监听器
        chartInstance.off("click");
        chartInstance.dispose();
        chartInstance = null;
    }
    destroyResizeObserver();
    window.removeEventListener("resize", debouncedResize);
});

defineExpose({
    getChartInstance: () => chartInstance,
    resize: resizeChart,
});
</script>

<style scoped>
.xm-echarts {
    min-height: 200px;
}
</style>
