import { defineConfig } from 'vite';
import * as path from 'path';
import react from '@vitejs/plugin-react';
import commonjs from 'vite-plugin-commonjs';
export default defineConfig({
    assetsInclude: ['**/*.exr', '**/*.hdr'],
    optimizeDeps: {
        exclude: ['electron'], // 告诉 Vite 排除预构建 electron，不然会出现 __diranme is not defined
    },
    plugins: [react(), commonjs()],
    server: {
        port: 8888,
        cors: true, // 允许跨域
        hmr: true, // 开启热更新
    },
    base: './',
    css: {
        preprocessorOptions: {
            less: {
                math: 'always',
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
});
