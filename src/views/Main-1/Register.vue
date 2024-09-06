<template>
  <div class="reg" v-show="showdetail">
    <button class="closeBtn" @click="close" style="margin-top: 5%;">
      <el-icon>
        <Close />
      </el-icon>
    </button>
    <div>
      <div style="color: #215a59; margin-bottom: 5%">用户注册</div>
      <el-input
        class="reginput"
        v-model="inputValue1"
        @blur="setPlaceholder1"
        @input="clearPlaceholder1"
        @focus="clearPlaceholder1"
        :placeholder="placeholderText1"
      ></el-input>
    </div>
    <div>
      <el-input
        class="reginput"
        v-model="inputValue2"
        @blur="setPlaceholder2"
        @input="clearPlaceholder2"
        @focus="clearPlaceholder2"
        :placeholder="placeholderText2"
      ></el-input>
    </div>
    <div>
      <el-input
        class="reginput"
        v-model="inputValue3"
        @blur="setPlaceholder3"
        @input="clearPlaceholder3"
        @focus="clearPlaceholder3"
        :placeholder="placeholderText3"
      ></el-input>
    </div>
    <button @click="loginBegin" class="regBtn">已有账号？点击登录</button>
    <button @click="regBegin" class="loginBtn">注册</button>
  </div>
</template>

<script setup lang="ts">
import  bus  from "./bus";
import { onMounted, ref } from "vue";
import axios from "axios"; // 确保已安装axios
const apiUrl = "http://192.168.63.221:8080/api/register";
const config = {
  headers: {},
};
async function regBegin(){
  try {
    const postData = {
      username:inputValue1.value,
      password:inputValue2.value, // 假设API期望一个名为"message"的字段
      email:inputValue3.value,
    };
    const response = await axios.post(apiUrl, postData, config);
    console.debug(response);
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
const inputValue1 = ref("");
const inputValue2 = ref("");
const inputValue3 = ref("");
const placeholderText1 = ref("用户名");
const placeholderText2 = ref("密码");
const placeholderText3 = ref("邮箱");
let showdetail = ref(false);

onMounted(()=> {
  bus.on('regBegin', (e:any) => {
    // 传参由回调函数中的形参接受
    showdetail.value=e;
  })
})
function close() {
  showdetail.value = false;
}

function clearPlaceholder1() {
  placeholderText1.value = "";
}

function setPlaceholder1() {
  if (inputValue1.value === "") {
    placeholderText1.value = "用户名";
  }
}

function clearPlaceholder2() {
  placeholderText2.value = "";
}

function setPlaceholder2() {
  if (inputValue2.value === "") {
    placeholderText2.value = "密码";
  }
}

function clearPlaceholder3() {
  placeholderText3.value = "";
}

function setPlaceholder3() {
  if (inputValue3.value === "") {
    placeholderText3.value = "密码";
  }
}
function loginBegin() {
  showdetail.value = false;
  bus.emit("loginBegin", "true");
}
</script>

<style scoped>
.reg {
  background-color: #bacec6;
  display: flex;
  color: #fff;
  font-size: 23px;
  height: 500px;
  position: absolute;
  z-index: 5;
  width: 25%;
  margin-top: 7%;
  margin-left: 5%;
  border-radius: 5px;
  flex-direction: column;
}
.closeBtn {
  width: 50px;
  height: 50px;
  font-size: 150%;
  font-weight: 300;
  background: transparent;
  border: none;
  color: #ffffff;
  margin-left: 85%;
}
.reginput {
  width: 70%;
  margin-top: 5%;
}
.loginBtn {
  width: 70%;
  height: 35px;
  font-size: 100%;
  font-weight: 300;
  background-color: #527865;
  border: none;
  color: #ffffff;
  margin-left: 15%;
  margin-top: 5%;
}
.regBtn {
  width: 70%;
  height: 35px;
  font-size: 50%;
  font-weight: 300;
  background: transparent;
  border: none;
  color: #527865;
  margin-left: 15%;
}
</style>
