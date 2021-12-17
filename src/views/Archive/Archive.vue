<template>

    <TopNav :isHaveBackground="true" />


    <Loading :isSuccess="loading" />

    <main>
        <a-space direction="vertical">
            <a-card>
                <a-row :gutter="16">
                    <a-col :span="12">
                      <a-statistic title="点赞量" :value="1128" style="margin-right: 50px">
                        <template #suffix>
                          <like-outlined />
                        </template>
                      </a-statistic>
                    </a-col>
                    <a-col :span="12">
                      <a-statistic title="阅读量" :value="93" class="demo-class">
                        <template #suffix>
                          <EyeOutlined />
                        </template>
                      </a-statistic>
                    </a-col>
                </a-row>
            </a-card>

            <a-card>
                <a-timeline mode="alternate">
                    <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
                    <a-timeline-item color="green">Solve initial network problems 2015-09-01</a-timeline-item>
                    <a-timeline-item>
                      <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                      laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                      beatae vitae dicta sunt explicabo.
                    </a-timeline-item>
                    <a-timeline-item color="red">Network problems being solved 2015-09-01</a-timeline-item>
                    <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
                    <a-timeline-item>
                      <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
                      Technical testing 2015-09-01
                    </a-timeline-item>
                </a-timeline>
            </a-card>

            <a-card>
                <div ref="myChart" :style="{ width: '1200px', height: '300px' }"></div>
            </a-card>

        </a-space>
    </main>
    <Footer></Footer>
</template>
<script setup lang="ts" >

import { ref, onMounted, onUpdated, onUnmounted, reactive, computed ,nextTick} from "vue";

import TopNav from "@/components/nav/TopNav.vue";

import Loading from "@/components/loading/loading.vue";

import Footer from "@/components/footer.vue";

import { useRouter } from 'vue-router';

import { ClockCircleOutlined,LikeOutlined,EyeOutlined} from '@ant-design/icons-vue';

import * as echarts from "echarts";

// 返回首页
const router = useRouter()

const goBack = ()=>{
    router.replace('/')
}

// 加载loding
const loading = ref<boolean>(false);
// 是否有背景色
const isHaveBackground = ref<boolean>(true);


const myChart = ref<HTMLElemen>(null); 


onMounted(()=>{
    // 绘制echarts

    nextTick(()=>{

        const myCharts = ref<any>();

        // 绘制图表
        myCharts.value = echarts.init(myChart.value!);
        myCharts.value.setOption({
            title: { text: "总用户量" },
            tooltip: {},
            xAxis: {
                data: ["12-3", "12-4", "12-5", "12-6", "12-7", "12-8"],
            },
            yAxis: {},
            series: [
                {
                    name: "用户量",
                    type: "line",
                    data: [5, 20, 36, 10, 10, 20],
                },
            ],
        });
    })
})


</script>
<style langt="scss" scoped>
.center{
    width: 100vw;
    height: 100vh;
}
</style>