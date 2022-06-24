<template>
  <TopNav :isHaveBackground="true" />

  <Loading :isSuccess="loading" />

  <main class="blog-main">
    <div class="article-container">
      <a-card hoverable style="width: 290px" class="artice-item" v-for="(item,index) in (articleData.list)" :key="item.id">
        <template #cover>
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            v-if="!item.article_cover"
          />
          <img :src="item.article_cover" alt="" v-else>
        </template>
        <template class="ant-card-actions" #actions>
          <FireOutlined  :style="{color:'red'}" v-if="item.article_importance == 3"/>
          <a-tooltip placement="top">
            <template #title>
              <span>点赞数</span>
            </template>
            <div>
              <LikeOutlined :style="{color:'#1890FF'}"/> {{item.article_like}}
            </div>
          </a-tooltip>
          
          <a-tooltip placement="top">
            <template #title>
              <span>分享</span>
            </template>
            <ShareAltOutlined @click="copyShareUrl(item)"/>
          </a-tooltip>
        </template>
        <a-card-meta :title="item.article_title" @click="jumpArticleDetail(item)">
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

import { message,notification } from "ant-design-vue";

import { FireOutlined, LikeOutlined, ShareAltOutlined } from '@ant-design/icons-vue';

import { articleInfoInterface } from '@/interface/article'
// 加载loding
const loading = ref<boolean>(false);
// 是否有背景色
const isHaveBackground = ref<boolean>(true);

const router = useRouter()

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
  list:Array as unknown as articleInfoInterface[]
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
const onChange = (...rest:Event[]) => {
  articleData.page = rest[0] as unknown as number
  _getArticleList()
}

// 复制分享链接
const copyShareUrl = (article:articleInfoInterface) =>{
  let oInput = document.createElement("input");
  oInput.value = `${import.meta.env.VITE_BASE_API}#/articleDetail/${article.id}`;
  document.body.appendChild(oInput);
  oInput.select(); // 选择对象;
  // document.execCommand("Copy"); // 执行浏览器复制命令 即将被弃用
  navigator.clipboard.writeText(oInput.value).then(function() {
      notification.success({
        message: '复制成功',
        description:
          '不同浏览器有差异性,建议使用Google浏览器访问',
      });
  }, function() {
     notification.success({
        message: '复制失败',
        description:
          '不同浏览器有差异性,建议使用Google浏览器访问',
      });
  });
  oInput.remove();
}

// 跳转文章详情、
const jumpArticleDetail = (article:articleInfoInterface) =>{
  router.push({
    path:`/articleDetail/${article.id}`
  })
}
</script>
<style lang="scss" scoped>
.blog-main{

  .article-container{

    display: flex;
    flex-wrap: wrap; 
    ::v-deep() .artice-item{
      &:nth-of-type(n+5){
        margin-top: 15px;
      }
      &:not(:nth-of-type(4n+1)){
        margin-left: calc((1200px - 1160px) / 3);
      }

      .ant-card-cover {
        height: 180px;
        img {
          height: 100%;
        }
      }
    }
  }

  .pagination-container{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 15px;
  }
  
}
</style>
