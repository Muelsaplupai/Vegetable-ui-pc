<template>
  <div>
    <full-page :options="options" ref="fullpageRef" id="mainpage">
      <div class="section">
        <div style="text-align: center">
          <el-container class="home-container">
            <HeadermainIns :index="index" @update="handleUpdate"></HeadermainIns>

            <div>
              <video-background
                ref="videobackground"
                src="src/assets/back1.mp4"
                style="max-height: 100%; height: 100vh"
              >
                <div class="maintext">
                  智 领 南 山<br /><br />
                  数 赢 未 来
                  <LoginIns />
                  <RegisterIns />
                </div>
                <br /><br /><br />
                <button class="mainbutton" @click="loading">进入详情 - 总览数据</button>
              </video-background>
            </div>
          </el-container>
        </div>
      </div>
      <div class="section">
        <transition name="slide-up">
          <div class="text3" v-show="isActive1 === true">
            <div class="maintext31">
              重新定义<br /><br />
              数据预测
            </div>
            <br /><br /><br />
            <button class="pagethirdbutton1" @click="predictbegin">点击详情</button>
          </div>
        </transition>
        <transition name="slide-up">
          <div class="text3" v-show="isActive2 === true">
            <div class="maintext31">
              大千世界<br /><br />
              监控全局
            </div>
            <br /><br /><br />
            <button class="pagethirdbutton1" @click="searchbegin">点击详情</button>
          </div></transition
        >
        <transition name="slide-up" v-show="isActive3 === true">
          <div class="text3">
            <div class="maintext31">
              最新动态<br /><br />
              洞悉未来
            </div>
            <br /><br /><br />
            <button class="pagethirdbutton1" @click="newsbegin">点击详情</button>
          </div></transition
        >
        <div
          class="bottomtexttop"
          v-show="isActive1 === false && isActive2 === false && isActive3 === false"
        ></div>
        <div
          class="bottomtexttoptextback"
          v-show="isActive1 === false && isActive2 === false && isActive3 === false"
        >
          <div class="bottomtexttopsmalltext">解决方案</div>
          <div class="bottomtexttoptext">
            为<span class="special-style">农产品交易</span>提供解决方案
          </div>
        </div>
        <div class="bottomtextback"></div>
        <div class="bottomtext">
          <button
            class="bottomtextItem"
            :class="{ active: isActive1 }"
            @click="cycleclick(0)"
          >
            数据查询
          </button>
          <button
            class="bottomtextItem"
            :class="{ active: isActive2 }"
            @click="cycleclick(1)"
          >
            预测分析
          </button>
          <button
            class="bottomtextItem"
            :class="{ active: isActive3 }"
            @click="cycleclick(2)"
          >
            新闻动态
          </button>
        </div>
        <div class="container">
          <transition-group name="expand" tag="div" class="divs">
            <div
              v-for="(width, index) in widths"
              :key="index"
              :style="{
                width: width,
                backgroundSize: 'cover',
                backgroundPosition: 'top right',
                transition: 'width 1s ease',
              }"
              :class="'div' + index"
            ></div>
          </transition-group>
        </div>
      </div>
    </full-page>
  </div>
