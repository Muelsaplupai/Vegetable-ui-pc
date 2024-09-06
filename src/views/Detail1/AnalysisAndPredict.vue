<template>
  <div class="searchinput">
    <div class="searchitem">
      <div class="searchtext">品种 :</div>
      <el-select
        v-model="selectedCategorypz"
        filterable
        multiple
        collapse-tags
        placeholder="品种"
        class="select"
        :reserve-keyword="false"
        :clearable="true"
      >
        <el-option v-for="item in categoriespz" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
    </div>
    <div class="searchitem">
      <div class="searchtext">省份 :</div>
      <!-- 类似地添加省份和城市的选择器 -->
      <el-select
        v-model="selectedCategoryprvc"
        filterable
        placeholder="省份"
        class="select"
      >
        <el-option
          v-for="item in categoriesprvc"
          :key="item.label"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="searchitem">
      <div class="searchtext">市场 :</div>

      <el-select
        v-model="selectedCategorysc"
        filterable
        multiple
        collapse-tags
        :reserve-keyword="false"
        placeholder="市场"
        class="select"
        :clearable="true"
      >
        <el-option v-for="item in categoriessc" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
    </div>

    <el-button class="searchbtn" type="primary" @click="searchChange">查询</el-button>
    <el-button class="clearbtn">重置</el-button>
  </div>

  <div class="line1">
    <div class="price" v-show="div1">
      <div style="display: flex; flex-direction: row; margin-left: 11%; margin-top: 4%">
        <div class="Img1"></div>
        <div class="titleDate">时间范围</div>
      </div>
      <div class="averageDate">2024/09/01-2024/09/03</div>
      <div style="display: flex; flex-direction: row; margin-left: 11%">
        <div class="Img3"></div>
        <div class="title">{{ "最高价格:  "+Max11 }}</div>
      </div>
      <div class="textAdd">{{Sc11}}</div>
      <div class="average">{{ Date11 }}</div>
      <div style="display: flex; flex-direction: row; margin-left: 11%">
        <div class="Img2"></div>
        <div class="title">{{"最低价格:  " + Min11 }}</div>
      </div>
      <div class="textAdd">{{Sc12}}</div>
      <div class="average">{{ Date11 }}</div>
    </div>
    <div class="price" v-show="div2">
      <div style="display: flex; flex-direction: row; margin-left: 11%; margin-top: 4%">
        <div class="Img1"></div>
        <div class="titleDate">时间范围</div>
      </div>
      <div class="averageDate">2024/09/01-2024/09/03</div>
      <div style="display: flex; flex-direction: row; margin-left: 11%">
        <div class="Img3"></div>
        <div class="title">最高价格: 29.9</div>
      </div>
      <div class="textAdd">北京京丰岳各庄农副产品批发市场</div>
      <div class="average">2024/09/01</div>
      <div style="display: flex; flex-direction: row; margin-left: 11%">
        <div class="Img2"></div>
        <div class="title">最低价格: 23.9</div>
      </div>
      <div class="textAdd">北京京丰岳各庄农副产品批发市场</div>
      <div class="average">2024/09/01</div>
    </div>
    <div class="price" v-show="div3">
      <div class="titleDate2">北京京丰岳各庄农副产品批发市场</div>
      <div class="PriceJizhi">
        <div class="Img4"></div>
        <div class="title1">今日价格极值</div>
      </div>
      <div style="display: flex; flex-direction: column; width: 100px">
        <div
          style="display: flex; flex-direction: column; width: 180px; margin-left: 40%"
        >
          <div class="PriceItem">
            <div class="textAdd1">番茄</div>
            <div class="average1">￥888</div>

            <div class="averageDate1">2024-01-01</div>
          </div>
        </div>
        <div
          style="display: flex; flex-direction: column; width: 180px; margin-left: 40%"
        >
          <div class="PriceItem">
            <div class="textAdd1">番茄</div>
            <div class="average1">￥888</div>

            <div class="averageDate1">2024-01-01</div>
          </div>
        </div>
      </div>
      <div class="PriceJizhi">
        <div class="Img5"></div>
        <div class="title1">一周价格极值</div>
      </div>
      <div style="display: flex; flex-direction: column; width: 100px">
        <div
          style="display: flex; flex-direction: column; width: 180px; margin-left: 40%"
        >
          <div class="PriceItem">
            <div class="textAdd1">番茄</div>
            <div class="average1">￥888</div>

            <div class="averageDate1">2024-01-01</div>
          </div>
        </div>
        <div
          style="display: flex; flex-direction: column; width: 180px; margin-left: 40%"
        >
          <div class="PriceItem">
            <div class="textAdd1">番茄</div>
            <div class="average1">￥888</div>

            <div class="averageDate1">2024-01-01</div>
          </div>
        </div>
      </div>
    </div>
    <div class="price1" v-show="div4">
      <div class="titleDate2">{{ selectedCategorypz }}</div>
      <div class="PriceJizhi">
        <div class="Img4"></div>
        <div class="title1">今日价格极值</div>
      </div>
      <div style="display: flex; flex-direction: column; width: 350px">
        <div style="display: flex; flex-direction: column; width: 180px; margin-left: 5%">
          <div class="PriceItem">
            <div class="textAdd2">{{ Sc41 }}</div>
            <div class="average2">{{ '￥'+Max41 }}</div>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; width: 180px; margin-left: 5%">
          <div class="PriceItem">
            <div class="textAdd2">{{ Sc42 }}</div>
            <div class="average2">{{ '￥'+Min42 }}</div>
          </div>
        </div>
      </div>
      <div class="PriceJizhi">
        <div class="Img5"></div>
        <div class="title1">一周价格极值</div>
      </div>
      <div style="display: flex; flex-direction: column; width: 100px">
        <div
          style="display: flex; flex-direction: column; width: 180px; margin-left: 20%"
        >
          <div class="PriceItem">
            <div class="textAdd2">{{ Sc43 }}</div>
            <div class="average2">{{ '￥'+Max43 }}</div>
          </div>
        </div>
        <div
          style="
            display: flex;
            flex-direction: column;
            width: 180px;
            margin-left: 20%;
            margin-bottom: 10px;
          "
        >
          <div class="PriceItem">
            <div class="textAdd2">{{ Sc44 }}</div>
            <div class="average2">{{ '￥'+Min44 }}</div>
          </div>
        </div>
      </div>
    </div>
    <button class="predict"><PredictIns></PredictIns></button>
  </div>
