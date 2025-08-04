<template>
    <div class="demo-container">
        <h3>基础时钟表盘</h3>
        <p>一个简单的时钟表盘，包含基本的刻度和一个扇形区域。</p>

        <div class="demo-wrapper">
            <ClockFace
                :size="300"
                center-text="Clock"
                :center-text-style="centerTextStyle"
                :sectors="sectors"
                @sector-hover="handleSectorHover"
            />
        </div>

        <div v-if="hoveredSector" class="hover-info">
            <p>
                <strong>悬停区域:</strong> {{ formatTime(hoveredSector.sector.from) }} -
                {{ formatTime(hoveredSector.sector.to) }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { ClockFace } from "vue3-xm";

const hoveredSector = ref(null);

const centerTextStyle = {
    fontSize: 20,
    fontFamily: "Arial, sans-serif",
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
    textBaseline: "middle",
};

const sectors = [
    {
        from: { h: 9, m: 0, s: 0 },
        to: { h: 12, m: 0, s: 0 },
        color: "rgba(255, 99, 132, 0.4)",
        startPos: 30,
        endPos: 70,
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
    padding: 20px;
    background: #f8f9fa;
    border-radius: 6px;
    margin: 20px 0;
}

.hover-info {
    padding: 12px;
    background: #e3f2fd;
    border-left: 4px solid #2196f3;
    border-radius: 4px;
    margin-top: 16px;
}

.hover-info p {
    margin: 0;
    color: #1976d2;
}
</style>
