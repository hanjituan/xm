declare const _default: {
    size: {
        type: NumberConstructor;
        default: number;
    };
    centerText: {
        type: StringConstructor;
        default: string;
    };
    centerTextStyle: {
        type: ObjectConstructor;
        default: () => {
            fontSize: number;
            fontFamily: string;
            color: string;
            fontWeight: string;
            textAlign: string;
            textBaseline: string;
        };
    };
    sectors: {
        type: ArrayConstructor;
        default: () => {
            from: {
                h: number;
                m: number;
                s: number;
            };
            to: {
                h: number;
                m: number;
                s: number;
            };
            color: string;
            startPos: number;
            endPos: number;
        }[];
    };
    startPos: number;
    endPos: number;
    borderColor: {
        type: StringConstructor;
        default: string;
    };
    borderWidth: {
        type: NumberConstructor;
        default: number;
    };
    backgroundColor: {
        type: StringConstructor;
        default: string;
    };
    minorTickColor: {
        type: StringConstructor;
        default: string;
    };
    minorTickWidth: {
        type: NumberConstructor;
        default: number;
    };
    minorTickLen: {
        type: NumberConstructor;
        default: number;
    };
    minorTickDistance: {
        type: NumberConstructor;
        default: number;
    };
    majorTickColor: {
        type: StringConstructor;
        default: string;
    };
    majorTickWidth: {
        type: NumberConstructor;
        default: number;
    };
    majorTickLen: {
        type: NumberConstructor;
        default: number;
    };
    majorTickDistance: {
        type: NumberConstructor;
        default: number;
    };
};
export default _default;
//# sourceMappingURL=clock-props.d.ts.map