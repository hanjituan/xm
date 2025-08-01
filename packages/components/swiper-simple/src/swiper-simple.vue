<template>
    <div class="swiper-wrapper">
        <div class="swiper-container" ref="con">
            <div class="swiper-item" v-for="(img, index) in imgs" :key="index">
                <img :src="img" alt="" />
            </div>
        </div>
        <div class="pagenation">
            <div v-for="(img, index) in imgs" class="page-item" :key="index">
                <img :src="img" :class="{ active: scrollIndex == index }" @click="jumpByIndex(index)" alt="" />
            </div>
        </div>
        <div class="btn">
            <slot name="leftBtn">
                <button class="btn-left" @click="prevPage">←</button>
            </slot>
            <slot name="rightBtn">
                <button class="btn-right" @click="nextPage">→</button>
            </slot>
        </div>
    </div>
</template>

<script>
import props from "./props";
export default {
    name: "swiper-simple",
    data() {
        return {
            offset: 0,
            swiperContainer: null,
            scrollIndex: 0,
            timer: null,
            imgs: [],
        };
    },
    props: {
        ...props,
    },

    mounted() {
        this.$nextTick(() => {
            this.imgs = [...this.imgList];
            this.swiperContainer = document.querySelector(".swiper-container");
            if (this.keysControl) {
                window.addEventListener("keydown", this.keydown);
            }
            if (this.autoPlay) {
                this.play();
            } else {
                this.stop();
            }
        });
    },
    destroyed() {
        window.removeEventListener("keydown", this.keydown);
    },
    methods: {
        start() {},
        pauze() {},

        play() {
            this.timer = setInterval(() => {
                this.nextPage(true);
            }, this.playTime * 1000);
        },

        stop() {
            if (this.timer) {
                this.clearInterval(this.timer);
            }
        },

        keydown(e) {
            if (!this.swiperContainer) {
                console.warn("please keep sure that dom is loaded");
                return;
            }
            // right arrow
            if (e.keyCode === 39) {
                this.nextPage();
            }
            // left arrow
            if (e.keyCode === 37) {
                this.prevPage();
            }
        },

        nextPage() {
            this.scrollIndex++;
            if (this.scrollIndex > this.imgs.length - 1) {
                if (this.infinite) {
                    this.imgs = this.imgs.concat(this.imgs);
                    this.$nextTick(() => {
                        this.nextFn();
                    });
                    // setTimeout(() => {
                    //   this.imgs = this.imgs.splice(0, this.imgList.length);
                    // }, 100);
                } else {
                    this.scrollIndex = this.imgs.length - 1;
                }
                return;
            }
            this.nextFn();
        },

        nextFn() {
            this.offset = -400 * this.scrollIndex;
            this.swiperContainer.style.transform = `translateX(${this.offset}px)`;
            this.scrollIntoViews();
        },

        prevPage() {
            this.scrollIndex--;
            if (this.scrollIndex < 0) {
                this.scrollIndex = 0;
                return;
            }
            this.offset = -400 * this.scrollIndex;
            this.swiperContainer.style.transform = `translateX(${this.offset}px)`;
            this.scrollIntoViews();
        },

        jumpByIndex(index) {
            this.scrollIndex = index + 1;
            this.prevPage();
            this.scrollIntoViews();
        },

        scrollIntoViews() {
            const pages = document.querySelector(".pagenation");
            const currentPageEl = [...pages.childNodes][this.scrollIndex];
            if (!currentPageEl) {
                return;
            }
            currentPageEl.scrollIntoView({
                behavior: "smooth",
            });
        },
    },
};
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
