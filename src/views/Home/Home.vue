<template>
  <TopNav @search-article="_searchArticle"></TopNav>
  <!-- 随机banner -->
  <a-carousel :after-change="onChangeBanner" :autoplay="true" effect="fade">
    <div v-for="item,index in bannerArray" :key="index">
      <div class="site_banner" :style="{'backgroundImage': 'url(' + item + ')'}" >
        <div class="index_title flex_box">
          <img src="@/assets/img/logo_3.gif" alt="" class="index_gif" v-if="userInfo.blog_gif_show == 1" />
          <span>{{userInfo.blog_subtitle}}</span>
        </div>
      </div>
    </div>
   
  </a-carousel>
  

  <!-- 主要内容 -->
  <div class="main_container" v-cloak>
    <!-- 侧栏内容 -->
    <aside>
      <div class="aside_header">
        <div class="aside_bgc" :style="{'backgroundImage': 'url(' + userInfo?.blog_cover + ')'}"></div>
        <div class="aside_avatar aside_box">
          <img :src="userInfo?.blog_avatar" alt="" class="avatar"  v-if="userInfo?.blog_avatar"/>
          <img src="@/assets/img/avatar/avatar.jpg" alt="" class="avatar" v-else />
          <span class="username">{{ userInfo?.blog_title }}</span>
        </div>
        <div class="aside_box">
          <canvas id="canvas" ref="canvas"></canvas>
        </div>
        <div class="aside_text aside_box">
          <p>{{ userInfo?.blog_descrption }}</p>
          <!-- <p>我们走在街上，遇到的是一群死人和另一群死人。</p> -->
          <!-- <p>我们看起来就像活着一样，就像活着一样。</p> -->
        </div>
      </div>

      <div class="aside_progress">
        <p class="verse_time">{{ aa }}</p>
        <ul class="aside_box">
          <li>
            <p>今天已经过去了{{ passHour }}个小时</p>
            <a-progress
              :stroke-color="{
                from: '#108ee9',
                to: '#87d068',
              }"
              :percent="passHourPer"
              status="active"
              :show-info="false"
            />
          </li>
          <li>
            <p>本月已经过去了{{ passDay }}天</p>
            <a-progress
              :stroke-color="{
                from: '#108ee9',
                to: '#87d068',
              }"
              :percent="passDayPer"
              status="active"
              :show-info="false"
            />
          </li>
          <li>
            <p>今年已经过去了{{ passDayByYear }}天</p>
            <a-progress
              :stroke-color="{
                from: '#108ee9',
                to: '#87d068',
              }"
              :percent="passDayByYearPer"
              status="active"
              :show-info="false"
            />
          </li>
          <li>
            <p>距离春节回家还有{{ fromHomeDay }}天</p>
            <a-progress
              :stroke-color="{
                from: '#108ee9',
                to: '#87d068',
              }"
              :percent="passDayByYearPer"
              status="active"
              :show-info="false"
            />
          </li>
        </ul>
      </div>
    </aside>

    <!-- 文章预览 -->
    <article>
      <a-list
        class="demo-loadmore-list"
        :loading="loading"
        item-layout="vertical"
        :data-source="dataList"
      >
        <template #loadMore>
          <div
            :style="{
              textAlign: 'center',
              marginTop: '12px',
              height: '32px',
              lineHeight: '32px',
            }"
          >
            <a-spin v-if="loadingMore" />
            <a-button
              v-else
              :disabled="noMore"
              :loading="loadingMore"
              @click="loadMore"
              >{{ noMore ? "No more data" : "Load more" }}</a-button
            >
          </div>
        </template>
        <template #renderItem="{ item }">
          <a-list-item :key="item.article_title">
            <template #actions>
              <a
                ><CalendarTwoTone :style="{ marginRight: '0.5rem' }" />{{
                  item.article_createtime
                }}</a
              >
              <!-- <a><HeartTwoTone twoToneColor="#eb2f96" /></a> -->
              <a v-if="item.article_comment == 1"><MessageTwoTone /></a>
              <a @click="giveYouLike(item)"><LikeOutlined twoToneColor="#52c41a" />{{item.article_like}}</a>
              <a v-if="item.article_importance == 3"
                ><FireTwoTone twoToneColor="red"
              /></a>
            </template>

            <template #extra>
              <img
                width="272"
                height="130"
                alt="logo"
                :src="item.article_cover"
                v-if="item.article_cover!=''"
              />
              <img
                width="272"
                height="130"
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                v-else
              />
            </template>

            <a-list-item-meta>
              <template #title>
                <router-link :to="'/articleDetail/' + item.id">{{
                  item.article_title
                }}</router-link>
              </template>
              <template #avatar>
                <a-avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </template>
              <template #description>
                <div class="txt-hidden-1">
                  {{ item.article_description }}
                </div>
              </template>
            </a-list-item-meta>

            <a-tag color="black" v-if="item.article_importance == 3">置顶</a-tag>
            <a-tag
              :color="parseColor(tagItem)"
              v-for="(tagItem, index) in item.article_tag.split(',')"
              >{{ tagItem }}</a-tag
            >
          </a-list-item>
        </template>
      </a-list>
    </article>
  </div>
  <Footer></Footer>

  <Loading :isSuccess="loading"></Loading>
