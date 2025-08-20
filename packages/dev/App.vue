<template>
    <div class="dev-container">
        <!-- 左侧菜单栏 -->
        <div class="sidebar">
            <h3>组件列表</h3>
            <ul class="component-menu">
                <li
                    v-for="component in componentList"
                    :key="component.name"
                    :class="{ active: activeComponent === component.name }"
                    @click="setActiveComponent(component.name)"
                >
                    <span class="component-icon">{{ component.icon }}</span>
                    <span class="component-name">{{ component.title }}</span>
                </li>
            </ul>
        </div>

        <!-- 右侧内容区域 -->
        <div class="content">
            <div class="demo-section">
                <h2>{{ currentComponentConfig?.icon }} {{ currentComponentConfig?.title }}</h2>
                <div class="component-demo">
                    <!-- 动态组件渲染 - 使用默认配置 -->
                    <component :is="currentComponent" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import DragChart from "../components/drag-chart/src/drag-chart.vue";
import SwiperSimple from "../components/swiper-simple/src/swiper-simple.vue";
import ClockFace from "../components/clock-face/src/clock-face.vue";
import Tabs from "../components/tabs/src/tabs.vue";

// 组件映射
const componentMap = {
    "drag-chart": DragChart,
    "swiper-simple": SwiperSimple,
    "clock-face": ClockFace,
    tabs: Tabs,
};

// 组件列表配置
const componentList = ref([
    {
        name: "drag-chart",
        title: "Drag Chart",
        icon: "🎯",
        description: "可拖拽的时间图表组件",
    },
    {
        name: "swiper-simple",
        title: "Swiper Simple",
        icon: "🎠",
        description: "简单轮播组件",
    },
    {
        name: "clock-face",
        title: "Clock Face",
        icon: "🕒",
        description: "时钟表盘组件",
    },
    {
        name: "tabs",
        title: "Tabs",
        icon: "📋",
        description: "标签页组件",
    },
]);

// 当前激活的组件
const activeComponent = ref("drag-chart");

// 设置激活组件
const setActiveComponent = (componentName: string) => {
    activeComponent.value = componentName;
};

// 当前组件配置
const currentComponentConfig = computed(() => {
    return componentList.value.find((item) => item.name === activeComponent.value);
});

// 当前动态组件
const currentComponent = computed(() => {
    return componentMap[activeComponent.value as keyof typeof componentMap];
});
</script>

<style scoped>
.dev-container {
    display: flex;
    height: 100vh;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background-color: #f5f5f5;
}

/* 左侧菜单栏 */
.sidebar {
    width: 280px;
    background: linear-gradient(145deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
}

.sidebar h3 {
    margin: 0 0 20px 0;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    padding-bottom: 15px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
}

.component-menu {
    list-style: none;
    padding: 0;
    margin: 0;
}

.component-menu li {
    display: flex;
    align-items: center;
    padding: 15px 12px;
    margin: 8px 0;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.component-menu li:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(5px);
}

.component-menu li.active {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.component-icon {
    font-size: 20px;
    margin-right: 12px;
    width: 24px;
    text-align: center;
}

.component-name {
    font-weight: 500;
    font-size: 14px;
}

/* 右侧内容区域 */
.content {
    flex: 1;
    padding: 30px;
    overflow-y: auto;
    background: white;
}

.demo-section {
    max-width: 1000px;
    margin: 0 auto;
}

.demo-section h2 {
    color: #2c3e50;
    font-size: 28px;
    margin-bottom: 25px;
    font-weight: 600;
    padding-bottom: 10px;
    border-bottom: 3px solid #667eea;
}

.component-demo {
    background: #fff;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid #e1e8ed;
    min-height: 400px;
}

/* 动态组件容器样式 */
.component-demo > * {
    width: 100%;
}

/* 为特定组件设置样式 */
.component-demo :deep(.drag-chart) {
    height: 300px;
    border: 1px solid #ddd;
    margin: 20px 0;
}

.component-demo :deep(.swiper-simple) {
    border: 1px solid #ddd;
    margin: 20px 0;
}

.component-demo :deep(.clock-face) {
    display: flex;
    justify-content: center;
    margin: 20px 0;
}

.component-demo :deep(.tabs-wraper) {
    margin: 20px 0;
}

.controls {
    margin-top: 20px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #667eea;
}

.controls p {
    margin: 0 0 15px 0;
    font-weight: 500;
    color: #495057;
}

.controls button {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    margin-right: 10px;
    font-weight: 500;
    transition: all 0.3s ease;
}

.controls button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.description {
    margin-top: 20px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #28a745;
}

.description p {
    margin: 0 0 15px 0;
    color: #495057;
    line-height: 1.6;
}

.description ul {
    margin: 0;
    padding-left: 20px;
}

.description li {
    margin: 8px 0;
    color: #495057;
}

.placeholder {
    text-align: center;
    padding: 60px 20px;
    color: #6c757d;
    background: #f8f9fa;
    border-radius: 12px;
    border: 2px dashed #dee2e6;
}

.placeholder p {
    font-size: 18px;
    margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .dev-container {
        flex-direction: column;
        height: auto;
    }

    .sidebar {
        width: 100%;
        height: auto;
    }

    .content {
        padding: 20px;
    }
}
</style>
