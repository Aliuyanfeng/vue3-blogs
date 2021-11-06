<template>
  <!-- 随机banner -->
  <div class="site_banner">
    <div class="index_title flex_box">
      <img src="../assets/img/logo_3.gif" alt="" class="index_gif" />
      <span>It's My Life</span>
    </div>
  </div>

  <!-- 主要内容 -->
  <div class="main_container">
    <!-- 侧栏内容 -->
    <aside>
      <div class="aside_header">
        <div class="aside_bgc"></div>
        <div class="aside_avatar aside_box">
          <img src="@/assets/img/avatar/avatar.jpg" alt="" class="avatar" />
          <span class="username">小刘没睡醒呢</span>
        </div>
        <div class="aside_box">
          <canvas id="canvas" ref="canvas"></canvas>
        </div>
        <div class="aside_text aside_box">
          <p>这个城市已经死了，这个夏天也死了。</p>
          <!-- <p>我们走在街上，遇到的是一群死人和另一群死人。</p>
          <p>而他们看起来就像活着一样，就像活着一样。</p> -->
        </div>
      </div>

      <div class="aside_progress">
        <p class="verse_time">已为陈迹</p>
        <ul class="aside_box">
          <li>
            <p>今天已经过去了{{passHour}}个小时</p>
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
            <p>本月已经过去了{{passDay}}天</p>
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
            <p>今年已经过去了{{passDayByYear}}天</p>
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
          <li></li>
        </ul>
      </div>
    </aside>

    <!-- 文章预览 -->
    <article></article>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

onMounted(() => {
  
  const canvas:any = document.getElementById('canvas');
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
});


  // 随机背景色的索引
  // 随机数改为
  const indexBgc = ref<number>(1);
  // 随机背景
  const indexBgcFunc = (max: number, min: number) => {
    return Math.floor(Math.random() * max + min);
  };


  // 计算今天过去了多少小时

  const passHour:number = new Date().getHours()

  const passHourPer = (passHour / 24) * 100


  // 计算这个月过去了多少天
  const currentYear:number = new Date().getFullYear() //获取今年是几几年

  var currentMonth:number = new Date().getMonth()  //获取月份
      currentMonth += 1

  const passDay:number = new Date().getDate()  //本月是几号

  const totalDay:number = new Date(currentYear,currentMonth,0).getDate()  //获取本月有多少天

  const passDayPer = (passDay / totalDay) * 100

  /**
   * @description: 计算今年过去了多少天
   * @param {*}
   * @return {*}
   * @author: Aliuyanfeng
   * @Date: 2021-11-06 15:18:48
   */

  const passDayByYear = ref<number>(0);

  const passDayByYearPer = ref<number>(0)

  const totalDayByYear = ref<Date>()

    
  totalDayByYear.value= new Date(currentYear, 0); // 获取今年string  

  const currentDayByYear = ref<Date>()

  currentDayByYear.value = new Date(currentYear, currentMonth-1, passDay); //获取今年当天的 string

  // 通过前后相减获得时间戳
  passDayByYear.value =(Number(currentDayByYear.value) - Number(totalDayByYear.value)) / (1000 * 60 * 60 * 24) + 1

  const numDayByYear = ref<number>(0) // 今年总共多少天

  numDayByYear.value = Number(totalDayByYear.value)

  
  if(currentYear % 4 === 0 && currentYear % 100 !== 0 && currentYear % 400 === 0){
    numDayByYear.value = 366
  }else{
    numDayByYear.value = 365
  }

        
  passDayByYearPer.value = (passDayByYear.value / numDayByYear.value) * 100





</script>
<style lang="scss" scoped>
canvas {
  width: 100%;
  height: 90px;
  margin: 0 auto;
}
.site_banner {
  background: url("@/assets/img/banner/scenery3.jpg");
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
    span {
      font-weight: 700;
      font-size: 38px;
      font-family: fantasy;
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
  padding: 30px;
  background-color: transparent;
  aside {
    padding-bottom: 15px;
     width: 300px;
    .aside_box {
      padding: 0 15px;
    }
    .aside_header {
      background-color: #fff;
      width: 300px;
      position: relative;
      border-radius: 8px;
      .aside_bgc {
        width: 100%;
        height: 200px;
        background: url("../assets/img/avatar/bgc.jpg");
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

    .aside_progress{
      background-color: #fff;
      margin-top: 20px;
      border-radius: 8px;
      .verse_time{
        text-align: center;
        line-height: 44px;
        font-size: 16px;
      }

      ul{
        border-top: 1px solid rgb(240,240,240);
        li{
          
          p{
            margin: 0;
          }
        }
      }
    }
  }
}
</style>