</template>
<script setup>
import HeadermainIns from "@/views/FinalComponents/NavHeader/Header-main.vue";
import MainBodyMid from "@/views/FinalComponents/ShujuDapin/Main-body-mid.vue";
import VideoBackground from "vue-responsive-video-background-player";
import LoginIns from "./FinalComponents/LoginandReg/Login.vue";
import RegisterIns from "./FinalComponents/LoginandReg/Register.vue";
import { ref, onMounted, onUnmounted, reactive, defineProps, toRefs, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import bus from "@/views/Tools/bus";

//实现跳转
const router = useRouter();

//fullpage引用
const fullpageRef = ref();

//背景视频引用
const videobackground = ref();

// 图片初始宽度
const widths = ref(["520px", "520px", "520px"]); 

// 设置不同的背景
const images = ref([
  "@/assets/background2.jpg",
  "@/assets/background5.jpg",
  "@/assets/background4.jpg",
]); 

//下方板块高亮设置
const isActive1 = ref(false);
const isActive2 = ref(false);
const isActive3 = ref(false);
const currentIndex = ref(0);
let index = ref();
let indexleave = ref();
const booljus = ref(true);

const setActive = (index) => {
  // 重置所有按钮的状态
  isActive1.value = false;
  isActive2.value = false;
  isActive3.value = false;

  // 根据传入的索引设置对应按钮的状态
  switch (index) {
    case 2:
      isActive1.value = true;
      break;
    case 3:
      isActive2.value = true;
      break;
    case 1:
      isActive3.value = true;
      break;
  }
};

//第二页动画
const cycleAnimations = () => {
  setTimeout(() => {
    setActive(currentIndex.value + 1);
  }, 0);

  const newWidths = ["520px", "520px", "520px"]; // 重置宽度
  newWidths[currentIndex.value] = "1560px"; // 当前索引的div扩展

  newWidths[(currentIndex.value + 1) % 3] = "0px";
  newWidths[(currentIndex.value + 2) % 3] = "0px";

  // 更新状态和宽度
  currentIndex.value = (currentIndex.value + 1) % 3;
  widths.value = newWidths;
  console.debug(currentIndex.value);
};

//同时支持鼠标点击
const cycleclick = (value) => {
  setTimeout(() => {
    setActive(value + 1);
  }, 0);
  const newWidths = ["520px", "520px", "520px"]; // 重置宽度
  newWidths[value] = "1560px"; // 当前索引的div扩展

  newWidths[(value + 1) % 3] = "0px";
  newWidths[(value + 2) % 3] = "0px";

  // 更新状态和宽度
  currentIndex.value = (value + 1) % 3;
  console.debug(currentIndex.value);
  widths.value = newWidths;
};


//fullpage相关设置
const options = reactive({
  licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
  //是否显示导航，默认为false
  navigation: false,
  controlArrows: false,
  afterLoad: (origin, destination, direction) => {
    index = destination.index + 1;
    //console.debug('!!!'+index.value);
    if (index === 1) {
      videoplay(index);
    }
  },
  onLeave: (origin, destination, direction) => {
    indexleave = origin.index + 1;
    //console.debug('???'+indexleave);
    if (index === 2) {
      const temwidths = ["520px", "520px", "520px"]; // 初始宽度
      widths.value = temwidths;
      currentIndex.value = 0;
      isActive1.value = false;
      isActive2.value = false;
      isActive3.value = false;
    }
  },
});

//修复不在当页仍然播放的bug
function videoplay(index) {
  videobackground.value.player.play();
}


//fullpage的相关api
const upFn = () => {
  // 向上滚动一页
  fullpageRef?.value?.api.moveSectionUp();
};
const leftFn = () => {
  // 向左滚动一页
  fullpageRef?.value?.api.moveSlideLeft();
};
const rightFn = () => {
  // 向右滚动一页
  fullpageRef?.value?.api.moveSlideRight();
};
const next = () => {
  // 向下滚动一页
  fullpageRef?.value?.api.moveSectionDown();
};
const last = () => {
  // 向下滚动一页
  console.log(fullpageRef?.value?.api);
  fullpageRef?.value?.api.moveSectionUp();
};
const moveToFn = () => {
  // 向 第几页 滚动
  // fullpageRef?.value?.api.moveTo(3,0);
  fullpageRef?.value?.api.moveTo(3, 2); // 滚动向 竖第三 横第二 页
  // fullpage_api.moveTo('firstSlide', 2);
  // fullpage_api.moveTo(3, 0);
  // fullpage_api.moveTo(3);
};


//导航栏的跳转
function loading() {
  router.push({ path: "/detail/mainmap" });
}

// function test() {
//   console.debug(showmask.value);
// }

function predictbegin() {
  router.push({ path: "/detail/analysis" });
}
function searchbegin() {
  router.push({ path: "/detail/search" });
}
function newsbegin() {
  router.push({ path: "/detail/news" });
}

// 创建响应式变量
const initialIndex = ref(0); // 假设这是你的初始索引

// 监听鼠标滚动事件
function handleScroll(e) {
  // 判断滚动方向
  let direction = e.deltaY > 0 ? "down" : "up";
  //console.debug(e.deltaY);

  // if (direction === "down" && e.deltaY >= 100 && index === 2) {
  //   rightFn();
  // }

  // if (direction === "up" && e.deltaY <= -100 && index === 2) {
  //   //fullpageRef?.value?.api.setAllowScrolling(false);
  //   leftFn();
  // }

  if (direction === "down" && e.deltaY >= 100 && index === 2 && booljus.value) {
    booljus.value = false;
    //console.debug("111111!!!!!!");
    cycleAnimations();
    setTimeout(() => {
      booljus.value = true;
    }, 1000);
  }
}

// fullpage使用滚轮
onMounted(() => {
  window.addEventListener("wheel", handleScroll); // 注意：'mousewheel' 在某些浏览器中可能不被支持，建议使用 'wheel'
});
</script>

<style scoped>
@import "../../src/style/ZhuYe.css";  
</style>