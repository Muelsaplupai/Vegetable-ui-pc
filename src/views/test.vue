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
                src="src/assets/test1.mp4"
                style="max-height: 100%; height: 100vh"
              >
                <div class="maintext">
                  创意无限<br /><br />
                  力启未来
                  <LoginIns />
                  <RegisterIns />
                </div>
                <br /><br /><br />
                <button class="mainbutton" @click="loading">点击详情</button>
              </video-background>
            </div>
          </el-container>
        </div>
      </div>
      <div class="section">
        <div class="mainimg"></div>
        <div class="mainimg2"></div>
        <el-container class="home-container2">
          <div class="main-body">
            <div class="main-row1">
              <div class="main-col">
                <div class="main-col-header">价格排行</div>
                <div class="main-col-con">
                  <BoardIns />
                </div>
              </div>
              <div class="main-col">
                <div class="main-col-header">近期销量</div>
                <div class="main-col-con">
                  <BarChartIns />
                </div>
              </div>
            </div>
            <MainBodyMid />
            <div class="main-row1">
              <div class="main-col">
                <div class="main-col-header">市场销量</div>
                <div class="main-col-con">
                  <RoseIns />
                </div>
              </div>
              <div class="main-col">
                <div class="main-col-header">市场销量</div>
                <div class="main-col-con">
                  <RollIns />
                </div>
              </div>
            </div>
          </div>
        </el-container>
      </div>
      <div class="section">
        <div class="slide">
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
      </div>
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
const apiUrl = "https://apifoxmock.com/m1/5019871-4679592-default/prvc";
const items = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get(apiUrl);
    items.value = response.data;
    console.debug("catch");
    console.debug(response.data.data.prvcList[0]);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
const router = useRouter();
const fullpageRef = ref();
const videobackground = ref();

let index = ref();
let indexleave = ref();
const options = reactive({
  licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
  //是否显示导航，默认为false
  navigation: false,
  //为每个section设置背景色
  // sectionsColor: [
  //     "#BACEC6", "#BACEC6", "#BACEC6",
  //     "#BACEC6", "#BACEC6", "#BACEC6",
  //     "#BACEC6", "#BACEC6", "#BACEC6"
  // ],
  afterLoad: (origin, destination, direction) => {
    index = destination.index + 1;
    if (index === 1) {
      testw(index);
    }
  },
  onLeave: (origin, destination, direction) => {
    indexleave = origin.index + 1;
    console.debug(indexleave);
    if (index === 1) {
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

function predictbegin(){
  bus.emit("preBegin", "AnalysisAndPredictIns");
  router.push({ path: "/detail" });
  
}
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
  justify-content: space-between;
  background-color: transparent;
  flex: 1;
  flex-direction: column;
}

.main-col-con {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}

.main-col-header {
  height: 15%;
  display: flex;
  justify-content: center;
  color: #000000;
  align-items: center;
  font-size: larger;
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
  margin-top: 300px;
  justify-content: center;
  color: #527865;
  align-items: center;
  font-size: 350%;
  font-weight: 800;
  margin-left: 80%;
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
  color: #527865;
  z-index: 9;
}
.mainbutton {
  width: 170px;
  height: 40px;
  font-size: 150%;
  font-weight: 300;
  background: rgba(0, 0, 0, 0);
  border-color: #ffffff;
  color: #ffffff;
  z-index: 9;
  align-items: center;
  justify-content: center;
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
  justify-content: center;
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
  background-image: url("@/assets/background1.jpg");
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
  opacity: 0.75;
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
</style>