</template>

<script setup lang="ts">
import {
  LikeOutlined,
  HeartTwoTone,
  CalendarTwoTone,
  FireTwoTone,
  MessageTwoTone,
  MessageOutlined,
} from "@ant-design/icons-vue";

import { notification } from "ant-design-vue";

import {
  computed,
  defineComponent,
  onMounted,
  ref,
  watch,
  SetupContext,
  reactive,
} from "vue";

import Footer from "../../components/footer.vue";

import Loading from "@/components/loading/loading.vue";

import TopNav from "@/components/nav/TopNav.vue";

import { useLoadMore, useRequest } from "vue-request";

import { Data, articleItem } from '@/interface/article'

import { getBaseInfo, submitLike, isVisitorWithWebSite } from "@/api/index";

import { searchArticle } from '@/api/article'

import { mapState, mapActions, mapMutations } from "vuex";

import { useStore } from '@/store'

import { useRouter } from "vue-router";

import returnCitySN from 'returnCitySN'

import * as sysTool from "@/utils/system";

import { useState, useMutations, useGetters, useActions } from '@/utils/vuexHooks'

const store = useStore();

const router = useRouter();

//#region 定义  emit 子组件出发父组件事件
const emit = defineEmits(["close-loading"]);
//#endregion

//#region 父组件传值获取办法示例
const props = defineProps({
  msg: String,
});
//#endregion

//#region 测试通过环境变量取值
const aa = ref("");

aa.value = import.meta.env.VITE_TITLE as string;
//#endregion

//#region vue-request 文章列表加载更多管理扩展，通过vue-request userLoadMore()管理列表

// 对下次url/参数进行计算
const testService = (params: { data?: Data; dataList?: Data["data"] }) => {
  const p: any = { limit: 10, type: 1 };
  if (params?.dataList?.length !== undefined) {
    p["page"] = Math.floor(params.dataList.length / p.limit) + 1;
  } else {
    p["page"] = 1;
  }
  return {
    url: `${import.meta.env.VITE_BASE_API}index/getArticleList?${new URLSearchParams(
      p as any
    )}`,
  };
};

// 实际所使用的方法，通过解构赋值的方式获取所需要的状态 例如是否加载中 是否获取完成 是否还有更多
const {
  data,
  loadingMore,
  dataList,
  refreshing,
  loadMore,
  refresh,
  loading,
} = useLoadMore<Data, Parameters<typeof testService>, Data["data"]>(testService, {
  listKey: "data",
});

// 计算是否还有更多数据
const noMore = computed(() => dataList.value.length === data.value?.total);

//文章模糊搜索
const _searchArticle = async (val:string) => {
  console.error(val)
  await searchArticle({
    keyword:val
  })
}
//#endregion

//#region 个人信息模块
//  个人信息 START
let userInfo = ref<any>();
// banner 数组
const bannerArray = ref<string[]>([]);

const _getBaseInfo = async () => {
  const res = await getBaseInfo();
  // 如果基础信息接口返回成功关闭loading
  if (res.code === 200) {
    userInfo.value = res.data;
    thisYearDate.value = res.data.blog_springFestivalDate
	bannerArray.value = res.data.blog_banner.split(',')
    setTimeout(() => {
      emit("close-loading");
    }, 2000);
  }
};

// getBaseInfo 依赖列表接口
const res = useRequest(_getBaseInfo, {
  ready: computed(() => loading.value),
});

// banner 切换事件
const onChangeBanner = (current: number) => {
  
}
// 个人信息 END
//#endregion

//#region  点赞模块
// 点赞 MODULE START
const isLock = ref<boolean>(false)

const likeInfo = reactive({ 
  ip: 0,
  address: '',
  os: '',
  browser: '',
  article_id: '',
  c_id: ''
})

const brower = sysTool.GetCurrentBrowser();
const os = sysTool.GetOs();

