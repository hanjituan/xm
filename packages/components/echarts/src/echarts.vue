<template>
    <div
        ref="chartContainer"
        class="xm-echarts"
        :style="{ width, height }"
        @mousemove="handleMouseMove"
        @click="handleClick"
        @mouseleave="handleMouseLeave"
    >
        <!-- 悬浮提示层 -->
        <div v-if="hoveredRegion" class="region-tooltip" :style="tooltipStyle">点击编辑 {{ hoveredRegion.name }}</div>
        <!-- 高亮遮罩层 -->
        <div v-if="hoveredRegion" class="region-highlight" :style="highlightStyle"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch, nextTick, computed } from "vue";
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
    enableRegionClick?: boolean; // 是否启用区域点击
}

interface RegionInfo {
    type: string; // 'title' | 'legend' | 'xAxis' | 'yAxis' | 'series' | 'grid' | 'tooltip'
    name: string; // 显示名称
    index?: number; // 索引（用于多个同类型组件）
    rect: { x: number; y: number; width: number; height: number }; // 区域范围
}

const props = withDefaults(defineProps<EChartsProps>(), {
    width: "100%",
    height: "400px",
    theme: "default",
    onClick: false,
    enableRegionClick: false,
});

const emit = defineEmits<{
    click: [params: any]; // 图表点击事件
    chartReady: [instance: echarts.ECharts]; // 图表初始化完成事件
    regionClick: [region: RegionInfo]; // 区域点击事件
}>();

const chartContainer = ref<HTMLDivElement>();
let chartInstance: echarts.ECharts | null = null;
let resizeObserver: ResizeObserver | null = null;
let resizeTimer: number | null = null;

// 区域检测相关状态
const hoveredRegion = ref<RegionInfo | null>(null);
const chartRegions = ref<RegionInfo[]>([]);
const mousePosition = ref({ x: 0, y: 0 });

// 工具提示样式
const tooltipStyle = computed(() => {
    if (!hoveredRegion.value) return { display: "none" };
    return {
        position: "absolute" as const,
        left: mousePosition.value.x + 10 + "px",
        top: mousePosition.value.y - 30 + "px",
        zIndex: 1000,
    };
});

// 高亮样式
const highlightStyle = computed(() => {
    if (!hoveredRegion.value) return { display: "none" };
    const rect = hoveredRegion.value.rect;
    return {
        position: "absolute" as const,
        left: rect.x + "px",
        top: rect.y + "px",
        width: rect.width + "px",
        height: rect.height + "px",
        backgroundColor: "rgba(24, 144, 255, 0.1)",
        border: "2px solid #1890ff",
        borderRadius: "4px",
        pointerEvents: "none" as const,
        zIndex: 999,
    };
});

// 检测图表区域
const detectChartRegions = () => {
    if (!chartInstance || !props.enableRegionClick) return;

    const chartDom = chartContainer.value;
    if (!chartDom) return;

    const regions: RegionInfo[] = [];
    const option = chartInstance.getOption();

    try {
        // 获取图表内部 DOM 元素
        const chartSvg = chartDom.querySelector("svg") || chartDom.querySelector("canvas");
        if (!chartSvg) return;

        const chartRect = chartSvg.getBoundingClientRect();
        const containerRect = chartDom.getBoundingClientRect();

        // 计算相对位置偏移
        const offsetX = chartRect.left - containerRect.left;
        const offsetY = chartRect.top - containerRect.top;

        // 检测 title
        if (option.title && !Array.isArray(option.title)) {
            const title = option.title as any;
            if (title.show !== false) {
                const titleRect = estimateTitleRect(title, chartRect.width);
                regions.push({
                    type: "title",
                    name: "标题",
                    rect: {
                        x: offsetX + titleRect.x,
                        y: offsetY + titleRect.y,
                        width: titleRect.width,
                        height: titleRect.height,
                    },
                });
            }
        }

        // 检测 legend
        if (option.legend && !Array.isArray(option.legend)) {
            const legend = option.legend as any;
            if (legend.show !== false) {
                const legendRect = estimateLegendRect(legend, chartRect.width, chartRect.height);
                regions.push({
                    type: "legend",
                    name: "图例",
                    rect: {
                        x: offsetX + legendRect.x,
                        y: offsetY + legendRect.y,
                        width: legendRect.width,
                        height: legendRect.height,
                    },
                });
            }
        }

        // 检测网格区域 (用于检测坐标轴)
        const grid = Array.isArray(option.grid) ? option.grid[0] : option.grid || {};
        const gridRect = estimateGridRect(grid, chartRect.width, chartRect.height);

        // 检测 xAxis
        if (option.xAxis) {
            const xAxisRect = {
                x: offsetX + gridRect.x,
                y: offsetY + gridRect.y + gridRect.height,
                width: gridRect.width,
                height: 40,
            };
            regions.push({
                type: "xAxis",
                name: "X轴",
                rect: xAxisRect,
            });
        }

        // 检测 yAxis
        if (option.yAxis) {
            const yAxisRect = {
                x: offsetX + gridRect.x - 60,
                y: offsetY + gridRect.y,
                width: 60,
                height: gridRect.height,
            };
            regions.push({
                type: "yAxis",
                name: "Y轴",
                rect: yAxisRect,
            });
        }

        // 检测绘图区域（series）
        regions.push({
            type: "series",
            name: "数据区域",
            rect: {
                x: offsetX + gridRect.x,
                y: offsetY + gridRect.y,
                width: gridRect.width,
                height: gridRect.height,
            },
        });

        chartRegions.value = regions;
    } catch (error) {
        console.warn("区域检测失败:", error);
    }
};

