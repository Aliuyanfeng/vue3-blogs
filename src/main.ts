import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store, { key } from './store'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

// 全局配置请求
import { setGlobalOptions } from 'vue-request';
setGlobalOptions({
    manual: false,
});

import { Request } from '@/utils/request';
import VueAxios from 'vue-axios';

import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import VideoPlayer  from 'vue-video-player/src'
import 'videojs-flash'

const app = createApp(App)

app.use(store,key).use(router).use(Antd).use(VideoPlayer ).use(VueAxios,Request.init()).mount('#app')
