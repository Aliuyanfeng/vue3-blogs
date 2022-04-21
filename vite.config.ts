import { defineConfig, loadEnv } from 'vite'

import vue from '@vitejs/plugin-vue'

import { visualizer } from 'rollup-plugin-visualizer';

import viteCompression from 'vite-plugin-compression'

import viteImagemin from 'vite-plugin-imagemin'

import {
  createStyleImportPlugin,
  AndDesignVueResolve,
} from 'vite-plugin-style-import'

import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components';

import path from 'path';

import resolveExternalsPlugin from 'vite-plugin-resolve-externals'

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
    base: loadEnv(mode, process.cwd()).VITE_PUBLIC_PATH,//打包根目录
    build: {
      // target: 'modules',
      // outDir: 'dist', //输出目录
      // assetsDir: 'assets',
      minify: 'esbuild', // 混淆器
      chunkSizeWarningLimit: 500,
      cssCodeSplit: true,
      terserOptions: {
        // 生产环境下移除console
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        output: {
          // 去掉注释内容
          comments: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            // 拆分代码
            vue: ['vue', 'vue-router', 'vuex'],
            'ant-design-vue': ['ant-design-vue'],
            echarts: ['echarts'],
          },
        },
      },
      brotliSize:false // 默认为true
      // sourcemap:true
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
      viteCompression(),
      viteImagemin(),
      // createStyleImportPlugin({
      //   resolves: [
      //     AndDesignVueResolve(),
      //   ],
      //   libs: [
      //     // If you don’t have the resolve you need, you can write it directly in the lib, or you can provide us with PR
      //     {
      //       libraryName: 'ant-design-vue',
      //       esModule: true,
      //       resolveStyle: (name) => {
      //         return `ant-design-vue/es/${name}/style/index`
      //       },
      //     },
      //   ],
      // }),
      ViteComponents({
        customComponentResolvers: [AntDesignVueResolver()],
      }),
    ],
    resolve: {
      alias: {
        // 设置别名
        '@': path.resolve(__dirname, 'src')
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
          target: "http://localhost:3000",
          // target: "https://localhost:3001",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/getIp': {
          // https://pv.sohu.com/cityjson?ie=utf-8
          target: "https://pv.sohu.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\//, '')
        }
      }
    },

  })

}

