<template>
  <TopNav :isHaveBackground="true" />

  <Loading :isSuccess="loading" />

  <main class="blog-main">
    <a-space direction="vertical" class="question-info">
      <a-card hoverable="true">
        <a-row :gutter="16" align="middle">
          <a-col :span="6">
            <div class="question-info-item quesiton-info-bgc1">
              <TrophyTwoTone />
              <span class="info-item-title">
                题目数量：
                <span class="info-item-num">1126</span>
              </span>
            </div>
          </a-col>
          <a-col :span="6">
            <div class="question-info-item quesiton-info-bgc2">
              <AppstoreTwoTone twoToneColor="#00c561" />
              <span class="info-item-title">
                分类数量：
                <span class="info-item-num">10</span>
              </span>
            </div>
          </a-col>
          <a-col :span="6">
            <div class="question-info-item quesiton-info-bgc3">
              <HourglassTwoTone twoToneColor="#fd7b2f" />
              <span class="info-item-title">
                当前进度：
                <span class="info-item-num">1/1126</span>
              </span>
            </div>
          </a-col>
          <a-col :span="6">
            <div class="question-item-btns">
              <a-button type="primary" size="large">
                <template #icon>
                  <SwapOutlined />
                </template>
                顺序练习
              </a-button>
              <a-button type="primary" danger size="large">
                <template #icon>
                  <RetweetOutlined />
                </template>
                随机练习
              </a-button>
            </div>
          </a-col>
        </a-row>
      </a-card>

      <div class="quesiton-bank-item">
        <a-card hoverable style="width: 290px" v-for="item in 5">
          <template class="ant-card-actions" #actions>
            <a-tooltip placement="top">
              <template #title>
                <span>分享</span>
              </template>
              <ShareAltOutlined @click="copyShareUrl(item)" />
            </a-tooltip>
            <a-tooltip placement="top">
              <template #title>
                <span>去练习</span>
              </template>
              <SendOutlined @click="jumpPractice(item)" />
            </a-tooltip>
          </template>
          <a-card-meta
            title="JavaScript"
            description="This is the JavaScript description"
          >
            <template #avatar>
              <a-avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            </template>
          </a-card-meta>
        </a-card>
      </div>
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

import {
  TrophyTwoTone,
  AppstoreTwoTone,
  HourglassTwoTone,
  SwapOutlined,
  RetweetOutlined,
  ShareAltOutlined,
  SendOutlined,
} from "@ant-design/icons-vue";

import { notification } from 'ant-design-vue';
// 加载loding
const loading = ref<boolean>(false);
// 是否有背景色
const isHaveBackground = ref<boolean>(true);

const router = useRouter();

onMounted(() => {});

// 复制分享url
const copyShareUrl = (bank:any) => {
  let oInput = document.createElement("input");
  oInput.value = `${import.meta.env.VITE_BASE_API}exam?id=88`;
  document.body.appendChild(oInput);
  oInput.select(); // 选择对象;
  // document.execCommand("Copy"); // 执行浏览器复制命令 即将被弃用
  navigator.clipboard.writeText(oInput.value).then(function() {
      notification.success({
        message: '复制成功',
        description:
          '不同浏览器有差异性,建议使用Google浏览器访问',
      });
  }, function() {
     notification.success({
        message: '复制失败',
        description:
          '不同浏览器有差异性,建议使用Google浏览器访问',
      });
  });
  oInput.remove();
};

// 跳转练习页面
const jumpPractice = (bank:any) =>{
  router.push({
    path:"/exam"
  })
}
</script>
<style lang="scss" scoped>
.blog-main {
  .question-info {
    width: 100%;

    .question-item-btns {
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .question-info-item {
      display: inline-flex;
      width: 90%;

      border-radius: 5px;
      padding: 20px;
      font-size: 18px;
      align-items: center;
      justify-self: center;
      .info-item-title {
        margin-left: 10px;
        .info-item-num {
          font-weight: 700;
        }
      }
    }
    .quesiton-info-bgc1 {
      background-color: #f3f6fd;
      .info-item-title {
        .info-item-num {
          color: #3859ff;
        }
      }
    }

    .quesiton-info-bgc2 {
      background-color: #ecfbf3;
      margin-left: 20px;
      .info-item-title {
        .info-item-num {
          color: #00c561;
        }
      }
    }

    .quesiton-info-bgc3 {
      background-color: #fcf2ed;
      margin-left: 20px;
      .info-item-title {
        .info-item-num {
          color: #fd7b2f;
        }
      }
    }
  }

  .quesiton-bank-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 5px;
    .ant-card {
      &:nth-of-type(n + 5) {
        margin-top: 15px;
      }
    }
  }
}
</style>
