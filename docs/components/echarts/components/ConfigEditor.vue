<template>
    <div class="config-editor">
        <label class="editor-label">
            <span class="label-text">{{ property.description || property.key }}</span>
            <span v-if="property.defaultValue !== undefined" class="default-value">
                默认: {{ property.defaultValue }}
            </span>
        </label>

        <!-- 布尔值编辑器 -->
        <div v-if="property.type === 'boolean'" class="editor-content">
            <label class="switch">
                <input type="checkbox" :checked="Boolean(modelValue)" @change="handleBooleanChange" />
                <span class="slider"></span>
            </label>
        </div>

        <!-- 字符串编辑器 -->
        <div v-else-if="property.type === 'string'" class="editor-content">
            <input
                type="text"
                class="text-input"
                :value="modelValue || ''"
                :placeholder="property.defaultValue?.toString() || ''"
                @input="handleStringChange"
            />
        </div>

        <!-- 数字编辑器 -->
        <div v-else-if="property.type === 'number'" class="editor-content">
            <input
                type="number"
                class="number-input"
                :value="modelValue || ''"
                :placeholder="property.defaultValue?.toString() || ''"
                @input="handleNumberChange"
            />
        </div>

        <!-- 颜色编辑器 -->
        <div v-else-if="property.type === 'color'" class="editor-content">
            <div class="color-editor">
                <input
                    type="color"
                    class="color-picker"
                    :value="modelValue || property.defaultValue || '#000000'"
                    @input="handleColorChange"
                />
                <input
                    type="text"
                    class="color-text"
                    :value="modelValue || ''"
                    :placeholder="property.defaultValue?.toString() || '#000000'"
                    @input="handleColorTextChange"
                />
            </div>
        </div>

        <!-- 枚举编择器 -->
        <div v-else-if="property.type === 'enum'" class="editor-content">
            <select class="select-input" :value="modelValue || property.defaultValue" @change="handleEnumChange">
                <option v-for="option in property.options" :key="option" :value="option">
                    {{ option }}
                </option>
            </select>
        </div>

        <!-- 对象编辑器 -->
        <div v-else-if="property.type === 'object' && property.children" class="editor-content">
            <div class="object-editor">
                <div class="object-toggle" @click="toggleExpanded">
                    <span :class="['toggle-icon', { expanded: isExpanded }]">▶</span>
                    <span>{{ property.key }}</span>
                </div>
                <div v-if="isExpanded" class="object-children">
                    <ConfigEditor
                        v-for="child in property.children"
                        :key="child.key"
                        :property="child"
                        :value="getChildValue(child.key)"
                        @update="handleChildUpdate"
                    />
                </div>
            </div>
        </div>

        <!-- 数组编辑器 -->
        <div v-else-if="property.type === 'array'" class="editor-content">
            <div class="array-editor">
                <textarea
                    class="array-textarea"
                    :value="arrayDisplayValue"
                    :placeholder="'请输入JSON格式的数组，如：[1, 2, 3]'"
                    @input="handleArrayChange"
                />
            </div>
        </div>

        <!-- 未知类型 -->
        <div v-else class="editor-content">
            <input
                type="text"
                class="text-input"
                :value="typeof modelValue === 'string' ? modelValue : JSON.stringify(modelValue || '')"
                :placeholder="'输入 ' + property.type + ' 类型的值'"
                @input="handleGenericChange"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import type { ConfigProperty } from "../utils/configExtractor";

interface Props {
    property: ConfigProperty;
    value?: any;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    update: [key: string, value: any];
}>();

const isExpanded = ref(false);

const modelValue = computed(() => props.value);

// 数组显示值
const arrayDisplayValue = computed(() => {
    if (Array.isArray(modelValue.value)) {
        return JSON.stringify(modelValue.value, null, 2);
    }
    return "";
});

// 切换对象展开状态
const toggleExpanded = () => {
    isExpanded.value = !isExpanded.value;
};

// 获取子属性值
const getChildValue = (key: string) => {
    if (typeof modelValue.value === "object" && modelValue.value !== null) {
        return modelValue.value[key];
    }
    return undefined;
};

// 处理子属性更新
const handleChildUpdate = (key: string, value: any) => {
    const currentValue =
        typeof modelValue.value === "object" && modelValue.value !== null ? { ...modelValue.value } : {};

    currentValue[key] = value;
    emit("update", props.property.key, currentValue);
};

// 处理布尔值变化
const handleBooleanChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit("update", props.property.key, target.checked);
};

// 处理字符串变化
const handleStringChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit("update", props.property.key, target.value);
};

// 处理数字变化
const handleNumberChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = target.value === "" ? undefined : Number(target.value);
    emit("update", props.property.key, value);
};

// 处理颜色变化
const handleColorChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit("update", props.property.key, target.value);
};

// 处理颜色文本变化
const handleColorTextChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit("update", props.property.key, target.value);
};

// 处理枚举变化
const handleEnumChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    emit("update", props.property.key, target.value);
};

// 处理数组变化
const handleArrayChange = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    try {
        const value = JSON.parse(target.value);
        if (Array.isArray(value)) {
            emit("update", props.property.key, value);
        }
    } catch (error) {
        // 忽略解析错误
    }
};

// 处理通用变化
const handleGenericChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    let value: any = target.value;

    // 尝试解析为JSON
    try {
        value = JSON.parse(target.value);
    } catch {
        // 保持字符串类型
    }

    emit("update", props.property.key, value);
};
</script>

<style scoped>
.config-editor {
    margin-bottom: 12px;
}

.editor-label {
    display: block;
    margin-bottom: 6px;
    font-size: 12px;
    color: #595959;
    font-weight: 500;
}

.label-text {
    display: block;
}

.default-value {
    font-size: 11px;
    color: #8c8c8c;
    font-weight: normal;
    margin-top: 2px;
    display: block;
}

.editor-content {
    width: 100%;
}

/* 布尔值开关 */
.switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.3s;
    border-radius: 20px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
}

input:checked + .slider {
    background-color: #1890ff;
}

input:checked + .slider:before {
    transform: translateX(20px);
}

/* 输入框样式 */
.text-input,
.number-input,
.select-input {
    width: 100%;
    padding: 6px 8px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    font-size: 12px;
    transition: border-color 0.3s;
}

.text-input:focus,
.number-input:focus,
.select-input:focus {
    border-color: #1890ff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

/* 颜色编辑器 */
.color-editor {
    display: flex;
    gap: 8px;
    align-items: center;
}

.color-picker {
    width: 32px;
    height: 32px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    cursor: pointer;
    padding: 0;
}

.color-text {
    flex: 1;
    padding: 6px 8px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    font-size: 12px;
}

/* 对象编辑器 */
.object-editor {
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    overflow: hidden;
}

.object-toggle {
    padding: 8px 12px;
    background: #f8f8f8;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 500;
    transition: background 0.3s;
}

.object-toggle:hover {
    background: #f0f0f0;
}

.toggle-icon {
    transition: transform 0.3s;
    font-size: 10px;
    color: #8c8c8c;
}

.toggle-icon.expanded {
    transform: rotate(90deg);
}

.object-children {
    padding: 12px;
    background: white;
    border-top: 1px solid #e8e8e8;
}

/* 数组编辑器 */
.array-textarea {
    width: 100%;
    min-height: 60px;
    padding: 6px 8px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    font-size: 11px;
    font-family: "Courier New", monospace;
    resize: vertical;
}

.array-textarea:focus {
    border-color: #1890ff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}
</style>
