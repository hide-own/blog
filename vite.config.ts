import {fileURLToPath, URL} from "node:url";
import {defineConfig} from "vite";
import vue from '@vitejs/plugin-vue'
import Components from "unplugin-vue-components/vite";
import {AntDesignVueResolver} from "unplugin-vue-components/resolvers";

export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [AntDesignVueResolver()], //按需引入
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)), //别名
        },
    },
    base: "./", // 打包路径
    server: {
        open: false, // 服务启动时是否自动打开浏览器
        cors: true, // 允许跨域
    },
    build: {
        // chunkSizeWarningLimit: 1500, 大文件报警阈值设置,不建议使用
        rollupOptions: {
            output: {
                //静态资源分拆打包
                chunkFileNames: "static/js/[name]-[hash].js",
                entryFileNames: "static/js/[name]-[hash].js",
                assetFileNames: "static/[ext]/[name]-[hash].[ext]",
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        return id
                            .toString()
                            .split("node_modules/")[1]
                            .split("/")[0]
                            .toString(); //分割大型文件
                    }
                },
            },
        },
        terserOptions: {
            compress: {
                //清除console和debugger
                drop_console: false,
                drop_debugger: true,
            },
        },
    },
});
