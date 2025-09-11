import { defineConfig } from "vitepress";
import { resolve } from "path";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "XM Components",
    description: "Modern Vue 3 Component Library",
    base: "/xm/", // GitHub Pages 部署路径
    head: [
        [
            "link",
            { rel: "icon", href: "/xm/favicon.svg", type: "image/svg+xml" },
        ],
        ["link", { rel: "icon", href: "/xm/favicon.ico", sizes: "any" }],
        ["link", { rel: "apple-touch-icon", href: "/xm/favicon.svg" }],
        ["meta", { name: "theme-color", content: "#FFD700" }],
    ],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: "/logo.svg",

        nav: [
            { text: "Home", link: "/" },
            { text: "Guide", link: "/guide/getting-started" },
            { text: "Components", link: "/components/" },
        ],

        sidebar: {
            "/guide/": [
                {
                    text: "Guide",
                    items: [
                        {
                            text: "Getting Started",
                            link: "/guide/getting-started",
                        },
                    ],
                },
            ],
            "/components/": [
                {
                    text: "Components",
                    items: [
                        { text: "Overview", link: "/components/" },
                        { text: "Drag Chart", link: "/components/drag-chart/" },
                        {
                            text: "Vue Simple Swiper",
                            link: "/components/vue-simple-swiper/",
                        },
                        { text: "Tabs", link: "/components/tabs/" },
                        { text: "Clock Face", link: "/components/clock-face/" },
                        { text: "ECharts", link: "/components/echarts/" },
                    ],
                },
            ],
        },

        socialLinks: [
            {
                icon: "github",
                link: "https://github.com/hanjituan/xm",
            },
        ],

        footer: {
            message: "Released under the MIT License.",
            copyright: "Copyright © 2025 XM Components",
        },

        editLink: {
            pattern: "https://github.com/hanjituan/xm/pulls",
        },

        lastUpdated: {
            text: "Updated at",
            formatOptions: {
                dateStyle: "full",
                timeStyle: "medium",
            },
        },
    },
});
