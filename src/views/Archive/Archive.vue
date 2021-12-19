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
          <a-timeline-item color="green"
            >Solve initial network problems 2015-09-01</a-timeline-item
          >
          <a-timeline-item>
            <template #dot>
              <ClockCircleOutlined style="font-size: 16px" />
            </template>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </a-timeline-item>
          <a-timeline-item color="red"
            >Network problems being solved 2015-09-01</a-timeline-item
          >
          <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
          <a-timeline-item>
            <template #dot>
              <ClockCircleOutlined style="font-size: 16px" />
            </template>
            Technical testing 2015-09-01
          </a-timeline-item>
        </a-timeline>
      </a-card>

      <a-card>
        <div ref="myChart" :style="{ width: '1200px', height: '300px' }"></div>
      </a-card>

      <a-card>
        <div id="container" style="height: 800px; width: 1200px"></div>
      </a-card>
    </a-space>
  </main>
  <Footer></Footer>
</template>
<script setup lang="ts">
import {
  ref,
  onMounted,
  onUpdated,
  onUnmounted,
  reactive,
  computed,
  nextTick,
} from "vue";

import TopNav from "@/components/nav/TopNav.vue";

import Loading from "@/components/loading/loading.vue";

import Footer from "@/components/footer.vue";

import { useRouter } from "vue-router";

import { ClockCircleOutlined, LikeOutlined, EyeOutlined } from "@ant-design/icons-vue";

import * as echarts from "echarts";

import AMapLoader from "@amap/amap-jsapi-loader";

import MapLoader from "@/utils/map";
// 返回首页
const router = useRouter();

const goBack = () => {
  router.replace("/");
};

// 加载loding
const loading = ref<boolean>(false);
// 是否有背景色
const isHaveBackground = ref<boolean>(true);

const myChart = ref<HTMLElement>();

const locationMap = () => {
  MapLoader();
};

onMounted(() => {
  locationMap();

  nextTick(() => {
    // 绘制echarts
    const myCharts = ref<any>();

    // 绘制图表
    myCharts.value = echarts.init(myChart.value!);
    myCharts.value.setOption({
      title: { text: "总访问量" },
      tooltip: {},
      xAxis: {
        data: ["12-3", "12-4", "12-5", "12-6", "12-7", "12-8"],
      },
      yAxis: {},
      series: [
        {
          name: "阅读量",
          type: "line",
          data: [5, 20, 36, 10, 10, 20],
        },
        {
          name: "点赞",
          type: "line",
          data: [1, 5, 15, 35, 18, 60],
        },
      ],
    });

    // 绘制高德地图

    AMapLoader.load({
      key: "05fc4f88a4b75ff7ba5673ac8664ecd2", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      AMapUI: {
        // 是否加载 AMapUI，缺省不加载
        version: "1.1", // AMapUI 缺省 1.1
        plugins: [], // 需要加载的 AMapUI ui插件
      },
      Loca: {
        // 是否加载 Loca， 缺省不加载
        version: "1.3.2", // Loca 版本，缺省 1.3.2
      },
    })
      .then((AMap) => {
        var map = new AMap.Map("container", {
          zoom: 11, //级别
          // center: [116.397428, 39.90923],                 
          viewMode: "3D",//使用3D视图
          resizeEnable: true, //中心点坐标 
        });

        AMap.plugin(["AMap.ToolBar"], function () {
          // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
          map.addControl(
            new AMap.ToolBar({
              // 简易缩放模式，默认为 false
              liteStyle: true,
            })
          );
        });
      })
      .catch((e) => {
        console.log(e);
      });
  });
});
</script>
<style langt="scss" scoped>
.center {
  width: 100vw;
  height: 100vh;
}
</style>
