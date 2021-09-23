import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path';
// const{resolve}  = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
        // 设置别名
      '@':path.resolve(__dirname, 'src')
    }
  },
  server: {
    // 配置端口号
    port:8080
  }
})
