<template>
    <div class="config-section">
        <h4>配置选项</h4>

        <!-- 预设配置选择const props = defineProps({
    chartType: String,
    chartTitle: String,
    selectedTheme: String,
    chartData: Array,
    currentConfigId: String,
    availableConfigs: Array,
});

const emit = defineEmits([
    "update:chartType",
    "update:chartTitle",
    "update:selectedTheme",
    "updateChartType",
    "updateTitle",
    "updateData",
    "addDataItem",
    "removeDataItem",
    "loadPreset",
    "updateDataItem",
    "selectConfig"
]);lass="config-group">
            <label>预设配置：</label>
            <div class="preset-config-grid">
                <div 
                    v-for="config in availableConfigs" 
                    :key="config.id"
                    :class="['config-card', { active: currentConfigId === config.id }]"
                    @click="selectConfig(config.id)"
                >
                    <div class="config-type-badge">{{ config.type }}</div>
                    <div class="config-name">{{ config.name }}</div>
                    <div class="config-desc">{{ config.description }}</div>
                </div>
            </div>
        </div>

        <!-- 图表类型选择 -->
        <div class="config-group">
            <label>图表类型：</label>
            <select :value="chartType" @change="handleChartTypeChange">
                <option value="bar">柱状图</option>
                <option value="line">折线图</option>
                <option value="pie">饼图</option>
                <option value="scatter">散点图</option>
            </select>
        </div>

        <!-- 标题配置 -->
        <div class="config-group">
            <label>图表标题：</label>
            <input :value="chartTitle" @input="handleTitleChange" type="text" placeholder="请输入图表标题" />
        </div>

        <!-- 数据配置 -->
        <div class="config-group">
            <label>数据系列：</label>
            <div class="data-inputs">
                <div v-for="(item, index) in chartData" :key="index" class="data-item">
                    <input
                        :value="item.name"
                        @input="(e) => handleDataNameChange(index, e.target.value)"
                        type="text"
                        placeholder="名称"
                        class="data-name"
                    />
                    <input
                        :value="item.value"
                        @input="(e) => handleDataValueChange(index, e.target.value)"
                        type="number"
                        placeholder="数值"
                        class="data-value"
                    />
                    <button @click="removeDataItem(index)" class="btn-remove">×</button>
                </div>
                <button @click="addDataItem" class="btn-add">+ 添加数据</button>
            </div>
        </div>

        <!-- 主题选择 -->
        <div class="config-group">
            <label>图表主题：</label>
            <select :value="selectedTheme" @change="handleThemeChange">
                <option value="default">默认</option>
                <option value="dark">暗色</option>
                <option value="light">亮色</option>
            </select>
        </div>

        <!-- 快速预设 -->
        <div class="config-group">
            <label>快速预设：</label>
            <div class="preset-buttons">
                <button @click="loadPreset('sales')" class="btn-preset">销售数据</button>
                <button @click="loadPreset('usage')" class="btn-preset">使用情况</button>
                <button @click="loadPreset('performance')" class="btn-preset">性能指标</button>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    chartType: String,
    chartTitle: String,
    selectedTheme: String,
    chartData: Array,
});

const emit = defineEmits([
    "update:chartType",
    "update:chartTitle",
    "update:selectedTheme",
    "updateChartType",
    "updateTitle",
    "updateData",
    "addDataItem",
    "removeDataItem",
    "loadPreset",
    "updateDataItem",
]);

// 事件处理方法
const handleChartTypeChange = (event) => {
    emit("update:chartType", event.target.value);
    emit("updateChartType");
};

const handleTitleChange = (event) => {
    emit("update:chartTitle", event.target.value);
    emit("updateTitle");
};

const handleThemeChange = (event) => {
    emit("update:selectedTheme", event.target.value);
};

const handleDataNameChange = (index, value) => {
    emit("updateDataItem", { index, field: "name", value });
    emit("updateData");
};

const handleDataValueChange = (index, value) => {
    emit("updateDataItem", { index, field: "value", value: Number(value) });
    emit("updateData");
};

const addDataItem = () => {
    emit("addDataItem");
};

const removeDataItem = (index) => {
    emit("removeDataItem", index);
};

const loadPreset = (type) => {
    emit("loadPreset", type);
};

const selectConfig = (configId) => {
    emit("selectConfig", configId);
};
</script>

<style scoped>
.config-section {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    border: 1px solid #e1e4e8;
    height: fit-content;
    max-height: 600px;
    overflow-y: auto;
}

.config-section h4 {
    margin-top: 0;
    color: #333;
    font-size: 16px;
    margin-bottom: 20px;
    border-bottom: 2px solid #0366d6;
    padding-bottom: 8px;
}

.config-group {
    margin-bottom: 20px;
}

.config-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #24292e;
    font-size: 14px;
}

.config-group input,
.config-group select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #d1d5da;
    border-radius: 4px;
    font-size: 14px;
    background: white;
}

.config-group input:focus,
.config-group select:focus {
    outline: none;
    border-color: #0366d6;
    box-shadow: 0 0 0 3px rgba(3, 102, 214, 0.1);
}

.data-inputs {
    border: 1px solid #e1e4e8;
    border-radius: 4px;
    padding: 12px;
    background: white;
}

.data-item {
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
    align-items: center;
}

.data-name {
    flex: 2;
}

.data-value {
    flex: 1;
}

.btn-remove {
    width: 30px;
    height: 30px;
    border: none;
    background: #dc3545;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-remove:hover {
    background: #c82333;
}

.btn-add {
    width: 100%;
    padding: 8px;
    border: 1px dashed #0366d6;
    background: transparent;
    color: #0366d6;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

.btn-add:hover {
    background: #f1f8ff;
}

.preset-buttons {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.btn-preset {
    padding: 8px 12px;
    border: 1px solid #0366d6;
    background: white;
    color: #0366d6;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
    transition: all 0.2s;
}

.btn-preset:hover {
    background: #0366d6;
    color: white;
}

/* 预设配置网格 */
.preset-config-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid #e1e4e8;
    border-radius: 4px;
    padding: 8px;
    background: white;
}

.config-card {
    padding: 12px;
    border: 2px solid #e1e4e8;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    background: white;
    position: relative;
}

.config-card:hover {
    border-color: #0366d6;
    box-shadow: 0 2px 4px rgba(3, 102, 214, 0.1);
}

.config-card.active {
    border-color: #0366d6;
    background: #f1f8ff;
    box-shadow: 0 0 0 2px rgba(3, 102, 214, 0.1);
}

.config-type-badge {
    position: absolute;
    top: 8px;
    right: 8px;
    background: #0366d6;
    color: white;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 10px;
    text-transform: uppercase;
    font-weight: bold;
}

.config-name {
    font-weight: 600;
    color: #24292e;
    margin-bottom: 4px;
    font-size: 13px;
}

.config-desc {
    font-size: 11px;
    color: #586069;
    line-height: 1.3;
}

@media (max-width: 768px) {
    .data-item {
        flex-direction: column;
        gap: 8px;
    }

    .data-name,
    .data-value {
        flex: none;
        width: 100%;
    }
}
</style>
