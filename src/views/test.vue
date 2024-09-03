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
            <button class="pagethirdbutton1" @click="predictbegin">点击详情</button>
          </div></transition
        >
        <transition name="slide-up" v-show="isActive3 === true">
          <div class="text3" >
            <div class="maintext31">
              最新动态<br /><br />
              洞悉未来
            </div>
            <br /><br /><br />
            <button class="pagethirdbutton1" @click="predictbegin">点击详情</button>
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
      <!-- <div class="section">
        <div class="slide" style="width: 500px">
          <div class="text3">
            <div class="maintext31">
              重新定义<br /><br />
              数据预测
            </div>
            <br /><br /><br />
            <button class="pagethirdbutton1" @click="predictbegin">点击详情</button>
          </div>

          <div class="mainimg31">
            <el-container class="home-container31"> </el-container>
          </div>
        </div>
        <div class="slide">
          <div class="text3">
            <div class="maintext32">
              大千世界<br /><br />
              监控全局
            </div>
            <br /><br /><br />
            <button class="pagethirdbutton2" @click="searchbegin">点击详情</button>
          </div>
          <div class="mainimg32">
            <el-container class="home-container32"> </el-container>
          </div>
        </div>
        <div class="slide">
          <div class="text3">
            <div class="maintext33">
              最新动态<br /><br />
              洞悉未来
            </div>
            <br /><br /><br />
            <button class="pagethirdbutton3" @click="newsbegin">点击详情</button>
          </div>
          <div class="mainimg33">
            <el-container class="home-container33"> </el-container>
          </div>
        </div>
      </div> -->
    </full-page>
  </div>
