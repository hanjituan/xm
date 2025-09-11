import type { App } from "vue";

// 导入所有组件
export * from "./drag-chart";
export * from "./swiper-simple";
export * from "./tabs";
export * from "./clock-face";
export * from "./echarts";

// 导入组件的安装器
import DragChartInstaller from "./drag-chart";
import SwiperSimpleInstaller from "./swiper-simple";
import TabsInstaller from "./tabs";
import ClockFaceInstaller from "./clock-face";
import EchartsInstaller from "./echarts";

// 安装所有组件的函数
const install = (app: App): void => {
    // 手动安装每个组件，使用类型断言
    app.use(DragChartInstaller as any);
    app.use(SwiperSimpleInstaller as any);
    app.use(TabsInstaller as any);
    app.use(ClockFaceInstaller as any);
    app.use(EchartsInstaller as any);
};

// 默认导出，支持 app.use() 方式安装
export default {
    install,
    version: "0.1.0",
};

// 支持按需导入的方式
export { install };
