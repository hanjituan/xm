# Tabs

一个轻量级且易于使用的 Vue 3 标签页组件，支持动态切换、自定义插槽和动画效果。

## 特性

- 🚀 **轻量级** - 简洁高效的实现
- 🎨 **动画效果** - 平滑的滑动指示器动画
- 🖼️ **图标支持** - 支持标签图标显示
- 🔧 **自定义插槽** - 完全自定义标签内容
- 📱 **响应式** - 自适应不同屏幕尺寸
- 💫 **Vue 3** - 基于 Composition API 构建

## 安装

```bash
npm install vue3-xm
```

## 在线演示

### 基础演示

<script setup>
import Demo1 from './demo1.vue'
import Demo2 from './demo2.vue'
</script>

<Demo1 />

::: details 查看代码

```vue
<!--@include: ./demo1.vue-->
```

:::

### 高级配置演示

<Demo2 />

::: details 查看代码

```vue
<!--@include: ./demo2.vue-->
```

:::

## API

### Props

| 参数         | 类型        | 默认值   | 说明                         |
| ------------ | ----------- | -------- | ---------------------------- |
| `modelValue` | `string`    | `"line"` | **v-model** 当前选中的标签值 |
| `tabs`       | `TabItem[]` | `[]`     | 标签页数据数组               |

### TabItem 接口

```typescript
interface TabItem {
  value: string; // 标签的唯一值
  label: string; // 标签显示文本
  url?: string; // 可选的图标URL
}
```

### Events

| 事件名              | 参数              | 说明                     |
| ------------------- | ----------------- | ------------------------ |
| `update:modelValue` | `(value: string)` | 当前选中值发生变化时触发 |
| `change`            | `(value: string)` | 标签切换时触发           |

### Slots

| 插槽名    | 参数                               | 说明           |
| --------- | ---------------------------------- | -------------- |
| `default` | `{ item: TabItem, index: number }` | 自定义标签内容 |

## 基础用法

```vue
<template>
  <Tabs v-model="activeTab" :tabs="tabs" @change="onTabChange" />
</template>

<script setup>
import { ref } from "vue";
import { Tabs } from "vue3-xm";

const activeTab = ref("tab1");

const tabs = ref([
  {
    value: "tab1",
    label: "标签1",
    url: "https://example.com/icon1.png",
  },
  {
    value: "tab2",
    label: "标签2",
    url: "https://example.com/icon2.png",
  },
]);

const onTabChange = (value) => {
  console.log("切换到标签:", value);
};
</script>
```

## 自定义插槽

```vue
<template>
  <Tabs v-model="activeTab" :tabs="tabs">
    <template #default="{ item, index }">
      <div class="custom-tab">
        <span class="badge">{{ index + 1 }}</span>
        <div class="tab-info">
          <div class="title">{{ item.label }}</div>
          <div class="subtitle">标签页 {{ item.value }}</div>
        </div>
      </div>
    </template>
  </Tabs>
</template>
```

## 样式定制

组件提供了以下 CSS 类名供自定义样式：

```css
/* 主容器 */
.tabs-wraper {
  background: #f5f5f5;
  position: relative;
}

/* 标签项 */
.item-tab {
  height: 32px;
  margin: 10px;
  white-space: nowrap;
  color: #8d8d8d;
  position: relative;
  z-index: 2;
}

/* 激活状态 */
.item-tab.active {
  color: #161616;
}

/* 悬停状态 */
.item-tab:hover {
  color: #161616;
}
```

## 注意事项

1. **唯一值**: 确保每个标签的 `value` 是唯一的
2. **动画性能**: 滑动指示器使用 CSS transform 实现，性能优秀
3. **图标大小**: 建议图标尺寸为 16x16 像素
4. **响应式**: 组件会自动适应容器宽度

## 浏览器兼容性

- Chrome >= 60
- Firefox >= 60
- Safari >= 12
- Edge >= 79
