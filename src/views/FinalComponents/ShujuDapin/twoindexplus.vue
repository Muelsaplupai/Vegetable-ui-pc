<template>
  <div class="line">
    <div class="line1">
      <div class="line2">
        <div class="text3">
          <div class="spstyle1">农产品批发价格200指数</div>
          <div class="spstyle2">{{ index3 }}</div>
          <div class="spstyle3">{{ rise3 }} 较昨日</div>
          <div class="spstyle7">{{ rise4 }} 较3天前</div>
          <div class="spstyle8">{{ rise5 }} 较5天前</div>
        </div>
      </div>
    </div>
    <div class="line1">
      <div class="line2">
        <img src="@/assets/logo15.png" class="sleimg1" />
        <div class="text1">
          <div class="special-style1">粮食指数</div>
          <div class="special-style2">{{ index1 }}</div>
          <div class="special-style3">{{ rise1 }} 较昨日</div>
        </div>
      </div>
      <div class="line2">
        <img src="@/assets/logo16.png" class="sleimg" />
        <div class="text2">
          <div class="special-style1">食用油指数</div>
          <div class="special-style2">{{ index2 }}</div>
          <div class="special-style3">{{ rise2 }} 较昨日</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import axios from "axios"; // 确保已安装axios
const apiUrl = "http://192.168.63.221:8080/api/price/twoindex";
const apiUrl1 = "http://192.168.63.221:8080/api/price/hbindex";
const index1 = ref();
const rise1 = ref();
const index2 = ref();
const rise2 = ref();
const index3 = ref();
const rise3 = ref();
const rise4 = ref();
const rise5 = ref();
onMounted(async () => {
  try {
    const response1 = await axios.get(apiUrl1);
    const List = response1.data.data;
    index1.value = List[5].index;
    rise1.value = List[5].rise;
    index2.value = List[6].index;
    rise2.value = List[6].rise;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

onMounted(async () => {
  try {
    const response1 = await axios.get(apiUrl);
    const List = response1.data.data;
    console.debug(List);
    index3.value = List[0].index;
    rise3.value = List[0].rise;
    rise4.value = List[0].rise3;
    rise5.value = List[0].rise5;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>

<style scoped>
.line {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  margin-left: 80px;
  margin-top: 20px;
  margin-right: 70px;
}

.line1 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.line2 {
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.sleimg {
  width: 70px;
  height: 70px;
  margin-top: 10%;
}
.sleimg1 {
  width: 60px;
  height: 60px;
  margin-top: 10%;
  margin-left: 5px;
}
.special-style1 {
  font-size: 90%;
  font-weight: 900;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
.special-style2 {
  font-size: 170%;
  font-weight: 600;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  color: #749383;
}
.text1 {
  color: #527865;
  font-size: 140%;
  margin-top: 10px;
  display: flex;
  margin-left: 20px;
  flex-direction: column;
}
.text2 {
  color: #527865;
  font-size: 140%;
  margin-top: 10px;
  display: flex;
  margin-left: 15px;
  flex-direction: column;
}
.text3 {
  color: #527865;
  font-size: 140%;
  margin-top: 10px;
  display: flex;
  margin-left: 40px;
  flex-direction: column;
}
.special-style3 {
  font-size: 90%;
  font-weight: 900;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
.spstyle1 {
  font-size: 90%;
  font-weight: 900;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
.spstyle2 {
  font-size: 200%;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  margin-left: 20px;
  color: #749383;
  display: flex;
  justify-content: flex-start;
}
.spstyle3 {
  font-size: 90%;
  font-weight: 900;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
.spstyle7 {
  font-size: 90%;
  font-weight: 900;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  color: #657a6e;
}
.spstyle8 {
  font-size: 90%;
  font-weight: 900;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  color: #3d4b43;
}
</style>
