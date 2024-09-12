<template>
  <div class="searchinput">
    <div class="searchitem" v-if="show1">
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
    <div class="searchitem" v-if="show2">
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
    <div class="searchitem" v-if="show3">
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

    <el-button class="searchbtn" type="primary" @click="searchChange(0)">查询</el-button>
  </div>
  <el-button class="predictbtn" type="primary" @click="searchChange(1)">预测</el-button>
  <el-aside>
    <button class="el-selection11" @click="select1" :class="{ active: isActive1 }">
      <div class="sleimg11" />
      <div class="sletext">单一品种<br />全国均价</div>
    </button>
    <button class="el-selection22" @click="select2" :class="{ active: isActive2 }">
      <div class="sleimg22" />
      <div class="sletext">单一品种<br />全省均价</div>
    </button>
    <button class="el-selection33" @click="select3" :class="{ active: isActive3 }">
      <div class="sleimg33" />
      <div class="sletext">单市场多<br />品种对比</div>
    </button>
    <button class="el-selection44" @click="select4" :class="{ active: isActive4 }">
      <div class="sleimg44" />
      <div class="sletext">单品种多<br />市场对比</div>
    </button>
  </el-aside>

  <div class="line1">
    <div class="price" v-show="div1">
      <div class="titleDate11">{{ PZtitle + "（更新日期：" + formattedTime + "）" }}</div>
      <div class="el-selectionall" style="margin-top: 2%">
        <button class="el-selection1">
          <img src="@/assets/logopre1.png" class="sleimg1" />
          <div class="sletext1">时间范围</div>
        </button>
        <div class="averageDate0">
          {{ "起始: " + Date23 }}<br /><br />{{ "截止: " + formattedTime }}
        </div>
      </div>
      <div class="el-selectionall">
        <button class="el-selection1">
          <img src="@/assets/logopre3.png" class="sleimg1" />
          <div class="sletext1">最高价格</div>
        </button>
        <div style="display: flex; flex-direction: column; height: 70px">
          <div class="averageDate00">{{ "￥ " + Max11 + " 元/斤" }}</div>
          <div class="averageDate00">{{ "日期： " + Date11 }}</div>
        </div>
      </div>
      <div class="el-selectionall" style="margin-bottom: 15%">
        <button class="el-selection1">
          <img src="@/assets/logopre2.png" class="sleimg1" />
          <div class="sletext1">最低价格</div>
        </button>
        <div style="display: flex; flex-direction: column; height: 70px">
          <div class="averageDate00">{{ "￥ " + Min11 + " 元/斤" }}</div>
          <div class="averageDate00">{{ "日期： " + Date11 }}</div>
        </div>
      </div>
    </div>
    <div class="price" v-show="div2">
      <div class="titleDate11">{{ PZtitle + "（更新日期：" + formattedTime + "）" }}</div>
      <div class="titleDate11">{{ "当前省份： " + Prvctitle }}</div>
      <div class="el-selectionall" style="margin-top: 2%">
        <button class="el-selection1">
          <img src="@/assets/logopre1.png" class="sleimg1" />
          <div class="sletext1">时间范围</div>
        </button>
        <div class="averageDate0">
          {{ "起始: " + Date23 }}<br /><br />{{ "截止: " + formattedTime }}
        </div>
      </div>
      <div class="el-selectionall">
        <button class="el-selection1">
          <img src="@/assets/logopre3.png" class="sleimg1" />
          <div class="sletext1">最高价格</div>
        </button>
        <div style="display: flex; flex-direction: column; height: 70px">
          <div class="averageDate00">{{ "￥ " + Max21 + " 元/斤" }}</div>
          <div class="averageDate00">{{ "日期： " + Date11 }}</div>
        </div>
      </div>
      <div class="el-selectionall" style="margin-bottom: 15%">
        <button class="el-selection1">
          <img src="@/assets/logopre2.png" class="sleimg1" />
          <div class="sletext1">最低价格</div>
        </button>
        <div
          style="display: flex; flex-direction: column; height: 70px; text-align: center"
        >
          <div class="averageDate00">{{ "￥ " + Min21 + " 元/斤" }}</div>
          <div class="averageDate00">{{ "日期： " + Date12 }}</div>
        </div>
      </div>
    </div>
    <div class="price" v-show="div3">
      <div class="titleDate2">{{ SCtitle }}</div>
      <div class="PriceJizhi">
        <div class="Img4"></div>
        <div class="title1">今日价格一览（元/斤）</div>
      </div>
      <div style="display: flex; flex-direction: column; width: 100px">
        <div
          style="display: flex; flex-direction: column; width: 180px; margin-left: 40%"
        >
          <div class="PriceItem">
            <div class="textAdd1">{{ Pz31 }}</div>
            <div class="average0">{{ "￥" + Max31 }}</div>
          </div>
        </div>
        <div
          style="display: flex; flex-direction: column; width: 180px; margin-left: 40%"
        >
          <div class="PriceItem">
            <div class="textAdd1">{{ Pz32 }}</div>
            <div class="average0">{{ "￥" + Min32 }}</div>
          </div>
        </div>
      </div>
      <div class="PriceJizhi">
        <div class="Img5"></div>
        <div class="title1">一周价格一览（元/斤）</div>
      </div>
      <div style="display: flex; flex-direction: column; width: 100px">
        <div
          style="display: flex; flex-direction: column; width: 180px; margin-left: 40%"
        >
          <div class="PriceItem">
            <div class="textAdd1">{{ Pz33 }}</div>
            <div class="average0">{{ "￥" + Max33 }}</div>
          </div>
        </div>
        <div
          style="display: flex; flex-direction: column; width: 180px; margin-left: 40%"
        >
          <div class="PriceItem">
            <div class="textAdd1">{{ Pz34 }}</div>
            <div class="average0">{{ "￥" + Min34 }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="price" v-show="div4">
      <div class="titleDate2">{{ PZtitle + "（更新日期：" + formattedTime + "）" }}</div>
      <div class="PriceJizhi">
        <div class="Img4"></div>
        <div class="title1">今日价格一览（元/斤）</div>
      </div>
      <div style="display: flex; flex-direction: column; width: 100px">
        <div
          style="display: flex; flex-direction: column; width: 180px; margin-left: 40%"
        >
          <div class="PriceItem">
            <el-tooltip placement="top" effect="light">
              <template #content> {{ Sc44 }} </template>
              <div class="textAdd2">{{ Sc41suo }}</div>
            </el-tooltip>
            <div class="average1">{{ "￥" + Max41 }}</div>
          </div>
        </div>
        <div
          style="display: flex; flex-direction: column; width: 180px; margin-left: 40%"
        >
          <div class="PriceItem">
            <el-tooltip placement="top" effect="light">
              <template #content> {{ Sc42 }} </template>
              <div class="textAdd2">{{ Sc42suo }}</div>
            </el-tooltip>

            <div class="average1">{{ "￥" + Min42 }}</div>
          </div>
        </div>
      </div>
      <div class="PriceJizhi">
        <div class="Img5"></div>
        <div class="title1">一周价格一览（元/斤）</div>
      </div>
      <div style="display: flex; flex-direction: column; width: 100px">
        <div
          style="display: flex; flex-direction: column; width: 180px; margin-left: 40%"
        >
          <div class="PriceItem">
            <el-tooltip placement="top" effect="light">
              <template #content> {{ Sc43 }} </template>

              <div class="textAdd2">{{ Sc43suo }}</div>
            </el-tooltip>

            <div class="average1">{{ "￥" + Max43 }}</div>
          </div>
        </div>
        <div
          style="display: flex; flex-direction: column; width: 180px; margin-left: 40%"
        >
          <div class="PriceItem">
            <el-tooltip placement="top" effect="light">
              <template #content> {{ Sc44 }} </template>
              <div class="textAdd2">{{ Sc44suo }}</div>
            </el-tooltip>
            <div class="average1">{{ "￥" + Min44 }}</div>
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
const now = new Date();

//const year = now.getFullYear();
const month = ("0" + (now.getMonth() + 1)).slice(-2);
const day = ("0" + now.getDate()).slice(-2);
//const hours = ("0" + now.getHours()).slice(-2);
//const minutes = ("0" + now.getMinutes()).slice(-2);
//const seconds = ("0" + now.getSeconds()).slice(-2);

const formattedTime = month + "-" + day;

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
const Max11 = ref(18);
const Min11 = ref(18);
const Sc11 = ref();
const Sc12 = ref();
const Date11 = ref("01-01");
const Date12 = ref("01-01");
const Prvctitle = ref("江苏");
const Max21 = ref(18);
const Min21 = ref(18);
const Sc21 = ref();
const Sc22 = ref();
const Date21 = ref("01-01");
const Date22 = ref("01-01");
const Date23 = ref("01-01");
const SCtitle = ref("北京京丰岳各庄农副产品批发市场");
const Max31 = ref(8.8);
const Min32 = ref(0.75);
const Pz31 = ref("生姜");
const Pz32 = ref("土豆");
const Max33 = ref(8.8);
const Min34 = ref(0.75);
const Pz33 = ref("生姜");
const Pz34 = ref("土豆");
// const date31 = ref("2024-01-01");
// const date32 = ref("2024-01-01");
// const date33 = ref("2024-01-01");
// const date34 = ref("2024-01-01");

const PZtitle = ref("土豆");
const Max41 = ref(18);
const Min42 = ref(18);
const Sc41suo = ref("北京京丰岳各庄农副产品批发市场");
const Sc42suo = ref("北京京丰岳各庄农副产品批发市场");
const Sc41 = ref("北京京丰岳各庄农副产品批发市场");
const Sc42 = ref("北京京丰岳各庄农副产品批发市场");
const Max43 = ref(18);
const Min44 = ref(18);
const Sc43suo = ref("北京京丰岳各庄农副产品批发市场");
const Sc44suo = ref("北京京丰岳各庄农副产品批发市场");
const Sc43 = ref("北京京丰岳各庄农副产品批发市场");
const Sc44 = ref("北京京丰岳各庄农副产品批发市场");

const DanpzDuoscList = ref();
const QuanguoList = ref();
const QuanshenList = ref();
const DanscDuopzList = ref();

const SearchPredict = ref();
const show1 = ref(true);
const show2 = ref(false);
const show3 = ref(false);
const isActive1=ref(false);
const isActive2=ref(false);
const isActive3=ref(false);
const isActive4=ref(false);
onMounted(async () => {
  select1();
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
      pz: localStorage.getItem("pz"), // 假设API期望一个名为"message"的字段
    };
    PZtitle.value =  localStorage.getItem("pz")||"";
    const response1 = await axios.post(apiUrlleft, postData, config);
    Max11.value = response1.data.data.highestInfo.highest;
    Min11.value = response1.data.data.lowestInfo.lowest;
    Date11.value = response1.data.data.highestInfo.releaseTime;
    Date11.value = Date11.value.slice(5);
    Date12.value = response1.data.data.lowestInfo.releaseTime;
    Date12.value = Date12.value.slice(5);
    Sc11.value = response1.data.data.highestInfo.market;
    Sc12.value = response1.data.data.lowestInfo.market;
    QuanguoList.value = response1.data.data.averageInfo;
    bus.emit("QuanguoList", QuanguoList);
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
async function Quanguoleft() {
  try {
    const postData = {
      pz: selectedCategorypz.value[0], // 假设API期望一个名为"message"的字段
      isPrediction: SearchPredict.value,
    };
    const response1 = await axios.post(apiUrlleft, postData, config);
    console.debug(response1.data.data);
    PZtitle.value=selectedCategorypz.value[0];
    Max11.value = response1.data.data.highestInfo.highest;
    Min11.value = response1.data.data.lowestInfo.lowest;
    Date11.value = response1.data.data.highestInfo.releaseTime;
    Date11.value = Date11.value.slice(5);
    Date12.value = response1.data.data.lowestInfo.releaseTime;
    Date12.value = Date12.value.slice(5);
    Sc11.value = response1.data.data.highestInfo.market;
    Sc12.value = response1.data.data.lowestInfo.market;
    QuanguoList.value = response1.data.data.averageInfo;
    Date23.value = response1.data.data.averageInfo[0].price[0].releaseTime.slice(5);
    bus.emit("QuanguoList", QuanguoList);
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
async function Quanshenleft() {
  try {
    const postData = {
      pz: selectedCategorypz.value[0], // 假设API期望一个名为"message"的字段
      prvc: selectedCategoryprvc.value,
      isPrediction: SearchPredict.value,
    };
    PZtitle.value= selectedCategorypz.value[0];
    const response1 = await axios.post(apiUrlleft, postData, config);
    Max21.value = response1.data.data.highestInfo.highest;
    Min21.value = response1.data.data.lowestInfo.lowest;
    Date21.value = response1.data.data.highestInfo.releaseTime;
    Date21.value = Date21.value.slice(5);
    Date22.value = response1.data.data.lowestInfo.releaseTime;
    Date22.value = Date22.value.slice(5);
    Date23.value = response1.data.data.averageInfo[0].price[0].releaseTime.slice(5);
    Sc21.value = response1.data.data.highestInfo.market;
    Sc22.value = response1.data.data.lowestInfo.market;
    QuanshenList.value = response1.data.data.averageInfo;
    bus.emit("QuanshenList", QuanshenList);
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
async function Danpzleft() {
  try {
    const postData = {
      pz: selectedCategorypz.value[0], // 假设API期望一个名为"message"的字段
      marketList: selectedCategorysc.value,
      isPrediction: SearchPredict.value,
    };
    PZtitle.value= selectedCategorypz.value[0];
    const response1 = await axios.post(apiUrlleft4, postData, config);
    console.debug(response1.data.data);
    Max41.value = response1.data.data.todayInfo.highest;
    Min42.value = response1.data.data.todayInfo.lowest;
    Max43.value = response1.data.data.weekInfo.highest;
    Min44.value = response1.data.data.weekInfo.lowest;
    Sc41.value = response1.data.data.todayInfo.highestMarket;
    Sc42.value = response1.data.data.todayInfo.lowestMarket;
    Sc43.value = response1.data.data.weekInfo.highestMarket;
    Sc44.value = response1.data.data.weekInfo.lowestMarket;
    Sc41suo.value = response1.data.data.todayInfo.highestMarket.slice(0, 14) + "...";
    Sc42suo.value = response1.data.data.todayInfo.lowestMarket.slice(0, 14) + "...";
    Sc43suo.value = response1.data.data.weekInfo.highestMarket.slice(0, 14) + "...";
    Sc44suo.value = response1.data.data.weekInfo.lowestMarket.slice(0, 14) + "...";
    DanpzDuoscList.value = response1.data.data.averageInfo;
    bus.emit("DanpzDuoscList", DanpzDuoscList);
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function Danscleft() {
  try {
    const postData = {
      pzList: selectedCategorypz.value, // 假设API期望一个名为"message"的字段
      market: selectedCategorysc.value[0],
    };
    const response1 = await axios.post(apiUrlleft3, postData, config);
    console.debug(888888888);
    console.debug(response1.data.data);
    Max31.value = response1.data.data.todayInfo.highest;
    Min32.value = response1.data.data.todayInfo.lowest;
    Max33.value = response1.data.data.weekInfo.highest;
    Min34.value = response1.data.data.weekInfo.lowest;
    Pz31.value = response1.data.data.todayInfo.highestPz;
    Pz32.value = response1.data.data.todayInfo.lowestPz;
    Pz33.value = response1.data.data.weekInfo.highestPz;
    Pz34.value = response1.data.data.weekInfo.lowestPz;
    DanscDuopzList.value = response1.data.data.averageInfo;
    bus.emit("DanscDuopzList", DanscDuopzList);
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
function searchChange(tem:any) {
  SearchPredict.value = tem;
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

async function select1() {
  isActive1.value=isActive2.value=isActive3.value=isActive4.value=false;
  isActive1.value=true;
  show1.value = true;
  show2.value = show3.value = false;
  div1.value = div2.value = div3.value = div4.value = false;
  div1.value = true;
  selectedCategorypz.value = selectedCategorysc.value = [];
  selectedCategoryprvc.value = "";
  bus.emit("ChartBegin", "Quanguo");
  try {
    const postData = {
      pz: localStorage.getItem("pz"), // 假设API期望一个名为"message"的字段
    };
    PZtitle.value = localStorage.getItem("pz")||"";
    const response1 = await axios.post(apiUrlleft, postData, config);
    Max11.value = response1.data.data.highestInfo.highest;
    Min11.value = response1.data.data.lowestInfo.lowest;
    Date11.value = response1.data.data.highestInfo.releaseTime;
    Date11.value = Date11.value.slice(5);
    Date12.value = response1.data.data.lowestInfo.releaseTime;
    Date12.value = Date12.value.slice(5);
    Sc11.value = response1.data.data.highestInfo.market;
    Sc12.value = response1.data.data.lowestInfo.market;
    QuanguoList.value = response1.data.data.averageInfo;
    bus.emit("QuanguoList", QuanguoList);
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
async function select2() {
  isActive1.value=isActive2.value=isActive3.value=isActive4.value=false;
  isActive2.value=true;
  show1.value = show2.value = true;
  show3.value = false;
  div1.value = div2.value = div3.value = div4.value = false;
  div2.value = true;
  selectedCategorypz.value = selectedCategorysc.value = [];
  selectedCategoryprvc.value = "";
  bus.emit("ChartBegin", "Quansheng");
  try {
    const postData = {
      pz: "南瓜", // 假设API期望一个名为"message"的字段
      prvc: "江苏",
    };
    const response1 = await axios.post(apiUrlleft, postData, config);
    Max21.value = response1.data.data.highestInfo.highest;
    Min21.value = response1.data.data.lowestInfo.lowest;
    Date21.value = response1.data.data.highestInfo.releaseTime;
    Date21.value = Date21.value.slice(5);
    Date22.value = response1.data.data.lowestInfo.releaseTime;
    Date22.value = Date22.value.slice(5);
    Date23.value = response1.data.data.averageInfo[0].price[0].releaseTime.slice(5);
    Sc21.value = response1.data.data.highestInfo.market;
    Sc22.value = response1.data.data.lowestInfo.market;
    QuanshenList.value = response1.data.data.averageInfo;
    bus.emit("QuanshenList", QuanshenList);
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
function select3() {
  isActive1.value=isActive2.value=isActive3.value=isActive4.value=false;
  isActive3.value=true;
  show1.value = show2.value = show3.value = true;
  div1.value = div2.value = div3.value = div4.value = false;
  div3.value = true;
  selectedCategorypz.value = selectedCategorysc.value = [];
  selectedCategoryprvc.value = "";
  bus.emit("ChartBegin", "DanscDuopz");
}
async function select4() {
  isActive1.value=isActive2.value=isActive3.value=isActive4.value=false;
  isActive4.value=true;
  show1.value = show2.value = show3.value = true;
  div1.value = div2.value = div3.value = div4.value = false;
  div4.value = true;
  selectedCategorypz.value = selectedCategorysc.value = [];
  selectedCategoryprvc.value = "";
  bus.emit("ChartBegin", "DanpzDuosc");
  try {
    const postData = {
      pz: "南瓜", // 假设API期望一个名为"message"的字段
      marketList: ["三门峡金河农产品批发交易中心", "上海农产品中心批发市场"],
    };
    const response1 = await axios.post(apiUrlleft4, postData, config);
    Max41.value = response1.data.data.todayInfo.highest;
    Min42.value = response1.data.data.todayInfo.lowest;
    Max43.value = response1.data.data.weekInfo.highest;
    Min44.value = response1.data.data.weekInfo.lowest;
    Sc41.value = response1.data.data.todayInfo.highestMarket;
    Sc42.value = response1.data.data.todayInfo.lowestMarket;
    Sc43.value = response1.data.data.weekInfo.highestMarket;
    Sc44.value = response1.data.data.weekInfo.lowestMarket;
    Sc41suo.value = response1.data.data.todayInfo.highestMarket.slice(0, 14) + "...";
    Sc42suo.value = response1.data.data.todayInfo.lowestMarket.slice(0, 14) + "...";
    Sc43suo.value = response1.data.data.weekInfo.highestMarket.slice(0, 14) + "...";
    Sc44suo.value = response1.data.data.weekInfo.lowestMarket.slice(0, 14) + "...";
    DanpzDuoscList.value = response1.data.data.averageInfo;
    bus.emit("DanpzDuoscList", DanpzDuoscList);
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
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
  margin-right: 80px;
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
  width: 300px;
  height: 500px;
  border-radius: 20px;
  margin-left: 250px;
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
  font-weight: 800;
  margin-left: 5%;
}
.title1 {
  display: flex;
  width: 500px;
  height: 50px;
  color: #2c5645;
  font-size: 180%;
  font-weight: 550;
  margin-left: 5%;
  margin-top: 3px;
}
.titleDate {
  display: flex;
  width: 100%;
  height: 50px;
  color: #1d382d;
  font-size: 180%;
  font-weight: 550;
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
.titleDate11 {
  display: flex;
  width: 100%;
  height: 10px;
  color: #1d382d;
  font-size: 150%;
  font-weight: 700;
  text-align: center;
  justify-content: center;
  margin-top: 30px;
}
.titleDate3 {
  display: flex;
  width: 100%;
  height: 50px;
  color: #1d382d;
  font-size: 200%;
  font-weight: 900;
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
  width: 215px;
  height: 60px;
  color: #1d382d;
  font-size: 130%;
  margin-left: 22.5%;
  justify-content: flex-start;
  text-align: start;
}
.average0 {
  display: flex;
  width: 100px;
  height: 40px;
  color: #1d382d;
  font-size: 180%;
  margin-right: 60px;
  margin-top: 10px;
}
.average1 {
  display: flex;
  width: 100px;
  height: 40px;
  color: #1d382d;
  font-size: 180%;
  margin-right: 20px;
  margin-top: 10px;
}
.average2 {
  display: flex;
  justify-content: flex-start;
  width: 60px;
  height: 30px;
  color: #1d382d;
  font-size: 180%;
  font-weight: 800;
}
.textAdd1 {
  display: flex;
  width: 110px;
  height: 40px;
  color: #1d382d;
  font-size: 160%;
  margin-top: 10px;
  justify-content: center;
}
.textAdd2 {
  display: flex;
  width: 140px;
  height: 30px;
  color: #1d382d;
  font-size: 140%;
  justify-content: flex-start;
  margin-right: 26px;
  text-align: center;
  margin-bottom: 15px;
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
.averageDate0 {
  display: flex;
  text-align: center;
  justify-content: center;
  width: 120px;
  height: 60px;
  color: #1d382d;
  font-size: 150%;
  margin-left: 14%;
  margin-top: 14%;
}
.averageDate00 {
  display: flex;
  text-align: center;
  justify-content: center;
  width: 120px;
  height: 60px;
  color: #1d382d;
  font-size: 150%;
  margin-left: 14%;
  margin-top: 23%;
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
  width: 80%;
  display: flex;
  flex-direction: row;
  z-index: 16;
  margin-top: 80px;
  margin-left: 250px;

  height: 40px;
  justify-content: flex-start;
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
  position: absolute;
  margin-left: 900px;
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

.predictbtn {
  position: absolute;
  margin-left: 1300px;
  margin-top: 81px;
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
.select {
  height: 30px;
  width: 180px;
  font-size: 100%;
  margin-left: 10px;
}

.Img1 {
  margin-top: 26px;
  width: 35px;
  height: 24px;
  background-image: url("@/assets/logopre1.png");
  background-size: 100%;
  z-index: 40;
}
.Img2 {
  margin-top: 0px;
  width: 44px;
  height: 27px;
  background-image: url("@/assets/logopre2.png");
  background-size: 100%;
  z-index: 40;
}
.Img3 {
  margin-top: 0px;
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
  margin-left: 8%;
}
.PriceItem {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 300px;
  height: 80px;
}
.el-aside {
  display: flex;
  background-color: transparent;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  height: 78.9%;
  margin-top: 5%;
  margin-bottom: 7%;
  margin-left: 10px;
  z-index: 31;
  position: absolute;
}
.el-selection {
  background-color: #d7ede4;
  width: 60%;
  height: 20%;
  border-radius: 20px;
  border: none;
}
.el-selection1 {
  background-color: #d7ede4;
  width: 100px;
  height: 100px;
  border-radius: 20px;
  border: none;
}
.el-selection11 {
  background-color: #d7ede4;
  width: 100px;
  height: 100px;
  border-radius: 20px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .sleimg11 {
    height: 50px;
    background-image: url("@/assets/logo1.png");
    background-size: 100%;
    z-index: 40;
    width: 50px;
    margin-top: -15px;
  }
  .sletext {
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 10%;
    color: #1d382d;
    font-size: 120%;
    margin-bottom: 10%;
  }
}
.el-selection11:hover {
  background-color: #527865;
  width: 100px;
  height: 100px;
  border-radius: 20px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .sleimg11 {
    height: 50px;
    background-image: url("@/assets/logo122.png");
    background-size: 100%;
    z-index: 40;
    width: 50px;
    margin-top: -15px;
  }
  .sletext {
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 10%;
    color: #ffffff;
    font-size: 120%;
    margin-bottom: 10%;
  }
  transition: background-color 0.5s ease;
}

.el-selection11.active {
  background-color: #527865;
  width: 100px;
  height: 100px;
  border-radius: 20px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .sleimg11 {
    height: 50px;
    background-image: url("@/assets/logo122.png");
    background-size: 100%;
    z-index: 40;
    width: 50px;
    margin-top: -15px;
  }
  .sletext {
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 10%;
    color: #ffffff;
    font-size: 120%;
    margin-bottom: 10%;
  }
  transition: background-color 0.5s ease;
}
.el-selection22 {
  background-color: #d7ede4;
  width: 100px;
  height: 100px;
  border-radius: 20px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .sleimg22 {
    height: 50px;
    background-image: url("@/assets/logo2.png");
    background-size: 100%;
    z-index: 40;
    width: 50px;
    margin-top: -15px;
  }
  .sletext {
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 10%;
    color: #1d382d;
    font-size: 120%;
    margin-bottom: 10%;
  }
  transition: background-color 0.5s ease;
}
.el-selection22:hover {
  background-color: #527865;
  width: 100px;
  height: 100px;
  border-radius: 20px;
  border: none;
  display: flex;
  color: #ffffff;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .sleimg22 {
    height: 50px;
    background-image: url("/src/assets/logo22.png");
    background-size: 100%;
    z-index: 42;
    width: 50px;
    margin-top: -15px;
  }
  .sletext {
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 10%;
    color: #ffffff;
    font-size: 120%;
    margin-bottom: 10%;
  }
}

.el-selection22.active {
  background-color: #527865;
  width: 100px;
  height: 100px;
  border-radius: 20px;
  border: none;
  display: flex;
  color: #ffffff;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .sleimg22 {
    height: 50px;
    background-image: url("/src/assets/logo22.png");
    background-size: 100%;
    z-index: 42;
    width: 50px;
    margin-top: -15px;
  }
  .sletext {
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 10%;
    color: #ffffff;
    font-size: 120%;
    margin-bottom: 10%;
  }
}
.el-selection33 {
  background-color: #d7ede4;
  width: 100px;
  height: 100px;
  border-radius: 20px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .sleimg33 {
    height: 50px;
    background-image: url("@/assets/logo3.png");
    background-size: 100%;
    z-index: 40;
    width: 50px;
    margin-top: -15px;
  }
  .sletext {
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 10%;
    color: #1d382d;
    font-size: 120%;
    margin-bottom: 10%;
  }
  transition: background-color 0.5s ease;
}
.el-selection33:hover {
  background-color: #527865;
  width: 100px;
  height: 100px;
  border-radius: 20px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .sleimg33 {
    height: 50px;
    background-image: url("@/assets/logo32.png");
    background-size: 100%;
    z-index: 40;
    width: 50px;
    margin-top: -15px;
  }
  .sletext {
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 10%;
    color: #ffffff;
    font-size: 120%;
    margin-bottom: 10%;
  }
  transition: background-color 0.5s ease;
}

.el-selection33.active {
  background-color: #527865;
  width: 100px;
  height: 100px;
  border-radius: 20px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .sleimg33 {
    height: 50px;
    background-image: url("@/assets/logo32.png");
    background-size: 100%;
    z-index: 40;
    width: 50px;
    margin-top: -15px;
  }
  .sletext {
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 10%;
    color: #ffffff;
    font-size: 120%;
    margin-bottom: 10%;
  }
  transition: background-color 0.5s ease;
}
.el-selection44 {
  background-color: #d7ede4;
  width: 100px;
  height: 100px;
  border-radius: 20px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .sleimg44 {
    height: 50px;
    background-image: url("@/assets/logo4.png");
    background-size: 100%;
    z-index: 40;
    width: 50px;
    margin-top: -15px;
  }
  .sletext {
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 10%;
    color: #1d382d;
    font-size: 120%;
    margin-bottom: 10%;
  }
  transition: background-color 0.5s ease;
}
.el-selection44:hover {
  background-color: #527865;
  width: 100px;
  height: 100px;
  border-radius: 20px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .sleimg44 {
    height: 50px;
    background-image: url("@/assets/logo42.png");
    background-size: 100%;
    z-index: 40;
    width: 50px;
    margin-top: -15px;
  }
  .sletext {
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 10%;
    color: #ffffff;
    font-size: 120%;
    margin-bottom: 10%;
  }
  transition: background-color 0.5s ease;
}

.el-selection44.active {
  background-color: #527865;
  width: 100px;
  height: 100px;
  border-radius: 20px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .sleimg44 {
    height: 50px;
    background-image: url("@/assets/logo42.png");
    background-size: 100%;
    z-index: 40;
    width: 50px;
    margin-top: -15px;
  }
  .sletext {
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 10%;
    color: #ffffff;
    font-size: 120%;
    margin-bottom: 10%;
  }
  transition: background-color 0.5s ease;
}
.sleimg {
  margin-top: -5px;
  height: 50px;
}

.sletext {
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  color: #1d382d;
  font-size: 120%;
  margin-bottom: 10%;
}
.sleimg1 {
  margin-top: 5px;
  height: 50px;
}
.sletext1 {
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 10%;
  color: #1d382d;
  font-size: 150%;
  margin-top: 10%;
}
.el-selectionall {
  display: flex;
  flex-direction: row;
  margin-left: 30px;
  margin-right: 30px;
}

.el-selection:hover {
  background-color: #527865;
  width: 60%;
  height: 20%;
  border-radius: 20px;
  border: none;
  transition: background-color 0.5s ease;
}
</style>
