import { ref, computed, watch } from 'vue'

export function useChartDemo() {
    // 响应式数据
    const chartType = ref('bar')
    const chartTitle = ref('示例图表')
    const selectedTheme = ref('default')

    const chartData = ref([
        { name: '周一', value: 120 },
        { name: '周二', value: 200 },
        { name: '周三', value: 150 },
        { name: '周四', value: 80 },
        { name: '周五', value: 70 },
        { name: '周六', value: 110 },
        { name: '周日', value: 130 }
    ])

    // 图表配置
    const chartOption = ref({
        title: {
            text: chartTitle.value,
            left: 'center',
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: chartData.value.map(item => item.name)
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: chartData.value.map(item => item.value),
            type: chartType.value,
            itemStyle: {
                color: '#5470c6'
            }
        }]
    })

    // 更新图表类型
    const updateChartType = () => {
        chartOption.value = {
            ...chartOption.value,
            series: [{
                ...chartOption.value.series[0],
                type: chartType.value,
                ...(chartType.value === 'pie' ? {
                    data: chartData.value.map(item => ({ name: item.name, value: item.value })),
                    radius: '50%',
                    center: ['50%', '50%']
                } : {
                    data: chartData.value.map(item => item.value)
                })
            }]
        }

        if (chartType.value === 'pie') {
            chartOption.value.xAxis = undefined
            chartOption.value.yAxis = undefined
            chartOption.value.legend = {
                orient: 'vertical',
                left: 'left'
            }
        } else {
            chartOption.value.xAxis = {
                type: 'category',
                data: chartData.value.map(item => item.name)
            }
            chartOption.value.yAxis = {
                type: 'value'
            }
            chartOption.value.legend = undefined
        }
    }

    // 更新标题
    const updateTitle = () => {
        chartOption.value = {
            ...chartOption.value,
            title: {
                ...chartOption.value.title,
                text: chartTitle.value
            }
        }
    }

    // 更新数据
    const updateData = () => {
        updateChartType()
    }

    // 更新数据项
    const updateDataItem = ({ index, field, value }) => {
        if (chartData.value[index]) {
            chartData.value[index][field] = value
        }
    }

    // 添加数据项
    const addDataItem = () => {
        chartData.value.push({ name: `数据${chartData.value.length + 1}`, value: 100 })
        updateData()
    }

    // 删除数据项
    const removeDataItem = (index) => {
        if (chartData.value.length > 1) {
            chartData.value.splice(index, 1)
            updateData()
        }
    }

    // 加载预设数据
    const loadPreset = (type) => {
        switch (type) {
            case 'sales':
                chartTitle.value = '销售数据统计'
                chartData.value = [
                    { name: '一月', value: 820 },
                    { name: '二月', value: 932 },
                    { name: '三月', value: 901 },
                    { name: '四月', value: 934 },
                    { name: '五月', value: 1290 },
                    { name: '六月', value: 1330 }
                ]
                chartType.value = 'bar'
                break
            case 'usage':
                chartTitle.value = '网站访问量'
                chartData.value = [
                    { name: '搜索引擎', value: 1048 },
                    { name: '直接访问', value: 735 },
                    { name: '邮件营销', value: 580 },
                    { name: '联盟广告', value: 484 },
                    { name: '视频广告', value: 300 }
                ]
                chartType.value = 'pie'
                break
            case 'performance':
                chartTitle.value = '性能指标趋势'
                chartData.value = [
                    { name: '周一', value: 85 },
                    { name: '周二', value: 92 },
                    { name: '周三', value: 88 },
                    { name: '周四', value: 95 },
                    { name: '周五', value: 90 },
                    { name: '周六', value: 93 },
                    { name: '周日', value: 89 }
                ]
                chartType.value = 'line'
                break
        }
        updateTitle()
        updateChartType()
    }

    // 计算生成的代码
    const templateCode = computed(() => {
        return `<template>
  <XmEcharts 
    :option="chartOption" 
    ${selectedTheme.value !== 'default' ? `theme="${selectedTheme.value}" ` : ''}width="100%" 
    height="400px" 
  />
</template>`
    })

    const scriptCode = computed(() => {
        return `<script setup>
import { ref } from "vue";
import { XmEcharts } from "vue3-xm";

const chartOption = ref(${JSON.stringify(chartOption.value, null, 2)});
<\/script>`
    })

    // 监听数据变化
    watch(chartData, () => {
        updateData()
    }, { deep: true })

    return {
        // 数据
        chartType,
        chartTitle,
        selectedTheme,
        chartData,
        chartOption,

        // 方法
        updateChartType,
        updateTitle,
        updateData,
        updateDataItem,
        addDataItem,
        removeDataItem,
        loadPreset,

        // 计算属性
        templateCode,
        scriptCode
    }
}
