<template>
    <div class="swiper-wrapper" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
        <div class="swiper-container" ref="swiperContainerRef">
            <div class="swiper-item" v-for="(img, index) in displayImgs" :key="`${img}-${index}`">
                <img :src="img" alt="" />
            </div>
        </div>
        <div v-if="propsData.showPagination" class="pagenation" ref="paginationRef">
            <div v-for="(img, index) in imgs" class="page-item" :key="index">
                <img :src="img" :class="{ active: realIndex == index }" @click="jumpByIndex(index)" alt="" />
            </div>
        </div>
        <div v-if="propsData.showNavigation" class="btn">
            <slot name="leftBtn">
                <button class="btn-left" @click="() => prevPage()">←</button>
            </slot>
            <slot name="rightBtn">
                <button class="btn-right" @click="() => nextPage()">→</button>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts" name="SwiperSimple">
import { ref, onMounted, onBeforeUnmount, nextTick, watch, readonly, computed } from "vue";
import props, { type SwiperProps } from "./props";

// Props
const propsData = defineProps<SwiperProps>();

// Reactive data
const offset = ref(0);
const swiperContainerRef = ref<HTMLElement | null>(null);
const paginationRef = ref<HTMLElement | null>(null);
const scrollIndex = ref(0);
const realIndex = ref(0); // 真实的图片索引（用于分页器显示）
const timer = ref<NodeJS.Timeout | null>(null);
const imgs = ref<string[]>([]);
const displayImgs = ref<string[]>([]); // 用于显示的图片数组（包含克隆的首尾图片）
const isHovered = ref(false); // 是否处于悬浮状态
const isPaused = ref(false); // 是否暂停播放

// 初始化显示图片数组
const initDisplayImgs = () => {
    if (propsData.infinite && imgs.value.length > 0) {
        // 无限轮播：在首尾各添加一张图片
        displayImgs.value = [
            imgs.value[imgs.value.length - 1], // 最后一张图片
            ...imgs.value, // 原始图片
            imgs.value[0], // 第一张图片
        ];
        // 初始位置设置为第二张（实际的第一张）
        scrollIndex.value = 1;
        realIndex.value = 0;
    } else {
        // 普通轮播
        displayImgs.value = [...imgs.value];
        scrollIndex.value = 0;
        realIndex.value = 0;
    }
};

// Methods
const play = () => {
    timer.value = setInterval(() => {
        nextPage(true); // 传递 true 表示这是自动播放
    }, Number(propsData.playTime) * 1000);
};

const stop = () => {
    if (timer.value) {
        clearInterval(timer.value);
        timer.value = null;
    }
};

// 鼠标悬浮事件处理
const onMouseEnter = () => {
    if (propsData.hoverPause && propsData.autoPlay) {
        isHovered.value = true;
        isPaused.value = true;
        stop(); // 停止自动播放
    }
};

const onMouseLeave = () => {
    if (propsData.hoverPause && propsData.autoPlay && isPaused.value) {
        isHovered.value = false;
        isPaused.value = false;
        play(); // 恢复自动播放
    }
};

const keydown = (e: KeyboardEvent) => {
    if (!swiperContainerRef.value) {
        console.warn("please keep sure that dom is loaded");
        return;
    }
    // right arrow
    if (e.keyCode === 39) {
        nextPage(); // 键盘操作不是自动播放
    }
    // left arrow
    if (e.keyCode === 37) {
        prevPage();
    }
};

