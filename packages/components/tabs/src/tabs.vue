<template>
    <ul class="tabs-wraper flex flex-wrap p-1 rounded">
        <li
            v-for="(item, index) in tabs"
            :data-ref="`tab_${item.value}`"
            :key="`${item.value}${index}`"
            :class="{ active: item.value == activeTab }"
            class="item-tab px-4 py-2 cursor-pointer flex items-center justify-center rounded"
            @click="selectTab(item)"
        >
            <slot :item="item" :index="index">
                <img v-if="item.url" class="w-4 mr-1" :src="item.url" alt="" />
                <span>{{ item.label }}</span>
            </slot>
        </li>

        <li :style="activeTabStyle"></li>
    </ul>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch, nextTick } from "vue";

defineOptions({
    name: "Tabs",
});

export interface TabItem {
    value: string;
    label: string;
    url?: string;
}

export interface TabsProps {
    /**
     * 选项卡数据数组
     */
    tabs?: TabItem[];
    /**
     * 当前选中的值 (v-model)
     */
    modelValue?: string;
}

const props = withDefaults(defineProps<TabsProps>(), {
    tabs: () => [
        {
            value: "line",
            label: "折线",
            url: "https://imagecdn.ymm56.com/ymmfile/static/resource/aecd539e-515f-41e8-b126-7ac38102cafd.webp",
        },
        {
            value: "table",
            label: "表格视图",
            url: "https://imagecdn.ymm56.com/ymmfile/static/resource/13428291-7a45-4430-8fa9-70f8d0dea937.webp",
        },
        {
            value: "sl",
            label: "罗罗诺亚·索隆",
        },
        {
            value: "zfz",
            label: "King·尊",
        },
        {
            value: "lf",
            label: "蒙奇·D·路飞",
        },
        {
            value: "one",
            label: "one",
        },
        {
            value: "two",
            label: "two",
        },
        {
            value: "three",
            label: "three",
        },
        {
            value: "gogogo",
            label: "gogogo",
        },
    ],
    modelValue: "line",
});

const emit = defineEmits<{
    "update:modelValue": [value: string];
    change: [value: string];
}>();

const activeTab = ref<string>(props.modelValue || "");

// 添加一个响应式标志来强制重新计算样式
const forceUpdate = ref(0);

const activeTabStyle = computed(() => {
    // 通过 forceUpdate 来触发重新计算
    forceUpdate.value;

    // 容器宽/高/位置发生变化时更新activeTabStyle
    const { width = 0, height = 0, top = 0, left = 0 } = getActiveTabStyle() || {};

    return {
        position: "absolute" as const,
        top: "0px",
        left: "0px",
        width: width + "px",
        height: height + "px",
        overflow: "hidden" as const,
        background: "#fff",
        transition: "all ease 0.2s",
        transform: `translate(${left}px, ${top}px)`,
        zIndex: 1,
    };
});

watch(
    () => props.modelValue,
    (val) => {
        if (val) {
            activeTab.value = val;
        }
    },
    { immediate: true }
);

const selectTab = (item: TabItem) => {
    activeTab.value = item.value;
    emit("update:modelValue", item.value);
    emit("change", item.value);
    // 强制更新样式
    nextTick(() => {
        forceUpdate.value++;
    });
};

const getActiveTabStyle = () => {
    if (!activeTab.value && activeTab.value !== "0") return;

    // 检查是否在浏览器环境中
    if (typeof document === "undefined") return;

    // 获取当前激活的 tab 元素
    const currentItem = document.querySelector(`[data-ref="tab_${activeTab.value}"]`) as HTMLElement;
    if (!currentItem) return;

    // 获取 tabs 容器元素
    const tabsContainer = currentItem.closest(".tabs-wraper") as HTMLElement;
    if (!tabsContainer) return;

    // 获取当前 tab 相对于容器的位置
    const itemRect = currentItem.getBoundingClientRect();
    const containerRect = tabsContainer.getBoundingClientRect();

    return {
        width: itemRect.width,
        height: itemRect.height,
        top: itemRect.top - containerRect.top,
        left: itemRect.left - containerRect.left,
    };
};

onMounted(() => {
    if (props.modelValue) {
        activeTab.value = props.modelValue;
    }
    // 在下一个 tick 强制更新样式计算
    nextTick(() => {
        forceUpdate.value++;
    });
});
</script>

<style scoped>
ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.tabs-wraper {
    background: #f5f5f5;
    position: relative;
    border: 1px solid red;
}

.item-tab {
    height: 32px;
    margin: 10px;
    white-space: nowrap;
    color: #8d8d8d;
    position: relative;
    z-index: 2;
}

.item-tab:hover {
    color: #161616;
}

.active {
    color: #161616;
}

.flex {
    display: flex;
}

.flex-wrap {
    flex-wrap: wrap;
}

.p-1 {
    padding: 0.5rem;
}

.rounded {
    border-radius: 0.25rem;
}

.px-4 {
    padding: 0 1rem;
}

.py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}

.cursor-pointer {
    cursor: pointer;
}

.items-center {
    align-items: center;
}

.justify-center {
    justify-content: center;
}

.w-4 {
    width: 1rem;
}

.mr-1 {
    margin-right: 0.25rem;
}
</style>
