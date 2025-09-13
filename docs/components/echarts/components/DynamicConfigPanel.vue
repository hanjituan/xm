<template>
    <div class="dynamic-config-panel">
        <!-- 区域选择头部 -->
        <div class="panel-header">
            <h3 v-if="selectedRegion">{{ selectedRegion.name }} 配置</h3>
            <div v-else class="no-selection">
                <p>点击图表区域开始编辑配置</p>
                <div class="tips">
                    <span>可点击的区域：</span>
                    <div class="region-tags">
                        <span class="region-tag">标题</span>
                        <span class="region-tag">图例</span>
                        <span class="region-tag">X轴</span>
                        <span class="region-tag">Y轴</span>
                        <span class="region-tag">数据区域</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 配置内容 -->
        <div v-if="selectedRegion" class="panel-content">
            <div class="config-form">
                <div v-for="property in selectedRegion.properties" :key="property.key" class="config-item">
                    <ConfigEditor
                        :property="property"
                        :value="getPropertyValue(property.key)"
                        @update="handlePropertyUpdate"
                    />
                </div>
            </div>

            <!-- 代码预览 -->
            <div class="code-preview">
                <div class="code-header">
                    <span>生成的配置代码</span>
                    <button @click="copyCode" class="copy-btn">复制代码</button>
                </div>
                <pre class="code-content"><code>{{ generatedCode }}</code></pre>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import type { EChartsOption } from "echarts";
import { getConfigByRegion, extractConfigValues, generateConfigCode } from "../utils/configExtractor";
import ConfigEditor from "./ConfigEditor.vue";

interface RegionInfo {
    type: string;
    name: string;
    index?: number;
    rect: { x: number; y: number; width: number; height: number };
}

interface Props {
    region: RegionInfo | null;
    chartOption: EChartsOption;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    configChange: [regionType: string, config: Record<string, any>];
}>();

// 当前配置值
const configValues = ref<Record<string, any>>({});

// 选中的区域配置结构
const selectedRegion = computed(() => {
    if (!props.region) return null;
    return getConfigByRegion(props.region.type);
});

// 生成的代码
const generatedCode = computed(() => {
    if (!props.region || !configValues.value || Object.keys(configValues.value).length === 0) {
        return "// 请修改配置项";
    }
    return generateConfigCode(props.region.type, configValues.value);
});

// 获取属性值
const getPropertyValue = (key: string) => {
    return configValues.value[key];
};

// 处理属性更新
const handlePropertyUpdate = (key: string, value: any) => {
    configValues.value = {
        ...configValues.value,
        [key]: value,
    };

    // 发送配置变更事件
    if (props.region) {
        emit("configChange", props.region.type, configValues.value);
    }
};

// 复制代码
const copyCode = async () => {
    try {
        await navigator.clipboard.writeText(generatedCode.value);
        console.log("代码已复制到剪贴板");
    } catch (err) {
        console.error("复制失败:", err);
    }
};

// 监听区域变化，更新配置值
watch(
    () => props.region,
    (newRegion) => {
        if (newRegion) {
            // 从当前图表配置中提取对应区域的值
            const currentValues = extractConfigValues(props.chartOption, newRegion.type);
            configValues.value = currentValues;
        } else {
            configValues.value = {};
        }
    },
    { immediate: true }
);

// 监听图表配置变化
watch(
    () => props.chartOption,
    (newOption) => {
        if (props.region) {
            const currentValues = extractConfigValues(newOption, props.region.type);
            configValues.value = { ...configValues.value, ...currentValues };
        }
    },
    { deep: true }
);
</script>

<style scoped>
.dynamic-config-panel {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fafafa;
    border-radius: 8px;
    overflow: hidden;
}

.panel-header {
    padding: 16px;
    background: white;
    border-bottom: 1px solid #e8e8e8;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
}

.panel-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #262626;
}

.no-selection {
    text-align: center;
    color: #8c8c8c;
}

.no-selection p {
    margin: 0 0 12px 0;
    font-size: 14px;
}

.tips {
    font-size: 12px;
    color: #bfbfbf;
}

.region-tags {
    margin-top: 8px;
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: center;
}

.region-tag {
    padding: 2px 8px;
    background: #f0f0f0;
    border-radius: 12px;
    font-size: 11px;
    color: #666;
}

.panel-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.config-form {
    flex: 1;
    padding: 16px;
    overflow-y: auto;
    background: white;
}

.config-item {
    margin-bottom: 16px;
}

.config-item:last-child {
    margin-bottom: 0;
}

.code-preview {
    border-top: 1px solid #e8e8e8;
    background: #f8f8f8;
    flex-shrink: 0;
    max-height: 200px;
    display: flex;
    flex-direction: column;
}

.code-header {
    padding: 8px 16px;
    background: #f0f0f0;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #666;
}

.copy-btn {
    padding: 4px 8px;
    font-size: 11px;
    background: #1890ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;
}

.copy-btn:hover {
    background: #40a9ff;
}

.code-content {
    flex: 1;
    margin: 0;
    padding: 12px 16px;
    background: #f8f8f8;
    font-family: "Courier New", monospace;
    font-size: 11px;
    line-height: 1.5;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-all;
}

.code-content code {
    color: #d63384;
}
</style>
