<template>
  <Loading :isSuccess="loading" />
  <a-layout-header class="header">
    <TopNav :isHaveBackground="true" />
  </a-layout-header>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible class="site-layout-background">
      <a-menu theme="light" v-model:selectedKeys="selectedKeys" mode="inline">
        <a-menu-item key="1">
          <pie-chart-outlined />
          <span>正则表达式</span>
        </a-menu-item>
        <a-menu-item key="2">
          <desktop-outlined />
          <span>CSS3</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined />
              <span>HTML5</span>
            </span>
          </template>
          <a-menu-item key="3">SEO</a-menu-item>
          <a-menu-item key="4">Bill</a-menu-item>
          <a-menu-item key="5">Alex</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <team-outlined />
              <span>JavaScript</span>
            </span>
          </template>
          <a-menu-item key="6">ES6</a-menu-item>
          <a-menu-item key="8">indexOf</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="9">
          <file-outlined />
          <span>插件</span>
        </a-menu-item>
        <!-- <a-sub-menu key="sub3">
          <template #title>
            <span>
              <team-outlined />
              <span>infinite</span>
            </span>
          </template>
          <a-menu-item key="10">infinite 1</a-menu-item>
           <a-sub-menu key="sub4">
              <template #title>
                <span>
                  <team-outlined />
                  <span>infinite</span>
                </span>
              </template>
              <a-menu-item key="11">infinite 1</a-menu-item>
              <a-menu-item key="12">infinite 2</a-menu-item>
            </a-sub-menu>
        </a-sub-menu> -->
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <!-- <a-layout-header style="background: #fff; padding: 0" /> -->
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>笔记</a-breadcrumb-item>
          <a-breadcrumb-item>options1</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          Bill is a cat.
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>

  <Footer></Footer>
</template>
<script setup lang="ts">
import {
  ref,
  onMounted,
  onUpdated,
  onUnmounted,
  reactive,
  computed,
  nextTick,
} from "vue";

import TopNav from "@/components/nav/TopNav.vue";

import Loading from "@/components/loading/loading.vue";

import Footer from "@/components/footer.vue";

import { useRouter } from "vue-router";

import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from '@ant-design/icons-vue';

// 加载loding
const loading = ref<boolean>(false);
// 是否有背景色
const isHaveBackground = ref<boolean>(true);

const selectedKeys = ref<string[]>(["1"]);

const collapsed = ref<boolean>(false);

onMounted(() => {});
</script>
<style langt="scss" scoped>
.ant-layout-header{
  line-height: inherit;
  height: 57px;
}
.center {
  width: 100vw;
  height: 100vh;
}
.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>
