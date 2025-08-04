export default {
    size: { type: Number, default: 300 },
    centerText: { type: String, default: "" },
    centerTextStyle: {
        type: Object,
        default: () => ({
            fontSize: 16,
            fontFamily: "Arial, sans-serif",
            color: "#333",
            fontWeight: "normal",
            textAlign: "center",
            textBaseline: "middle",
        }),
    },
    sectors: {
        type: Array,
        default: () => [
            // 默认1-2点扇形
            {
                from: { h: 1, m: 0, s: 0 },
                to: { h: 2, m: 0, s: 0 },
                color: "rgba(0,180,255,0.3)",
                // 扇形位置(分成100份, 0最外圈, 100最中心)
                startPos: 70, // 内圈位置，距离边框百分比
                endPos: 10, // 外圈位置，距离边框百分比
            },
        ],
    },
    // 扇形位置(分成100份, 0最外圈, 100最中心)
    startPos: 70, // 内圈位置，距离边框百分比
    endPos: 10, // 外圈位置，距离边框百分比

    // 边框属性
    borderColor: { type: String, default: "#333" },
    borderWidth: { type: Number, default: 4 },

    // 背景属性
    backgroundColor: { type: String, default: "transparent" },

    // 小刻度属性
    minorTickColor: { type: String, default: "#666" },
    minorTickWidth: { type: Number, default: 2 },
    minorTickLen: { type: Number, default: 10 },
    minorTickDistance: { type: Number, default: 0 }, // 距离边框的距离

    // 大刻度属性
    majorTickColor: { type: String, default: "#333" },
    majorTickWidth: { type: Number, default: 4 },
    majorTickLen: { type: Number, default: 20 },
    majorTickDistance: { type: Number, default: 0 }, // 距离边框的距离
};
