import type { EChartsOption } from "echarts";

// 配置项的类型定义
export interface ConfigProperty {
    key: string;
    type: "string" | "number" | "boolean" | "color" | "array" | "object" | "enum";
    description?: string;
    defaultValue?: any;
    options?: string[]; // 枚举选项
    children?: ConfigProperty[]; // 嵌套配置
}

// 配置区域
export interface ConfigSection {
    name: string;
    description: string;
    properties: ConfigProperty[];
}

// 预定义的配置结构
export const ECHARTS_CONFIG_SCHEMA = {
    title: {
        name: "标题",
        description: "图表标题配置",
        properties: [
            {
                key: "show",
                type: "boolean" as const,
                description: "是否显示标题",
                defaultValue: true,
            },
            {
                key: "text",
                type: "string" as const,
                description: "主标题文本",
                defaultValue: "",
            },
            {
                key: "subtext",
                type: "string" as const,
                description: "副标题文本",
                defaultValue: "",
            },
            {
                key: "left",
                type: "enum" as const,
                description: "标题水平位置",
                defaultValue: "auto",
                options: ["auto", "left", "center", "right"],
            },
            {
                key: "top",
                type: "enum" as const,
                description: "标题垂直位置",
                defaultValue: "auto",
                options: ["auto", "top", "middle", "bottom"],
            },
            {
                key: "textStyle",
                type: "object" as const,
                description: "主标题样式",
                children: [
                    {
                        key: "color",
                        type: "color" as const,
                        description: "文字颜色",
                        defaultValue: "#333",
                    },
                    {
                        key: "fontSize",
                        type: "number" as const,
                        description: "字体大小",
                        defaultValue: 16,
                    },
                    {
                        key: "fontWeight",
                        type: "enum" as const,
                        description: "字体粗细",
                        defaultValue: "normal",
                        options: ["normal", "bold", "bolder", "lighter"],
                    },
                    {
                        key: "fontFamily",
                        type: "string" as const,
                        description: "字体系列",
                        defaultValue: "sans-serif",
                    },
                ],
            },
            {
                key: "subtextStyle",
                type: "object" as const,
                description: "副标题样式",
                children: [
                    {
                        key: "color",
                        type: "color" as const,
                        description: "文字颜色",
                        defaultValue: "#aaa",
                    },
                    {
                        key: "fontSize",
                        type: "number" as const,
                        description: "字体大小",
                        defaultValue: 12,
                    },
                ],
            },
        ],
    },

    legend: {
        name: "图例",
        description: "图例配置",
        properties: [
            {
                key: "show",
                type: "boolean" as const,
                description: "是否显示图例",
                defaultValue: true,
            },
            {
                key: "type",
                type: "enum" as const,
                description: "图例类型",
                defaultValue: "plain",
                options: ["plain", "scroll"],
            },
            {
                key: "orient",
                type: "enum" as const,
                description: "图例排列方向",
                defaultValue: "horizontal",
                options: ["horizontal", "vertical"],
            },
            {
                key: "left",
                type: "enum" as const,
                description: "水平位置",
                defaultValue: "center",
                options: ["auto", "left", "center", "right"],
            },
            {
                key: "top",
                type: "enum" as const,
                description: "垂直位置",
                defaultValue: "auto",
                options: ["auto", "top", "middle", "bottom"],
            },
            {
                key: "itemWidth",
                type: "number" as const,
                description: "图例标记宽度",
                defaultValue: 25,
            },
            {
                key: "itemHeight",
                type: "number" as const,
                description: "图例标记高度",
                defaultValue: 14,
            },
            {
                key: "itemGap",
                type: "number" as const,
                description: "图例项间距",
                defaultValue: 10,
            },
            {
                key: "textStyle",
                type: "object" as const,
                description: "图例文字样式",
                children: [
                    {
                        key: "color",
                        type: "color" as const,
                        description: "文字颜色",
                        defaultValue: "#333",
                    },
                    {
                        key: "fontSize",
                        type: "number" as const,
                        description: "字体大小",
                        defaultValue: 12,
                    },
                ],
            },
        ],
    },

    xAxis: {
        name: "X轴",
        description: "X轴配置",
        properties: [
            {
                key: "show",
                type: "boolean" as const,
                description: "是否显示X轴",
                defaultValue: true,
            },
            {
                key: "type",
                type: "enum" as const,
                description: "坐标轴类型",
                defaultValue: "category",
                options: ["value", "category", "time", "log"],
            },
            {
                key: "name",
                type: "string" as const,
                description: "坐标轴名称",
                defaultValue: "",
            },
            {
                key: "position",
                type: "enum" as const,
                description: "坐标轴位置",
                defaultValue: "bottom",
                options: ["top", "bottom"],
            },
            {
                key: "axisLine",
                type: "object" as const,
                description: "坐标轴轴线",
                children: [
                    {
                        key: "show",
                        type: "boolean" as const,
                        description: "是否显示轴线",
                        defaultValue: true,
                    },
                    {
                        key: "lineStyle",
                        type: "object" as const,
                        description: "轴线样式",
                        children: [
                            {
                                key: "color",
                                type: "color" as const,
                                description: "轴线颜色",
                                defaultValue: "#333",
                            },
                            {
                                key: "width",
                                type: "number" as const,
                                description: "轴线宽度",
                                defaultValue: 1,
                            },
                        ],
                    },
                ],
            },
            {
                key: "axisTick",
                type: "object" as const,
                description: "坐标轴刻度",
                children: [
                    {
                        key: "show",
                        type: "boolean" as const,
                        description: "是否显示刻度",
                        defaultValue: true,
                    },
                    {
                        key: "length",
                        type: "number" as const,
                        description: "刻度长度",
                        defaultValue: 5,
                    },
                ],
            },
            {
                key: "axisLabel",
                type: "object" as const,
                description: "坐标轴标签",
                children: [
                    {
                        key: "show",
                        type: "boolean" as const,
                        description: "是否显示标签",
                        defaultValue: true,
                    },
                    {
                        key: "color",
                        type: "color" as const,
                        description: "标签颜色",
                        defaultValue: "#333",
                    },
                    {
                        key: "fontSize",
                        type: "number" as const,
                        description: "字体大小",
                        defaultValue: 12,
                    },
                    {
                        key: "rotate",
                        type: "number" as const,
                        description: "标签旋转角度",
                        defaultValue: 0,
                    },
                ],
            },
            {
                key: "splitLine",
                type: "object" as const,
                description: "分隔线",
                children: [
                    {
                        key: "show",
                        type: "boolean" as const,
                        description: "是否显示分隔线",
                        defaultValue: false,
                    },
                    {
                        key: "lineStyle",
                        type: "object" as const,
                        description: "分隔线样式",
                        children: [
                            {
                                key: "color",
                                type: "color" as const,
                                description: "分隔线颜色",
                                defaultValue: "#ccc",
                            },
                            {
                                key: "type",
                                type: "enum" as const,
                                description: "线条类型",
                                defaultValue: "solid",
                                options: ["solid", "dashed", "dotted"],
                            },
                        ],
                    },
                ],
            },
        ],
    },

    yAxis: {
        name: "Y轴",
        description: "Y轴配置",
        properties: [
            {
                key: "show",
                type: "boolean" as const,
                description: "是否显示Y轴",
                defaultValue: true,
            },
            {
                key: "type",
                type: "enum" as const,
                description: "坐标轴类型",
                defaultValue: "value",
                options: ["value", "category", "time", "log"],
            },
            {
                key: "name",
                type: "string" as const,
                description: "坐标轴名称",
                defaultValue: "",
            },
            {
                key: "position",
                type: "enum" as const,
                description: "坐标轴位置",
                defaultValue: "left",
                options: ["left", "right"],
            },
            {
                key: "axisLine",
                type: "object" as const,
                description: "坐标轴轴线",
                children: [
                    {
                        key: "show",
                        type: "boolean" as const,
                        description: "是否显示轴线",
                        defaultValue: true,
                    },
                ],
            },
            {
                key: "axisTick",
                type: "object" as const,
                description: "坐标轴刻度",
                children: [
                    {
                        key: "show",
                        type: "boolean" as const,
                        description: "是否显示刻度",
                        defaultValue: true,
                    },
                ],
            },
            {
                key: "axisLabel",
                type: "object" as const,
                description: "坐标轴标签",
                children: [
                    {
                        key: "show",
                        type: "boolean" as const,
                        description: "是否显示标签",
                        defaultValue: true,
                    },
                    {
                        key: "color",
                        type: "color" as const,
                        description: "标签颜色",
                        defaultValue: "#333",
                    },
                    {
                        key: "fontSize",
                        type: "number" as const,
                        description: "字体大小",
                        defaultValue: 12,
                    },
                ],
            },
            {
                key: "splitLine",
                type: "object" as const,
                description: "分隔线",
                children: [
                    {
                        key: "show",
                        type: "boolean" as const,
                        description: "是否显示分隔线",
                        defaultValue: true,
                    },
                    {
                        key: "lineStyle",
                        type: "object" as const,
                        description: "分隔线样式",
                        children: [
                            {
                                key: "color",
                                type: "color" as const,
                                description: "分隔线颜色",
                                defaultValue: "#ccc",
                            },
                        ],
                    },
                ],
            },
        ],
    },

    series: {
        name: "数据系列",
        description: "数据系列配置",
        properties: [
            {
                key: "name",
                type: "string" as const,
                description: "系列名称",
                defaultValue: "",
            },
            {
                key: "type",
                type: "enum" as const,
                description: "图表类型",
                defaultValue: "line",
                options: ["line", "bar", "pie", "scatter", "radar", "funnel", "gauge"],
            },
            {
                key: "smooth",
                type: "boolean" as const,
                description: "是否平滑曲线（适用于线图）",
                defaultValue: false,
            },
            {
                key: "symbol",
                type: "enum" as const,
                description: "标记符号",
                defaultValue: "circle",
                options: ["circle", "rect", "roundRect", "triangle", "diamond", "pin", "arrow", "none"],
            },
            {
                key: "symbolSize",
                type: "number" as const,
                description: "标记大小",
                defaultValue: 4,
            },
            {
                key: "lineStyle",
                type: "object" as const,
                description: "线条样式（适用于线图）",
                children: [
                    {
                        key: "color",
                        type: "color" as const,
                        description: "线条颜色",
                        defaultValue: "auto",
                    },
                    {
                        key: "width",
                        type: "number" as const,
                        description: "线条宽度",
                        defaultValue: 2,
                    },
                    {
                        key: "type",
                        type: "enum" as const,
                        description: "线条类型",
                        defaultValue: "solid",
                        options: ["solid", "dashed", "dotted"],
                    },
                ],
            },
            {
                key: "itemStyle",
                type: "object" as const,
                description: "图形样式",
                children: [
                    {
                        key: "color",
                        type: "color" as const,
                        description: "图形颜色",
                        defaultValue: "auto",
                    },
                    {
                        key: "borderColor",
                        type: "color" as const,
                        description: "边框颜色",
                        defaultValue: "auto",
                    },
                    {
                        key: "borderWidth",
                        type: "number" as const,
                        description: "边框宽度",
                        defaultValue: 0,
                    },
                ],
            },
            {
                key: "label",
                type: "object" as const,
                description: "标签配置",
                children: [
                    {
                        key: "show",
                        type: "boolean" as const,
                        description: "是否显示标签",
                        defaultValue: false,
                    },
                    {
                        key: "position",
                        type: "enum" as const,
                        description: "标签位置",
                        defaultValue: "top",
                        options: ["top", "left", "right", "bottom", "inside", "outside"],
                    },
                    {
                        key: "color",
                        type: "color" as const,
                        description: "标签颜色",
                        defaultValue: "auto",
                    },
                    {
                        key: "fontSize",
                        type: "number" as const,
                        description: "字体大小",
                        defaultValue: 12,
                    },
                ],
            },
        ],
    },

    grid: {
        name: "网格",
        description: "直角坐标系内绘图网格",
        properties: [
            {
                key: "show",
                type: "boolean" as const,
                description: "是否显示网格",
                defaultValue: false,
            },
            {
                key: "left",
                type: "string" as const,
                description: "左侧距离",
                defaultValue: "10%",
            },
            {
                key: "top",
                type: "string" as const,
                description: "顶部距离",
                defaultValue: "60",
            },
            {
                key: "right",
                type: "string" as const,
                description: "右侧距离",
                defaultValue: "10%",
            },
            {
                key: "bottom",
                type: "string" as const,
                description: "底部距离",
                defaultValue: "60",
            },
            {
                key: "containLabel",
                type: "boolean" as const,
                description: "网格区域是否包含坐标轴的刻度标签",
                defaultValue: false,
            },
            {
                key: "backgroundColor",
                type: "color" as const,
                description: "网格背景色",
                defaultValue: "transparent",
            },
            {
                key: "borderColor",
                type: "color" as const,
                description: "网格边框颜色",
                defaultValue: "#ccc",
            },
            {
                key: "borderWidth",
                type: "number" as const,
                description: "网格边框宽度",
                defaultValue: 1,
            },
        ],
    },

    tooltip: {
        name: "提示框",
        description: "提示框组件配置",
        properties: [
            {
                key: "show",
                type: "boolean" as const,
                description: "是否显示提示框",
                defaultValue: true,
            },
            {
                key: "trigger",
                type: "enum" as const,
                description: "触发类型",
                defaultValue: "item",
                options: ["item", "axis", "none"],
            },
            {
                key: "triggerOn",
                type: "enum" as const,
                description: "触发条件",
                defaultValue: "mousemove|click",
                options: ["mousemove", "click", "mousemove|click", "none"],
            },
            {
                key: "backgroundColor",
                type: "color" as const,
                description: "提示框背景色",
                defaultValue: "rgba(50,50,50,0.7)",
            },
            {
                key: "borderColor",
                type: "color" as const,
                description: "提示框边框颜色",
                defaultValue: "#333",
            },
            {
                key: "borderWidth",
                type: "number" as const,
                description: "提示框边框宽度",
                defaultValue: 0,
            },
            {
                key: "padding",
                type: "number" as const,
                description: "提示框内边距",
                defaultValue: 5,
            },
            {
                key: "textStyle",
                type: "object" as const,
                description: "提示框文字样式",
                children: [
                    {
                        key: "color",
                        type: "color" as const,
                        description: "文字颜色",
                        defaultValue: "#fff",
                    },
                    {
                        key: "fontSize",
                        type: "number" as const,
                        description: "字体大小",
                        defaultValue: 14,
                    },
                ],
            },
        ],
    },
};

