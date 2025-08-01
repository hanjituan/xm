import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [
        vue(),
        dts({
            insertTypesEntry: true,
            include: ["packages/**/*"],
            exclude: ["node_modules", "dist", "docs"],
        }),
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "packages"),
        },
    },
    build: {
        lib: {
            entry: resolve(__dirname, "packages/components/index.ts"),
            name: "XMComponents",
            fileName: (format) => `index.${format}.js`,
            formats: ["es", "umd"],
        },
        rollupOptions: {
            external: ["vue", "dayjs", "echarts", "@vueuse/core"],
            output: {
                globals: {
                    vue: "Vue",
                    dayjs: "dayjs",
                    echarts: "echarts",
                    "@vueuse/core": "VueUse",
                },
                exports: "named",
            },
        },
        cssCodeSplit: false,
        sourcemap: true,
        minify: "terser",
    },
});
