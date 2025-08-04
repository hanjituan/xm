# Clock Face 时钟表盘组件

Clock Face 是一个基于 Canvas 的时钟表盘组件，支持自定义扇形区域、刻度样式和中心文字。

## 基础用法

<script setup>
import Demo1 from './demo1.vue'
import Demo2 from './demo2.vue'
</script>

### 基础时钟

<Demo1 />

::: details 查看代码
<<< @/components/clock-face/demo1.vue
:::

### 高级配置

<Demo2 />

::: details 查看代码
<<< @/components/clock-face/demo2.vue
:::

## API

### Props

| 参数              | 说明                       | 类型   | 可选值 | 默认值        |
| ----------------- | -------------------------- | ------ | ------ | ------------- |
| size              | 时钟大小                   | number | -      | 300           |
| centerText        | 中心文字                   | string | -      | ''            |
| centerTextStyle   | 中心文字样式               | object | -      | 见下方说明    |
| sectors           | 扇形区域数组               | array  | -      | 见下方说明    |
| startPos          | 默认扇形内圈位置（百分比） | number | 0-100  | 70            |
| endPos            | 默认扇形外圈位置（百分比） | number | 0-100  | 10            |
| borderColor       | 边框颜色                   | string | -      | '#333'        |
| borderWidth       | 边框宽度                   | number | -      | 4             |
| backgroundColor   | 背景颜色                   | string | -      | 'transparent' |
| minorTickColor    | 小刻度颜色                 | string | -      | '#666'        |
| minorTickWidth    | 小刻度宽度                 | number | -      | 2             |
| minorTickLen      | 小刻度长度                 | number | -      | 10            |
| minorTickDistance | 小刻度距离边框距离         | number | -      | 0             |
| majorTickColor    | 大刻度颜色                 | string | -      | '#333'        |
| majorTickWidth    | 大刻度宽度                 | number | -      | 4             |
| majorTickLen      | 大刻度长度                 | number | -      | 20            |
| majorTickDistance | 大刻度距离边框距离         | number | -      | 0             |

### centerTextStyle 默认值

```js
{
  fontSize: 16,
  fontFamily: 'Arial, sans-serif',
  color: '#333',
  fontWeight: 'normal',
  textAlign: 'center',
  textBaseline: 'middle'
}
```

### sectors 数组项结构

| 参数     | 说明                   | 类型   | 是否必需 |
| -------- | ---------------------- | ------ | -------- |
| from     | 开始时间               | object | 是       |
| to       | 结束时间               | object | 是       |
| color    | 扇形颜色               | string | 否       |
| startPos | 扇形内圈位置（百分比） | number | 否       |
| endPos   | 扇形外圈位置（百分比） | number | 否       |

#### 时间对象结构

```js
{
  h: 1,  // 小时 (0-11)
  m: 0,  // 分钟 (0-59)
  s: 0   // 秒钟 (0-59)
}
```

### Events

| 事件名       | 说明                     | 回调参数                                      |
| ------------ | ------------------------ | --------------------------------------------- |
| sector-hover | 鼠标悬停在扇形区域时触发 | `{ index: number, sector: object }` 或 `null` |

## 使用示例

### 安装

```bash
npm install vue3-xm
```

### 导入

```js
import { ClockFace } from "vue3-xm";
```

### 基本使用

```vue
<template>
  <ClockFace
    :size="400"
    center-text="12:00"
    :sectors="sectors"
    @sector-hover="handleSectorHover"
  />
</template>

<script setup>
import { ClockFace } from "vue3-xm";

const sectors = [
  {
    from: { h: 9, m: 0, s: 0 },
    to: { h: 12, m: 0, s: 0 },
    color: "rgba(255, 99, 132, 0.3)",
  },
  {
    from: { h: 12, m: 0, s: 0 },
    to: { h: 15, m: 0, s: 0 },
    color: "rgba(54, 162, 235, 0.3)",
  },
];

const handleSectorHover = (data) => {
  console.log("悬停的扇形:", data);
};
</script>
```
