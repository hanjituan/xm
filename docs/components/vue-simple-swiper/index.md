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

## 在线演示

### 基础演示

<script setup>
import Demo1 from './demo1.vue'
import Demo2 from './demo2.vue'
</script>

<Demo1 />

### 高级配置演示

<Demo2 />

## 安装

```bash
npm install vue3-xm
```

## 基础用法

```vue
<template>
  <swiper-simple :img-list="images" :auto-play="true" :play-time="3" />
</template>

<script setup>
import { SwiperSimple } from "vue3-xm";
import "vue3-xm/style.css";

const images = [
  "https://example.com/image1.jpg",
  "https://example.com/image2.jpg",
  "https://example.com/image3.jpg",
];
</script>
```

## 自定义按钮

```vue
<template>
  <swiper-simple :img-list="images">
    <template #leftBtn>
      <button class="custom-btn">⬅️</button>
    </template>
    <template #rightBtn>
      <button class="custom-btn">➡️</button>
    </template>
  </swiper-simple>
</template>

<style>
.custom-btn {
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
}
</style>
```

## API

### Props

| 参数          | 类型               | 默认值  | 说明                           |
| ------------- | ------------------ | ------- | ------------------------------ |
| `imgList`     | `Array<string>`    | `[]`    | **必需** 图片地址数组          |
| `autoPlay`    | `boolean`          | `false` | 是否开启自动播放               |
| `playTime`    | `number \| string` | `2`     | 自动播放间隔时间（秒）         |
| `keysControl` | `boolean`          | `true`  | 是否启用键盘控制（左右箭头键） |
| `infinite`    | `boolean`          | `false` | 是否支持无限循环滚动           |

### Slots

| 插槽名     | 说明               |
| ---------- | ------------------ |
| `leftBtn`  | 自定义左侧导航按钮 |
| `rightBtn` | 自定义右侧导航按钮 |

### 方法

| 方法名               | 说明                 | 参数            |
| -------------------- | -------------------- | --------------- |
| `nextPage()`         | 切换到下一张图片     | -               |
| `prevPage()`         | 切换到上一张图片     | -               |
| `jumpByIndex(index)` | 跳转到指定索引的图片 | `index: number` |
| `play()`             | 开始自动播放         | -               |
| `stop()`             | 停止自动播放         | -               |

## 示例

### 完整配置示例

```vue
<template>
  <div>
    <h3>自动播放轮播图</h3>
    <swiper-simple
      :img-list="autoPlayImages"
      :auto-play="true"
      :play-time="2.5"
      :infinite="true"
      :keys-control="true"
    />

    <h3>手动控制轮播图</h3>
    <swiper-simple
      :img-list="manualImages"
      :auto-play="false"
      :keys-control="true"
    >
      <template #leftBtn>
        <button class="custom-prev">上一张</button>
      </template>
      <template #rightBtn>
        <button class="custom-next">下一张</button>
      </template>
    </swiper-simple>
  </div>
</template>

<script setup>
import { SwiperSimple } from "vue3-xm";

const autoPlayImages = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600",
  "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&h=600",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=600",
];

const manualImages = [
  "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=600",
  "https://images.unsplash.com/photo-1520637836862-4d197d17c0a9?w=400&h=600",
  "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=600",
];
</script>

<style>
.custom-prev,
.custom-next {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.custom-prev:hover,
.custom-next:hover {
  background: rgba(0, 0, 0, 0.9);
}
</style>
```

## 键盘操作

当 `keysControl` 为 `true` 时，支持以下键盘操作：

- **← 左箭头键**: 切换到上一张图片
- **→ 右箭头键**: 切换到下一张图片

## 样式定制

组件提供了以下 CSS 类名供自定义样式：

```css
/* 主容器 */
.swiper-wrapper {
  width: 400px;
  height: 600px;
}

/* 图片容器 */
.swiper-container {
  transition: all ease 0.3s;
}

/* 单个图片项 */
.swiper-item {
  width: 400px;
  height: 600px;
}

/* 缩略图导航 */
.pagenation {
  height: 100px;
  box-shadow: 3px 3px 10px #ddd;
}

/* 缩略图 */
.pagenation img {
  filter: grayscale(1);
  transition: all ease 0.3s;
}

.pagenation img.active {
  filter: grayscale(0);
}

/* 导航按钮 */
.btn-left,
.btn-right {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 36px;
  height: 36px;
}
```

## 注意事项

1. **图片尺寸**: 组件默认尺寸为 400x600px，建议使用相同比例的图片
2. **性能优化**: 当图片数量较多时，建议开启 `infinite` 模式以获得更好的用户体验
3. **键盘控制**: 确保组件在页面中获得焦点才能响应键盘事件
4. **自动播放**: 当用户手动操作后，自动播放会继续进行

## 浏览器兼容性

- Chrome >= 60
- Firefox >= 60
- Safari >= 12
- Edge >= 79
