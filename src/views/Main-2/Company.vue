<template>
  <div class="back"></div>
  <div class="container">
    <div class="selectContainer">
      <div class="typeSelect">
        <div class="text1">类型:</div>
        <el-radio-group v-model="radio1" class="select1">
          <el-radio value="供应" size="large">供应</el-radio>
          <el-radio value="求购" size="large">求购</el-radio>
          <el-radio value="供应和求购" size="large">供应和求购</el-radio>
        </el-radio-group>
      </div>
      <div class="prvcSelect">
        <div class="text1">省份:</div>
        <el-select v-model="selectedProvince" placeholder="请选择省份" class="select2">
          <el-option
            style="width: 100px"
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <el-button class="predictbtn" type="primary" @click="searchChange()">查询</el-button>
    </div>

    <el-scrollbar class="marketScrollbar">
      <div v-for="(items, rowIndex) in List" :key="rowIndex" class="row">
        <div v-for="(item, colIndex) in items" :key="colIndex" class="cell">
          <div
            style="
              display: flex;
              align-items: flex-start;
              flex-direction: column;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: 5%;
              margin-top: 5%;
            "
          >
            <div style="font-size: 160%; font-weight: 600; text-align: left">
             {{ item.name}}
            </div>
            <div style="display: flex; flex-direction: row; align-items: center">
              <div
                class="sleimg"
                style="display: flex; flex-direction: row"
              ></div>
              <div style="margin-left: 20px;">{{item.manager}}</div>
            </div>
            <div style="display: flex; flex-direction: row; align-items: center">
              <div
                class="sleimg2"
                style="display: flex; flex-direction: row; align-items: center"
              ></div>
              <div style="margin-left: 20px">{{item.phone}}</div>
            </div>
            <div style="width: 240px;">{{item.addr}}</div>
          </div>
        </div>
      </div>
      <div class="demo-pagination-block">
        <el-pagination
          v-model:current-page="pageNum"
          :page-size="pageSize"
          :size="size"
          :disabled="disabled"
          :background="background"
          layout="total, prev, pager, next"
          :total="totalLine"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import type { ComponentSize } from "element-plus";
import { ElSelect, ElOption } from "element-plus";
import axios from "axios";

