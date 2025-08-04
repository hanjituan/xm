import type { App } from "vue";
import ClockFace from "./src/clock-face.vue";

export { ClockFace };

const components = [ClockFace];

const install = (app: App) => {
    components.forEach((component) => {
        app.component(component.name || component.__name || "ClockFace", component);
    });
};

export default { install };
