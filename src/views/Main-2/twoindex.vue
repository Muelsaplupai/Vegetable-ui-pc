<template>
  <div class="line">
    <div class="line1">
      <div class="line2">
        <img src="@/assets/logo11.png" class="sleimg" />
        <div class="text1">
          <div class="special-style1">畜产品指数</div>
          <div class="special-style2">{{ index1 }}</div>
          <div class="special-style3">{{ rise1 }} 较昨日</div>
        </div>
      </div>
      <div class="line2">
        <img src="@/assets/logo12.png" class="sleimg" />
        <div class="text1">
          <div class="special-style1">水产品指数</div>
          <div class="special-style2">{{ index2 }}</div>
          <div class="special-style3">{{ rise2 }} 较昨日</div>
        </div>
      </div>
    </div>
    <div class="line1">
      <div class="line2">
        <img src="@/assets/logo13.png" class="sleimg" />
        <div class="text1">
          <div class="special-style1">蔬菜指数</div>
          <div class="special-style2">{{ index3 }}</div>
          <div class="special-style3">{{ rise3 }} 较昨日</div>
        </div>
      </div>
      <div class="line2">
        <img src="@/assets/logo14.png" class="sleimg" />
        <div class="text1">
          <div class="special-style1">水果指数</div>
          <div class="special-style2">{{ index4 }}</div>
          <div class="special-style3">{{ rise4 }} 较昨日</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import axios from "axios"; // 确保已安装axios
const apiUrl = "http://192.168.63.221:8080/api/price/hbindex";
const List = ref();
const index1 = ref();
const rise1 = ref();
const index2 = ref();
const rise2 = ref();
const index3 = ref();
const rise3 = ref();
const index4 = ref();
const rise4 = ref();
onMounted(async () => {
  try {
    const response1 = await axios.get(apiUrl);
    List.value = response1.data.data;
    index1.value = List.value[1].index;
    index2.value = List.value[2].index;
    index3.value = List.value[3].index;
    index4.value = List.value[4].index;
    rise1.value = List.value[1].rise;
    rise2.value = List.value[2].rise;
    rise3.value = List.value[3].rise;
    rise4.value = List.value[4].rise;
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
  flex-direction: column;
  margin-left: 80px;
  margin-top: 20px;
}

.line1 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
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
  color: #749383;
  justify-content: flex-start;
}
.text1 {
  color: #527865;
  font-size: 140%;
  margin-top: 10px;
  display: flex;
  margin-left: 20px;
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
</style>