</template>
<script setup>
import HeaderIns from "@/views/Header.vue";
import HeadermainIns from "@/views/Main-1/Header-main.vue";
import BodyIns from "@/views/Detail1/Body.vue";
import RoseIns from "@/views/Main-2/RoseMap.vue";
import MainBodyMid from "@/views/Main-2/Main-body-mid.vue";
import BarChartIns from "./Main-2/BarChart.vue";
import BoardIns from "./Main-2/Board.vue";
import RollIns from "./Main-2/RollNews.vue";
import VideoBackground from "vue-responsive-video-background-player";
import LoginIns from "./Main-1/Login.vue";
import RegisterIns from "./Main-1/Register.vue";
import { ref, onMounted, onUnmounted, reactive, defineProps, toRefs, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import bus from "@/views/Main-1/bus";
// 替换为你的 Apifox Mock URL
const apiUrl = "https://apifoxmock.com/m1/5019871-4679592-default/price/twoindex";
const items = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get(apiUrl);
    items.value = response.data;
    console.debug("catch");
    console.debug(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
const router = useRouter();
const fullpageRef = ref();
const videobackground = ref();

let index = ref();
let indexleave = ref();

const isActive1 = ref(false);
const isActive2 = ref(false);
const isActive3 = ref(false);
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

const widths = ref(["520px", "520px", "520px"]); // 初始宽度
const colors = ref(["red", "blue", "green"]); // 为每个div设置不同的背景颜色
const images = ref([
  "@/assets/background2.jpg",
  "@/assets/background5.jpg",
  "@/assets/background4.jpg",
]); // 为每个div设置不同的背景颜色

const currentIndex = ref(0);
const booljus = ref(true);
const cycleAnimations = () => {
  setTimeout(() => {
    setActive(currentIndex.value+1);
    }, 0);
  
  const newWidths = ["520px", "520px", "520px"]; // 重置宽度
  newWidths[currentIndex.value] = "1560px"; // 当前索引的div扩展

  newWidths[(currentIndex.value + 1) % 3] = "0px";
  newWidths[(currentIndex.value + 2) % 3] = "0px";

  // 更新状态和宽度
  currentIndex.value = (currentIndex.value + 1) % 3;
  widths.value = newWidths;
  console.debug( currentIndex.value);
};
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
const options = reactive({
  licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
  //是否显示导航，默认为false
  navigation: false,
  controlArrows: false,
  //为每个section设置背景色
  // sectionsColor: [
  //     "#BACEC6", "#BACEC6", "#BACEC6",
  //     "#BACEC6", "#BACEC6", "#BACEC6",
  //     "#BACEC6", "#BACEC6", "#BACEC6"
  // ],
  afterLoad: (origin, destination, direction) => {
    index = destination.index + 1;
    //console.debug('!!!'+index.value);
    if (index === 1) {
      testw(index);
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
function testw(index) {
  videobackground.value.player.play();
}

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

function loading() {
  router.push({ path: "/detail/search" });
}

function test() {
  console.debug(showmask.value);
}

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
  // 处理滚动逻辑
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

// 组件挂载时添加事件监听器
onMounted(() => {
  window.addEventListener("wheel", handleScroll); // 注意：'mousewheel' 在某些浏览器中可能不被支持，建议使用 'wheel'
});
</script>
<style lang="less" scoped>
.home-container {
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  position: relative;
}

.home-container2 {
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  position: relative;
  z-index: 3;
  background-color: transparent;
}
.home-container31 {
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  position: relative;
  opacity: 0.75;
  background-color: #bacec6;
}
.home-container32 {
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  position: relative;
  opacity: 0.75;
  background-color: #a59aca;
}
.home-container33 {
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  position: relative;
  opacity: 0.75;
  background-color: #ffd87c;
}
.main-body {
  display: flex;
  width: 100%;
  background-color: transparent;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
}

.main-row1 {
  display: flex;
  background-color: transparent;
  flex-direction: column;
  width: 25%;
}

.main-col {
  display: flex;
  background-color: transparent;
  flex: 1;
  flex-direction: column;
}

.maintext {
  display: flex;
  margin-top: 300px;
  justify-content: center;
  color: #ffffff;
  align-items: center;
  font-size: 350%;
  font-weight: 800;
}
.maintext31 {
  display: flex;
  margin-top: 220px;
  margin-left: 100px;
  color: #527865;
  align-items: center;
  font-size: 350%;
  font-weight: 800;
}
.maintext32 {
  display: flex;
  margin-top: 300px;
  justify-content: center;
  color: #5f479a;
  align-items: center;
  font-size: 350%;
  font-weight: 800;
  margin-left: 80%;
}
.maintext33 {
  display: flex;
  margin-top: 300px;
  justify-content: center;
  color: #cf4813;
  align-items: center;
  font-size: 350%;
  font-weight: 800;
  margin-left: 80%;
}
.text3 {
  position: absolute;
  margin-left: 0;
  color: #ffffff;
  z-index: 12;
  transform: translateY(0);
  transition: transform 0.75s ease; /* 平滑过渡效果 */
}
.mainbutton {
  width: 210px;
  height: 40px;
  font-size: 150%;
  font-weight: 300;
  background: rgba(0, 0, 0, 0);
  border-color: #ffffff;
  color: #ffffff;
  z-index: 9;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}
.pagethirdbutton1 {
  margin-left: 680px;
  width: 170px;
  height: 40px;
  font-size: 150%;
  font-weight: 300;
  background: rgba(0, 0, 0, 0);
  border-color: #527865;
  color: #527865;
  z-index: 9;
  align-items: center;
  margin-left: 100px;
}
.pagethirdbutton2 {
  margin-left: 680px;
  width: 170px;
  height: 40px;
  font-size: 150%;
  font-weight: 300;
  background: rgba(0, 0, 0, 0);
  border-color: #5f479a;
  color: #5f479a;
  z-index: 9;
  align-items: center;
  justify-content: center;
}
.pagethirdbutton3 {
  margin-left: 680px;
  width: 170px;
  height: 40px;
  font-size: 150%;
  font-weight: 300;
  background: rgba(0, 0, 0, 0);
  border-color: #cf4813;
  color: #cf4813;
  z-index: 9;
  align-items: center;
  justify-content: center;
}
.mainimg {
  text-align: center;
  background-image: url("@/assets/background6.jpg");
  z-index: 1;
  width: 100%; //大小设置为100%
  height: 100%; //大小设置为100%
  background-size: 100% 100%;
  position: absolute;
}
.mainimg2 {
  text-align: center;
  z-index: 3;
  width: 100%; //大小设置为100%
  height: 100%; //大小设置为100%
  background-size: 100% 100%;
  opacity: 0.8;
  background-color: #bacec6;
  position: absolute;
}
.mainimg31 {
  background-image: url("@/assets/background2.jpg");
  z-index: 1;
  width: 100%; //大小设置为100%
  height: 100%; //大小设置为100%
  background-size: 100% 100%;
}
.mainimg32 {
  background-image: url("@/assets/background5.jpg");
  z-index: 1;
  width: 100%; //大小设置为100%
  height: 100%; //大小设置为100%
  background-size: 100% 100%;
}
.mainimg33 {
  background-image: url("@/assets/background4.jpg");
  z-index: 1;
  width: 100%; //大小设置为100%
  height: 100%; //大小设置为100%
  background-size: 100% 100%;
}

.container {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: transparent;
}

.divs {
  display: flex;
  width: 100%;
  height: 100%;
  background: transparent;
}

.div0 {
  flex: 0 0 auto; /* 禁用flex的伸缩性，使div保持固定宽度 */
  height: 1000px;
  background-position: center; /* 确保背景图片居中 */
  z-index: 9;
  background-image: url("@/assets/background7.jpg");
  /* 注意：我们不在这里设置transition，而是在v-for中的:style中设置 */
}
.div1 {
  flex: 0 0 auto; /* 禁用flex的伸缩性，使div保持固定宽度 */
  height: 1000px;
  background-position: center; /* 确保背景图片居中 */
  z-index: 9;
  background-image: url("@/assets/background8.jpg");
  /* 注意：我们不在这里设置transition，而是在v-for中的:style中设置 */
}
.div2 {
  flex: 0 0 auto; /* 禁用flex的伸缩性，使div保持固定宽度 */
  height: 1000px;
  background-position: center; /* 确保背景图片居中 */
  z-index: 9;
  background-image: url("@/assets/background2.jpg");
  /* 注意：我们不在这里设置transition，而是在v-for中的:style中设置 */
}
/* 定义过渡效果 */
.expand-enter-active,
.expand-leave-active {
  transition: width 2s ease;
}
.expand-enter-from,
.expand-leave-to {
  width: 0; /* 对于离开动画，我们实际上不需要设置这个，因为Vue会处理 */
}
.expand-enter-to,
.expand-leave-from {
  /* 这里不需要特别设置，因为宽度是动态绑定的 */
}
//第二张的底部
.bottomtext {
  position: absolute;
  background-color: transparent;
  height: 100px;
  width: 100%;
  margin-top: 650px;
  z-index: 11;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  backdrop-filter: blur(10px);
}
.bottomtextback {
  position: absolute;
  background-color: #527865;
  height: 100px;
  width: 100%;
  margin-top: 650px;
  z-index: 10;
  opacity: 0.5;
}
.bottomtexttop {
  position: absolute;
  background-color: #527865;
  height: 650px;
  width: 100%;
  margin-bottom: 100px;
  z-index: 10;
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bottomtexttoptextback {
  position: absolute;
  background-color: transparent;
  height: 650px;
  width: 100%;
  margin-bottom: 100px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.bottomtexttoptext {
  z-index: 13;
  color: #ffffff;
  font-size: 500%;
  font-weight: 900;
}
.bottomtexttopsmalltext {
  z-index: 13;
  color: #ffffff;
  font-size: 150%;
  font-weight: 600;
  margin-bottom: 1%;
}
.special-style {
  z-index: 13;
  color: #b0d468;
  font-size: 100%;
  font-weight: 900;
}
.bottomtextItem {
  background-color: transparent;
  height: 100px;
  z-index: 10;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  font-size: 150%;
  color: #ffffff;
}
.bottomtextItem:hover {
  font-weight: 900;
  font-size: 150%;
  color: #b0d468;
}
.bottomtextItem.active {
  font-weight: 900;
  color: #b0d468;
  font-size: 150%;
}

.slide-up-enter-active {
  transition: transform 0.75s;
}
.slide-up-leave-active {
  transition: transform 0s;
}
.slide-up-enter-from {
  /* 向上移动的距离，可以根据需要调整 */
  transform: translateY(50px);
}

</style>
