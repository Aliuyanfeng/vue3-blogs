<template>
  <router-view></router-view>
</template>

<script lang="ts">
// 不使用setup 语法糖写法
  import { defineComponent,onMounted,ref,computed } from 'vue';
  import HelloWorld from "@/components/HelloWorld.vue";
  import TopNav from "@/components/nav/TopNav.vue"

  export default defineComponent({
    name:'App',
    setup() {
    
     return{
      
      }
    },
    components:{
      HelloWorld,
      TopNav,
    },
   

  })
</script>

<style  lang="scss">

@import "@/assets/css/reset.css";

#app{
  position: relative;
}


</style>
