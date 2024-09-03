<template>
  <el-header :class="{ 'el-header': true, 'open': isOpen }"
    ><!-- 头部区 -->
    <div>
      <img src="../assets/logo.png" alt="" height="90px" />
    </div>

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
          <router-link to="/detail/advice">
            <div class="nav">企业市场</div>
          </router-link>
          <router-link to="/detail/advice">
            <div class="nav">供需出口</div>
          </router-link>
        </div>
      </div>

    <div flex-end >
      <div style="font-size: 80%; margin-right: 10%; width:100px; color:#527865">登录/注册</div>
      <button class="user" @click="reg">
        <el-icon style="color: #ffffff;">
          <User />
        </el-icon>
      </button>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { ref } from "vue";
let isOpen = ref('Expand');
function reg() {
  console.debug("reg");
}

function search() {
  console.debug("search");
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #bacec6;
  display: flex; //设置显示为flex布局
  justify-content: space-between; //设置为flex左右布局
  padding-left: 0; //左内边距为0（Logo贴左边）
  align-items: center; //元素上下居中（防止右边按钮贴上下边）
  color: #fff;
  font-size: 23px;
  > div {
    //内嵌的div样式
    display: flex;
    align-items: center; //Logo和文字上下居中

    span {
      margin-left: 15px; //文字左侧设置间距，防止与Logo紧贴
    }
  }
  overflow: hidden;
  max-height: 0;
  transform: translateY(-100%);
  opacity: 0;
  transition: max-height 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
}
.el-header.open {
    max-height: 200px; /* Ensure this is larger than the expanded height */
  transform: translateY(0);
  opacity: 1;
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
}

.search-box {
  display: flex;
  margin-top: 8px;
  width: 300px;
  flex-wrap: nowrap;
}

.search-left {
  text-indent: 20px;
  width: 85%;
  height: 30px;
  border-bottom-left-radius: 25px;
  border-top-left-radius: 25px;
  border: none;
  outline: 0px;
  align-items: center;
  background-color: #527865;
}

span {
  color: #527865;
}

.search-right {
  width: 15%;
  //box-sizing: content-box;
  height: 30px;
  background: #527865;
  color: #fff;
  border: none;
  border-bottom-right-radius: 25px;
  border-top-right-radius: 25px;
  outline: none;
  align-items: center;
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
</style>
