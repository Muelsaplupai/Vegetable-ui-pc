<template>
  <div class="back"></div>
  <el-header>
    <!-- 头部区 -->
    <div>
      <img src="@/assets/logo.png" alt="" height="90px" />

      <div class="title">
        <div class="title-left">
          <router-link to="/detail/mainmap">
            <div class="nav" :class="{ active: isActive1 }">数据大屏</div>
          </router-link>
          <router-link to="/detail/search">
            <div class="nav" :class="{ active: isActive2 }">价格查询</div>
          </router-link>
          <router-link to="/detail/analysis">
            <div class="nav" :class="{ active: isActive3 }">产品分析</div>
          </router-link>
          <router-link to="/detail/news">
            <div class="nav" :class="{ active: isActive4 }">农讯指南</div>
          </router-link>
          <router-link to="/detail/company">
            <div class="nav" :class="{ active: isActive5 }">企业市场</div>
          </router-link>
          <router-link to="/">
            <div class="nav">回到主页</div>
          </router-link>
        </div>
      </div>
    </div>
    <div flex-end>
      <button class="regbutton" @click="reg">{{ username }}</button>
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
import { defineComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
const username=ref("登录/注册");
onMounted(() => {
  bus.on("username1", (e: any) => {
    // 传参由回调函数中的形参接受
    const name=e;
    username.value = name;
  });
});

const reg = () => {
  bus.emit("loginBegin", "true");
  bus.emit("maskBegin", "true");
};
const isActive1 = ref();
const isActive2 = ref();
const isActive3 = ref();
const isActive4 = ref();
const isActive5 = ref();
const router = useRouter();
watch(
  () => router.currentRoute.value.path,
  (toPath) => {
    //要执行的方法
    console.log("router", router.currentRoute.value.fullPath);
    changeact(router.currentRoute.value.fullPath);
  },
  { immediate: true, deep: true }
);

function changeact(tem) {
  if (tem === "/detail/news") {
    isActive1.value=isActive2.value=isActive3.value=isActive4.value=isActive5.value=false;
    isActive4.value=true;
  } else if (tem === "/detail/analysis") {
    isActive1.value=isActive2.value=isActive3.value=isActive4.value=isActive5.value=false;
    isActive3.value=true;
  } else if (tem === "/detail/search") {
    isActive1.value=isActive2.value=isActive3.value=isActive4.value=isActive5.value=false;
    isActive2.value=true;
  } else if (tem === "/detail/mainmap") {
    isActive1.value=isActive2.value=isActive3.value=isActive4.value=isActive5.value=false;
    isActive1.value=true;
  } else if (tem === "/detail/company") {
    isActive1.value=isActive2.value=isActive3.value=isActive4.value=isActive5.value=false;
    isActive5.value=true;
  }
}

</script>

<style lang="less" scoped>
.back {
  background-color: #155f3a;
  opacity: 0.75;
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
  backdrop-filter: blur(2px);
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
  margin-top: 20px;
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
.nav.active {
  color: #527865;
  font-weight: 1000;
}
.nav:hover {
  color: #527865;
  font-weight: 1000;
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

.regbutton:hover {
  font-weight: 800;
}
</style>
