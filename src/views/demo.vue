<template>
  <div>
    <!-- <TopNav :isHaveBackground="true" /> -->
    <a-layout>
      <a-layout-header style="color:#fff;font-size:18px">Socket.io 弹幕 Demo</a-layout-header>

      <a-layout style="min-height: calc(100vh - 64px)">
        <a-layout-content>
          <section class="video-box">
           <video-player
              ref="videoPlayer"
              class="video-player vjs-custom-skin"
              :playsinline="true"
              :options="playerOptions"
              @play="onPlayerPlay($event)"
              @pause="onPlayerPause($event)"
              />
          </section>
        </a-layout-content>
        <a-layout-sider width="500">
          <a-row style="min-height:calc(100vh - 104px)">
            <ul id="messages">
              <li
                v-for="item: any,index in newslist"
              >{{ item.username ? item.username + ':' : '' }}{{ item.message }}</li>
            </ul>
          </a-row>
          <a-row>
            <a-input-search
              v-model:value="value"
              placeholder="input search text"
              enter-button="Search"
              size="large"
              @search="onSearch"
            />
          </a-row>
        </a-layout-sider>
      </a-layout>
    </a-layout>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUpdated, onUnmounted, reactive, computed, onBeforeUnmount } from "vue";

import TopNav from "@/components/nav/TopNav.vue";

import { io } from 'socket.io-client'

import { message, notification } from "ant-design-vue";

import { videoPlayer } from 'vue-video-player/src'

import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'

interface commentList {
  username?: string,
  time?: string,
  sendId?: number,
  message?: string
}

const videoSrc = ref<string>('https://willarun365.blog.csdn.net/article/details/109180771#comments_14708186 ')

const videoOptions = ref<object>({
  playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
  autoplay: false, //如果true,浏览器准备好时开始回放。
  muted: false, // 默认情况下将会消除任何音频。
  loop: false, // 导致视频一结束就重新开始。
  preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
  language: 'zh-CN',
  aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
  techOrder: ['flash', 'html5'],      // 兼容顺序
  sources: [{ // 流配置，数组形式，会根据兼容顺序自动切换
    type: 'rtmp/hls',
    src: 'rtmp://58.200.131.2:1935/livetv/hunantv'
  }],
  poster: "", //你的封面地址
  // width: document.documentElement.clientWidth,
  notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
  controlBar: {
    timeDivider: true,
    durationDisplay: true,
    remainingTimeDisplay: false,
    fullscreenToggle: true  //全屏按钮
  }
})
const playerOptions =  {
        // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
  autoplay: false, // 如果true,浏览器准备好时开始回放。
  muted: false, // 默认情况下将会消除任何音频。
  loop: false, // 导致视频一结束就重新开始。
  preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
  language: 'zh-CN',
  aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
  fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
  sources: [
      {
        type: 'application/x-mpegURL', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
        src: 'https://cdn.letv-cdn.com/2018/12/05/JOCeEEUuoteFrjCg/playlist.m3u8' // url地址
      }
  ],
  hls: true,
  poster: 'http://pic33.nipic.com/20131007/13639685_123501617185_2.jpg', // 你的封面地址
  width: document.documentElement.clientWidth, // 播放器宽度
  notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
  controlBar: {
    timeDivider: true,
    durationDisplay: true,
    remainingTimeDisplay: false,
    fullscreenToggle: true // 全屏按钮
  }
}

const onPlayerPlay = ()=>{
console.log('开始播放')
}
const onPlayerPause = ()=>{
  console.log('暂定播放')
}

const value = ref<string>('');

const onSearch = (searchValue: string) => {
  socket.emit('chat message', { 'username': "小刘", 'message': value.value, 'time': new Date() }, (res: any) => {
    // 后端确认后的回调
    console.error(res.status)
  });
  value.value = ''
};

let socket: any = null

const newslist = ref([])
// 创建客户端 websocket 的实例
socket = io(import.meta.env.VITE_WS_URL as string)

// 建立连接的事件
socket!.on('connect', () => {
  notification.success({
    message: '连接弹幕服务成功',
    duration: 2.5
  });
})

// 关闭连接的事件
socket!.on('disconnect', () => {
  notification.error({
    message: '连接弹幕服务失败',
    duration: 2.5
  });
})

socket.on("connect_error", (err: any) => {
  console.log(err instanceof Error); // true
  console.log(err.message); // not authorized
  console.log(err.data); // { content: "Please retry later" }
});

// 接收到消息的事件
socket!.on('message', (msg: never) => newslist.value.push(msg))
// 接受第一次进入的事件，所有人
socket!.on('this', (msg: never) => newslist.value.push(msg))

socket.on('sendToClient', (msg: never) => newslist.value.push(msg))
// 接受聊天事件
socket.on('chat message', function (msg: never) {
  newslist.value.push(msg);
  window.scrollTo(0, document.body.scrollHeight);
});
setInterval(() => {
  // 向服务器发送消息
  // socket.emit('sentToServer','测试发送信息',(data:never)=>{
  //   data&&newslist.value.push(data)
  // })

}, 1000)


// 组件被销毁之前，清空 sock 对象
onBeforeUnmount(() => {
  // 关闭连接
  socket?.close()

  // 销毁 websocket 实例对象
  socket = null
})
</script>
<style lang="scss" scoped>
main {
  width: 1200px;
  margin: 0 auto;
  // background-color: #fff;
  padding-top: 75px;
  box-sizing: border-box;
}
body {
  margin: 0;
  padding-bottom: 3rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
}

#form {
  background: rgba(0, 0, 0, 0.15);
  padding: 0.25rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 3rem;
  box-sizing: border-box;
  backdrop-filter: blur(10px);
}
#input {
  border: none;
  padding: 0 1rem;
  flex-grow: 1;
  border-radius: 2rem;
  margin: 0.25rem;
}
#input:focus {
  outline: none;
}
#form > button {
  background: #333;
  border: none;
  padding: 0 1rem;
  margin: 0.25rem;
  border-radius: 3px;
  outline: none;
  color: #fff;
}

#messages {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
}
#messages > li {
  padding: 0.5rem 1rem;
  background-color: #fff;
}
#messages > li:nth-child(odd) {
  background: #efefef;
}

.video-box {
  width: 1000px;
  padding: 20px;
}
</style>