const nextPage = (isAutoPlay = false) => {
    if (!propsData.infinite) {
        // 普通轮播
        if (realIndex.value >= imgs.value.length - 1) {
            // 已经是最后一张，直接返回，避免抖动
            return;
        }
        realIndex.value++;
        scrollIndex.value = realIndex.value;
    } else {
        // 无限轮播
        scrollIndex.value++;
        realIndex.value++;

        if (realIndex.value >= imgs.value.length) {
            realIndex.value = 0;
        }

        // 如果滚动到了克隆的第一张图片位置
        if (scrollIndex.value >= displayImgs.value.length - 1) {
            // 先移动到克隆位置
            offset.value = -400 * scrollIndex.value;
            if (swiperContainerRef.value) {
                swiperContainerRef.value.style.transform = `translateX(${offset.value}px)`;
            }

            // 等动画完成后立即跳到真实的第一张
            setTimeout(() => {
                scrollIndex.value = 1; // 跳到真实的第一张
                if (swiperContainerRef.value) {
                    swiperContainerRef.value.style.transition = "none";
                    swiperContainerRef.value.style.transform = `translateX(-400px)`;
                    // 强制重绘
                    swiperContainerRef.value.offsetHeight;
                    swiperContainerRef.value.style.transition = "all ease 0.3s";
                }
            }, 300);

            // 只有在非自动播放时才滚动分页器
            if (!isAutoPlay) {
                scrollIntoViews();
            }
            return;
        }
    }

    offset.value = -400 * scrollIndex.value;
    if (swiperContainerRef.value) {
        swiperContainerRef.value.style.transform = `translateX(${offset.value}px)`;
    }

    // 只有在非自动播放时才滚动分页器
    if (!isAutoPlay) {
        scrollIntoViews();
    }
};

const prevPage = () => {
    if (!propsData.infinite) {
        // 普通轮播
        if (realIndex.value <= 0) {
            // 已经是第一张，直接返回，避免抖动
            return;
        }
        realIndex.value--;
        scrollIndex.value = realIndex.value;
    } else {
        // 无限轮播
        scrollIndex.value--;
        realIndex.value--;

        if (realIndex.value < 0) {
            realIndex.value = imgs.value.length - 1;
        }

        // 如果滚动到了克隆的最后一张图片位置
        if (scrollIndex.value <= 0) {
            // 先移动到克隆位置
            offset.value = -400 * scrollIndex.value;
            if (swiperContainerRef.value) {
                swiperContainerRef.value.style.transform = `translateX(${offset.value}px)`;
            }

            // 等动画完成后立即跳到真实的最后一张
            setTimeout(() => {
                scrollIndex.value = displayImgs.value.length - 2; // 跳到真实的最后一张
                if (swiperContainerRef.value) {
                    swiperContainerRef.value.style.transition = "none";
                    swiperContainerRef.value.style.transform = `translateX(${-400 * scrollIndex.value}px)`;
                    // 强制重绘
                    swiperContainerRef.value.offsetHeight;
                    swiperContainerRef.value.style.transition = "all ease 0.3s";
                }
            }, 300);

            scrollIntoViews();
            return;
        }
    }

    offset.value = -400 * scrollIndex.value;
    if (swiperContainerRef.value) {
        swiperContainerRef.value.style.transform = `translateX(${offset.value}px)`;
    }

    scrollIntoViews();
};

const jumpByIndex = (index: number) => {
    realIndex.value = index;
    if (propsData.infinite) {
        scrollIndex.value = index + 1; // 因为无限轮播时第一张是克隆的最后一张
    } else {
        scrollIndex.value = index;
    }

    offset.value = -400 * scrollIndex.value;
    if (swiperContainerRef.value) {
        swiperContainerRef.value.style.transform = `translateX(${offset.value}px)`;
    }
    scrollIntoViews();
};

const scrollIntoViews = () => {
    // 如果分页器被隐藏，直接返回
    if (!propsData.showPagination || !paginationRef.value) return;

    const currentPageEl = paginationRef.value.children[realIndex.value] as HTMLElement;
    if (!currentPageEl) {
        return;
    }

    // 不使用 scrollIntoView，而是手动计算滚动位置
    const container = paginationRef.value;
    const elementLeft = currentPageEl.offsetLeft;
    const elementWidth = currentPageEl.offsetWidth;
    const containerWidth = container.offsetWidth;
    const containerScrollLeft = container.scrollLeft;

    // 计算是否需要滚动
    const elementRight = elementLeft + elementWidth;
    const containerRight = containerScrollLeft + containerWidth;

    let newScrollLeft = containerScrollLeft;

    // 如果元素在容器右侧不可见，向右滚动
    if (elementRight > containerRight) {
        newScrollLeft = elementLeft - containerWidth + elementWidth;
    }
    // 如果元素在容器左侧不可见，向左滚动
    else if (elementLeft < containerScrollLeft) {
        newScrollLeft = elementLeft;
    }

    // 平滑滚动到计算出的位置
    container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
    });
};

