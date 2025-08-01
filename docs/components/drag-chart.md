# Drag Chart

A draggable time range selection chart component based on ECharts for data visualization.

## Basic Usage

```vue
<template>
  <drag-chart
    :time-range="timeRange"
    :active-time="activeTime"
    :value-data="valueData"
    :symbol-size="20"
    :cover-color="'rgba(160,210,255,0.14)'"
    :line-color="'#5CB0FE'"
    :max-range="168"
    :min-range="3"
    :need-click="true"
    :auto-interval="true"
    @update:activeTime="onActiveTimeUpdate"
    @outOfRange="onOutOfRange"
  />
</template>

<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

const timeRange = ref([
  dayjs().subtract(1, 'day'),
  dayjs()
])

const activeTime = ref([0, 12])

const valueData = ref([
  // Array of values for each time slot
])

function onActiveTimeUpdate(newActiveTime) {
  activeTime.value = newActiveTime
}

function onOutOfRange(event) {
  console.log('Out of range:', event)
}
</script>
```

## API

### Props

| Name         | Type                    | Default                      | Description                                    |
|--------------|-------------------------|------------------------------|------------------------------------------------|
| timeRange    | Array                   | [dayjs().subtract(1, 'day'), dayjs()] | X-axis start and end time range      |
| startIcon    | String                  | LeftImg                      | Start drag handle icon                         |
| endIcon      | String                  | RightImg                     | End drag handle icon                           |
| symbolSize   | Number                  | 20                           | Size of drag points                            |
| valueData    | Array                   | []                           | Data values for chart bars                     |
| activeTime   | Array                   | [0, 12]                      | Current selected time range (hours)            |
| interval     | Number                  | 4                            | X-axis tick interval                           |
| autoInterval | Boolean                 | true                         | Auto calculate interval (ignores interval prop)|
| needClick    | Boolean                 | true                         | Enable click to change position                |
| maxRange     | Number                  | 168 (7 days)                 | Maximum selection range in hours               |
| minRange     | Number                  | 3                            | Minimum selection range in hours               |
| coverColor   | String                  | 'rgba(160,210,255,0.14)'     | Selection area background color                |
| lineColor    | String                  | '#5CB0FE'                    | Selection line color                           |

### Events

| Name           | Parameters                                    | Description                               |
|----------------|-----------------------------------------------|-------------------------------------------|
| update:activeTime | (activeTime: number[])                      | Triggered when active time range changes  |
| outOfRange     | (event: {type: string, currentRange: number, minRange: number}) | Triggered when drag exceeds range limits |

### Slots

This component does not provide any slots.
