/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'vue-video-player/src'

declare module 'mui-player'

declare module '@amap/amap-jsapi-loader'
declare interface Window {
  AMap: any
  initAMap: any
}
declare module 'returnCitySN';

declare module 'vite-plugin-compress'

declare module 'vite-plugin-compression'