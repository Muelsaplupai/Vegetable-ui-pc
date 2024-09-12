<template>
  <div class="reg" v-show="showdetail">
    <button class="closeBtn" @click="close" style="margin-top: 5%">
      <el-icon>
        <Close />
      </el-icon>
    </button>
    <div>
      <div style="color: #215a59; margin-bottom: 5%">用户注册</div>
    </div>
    <div style="display: flex; flex-direction: row; align-items: center">
      <div style="margin-top: 18px; font-size: 80%; margin-left: 35px">用户名：</div>
      <el-input
        class="reginput"
        v-model="inputValue1"
        @blur="setPlaceholder1"
        @input="clearPlaceholder1"
        @focus="clearPlaceholder1"
        :placeholder="placeholderText1"
      ></el-input>
    </div>

    <div style="display: flex; flex-direction: row; align-items: center">
      <div
        style="margin-top: 18px; font-size: 80%; margin-left: 35px; margin-right: 17px"
      >
        密码：
      </div>
      <el-input
        class="reginput"
        v-model="inputValue2"
        @blur="setPlaceholder2"
        @input="clearPlaceholder2"
        @focus="clearPlaceholder2"
        :placeholder="placeholderText2"
      ></el-input>
    </div>
    <div style="display: flex; flex-direction: row; align-items: center">
      <div
        style="margin-top: 18px; font-size: 80%; margin-left: 35px; margin-right: 17px"
      >
        邮箱：
      </div>
      <el-input
        class="reginput"
        v-model="inputValue3"
        @blur="setPlaceholder3"
        @input="clearPlaceholder3"
        @focus="clearPlaceholder3"
        :placeholder="placeholderText3"
      ></el-input>
    </div>

    <div
      style="display: flex; flex-direction: column; align-items: flex-start; width: 500px"
    >
      <div
        style="
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 225px;
          margin-left: 33px;
          margin-top: 0px;
        "
      >
        <div class="searchitem">
          <div
            style="
              margin-top: 15px;
              font-size: 80%;
              margin-left: -5px;
              margin-right: 17px;
              width: 300px;
            "
          >
            感兴趣的品种：
          </div>
          <el-select
            multiple
            collapse-tags
            :reserve-keyword="false"
            :clearable="true"
            v-model="pz"
            filterable
            placeholder="品种"
            class="select"
            ref="ref1"
          >
            <el-option
              v-for="item in categories3"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
        <div class="searchitem">
          <div
            style="
              margin-top: 15px;
              font-size: 80%;
              margin-left: -5px;
              margin-right: 17px;
              width: 300px;
            "
          >
            您所在的位置：
          </div>
          <el-select
            v-model="Sheng"
            filterable
            placeholder="省份"
            class="select"
            ref="ref2"
          >
            <el-option
              v-for="item in categories1"
              :key="item"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <button @click="loginBegin" class="regBtn">已有账号？点击登录</button>
    <button @click="regBegin" class="loginBtn">注册</button>
  </div>
</template>

<script setup lang="ts">
import bus from "./bus";
import { onMounted, ref } from "vue";
import axios from "axios"; // 确保已安装axios
import { ElMessage } from "element-plus";
const apiUrl = "http://192.168.63.221:8080/api/register";
const apiUrl2 = "http://192.168.63.221:8080/api/setpersonal";
const apiUrlpz = "http://192.168.63.221:8080/api/price/pz";
const pz = ref();
const categories3 = ref();

const Sheng = ref();
const config = {
  headers: {},
};
onMounted(async () => {
  try {
    const postData = {
      prvc: "", // 假设API期望一个名为"message"的字段
    };
    const response1 = await axios.post(apiUrlpz, postData, config);
    categories3.value = response1.data.data;

    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
const categories1 = [
  { value: "", label: "全部" },
  { value: "北京", label: "北京" },
  { value: "天津", label: "天津" },
  { value: "河北", label: "河北" },
  { value: "山西", label: "山西" },
  { value: "内蒙古", label: "内蒙古" },
  { value: "辽宁", label: "辽宁" },
  { value: "吉林", label: "吉林" },
  { value: "黑龙江", label: "黑龙江" },
  { value: "上海", label: "上海" },
  { value: "江苏", label: "江苏" },
  { value: "浙江", label: "浙江" },
  { value: "安徽", label: "安徽" },
  { value: "福建", label: "福建" },
  { value: "江西", label: "江西" },
  { value: "山东", label: "山东" },
  { value: "河南", label: "河南" },
  { value: "湖北", label: "湖北" },
  { value: "湖南", label: "湖南" },
  { value: "广东", label: "广东" },
  { value: "广西", label: "广西" },
  { value: "海南", label: "海南" },
  { value: "重庆", label: "重庆" },
  { value: "四川", label: "四川" },
  { value: "贵州", label: "贵州" },
  { value: "云南", label: "云南" },
  { value: "西藏", label: "西藏" },
  { value: "陕西", label: "陕西" },
  { value: "甘肃", label: "甘肃" },
  { value: "青海", label: "青海" },
  { value: "宁夏", label: "宁夏" },
  { value: "新疆", label: "新疆" },
  { value: "台湾", label: "台湾" },
  { value: "香港", label: "香港" },
  { value: "澳门", label: "澳门" },
];
async function regBegin() {
  try {
    const postData = {
      username: inputValue1.value,
      password: inputValue2.value, // 假设API期望一个名为"message"的字段
      email: inputValue3.value,
    };
    const response = await axios.post(apiUrl, postData, config);
    console.debug(response);
    if (response.data.msg === "OK") {
      reg2();
    }
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
async function reg2() {
  try {
    const postData = {
      username: inputValue1.value,
      prvc: Sheng.value,
      pzList: pz.value,
    };
    const response = await axios.post(apiUrl2, postData, config);
    console.debug(response);
    if (response.data.msg === "OK") {
      console.debug("success");
      showdetail.value = false;
      ElMessage({
        message: "注册成功",
        type: "success",
      });
      if (localStorage.getItem("username")) {
        localStorage.removeItem("username");
        localStorage.setItem("username", inputValue1.value);
      }

        localStorage.setItem("token", response.data.data);
      
      bus.emit("username", inputValue1.value);
      bus.emit("username1", inputValue1.value);
    }
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

onMounted(() => {
  bus.on("regBegin", (e: any) => {
    // 传参由回调函数中的形参接受
    showdetail.value = e;
  });
});
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
    placeholderText3.value = "邮箱";
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
  width: 60%;
  margin-top: 5%;
}
.loginBtn {
  width: 50%;
  height: 35px;
  font-size: 100%;
  font-weight: 300;
  background-color: #527865;
  border: none;
  color: #ffffff;
  margin-left: 22%;
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

.searchtext {
  width: 50px;
  flex-direction: row;
  color: #527865;
  font-size: 100%;
  margin-top: 4px;
}
.searchitem {
  width: 300px;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}
.select {
  margin-top: 10px;
}
</style>
