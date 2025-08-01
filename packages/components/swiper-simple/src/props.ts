export default {
    imgList: {
        type: Array,
        default: () => [],
        required: true,
    },
    autoPlay: {
        type: Boolean,
        default: () => false,
    },
    // 当 autoPlay 为 true 时, 生效
    playTime: {
        type: [String, Number],
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
