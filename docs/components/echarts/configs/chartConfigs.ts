import type { EChartsOption } from "echarts";

// 基础图表配置接口
export interface ChartConfig {
    id: string;
    name: string;
    description: string;
    type: "bar" | "line" | "pie" | "scatter" | "radar" | "gauge" | "funnel" | "treemap";
    option: EChartsOption;
}

// 柱状图配置集合
export const barChartConfigs: ChartConfig[] = [
    {
        id: "basic-bar",
        name: "基础柱状图",
        description: "简单的柱状图示例",
        type: "bar",
        option: {
            title: {
                text: "基础柱状图",
                left: "center",
            },
            tooltip: {
                trigger: "axis",
            },
            xAxis: {
                type: "category",
                data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            },
            yAxis: {
                type: "value",
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: "bar",
                    itemStyle: {
                        color: "#5470c6",
                    },
                },
            ],
        },
    },
    {
        id: "gradient-bar",
        name: "渐变柱状图",
        description: "带渐变色彩的柱状图",
        type: "bar",
        option: {
            title: {
                text: "渐变柱状图",
                left: "center",
            },
            tooltip: {
                trigger: "axis",
            },
            xAxis: {
                type: "category",
                data: ["一月", "二月", "三月", "四月", "五月", "六月"],
            },
            yAxis: {
                type: "value",
            },
            series: [
                {
                    data: [820, 932, 901, 934, 1290, 1330],
                    type: "bar",
                    itemStyle: {
                        color: {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                { offset: 0, color: "#83bff6" },
                                { offset: 0.5, color: "#188df0" },
                                { offset: 1, color: "#188df0" },
                            ],
                        },
                    },
                },
            ],
        },
    },
    {
        id: "stacked-bar",
        name: "堆叠柱状图",
        description: "多系列堆叠柱状图",
        type: "bar",
        option: {
            title: {
                text: "堆叠柱状图",
                left: "center",
            },
            tooltip: {
                trigger: "axis",
            },
            legend: {
                data: ["产品A", "产品B", "产品C"],
                top: "30px",
            },
            xAxis: {
                type: "category",
                data: ["一月", "二月", "三月", "四月", "五月", "六月"],
            },
            yAxis: {
                type: "value",
            },
            series: [
                {
                    name: "产品A",
                    type: "bar",
                    stack: "总量",
                    data: [120, 132, 101, 134, 90, 230],
                    itemStyle: { color: "#5470c6" },
                },
                {
                    name: "产品B",
                    type: "bar",
                    stack: "总量",
                    data: [220, 182, 191, 234, 290, 330],
                    itemStyle: { color: "#91cc75" },
                },
                {
                    name: "产品C",
                    type: "bar",
                    stack: "总量",
                    data: [150, 232, 201, 154, 190, 330],
                    itemStyle: { color: "#fac858" },
                },
            ],
        },
    },
];

// 折线图配置集合
export const lineChartConfigs: ChartConfig[] = [
    {
        id: "basic-line",
        name: "基础折线图",
        description: "简单的折线图示例",
        type: "line",
        option: {
            title: {
                text: "基础折线图",
                left: "center",
            },
            tooltip: {
                trigger: "axis",
            },
            xAxis: {
                type: "category",
                data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            },
            yAxis: {
                type: "value",
            },
            series: [
                {
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: "line",
                    smooth: true,
                    itemStyle: {
                        color: "#ee6666",
                    },
                },
            ],
        },
    },
    {
        id: "area-line",
        name: "面积折线图",
        description: "带填充区域的折线图",
        type: "line",
        option: {
            title: {
                text: "面积折线图",
                left: "center",
            },
            tooltip: {
                trigger: "axis",
            },
            xAxis: {
                type: "category",
                data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            },
            yAxis: {
                type: "value",
            },
            series: [
                {
                    data: [120, 132, 101, 134, 90, 230, 210, 320, 290, 330, 250, 180],
                    type: "line",
                    smooth: true,
                    areaStyle: {
                        color: {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                { offset: 0, color: "rgba(238, 102, 102, 0.3)" },
                                { offset: 1, color: "rgba(238, 102, 102, 0.1)" },
                            ],
                        },
                    },
                    itemStyle: {
                        color: "#ee6666",
                    },
                },
            ],
        },
    },
    {
        id: "multi-line",
        name: "多条折线图",
        description: "多系列折线图对比",
        type: "line",
        option: {
            title: {
                text: "多条折线图",
                left: "center",
            },
            tooltip: {
                trigger: "axis",
            },
            legend: {
                data: ["网站流量", "移动端流量", "API调用"],
                top: "30px",
            },
            xAxis: {
                type: "category",
                data: ["1月", "2月", "3月", "4月", "5月", "6月"],
            },
            yAxis: {
                type: "value",
            },
            series: [
                {
                    name: "网站流量",
                    type: "line",
                    data: [820, 932, 901, 934, 1290, 1330],
                    itemStyle: { color: "#5470c6" },
                },
                {
                    name: "移动端流量",
                    type: "line",
                    data: [620, 732, 701, 734, 1090, 1130],
                    itemStyle: { color: "#91cc75" },
                },
                {
                    name: "API调用",
                    type: "line",
                    data: [120, 232, 401, 434, 590, 730],
                    itemStyle: { color: "#fac858" },
                },
            ],
        },
    },
];

