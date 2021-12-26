<template>
  <TopNav :isHaveBackground="isHaveBackground" />

  <Loading :isSuccess="loading" />

  <main>
    <a-space direction="vertical" style="width: 100%">
      <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        :title="articleInfo.data.article_title"
        :breadcrumb="{ routes }"
        :ghost="false"
      >
        <template #tags>
          <a-tag
            :color="item['theme_color']"
            v-for="(item, index) in dealTag"
            :key="index"
            >{{ item['classify_name']}}</a-tag
          >
        </template>
      </a-page-header>
      <a-card :loading="loading" :title="articleInfo.data.article_description">
        <div v-html="articleInfo.data.article_content"></div>
      </a-card>
    </a-space>
  </main>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUpdated, onUnmounted, reactive, computed } from "vue";

import TopNav from "@/components/nav/TopNav.vue";

import Loading from "@/components/loading/loading.vue";

import { getArticleDetail } from "../../api/article";

import { getAllTag } from "../../api/index";

import { useStore } from "../../store";

import { useRoute } from "vue-router";

const store = useStore();

const router = useRoute();

const loading = ref<boolean>(true);

const isHaveBackground = ref<boolean>(true);

onMounted(() => {
  _getArticleDetail();
});

// 文章标签
store.dispatch("getAllTag");

const allTag = computed(() => store.state.allTag);

// 文章详情
interface articleInfoInterface {
  id?: number;
  article_title?: string;
  article_description?: string;
  article_like?: string;
  article_read?: string;
  article_createtime?: string;
  article_cover?: string;
  article_tag?: Array<string> | string;
  article_status?: string;
  article_content?: string;
  article_comment?: string;
  article_author?: string;
}
const articleInfo = reactive({ data: <articleInfoInterface>{} });

interface dealTagInterface {
  id?: number;
  classify_name?: string;
  theme_color?: string;
}
const dealTag = ref<object>({});

const _getArticleDetail = async () => {
  let formData = { id: router.params.id };
  await getArticleDetail(formData).then((res) => {
    if (res.code == 200) {
      articleInfo.data = res.data[0];
      var tempTag = articleInfo.data.article_tag?.toString().split(",");
      tempTag?.map((data) => {
        dealTag.value = allTag.value.filter((item) => {
          return tempTag?.includes(item.classify_name);
        });
      });

      loading.value = false;
    }
  });
};

const routes = [
  {
    path: "index",
    breadcrumbName: "首页",
  },
  {
    path: "first",
    breadcrumbName: "文章列表",
  },
  {
    path: "second",
    breadcrumbName: "文章详情",
  },
];
</script>

<style lang="scss" scoped>
main {
  width: 1200px;
  margin: 0 auto;
  // background-color: #fff;
  padding-top: 75px;
  box-sizing: border-box;
}
</style>
