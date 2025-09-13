import { ref, computed, watch } from 'vue'
import { allChartConfigs, getConfigById } from '../configs/chartConfigs.ts'

export function useChartDemo() {
    // 响应式数据
    const chartType = ref('bar')
    const chartTitle = ref('示例图表')
    const selectedTheme = ref('default')
    const currentConfigId = ref('basic-bar') // 当前选中的配置ID
    const availableConfigs = ref(allChartConfigs) // 所有可用配置
    const enableChartClick = ref(true) // 是否启用图表点击

    const chartData = ref([
        { name: '周一', value: 120 },
        { name: '周二', value: 200 },
        { name: '周三', value: 150 },
        { name: '周四', value: 80 },
        { name: '周五', value: 70 },
        { name: '周六', value: 110 },
        { name: '周日', value: 130 }
    ])    // 图表配置
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

    // 处理图表点击事件
    const handleChartClick = (params) => {
        console.log('图表点击事件:', params)
        // 随机切换到下一个配置
        const currentIndex = availableConfigs.value.findIndex(config => config.id === currentConfigId.value)
        const nextIndex = (currentIndex + 1) % availableConfigs.value.length
        const nextConfig = availableConfigs.value[nextIndex]
        loadConfigById(nextConfig.id)
    }

    // 根据配置ID加载配置
    const loadConfigById = (configId) => {
        const config = getConfigById(configId)
        if (config) {
            currentConfigId.value = configId
            chartOption.value = { ...config.option }
            chartType.value = config.type
            chartTitle.value = config.option.title?.text || config.name
        }
    }

    // 切换到指定类型的第一个配置
    const switchToConfigType = (type) => {
        const configs = availableConfigs.value.filter(config => config.type === type)
        if (configs.length > 0) {
            loadConfigById(configs[0].id)
        }
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

    // 直接更新图表配置
    const updateChartOption = (newOption) => {
        chartOption.value = { ...newOption }
    }

    // 监听数据变化
    watch(chartData, () => {
        updateData()
    }, { deep: true })

    // 初始化时加载默认配置
    const initializeDefaultConfig = () => {
        if (availableConfigs.value.length > 0) {
            loadConfigById(currentConfigId.value)
        }
    }

    // 在组件挂载时初始化
    initializeDefaultConfig()

    return {
        // 数据
        chartType,
        chartTitle,
        selectedTheme,
        chartData,
        chartOption,
        currentConfigId,
        availableConfigs,
        enableChartClick,

        // 方法
        updateChartType,
        updateTitle,
        updateData,
        updateDataItem,
        addDataItem,
        removeDataItem,
        loadPreset,
        handleChartClick,
        loadConfigById,
        switchToConfigType,
        updateChartOption, // 新增的方法

        // 计算属性
        templateCode,
        scriptCode
    }
}
