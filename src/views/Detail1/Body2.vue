<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside>
      <button class="el-selection" @click="currentPage = 'SearchIns'">
        <img src="@/assets/logo1.png" class="sleimg" />
        <div class="sletext">数据查询</div>
      </button>
      <button class="el-selection" @click="currentPage = 'AnalysisAndPredictIns'">
        <img src="@/assets/logo2.png" class="sleimg" />
        <div class="sletext">预测分析</div>
      </button>
      <button class="el-selection" @click="currentPage = 'NewsIns'">
        <img src="@/assets/logo3.png" class="sleimg" />
        <div class="sletext">市场动态</div>
      </button>
      <button class="el-selection">
        <img src="@/assets/logo4.png" class="sleimg" />
        <div class="sletext">农事指导</div>
      </button>
    </el-aside>
    <!-- 右侧内容主体 -->
    <el-main>
      <NewsIns />
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
let currentPage = ref("SearchIns");

const pageComponents = {
  SearchIns,
  NewsIns,
  AnalysisAndPredictIns,
};
onMounted(() => {
  bus.on("preBegin", (e) => {
    // 传参由回调函数中的形参接受
    currentPage.value = e;
    test11();
  });
});
let currentPageComponent = computed(() => pageComponents[currentPage.value]);

function test11()
{
  currentPage = 'AnalysisAndPredictIns'
}
</script>

<style lang="less" scoped>
.el-aside {
  display: flex;
  background-color: #bacec6;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  margin-top: 1.3%;
  margin-bottom: 7%;
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
</style>
