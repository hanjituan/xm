import type { App } from "vue";
import Tabs from "./src/tabs.vue";

// 组件安装器
Tabs.install = (app: App): void => {
    app.component(Tabs.name || "Tabs", Tabs);
};

export { Tabs };
export default Tabs;
export type { TabsProps, TabItem, TabsEmits } from "./src/tabs-props";
