<template>
    <div class="swiper-wrapper">
        <div class="swiper-container" ref="swiperContainerRef">
            <div class="swiper-item" v-for="(img, index) in imgs" :key="index">
                <img :src="img" alt="" />
            </div>
        </div>
        <div class="pagenation" ref="paginationRef">
            <div v-for="(img, index) in imgs" class="page-item" :key="index">
                <img :src="img" :class="{ active: scrollIndex == index }" @click="jumpByIndex(index)" alt="" />
            </div>
        </div>
        <div class="btn">
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
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from "vue";
import props, { type SwiperProps } from "./props";

// Props
const propsData = defineProps<SwiperProps>();

// Reactive data
const offset = ref(0);
const swiperContainerRef = ref<HTMLElement | null>(null);
const paginationRef = ref<HTMLElement | null>(null);
const scrollIndex = ref(0);
const timer = ref<NodeJS.Timeout | null>(null);
const imgs = ref<string[]>([]);

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
    scrollIndex.value++;
    if (scrollIndex.value > imgs.value.length - 1) {
        if (propsData.infinite) {
            imgs.value = imgs.value.concat(imgs.value);
            nextTick(() => {
                nextFn(isAutoPlay);
            });
        } else {
            scrollIndex.value = imgs.value.length - 1;
        }
        return;
    }
    nextFn(isAutoPlay);
};

const nextFn = (isAutoPlay = false) => {
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
    scrollIndex.value--;
    if (scrollIndex.value < 0) {
        scrollIndex.value = 0;
        return;
    }
    offset.value = -400 * scrollIndex.value;
    if (swiperContainerRef.value) {
        swiperContainerRef.value.style.transform = `translateX(${offset.value}px)`;
    }
    scrollIntoViews();
};

const jumpByIndex = (index: number) => {
    scrollIndex.value = index;
    offset.value = -400 * scrollIndex.value;
    if (swiperContainerRef.value) {
        swiperContainerRef.value.style.transform = `translateX(${offset.value}px)`;
    }
    scrollIntoViews();
};

const scrollIntoViews = () => {
    if (!paginationRef.value) return;

    const currentPageEl = paginationRef.value.children[scrollIndex.value] as HTMLElement;
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
        scrollIndex.value = 0;
        offset.value = 0;
        if (swiperContainerRef.value) {
            swiperContainerRef.value.style.transform = `translateX(0px)`;
        }
    },
    { deep: true }
);

watch(
    () => propsData.autoPlay,
    (newValue) => {
        if (newValue) {
            play();
        } else {
            stop();
        }
    }
);
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
    display: inline-block;
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
