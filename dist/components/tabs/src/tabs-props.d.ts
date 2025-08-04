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
export interface TabsEmits {
    "update:modelValue": (value: string) => void;
    change: (value: string) => void;
}
//# sourceMappingURL=tabs-props.d.ts.map