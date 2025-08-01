import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./"),
            "@components": path.resolve(__dirname, "./components"),
            "@utils": path.resolve(__dirname, "./utils"),
        },
    },
    root: path.resolve(__dirname, "./dev"),
    server: {
        port: 3001,
        open: true,
    },
    build: {
        outDir: "../dist-dev",
    },
});
