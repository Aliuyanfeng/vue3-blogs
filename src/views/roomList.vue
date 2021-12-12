<template>
  <div>
    <TopNav :isHaveBackground="true" />
    <main>
      roomlsit
    </main>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUpdated, onUnmounted, reactive, computed ,onBeforeUnmount} from "vue";

import TopNav from "@/components/nav/TopNav.vue";


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
