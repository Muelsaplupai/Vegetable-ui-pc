<template>
<div class="mainimg"></div>
  <div class="mainimg2"></div>
    <div style="text-align: center; background-color: #BACEC6;">
        <el-container class="home-container">
            <HeaderIns />

            <BodyIns />
        </el-container>
    </div>



</template>
<script setup>
import HeaderIns from "@/views/Main-1/Header-main2.vue"
import HeadermainIns from "@/views/Main-1/Header-main.vue"
import BodyIns from "@/views/Detail1/Body.vue"
import RoseIns from "@/views/Main-2/RoseMap.vue"
import MainBodyMid from "@/views/Main-2/Main-body-mid.vue"
import BarChartIns from "../Main-2/BarChart.vue"
import BoardIns from "../Main-2/Board.vue"
import RollIns from "../Main-2/RollNews.vue"
import VideoBackground from 'vue-responsive-video-background-player';
import { ref, onMounted, onUnmounted, reactive, defineProps, toRefs, watch } from "vue";
import { Apple } from "@element-plus/icons-vue"

const fullpageRef = ref();
const videobackground = ref();
let index = ref();
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

}
)
function testw(index) {
    videobackground.value.player.play();
}



const upFn = () => { // 向上滚动一页
    fullpageRef?.value?.api.moveSectionUp();
}
const leftFn = () => { // 向左滚动一页
    fullpageRef?.value?.api.moveSlideLeft();
}
const rightFn = () => { // 向右滚动一页
    fullpageRef?.value?.api.moveSlideRight();
}
const next = () => { // 向下滚动一页
    fullpageRef?.value?.api.moveSectionDown();
}
const last = () => { // 向下滚动一页
    console.log(fullpageRef?.value?.api);
    fullpageRef?.value?.api.moveSectionUp();
}
const moveToFn = () => { // 向 第几页 滚动
    // fullpageRef?.value?.api.moveTo(3,0);
    fullpageRef?.value?.api.moveTo(3, 2); // 滚动向 竖第三 横第二 页 
    // fullpage_api.moveTo('firstSlide', 2);
    // fullpage_api.moveTo(3, 0);
    // fullpage_api.moveTo(3);
}

function loading() {
    console.debug("222222")
}

</script>
<style lang="less" scoped>
.home-container {
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    position: relative;
    background-color: #BACEC6;
}

.home-container2 {
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    position: relative;
    opacity: 0.75;
}

.home-container3 {
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    position: relative;
    opacity: 0.75;
    background-color: #BACEC6;
}

.main-body {
    display: flex;
    width: 100%;
    background-color: #BACEC6;
    flex-direction: row;
    flex: 1;
    justify-content: space-between;
}

.main-row1 {
    display: flex;
    background-color: #BACEC6;
    flex-direction: column;
    width: 25%;
}

.main-col {
    display: flex;
    justify-content: space-between;
    background-color: #BACEC6;
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

.maintext3 {
    display: flex;
    margin-top: 300px;
    justify-content: center;
    color: #527865;
    align-items: center;
    font-size: 350%;
    font-weight: 800;
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

.pagethirdbutton {
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
.back {
  background-color: #195e42;
  opacity: 0.4;
  height: 70px;
  position: absolute;
  z-index: 1;
  width: 100%;
}

.mainimg {
  text-align: center;
  background-image: url("@/assets/background6.jpg");
  z-index: 1;
  width: 100%; //大小设置为100%
  height: 100%; //大小设置为100%
  background-size: 100% 100%;
  position: absolute;
  border-radius: 10px;
  backdrop-filter: blur(10px);
}
.mainimg2 {
  text-align: center;
  z-index: 2;
  width: 100%; //大小设置为100%
  height: 100%; //大小设置为100%
  background-size: 100% 100%;
  opacity: 0.8;

  background-color: #ffffff;
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
    background-image: url("@/assets/background3.jpg");
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