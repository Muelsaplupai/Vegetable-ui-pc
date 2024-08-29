<template>
  <el-header>
    <!-- 头部区 -->
    <div>
      <img src="@/assets/logo.png" alt="" height="90px" />
      <span>农产品市场大数据系统</span>
    </div>

    <div class="search-box">
      <input type="text" class="search-left" />
      <button class="search-right" @click="search">
        <el-icon :size="20">
          <Search />
        </el-icon>
      </button>
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
import bus from "./bus";
function search() {
  console.debug("search");
}
const reg = () => {
  bus.emit("loginBegin", "true");
  bus.emit("maskBegin", "true");
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #bacec6;
  display: flex; //设置显示为flex布局
  justify-content: space-between; //设置为flex左右布局
  padding-left: 0; //左内边距为0（Logo贴左边）
  opacity: 0.8;
  backdrop-filter: blur(10px);
  align-items: center; //元素上下居中（防止右边按钮贴上下边）
  color: #ffffff;
  font-size: 23px;
 
  > div {
    //内嵌的div样式
    display: flex;
    align-items: center; //Logo和文字上下居中

    span {
      margin-left: 15px; //文字左侧设置间距，防止与Logo紧贴
    }
  }

  height: 90px;
  position: absolute;
  z-index: 1;
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
</style>
