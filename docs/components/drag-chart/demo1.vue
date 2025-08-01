<template>
    <div class="demo-container">
        <h3>基础时间范围选择</h3>
        <p>这是一个基础的拖拽时间范围选择示例，展示默认配置的使用方法。</p>

        <div class="chart-wrapper">
            <DragChart :data="basicData" :width="800" :height="400" @range-change="onRangeChange" />
        </div>

        <div class="result-display">
            <h4>选择的时间范围：</h4>
            <p>开始时间: {{ selectedRange.start }}</p>
            <p>结束时间: {{ selectedRange.end }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { DragChart } from "vue3-xm";

// 基础演示数据
const basicData = ref([
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
]);

// 选择的时间范围
const selectedRange = reactive({
    start: "",
    end: "",
});

// 处理范围变化
const onRangeChange = (range) => {
    selectedRange.start = range.start;
    selectedRange.end = range.end;
    console.log("时间范围变化:", range);
};
</script>

<style scoped>
.demo-container {
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin: 20px 0;
    background: #fafafa;
}

.chart-wrapper {
    margin: 20px 0;
    background: white;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    height: 200px;
}

.result-display {
    background: #f0f8ff;
    padding: 15px;
    border-radius: 6px;
    border-left: 4px solid #007bff;
}

.result-display h4 {
    margin: 0 0 10px 0;
    color: #333;
}

.result-display p {
    margin: 5px 0;
    font-family: monospace;
    color: #666;
}
</style>
