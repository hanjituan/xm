import { PropType } from 'vue';

export interface SwiperProps {
    imgList: string[];
    autoPlay: boolean;
    playTime: number | string;
    keysControl: boolean;
    infinite: boolean;
    hoverPause: boolean;
    showPagination: boolean;
    showNavigation: boolean;
}
declare const _default: {
    imgList: {
        type: PropType<string[]>;
        default: () => never[];
        required: boolean;
    };
    autoPlay: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    playTime: {
        type: PropType<number | string>;
        default: () => number;
    };
    keysControl: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    infinite: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    hoverPause: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    showPagination: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    showNavigation: {
        type: BooleanConstructor;
        default: () => boolean;
    };
};
export default _default;
//# sourceMappingURL=props.d.ts.map