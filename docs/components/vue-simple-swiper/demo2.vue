<template>
    <div class="demo-container">
        <h3>高级轮播图配置</h3>
        <p>这个示例展示了自动播放、无限循环、自定义按钮等高级功能。</p>

        <div class="controls">
            <button @click="toggleAutoPlay" :class="['control-btn', { active: isAutoPlay }]">
                {{ isAutoPlay ? "⏸️ 暂停自动播放" : "▶️ 开始自动播放" }}
            </button>
            <button @click="toggleInfinite" :class="['control-btn', { active: isInfinite }]">
                {{ isInfinite ? "🔄 关闭循环" : "🔄 开启循环" }}
            </button>
            <div class="speed-control">
                <label>播放速度:</label>
                <select v-model="playSpeed" @change="onSpeedChange">
                    <option value="1">1秒</option>
                    <option value="2">2秒</option>
                    <option value="3">3秒</option>
                    <option value="5">5秒</option>
                </select>
            </div>
        </div>

        <div class="swiper-wrapper">
            <SwiperSimple
                :img-list="advancedImages"
                :auto-play="isAutoPlay"
                :play-time="playSpeed"
                :infinite="isInfinite"
                :keys-control="true"
                ref="swiperRef"
            >
                <template #leftBtn>
                    <button class="custom-btn custom-btn-left" @click="prevSlide">⬅️ 上一张</button>
                </template>
                <template #rightBtn>
                    <button class="custom-btn custom-btn-right" @click="nextSlide">下一张 ➡️</button>
                </template>
            </SwiperSimple>
        </div>

        <div class="stats-panel">
            <div class="stat-item">
                <h4>当前配置</h4>
                <div class="config-list">
                    <div class="config-item">
                        <span class="config-label">自动播放:</span>
                        <span :class="['config-value', isAutoPlay ? 'enabled' : 'disabled']">
                            {{ isAutoPlay ? "开启" : "关闭" }}
                        </span>
                    </div>
                    <div class="config-item">
                        <span class="config-label">播放间隔:</span>
                        <span class="config-value">{{ playSpeed }}秒</span>
                    </div>
                    <div class="config-item">
                        <span class="config-label">无限循环:</span>
                        <span :class="['config-value', isInfinite ? 'enabled' : 'disabled']">
                            {{ isInfinite ? "开启" : "关闭" }}
                        </span>
                    </div>
                    <div class="config-item">
                        <span class="config-label">图片数量:</span>
                        <span class="config-value">{{ advancedImages.length }}张</span>
                    </div>
                </div>
            </div>

            <div class="stat-item">
                <h4>操作提示</h4>
                <div class="tips-list">
                    <div class="tip">🖱️ 点击自定义按钮控制轮播</div>
                    <div class="tip">⌨️ 键盘左右箭头键快速切换</div>
                    <div class="tip">🖼️ 点击底部缩略图精确跳转</div>
                    <div class="tip">⚙️ 实时调整播放设置</div>
                    <div class="tip">🔄 体验不同的循环模式</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { SwiperSimple } from "vue3-xm";

// 高级示例图片 - 更多图片
const advancedImages = ref([
    "https://picsum.photos/seed/demo2-1/400/600",
    "https://picsum.photos/seed/demo2-2/400/600",
    "https://picsum.photos/seed/demo2-3/400/600",
    "https://picsum.photos/seed/demo2-4/400/600",
    "https://picsum.photos/seed/demo2-5/400/600",
    "https://picsum.photos/seed/demo2-6/400/600",
    "https://picsum.photos/seed/demo2-7/400/600",
    "https://picsum.photos/seed/demo2-8/400/600",
]);

// 控制状态
const isAutoPlay = ref(true);
const isInfinite = ref(true);
const playSpeed = ref(3);
const swiperRef = ref(null);

// 切换自动播放
const toggleAutoPlay = () => {
    isAutoPlay.value = !isAutoPlay.value;
    // 这里可以调用组件的方法来动态控制播放状态
    nextTick(() => {
        if (swiperRef.value) {
            if (isAutoPlay.value) {
                swiperRef.value.play?.();
            } else {
                swiperRef.value.stop?.();
            }
        }
    });
};

// 切换无限循环
const toggleInfinite = () => {
    isInfinite.value = !isInfinite.value;
};

// 播放速度变化
const onSpeedChange = () => {
    // 重新启动自动播放以应用新的速度
    if (isAutoPlay.value && swiperRef.value) {
        swiperRef.value.stop?.();
        setTimeout(() => {
            swiperRef.value.play?.();
        }, 100);
    }
};

// 手动切换到下一张
const nextSlide = () => {
    if (swiperRef.value) {
        swiperRef.value.nextPage?.();
    }
};

// 手动切换到上一张
const prevSlide = () => {
    if (swiperRef.value) {
        swiperRef.value.prevPage?.();
    }
};
</script>

<style scoped>
.demo-container {
    padding: 24px;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    margin: 20px 0;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.controls {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 24px;
    padding: 16px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.control-btn {
    padding: 10px 16px;
    border: 2px solid #007bff;
    border-radius: 6px;
    background: white;
    color: #007bff;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
    font-weight: 500;
}

.control-btn:hover {
    background: #007bff;
    color: white;
}

.control-btn.active {
    background: #007bff;
    color: white;
}

.speed-control {
    display: flex;
    align-items: center;
    gap: 8px;
}

.speed-control label {
    font-weight: 500;
    color: #666;
}

.speed-control select {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
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

.custom-btn {
    background: rgba(0, 123, 255, 0.9);
    color: white;
    border: none;
    padding: 12px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

.custom-btn:hover {
    background: rgba(0, 123, 255, 1);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 123, 255, 0.4);
}

.stats-panel {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 20px;
}

.stat-item {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stat-item h4 {
    margin: 0 0 16px 0;
    color: #333;
    font-size: 18px;
    border-bottom: 2px solid #007bff;
    padding-bottom: 8px;
}

.config-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 0;
    padding: 8px 0;
    border-bottom: 1px solid #f0f0f0;
}

.config-label {
    font-weight: 500;
    color: #666;
}

.config-value {
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 14px;
}

.config-value.enabled {
    background: #d4edda;
    color: #155724;
}

.config-value.disabled {
    background: #f8d7da;
    color: #721c24;
}

.tips-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.tip {
    padding: 10px 12px;
    background: #f8f9fa;
    border-radius: 6px;
    border-left: 4px solid #28a745;
    color: #666;
    font-size: 14px;
}

@media (max-width: 768px) {
    .controls {
        flex-direction: column;
    }

    .stats-panel {
        grid-template-columns: 1fr;
    }

    .speed-control {
        justify-content: space-between;
    }
}
</style>
