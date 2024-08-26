<template>
    <div>
        <full-page :options="options" ref="fullpageRef">
            <div class="section">
                <div style="text-align: center">
                    <el-container class="home-container">
                        <HeaderIns />

                        <div class="main-body">
                            <div class="main-row">
                                <div class="main-col">
                                    1
                                </div>
                                <div class="main-col">
                                    2
                                </div>
                            </div>
                            <div class="main-row">
                                <div class="mid-up">
                                    市场总数 品种总数 品类总数 数据总量
                                </div>
                               <MapIns />
                            </div>
                            <div class="main-row">
                                <div class="main-col">
                                    3
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
import MapIns from "@/views/Map.vue"
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
.fp-watermark {
    display: none !important;
}

.home-container {
    display: flex;
    width: 100%;
    height:100vh;
    flex-direction: column;
}

.main-body{
    display: flex;
    width: 100%;
    background-color:#BACEC6 ;
    flex-direction:row;
    flex:1;
}
.main-row{
    display: flex;
    background-color:#BACEC6 ;
    flex-direction:column;
    flex:1;
}
.main-col{
    display: flex;
    justify-content: space-between;
    background-color:#D2DEC7 ;
    flex:1;
}
.mid-up{
    height: auto;
    font-size: medium;
    color: #000000;
}
</style>