// 根据区域类型获取配置结构
export function getConfigByRegion(regionType: string): ConfigSection | null {
    return ECHARTS_CONFIG_SCHEMA[regionType as keyof typeof ECHARTS_CONFIG_SCHEMA] || null;
}

// 从现有配置中提取值
export function extractConfigValues(option: EChartsOption, regionType: string): Record<string, any> {
    const regionConfig = option[regionType as keyof EChartsOption];
    if (!regionConfig) return {};

    return typeof regionConfig === "object" ? { ...regionConfig } : {};
}

// 生成配置代码
export function generateConfigCode(regionType: string, values: Record<string, any>): string {
    const cleanValues = removeEmptyValues(values);
    return `${regionType}: ${JSON.stringify(cleanValues, null, 2)}`;
}

// 移除空值
function removeEmptyValues(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(removeEmptyValues).filter((item) => item !== null && item !== undefined);
    }

    if (obj && typeof obj === "object") {
        const cleaned: any = {};
        for (const [key, value] of Object.entries(obj)) {
            if (value !== null && value !== undefined && value !== "") {
                cleaned[key] = removeEmptyValues(value);
            }
        }
        return Object.keys(cleaned).length > 0 ? cleaned : undefined;
    }

    return obj;
}

// 获取所有支持的区域类型
export function getSupportedRegions(): string[] {
    return Object.keys(ECHARTS_CONFIG_SCHEMA);
}