//获取IP用于点赞评论时提交
likeInfo.ip = returnCitySN.cip
likeInfo.address = returnCitySN.cname
likeInfo.c_id = returnCitySN.cid
likeInfo.os = os
likeInfo.browser = brower

// 通过封装辅助函数HOOKS
const {getAllTag,updateDevice} = useActions({
  getAllTag: 'getAllTag',
  updateDevice: 'deviceModule/updateDevice'
})

const deviceInfo:any = useState({
  ip: (state: any) => state.deviceModule.ip,
  os: (state: any) => state.deviceModule.os,
  address: (state: any) => state.deviceModule.address,
  browser: (state: any) => state.deviceModule.browser,
  a_id: (state: any) => state.deviceModule.a_id
})
const {ip:{value:ipValue}, 
      os:{value:osValue}, 
      address:{value:addressValue}, 
      browser:{value:browserValue}, 
      a_id:{value:aidValue}} = deviceInfo

// 更新设备信息存储到全局
// store.dispatch('deviceModule/updateDevice',likeInfo) //dispatch 方式直接调用异步action
updateDevice(likeInfo)

// 点赞函数
const giveYouLike = async (item: articleItem) =>{
  if(isLock.value) return false
  isLock.value = true
  let res = await submitLike({
    article_id:item.id,
    ip:ipValue,
    os:osValue,
    address:addressValue,
    browser:browserValue,
    a_id:aidValue
  })
  if(res.code === 200){
    notification.success({
      message: res.info,
      duration: 2.5
    });
    isLock.value = false
  }else{
    notification.error({
      message: res.info,
      duration: 2.5
    });
    isLock.value = false
  }
}

// 点赞 MODULE END
//#endregion

//#region  处理标签模块
// 处理标签 START
// store.dispatch("getAllTag"); //通过dispatch 调用异步action
getAllTag() //封装的useAction 调用

const allTag = computed(() => store.state.allTag);

// console.error(allTag.value[0].theme_color)
const parseColor = (text: string) => {
  return allTag.value.map(item=>{
    // console.error(item.theme_color)
    if(text === item.classify_name){
      return item.theme_color
    }
  })
};

// 处理标签 END
//#endregion

//#region  访客记录
  const addVisitor = async ()=>{
    await isVisitorWithWebSite({
      ip:ipValue,
      os:osValue,
      address:addressValue,
      browser:browserValue,
      a_id:aidValue
    }).then(res=>{
      if(res.code === 200){
        window.sessionStorage.setItem('isVisitor','true')
      }
    })
  }
  const isVisitor = window.sessionStorage.getItem('isVisitor')
  if(!isVisitor) {
    addVisitor()
  }
//#endregion
onMounted(() => {
  // 绘制心电图
  const canvas: any = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  var x = 0;
  var coords = new Array();

  const draw = () => {
    canvas.width = canvas.width;

    context.moveTo(0, 80);

    x += 10;

    if (x > 300) {
      for (var i in coords) {
        coords[i].x = coords[i].x - 10;
      }
    }

    var temp = {
      x: x,
      y: Math.floor(Math.random() * 80) + 40,
    };

    coords.push(temp);

    for (var i in coords) {
      context.lineTo(coords[i].x, coords[i].y);
    }

    context.strokeStyle = "#9fdcf3";
    context.lineWidth = 1;
    context.shadowColor = "#9fdcf3";
    context.shadowBlur = 10;

    context.stroke();
    context.closePath();
  };
  setInterval(draw, 100);

  // 计算距离春节还有多久
  getFromHomeDay(thisYearDate.value);
});

//#region 随机背景色的索引
// 随机数改为
// TODO 待完成
const indexBgc = ref<number>(1);
// 随机背景
const indexBgcFunc = (max: number, min: number) => {
  return Math.floor(Math.random() * max + min);
};
//#endregion

//#region 计算左侧时间列表
/**
 * @description:  计算今天过去了多少小时
 * @param {*}
 * @return {*}
 * @author: Aliuyanfeng
 * @Date: 2021-11-23 11:46:06
 */
const passHour: number = new Date().getHours();

const passHourPer = (passHour / 24) * 100;

/**
 * @description:  计算这个月过去了多少天
 * @param {*}
 * @return {*}
 * @author: Aliuyanfeng
 * @Date: 2021-11-023 11:45:48
 */
const currentYear: number = new Date().getFullYear(); //获取今年是几几年

let currentMonth: number = new Date().getMonth(); //获取月份
currentMonth += 1;

const passDay: number = new Date().getDate(); //本月是几号

