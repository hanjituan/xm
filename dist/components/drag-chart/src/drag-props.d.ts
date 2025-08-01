import { PropType } from 'vue';
import { default as dayjs } from 'dayjs';

declare const _default: {
    timeRange: {
        type: PropType<(string | Date | dayjs.Dayjs)[]>;
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
};
export default _default;
//# sourceMappingURL=drag-props.d.ts.map