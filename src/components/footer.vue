<template>
    <footer>
        <p> Copyright  &copy; <a href="https://beian.miit.gov.cn" target="_blank">黑ICP备2021005861号-1</a> Powered by Aliuyanfeng</p>
        <!-- <button @click="handelout">+++</button> -->
    </footer>
   
</template>
<script lang="ts" setup>
    import {ref,computed} from 'vue'

    import { test } from '@/api/index';

    import { useStore } from '@/store'

    const store = useStore()

    const testname = computed(()=>store.state.testModule.name)

    const testcount = computed(()=>store.state.testModule.count)

    const handelout = ()=>{
        store.commit('testModule/add_count')
    }

    test().then((res) => {
        if(res.code === 200){
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
        margin: 0 auto;
        color: #fff;
        a{
            color: #fff;
        }
    }
}
</style>