// 估算标题区域
const estimateTitleRect = (title: any, chartWidth: number) => {
    const fontSize = title.textStyle?.fontSize || 16;
    const text = title.text || "";
    const textWidth = text.length * fontSize * 0.6; // 粗略估算

    let x = 0;
    if (title.left === "center") {
        x = (chartWidth - textWidth) / 2;
    } else if (title.left === "right") {
        x = chartWidth - textWidth - 20;
    } else {
        x = typeof title.left === "number" ? title.left : 20;
    }

    return {
        x,
        y: typeof title.top === "number" ? title.top : 20,
        width: textWidth + 40,
        height: fontSize + 20,
    };
};

// 估算图例区域
const estimateLegendRect = (legend: any, chartWidth: number, chartHeight: number) => {
    const orient = legend.orient || "horizontal";
    let width = 200;
    let height = 30;

    if (orient === "vertical") {
        width = 100;
        height = 150;
    }

    let x = 0;
    let y = 0;

    if (legend.left === "center") {
        x = (chartWidth - width) / 2;
    } else if (legend.left === "right") {
        x = chartWidth - width - 20;
    } else {
        x = typeof legend.left === "number" ? legend.left : chartWidth - width - 20;
    }

    if (legend.top === "middle") {
        y = (chartHeight - height) / 2;
    } else if (legend.top === "bottom") {
        y = chartHeight - height - 20;
    } else {
        y = typeof legend.top === "number" ? legend.top : 20;
    }

    return { x, y, width, height };
};

// 估算网格区域
const estimateGridRect = (grid: any, chartWidth: number, chartHeight: number) => {
    const left =
        typeof grid.left === "string"
            ? grid.left.includes("%")
                ? (chartWidth * parseFloat(grid.left)) / 100
                : 60
            : grid.left || 60;
    const top =
        typeof grid.top === "string"
            ? grid.top.includes("%")
                ? (chartHeight * parseFloat(grid.top)) / 100
                : 60
            : grid.top || 60;
    const right =
        typeof grid.right === "string"
            ? grid.right.includes("%")
                ? (chartWidth * parseFloat(grid.right)) / 100
                : 20
            : grid.right || 20;
    const bottom =
        typeof grid.bottom === "string"
            ? grid.bottom.includes("%")
                ? (chartHeight * parseFloat(grid.bottom)) / 100
                : 60
            : grid.bottom || 60;

    return {
        x: left,
        y: top,
        width: chartWidth - left - right,
        height: chartHeight - top - bottom,
    };
};

// 处理鼠标移动
const handleMouseMove = (event: MouseEvent) => {
    if (!props.enableRegionClick) return;

    const rect = chartContainer.value?.getBoundingClientRect();
    if (!rect) return;

    mousePosition.value = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    };

    // 检测悬浮区域
    const hitRegion = chartRegions.value.find((region) => {
        const { x, y, width, height } = region.rect;
        return (
            mousePosition.value.x >= x &&
            mousePosition.value.x <= x + width &&
            mousePosition.value.y >= y &&
            mousePosition.value.y <= y + height
        );
    });

    hoveredRegion.value = hitRegion || null;
};

// 处理点击
const handleClick = (event: MouseEvent) => {
    if (!props.enableRegionClick || !hoveredRegion.value) return;

    event.stopPropagation();
    emit("regionClick", hoveredRegion.value);
};

// 处理鼠标离开
const handleMouseLeave = () => {
    hoveredRegion.value = null;
};

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

        // 检测图表区域（延迟执行确保渲染完成）
        if (props.enableRegionClick) {
            nextTick(() => {
                setTimeout(() => {
                    detectChartRegions();
                }, 100);
            });
        }
    }
};

const updateChart = () => {
    if (chartInstance) {
        chartInstance.setOption(props.option, true);

        // 重新检测区域
        if (props.enableRegionClick) {
            nextTick(() => {
                setTimeout(() => {
                    detectChartRegions();
                }, 100);
            });
        }
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
    position: relative;
}

.region-tooltip {
    background: rgba(0, 0, 0, 0.75);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    pointer-events: none;
}

.region-highlight {
    transition: all 0.2s ease;
}
</style>
