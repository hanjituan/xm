import { PropType } from "vue";

export interface SwiperProps {
    imgList: string[];
    autoPlay: boolean;
    playTime: number | string;
    keysControl: boolean;
    infinite: boolean;
    hoverPause: boolean;
    showPagination: boolean;
    showNavigation: boolean;
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
    // 鼠标悬浮时是否暂停自动播放
    hoverPause: {
        type: Boolean,
        default: () => true,
    },
    // 是否显示分页器（底部缩略图）
    showPagination: {
        type: Boolean,
        default: () => true,
    },
    // 是否显示导航按钮（左右箭头）
    showNavigation: {
        type: Boolean,
        default: () => true,
    },
};
