import { defineConfig } from "vite";
import * as path from "path";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";
import inject from "@rollup/plugin-inject";

export default defineConfig({
  assetsInclude: ["**/*.exr", "**/*.hdr"],
  // optimizeDeps: {
  //   include: ["quill-image-resize-module/image-resize.min.js"],
  // },
  plugins: [
    react(),
    commonjs(),
    inject({
      "window.Quill": ["react-quill", "Quill"],
      Quill: ["react-quill", "Quill"],
    }),
  ],
  server: {
    port: 6008,
    cors: true, // 允许跨域
    hmr: true, // 开启热更新
    proxy: {
      "/api": {
        target: "http://hz1.xondria.cn:6008", // 设置要代理到的主机名
        changeOrigin: true,
      },
    },
  },

  base: "./",
  css: {
    preprocessorOptions: {
      less: {
        math: "always",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "window.Quill": "quill/dist/quill.js",
      Quill: "quill/dist/quill.js",
    },
  },
});
