import { SwiperProps } from './props';

declare function __VLS_template(): {
    leftBtn?(_: {}): any;
    rightBtn?(_: {}): any;
};
declare const __VLS_component: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_TypePropsToRuntimeProps<SwiperProps>>, {
    nextPage: (isAutoPlay?: boolean) => void;
    prevPage: () => void;
    jumpByIndex: (index: number) => void;
    play: () => void;
    stop: () => void;
    realIndex: Readonly<import('vue').Ref<number, number>>;
    scrollIndex: Readonly<import('vue').Ref<number, number>>;
    isPlaying: import('vue').ComputedRef<boolean>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_TypePropsToRuntimeProps<SwiperProps>>> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=swiper-simple.vue.d.ts.map