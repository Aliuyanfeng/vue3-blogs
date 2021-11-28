<template>
     <!-- 首页加载动画 -->
  <div class="loading_page" v-if="isSuccess">
    <div class="loader">
      <div class="text">Loading...</div>
      <div class="horizontal">
        <div class="circlesup">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
        <div class="circlesdwn">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
      </div>
      <div class="vertical">
        <div class="circlesup">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
        <div class="circlesdwn">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- 首页加载动画结束 -->
</template>
<script lang="ts" setup>
    import {ref,computed } from 'vue';
    const props = defineProps({
        isSuccess: Boolean,
    }); 
   

</script>
<style lang="scss" scoped>
@import "@/assets/css/loading.scss";
</style>