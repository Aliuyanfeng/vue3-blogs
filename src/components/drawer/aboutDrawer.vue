<template>
  <div>
    <a-drawer
      width="640"
      placement="right"
      :closable="false"
      :visible="visible2"
      @close="onClose"
    >
      <a-descriptions title="Personal Profile" :column="3">
        <a-descriptions-item label="姓名">刘艳峰</a-descriptions-item>

        <a-descriptions-item label="期望工作地">哈尔滨、北京</a-descriptions-item>
        <a-descriptions-item label="备注"> 暂无 </a-descriptions-item>
        <a-descriptions-item label="居住地址"> 暂无 </a-descriptions-item>
      </a-descriptions>
      <a-divider />
      <a-descriptions title="Skill Information" :column="2">
        <a-descriptions-item label="职位">Web前端开发</a-descriptions-item>
        <a-descriptions-item label="爱好">吉他、美食、Coding、追剧</a-descriptions-item>

        <a-descriptions-item label="技能">
          熟练使用HTML5、CSS3进行网页页面布局、兼容性调整和优化； <br />
          熟练使用JavaScript进行网页和客户端交互的处理并使用ajax对页面渲染，有数据交互经验；
          <br />
          熟练掌握Bootstrap框架，熟练使用LESS预处理器。
          熟练使用JavaScript、jQuery开发项目，可以实现页面的特效 以及一些动画效果； <br />
          熟练掌握Vue.js框架的应用、Vue全家桶进行项目的开发； <br />
          熟练掌握Node.js后端服务开发，利用框架快速搭建后端项目提供接口转发； <br />
          熟练掌握ES5/6/7语法使用 <br />
          熟练掌握Element、AntDesign、uview、vant等ui库的使用； <br />
          掌握Uni-App的应用，进行小程序开发； <br />
          掌握Vue3+TS，开发过个人博客，了解React、TypeScript进行工程化项目开发 <br />
          掌握GitHub、webpack、vite对于项目的管理和打包构建； <br />
          掌握Linux服务器环境搭建，项目部署； <br />
          掌握Mongodb数据库和Mysql数据库的使用 。 <br />
        </a-descriptions-item>
      </a-descriptions>
      <a-divider />
      <a-descriptions title="Contacts" :column="2">
        <a-descriptions-item label="邮箱"> 1773189480@qq.com </a-descriptions-item>
        <a-descriptions-item label="联系方式">18804625620</a-descriptions-item>
        <a-descriptions-item label="GitHub">
          <a href="https://github.com/vueComponent/ant-design-vue">
            github.com/vueComponent/ant-design-vue
          </a>
        </a-descriptions-item>
        <br />
        <a-descriptions-item label="WebSite">
          <a href="https://aliuyanfeng.top"> https://aliuyanfeng.top </a>
        </a-descriptions-item>
      </a-descriptions>
    </a-drawer>
  </div>
</template>
<script lang="ts">
import ADescriptionsItem from "ant-design-vue";
import {
  defineComponent,
  ref,
  withDefaults,
  defineProps,
  computed,
  inject,
  Ref,
} from "vue";

export default defineComponent({
  components: {
    ADescriptionsItem,
  },
  props: {
    isopen: {
      type: Boolean,
    },
  },
  setup(props, ctx) {
    const visible = ref<boolean>(false);
    const pStyle = {
      fontSize: "16px",
      color: "rgba(0,0,0,0.85)",
      lineHeight: "24px",
      display: "block",
      marginBottom: "16px",
    };
    const pStyle2 = {
      marginBottom: "24px",
    };

    // 关闭drawer
    const onClose = () => {
      ctx.emit("closeDrawer");
    };

    visible.value = props.isopen;

    const visible2 = computed(() => {
      return props.isopen;
    });

    return {
      visible,
      pStyle,
      pStyle2,
      onClose,
      visible2,
    };
  },
});
</script>

<style lang="scss" scoped></style>
