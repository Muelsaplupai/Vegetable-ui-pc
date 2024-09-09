<template>
  <el-container class="home-container2">
    <div class="main-body">
      <div class="main-row1">
        <div class="main-col">
          <div class="main-col-header1">
            <div style="margin-left: 10%; margin-top: 5%; font-weight:1000;">农产品价格涨幅排行</div>
          </div>
          <div class="main-col-con1">
            <BoardIns />
          </div>
        </div>
        <div class="main-col">
          <div class="main-col-header2">
            <div style="margin-left: 10%; margin-top: 5%;font-weight:1000;">农产品价格跌幅排行</div>
          </div>
          <div class="main-col-con1">
            <BoardDownIns />
          </div>
          
        </div>
      </div>
      <MainBodyMid />
      <div class="main-row1">
        <div class="main-col">
          <div class="main-col-header3">
            <div style="margin-left: 10%; margin-top: 5%;font-weight:1000;">“菜篮子”产品批发价格指数 </div>
          </div>
          <div class="main-col-con3">
            <twoindex />
          </div>
        </div>
        <div class="main-col">
          <div class="main-col-header4">
            <div style="margin-left: 10%; margin-top: 5%;font-weight:1000;">粮油产品批发价格指数</div>
          </div>
          <div class="main-col-con4">
            <twoindexplus />
          </div>
        </div>
      </div>
    </div>
  </el-container>
</template>
<script setup>
import HeaderIns from "@/views/Header.vue";
import HeadermainIns from "@/views/Main-1/Header-main.vue";
import BodyIns from "@/views/Detail1/Body.vue";
import BoardDownIns from "../Main-2/BoardDown.vue";
import RoseIns from "@/views/Main-2/RoseMap.vue";
import MainBodyMid from "@/views/Main-2/Main-body-mid.vue";
import BarChartIns from "@/views/Main-2/BarChart.vue";
import BoardIns from "@/views/Main-2/Board.vue";
import RollIns from "@/views/Main-2/RollNews.vue";
import VideoBackground from "vue-responsive-video-background-player";
import LoginIns from "@/views/Main-1/Login.vue";
import RegisterIns from "@/views/Main-1/Register.vue";
import twoindex  from "@/views/Main-2/twoindex.vue"
import twoindexplus from "@/views/Main-2/twoindexplus.vue"
import { ref, onMounted, onUnmounted, reactive, defineProps, toRefs, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import bus from "@/views/Main-1/bus";






</script>
<style lang="less" scoped>
.home-container {
  display: flex;
  width: 80%;
  height: 100vh;
  flex-direction: column;
  position: relative;
  margin-top: 10%;
}

.home-container2 {
  display: flex;
  width: 100%;
  margin-top: 3%;
  height: 83vh;
  flex-direction: column;
  position: relative;
  z-index: 3;
  background-color: transparent;
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
  width: 30%;
}

.main-col {
  display: flex;
  background-color: transparent;
  flex: 1;
  flex-direction: column;
}

.main-col-con1 {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
.main-col-con2 {
  display: flex;
  flex: 1;
  align-items: center;
  background-color: transparent;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin-bottom: 5%;
  margin-top: 15%;
  margin-right: 7%;
}
.main-col-con3 {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin-right: 10%;
  margin-left: 2%;
}
.main-col-con4 {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin-right: 20%;
  margin-bottom: 5%;
}
.main-col-header1 {
  height: 15%;
  display: flex;
  justify-content: first baseline;
  color: #000000;
  align-items: center;
  font-size: larger;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: transparent;
  margin-left: 5%;
  margin-top: 5%;
  color: #194955;
  font-size: 160%;
}
.main-col-header2 {
  height: 15%;
  display: flex;
  justify-content: first baseline;
  color: #000000;
  align-items: center;
  font-size: larger;
  background-color: transparent;
  margin-left: 5%;
  border-top-left-radius: 20px;
  margin-top: 5%;
  border-top-right-radius: 20px;
  color: #194955;
  font-size: 160%;
}
.main-col-header3 {
  height: 15%;
  display: flex;
  justify-content: first baseline;
  color: #000000;
  align-items: center;
  font-size: larger;
  background-color: transparent;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-right: 5%;
  margin-top: 5%;
  font-size: 160%;
  color: #194955;
}
.main-col-header4 {
  height: 15%;
  display: flex;
  justify-content: first baseline;
  color: #000000;
  align-items: center;
  font-size: larger;
  background-color: transparent;
  margin-right: 5%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-top: 5%;
  color: #194955;
  font-size: 160%;
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

.mainimg {
  text-align: center;
  background-image: url("@/assets/background6.jpg");
  z-index: 1;
  width: 97%; //大小设置为100%
  height: 89vh; //大小设置为100%
  background-size: 100% 100%;
  position: absolute;
  margin-top: 3.3%;
  border-radius: 10px;
}
.mainimg2 {
  text-align: center;
  z-index: 3;
  width: 97%; //大小设置为100%
  height: 89vh; //大小设置为100%
  background-size: 100% 100%;
  opacity: 0.8;
  background-color: #bacec6;
  position: absolute;
  margin-top: 3.3%;
  border-radius: 10px;
}

.mid-up {
  height: 100%;
  font-size: medium;
  color: #000000;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 20px;
  color: #194955;
  margin-left: 15%;
}
.mid-up-item {
  background-color: transparent;
  font-size: 120%;
  display: flex;
  align-items: center;
}
.mid-up-item1 {
  background-color: transparent;
  font-size: 120%;
  display: flex;
  align-items: center;
}
.mid-up-item2 {
  background-color: transparent;
  font-size: 120%;
  display: flex;
  align-items: center;
}
</style>
