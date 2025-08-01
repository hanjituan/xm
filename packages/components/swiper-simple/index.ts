import type { App } from "vue";
import SwiperSimple from "./src/swiper-simple.vue";
import type { SwiperProps } from "./src/props";

export { SwiperSimple };
export type { SwiperProps };

const components = [SwiperSimple];

const install = (app: App) => {
    components.forEach((component) => {
        app.component(component.__name || "SwiperSimple", component);
    });
};

export default {
    install,
    SwiperSimple,
};
