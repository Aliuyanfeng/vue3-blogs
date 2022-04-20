import { defineConfig, loadEnv } from 'vite'

import vue from '@vitejs/plugin-vue'

import { visualizer } from 'rollup-plugin-visualizer';

import viteCompression  from 'vite-plugin-compression'

import viteImagemin from 'vite-plugin-imagemin'

import {
  createStyleImportPlugin,
  AndDesignVueResolve,
} from 'vite-plugin-style-import'

import path from 'path';

import resolveExternalsPlugin  from 'vite-plugin-resolve-externals'

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
    base: loadEnv(mode,process.cwd()).VITE_BASE_URL,//打包根目录
    build: {
      target: 'esnext',
      // outDir: 'dist', //输出目录
      // assetsDir: 'assets',
      // minify: 'terser' // 混淆器
      terserOptions: {
        // 生产环境下移除console
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    plugins: [
      vue(),
      resolveExternalsPlugin({
        AMap: 'AMap',
        returnCitySN: 'returnCitySN'
      }),
      visualizer(),
      viteCompression({
        ext: '.gz',//gz br
        algorithm: 'gzip', //brotliCompress gzip
        deleteOriginFile:true
      }),
      viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false
        },
        optipng: {
          optimizationLevel: 7
        },
        mozjpeg: {
          quality: 20
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox'
            },
            {
              name: 'removeEmptyAttrs',
              active: false
            }
          ]
        }
      }),
      createStyleImportPlugin({
        resolves: [
          AndDesignVueResolve(),
        ],
        libs: [
          // If you don’t have the resolve you need, you can write it directly in the lib, or you can provide us with PR
          {
            libraryName: 'ant-design-vue',
            esModule: true,
            resolveStyle: (name) => {
              return `ant-design-vue/es/${name}/style/index`
            },
          },
        ],
      }),
    ],
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
            // target: 'https://aliuyanfeng.top:3000',   //代理接口
            target:"http://localhost:3000",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/getIp': {
          // https://pv.sohu.com/cityjson?ie=utf-8
          target:"https://pv.sohu.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\//, '')
      }
      }
    },
    
  })
  
}

