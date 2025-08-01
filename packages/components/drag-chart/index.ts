import type { App } from "vue";
import DragChart from "./src/drag-chart.vue";

export { DragChart };

const components = [DragChart];

const install = (app: App) => {
    components.forEach((component) => {
        app.component(component.name || component.__name || "DragChart", component);
    });
};

export default { install };
