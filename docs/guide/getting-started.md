# Getting Started

Welcome to XM Components! This guide will help you get started with our Vue 3 component library.

## Installation

::: code-group

```bash [npm]
npm install @xm/components
```

```bash [yarn]
yarn add @xm/components
```

```bash [pnpm]
pnpm add @xm/components
```

:::

## Quick Setup

### 1. Import Components

You can import components individually for better tree-shaking:

```typescript
// Import specific components
import { DragChart } from "@xm/components";

// Or import all components
import XMComponents from "@xm/components";
import "@xm/components/style.css";
```

### 2. Register Components

#### Global Registration

```typescript
// main.ts
import { createApp } from "vue";
import XMComponents from "@xm/components";
import "@xm/components/style.css";

const app = createApp(App);
app.use(XMComponents);
app.mount("#app");
```

#### Local Registration

```vue
<script setup>
import { DragChart } from "@xm/components";
</script>

<template>
  <DragChart />
</template>
```

## Usage Example

Here's a quick example using the Drag Chart component:

```vue
<template>
  <div class="demo">
    <DragChart
      :time-range="timeRange"
      :active-time="activeTime"
      :value-data="chartData"
      @update:activeTime="handleTimeUpdate"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { DragChart } from "@xm/components";
import dayjs from "dayjs";

const timeRange = ref([dayjs().subtract(7, "day"), dayjs()]);

const activeTime = ref([0, 12]);

const chartData = ref([10, 20, 30, 25, 15, 35, 40, 30, 20, 25, 30, 35]);

function handleTimeUpdate(newTime) {
  activeTime.value = newTime;
  console.log("Active time updated:", newTime);
}
</script>

<style scoped>
.demo {
  height: 400px;
  width: 100%;
}
</style>
```

## TypeScript Support

XM Components is built with TypeScript and provides full type definitions:

```typescript
import type { DragChartProps } from "@xm/components";

interface MyComponentProps {
  chartConfig: DragChartProps;
}
```

## Next Steps

- 📖 [Browse Components](/components/) - Explore all available components
- 🎯 [Drag Chart Guide](/components/drag-chart/) - Learn about the drag chart component
- 🚀 [Vue Simple Swiper](/components/vue-simple-swiper/) - Learn about the swiper component

## Need Help?

- 📝 [Documentation](/components/)
- 🎨 [Design Gallery](https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2025&q=80)
- � [Tech Inspiration](https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)
