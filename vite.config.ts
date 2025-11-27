import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 关键配置：设置 base 为 './'，否则打包后的 Electron 应用找不到 css/js 资源
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})