</template>

<script setup lang="ts">
import PredictIns from "./Predict.vue";
import bus from "@/views/Main-1/bus.ts";
import { ElSelect, ElOption } from "element-plus";
import axios from "axios";
import { onMounted, ref, watch } from "vue";

const apiUrlpz = "http://192.168.63.221:8080/api/price/pz";
const apiUrl = "http://192.168.63.221:8080/api/price/market";
const apiUrlleft = "http://192.168.63.221:8080/api/price/partial";
const apiUrlleft3 = "http://192.168.63.221:8080/api/price/singlemarket";
const apiUrlleft4 = "http://192.168.63.221:8080/api/price/singlepz";
const config = {
  headers: {},
};
const categoriessc = ref(["常州", "赤峰", "南京"]);
const categoriespz = ref(["番茄", "马铃薯", "茄子"]);
const div1 = ref(true);
const div2 = ref(false);
const div3 = ref(false);
const div4 = ref(false);
const selectedCategorypz = ref([]);
const selectedCategoryprvc = ref("");
const selectedCategorysc = ref([]);
const Max11 = ref();
const Min11 = ref();
const Sc11=ref();
const Sc12=ref();
const Date11=ref();
const Date12=ref();

const Max31 = ref();
const Min32 = ref();
const Sc31=ref();
const Sc32=ref();
const Max33 = ref();
const Min34 = ref();
const Sc33=ref();
const Sc34=ref();

const Max41 = ref();
const Min42 = ref();
const Sc41=ref();
const Sc42=ref();
const Max43 = ref();
const Min44 = ref();
const Sc43=ref();
const Sc44=ref();

const DanpzDuoscList=ref();
const QuanguoList=ref();
const DanscDuopzList=ref();

