import { defineConfig,loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path';


const fs = require('fs')

const dotenv = require('dotenv')

export default ({ command, mode }) => {
  console.error(mode)
  const envFiles = [
    // ${process.env.NODE_ENV}
    /** default file */ `.env.${mode}`,
  ]
  
  for (const file of envFiles) {
  
    const envConfig = dotenv.parse(fs.readFileSync(file))
    for (const k in envConfig) {
      process.env[k] = envConfig[k]
    }
  }
  return defineConfig({
    base: loadEnv(mode,process.cwd()).VITE_BASE_URL,
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
              // target: 'http://aliuyanfeng.top:3000',   //代理接口
              target:"http://localhost:3000",
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    
  })
  
}

