<template>
    <div class="dev-container">
        <h1>XM Components Development</h1>

        <!-- 拖拽图表组件测试 -->
        <div class="demo-section">
            <h2>Drag Chart Component</h2>
            <div style="width: 100%; height: 300px; border: 1px solid #ddd; margin: 20px 0">
                <DragChart
                    :time-range="timeRange"
                    :active-time="activeTime"
                    :value-data="valueData"
                    :min-range="24"
                    :max-range="168"
                    :need-click="true"
                    @update:active-time="onUpdateActiveTime"
                    @out-of-range="onOutOfRange"
                />
            </div>
            <div>
                <p>当前选择时间: {{ activeTime }}</p>
                <button @click="resetTime">重置时间</button>
                <button @click="addData">添加数据</button>
            </div>
        </div>

        <!-- 轮播组件测试 -->
        <div class="demo-section">
            <h2>Swiper Component</h2>
            <div style="width: 100%; height: 200px; border: 1px solid #ddd; margin: 20px 0">
                <SwiperSimple :img-list="swiperImages" :auto-play="true" :play-time="3" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DragChart from "../components/drag-chart/src/drag-chart.vue";
import SwiperSimple from "../components/swiper-simple/src/swiper-simple.vue";
import dayjs from "dayjs";

// 拖拽图表数据
const timeRange = ref([dayjs().subtract(7, "day").format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD")]);

const activeTime = ref([
    dayjs().subtract(2, "day").hour(8).format("YYYY-MM-DD HH:00:00"),
    dayjs().subtract(1, "day").hour(18).format("YYYY-MM-DD HH:00:00"),
]);

const valueData = ref([
    dayjs().subtract(3, "day").hour(10).format("YYYY-MM-DD HH:00:00"),
    dayjs().subtract(2, "day").hour(14).format("YYYY-MM-DD HH:00:00"),
    dayjs().subtract(1, "day").hour(16).format("YYYY-MM-DD HH:00:00"),
]);

// 轮播数据
const swiperImages = ref([
    "https://picsum.photos/400/200?random=1",
    "https://picsum.photos/400/200?random=2",
    "https://picsum.photos/400/200?random=3",
    "https://picsum.photos/400/200?random=4",
]);

const onUpdateActiveTime = (newTime: string[]) => {
    console.log("Active time updated:", newTime);
    activeTime.value = newTime;
};

const onOutOfRange = (event: any) => {
    console.log("Out of range:", event);
};

const resetTime = () => {
    activeTime.value = [
        dayjs().subtract(1, "day").hour(9).format("YYYY-MM-DD HH:00:00"),
        dayjs().hour(17).format("YYYY-MM-DD HH:00:00"),
    ];
};

const addData = () => {
    valueData.value.push(
        dayjs()
            .hour(Math.floor(Math.random() * 24))
            .format("YYYY-MM-DD HH:00:00")
    );
};
</script>

<style scoped>
.dev-container {
    padding: 20px;
    font-family: Arial, sans-serif;
}

.demo-section {
    margin-bottom: 40px;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
}

h1 {
    color: #333;
    text-align: center;
    margin-bottom: 30px;
}

h2 {
    color: #666;
    margin-bottom: 15px;
}

button {
    margin-right: 10px;
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

p {
    margin: 10px 0;
    color: #555;
}
</style>
