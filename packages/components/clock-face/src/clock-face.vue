<template>
    <div class="clock-face" ref="container" :style="{ width: `${canvasSize}px`, height: `${canvasSize}px` }">
        <canvas ref="canvas" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave"></canvas>
    </div>
</template>

<script setup>
import { onMounted, watch, ref, onBeforeUnmount, nextTick } from "vue";
import clockProps from "./clock-props";

const props = defineProps(clockProps);

const emit = defineEmits(["sector-hover"]);

const canvas = ref(null);
const container = ref(null);
const canvasSize = ref(props.size);
let resizeObserver = null;

const sectorGeometries = ref([]);

function timeToAngle({ h, m, s }) {
    let deg = (h % 12) * 30 + m * 0.5 + s * (0.5 / 60);
    return ((deg - 90) * Math.PI) / 180;
}

function normalizeAngle(angle) {
    angle = angle % (2 * Math.PI);
    return angle < 0 ? angle + 2 * Math.PI : angle;
}

function isPointInSector(x, y, sector, cx, cy) {
    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < sector.inner || dist > sector.outer) return false;
    let angle = Math.atan2(dy, dx);
    angle = normalizeAngle(angle);
    let start = normalizeAngle(sector.startAngle);
    let end = normalizeAngle(sector.endAngle);
    if (end < start) end += 2 * Math.PI;
    if (angle < start) angle += 2 * Math.PI;
    return angle >= start && angle <= end;
}

function draw() {
    const ctx = canvas.value.getContext("2d");

    // 获取设备像素比，适配高 DPI 屏幕
    const dpr = window.devicePixelRatio || 1;
    const displaySize = canvasSize.value;
    const actualSize = displaySize * dpr;

    // 设置 canvas 实际大小
    canvas.value.width = actualSize;
    canvas.value.height = actualSize;

    // 设置 canvas 显示大小
    canvas.value.style.width = displaySize + "px";
    canvas.value.style.height = displaySize + "px";

    // 缩放绘图上下文以适配设备像素比
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, displaySize, displaySize);

    const cx = displaySize / 2;
    const cy = displaySize / 2;
    const r_outer = cx - 10; // 外圈半径

    // 绘制背景
    if (props.backgroundColor && props.backgroundColor !== "transparent") {
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, r_outer, 0, 2 * Math.PI);
        ctx.fillStyle = props.backgroundColor;
        ctx.fill();
        ctx.restore();
    }

    // 绘制外圈
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r_outer, 0, 2 * Math.PI);
    ctx.lineWidth = props.borderWidth;
    ctx.strokeStyle = props.borderColor;
    ctx.stroke();
    ctx.restore();

    // 主刻度参数
    const major_num = 12;
    // 次刻度参数
    const minor_num = 60;

    // 绘制主刻度
    for (let i = 0; i < major_num; i++) {
        let angle = (i / major_num) * 2 * Math.PI;
        let sin = Math.sin(angle),
            cos = Math.cos(angle);
        // 新增: 大刻度距离边框的距离
        let startR = r_outer - props.majorTickDistance - props.majorTickLen;
        let endR = r_outer - props.majorTickDistance;
        let x1 = cx + startR * sin;
        let y1 = cy - startR * cos;
        let x2 = cx + endR * sin;
        let y2 = cy - endR * cos;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineWidth = props.majorTickWidth;
        ctx.strokeStyle = props.majorTickColor;
        ctx.stroke();
        ctx.restore();
    }

    // 绘制次刻度
    for (let i = 0; i < minor_num; i++) {
        if (i % 5 === 0) continue;
        let angle = (i / minor_num) * 2 * Math.PI;
        let sin = Math.sin(angle),
            cos = Math.cos(angle);
        // 新增: 小刻度距离边框的距离
        let startR = r_outer - props.minorTickDistance - props.minorTickLen;
        let endR = r_outer - props.minorTickDistance;
        let x1 = cx + startR * sin;
        let y1 = cy - startR * cos;
        let x2 = cx + endR * sin;
        let y2 = cy - endR * cos;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineWidth = props.minorTickWidth;
        ctx.strokeStyle = props.minorTickColor;
        ctx.stroke();
        ctx.restore();
    }

    // 扇形
    sectorGeometries.value = [];
    props.sectors.forEach((sector, idx) => {
        let startAngle = timeToAngle(sector.from);
        let endAngle = timeToAngle(sector.to);
        // 扇形环的位置（分成100份, 100最外圈, 0最中心）
        let startPercent =
            sector.startPos !== undefined ? sector.startPos : props.startPos !== undefined ? props.startPos : 30;
        let endPercent = sector.endPos !== undefined ? sector.endPos : props.endPos !== undefined ? props.endPos : 90;
        // startPos作为内圈，endPos作为外圈，现在100是最外圈
        let ringInner = r_outer * (startPercent / 100);
        let ringOuter = r_outer * (endPercent / 100);

        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, ringOuter, startAngle, endAngle, false);
        ctx.arc(cx, cy, ringInner, endAngle, startAngle, true);
        ctx.closePath();
        ctx.fillStyle = sector.color || "rgba(0,180,255,0.3)";
        ctx.fill();
        ctx.restore();
        sectorGeometries.value.push({
            startAngle,
            endAngle,
            inner: ringInner,
            outer: ringOuter,
            idx,
            data: sector,
        });
    });

    // 绘制中心文字
    if (props.centerText) {
        const style = props.centerTextStyle;
        ctx.save();

        // 设置字体样式，字体大小按显示尺寸计算
        ctx.font = `${style.fontWeight} ${style.fontSize}px ${style.fontFamily}`;
        ctx.fillStyle = style.color;
        ctx.textAlign = style.textAlign;
        ctx.textBaseline = style.textBaseline;

        // 绘制文字
        ctx.fillText(props.centerText, cx, cy);

        ctx.restore();
    }
}
function handleMouseMove(e) {
    const rect = canvas.value.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = canvasSize.value / 2;
    const cy = canvasSize.value / 2;

    let found = false;
    for (const sector of sectorGeometries.value) {
        if (isPointInSector(x, y, sector, cx, cy)) {
            emit("sector-hover", { index: sector.idx, sector: sector.data });
            found = true;
            break;
        }
    }
    if (!found) {
        emit("sector-hover", null);
    }
}

function handleMouseLeave() {
    emit("sector-hover", null);
}

function handleResize(entries) {
    for (const entry of entries) {
        const rect = entry.contentRect;
        const minSize = Math.min(rect.width, rect.height);
        canvasSize.value = Math.max(100, Math.min(1000, Math.floor(minSize)));
        nextTick(draw);
    }
}

onMounted(() => {
    draw();
    if (container.value) {
        resizeObserver = new window.ResizeObserver(handleResize);
        resizeObserver.observe(container.value);
    }
});
watch(
    () => [
        props.size,
        props.centerText,
        props.centerTextStyle,
        props.sectors,
        props.borderColor,
        props.borderWidth,
        props.backgroundColor,
        props.minorTickColor,
        props.minorTickWidth,
        props.minorTickLen,
        props.minorTickDistance,
        props.majorTickColor,
        props.majorTickWidth,
        props.majorTickLen,
        props.majorTickDistance,
        props.startPos,
        props.endPos,
    ],
    draw,
    { deep: true }
);
onBeforeUnmount(() => {
    if (resizeObserver && container.value) {
        resizeObserver.unobserve(container.value);
        resizeObserver.disconnect();
    }
});
</script>

<style scoped>
.clock-face {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 100%;
}
</style>
