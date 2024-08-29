<template>
  <div class="line1">
    <button class="price">
      <div class="title">今日价格</div>
      <div class="average">￥888</div>
      <div class="topdown">
        最高价：￥1000 <br />
        最低价：￥788
      </div>
    </button>
    <button class="el-2">2</button>
    <button class="predict"><PredictIns></PredictIns></button>
  </div>
  <div class="line2">
    <button class="el-3">3</button>
    <button class="el-4">4</button>
    <button class="el-5">5</button>
  </div>
</template>

<script setup lang="ts">
import PredictIns from "./Predict.vue";
</script>
<style>
.predict {
  display: flex;
  width: 500px;
  height: 350px;
  background-color: #d7ede4;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 4%;
}

.line1 {
  display: flex;
  justify-content: space-between;
}

.line2 {
  display: flex;
  justify-content: space-between;
}

.price {
  display: flex;
  background-color: #215A59;
  width: 350px;
  height: 350px;
  border-radius: 20px;
  border: none;
  flex-direction: column;
}

.el-2 {
  background-color: #d7ede4;
  width: 350px;
  height: 350px;
  border-radius: 20px;
  border: none;
}

.el-3 {
  background-color: #d7ede4;
  width: 400px;
  height: 220px;
  border-radius: 20px;
  border: none;
}

.el-4 {
  background-color: #d7ede4;
  width: 400px;
  height: 220px;
  border-radius: 20px;
  border: none;
}

.el-5 {
  background-color: #d7ede4;
  width: 400px;
  height: 220px;
  border-radius: 20px;
  border: none;
}
.title {
  display: flex;
  width: 200px;
  height: 60px;
  color: #ffffff;
  font-size: 200%;
  margin-top: 5%;
  margin-left: 5%;
}
.average {
  display: flex;
  width: 200px;
  height: 60px;
  color: #ffffff;
  font-size: 300%;
  margin-top: 5%;
  margin-left: 33%;
}
.topdown {
  display: flex;
  width: 200px;
  height: 60px;
  color: #ffffff;
  font-size: 120%;
  margin-top: 5%;
  margin-left: 33%;
}
</style>
