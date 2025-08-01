import { default as dayjs } from 'dayjs';

declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    timeRange: {
        type: import('vue').PropType<(string | Date | dayjs.Dayjs)[]>;
        default: () => dayjs.Dayjs[];
    };
    startIcon: {
        type: StringConstructor;
        default: string;
    };
    endIcon: {
        type: StringConstructor;
        default: string;
    };
    symbolSize: {
        type: NumberConstructor;
        default: number;
    };
    valueData: {
        type: ArrayConstructor;
        default: () => never[];
    };
    activeTime: {
        type: ArrayConstructor;
        default: () => number[];
    };
    interval: {
        type: NumberConstructor;
        default: number;
    };
    autoInterval: {
        type: BooleanConstructor;
        default: boolean;
    };
    needClick: {
        type: BooleanConstructor;
        default: boolean;
    };
    maxRange: {
        type: NumberConstructor;
        default: number;
    };
    minRange: {
        type: NumberConstructor;
        default: number;
    };
    coverColor: {
        type: StringConstructor;
        default: string;
    };
    lineColor: {
        type: StringConstructor;
        default: string;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:activeTime": (...args: any[]) => void;
    outOfRange: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    timeRange: {
        type: import('vue').PropType<(string | Date | dayjs.Dayjs)[]>;
        default: () => dayjs.Dayjs[];
    };
    startIcon: {
        type: StringConstructor;
        default: string;
    };
    endIcon: {
        type: StringConstructor;
        default: string;
    };
    symbolSize: {
        type: NumberConstructor;
        default: number;
    };
    valueData: {
        type: ArrayConstructor;
        default: () => never[];
    };
    activeTime: {
        type: ArrayConstructor;
        default: () => number[];
    };
    interval: {
        type: NumberConstructor;
        default: number;
    };
    autoInterval: {
        type: BooleanConstructor;
        default: boolean;
    };
    needClick: {
        type: BooleanConstructor;
        default: boolean;
    };
    maxRange: {
        type: NumberConstructor;
        default: number;
    };
    minRange: {
        type: NumberConstructor;
        default: number;
    };
    coverColor: {
        type: StringConstructor;
        default: string;
    };
    lineColor: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{
    "onUpdate:activeTime"?: ((...args: any[]) => any) | undefined;
    onOutOfRange?: ((...args: any[]) => any) | undefined;
}>, {
    timeRange: (string | Date | dayjs.Dayjs)[];
    startIcon: string;
    endIcon: string;
    symbolSize: number;
    valueData: unknown[];
    activeTime: unknown[];
    interval: number;
    autoInterval: boolean;
    needClick: boolean;
    maxRange: number;
    minRange: number;
    coverColor: string;
    lineColor: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
//# sourceMappingURL=drag-chart.vue.d.ts.map