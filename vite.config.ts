import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path';
// const{resolve}  = require('path')
const fs = require('fs')
const dotenv = require('dotenv')

const envFiles = [
  /** default file */ `.env`,
]

for (const file of envFiles) {
  
  const envConfig = dotenv.parse(fs.readFileSync(file))
  for (const k in envConfig) {
    process.env[k] = envConfig[k]
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_URL,
  build: {
    // target: 'modules',
    // outDir: 'dist',
    // assetsDir: 'assets',
    // minify: 'terser' // 混淆器
  },
  plugins: [vue()],
  resolve: {
    alias: {
        // 设置别名
      '@':path.resolve(__dirname, 'src')
    }
  },
  server: {
    // 配置端口号
    port: 8000,
    open: true,
    cors: true,
    proxy: {
        '/api': {
            target: 'http://localhost:3000',   //代理接口
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  
})
