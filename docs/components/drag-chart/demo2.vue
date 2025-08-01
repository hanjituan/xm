<template>
    <div class="demo-container">
        <h3>自定义配置的时间范围选择</h3>
        <p>这个示例展示了更多自定义配置选项，包括颜色主题、初始范围和事件处理。</p>

        <div class="controls">
            <button @click="changeTheme" class="theme-btn">切换主题 (当前: {{ currentTheme }})</button>
            <button @click="resetRange" class="reset-btn">重置范围</button>
        </div>

        <div class="chart-wrapper">
            <DragChart
                :data="advancedData"
                :width="900"
                :height="450"
                :theme="currentTheme"
                :initial-start="initialRange.start"
                :initial-end="initialRange.end"
                :show-tooltip="true"
                :enable-zoom="true"
                @range-change="onRangeChange"
                @data-point-click="onDataPointClick"
            />
        </div>

        <div class="info-panel">
            <div class="range-info">
                <h4>当前选择范围</h4>
                <div class="range-display"><span class="label">开始:</span> {{ formatDate(selectedRange.start) }}</div>
                <div class="range-display"><span class="label">结束:</span> {{ formatDate(selectedRange.end) }}</div>
                <div class="range-display"><span class="label">天数:</span> {{ calculateDaysDiff() }} 天</div>
            </div>

            <div class="click-info" v-if="clickedPoint">
                <h4>点击的数据点</h4>
                <p>时间: {{ clickedPoint.time }}</p>
                <p>数值: {{ clickedPoint.value }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { DragChart } from "vue3-xm";

// 高级演示数据 - 更多数据点
const advancedData = ref([
    { time: "2024-01-01", value: 120 },
    { time: "2024-01-02", value: 132 },
    { time: "2024-01-03", value: 101 },
    { time: "2024-01-04", value: 134 },
    { time: "2024-01-05", value: 90 },
    { time: "2024-01-06", value: 230 },
    { time: "2024-01-07", value: 210 },
    { time: "2024-01-08", value: 320 },
    { time: "2024-01-09", value: 182 },
    { time: "2024-01-10", value: 191 },
    { time: "2024-01-11", value: 234 },
    { time: "2024-01-12", value: 290 },
    { time: "2024-01-13", value: 330 },
    { time: "2024-01-14", value: 310 },
    { time: "2024-01-15", value: 123 },
    { time: "2024-01-16", value: 164 },
    { time: "2024-01-17", value: 201 },
    { time: "2024-01-18", value: 278 },
    { time: "2024-01-19", value: 312 },
    { time: "2024-01-20", value: 289 },
    { time: "2024-01-21", value: 267 },
    { time: "2024-01-22", value: 245 },
    { time: "2024-01-23", value: 198 },
    { time: "2024-01-24", value: 176 },
    { time: "2024-01-25", value: 203 },
    { time: "2024-01-26", value: 224 },
    { time: "2024-01-27", value: 256 },
    { time: "2024-01-28", value: 287 },
    { time: "2024-01-29", value: 298 },
    { time: "2024-01-30", value: 315 },
]);

// 主题配置
const themes = ["light", "dark", "colorful"];
const currentTheme = ref("light");

// 初始范围
const initialRange = reactive({
    start: "2024-01-05",
    end: "2024-01-25",
});

// 当前选择的范围
const selectedRange = reactive({
    start: initialRange.start,
    end: initialRange.end,
});

// 点击的数据点
const clickedPoint = ref(null);

// 切换主题
const changeTheme = () => {
    const currentIndex = themes.indexOf(currentTheme.value);
    const nextIndex = (currentIndex + 1) % themes.length;
    currentTheme.value = themes[nextIndex];
};

// 重置范围
const resetRange = () => {
    selectedRange.start = initialRange.start;
    selectedRange.end = initialRange.end;
};

// 处理范围变化
const onRangeChange = (range) => {
    selectedRange.start = range.start;
    selectedRange.end = range.end;
};

// 处理数据点点击
const onDataPointClick = (point) => {
    clickedPoint.value = point;
};

// 格式化日期
const formatDate = (dateStr) => {
    if (!dateStr) return "--";
    const date = new Date(dateStr);
    return date.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
};

// 计算天数差
const calculateDaysDiff = () => {
    if (!selectedRange.start || !selectedRange.end) return 0;
    const start = new Date(selectedRange.start);
    const end = new Date(selectedRange.end);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};
</script>

<style scoped>
.demo-container {
    padding: 24px;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    margin: 20px 0;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.controls {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
}

.theme-btn,
.reset-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
}

.theme-btn {
    background: #007bff;
    color: white;
}

.theme-btn:hover {
    background: #0056b3;
}

.reset-btn {
    background: #6c757d;
    color: white;
}

.reset-btn:hover {
    background: #545b62;
}

.chart-wrapper {
    margin: 20px 0;
    background: white;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.info-panel {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 20px;
}

.range-info,
.click-info {
    background: white;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.range-info h4,
.click-info h4 {
    margin: 0 0 12px 0;
    color: #333;
    font-size: 16px;
    border-bottom: 2px solid #007bff;
    padding-bottom: 8px;
}

.range-display {
    display: flex;
    justify-content: space-between;
    margin: 8px 0;
    padding: 4px 0;
    border-bottom: 1px solid #f0f0f0;
}

.label {
    font-weight: bold;
    color: #666;
}

.click-info p {
    margin: 8px 0;
    color: #666;
    font-family: monospace;
}

@media (max-width: 768px) {
    .info-panel {
        grid-template-columns: 1fr;
    }

    .controls {
        flex-direction: column;
    }
}
</style>
