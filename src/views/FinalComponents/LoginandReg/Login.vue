<template>
  <div class="reg" v-show="showdetail">
    <button class="closeBtn" @click="close" style="margin-top: 5%">
      <el-icon>
        <Close />
      </el-icon>
    </button>
    <div style="font-size: 80%; margin-bottom: 10%">
      登录可享更多权益<br /><br />
      进行个性化推荐 <span style="color: #527865">海量资源免费使用</span>
    </div>
    <div style="display: flex; flex-direction: row; margin-left: 10%">
      <button class="activeBtn1" @click="logpwd">账号登录</button>
      <button class="activeBtn2" @click="lognopwd">免密登录</button>
    </div>
    <div v-show="showlog1">
      <el-input
        class="reginput"
        v-model="inputValue1"
        @blur="setPlaceholder1"
        @input="clearPlaceholder1"
        @focus="clearPlaceholder1"
        :placeholder="placeholderText1"
      ></el-input>
      <el-input
        class="reginput"
        v-model="inputValue2"
        @blur="setPlaceholder2"
        @input="clearPlaceholder2"
        @focus="clearPlaceholder2"
        :placeholder="placeholderText2"
      ></el-input>
      <button @click="regBegin" class="regBtn">没有账号？点击注册</button>
      <button @click="logBegin" class="loginBtn">登录</button>
    </div>
    <div v-show="showlog2">
      <el-input
        class="reginput"
        v-model="inputValue3"
        @blur="setPlaceholder3"
        @input="clearPlaceholder3"
        @focus="clearPlaceholder3"
        :placeholder="placeholderText3"
      ></el-input>
      <div style="display: flex; flex-direction: row">
        <el-input
          class="reginput2"
          v-model="inputValue4"
          @blur="setPlaceholder4"
          @input="clearPlaceholder4"
          @focus="clearPlaceholder4"
          :placeholder="placeholderText4"
        ></el-input
        ><button class="confirm" @click="regemail">获取验证码</button>
      </div>
      <button @click="regBegin" class="regBtn">没有账号？点击注册</button>
      <button @click="regyanzheng" class="loginBtn">登录</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElIcon, ElMessage } from "element-plus";
import bus from "../../Tools/bus";
import { onMounted, ref } from "vue";
const inputValue1 = ref("");
const inputValue2 = ref("");
const placeholderText1 = ref("用户名");
const placeholderText2 = ref("密码");

const inputValue3 = ref("");
const inputValue4 = ref("");
const placeholderText3 = ref("邮箱");
const placeholderText4 = ref("验证码");
let showdetail = ref(false);
let showlog1 = ref(true);
let showlog2 = ref(false);

let stylecolor1 = ref("#527865");
let stylecolor2 = ref("#ffffff");
import axios from "axios"; // 确保已安装axios
const apiUrl = "http://192.168.63.221:8080/api/login/password";
const apiUrl2 = "http://192.168.63.221:8080/api/login/sendvcode";
const apiUrl3 = "http://192.168.63.221:8080/api/login/checkvcode";
const config = {
  headers: {},
};
async function logBegin() {
  try {
    const postData = {
      username: inputValue1.value,
      password: inputValue2.value, // 假设API期望一个名为"message"的字段
    };
    const response = await axios.post(apiUrl, postData, config);
    console.debug(response);
    if (response.data.msg === "OK") {
      showdetail.value = false;
      {
        localStorage.setItem("token", response.data.data);

        if (localStorage.getItem("username")) {
          localStorage.removeItem("username");
          localStorage.setItem("username", inputValue1.value);
        }
        ElMessage({
          message: "登录成功",
          type: "success",
        });
      }
      bus.emit("username", inputValue1.value);
      bus.emit("username1", inputValue1.value);
      localStorage.setItem("username", inputValue1.value);
    } else {
      {
        ElMessage.error("用户或密码不存在");
      }
    }
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function regyanzheng() {
  try {
    const postData = {
      email: inputValue3.value,
      vcode: inputValue4.value,
    };
    const response = await axios.post(apiUrl3, postData, config);
    console.debug(response);
    if (response.data.msg === "OK") {
      showdetail.value = false;

      localStorage.setItem("token", response.data.data);

      if (localStorage.getItem("username")) {
        localStorage.removeItem("username");
        localStorage.setItem("username", inputValue1.value);
      }

      {
        ElMessage({
          message: "登录成功",
          type: "success",
        });
      }
    } else {
      {
        ElMessage.error("用户或密码不存在");
      }
    }
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
async function regemail() {
  try {
    const postData = {
      email: inputValue3.value,
    };
    const response = await axios.post(apiUrl2, postData, config);
    console.debug(response);
    if (response.data.msg === "OK") {
      ElMessage({
        message: "验证码已发送",
        type: "success",
      });
    } else {
      {
        ElMessage.error("用户或密码不存在");
      }
    }
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

onMounted(() => {
  bus.on("loginBegin", (e: any) => {
    // 传参由回调函数中的形参接受
    showdetail.value = e;
  });
});
function close() {
  bus.emit("maskEnd", "false");
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
  placeholderText2.value = "";
}

function setPlaceholder3() {
  if (inputValue2.value === "") {
    placeholderText2.value = "邮箱";
  }
}
function clearPlaceholder4() {
  placeholderText2.value = "";
}

function setPlaceholder4() {
  if (inputValue2.value === "") {
    placeholderText2.value = "验证码";
  }
}
function loginBegin() {
  showdetail.value = false;
}

function regBegin() {
  bus.emit("regBegin", "true");
  showdetail.value = false;
}
function lognopwd() {
  showlog1.value = false;
  showlog2.value = true;
  stylecolor2.value = "#527865";
  stylecolor1.value = "#ffffff";
}

function logpwd() {
  showlog1.value = true;
  showlog2.value = false;
  stylecolor2.value = "#ffffff";
  stylecolor1.value = "#527865";
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
.reginput2 {
  width: 40.5%;
  margin-top: 5%;
  margin-left: 15%;
}
.loginBtn {
  width: 70%;
  height: 35px;
  font-size: 100%;
  font-weight: 300;
  background-color: #527865;
  border: none;
  color: #ffffff;
  margin-left: 1%;
  margin-top: 5%;
  z-index: 31;
}
.regBtn {
  width: 70%;
  height: 35px;
  font-size: 50%;
  font-weight: 300;
  background: transparent;
  border: none;
  color: #527865;
  margin-left: 1%;
}
.activeBtn1 {
  color: v-bind(stylecolor1);
  margin-bottom: 5%;
  margin-left: 10%;
  border: none;
  background: transparent;
}
.activeBtn2 {
  color: v-bind(stylecolor2);
  margin-bottom: 5%;
  margin-left: 10%;
  border: none;
  background: transparent;
}
.confirm {
  width: 100px;
  height: 30px;
  font-size: 70%;
  box-sizing: content-box;
  border: none;
  background-color: #ffffff;
  margin-top: 5%;
  color: #215a59;
}
</style>
