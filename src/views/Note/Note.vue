<template>
  <Loading :isSuccess="loading" />
  <a-layout-header class="header">
    <TopNav :isHaveBackground="true" />
  </a-layout-header>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible class="site-layout-background">
       
      <a-menu theme="light" v-model:selectedKeys="selectedKeys" mode="inline">
         <div v-for="(item,index) in data2" :key="item!.id">
          <template v-if="item.children!.length == 0">
            <a-menu-item :key="item!.id">
              <pie-chart-outlined />
              <span>{{item!.name}}</span>
            </a-menu-item>
          </template>
          <template v-else>
            <a-sub-menu :key="item!.id">
              <template #title>
                <span>
                  <user-outlined />
                  <span>{{item!.name}}</span>
                </span>
              </template>
              <a-menu-item v-for="(item2,index2) in item!.children" :key="item2!.id">{{item2!.name}}</a-menu-item>
            </a-sub-menu>
          </template>
        </div>
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
  PropType
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

import { getAllNoteCategory } from '@/api/note'

interface InoteCategory{
  id?:number,
  name?:string,
  children?:InoteCategory[], 
}
// 加载loding
const loading = ref<boolean>(false);
// 是否有背景色

const selectedKeys = ref<string>();

const collapsed = ref<boolean>(false);

let data2 = ref<InoteCategory[]>([])

const data = reactive({
    allCategory:<InoteCategory>[]
})

onMounted(() => {
  _getAllNoteCategory()  
});

const _getAllNoteCategory = async () => {
  await getAllNoteCategory().then(res=>{
    if(res.code === 200){
      data.allCategory = res.data
      data2.value = res.data
    }
  })
}
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
