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
        }>> & Readonly<{}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {}, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
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
        }>> & Readonly<{}>, {}, {}, {}, {}, {}>;
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
    }>> & Readonly<{}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, {}, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
        $slots: {
            leftBtn?(_: {}): any;
            rightBtn?(_: {}): any;
        };
    });
};
export default _default;
//# sourceMappingURL=index.d.ts.map