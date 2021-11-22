<template>
    <footer>
        <p> Copyright  &copy; <a href="https://beian.miit.gov.cn" target="_blank">黑ICP备2021005861号-1</a> Powered by Aliuyanfeng测试</p>
    </footer>
   
</template>
<script lang="ts" setup>
    import {ref} from 'vue'
    import { test } from '@/api/index';

    test().then(response => {
        const res: any = response.data
        if(res.code === 200){
            console.error(res)
        }
    })
</script>
<style lang="scss" scoped>
footer{
    background-color: #666464;
    text-align: center;
    height: 30px;
    line-height: 30px;
    p{
        color: #fff;
        a{
            color: #fff;
        }
    }
}
</style>