import { defineConfig } from "vitepress";

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
                        { text: "Drag Chart", link: "/components/drag-chart" },
                        {
                            text: "Vue Simple Swiper",
                            link: "/components/vue-simple-swiper",
                        },
                    ],
                },
            ],
        },

        socialLinks: [
            {
                icon: "github",
                link: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            },
        ],

        footer: {
            message: "Released under the MIT License.",
            copyright: "Copyright © 2025 XM Components",
        },

        editLink: {
            pattern:
                "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80",
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
