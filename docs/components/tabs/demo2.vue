<template>
    <div class="demo-container">
        <h3>高级配置演示</h3>
        <p>这个示例展示了自定义插槽、动态标签和事件处理等高级功能。</p>

        <div class="controls">
            <button @click="addTab" class="control-btn">➕ 添加标签</button>
            <button @click="removeTab" class="control-btn" :disabled="customTabs.length <= 1">➖ 删除标签</button>
            <button @click="toggleTemplate" class="control-btn">🎨 切换模板</button>
        </div>

        <div class="tabs-wrapper">
            <Tabs v-model="activeCustomTab" :tabs="customTabs" @change="onCustomTabChange">
                <template #default="{ item, index }" v-if="useCustomTemplate">
                    <div class="custom-tab-content">
                        <span class="tab-badge">{{ index + 1 }}</span>
                        <div class="tab-info">
                            <div class="tab-title">{{ item.label }}</div>
                            <div class="tab-subtitle">{{ item.subtitle || "标签页" }}</div>
                        </div>
                    </div>
                </template>
            </Tabs>
        </div>

        <div class="content-area">
            <h4>标签内容区域</h4>
            <div class="tab-content">
                <div v-if="activeCustomTab === 'home'" class="content-panel">
                    <h5>🏠 首页内容</h5>
                    <p>这里是首页的内容区域，可以放置任何你想要的内容。</p>
                </div>
                <div v-else-if="activeCustomTab === 'about'" class="content-panel">
                    <h5>📖 关于我们</h5>
                    <p>这里是关于页面的内容，介绍公司或产品信息。</p>
                </div>
                <div v-else-if="activeCustomTab === 'contact'" class="content-panel">
                    <h5>📞 联系方式</h5>
                    <p>这里是联系页面的内容，提供联系方式和表单。</p>
                </div>
                <div v-else class="content-panel">
                    <h5>🔥 {{ getCurrentTabLabel() }}</h5>
                    <p>这是动态添加的标签页内容。</p>
                </div>
            </div>
        </div>

        <div class="info-panel">
            <h4>当前状态</h4>
            <ul>
                <li>
                    当前选中：<strong>{{ activeCustomTab }}</strong>
                </li>
                <li>
                    标签总数：<strong>{{ customTabs.length }}</strong>
                </li>
                <li>
                    自定义模板：<strong>{{ useCustomTemplate ? "开启" : "关闭" }}</strong>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { Tabs } from "vue3-xm";

// 当前选中的标签
const activeCustomTab = ref("home");

// 是否使用自定义模板
const useCustomTemplate = ref(false);

// 标签计数器
let tabCounter = 1;

// 自定义标签数据
const customTabs = ref([
    {
        value: "home",
        label: "首页",
        subtitle: "主页面",
    },
    {
        value: "about",
        label: "关于我们",
        subtitle: "公司介绍",
    },
    {
        value: "contact",
        label: "联系我们",
        subtitle: "联系方式",
    },
]);

// 标签切换事件
const onCustomTabChange = (value) => {
    console.log("自定义标签切换到:", value);
};

// 添加标签
const addTab = () => {
    tabCounter++;
    const newTab = {
        value: `tab${tabCounter}`,
        label: `标签${tabCounter}`,
        subtitle: `动态标签${tabCounter}`,
    };
    customTabs.value.push(newTab);
};

// 删除标签
const removeTab = () => {
    if (customTabs.value.length > 1) {
        const removed = customTabs.value.pop();
        // 如果删除的是当前选中的标签，切换到第一个
        if (removed && activeCustomTab.value === removed.value) {
            activeCustomTab.value = customTabs.value[0].value;
        }
    }
};

// 切换模板
const toggleTemplate = () => {
    useCustomTemplate.value = !useCustomTemplate.value;
};

// 获取当前标签的标题
const getCurrentTabLabel = () => {
    const currentTab = customTabs.value.find((tab) => tab.value === activeCustomTab.value);
    return currentTab ? currentTab.label : "";
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

.controls {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.control-btn {
    padding: 8px 16px;
    border: 1px solid #ddd;
    border-radius: 6px;
    background: white;
    color: #333;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
}

.control-btn:hover:not(:disabled) {
    background: #007bff;
    color: white;
    border-color: #007bff;
}

.control-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.tabs-wrapper {
    margin: 20px 0;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.custom-tab-content {
    display: flex;
    align-items: center;
    gap: 8px;
}

.tab-badge {
    background: #007bff;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
}

.tab-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.tab-title {
    font-weight: 500;
    font-size: 14px;
}

.tab-subtitle {
    font-size: 12px;
    color: #666;
    margin-top: 2px;
}

.content-area {
    margin: 20px 0;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.content-area h4 {
    margin: 0;
    padding: 16px 20px;
    background: #f8f9fa;
    border-bottom: 1px solid #e0e0e0;
    color: #333;
}

.tab-content {
    padding: 20px;
}

.content-panel h5 {
    margin: 0 0 12px 0;
    color: #333;
    font-size: 18px;
}

.content-panel p {
    margin: 0;
    color: #666;
    line-height: 1.5;
}

.info-panel {
    margin-top: 20px;
    padding: 16px;
    background: white;
    border-radius: 8px;
    border-left: 4px solid #28a745;
}

.info-panel h4 {
    margin: 0 0 12px 0;
    color: #333;
    font-size: 16px;
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
