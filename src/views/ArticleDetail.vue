<template>
   <TopNav :isHaveBackground=isHaveBackground />

   <Loading :isSuccess="loading"/>

   <main>
     <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="Title"
        :breadcrumb="{ routes }"
        sub-title="This is a subtitle"
    />
   </main>
</template>
<script lang="ts" setup>

import {ref} from 'vue'

import TopNav from '@/components/nav/TopNav.vue'

import Loading from '@/components/loading/loading.vue'

const loading = ref<boolean>(true)

const isHaveBackground = ref<boolean>(true)

setTimeout(() => {
    console.error(loading.value)
    loading.value = false
}, 2000)

const routes = [
  {
    path: 'index',
    breadcrumbName: 'First-level Menu',
  },
  {
    path: 'first',
    breadcrumbName: 'Second-level Menu',
  },
  {
    path: 'second',
    breadcrumbName: 'Third-level Menu',
  },
];

</script>

<style lang="scss" scoped>
main{
    width: 1200px;
    margin: 0 auto;
    background-color: #fff;
    padding-top: 55px;
    box-sizing: border-box;
}
</style>