onMounted(async () => {
  try {
    const postData = {
      prvc: selectedCategoryprvc.value, // 假设API期望一个名为"message"的字段
    };
    const response = await axios.post(apiUrl, postData, config);
    categoriessc.value = response.data.data;
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
watch(selectedCategoryprvc, async (newValue) => {
  try {
    const postData = {
      prvc: newValue, // 假设API期望一个名为"message"的字段
    };
    const response1 = await axios.post(apiUrl, postData, config);
    categoriessc.value = response1.data.data;
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
onMounted(async () => {
  try {
    const postData = {
      prvc: selectedCategoryprvc.value, // 假设API期望一个名为"message"的字段
    };
    const response = await axios.post(apiUrlpz, postData, config);
    console.log(response.data.data);
    categoriespz.value = response.data.data;
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
watch(selectedCategoryprvc, async (newValue) => {
  try {
    const postData = {
      prvc: newValue, // 假设API期望一个名为"message"的字段
    };
    const response1 = await axios.post(apiUrlpz, postData, config);
    categoriespz.value = response1.data.data;
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

const categoriesprvc = [
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


onMounted(async () => {
  try {
    const postData = {
      pz: '南瓜', // 假设API期望一个名为"message"的字段
    };
    const response1 = await axios.post(apiUrlleft, postData, config);
    Max11.value = response1.data.data.highestInfo.highest;
    Min11.value = response1.data.data.lowestInfo.lowest;
    Date11.value= response1.data.data.highestInfo.releaseTime;
    Date12.value= response1.data.data.lowestInfo.releaseTime;
    Sc11.value=response1.data.data.highestInfo.market;
    Sc12.value=response1.data.data.lowestInfo.market;
    QuanguoList.value=response1.data.data.averageInfo;
    bus.emit("QuanguoList",QuanguoList);
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})
async function Quanguoleft() {
  try {
    const postData = {
      pz: selectedCategorypz.value[0], // 假设API期望一个名为"message"的字段
    };
    const response1 = await axios.post(apiUrlleft, postData, config);
    Max11.value = response1.data.data.highestInfo.highest;
    Min11.value = response1.data.data.lowestInfo.lowest;
    Date11.value= response1.data.data.highestInfo.releaseTime;
    Date12.value= response1.data.data.lowestInfo.releaseTime;
    Sc11.value=response1.data.data.highestInfo.market;
    Sc12.value=response1.data.data.lowestInfo.market;
    QuanguoList.value=response1.data.data.averageInfo;
    bus.emit("QuanguoList",QuanguoList);
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
async function Quanshenleft() {
  try {
    const postData = {
      pz: selectedCategorypz.value[0], // 假设API期望一个名为"message"的字段
      prvc:selectedCategoryprvc.value,
    };
    const response1 = await axios.post(apiUrlleft, postData, config);
    Max11.value = response1.data.data.highestInfo.highest;
    Min11.value = response1.data.data.lowestInfo.lowest;
    Date11.value= response1.data.data.highestInfo.releaseTime;
    Date12.value= response1.data.data.lowestInfo.releaseTime;
    Sc11.value=response1.data.data.highestInfo.market;
    Sc12.value=response1.data.data.lowestInfo.market;
    QuanguoList.value=response1.data.data.averageInfo;
    bus.emit("QuanguoList",QuanguoList);
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
async function Danpzleft() {
  try {
    const postData = {
      pz: selectedCategorypz.value[0], // 假设API期望一个名为"message"的字段
      marketList:selectedCategorysc.value,
    };
    const response1 = await axios.post(apiUrlleft4, postData, config);
    Max41.value = response1.data.data.todayInfo.highest;
    Min42.value = response1.data.data.todayInfo.lowest;
    Max43.value = response1.data.data.weekInfo.highest;
    Min44.value = response1.data.data.weekInfo.lowest;
    Sc41.value=response1.data.data.todayInfo.highestMarket;
    Sc42.value=response1.data.data.todayInfo.lowestMarket;
    Sc43.value=response1.data.data.weekInfo.highestMarket;
    Sc44.value=response1.data.data.weekInfo.lowestMarket;
    DanpzDuoscList.value=response1.data.data.averageInfo;
    bus.emit("DanpzDuoscList",DanpzDuoscList);
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


async function Danscleft() {
  try {
    const postData = {
      pz: selectedCategorypz.value, // 假设API期望一个名为"message"的字段
      marketList:selectedCategorysc.value[0],
    };
    const response1 = await axios.post(apiUrlleft3, postData, config);
    console.debug(888888888);
    console.debug(response1.data.data);
    Max31.value = response1.data.data.todayInfo.highest;
    Min32.value = response1.data.data.todayInfo.lowest;
    Max33.value = response1.data.data.weekInfo.highest;
    Min34.value = response1.data.data.weekInfo.lowest;
    Sc31.value=response1.data.data.todayInfo.highestPz;
    Sc32.value=response1.data.data.todayInfo.lowestPz;
    Sc33.value=response1.data.data.weekInfo.highestPz;
    Sc34.value=response1.data.data.weekInfo.lowestPz;
    DanscDuopzList.value=response1.data.data.averageInfo;
    bus.emit("DanscDuopzList",DanscDuopzList);
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
function searchChange() {
  if (
    selectedCategorypz.value.length === 1 &&
    selectedCategoryprvc.value === "" &&
    selectedCategorysc.value.length === 0
  ) {
    console.debug("quanguo");
    bus.emit("ChartBegin", "Quanguo");
    Quanguoleft();
    div1.value = div2.value = div3.value = div4.value = false;
    div1.value = true;
  } else if (
    selectedCategorypz.value.length === 1 &&
    !(selectedCategoryprvc.value === "") &&
    selectedCategorysc.value.length === 0
  ) {
    console.debug("quansheng");
    bus.emit("ChartBegin2", selectedCategoryprvc.value);
    bus.emit("ChartBegin", "Quansheng");
    bus.emit("ChartBegin3", selectedCategorypz.value);
    Quanshenleft();
    div1.value = div2.value = div3.value = div4.value = false;
    div2.value = true;
  } else if (
    !(selectedCategorypz.value.length === 0) &&
    selectedCategorysc.value.length === 1
  ) {
    //console.debug("danscduopz");
    bus.emit("ChartBegin", "DanscDuopz");
    Danscleft();
    div1.value = div2.value = div3.value = div4.value = false;
    div3.value = true;
  } else if (
    selectedCategorypz.value.length === 1 &&
    !(selectedCategorysc.value.length === 0)
  ) {
    console.debug("danpzduosc");
    bus.emit("ChartBegin", "DanpzDuosc");
    Danpzleft();
    div1.value = div2.value = div3.value = div4.value = false;
    div4.value = true;
  } else {
    console.debug("error");
  }
}
</script>

<style scoped>
.predict {
  display: flex;
  width: 800px;
  height: 500px;
  background-color: #d7ede4;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 4%;
  margin-right: 100px;
  margin-bottom: 40px;
}

.line1 {
  display: flex;
  justify-content: space-between;
  z-index: 30;
}

.line2 {
  display: flex;
  justify-content: space-between;
}

.price {
  display: flex;
  background-color: #d7ede4;
  width: 350px;
  height: 500px;
  border-radius: 20px;
  margin-left: 100px;
  border: none;
  flex-direction: column;
  justify-content: space-between;
}
.price1 {
  display: flex;
  background-color: #d7ede4;
  width: 350px;
  height: 500px;
  border-radius: 20px;
  margin-left: 100px;
  border: none;
  flex-direction: column;
  justify-content: space-between;
}
.el-2 {
  background-color: #d7ede4;
  width: 350px;
  height: 350px;
  border-radius: 20px;
  border: none;
}

.el-3 {
  background-color: #d7ede4;
  width: 400px;
  height: 220px;
  border-radius: 20px;
  border: none;
}

.el-4 {
  background-color: #d7ede4;
  width: 400px;
  height: 220px;
  border-radius: 20px;
  border: none;
}

.el-5 {
  background-color: #d7ede4;
  width: 400px;
  height: 220px;
  border-radius: 20px;
  border: none;
}
.title {
  display: flex;
  width: 500px;
  height: 50px;
  color: #1d382d;
  font-size: 180%;
  margin-left: 5%;
}
.title1 {
  display: flex;
  width: 500px;
  height: 50px;
  color: #1d382d;
  font-size: 180%;
  margin-left: 5%;
  margin-top: 3px;
}
.titleDate {
  display: flex;
  width: 100%;
  height: 50px;
  color: #1d382d;
  font-size: 180%;
  margin-top: 30px;
  margin-left: 3%;
}
.titleDate2 {
  display: flex;
  width: 100%;
  height: 50px;
  color: #1d382d;
  font-size: 150%;
  font-weight: 700;
  text-align: center;
  justify-content: center;
  margin-top: 30px;
}
.average {
  display: flex;
  width: 200px;
  height: 60px;
  color: #1d382d;
  font-size: 120%;
  margin-left: 22.5%;
}
.textAdd {
  display: flex;
  width: 100%;
  height: 40px;
  color: #1d382d;
  font-size: 130%;
  margin-left: 22.5%;
  justify-content: flex-start;
}
.average1 {
  display: flex;
  width: 100px;
  height: 40px;
  color: #1d382d;
  font-size: 120%;
}
.average2 {
  display: flex;
  justify-content: flex-start;
  width: 60px;
  height: 40px;
  color: #1d382d;
  font-size: 120%;
}
.textAdd1 {
  display: flex;
  width: 110px;
  height: 40px;
  color: #1d382d;
  font-size: 130%;

  justify-content: flex-start;
}
.textAdd2 {
  display: flex;
  width: 150px;
  height: 40px;
  color: #1d382d;
  font-size: 120%;
  justify-content: flex-start;
}
.averageDate {
  display: flex;
  width: 400px;
  height: 60px;
  color: #1d382d;
  font-size: 150%;
  margin-left: 24%;
  margin-bottom: 4%;
}
.averageDate1 {
  display: flex;
  width: 220px;
  height: 40px;
  color: #1d382d;
  font-size: 120%;
  margin-bottom: 4%;
  justify-content: flex-start;
}
.topdown {
  display: flex;
  width: 200px;
  height: 60px;
  color: #ffffff;
  font-size: 120%;
  margin-top: 5%;
  margin-left: 33%;
}
/* Element Plus 组件的样式调整及自定义 */
.el-select-dropdown .el-select-dropdown__wrap {
  max-height: 300px; /* 限制下拉列表的高度 */
}

.el-select {
  width: 200px; /* 根据需要调整宽度 */
  /* 其他自定义样式 */
}
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 8px;
  border: 1px solid #999;
  border-radius: 5px;
  background-color: #f1f1f1;
  color: #333;
  font-size: 16px;
  width: 200px;
}

/* 美化select的下拉箭头 */
select:after {
  content: "\25BC"; /* Unicode编码，表示向下的箭头 */
  position: absolute;
  top: 12px;
  right: 10px;
}

/* 美化选项内容 */
option {
  padding: 5px;
  background-color: #f9f9f9;
  color: #333;
}
.search {
  width: 80%;
  margin-top: 50px;
  display: flex;
  z-index: 18;
  flex-direction: column;
  border-radius: 10px;
  margin-left: 150px;
}
.searchinput {
  width: 100%;
  display: flex;
  flex-direction: row;
  z-index: 16;
  margin-top: 80px;
  height: 40px;
  justify-content: center;
}
.searchtext {
  width: 50px;
  flex-direction: row;
  color: #527865;
  font-size: 150%;
  margin-top: 7px;
}
.searchitem {
  width: 300px;
  display: flex;
  flex-direction: row;
}
.searchbtn {
  margin-left: 200px;
  width: 100px;
  display: flex;
  flex-direction: row;
  background-color: #527865;
  border: none;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 120%;
}
.clearbtn {
  width: 100px;
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  border-color: #527865;
  justify-content: center;
  align-items: center;
  color: #527865;
  font-size: 120%;
}

.select {
  height: 30px;
  width: 180px;
  font-size: 100%;
  margin-left: 10px;
}

.Img1 {
  margin-top: 28px;
  width: 43px;
  height: 27px;
  background-image: url("@/assets/logopre1.png");
  background-size: 100%;
  z-index: 40;
}
.Img2 {
  margin-top: 1px;
  width: 44px;
  height: 27px;
  background-image: url("@/assets/logopre2.png");
  background-size: 100%;
  z-index: 40;
}
.Img3 {
  margin-top: 1px;
  width: 44px;
  height: 27px;
  background-image: url("@/assets/logopre3.png");
  background-size: 100%;
  z-index: 40;
}
.Img4 {
  width: 55px;
  height: 27px;
  background-image: url("@/assets/logopre5.png");
  background-size: 100%;
  z-index: 40;
}

.Img5 {
  width: 55px;
  height: 27px;
  background-image: url("@/assets/logopre4.png");
  background-size: 100%;
  z-index: 40;
}

.PriceJizhi {
  display: flex;
  flex-direction: row;
  margin-left: 11%;
}
.PriceItem {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 300px;
  height: 70px;
}
</style>
