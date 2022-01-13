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
        <a-descriptions-item label="备注">暂无</a-descriptions-item>
        <a-descriptions-item label="居住地址"> 暂无 </a-descriptions-item>
       
      </a-descriptions>
      <a-divider />
       <a-descriptions title="Skill Information">
        <a-descriptions-item label="职位">Web前端开发</a-descriptions-item>
        <a-descriptions-item label="爱好">吉他、美食、Coding</a-descriptions-item>
        <a-descriptions-item label="备注">暂无</a-descriptions-item>
        <a-descriptions-item label="技能">
            熟练掌握HTML5/ES6/CSS3/JavaScript等前端开发技能,了解Typescript语言;
            <br>
            熟悉Node.js
        </a-descriptions-item>
      </a-descriptions>
      <a-divider />
       <a-descriptions title="Contacts" :column="2">
        <a-descriptions-item label="邮箱"> 1773189480@qq.com </a-descriptions-item>
         <a-descriptions-item label="联系方式">1810000000</a-descriptions-item>
        <a-descriptions-item label="GitHub">
             <a href="https://github.com/vueComponent/ant-design-vue">
                github.com/vueComponent/ant-design-vue
              </a>
        </a-descriptions-item>
      </a-descriptions>
    </a-drawer>
  </div>
</template>
<script lang="ts">
import ADescriptionsItem from "ant-design-vue";
import { defineComponent, ref,withDefaults,defineProps,computed,inject,Ref} from "vue";


export default defineComponent({
  components: {
    ADescriptionsItem,
  },
  props:{
    isopen:{
        type:Boolean,
    },
  },
  setup(props,ctx) {
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
      ctx.emit('closeDrawer')
    };
    
    visible.value = props.isopen
    
    const visible2 = computed(() => {
        return props.isopen
    })

    return {
      visible,
      pStyle,
      pStyle2,
      onClose,
      visible2
    };
  },
});
</script>

<style lang="scss" scoped></style>
