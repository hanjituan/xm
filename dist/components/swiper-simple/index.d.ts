import { App } from 'vue';
import { default as SwiperSimple } from './src/swiper-simple.vue';
import { SwiperProps } from './src/props';

export { SwiperSimple };
export type { SwiperProps };
declare const _default: {
    install: (app: App) => void;
    SwiperSimple: {
        new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('vue').ExtractPropTypes<{
            imgList: {
                type: import('vue').PropType<string[]>;
                required: true;
            };
            autoPlay: {
                type: import('vue').PropType<boolean>;
                required: true;
            };
            playTime: {
                type: import('vue').PropType<string | number>;
                required: true;
            };
            keysControl: {
                type: import('vue').PropType<boolean>;
                required: true;
            };
            infinite: {
                type: import('vue').PropType<boolean>;
                required: true;
            };
            hoverPause: {
                type: import('vue').PropType<boolean>;
                required: true;
            };
            showPagination: {
                type: import('vue').PropType<boolean>;
                required: true;
            };
            showNavigation: {
                type: import('vue').PropType<boolean>;
                required: true;
            };
        }>> & Readonly<{}>, {
            nextPage: (isAutoPlay?: boolean) => void;
            prevPage: () => void;
            jumpByIndex: (index: number) => void;
            play: () => void;
            stop: () => void;
            realIndex: Readonly<import('vue').Ref<number, number>>;
            scrollIndex: Readonly<import('vue').Ref<number, number>>;
            isPlaying: import('vue').ComputedRef<boolean>;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {}, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import('vue').ExtractPropTypes<{
            imgList: {
                type: import('vue').PropType<string[]>;
                required: true;
            };
            autoPlay: {
                type: import('vue').PropType<boolean>;
                required: true;
            };
            playTime: {
                type: import('vue').PropType<string | number>;
                required: true;
            };
            keysControl: {
                type: import('vue').PropType<boolean>;
                required: true;
            };
            infinite: {
                type: import('vue').PropType<boolean>;
                required: true;
            };
            hoverPause: {
                type: import('vue').PropType<boolean>;
                required: true;
            };
            showPagination: {
                type: import('vue').PropType<boolean>;
                required: true;
            };
            showNavigation: {
                type: import('vue').PropType<boolean>;
                required: true;
            };
        }>> & Readonly<{}>, {
            nextPage: (isAutoPlay?: boolean) => void;
            prevPage: () => void;
            jumpByIndex: (index: number) => void;
            play: () => void;
            stop: () => void;
            realIndex: Readonly<import('vue').Ref<number, number>>;
            scrollIndex: Readonly<import('vue').Ref<number, number>>;
            isPlaying: import('vue').ComputedRef<boolean>;
        }, {}, {}, {}, {}>;
        __isFragment?: never;
        __isTeleport?: never;
        __isSuspense?: never;
    } & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
        imgList: {
            type: import('vue').PropType<string[]>;
            required: true;
        };
        autoPlay: {
            type: import('vue').PropType<boolean>;
            required: true;
        };
        playTime: {
            type: import('vue').PropType<string | number>;
            required: true;
        };
        keysControl: {
            type: import('vue').PropType<boolean>;
            required: true;
        };
        infinite: {
            type: import('vue').PropType<boolean>;
            required: true;
        };
        hoverPause: {
            type: import('vue').PropType<boolean>;
            required: true;
        };
        showPagination: {
            type: import('vue').PropType<boolean>;
            required: true;
        };
        showNavigation: {
            type: import('vue').PropType<boolean>;
            required: true;
        };
    }>> & Readonly<{}>, {
        nextPage: (isAutoPlay?: boolean) => void;
        prevPage: () => void;
        jumpByIndex: (index: number) => void;
        play: () => void;
        stop: () => void;
        realIndex: Readonly<import('vue').Ref<number, number>>;
        scrollIndex: Readonly<import('vue').Ref<number, number>>;
        isPlaying: import('vue').ComputedRef<boolean>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, {}, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
        $slots: {
            leftBtn?(_: {}): any;
            rightBtn?(_: {}): any;
        };
    });
};
export default _default;
//# sourceMappingURL=index.d.ts.map