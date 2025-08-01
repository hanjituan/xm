import { PropType } from "vue";

export interface SwiperProps {
    imgList: string[];
    autoPlay: boolean;
    playTime: number | string;
    keysControl: boolean;
    infinite: boolean;
}

export default {
    imgList: {
        type: Array as PropType<string[]>,
        default: () => [],
        required: true,
    },
    autoPlay: {
        type: Boolean,
        default: () => false,
    },
    // 当 autoPlay 为 true 时, 生效
    playTime: {
        type: [String, Number] as PropType<number | string>,
        default: () => 2,
    },
    keysControl: {
        type: Boolean,
        default: () => true,
    },
    // 是否支持无线滚动
    infinite: {
        type: Boolean,
        default: () => false,
    },
};
