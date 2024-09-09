<template>
  <div class="back"></div>
  <div class="topline">
    <div class="slider-container">
      <el-carousel :interval="5000" style="height: 250px">
        <el-carousel-item v-for="item in images" :key="item">
          <h3 text="2xl">
            <img :src="item" alt="Slider Image" class="slider-image" />
          </h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- <div class="toptitle">农业要闻</div> -->
    <div class="enmessage">
      <div
        style="
          height: auto;
          width: 100px;
          font-size: 300%;
          font-weight: 800;
          margin-top: 1%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          color: #527865;
        "
      >
        09
        <div
          style="
            height: auto;
            width: 120px;
            font-size: 40%;
            font-weight: 300;
            margin-top: 7%;
            justify-content: flex-start;
            align-items: flex-start;
            text-align: left;
            color: #527865;
          "
        >
          2024-07
        </div>
      </div>
      <div>
        <div 
          style="
            font-size: 150%;
            font-weight: 1000;
            width: 360px;
            height:20px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #527865;
          "
        >
          {{title0}}
        </div>
        <div style="margin-top: 8%; text-align: left; color: #527865">
          王小兵主任出席2024中国国际大数据产业博览会王小兵主任出席2024中国国际大数据产业博览会
        </div>
      </div>
    </div>
    <ul class="ullist">
      <li v-for="(item, index) in List" :key="index">
        <a :href="item.link" target="_blank" class="aup">{{ item.title }} </a>
        <div class="special-style">{{ item.releaseDate.split('-')[1]+'-'+item.releaseDate.split('-')[2] }}</div>
      </li>
    </ul>
  </div>
  <div
    style="
      height: 550px;
      margin-top: 120px;
      margin-left: 630px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
    "
  >
    <div v-for="(items, rowIndex) in finalL1" :key="rowIndex" class="row">
      <div v-for="(item, colIndex) in items" :key="colIndex" class="cell">
        <div class="enmessage">
          <div class="enmessagechild1">
            09
            <div class="enmessagechild2">2024-07</div>
          </div>
          <div
            style="display: flex; flex-direction: column; justify-content: space-between"
          >
            <div class="enmessagechild3">{{item.title}}</div>
            <div class="enmessagechild4">
              {{item.brief}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="container">
    <div class="items">
      <div v-for="(item, index) in List1" :key="index" class="item">
        <a :href="item.link" target="_blank" class="title">{{ item.title }}</a>
        <div class="content">{{ item.brief }}</div>
        <div class="date">{{ item.releaseDate }}</div>
      </div>
    </div>
  </div> -->
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import axios from "axios"; // 确保已安装axios
const apiUrl = "http://192.168.63.221:8080/api/article/news";
const apiUrl1 = "http://192.168.63.221:8080/api/article/guide";
const dataToSend = {
  key1: "value1",
  key2: "value2",
  key3: "value3",
  key4: "value4",
};

const config = {
  headers: {
    
  },
  
};
// const dataToSend1 = {
//   key1: "value1",
//   key2: "value2",
//   key3: "value3",
//   key4: "value4",
// };
// const token = ref("your_token_here");
// const config1 = {
//   headers: {
//     "Content-Type": "application/json",
//     // 其他需要设置的header
//     Authorization: "${token.value}", // 示例：使用Bearer token
//   },
// };
const title0=ref();
const link0=ref();
const charts = ref(null);
const List = ref();
const List1 = ref();
const finalL1=ref();
const firstItem = ref(); // 取出第一项
onMounted(async () => {
  try {
    const postData = {
      "pz": "", // 假设API期望一个名为"message"的字段
    };
    // const postData1 = {
    //   message: dataToSend1, // 假设API期望一个名为"message"的字段
    // };
    const response = await axios.post(apiUrl, postData, config);
    console.log(response.data.data);
    const response1 = await axios.post(apiUrl1, postData, config);
    // console.log("Success fetching data2:");
    console.log(response1.data.data);

    List.value = response.data.data.slice(0,6);
    firstItem.value = List.value[0];
    title0.value=firstItem.value.title;
    link0.value=firstItem.value.link;
    List1.value = response1.data.data.slice(0,6);
    finalL1.value=pairArray(List1.value);
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
function pairArray(arr:any) {  
  const result = [];  
  for (let i = 0; i < arr.length - 1; i += 2) {  
    result.push(arr.slice(i, i + 2));  
  }  
  // 如果数组长度为奇数，单独处理最后一个元素（如果需要的话）  
  if (arr.length % 2 !== 0) {  
    result.push([arr[arr.length - 1]]); // 或者你可以选择不添加这个单独的元素  
  }  
  return result;  
}
// 图片数组
const images = [
  ` /southMountainVillage/src/assets/backnew1.jpg`,
  ` /southMountainVillage/src/assets/backnew2.jpg`,
  ` /southMountainVillage/src/assets/backnew3.jpg`,
];
</script>

<style scoped>
.toptitle {
  font-size: 200%;
  font-weight: 900;
  z-index: 20;
  z-index: 20;
  color: #365a48;
  margin-left: 51%;
  position: absolute;
}
.topline {
  display: flex;
  flex-direction: column;
  margin-top: 7%;
  z-index: 20;
  position: absolute;
  min-width: 0;
  overflow: hidden;
  margin-left: 100px;
}
.slider-container {
  width: 450px; /* 根据需要调整 */
  height: auto; /* 根据图片大小或需要调整 */
  overflow: hidden;
  z-index: 20;
}

.slider-image {
  width: 100%; /* 使图片宽度充满容器 */
  height: auto; /* 保持图片宽高比 */
  display: block; /* 防止图片下方出现空隙 */
}

.ullist {
  padding: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  margin-top: 5%;
  width: 450px;
  min-width: 0;
}
.enmessage {
  padding: 0;
  z-index: 20;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 5%;
  width: 450px;
  min-width: 0;
}
.enmessagechild1 {
  height: auto;
  width: 70px;
  font-size: 300%;
  font-weight: 800;
  margin-top: 1%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 5%;
}
.enmessagechild2 {
  height: auto;
  width: 120px;
  font-size: 40%;
  font-weight: 300;
  margin-top: 7%;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
}
.enmessagechild3 {
  font-size: 150%;
  font-weight: 1000;
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.enmessagechild4 {
  margin-top: 8%;
  text-align: left;
  width: 250px;
  margin-bottom: 10%;
}
li {
  list-style-type: disc;
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.aup {
  display: flex;
  justify-content: flex-start;
  font-weight: 800;
  text-decoration: none;
  color: #4e7a63;
  font-size: 120%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 400px;
  min-width: 0;
}

.aup:hover {
  color: #ffffff;
  font-weight: 400;
}
.special-style {
  color: #697258;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 20;
  margin-top: 400px;
  width: 420px;
  margin-left: 750px;
}

.items {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  gap: 30px;
  padding: 10px;
  margin-right: 10px;
  min-width: 0;
  min-height: 0;
}

.item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 5px;
  padding: 10px;
  background-color: #d7ede4;

  height: 270px;
  width: 220px;
  border-radius: 10px;
}

.title {
  font-weight: bold;
  text-decoration: none;
  color: #365a48;
  font-size: 120%;
  width: 100%;
  word-break: break-all;
  word-wrap: break-word;
  white-space: normal;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  margin-left: 15px;
  margin-right: 15px;
}
.contitle {
  text-decoration: none;
  color: #527865;
  margin-right: 870px;
  width: 100%;
  font-size: 200%;
  margin-bottom: 10px;
  font-weight: 900;
}

.content {
  font-size: 0.9em;
  color: #4e7a63;
  text-align: left;
  word-break: break-all;
  word-wrap: break-word;
  white-space: normal;
  margin-left: 15px;
  margin-right: 15px;
}
.date {
  position: absolute;
  font-size: 0.9em;
  color: #697258;
  margin-top: 230px;
  margin-left: 15px;
  margin-right: 15px;
}

.back {
  background-color: #d6e3df;
  z-index: 19;
  position: absolute;
  width: 1420px;
  height: 650px;
  margin-top: 4%;
  margin-left: 2%;
  border-radius: 10px;
}

.back2 {
  background-color: #d7ede4;
  z-index: 20;
  opacity: 0.6;
  position: absolute;
  width: 1040px;
  height: 310px;
  margin-top: 5.3%;
  margin-left: 15.5%;
  border-radius: 10px;
}

.row {
  z-index: 20;
  display: flex;
  flex-direction: row;
  gap: 80px;
  width: 730px;
}

.cell {
  background-color: #f4f8f6;
  z-index: 20;
  width: 350px;
  height: 150px;
  display: flex;
  justify-content: space-between;
  border-top: 2px solid #527865;
  color: #527865;
  transition: background-color 0.5s ease;
}

.cell:hover {
  background-color: #527865;
  z-index: 20;
  width: 350px;
  height: 150px;
  display: flex;
  justify-content: space-between;
  border-top: 2px solid #ffffff;
  color: #ffffff;
  transition: background-color 0.5s ease;
}
</style>
