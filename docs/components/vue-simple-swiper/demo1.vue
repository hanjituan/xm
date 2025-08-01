<template>
    <div class="demo-container">
        <h3>基础轮播图</h3>
        <p>这是一个基础的轮播图示例，展示默认配置和基本功能。</p>

        <div class="swiper-wrapper">
            <SwiperSimple :img-list="basicImages" :auto-play="false" :keys-control="true" />
        </div>

        <div class="info-panel">
            <h4>功能说明</h4>
            <ul>
                <li>🖱️ 点击左右按钮切换图片</li>
                <li>⌨️ 使用键盘左右箭头键控制</li>
                <li>🖼️ 点击底部缩略图跳转</li>
                <li>📱 支持触摸手势（移动端）</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { SwiperSimple } from "vue3-xm";

// 基础示例图片
const basicImages = ref([
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1520637836862-4d197d17c0a9?w=400&h=600&fit=crop",
]);
</script>

<style scoped>
.demo-container {
    padding: 24px;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    margin: 20px 0;
    background: #f8f9fa;
}

.swiper-wrapper {
    display: flex;
    justify-content: center;
    margin: 20px 0;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.info-panel {
    background: white;
    padding: 20px;
    border-radius: 8px;
    margin-top: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.info-panel h4 {
    margin: 0 0 16px 0;
    color: #333;
    font-size: 18px;
    border-bottom: 2px solid #007bff;
    padding-bottom: 8px;
}

.info-panel ul {
    margin: 0;
    padding-left: 0;
    list-style: none;
}

.info-panel li {
    margin: 12px 0;
    padding: 8px 12px;
    background: #f8f9fa;
    border-radius: 6px;
    border-left: 4px solid #007bff;
    color: #666;
}
</style>
