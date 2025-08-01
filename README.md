# XM Components

Modern Vue 3 Component Library

## Features

- 🎯 **Drag Chart** - Interactive time range selection with ECharts integration
- 🚀 **Vue Simple Swiper** - Ultra-lightweight swiper component with touch gestures
- 📦 **TypeScript** - Full TypeScript support with complete type definitions
- ⚡ **Performance** - Optimized and tree-shakable
- 🎨 **Customizable** - Flexible theming system
- 📱 **Mobile Friendly** - Responsive design and touch interactions

## Installation

```bash
npm install @xm/components
# or
yarn add @xm/components
# or
pnpm add @xm/components
```

## Usage

### Global Registration

```typescript
import { createApp } from "vue";
import XMComponents from "@xm/components";
import "@xm/components/style.css";

const app = createApp(App);
app.use(XMComponents);
app.mount("#app");
```

### Individual Import

```vue
<script setup>
import { DragChart, SwiperSimple } from "@xm/components";
</script>

<template>
  <DragChart />
  <SwiperSimple />
</template>
```

## Components

### Drag Chart

Interactive time range selection chart component.

```vue
<template>
  <DragChart
    :time-range="timeRange"
    :active-time="activeTime"
    @update:activeTime="handleUpdate"
  />
</template>
```

### Vue Simple Swiper

Lightweight swiper component.

```vue
<template>
  <SwiperSimple :img-list="images" :auto-play="true" :infinite="true" />
</template>
```

## Documentation

Visit our [documentation site](https://your-username.github.io/xm-components) for detailed guides and examples.

## License

MIT License
