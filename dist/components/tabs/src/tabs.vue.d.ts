export interface TabItem {
    value: string;
    label: string;
    url?: string;
}
export interface TabsProps {
    /**
     * 选项卡数据数组
     */
    tabs?: TabItem[];
    /**
     * 当前选中的值 (v-model)
     */
    modelValue?: string;
}
declare function __VLS_template(): {
    default?(_: {
        item: TabItem;
        index: number;
    }): any;
};
declare const __VLS_component: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<TabsProps>, {
    tabs: () => ({
        value: string;
        label: string;
        url: string;
    } | {
        value: string;
        label: string;
        url?: undefined;
    })[];
    modelValue: string;
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (value: string) => void;
    "update:modelValue": (value: string) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<TabsProps>, {
    tabs: () => ({
        value: string;
        label: string;
        url: string;
    } | {
        value: string;
        label: string;
        url?: undefined;
    })[];
    modelValue: string;
}>>> & Readonly<{
    onChange?: ((value: string) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
}>, {
    tabs: TabItem[];
    modelValue: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
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
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=tabs.vue.d.ts.map