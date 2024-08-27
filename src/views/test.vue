<template>
    <div>
        <full-page :options="options" ref="fullpageRef" id="mainpage">
            <div class="section">
                <div style="text-align: center">
                    <el-container class="home-container">
                        <HeadermainIns :index="index"></HeadermainIns>
                        <div>
                            <video-background ref="videobackground" src="src/assets/test1.mp4"
                                style="max-height: 100%; height: 100vh;">
                                <div class="maintext">创意无限<br><br>
                                    力启未来
                                </div>
                                <br><br><br>
                                <button class="mainbutton" @click="loading">
                                    点击详情
                                </button>
                            </video-background>
                        </div>
                    </el-container>
                </div>
            </div>
            <div class="section">
                <div class="mainimg">
                    <el-container class="home-container2">
                        <HeaderIns />

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
            </div>
            <div class="section">
                <div class="slide">
                    <div class="mainimg31">
                        <el-container class="home-container3">
                            <div class="maintext3">重新定义<br><br>
                                    数据预测
                                </div>
                                <br><br><br>
                                <button class="pagethirdbutton">
                                    点击详情
                                </button>
                        </el-container>
                    </div>
                </div>
                <div class="slide">
                    <div class="mainimg32">
                        <el-container class="home-container2">

                        </el-container>
                    </div>
                </div>
                <div class="slide">
                    <div class="mainimg33">
                        <el-container class="home-container2">

                        </el-container>
                    </div>
                </div>
            </div>
        </full-page>
    </div>
</template>
<script setup>
import HeaderIns from "@/views/Header.vue"
import HeadermainIns from "@/views/Main-1/Header-main.vue"
import BodyIns from "@/views/Body.vue"
import RoseIns from "@/views/Main-2/RoseMap.vue"
import MainBodyMid from "@/views/Main-2/Main-body-mid.vue"
import BarChartIns from "./Main-2/BarChart.vue"
import BoardIns from "./Main-2/Board.vue"
import RollIns from "./Main-2/RollNews.vue"
import VideoBackground from 'vue-responsive-video-background-player';
import { ref, onMounted, onUnmounted, reactive, defineProps, toRefs, watch } from "vue";
import { useRouter } from 'vue-router'
import { Apple } from "@element-plus/icons-vue"

 
const router =useRouter();
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
    router.push({path:'/detail'})
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
    opacity: 0.75;
}
.home-container3 {
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    position: relative;
    opacity: 0.75;
    background-color:#BACEC6 ;
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
.mainimg {
    text-align: center;
    background-image: url("@/assets/background1.jpg");
    z-index: 1;
    width: 100%; //大小设置为100%
    height: 100%; //大小设置为100%
    background-size: 100% 100%;
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