<template>
  <div>
    <!-- <TopNav :isHaveBackground="true" /> -->
    <a-layout>
      <a-layout-header style="color:#fff;font-size:18px">Socket.io 弹幕 Demo</a-layout-header>

      <a-layout style="min-height: calc(100vh - 64px)">
        <a-layout-content>
          <div id="mui-player"></div>
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

// import 'mui-player/dist/mui-player.min.css'
// import MuiPlayer from 'mui-player'

interface commentList {
  username?: string,
  time?: string,
  sendId?: number,
  message?: string
}


// video
// var mp = new MuiPlayer({
//     container:'#mui-player',
//     title:'标题',
//     src:'blob:https://xdlumia.github.io/9cf0fb9b-7f36-423d-a850-122819523d6a',
// })

// socket 服务
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


</style>
