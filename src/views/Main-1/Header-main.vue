<template>
  <div class="back"></div>
  <el-header>
    <!-- 头部区 -->
    <div>
      <img src="@/assets/logo.png" alt="" height="90px" />

      <div class="title">
        <div class="title-left">
          <router-link to="/detail/mainmap">
            <div class="nav">首页大屏</div>
          </router-link>
          <router-link to="/detail/search">
            <div class="nav">价格查询</div>
          </router-link>
          <router-link to="/detail/analysis">
            <div class="nav">产品分析</div>
          </router-link>
          <router-link to="/detail/news">
            <div class="nav">农讯指南</div>
          </router-link>
          <router-link to="/detail/company">
            <div class="nav">企业市场</div>
          </router-link>
          <router-link to="/detail/advice">
            <div class="nav">供需出口</div>
          </router-link>
        </div>
      </div>
    </div>
    <div flex-end>
      <button class="regbutton" @click="reg">登录/注册</button>
      <button class="user" @click="reg">
        <el-icon style="color: #ffffff">
          <User />
        </el-icon>
      </button>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import bus from "./bus";

const reg = () => {
  bus.emit("loginBegin", "true");
  bus.emit("maskBegin", "true");
};
</script>

<style lang="less" scoped>
.back {
  background-color: #bacec6;
  opacity: 0.4;
  height: 70px;
  position: absolute;
  z-index: 1;
  width: 100%;
}
.el-header {
  background-color: transparent;
  display: flex; //设置显示为flex布局
  justify-content: space-between; //设置为flex左右布局
  padding-left: 0; //左内边距为0（Logo贴左边）
  backdrop-filter: blur(10px);
  font-size: 23px;

  > div {
    //内嵌的div样式
    display: flex;
    align-items: center; //Logo和文字上下居中

    span {
      margin-left: 15px; //文字左侧设置间距，防止与Logo紧贴
    }
  }

  height: 70px;
  position: absolute;
  z-index: 2;
  width: 100%;
}

.home-container {
  width: 100%;
  height: 100vh;
}

.el-logo {
  background-color: #eedaaf;
}

.user {
  display: flex;
  border-radius: 50%;
  background-color: #527865;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border: none;
  z-index: 3;
}

span {
  color: #527865;
}

.title {
  height: 70px;
  width: 900px;
  background-color: transparent;
  margin-bottom: 30px;
}
.title-left {
  width: 900px;
  height: 48px;
  background: transparent;
  display: flex;
  margin-bottom: 10px;
}
.nav {
  font-size: 16px;
  color: #527865;
  width: 100px;
}
.nav:hover {
  color: #527865;
  font-weight: 600;
}
a {
  width: 70px;
  height: 48px;
  color: black;
  margin: 0px 10px;
  text-decoration: none;
  line-height: 48px;
  text-align: center;
}

.serch {
  height: 32px;
  width: 500px;
  background-color: #fff;
  margin: auto;
  display: flex;
}
.inputType {
  width: 400px;
  height: 30px;
  text-indent: 1em;
  line-height: 34px;
  background-color: #fff;
  border: 1px solid black;
  border-top-left-radius: 17px;
  border-bottom-left-radius: 17px;
  font-size: 12px;
}
.inputType:focus {
  outline: none;
  border: 1px solid rgb(230, 32, 213);
}
.button {
  color: #fff;
  text-align: center;
  background: rgba(204, 51, 0, 1);
  border-left: 1px solid rgba(0, 0, 0, 0.45);
  width: 100px;
  height: 32px;
  line-height: 34px;
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
}

.regbutton {
  font-size: 80%;
  margin-right: 1%;
  width: 150px;
  color: #527865;
  background-color: transparent;
  border: none;
}

.regbutton:hover{
  font-weight: 800;
}
</style>
