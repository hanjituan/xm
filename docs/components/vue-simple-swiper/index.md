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
<template>
  <div class="demo-container">
    <h3>基础轮播图</h3>
    <p>这是一个基础的轮播图示例，展示默认配置和基本功能。</p>

    <div class="swiper-wrapper">
      <SwiperSimple
        :img-list="basicImages"
        :auto-play="false"
        :keys-control="true"
        :infinite="false"
      />
    </div>

    <div class="info-panel">
      <h4>功能说明</h4>
      <ul>
        <li>🖱️ 点击左右按钮切换图片</li>
        <li>⌨️ 使用键盘左右箭头键控制</li>
        <li>🖼️ 点击底部缩略图跳转</li>
        <li>📱 支持触摸手势（移动端）</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SwiperSimple } from "vue3-xm";

// 基础示例图片
const basicImages = ref([
  "https://picsum.photos/id/1/400/600",
  "https://picsum.photos/id/10/400/600",
  "https://picsum.photos/id/100/400/600",
  "https://picsum.photos/id/1000/400/600",
  "https://picsum.photos/id/1001/400/600",
]);
</script>
```

:::

### 可配置显示选项演示

<Demo3 />

::: details 查看代码

```vue
<template>
  <div class="demo-container">
    <h3>可配置显示选项演示</h3>
    <p>展示分页器和导航按钮的显示/隐藏配置。</p>

    <div class="config-controls">
      <label>
        <input type="checkbox" v-model="showPagination" />
        显示分页器
      </label>
      <label>
        <input type="checkbox" v-model="showNavigation" />
        显示导航按钮
      </label>
    </div>

    <div class="swiper-wrapper">
      <SwiperSimple
        :img-list="configImages"
        :auto-play="true"
        :play-time="3"
        :infinite="true"
        :show-pagination="showPagination"
        :show-navigation="showNavigation"
        :keys-control="true"
      />
    </div>

    <div class="info-panel">
      <h4>当前配置</h4>
      <ul>
        <li>
          分页器显示:
          <span :class="showPagination ? 'enabled' : 'disabled'">{{
            showPagination ? "开启" : "关闭"
          }}</span>
        </li>
        <li>
          导航按钮显示:
          <span :class="showNavigation ? 'enabled' : 'disabled'">{{
            showNavigation ? "开启" : "关闭"
          }}</span>
        </li>
        <li>🎯 无论何种配置，键盘控制始终有效</li>
        <li>🔄 自动播放和无限循环保持开启</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SwiperSimple } from "vue3-xm";

// 配置状态
const showPagination = ref(true);
const showNavigation = ref(true);

// 配置示例图片
const configImages = ref([
  "https://picsum.photos/id/1018/400/600",
  "https://picsum.photos/id/1025/400/600",
  "https://picsum.photos/id/1039/400/600",
  "https://picsum.photos/id/1043/400/600",
  "https://picsum.photos/id/1051/400/600",
]);
</script>
```

:::

### 高级配置演示

<Demo2 />

::: details 查看代码

```vue
<template>
  <div class="demo-container">
    <h3>高级轮播图配置</h3>
    <p>这个示例展示了自动播放、无限循环、自定义按钮等高级功能。</p>

    <div class="controls">
      <button
        @click="toggleAutoPlay"
        :class="['control-btn', { active: isAutoPlay }]"
      >
        {{ isAutoPlay ? "⏸️ 暂停自动播放" : "▶️ 开始自动播放" }}
      </button>
      <button
        @click="toggleInfinite"
        :class="['control-btn', { active: isInfinite }]"
      >
        {{ isInfinite ? "🔄 关闭循环" : "🔄 开启循环" }}
      </button>
      <div class="speed-control">
        <label>播放速度:</label>
        <select v-model="playSpeed" @change="onSpeedChange">
          <option value="1">1秒</option>
          <option value="2">2秒</option>
          <option value="3">3秒</option>
          <option value="5">5秒</option>
        </select>
      </div>
    </div>

    <div class="swiper-wrapper">
      <SwiperSimple
        :img-list="advancedImages"
        :auto-play="isAutoPlay"
        :play-time="playSpeed"
        :infinite="isInfinite"
        :keys-control="true"
        ref="swiperRef"
      >
        <template #leftBtn>
          <button class="custom-btn custom-btn-left" @click="prevSlide">
            ⬅️ 上一张
          </button>
        </template>
        <template #rightBtn>
          <button class="custom-btn custom-btn-right" @click="nextSlide">
            下一张 ➡️
          </button>
        </template>
      </SwiperSimple>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { SwiperSimple } from "vue3-xm";

// 高级示例图片 - 更多图片
const advancedImages = ref([
  "https://picsum.photos/seed/demo2-1/400/600",
  "https://picsum.photos/seed/demo2-2/400/600",
  "https://picsum.photos/seed/demo2-3/400/600",
  "https://picsum.photos/seed/demo2-4/400/600",
  "https://picsum.photos/seed/demo2-5/400/600",
  "https://picsum.photos/seed/demo2-6/400/600",
  "https://picsum.photos/seed/demo2-7/400/600",
  "https://picsum.photos/seed/demo2-8/400/600",
]);

// 控制状态
const isAutoPlay = ref(true);
const isInfinite = ref(true);
const playSpeed = ref(3);
const swiperRef = ref(null);

// 切换自动播放
const toggleAutoPlay = () => {
  isAutoPlay.value = !isAutoPlay.value;
  nextTick(() => {
    if (swiperRef.value) {
      if (isAutoPlay.value) {
        swiperRef.value.play?.();
      } else {
        swiperRef.value.stop?.();
      }
    }
  });
};

// 切换无限循环
const toggleInfinite = () => {
  isInfinite.value = !isInfinite.value;
};

// 播放速度变化
const onSpeedChange = () => {
  if (isAutoPlay.value && swiperRef.value) {
    swiperRef.value.stop?.();
    setTimeout(() => {
      swiperRef.value.play?.();
    }, 100);
  }
};

// 手动切换到下一张
const nextSlide = () => {
  if (swiperRef.value) {
    swiperRef.value.nextPage?.();
  }
};

// 手动切换到上一张
const prevSlide = () => {
  if (swiperRef.value) {
    swiperRef.value.prevPage?.();
  }
};
</script>
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
