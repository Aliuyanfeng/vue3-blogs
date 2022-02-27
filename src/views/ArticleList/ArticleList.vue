<template>
  <TopNav :isHaveBackground="true" />

  <Loading :isSuccess="loading" />

  <main class="blog-main">
    <div class="article-container">
      <a-card hoverable style="width: 290px" class="artice-item" v-for="(item,index) in articleData.list">
        <template #cover>
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        </template>
        <template class="ant-card-actions" #actions>
          <FireOutlined  :style="{color:'red'}"/>
          <LikeOutlined :style="{color:'#1890FF'}"/>
          <ShareAltOutlined />
        </template>
        <a-card-meta :title="item.article_title">
          <template #avatar>
            <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          </template>
          <template #description>
            <div class="txt-hidden-1">
            {{item.article_description}}
            </div>
          </template>
        </a-card-meta>
      </a-card>
    </div>
    
    <div class="pagination-container">
      <a-pagination @change="onChange" :total="articleData.total" :page-size="10" />
    </div>

  </main>
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

import { getArticleList } from '@/api/article';

import { message } from "ant-design-vue";

import { FireOutlined, LikeOutlined, ShareAltOutlined } from '@ant-design/icons-vue';

// 加载loding
const loading = ref<boolean>(false);
// 是否有背景色
const isHaveBackground = ref<boolean>(true);


onMounted(() => {
 _getArticleList()
});


// 文章total
// const total = ref<number>(0)
// 文章limit
// const limit = ref<number>(10)
// 文章页数
// const page = ref<number>(1)
// 文章列表
const articleData = reactive({
  total:0,
  limit:10,
  page:1,
  list:<any>[]
})

// 获取文章
const _getArticleList = async () =>{
  let res = await getArticleList({
    page:articleData.page,
    limit:articleData.limit,
  })

  if(res.code  === 200){
    articleData.total = res.total
    articleData.list = res.data
  }else{
    message.error(res);
  }

}

// 分页器change 事件
const onChange = (pageNum:number) => {
  articleData.page = pageNum
  _getArticleList()
}
</script>
<style lang="scss" scoped>
.blog-main{

  .article-container{

    display: flex;
    flex-wrap: wrap; 
    .artice-item{
      &:nth-of-type(n+5){
        margin-top: 15px;
      }
      &:not(:nth-of-type(4n+1)){
        margin-left: calc((1200px - 1160px) / 3);
      }
    }
  }

  .pagination-container{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  
}
</style>
