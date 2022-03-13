<template>
  <TopNav :isHaveBackground="true" />

  <Loading :isSuccess="loading" />

  <main class="blog-main">
    <a-space direction="vertical" class="exam-row">
      <div class="exam-container">
        <a-col :span="18">
            1.问答题
        </a-col>
        <a-col :span="6"> 答题卡组件 </a-col>
      </div>
    </a-space>
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

import {
  TrophyTwoTone,
  AppstoreTwoTone,
  HourglassTwoTone,
  SwapOutlined,
  RetweetOutlined,
  ShareAltOutlined,
  SendOutlined,
} from "@ant-design/icons-vue";

import { notification } from "ant-design-vue";
// 加载loding
const loading = ref<boolean>(false);
// 是否有背景色
const isHaveBackground = ref<boolean>(true);

const router = useRouter();

onMounted(() => {});
</script>
<style lang="scss" scoped>
.blog-main {
  .exam-row {
    width: 100%;
    margin: 0;

    .exam-container{
        display: flex;
        justify-content: space-between;
    }
  }
}
</style>
