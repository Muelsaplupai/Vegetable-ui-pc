<template>
    <div>
        <full-page :options="options" ref="fullpageRef">
            <div class="section">
                <div style="text-align: center">
                    <el-container class="home-container">
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
                                    4
                                </div>
                            </div>
                        </div>


                    </el-container>
                </div>
            </div>
            <div class="section">
                <div style="text-align: center">
                    <el-container class="home-container">
                        <HeaderIns />

                        <BodyIns />
                    </el-container>
                </div>
            </div>
            <div class="section">
                <div class="slide">
                    <div style="height: 100vh">1
                        <button @click="rightFn">右</button>
                        3⃣️
                    </div>
                </div>
                <div class="slide">
                    <div style="height: 100vh">
                        <div style="text-align: center">
                            <button @click="leftFn">左</button>
                            <button @click="rightFn">右</button>
                            3⃣️
                        </div>
                    </div>
                </div>
                <div class="slide">
                    <div style="height: 100vh">2
                        <button @click="leftFn">左</button>
                        3⃣️
                    </div>
                </div>
            </div>
            <div class="section">
                <div class="box3">
                    <div style="height: 100vh"> 4⃣️</div>
                </div>
            </div>
        </full-page>
        <div>
        </div>
    </div>
</template>
<script setup>
import HeaderIns from "@/views/Header.vue"
import BodyIns from "@/views/Body.vue"
import RoseIns from "@/views/RoseMap.vue"
import MainBodyMid from "@/views/Main-body-mid.vue"
import BarChartIns from "./BarChart.vue"
import BoardIns from "./Board.vue"
import { ref, onMounted, reactive, defineProps, toRefs, watch } from "vue";
const fullpageRef = ref();
const options = reactive({
    licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
    //是否显示导航，默认为false
    navigation: true,
    //为每个section设置背景色
    sectionsColor: [
        "#BACEC6", "#BACEC6", "#BACEC6",
        "#BACEC6", "#BACEC6", "#BACEC6",
        "#BACEC6", "#BACEC6", "#BACEC6"
    ],
})
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







</script>
<style lang="less" scoped>
.home-container {
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
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
</style>