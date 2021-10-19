<template>
  <!-- 首页加载动画 -->
  <div class="loading_page" v-if="false">
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
  <TopNav></TopNav>

  <router-view></router-view>
</template>

<script lang="ts">
// 不适用setup 语法糖写法
  import { defineComponent,onMounted,ref } from 'vue';
  import HelloWorld from "@/components/HelloWorld.vue";
  import TopNav from "@/components/nav/TopNav.vue"
  export default defineComponent({
    name:'App',
    setup() {
      
     
    },
    components:{
      HelloWorld,
      TopNav,
    },
    

  })
</script>

<style  lang="scss">
@import "@/assets/css/loading.scss";
@import "@/assets/css/reset.css";

#app{
  position: relative;
}


</style>