// 饼图配置集合
export const pieChartConfigs: ChartConfig[] = [
    {
        id: "basic-pie",
        name: "基础饼图",
        description: "简单的饼图示例",
        type: "pie",
        option: {
            title: {
                text: "基础饼图",
                left: "center",
            },
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)",
            },
            legend: {
                orient: "vertical",
                left: "left",
            },
            series: [
                {
                    name: "访问来源",
                    type: "pie",
                    radius: "50%",
                    data: [
                        { value: 1048, name: "搜索引擎" },
                        { value: 735, name: "直接访问" },
                        { value: 580, name: "邮件营销" },
                        { value: 484, name: "联盟广告" },
                        { value: 300, name: "视频广告" },
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                        },
                    },
                },
            ],
        },
    },
    {
        id: "doughnut-pie",
        name: "环形饼图",
        description: "中空的环形饼图",
        type: "pie",
        option: {
            title: {
                text: "环形饼图",
                left: "center",
            },
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)",
            },
            legend: {
                top: "5%",
                left: "center",
            },
            series: [
                {
                    name: "销售占比",
                    type: "pie",
                    radius: ["40%", "70%"],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: "#fff",
                        borderWidth: 2,
                    },
                    label: {
                        show: false,
                        position: "center",
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: "40",
                            fontWeight: "bold",
                        },
                    },
                    labelLine: {
                        show: false,
                    },
                    data: [
                        { value: 1048, name: "产品A" },
                        { value: 735, name: "产品B" },
                        { value: 580, name: "产品C" },
                        { value: 484, name: "产品D" },
                        { value: 300, name: "其他" },
                    ],
                },
            ],
        },
    },
];

// 散点图配置集合
export const scatterChartConfigs: ChartConfig[] = [
    {
        id: "basic-scatter",
        name: "基础散点图",
        description: "简单的散点图示例",
        type: "scatter",
        option: {
            title: {
                text: "基础散点图",
                left: "center",
            },
            tooltip: {
                trigger: "item",
            },
            xAxis: {
                type: "value",
                scale: true,
            },
            yAxis: {
                type: "value",
                scale: true,
            },
            series: [
                {
                    type: "scatter",
                    data: [
                        [161.2, 51.6],
                        [167.5, 59.0],
                        [159.5, 49.2],
                        [157.0, 63.0],
                        [155.8, 53.6],
                        [170.0, 59.0],
                        [159.1, 47.6],
                        [166.0, 69.8],
                        [176.2, 66.8],
                        [160.2, 75.2],
                        [172.5, 55.2],
                        [170.9, 54.2],
                        [172.9, 62.5],
                        [153.4, 42.0],
                        [160.0, 50.0],
                        [147.2, 49.8],
                        [168.2, 49.2],
                        [175.0, 73.2],
                        [157.0, 47.8],
                        [167.6, 68.8],
                    ],
                    symbolSize: 8,
                    itemStyle: {
                        color: "#73c0de",
                    },
                },
            ],
        },
    },
];

