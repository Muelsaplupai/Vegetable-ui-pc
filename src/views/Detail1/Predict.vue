<template>
  <div class="titlechart">{{ TableTitle }}</div>
  <div ref="monthlyIndicators" class="mainpre" v-show="activeChart1"></div>
  <div ref="monthlyIndicators2" class="mainpre2" v-show="activeChart2"></div>
  <div class="imgGroup">
    <button class="img1" @click="Chage1"></button>
    <button class="img2" @click="Chage2"></button>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref, nextTick } from "vue";
import bus from "@/views/Main-1/bus.ts";
import axios from "axios"; // 确保已安装axios
const config = {
  headers: {},
};
const Sheng = ref();
const pz = ref();
const apiUrl = "http://192.168.63.221:8080/api/price/partial";
const pzList = ref([]);
onMounted(() => {
  bus.on("ChartBegin", (e: any) => {
    // 传参由回调函数中的形参接受
    classIndex.value = e;
    ChangeTitle(classIndex);
  });
  bus.on("ChartBegin2", (e: any) => {
    // 传参由回调函数中的形参接受
    classIndex.value = e;
    Sheng.value = e;
  });
  bus.on("ChartBegin3", (e: any) => {
    pz.value = e;
  });
  bus.on("DanpzDuoscList", (e: any) => {
    pzList.value = e;
    //console.debug(pzList.value.value);
    //console.debug(chartData.value);
    chartData.value = pzList.value.value;
    chartData2.value = pzList.value.value;
    initChart();
    initChart2();
  });
  bus.on("DanscDuopzList", (e: any) => {
    pzList.value = e;
    //console.debug(pzList.value.value);
    //console.debug(chartData.value);
    chartData.value = pzList.value.value;
    chartData2.value = pzList.value.value;
    initChart();
    initChart2();
  });
  bus.on("QuanshenList", (e: any) => {
    pzList.value = e;
    //console.debug(pzList.value.value);
    //console.debug(chartData.value);
    chartData.value = pzList.value.value;
    chartData2.value = pzList.value.value;
    initChart();
    initChart2();
  });
  bus.on("QuanguoList", (e: any) => {
    pzList.value = e;
    //console.debug(pzList.value.value);
    //console.debug(chartData.value);
    chartData.value = pzList.value.value;
    chartData2.value = pzList.value.value;
    initChart();
    initChart2();
  });
});
const activeChart1 = ref(true);
const activeChart2 = ref(false);
function Chage1() {
  activeChart1.value = true;
  activeChart2.value = false;
}
function Chage2() {
  activeChart1.value = false;
  activeChart2.value = true;
}
let chartInstance: any = null;
const classIndex = ref();
const TableTitle = ref("单一品种全国平均价(元/斤)");
function ChangeTitle(tem) {
  if (tem.value === "Quanguo") {
    TableTitle.value = "单一品种全国平均价(元/斤)";
    Sheng.value = "";
    console.debug("单一品种全国平均价");
  } else if (tem.value === "Quansheng") {
    TableTitle.value = "单一品种地区平均价(元/斤)";
    console.debug("单一品种地区平均价");
  } else if (tem.value === "DanscDuopz") {
    TableTitle.value = "单一市场多品种对比(元/斤)";
    console.debug("单一市场多品种对比");
  } else if (tem.value === "DanpzDuosc") {
    TableTitle.value = "单一品种多市场对比(元/斤)";
    console.debug("单一品种多市场对比");
  }
}
async function Search1() {
  try {
    const postData = {
      pz: pz.value,
      prvc: Sheng.value, // 假设API期望一个名为"message"的字段
    };
    const response = await axios.post(apiUrl, postData, config);
    //console.debug(response.data.highestInfo);
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const monthlyIndicators = ref(null);
const chart = ref(null);
const chart2 = ref(null);
const chartData = ref([
  {
    market: "市场1",
    price: [
      { releaseTime: "2024-09-02", average: 120, type: "" },
      { releaseTime: "2024-09-03", average: 130, type: "" },
      // ...
    ],
  },
  {
    market: "市场2",
    price: [
      { releaseTime: "2024-09-02", average: 220, type: "" },
      { releaseTime: "2024-09-03", average: 230, type: "" },
      // ...
    ],
  },
  // ...
]);
const chartData2 = ref([
  {
    price: [
      { market: "市场1", releaseTime: "2024-09-02", average: 120, type: "" },
      { market: "市场1", releaseTime: "2024-09-03", average: 130, type: "" },
      // ...
    ],
  },
  {
    price: [
      { market: "市场2", releaseTime: "2024-09-02", average: 220, type: "" },
      { market: "市场2", releaseTime: "2024-09-03", average: 230, type: "" },
      // ...
    ],
  },
  // ...
]);
const xAxisDates = ref([]); // 用于存储去重并排序后的日期

onMounted(() => {
  initChart();
});

async function initChart() {
  await nextTick(); // 确保DOM已经渲染完成
  if (chart.value) {
    chart.value.dispose();
  }
  chart.value = echarts.init(monthlyIndicators.value);
  prepareData();
  drawChart();
}
async function initChart2() {
  await nextTick(); // 确保DOM已经渲染完成
  if (chart2.value) {
    chart2.value.dispose();
  }
  chart2.value = echarts.init(monthlyIndicators2.value);
  prepareData();
  drawChart2();
}
function prepareData() {
  // 提取所有唯一的日期并排序
  xAxisDates.value = [
    ...new Set(
      chartData.value.flatMap((market) => market.price.map((item) => item.releaseTime))
    ),
  ].sort((a, b) => new Date(a) - new Date(b));
}
function transformData(responseData: any) {
  const series = [];

  responseData.forEach((marketInfo) => {
    const regularData = marketInfo.price
      .filter((p) => p.type === "")
      .map((p) => p.average);

    const dashedData = marketInfo.price
      .filter((p) => p.type === "dashed")
      .map((p) => p.average);

    const lengthDifference = regularData.length;

    const filledDashedData = [
      ...Array(Math.max(lengthDifference, 0)).fill(null),
      ...dashedData,
    ];

    if (regularData.length > 0) {
      const lastRegularDataPoint = regularData[regularData.length - 1];
      const lastNullIndex = filledDashedData.lastIndexOf(null);

      if (lastNullIndex !== -1) {
        filledDashedData[lastNullIndex] = lastRegularDataPoint;
      }
    }

    series.push({
      name: marketInfo.market,
      type: "line",
      lineStyle: {
        type: "",
      },
      data: regularData,
    });

    series.push({
      name: marketInfo.market,
      type: "line",
      lineStyle: {
        type: "dashed",
      },
      data: filledDashedData,
    });
  });
  console.debug(series);
  return series;
}

function drawChart() {
  // const series = chartData.value.map((market1) => ({
  //   name: market1.market,
  //   type: "line",
  //   lineStyle: {
  //     type: "",
  //   },
  //   data: xAxisDates.value.map((date) => {
  //     const price = market1.price.find((p) => p.releaseTime === date);
  //     return price ? price.average : 0; // 如果找不到对应的日期，则使用0
  //   }),
  // }));
  const series = transformData(chartData.value);
  const option = {
    tooltip: {
      show: true,
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "line", // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    legend: {
      orient: "vertical",
      y: "center", //可设定图例在上、下、居中
      top: 45,
      right: 90, // 定位，和副标题一排，且在右边
    },
    grid: {
      left: "5%",
      right: "25%",
      bottom: "5%",
      containLabel: true,
    },
    toolbox: {
      right: 90,
      top: -0,
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      data: xAxisDates.value,
      axisLabel: {
        padding: [10, 0, 0, -15], //文字左右定位
        textStyle: {
          color: "#1d382d",
          fontSize: "10",
          itemSize: "",
        },
        rotate: 45,
      },
      boundaryGap: true,
    },
    yAxis: {
      type: "value",
      boundaryGap: true,
      axisLabel: {
        padding: [10, 0, 0, -15], //文字左右定位
        textStyle: {
          color: "#1d382d",
          fontSize: "16",
          itemSize: "",
        },
      },
      splitLine: {
        //修改背景线条样式
        show: true, //是否展示
        lineStyle: {
          color: "#353b5a", //线条颜色
          type: "dashed", //线条样式，默认是实现，dashed是虚线
          opacity: 0.5,
        },
      },
    },
    series,
  };
  console.debug(series);
  chart.value.setOption(option);
}

const monthlyIndicators2 = ref(null);

function drawChart2() {
  const series = chartData2.value.map((market) => ({
    name: market.market,
    type: "bar",
    data: xAxisDates.value.map((date) => {
      const price = market.price.find((p) => p.releaseTime === date);
      console.debug(111222333);
      console.debug(price ? price.average : 0);
      return price ? price.average : 0; // 如果找不到对应的日期，则使用0
    }),
  }));

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      orient: "vertical",
      y: "center", //可设定图例在上、下、居中
      top: 45,
      right: 20, // 定位，和副标题一排，且在右边
    },
    grid: {
      left: "3%",
      right: "24%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: xAxisDates.value,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series,
  };

  chart2.value.setOption(option);
}
</script>

<style scoped>
.mainpre {
  margin-top: 40px;
  width: 800px;
  height: 400px;
  align-items: center;
  justify-content: center;
  background-color: #d7ede4;
  z-index: 30;
  position: absolute;
}
.mainpre2 {
  margin-top: 40px;
  width: 800px;
  height: 400px;
  align-items: center;
  justify-content: center;
  background-color: #d7ede4;
  z-index: 30;
  position: absolute;
}
.titlechart {
  width: 300px;
  height: 100px;
  position: absolute;
  z-index: 31;
  font-size: 200%;
  margin-bottom: 330px;
  color: #1d382d;
}
.img1 {
  background-image: url("@/assets/chartLogo1.png");
  background-color: transparent;
  width: 50px;
  height: 50px;
  background-size: 100%;
  border: none;
}

.img2 {
  background-image: url("@/assets/chartLogo2.png");
  background-color: transparent;
  background-size: 100%;
  width: 50px;
  border: none;
  height: 50px;
}
.imgGroup {
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 50px;
  position: absolute;
  z-index: 31;
  margin-left: 600px;
  margin-top: 380px;
}
</style>
