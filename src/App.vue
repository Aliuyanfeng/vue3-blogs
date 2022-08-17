<template>
  <router-view></router-view>

  <div class="about-affix-wrap">
    <a-button type="default" size="large" @click="openDrawer">
      <template #icon>
        <LeftSquareOutlined />
      </template>
    </a-button>
    <a-button type="default" size="large">
      <template #icon>
        <CommentOutlined />
      </template>
    </a-button>
  </div>

  <aboutDrawer :isopen="isOpenAboutDrawer" @closeDrawer="isCloseAboutDrawer"></aboutDrawer>
  
</template>

<script lang="ts">
// 不使用setup 语法糖写法
import { DownloadOutlined,LeftSquareOutlined,CommentOutlined } from "@ant-design/icons-vue";
import { defineComponent, onMounted, ref, computed ,provide} from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import TopNav from "@/components/nav/TopNav.vue";
import aboutDrawer from "@/components/drawer/aboutDrawer.vue";

export default defineComponent({
  name: "App",
  setup() {

    const isOpenAboutDrawer = ref<boolean>(false)
    // 打开抽屉func
    const openDrawer = ()=>{
      isOpenAboutDrawer.value = true
    }
    // 关闭drawer 子组件来触发
    const isCloseAboutDrawer = ()=>{
      isOpenAboutDrawer.value = false
    }

    let aMapScript = document.createElement('script')
    aMapScript.setAttribute('src', 'https://pv.sohu.com/cityjson?ie=utf-8')
    document.head.appendChild(aMapScript)

    return {
      openDrawer,
      isOpenAboutDrawer,
      isCloseAboutDrawer,
    };
  },
  components: {
    aboutDrawer,
    HelloWorld,
    TopNav,
    DownloadOutlined,
    LeftSquareOutlined,
    CommentOutlined,
    

  },
});
</script>

<style lang="scss">
@import "@/assets/css/reset";

@import "@/assets/css/public";

#app {
  position: relative;
}

.about-affix-wrap {
  position: fixed;
  right: 0;
  top: 50%;
  display: flex;
  flex-direction: column;
  // transform: translate(-50%,0);
}
</style>
