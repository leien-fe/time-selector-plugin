import { defineConfig } from "vite";

export default defineConfig({
    root: "demo", // 设置 demo 文件夹为根目录
    server: {
        port: 3000, // 开发服务器端口
    },
    build: {
        outDir: "../dist/demo", // 输出目录
    },
});