const List = ref( );
const apiUrl = "http://192.168.63.221:8080/api/brief/enterprise";
const apiUrlPz = "http://192.168.63.221:8080/api/price/pz";
const config = {
  headers: {},
};
onMounted(async () => {
  try {
    const postData = {
      prvc: "", // 假设API期望一个名为"message"的字段
      supplyType: radio1.value,
      pageSize: 12,
      pageNum: 1,
    };
    const response = await axios.post(apiUrl, postData, config);
    
    List.value=response.data.data.enterpriseList;
    console.log(List.value[0].name);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
const finalL1 = ref();
const list = [
  ["Item 1-1", "Item 1-2", "Item 1-3", "Item 1-4"],
  ["Item 2-1", "Item 2-2", "Item 2-3", "Item 2-4"],
  ["Item 3-1", "Item 3-2", "Item 3-3", "Item 3-4"],
];

const pageSize = ref(10);
const pageNum = ref(1);
const totalLine = ref(50);
const size = ref<ComponentSize>("default");
const background = ref(false);
const disabled = ref(false);
const radio1 = ref("供应");
const value = ref("");
const selectedProvince = ref();
const selectedPz = ref();
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`);
  pageNum.value = val; // 更新当前页码
  // search(); // 根据新的当前页码获取数据
};
onMounted(async () => {
  try {
    const postData = {
      prvc: '', // 假设API期望一个名为"message"的字段
      market:''
    };
    const response1 = await axios.post(apiUrlPz, postData, config);
    
    options2.value = response1.data.data;
    // 如果需要根据响应数据更新图表，您应该在这里处理
    console.debug(options2.value);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

watch(selectedProvince, async (newValue) => {
  try {
    const postData = {
      prvc: newValue, // 假设API期望一个名为"message"的字段
    };
    const response1 = await axios.post(apiUrlPz, postData, config);
    options2.value = response1.data.data;
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
async function searchChange(){
  try {
    const postData = {
      prvc: selectedProvince.value, // 假设API期望一个名为"message"的字段
      pz:selectedPz.value,
      supplyType: radio1.value,
      pageSize: 12,
      pageNum: pageNum.value,
    };
    const response = await axios.post(apiUrl, postData, config);
    
    List.value=response.data.data.enterpriseList;
    console.log(List.value);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
const options2 = ref([]);
const options = [
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

const enterpriseList = ref();
watch(pageNum, async (newValue) => {
  searchChange();
});
onMounted(async () => {
  try {
    const apiUrl = "https://apifoxmock.com/m1/5019871-4679592-default/brief/enterprise";
    const postData = {
      //
    };

    const response = await axios.post(apiUrl, postData);
    //console.log(response.data.data);

    enterpriseList.value = response.data.data;
    console.log(response.data.data);
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>

<style scoped>
.back {
  background-color: rgba(186, 206, 198, 0.6); /* 透明背景色 */
  z-index: 19;
  position: absolute;
  width: 95%;
  height: 650px;
  margin-top: 4%;
  margin-left: 0;
  border-radius: 10px;
}

.container {
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 20;
  margin-top: 80px; /* 留出标签高度 */
  width: 80%;
  margin-left: 8%;
  height: 100%;
  display: flex;
  justify-content: space-between; /* 让元素之间均匀分布 */
}

.typeSelect {
  font-size: 14px; /* 可根据需要调整字体大小 */
  margin-left: 5%;
  color: #333; /* 可根据需要调整颜色 */
  display: flex;
  flex-direction: row;
  width: 400px;
}

.prvcSelect {
  font-size: 14px; /* 可根据需要调整字体大小 */
  margin-right: 33%;
  color: #333; /* 可根据需要调整颜色 */
  width: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.prvcSelect1 {
  font-size: 14px; /* 可根据需要调整字体大小 */
  margin-right: 23%;
  color: #333; /* 可根据需要调整颜色 */
  width: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.selectContainer {
  background-color: #f4f8f6;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 5px;
}

.marketScrollbar {
  height: 100%;
  width: 100%;
  flex: 4;
  margin-top: 1%;
  display: flex;
}

.marketCard {
  max-width: 800px;
  align-items: right;
  margin-bottom: 20px; /* 设置卡片之间的垂直间距 */
}

.select1 {
  display: flex;
  width: 450px;
}
.select2 {
  height: 30px;
  width: 120px;
}
.text1 {
  display: flex;
  text-align: center;
  width: 70px;
  height: 100%;
  align-items: center;
}

.row {
  z-index: 20;
  display: flex;
  flex-direction: row;
  gap: 40px;
  width: 100%;
}

.cell {
  background-color: #f4f8f6;
  z-index: 20;
  width: 600px;
  height: 130px;
  display: flex;
  justify-content: center;
  border-top: 2px solid #1d382d;
  color: #1d382d;
  margin-bottom: 35px;
  transition: background-color 0.5s ease;
  border-radius: 2px;
  .sleimg {
    width: 30px;
    height: 30px;
    background-image: url("@/assets/logoCom1.png");
    background-size: 100%;
    z-index: 40;
  }
  .sleimg2 {
    width: 30px;
    height: 30px;
    background-image: url("@/assets/logoCom2.png");
    background-size: 100%;
    z-index: 40;
  }
}
.cell:hover {
  background-color: #527865;
  z-index: 20;
  width: 600px;
  height: 130px;
  display: flex;
  justify-content: center;
  border-top: 2px solid #ffffff;
  color: #ffffff;
  transition: background-color 0.5s ease;
  border-radius: 2px;
  .sleimg {
    width: 30px;
    height: 30px;
    background-image: url("@/assets/logoCom12.png");
    background-size: 100%;
    z-index: 40;
  }
  .sleimg2 {
    width: 30px;
    height: 30px;
    background-image: url("@/assets/logoCom22.png");
    background-size: 100%;
    z-index: 40;
  }
}
.demo-pagination-block {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.predictbtn {
  position: absolute;
  margin-left: 1000px;
  margin-top: 10px;
  width: 100px;
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  border-color: #527865;
  justify-content: center;
  align-items: center;
  color: #527865;
  font-size: 120%;
  z-index: 31;
}
</style>
