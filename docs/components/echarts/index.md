# ECharts 图表组件

基于 ECharts 5.x 的 Vue 3 图表组件，提供了简洁的 API 和丰富的图表类型支持。

## 安装

确保你的项目中已安装 ECharts：

```bash
npm install echarts
# 或
pnpm add echarts
```

## 特性

- 🎨 **丰富的图表类型** - 支持柱状图、折线图、饼图、散点图等多种图表类型
- 📱 **响应式设计** - 自动适配不同屏幕尺寸，使用 ResizeObserver 精确监听尺寸变化
- 🎯 **TypeScript 支持** - 完整的类型定义
- 🔧 **简单易用** - 简洁的 API 设计
- ⚡ **高性能** - 基于 ECharts 5.x 的高性能渲染，防抖优化
- 🎨 **主题定制** - 支持自定义主题

## 在线演示

<script setup>
import Demo1 from './demo1.vue'
</script>

<Demo1 />

## API

### Props

| 参数   | 说明             | 类型            | 默认值      |
| ------ | ---------------- | --------------- | ----------- |
| option | ECharts 配置对象 | `EChartsOption` | -           |
| width  | 图表宽度         | `string`        | `'100%'`    |
| height | 图表高度         | `string`        | `'400px'`   |
| theme  | 图表主题         | `string`        | `'default'` |

### Expose

| 方法名           | 说明              | 类型                            |
| ---------------- | ----------------- | ------------------------------- |
| getChartInstance | 获取 ECharts 实例 | `() => echarts.ECharts \| null` |
| resize           | 手动触发图表重绘  | `() => void`                    |

## 高级特性

### 自动响应式

组件内置了 **ResizeObserver** 来监听容器尺寸变化，相比传统的 window resize 事件：

- ✅ 更精确的尺寸监听
- ✅ 支持容器内部布局变化
- ✅ 防抖优化，避免频繁重绘
- ✅ 自动内存清理

### 性能优化

- **防抖机制**: 100ms 防抖延迟，避免频繁 resize
- **双重保障**: ResizeObserver + window resize 事件
- **内存管理**: 组件卸载时自动清理所有监听器

## 注意事项

1. 组件会自动监听 `option` 的变化并更新图表
2. 组件使用 ResizeObserver 自动处理容器尺寸变化时的图表重绘
3. 组件在卸载时会自动销毁 ECharts 实例以避免内存泄漏
4. 支持所有 ECharts 的配置选项和图表类型
5. 在不支持 ResizeObserver 的环境中会自动降级到 window resize 事件

::: tip 开发版本说明
当前 ECharts 组件为最新开发版本，包含了 ResizeObserver 等新特性。如需使用请确保安装最新版本的组件库。
:::