// Lifecycle
onMounted(() => {
    nextTick(() => {
        imgs.value = [...propsData.imgList];
        initDisplayImgs();

        // 设置初始位置
        if (propsData.infinite && imgs.value.length > 0) {
            offset.value = -400 * scrollIndex.value;
            if (swiperContainerRef.value) {
                swiperContainerRef.value.style.transition = "none";
                swiperContainerRef.value.style.transform = `translateX(${offset.value}px)`;
                // 强制重绘后恢复动画
                swiperContainerRef.value.offsetHeight;
                swiperContainerRef.value.style.transition = "all ease 0.3s";
            }
        }

        if (propsData.keysControl) {
            window.addEventListener("keydown", keydown);
        }
        if (propsData.autoPlay) {
            play();
        } else {
            stop();
        }
    });
});

onBeforeUnmount(() => {
    window.removeEventListener("keydown", keydown);
    stop();
});

// Watch for prop changes
watch(
    () => propsData.imgList,
    (newValue) => {
        imgs.value = [...newValue];
        initDisplayImgs();

        // 重置位置
        if (propsData.infinite && imgs.value.length > 0) {
            offset.value = -400 * scrollIndex.value;
            if (swiperContainerRef.value) {
                swiperContainerRef.value.style.transform = `translateX(${offset.value}px)`;
            }
        } else {
            offset.value = 0;
            if (swiperContainerRef.value) {
                swiperContainerRef.value.style.transform = `translateX(0px)`;
            }
        }
    },
    { deep: true }
);

watch(
    () => propsData.autoPlay,
    (newValue) => {
        if (newValue) {
            // 只有在没有悬浮时才开始播放
            if (!isHovered.value) {
                play();
            }
        } else {
            stop();
        }
    }
);

// 暴露组件方法给父组件
defineExpose({
    nextPage,
    prevPage,
    jumpByIndex,
    play,
    stop,
    // 只读的状态
    realIndex: readonly(realIndex),
    scrollIndex: readonly(scrollIndex),
    isPlaying: computed(() => timer.value !== null),
});
</script>

<style scoped>
.swiper-wrapper {
    width: 400px;
    height: 600px;
    overflow: hidden;
    position: relative;
    margin: 50px auto;
}

.swiper-container {
    transform: translateY(0);
    transition: all ease 0.3s;
    overflow: visible;
    width: fit-content;
    font-size: 0;
    display: flex;
}

.swiper-item {
    width: 400px;
    height: 600px;
    flex-shrink: 0;
}

img {
    width: 100%;
    height: 100%;
}

.pagenation {
    position: absolute;
    bottom: 0;
    z-index: 1;
    width: 400px;
    height: 100px;
    display: flex;
    overflow: hidden;
    box-shadow: 3px 3px 10px #ddd;
}

.pagenation img {
    width: 100px;
    height: 100px;
    filter: grayscale(1);
    cursor: pointer;
    transition: all ease 0.3s;
}

.pagenation img:hover {
    filter: grayscale(0.5) !important;
}

.active {
    filter: grayscale(0) !important;
}

.btn {
    position: absolute;
    top: 50%;
    transform: translateY(-18px);
    width: 400px;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
    z-index: 2;
    padding: 0 4px;
}

.btn-left,
.btn-right {
    pointer-events: auto;
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    line-height: 20px;
    text-align: center;
    background: rgba(255, 255, 255, 0.3);
    color: #fff;
    cursor: pointer;
    transition: all ease 0.3s;
}

.btn-left:hover,
.btn-right:hover {
    background: rgba(255, 255, 255, 0.4);
    transition: all ease 0.3s;
}
</style>
