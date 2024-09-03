<template>
  <el-container style="background-color: #BACEC6;">
    <!-- 侧边栏 -->
    <!-- <div class="textmain">当前位置：{{textmain}}</div>
    <el-aside>
      <button class="el-selection" @click="goEcharts" style="margin-top: 9%">
        <img src="@/assets/logo5.png" class="sleimg" />
        <div class="sletext">返回主页</div>
      </button>
      <button class="el-selection" @click="text21">
        <img src="@/assets/logo1.png" class="sleimg" />
        <div class="sletext">数据查询</div>
      </button>
      <button class="el-selection" @click="text22">
        <img src="@/assets/logo2.png" class="sleimg" />
        <div class="sletext">预测分析</div>
      </button>
      <button class="el-selection" @click="text23">
        <img src="@/assets/logo3.png" class="sleimg" />
        <div class="sletext">市场动态</div>
      </button>
      <button class="el-selection" @click="text24">
        <img src="@/assets/logo4.png" class="sleimg"  />
        <div class="sletext">农事指导</div>
      </button>
    </el-aside> -->
    <!-- 右侧内容主体 -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script setup>
import GSymbol from "@/components/Gsymbol/GSymbol.vue";
import SearchIns from "./Search.vue";
import NewsIns from "./News.vue";
import PredictIns from "./Predict.vue";
import AnalysisAndPredictIns from "./AnalysisAndPredict.vue";
import { ref, computed, onMounted } from "vue";
import bus from "../Main-1/bus";
import test from "node:test";
import { useRouter } from "vue-router";
let currentPage = ref("SearchIns");
let textmain=ref("数据查询");
const router = useRouter();
const pageComponents = {
  SearchIns,
  NewsIns,
  AnalysisAndPredictIns,
};
function goEcharts() {
  router.push({ path: "/" });
}
onMounted(() => {
  bus.on("preBegin", (e) => {
    // 传参由回调函数中的形参接受
    currentPage.value = e;
    test11();
  });
});
let currentPageComponent = computed(() => pageComponents[currentPage.value]);

function test11() {
  currentPage = "AnalysisAndPredictIns";
}
function text21() {
  goToComponent('search');
  textmain.value="数据查询"
}
function text22() {
   goToComponent('analysis');
  textmain.value="预测分析"
}
function text23() {
   goToComponent('news');
  textmain.value="市场动态"
}
function text24() {
   goToComponent('advice');
  textmain.value="农事指导"
}
const goToComponent = (componentName) => {
  router.push(`/detail/${componentName}`);
};


</script>

<style lang="less" scoped>
.el-aside {
  display: flex;
  background-color: #bacec6;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  margin-top: 4%;
  margin-bottom: 1.2%;
}

.el-main {
  background-color: #bacec6;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.el-selection {
  background-color: #d7ede4;
  width: 90px;
  height: 90px;
  border-radius: 20px;
  border: none;
}
.el-selection-main {
  background-color: transparent;
  width: 100px;
  height: 30px;
  border: none;
}
.el-selection:hover {
  background-color: #f1e1e5;
}

.sleimg {
  margin-top: -5px;
  height: 50px;
}
.sletext {
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  color: #1d382d;
}
.textmain {
  position: absolute;
  margin-left: 1.5%;
  margin-top: 1.5%;
  color: #1d382d;
  font-size: 150%;
}
</style>
