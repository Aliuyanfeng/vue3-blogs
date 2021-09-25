import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入antd 组件库
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

createApp(App).use(store).use(router).use(Antd).mount('#app')
