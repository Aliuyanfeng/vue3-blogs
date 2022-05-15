<template>
  <Loading :isSuccess="loading" />
  <a-layout-header class="header">
    <TopNav :isHaveBackground="true" />
  </a-layout-header>
  <a-layout style="min-height: calc(100vh - 87px)">
    <a-layout-sider v-model:collapsed="collapsed" collapsible class="site-layout-background">
       
      <a-menu theme="light" v-model:selectedKeys="selectedKeys" mode="inline"  @click="_getClassifyNote($event as any)">
         <div v-for="(item,index) in data2" :key="item!.id">
          <template v-if="item.children!.length == 0">
            <a-menu-item :key="item!.id">
              <BranchesOutlined />
              <span>{{item!.classify_name}}</span>
            </a-menu-item>
          </template>
          <template v-else>
            <a-sub-menu :key="item!.id">
              <template #title>
                <span>
                  <BookOutlined />
                  <span>{{item!.classify_name}}</span>
                </span>
              </template>
              
              <div v-for="(item2,index2) in item!.children" :key="item2!.id">
                <template v-if="item2.children!.length == 0">
                  <a-menu-item :key="item2.id">{{item2!.classify_name}}</a-menu-item>
                </template>
                <template v-else>
                  <a-sub-menu :key="item2!.id" :title="item2!.classify_name">
                    <a-menu-item v-for="(item3,index3) in item2!.children" :key="item3!.id">{{item3.classify_name}}</a-menu-item>
                  </a-sub-menu>
                </template>
              </div>
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
          <a-breadcrumb-item>{{isNoteName}}</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }" >
          <ul v-if="selectedKeys.length > 0 && noteList.length > 0 " class="note-list">
            <li v-for="item,index in noteList">
              <div class="markdown-body" v-html="item.note_html"></div>
            </li>
          </ul>
           <a-result title="嗨, 来记一笔吧!" v-else>
              <template #icon>
                <smile-twoTone />
              </template>
            </a-result>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>

  <Footer></Footer>
</template>
<script setup lang="ts">
import 'github-markdown-css'
import {
  ref,
  onMounted,
  onUpdated,
  onUnmounted,
  reactive,
  computed,
  nextTick,
  PropType,
  VNodeChild
} from "vue";

import TopNav from "@/components/nav/TopNav.vue";

import Loading from "@/components/loading/loading.vue";

import Footer from "@/components/footer.vue";

import { useRouter } from "vue-router";

import {
  BranchesOutlined,
  BookOutlined
} from '@ant-design/icons-vue';

import { getAllNoteCategory, getClassifyNote } from '@/api/note'

import { InoteCategory, MenuInfo, InoteItem } from '@/interface/note'

// 加载loding
const loading = ref<boolean>(false);
// 是否有背景色

const selectedKeys = ref<string[]>([]); //选择的分类key

const collapsed = ref<boolean>(false); //左侧导航是否展开

const data2 = ref<InoteCategory[]>([]); //分类导航列表

const noteList = ref<InoteItem[]>([]); //分类导航列表(无用)

const data = reactive({
    allCategory:<InoteCategory>[],//分类导航列表(无用)
})

const isNoteName = ref<string>(''); //选择的分类名称

onMounted(() => {
  _getAllNoteCategory()
});

// 获取所有导航分类
const _getAllNoteCategory = async () => {
  await getAllNoteCategory().then(res=>{
    if(res.code === 200){
      data.allCategory = res.data
      data2.value = res.data
    }
  })
}

// 获取指定分类下的笔记
const _getClassifyNote = async (e: MenuInfo) =>{
  isNoteName.value = (e.domEvent.target as HTMLElement).innerText
  let formdata = {id:e.key,type:2}
  await getClassifyNote(formdata).then(res =>{
    if(res.code === 200){
      noteList.value = res.data
    }
  })
}
</script>
<style langt="scss" scoped>
.note-list{
    list-style: none;
}
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
