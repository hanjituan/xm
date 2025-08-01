import type { App } from "vue";
import SwiperSimple from "./src/swiper-simple.vue";

export { SwiperSimple };

const components = [SwiperSimple];

const install = (app: App) => {
    components.forEach((component) => {
        app.component(component.name || component.__name || "SwiperSimple", component);
    });
};

export default { install };
