<template>
   
    <a-row type="flex" justify="center" align="middle" class="center">
         <a-result status="404" title="404" sub-title="对不起，您访问的页面不存在。">
            <template #extra>
            <a-button type="primary" @click="goBack">返回首页</a-button>
            </template>
        </a-result>
    </a-row>
</template>
<script lang="ts" setup>

import { useRouter } from 'vue-router';

const router = useRouter()
const goBack = ()=>{
    router.replace('/')
}

</script>
<style langt="scss" scoped>
.center{
    width: 100vw;
    height: 100vh;
}
</style>