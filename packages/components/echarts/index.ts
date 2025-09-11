import type { App } from "vue";
import XmEcharts from "./src/echarts.vue";

// 组件安装器
XmEcharts.install = (app: App): void => {
    app.component(XmEcharts.name || "XmEcharts", XmEcharts);
};

export { XmEcharts };
export default XmEcharts;
