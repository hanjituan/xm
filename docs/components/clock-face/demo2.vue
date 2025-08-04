<template>
    <div class="demo-container">
        <h3>高级配置时钟</h3>
        <p>展示多个扇形区域、自定义样式和交互效果的时钟表盘。</p>

        <div class="demo-wrapper">
            <ClockFace
                :size="400"
                center-text="Work Schedule"
                :center-text-style="centerTextStyle"
                :sectors="sectors"
                :border-color="borderColor"
                :border-width="3"
                :background-color="backgroundColor"
                :major-tick-color="majorTickColor"
                :major-tick-width="3"
                :major-tick-len="25"
                :minor-tick-color="minorTickColor"
                :minor-tick-width="1"
                :minor-tick-len="12"
                @sector-hover="handleSectorHover"
            />
        </div>

        <div class="controls">
            <div class="control-group">
                <label>背景颜色:</label>
                <select v-model="backgroundColor">
                    <option value="transparent">透明</option>
                    <option value="#ffffff">白色</option>
                    <option value="#f0f0f0">浅灰</option>
                    <option value="#e3f2fd">浅蓝</option>
                </select>
            </div>

            <div class="control-group">
                <label>边框颜色:</label>
                <input type="color" v-model="borderColor" />
            </div>

            <div class="control-group">
                <label>主刻度颜色:</label>
                <input type="color" v-model="majorTickColor" />
            </div>

            <div class="control-group">
                <label>次刻度颜色:</label>
                <input type="color" v-model="minorTickColor" />
            </div>
        </div>

        <div v-if="hoveredSector" class="hover-info">
            <p>
                <strong>{{ hoveredSector.sector.label }}:</strong> {{ formatTime(hoveredSector.sector.from) }} -
                {{ formatTime(hoveredSector.sector.to) }}
            </p>
            <p><strong>描述:</strong> {{ hoveredSector.sector.description }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { ClockFace } from "vue3-xm";

const hoveredSector = ref(null);
const backgroundColor = ref("transparent");
const borderColor = ref("#2c3e50");
const majorTickColor = ref("#34495e");
const minorTickColor = ref("#7f8c8d");

const centerTextStyle = {
    fontSize: 16,
    fontFamily: "Arial, sans-serif",
    color: "#2c3e50",
    fontWeight: "bold",
    textAlign: "center",
    textBaseline: "middle",
};

const sectors = [
    {
        from: { h: 9, m: 0, s: 0 },
        to: { h: 12, m: 0, s: 0 },
        color: "rgba(255, 99, 132, 0.5)",
        startPos: 25,
        endPos: 65,
        label: "上午工作",
        description: "处理重要任务和会议",
    },
    {
        from: { h: 13, m: 0, s: 0 },
        to: { h: 17, m: 0, s: 0 },
        color: "rgba(54, 162, 235, 0.5)",
        startPos: 25,
        endPos: 65,
        label: "下午工作",
        description: "项目开发和协作",
    },
    {
        from: { h: 12, m: 0, s: 0 },
        to: { h: 13, m: 0, s: 0 },
        color: "rgba(255, 206, 86, 0.5)",
        startPos: 65,
        endPos: 85,
        label: "午休时间",
        description: "休息和用餐",
    },
    {
        from: { h: 19, m: 0, s: 0 },
        to: { h: 22, m: 0, s: 0 },
        color: "rgba(75, 192, 192, 0.5)",
        startPos: 65,
        endPos: 85,
        label: "个人时间",
        description: "学习和娱乐",
    },
];

const handleSectorHover = (data) => {
    hoveredSector.value = data;
};

const formatTime = (time) => {
    const h = time.h === 0 ? 12 : time.h;
    const m = time.m.toString().padStart(2, "0");
    const s = time.s.toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
};
</script>

<style scoped>
.demo-container {
    padding: 20px;
    border: 1px solid #e1e4e8;
    border-radius: 8px;
    margin: 20px 0;
}

.demo-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
    background: #f8f9fa;
    border-radius: 6px;
    margin: 20px 0;
}

.controls {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    padding: 20px;
    background: #ffffff;
    border: 1px solid #e1e4e8;
    border-radius: 6px;
    margin: 20px 0;
}

.control-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.control-group label {
    font-weight: 500;
    color: #333;
    font-size: 14px;
}

.control-group select,
.control-group input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

.control-group input[type="color"] {
    height: 40px;
    cursor: pointer;
}

.hover-info {
    padding: 16px;
    background: #e8f5e8;
    border-left: 4px solid #4caf50;
    border-radius: 4px;
    margin-top: 16px;
}

.hover-info p {
    margin: 4px 0;
    color: #2e7d32;
}

.hover-info p:first-child {
    font-size: 16px;
}
</style>