// 雷达图配置集合
export const radarChartConfigs: ChartConfig[] = [
    {
        id: "basic-radar",
        name: "基础雷达图",
        description: "简单的雷达图示例",
        type: "radar",
        option: {
            title: {
                text: "基础雷达图",
                left: "center",
            },
            tooltip: {},
            radar: {
                indicator: [
                    { name: "销售", max: 6500 },
                    { name: "管理", max: 16000 },
                    { name: "信息技术", max: 30000 },
                    { name: "客服", max: 38000 },
                    { name: "研发", max: 52000 },
                    { name: "市场", max: 25000 },
                ],
            },
            series: [
                {
                    name: "预算 vs 开销",
                    type: "radar",
                    data: [
                        {
                            value: [4200, 3000, 20000, 35000, 50000, 18000],
                            name: "预算分配",
                        },
                        {
                            value: [5000, 14000, 28000, 26000, 42000, 21000],
                            name: "实际开销",
                        },
                    ],
                },
            ],
        },
    },
];

// 仪表盘配置集合
export const gaugeChartConfigs: ChartConfig[] = [
    {
        id: "basic-gauge",
        name: "基础仪表盘",
        description: "简单的仪表盘示例",
        type: "gauge",
        option: {
            title: {
                text: "基础仪表盘",
                left: "center",
            },
            series: [
                {
                    name: "业务指标",
                    type: "gauge",
                    detail: { formatter: "{value}%" },
                    data: [{ value: 70, name: "完成率" }],
                },
            ],
        },
    },
];

// 漏斗图配置集合
export const funnelChartConfigs: ChartConfig[] = [
    {
        id: "basic-funnel",
        name: "基础漏斗图",
        description: "简单的漏斗图示例",
        type: "funnel",
        option: {
            title: {
                text: "基础漏斗图",
                left: "center",
            },
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c}%",
            },
            toolbox: {
                feature: {
                    dataView: { readOnly: false },
                    restore: {},
                    saveAsImage: {},
                },
            },
            legend: {
                data: ["展现", "点击", "访问", "咨询", "订单"],
            },
            series: [
                {
                    name: "漏斗图",
                    type: "funnel",
                    left: "10%",
                    top: 60,
                    width: "80%",
                    height: "80%",
                    data: [
                        { value: 60, name: "访问" },
                        { value: 40, name: "咨询" },
                        { value: 20, name: "订单" },
                        { value: 80, name: "点击" },
                        { value: 100, name: "展现" },
                    ],
                },
            ],
        },
    },
];

// 矩形树图配置集合
export const treemapChartConfigs: ChartConfig[] = [
    {
        id: "basic-treemap",
        name: "基础矩形树图",
        description: "简单的矩形树图示例",
        type: "treemap",
        option: {
            title: {
                text: "基础矩形树图",
                left: "center",
            },
            series: [
                {
                    name: "数据",
                    type: "treemap",
                    data: [
                        {
                            name: "nodeA",
                            value: 10,
                            children: [
                                { name: "nodeAa", value: 4 },
                                { name: "nodeAb", value: 6 },
                            ],
                        },
                        {
                            name: "nodeB",
                            value: 20,
                            children: [{ name: "nodeBa", value: 20 }],
                        },
                    ],
                },
            ],
        },
    },
];

// 所有配置的汇总
export const allChartConfigs: ChartConfig[] = [
    ...barChartConfigs,
    ...lineChartConfigs,
    ...pieChartConfigs,
    ...scatterChartConfigs,
    ...radarChartConfigs,
    ...gaugeChartConfigs,
    ...funnelChartConfigs,
    ...treemapChartConfigs,
];

// 按类型分组的配置
export const chartConfigsByType = {
    bar: barChartConfigs,
    line: lineChartConfigs,
    pie: pieChartConfigs,
    scatter: scatterChartConfigs,
    radar: radarChartConfigs,
    gauge: gaugeChartConfigs,
    funnel: funnelChartConfigs,
    treemap: treemapChartConfigs,
};

// 获取指定类型的配置
export function getConfigsByType(type: string): ChartConfig[] {
    return chartConfigsByType[type as keyof typeof chartConfigsByType] || [];
}

// 根据 ID 获取配置
export function getConfigById(id: string): ChartConfig | undefined {
    return allChartConfigs.find((config) => config.id === id);
}