const totalDay: number = new Date(currentYear, currentMonth, 0).getDate(); //获取本月有多少天

const passDayPer = (passDay / totalDay) * 100;

/**
 * @description: 计算今年过去了多少天
 * @param {*}
 * @return {*}
 * @author: Aliuyanfeng
 * @Date: 2021-11-06 15:18:48
 */

const passDayByYear = ref<number>(0);

const passDayByYearPer = ref<number>(0);

const totalDayByYear = ref<Date>();

totalDayByYear.value = new Date(currentYear, 0); // 获取今年string

const currentDayByYear = ref<Date>();

currentDayByYear.value = new Date(currentYear, currentMonth - 1, passDay); //获取今年当天的 string

// 通过前后相减获得时间戳
passDayByYear.value =
  (Number(currentDayByYear.value) - Number(totalDayByYear.value)) /
    (1000 * 60 * 60 * 24) +
  1;

const numDayByYear = ref<number>(0); // 今年总共多少天

numDayByYear.value = Number(totalDayByYear.value);

if (currentYear % 4 === 0 && currentYear % 100 !== 0 && currentYear % 400 === 0) {
  numDayByYear.value = 366;
} else {
  numDayByYear.value = 365;
}

passDayByYearPer.value = (passDayByYear.value / numDayByYear.value) * 100;

/**
 * @description: 计算距离过年还有多少天 今年是2022-01-31过年
 * @param {*}
 * @return {*}
 * @author: Aliuyanfeng
 * @Date: 2021-11-23 11:47:23
 */

const thisYearDate = ref<String>("2023-01-21"); //今年春节的日期

const fromHomeDay = ref<number>(0); //距离春节还有多少天

const getFromHomeDay = (data: any) => {
  let endTime = new Date(data);
  let nowTime = new Date();

  let timeStamp = endTime.getTime() - nowTime.getTime();

  fromHomeDay.value = Math.floor(timeStamp / 1000 / 60 / 60 / 24);
};

//#endregion

</script>
<style lang="scss" scoped>
canvas {
  width: 100%;
  height: 90px;
  margin: 0 auto;
}
.site_banner {
  // background: url("@/assets/img/banner/scenery3.jpg");
  width: 100%;
  height: 600px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  .index_title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    align-items: center;
	  // display: none;
    span {
      font-weight: 700;
      font-size: 38px;
      font-family: cursive;
      letter-spacing: 5px;
    }
  }
  .index_gif {
    width: 300px;
    // height: 100px;
  }
}
.main_container {
  width: 1200px;
  margin: 0 auto;
  padding: 30px 0;
  background-color: transparent;
  display: flex;
  aside {
    padding-bottom: 15px;
    width: 300px;
    .aside_box {
      padding: 0 15px;
      li {
        list-style: none;
        padding: 10px 0;
      }
    }
    .aside_header {
      background-color: #fff;
      width: 300px;
      position: relative;
      border-radius: 8px;
      .aside_bgc {
        width: 100%;
        height: 200px;
        // background: url("@/assets/img/avatar/bgc.jpg");
        background-size: cover;
        position: relative;
        background-position: 50% 40%;
        border-radius: 8px 8px 0 0;
        &::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(0, #ffffff, transparent);
        }
      }

      .aside_text {
        border-radius: 8px 8px 0 0;
        padding-bottom: 15px;
        p {
          font-size: 14px;
          margin: 0;
          text-align: center;
        }
      }
      .aside_avatar {
        position: relative;
        top: -40px;
        &::before {
          content: "";
          position: absolute;
          bottom: -25px;
          width: calc(100% - 30px);
          height: 5px;
          background: linear-gradient(141deg, #9fb8ad 0%, #1fc8db 51%, #2cb5e8 75%);
          border-radius: 5px;
        }
        .username {
          margin-left: 20px;
          font-size: 18px;
          font-weight: 800;
          font-family: STKaiti;
        }
        .avatar {
          width: 80px;
          height: 80px;
          object-fit: contain;
          border-radius: 50% 50%;
        }
      }
    }

    .aside_progress {
      background-color: #fff;
      margin-top: 20px;
      border-radius: 8px;
      .verse_time {
        text-align: center;
        line-height: 44px;
        font-size: 16px;
        margin: 0;
      }

      ul {
        border-top: 1px solid rgb(240, 240, 240);
        li {
          p {
            margin: 0;
          }
        }
      }
    }
  }
  article {
    flex: 1;
    background-color: #fff;
    margin-left: 20px;
    padding: 10px 20px;
    border-radius: 8px;
  }
}
</style>
