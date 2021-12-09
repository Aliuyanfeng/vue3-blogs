<template>
   <TopNav :isHaveBackground=isHaveBackground />

   <Loading :isSuccess="loading"/>

   <main>
     <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="Title"
        :breadcrumb="{ routes }"
        sub-title="This is a subtitle"
        :ghost="false"
    />
   </main>
</template>
<script lang="ts" setup>

import {ref,onMounted, onUpdated, onUnmounted,reactive} from 'vue'

import TopNav from '@/components/nav/TopNav.vue'

import Loading from '@/components/loading/loading.vue'

import { getArticleDetail } from "@/api/article";

const loading = ref<boolean>(true)

const isHaveBackground = ref<boolean>(true)

onMounted(() => {
  _getArticleDetail()
})

 var articleInfo = reactive({})

 const _getArticleDetail = async ()=>{
    let formData = {id:78}
    await getArticleDetail(formData).then((res)=>{
      console.warn(res)
      if(res.code === 200){
        articleInfo = res.data[0]
        loading.value = false
      }
    })
  }
setTimeout(() => {
    loading.value = false
}, 2000)

const routes = [
  {
    path: 'index',
    breadcrumbName: '首页',
  },
  {
    path: 'first',
    breadcrumbName: '文章列表',
  },
  {
    path: 'second',
    breadcrumbName: '文章详情',
  },
];

</script>

<style lang="scss" scoped>
main{
    width: 1200px;
    margin: 0 auto;
    // background-color: #fff;
    padding-top: 75px;
    box-sizing: border-box;
  
}
</style>