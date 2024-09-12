<template>
  <div class="main-row2">
    <div class="mid-up">
      <div class="mid-up-item1">
       品种总数<br /><br />
        <div class="mid-up-item0">{{ data1 }}</div>
      </div>
      <div class="mid-up-item">
        市场总数<br /><br />
        <div class="mid-up-item0">{{ data2 }}</div>
      </div>
      <div class="mid-up-item">
        企业总数<br /><br />
        <div class="mid-up-item0">{{ data3 }}</div>
      </div>
      <div class="mid-up-item2">
        数据总量<br /><br />
        <div class="mid-up-item0">{{ data4 }}</div>
      </div>
    </div>
    <div class="mid-bottom">
      <MapIns />
    </div>
  </div>
</template>

<script setup>
import MapIns from "@/views/Map.vue";
import axios from "axios";
import { onMounted, ref } from 'vue';  
import * as echarts from 'echarts';  

const data1=ref(0);

const data2=ref(0);

const data3=ref(0);

const data4=ref(0);

const apiUrl = "http://192.168.63.221:8080/api/data";
onMounted(async () => {
  try {
    const response = await axios.get(apiUrl);

    console.debug("catchdata11111111111111111111111");
    console.debug(response.data);
    data1.value=response.data.data.pzCount;
    data2.value=response.data.data.marketCount;
    data3.value=response.data.data.articleCount;
    data4.value=response.data.data.dataCount;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>

<style scoped>
.main-row2 {
  display: flex;
  background-color: transparent;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  
  width: 50%;
}
.mid-up {
  height: 18%;
  width: 90%;
  font-size: medium;
  color: #000000;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  border-radius: 20px;
  margin-right: 15%;
  color: #194955;
}
.mid-up-item {
  background-color: transparent;
  font-size: 150%;
  font-weight: 800;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
}
.mid-up-item0 {
  background-color: transparent;
  font-size: 100%;
  display: flex;
  font-weight: 800;
  align-items: center;
  flex-direction: column;
  color: #517963;
}
.mid-up-item1 {
  background-color: transparent;
  font-size: 150%;
  display: flex;
  font-weight: 800;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
}
.mid-up-item2 {
  background-color: transparent;
  font-size: 150%;
  font-weight: 800;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
}
.mid-bottom {
  height: 78%;
  width: 80%;
  font-size: medium;
  color: #000000;
  margin-left: 6%;
}
</style>
