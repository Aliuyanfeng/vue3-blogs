<template>
  <TopNav :isHaveBackground="true" />

  <Loading :isSuccess="loading" />

  <main class="blog-main">
    
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

// 加载loding
const loading = ref<boolean>(false);
// 是否有背景色
const isHaveBackground = ref<boolean>(true);

onMounted(() => {
 
});
</script>
<style langt="scss" scoped>
.center {
  width: 100vw;
  height: 100vh;
}
</style>
