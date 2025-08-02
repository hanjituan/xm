<template>
    <div class="demo-container">
        <h3>可配置显示选项演示</h3>
        <p>展示分页器和导航按钮的显示/隐藏配置。</p>

        <div class="config-controls">
            <label>
                <input type="checkbox" v-model="showPagination" />
                显示分页器
            </label>
            <label>
                <input type="checkbox" v-model="showNavigation" />
                显示导航按钮
            </label>
        </div>

        <div class="swiper-wrapper">
            <SwiperSimple
                :img-list="configImages"
                :auto-play="true"
                :play-time="3"
                :infinite="true"
                :show-pagination="showPagination"
                :show-navigation="showNavigation"
                :keys-control="true"
            />
        </div>

        <div class="info-panel">
            <h4>当前配置</h4>
            <ul>
                <li>
                    分页器显示:
                    <span :class="showPagination ? 'enabled' : 'disabled'">{{ showPagination ? "开启" : "关闭" }}</span>
                </li>
                <li>
                    导航按钮显示:
                    <span :class="showNavigation ? 'enabled' : 'disabled'">{{ showNavigation ? "开启" : "关闭" }}</span>
                </li>
                <li>🎯 无论何种配置，键盘控制始终有效</li>
                <li>🔄 自动播放和无限循环保持开启</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { SwiperSimple } from "vue3-xm";

// 配置状态
const showPagination = ref(true);
const showNavigation = ref(true);

// 配置示例图片
const configImages = ref([
    "https://picsum.photos/id/1018/400/600",
    "https://picsum.photos/id/1025/400/600",
    "https://picsum.photos/id/1039/400/600",
    "https://picsum.photos/id/1043/400/600",
    "https://picsum.photos/id/1051/400/600",
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

.config-controls {
    display: flex;
    gap: 20px;
    margin: 20px 0;
    padding: 16px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.config-controls label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    color: #333;
    cursor: pointer;
}

.config-controls input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
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

.enabled {
    color: #28a745;
    font-weight: bold;
}

.disabled {
    color: #dc3545;
    font-weight: bold;
}
</style>
