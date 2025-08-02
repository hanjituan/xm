<template>
    <div class="demo-container">
        <h3>基础标签页</h3>
        <p>这是一个基础的标签页示例，展示默认配置和基本功能。</p>

        <div class="tabs-wrapper">
            <Tabs v-model="activeTab" :tabs="basicTabs" @change="onTabChange" />
        </div>

        <div class="info-panel">
            <h4>当前选中</h4>
            <p>
                选中的标签值：<strong>{{ activeTab }}</strong>
            </p>

            <h4>功能说明</h4>
            <ul>
                <li>🖱️ 点击标签切换</li>
                <li>🎨 动态滑动指示器</li>
                <li>🖼️ 支持图标显示</li>
                <li>🔧 自定义插槽内容</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { Tabs } from "vue3-xm";

// 当前选中的标签
const activeTab = ref("line");

// 基础标签数据
const basicTabs = ref([
    {
        value: "line",
        label: "折线图",
        url: "https://imagecdn.ymm56.com/ymmfile/static/resource/aecd539e-515f-41e8-b126-7ac38102cafd.webp",
    },
    {
        value: "table",
        label: "表格视图",
        url: "https://imagecdn.ymm56.com/ymmfile/static/resource/13428291-7a45-4430-8fa9-70f8d0dea937.webp",
    },
    {
        value: "chart",
        label: "图表分析",
    },
    {
        value: "data",
        label: "数据统计",
    },
]);

// 标签切换事件
const onTabChange = (value) => {
    console.log("标签切换到:", value);
};
</script>

<style scoped>
.demo-container {
    padding: 24px;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    margin: 20px 0;
    background: #f8f9fa;
}

.tabs-wrapper {
    margin: 20px 0;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.info-panel {
    margin-top: 20px;
    padding: 16px;
    background: white;
    border-radius: 8px;
    border-left: 4px solid #007bff;
}

.info-panel h4 {
    margin: 0 0 12px 0;
    color: #333;
    font-size: 16px;
}

.info-panel p {
    margin: 8px 0;
    color: #666;
}

.info-panel ul {
    margin: 0;
    padding-left: 20px;
}

.info-panel li {
    margin: 4px 0;
    color: #666;
}
</style>
