import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入antd 组件库
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

// 全局配置请求
import { setGlobalOptions } from 'vue-request';
setGlobalOptions({
    manual: false,
});

createApp(App).use(store).use(router).use(Antd).mount('#app')
