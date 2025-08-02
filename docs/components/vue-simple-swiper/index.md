# Vue Simple Swiper

一个轻量级且易于使用的 Vue 3 轮播图组件，支持触摸手势、键盘控制和自动播放功能。

## 特性

- 🚀 **轻量级** - 简洁高效的实现
- 📱 **键盘控制** - 支持左右箭头键导航
- 🎯 **自动播放** - 可配置的自动轮播功能
- 🔄 **无限循环** - 支持无限滚动模式
- 🖼️ **缩略图导航** - 底部缩略图预览和跳转
- 🎨 **自定义按钮** - 支持自定义左右导航按钮
- 📦 **TypeScript** - 完整的类型支持

## 安装

```bash
npm install vue3-xm
```

## 在线演示

### 基础演示

<script setup>
import Demo1 from './demo1.vue'
import Demo2 from './demo2.vue'
import Demo3 from './demo3.vue'
</script>

<Demo1 />

::: details 查看代码

```vue
<!--@include: ./demo1.vue-->
```

:::

### 可配置显示选项演示

<Demo3 />

::: details 查看代码

```vue
<!--@include: ./demo3.vue-->
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

| 参数             | 类型               | 默认值  | 说明                                         |
| ---------------- | ------------------ | ------- | -------------------------------------------- |
| `imgList`        | `Array<string>`    | `[]`    | **必需** 图片地址数组                        |
| `autoPlay`       | `boolean`          | `false` | 是否开启自动播放                             |
| `playTime`       | `number \| string` | `2`     | 自动播放间隔时间（秒）                       |
| `keysControl`    | `boolean`          | `true`  | 是否启用键盘控制（左右箭头键）               |
| `infinite`       | `boolean`          | `false` | 是否支持无限循环滚动                         |
| `hoverPause`     | `boolean`          | `true`  | 鼠标悬浮时是否暂停自动播放（需开启自动播放） |
| `showPagination` | `boolean`          | `true`  | 是否显示底部分页器（缩略图导航）             |
| `showNavigation` | `boolean`          | `true`  | 是否显示左右导航按钮                         |

### Slots

| 插槽名     | 说明               |
| ---------- | ------------------ |
| `leftBtn`  | 自定义左侧导航按钮 |
| `rightBtn` | 自定义右侧导航按钮 |

### 方法

| 方法名               | 说明                 | 参数            | 返回值 |
| -------------------- | -------------------- | --------------- | ------ |
| `nextPage()`         | 切换到下一张图片     | -               | -      |
| `prevPage()`         | 切换到上一张图片     | -               | -      |
| `jumpByIndex(index)` | 跳转到指定索引的图片 | `index: number` | -      |
| `play()`             | 开始自动播放         | -               | -      |
| `stop()`             | 停止自动播放         | -               | -      |
