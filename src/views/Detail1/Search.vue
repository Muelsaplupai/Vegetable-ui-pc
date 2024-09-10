<template>
  <div class="search">
    <div class="searchinput">
      <div class="searchitem">
        <div class="searchtext">品种 :</div>
        <el-select v-model="pz" filterable placeholder="品种" class="select" ref="ref1">
          <el-option v-for="item in categories3" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="searchitem">
        <div class="searchtext">省份 :</div>
        <!-- 类似地添加省份和城市的选择器 -->
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
      <div class="searchitem">
        <div class="searchtext">市场 :</div>

        <el-select
          v-model="selectedCategory2"
          filterable
          placeholder="市场"
          class="select"
          ref="ref3"
        >
          <el-option v-for="item in categories2" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>

      <el-button class="searchbtn" type="primary" @click="fetchData" ref="buttonRef"
        >查询</el-button
      >
      <el-button class="clearbtn" @click="clearData">重置</el-button>
      <el-button class="Outbtn" @click="OutData">导出</el-button>
    </div>
    <el-popover
      ref="popoverRef"
      :virtual-ref="buttonRef"
      trigger="click"
      title="今日总结"
      virtual-triggering
      width="220"
    >
      <span> {{ textfinal }}</span>
    </el-popover>
    <!-- <div class="textall">
      <button class="el-selection">
        <img src="@/assets/robot.png" class="sleimg" />
      </button>
      <div class="text">
        昨日(2024年9月7日)，河北省的【土豆】平均价格为0.88元，价格稳定在0.88左右。与前天相比，土豆的平均价格上涨了e.05元预计今日的价格为0.92元，明日的价格可能会上涨至1.03元。 {{ textfinal }} 
      </div>
    </div> -->
    <!-- 数据表格组件 -->
    <EasyDataTable
      ref="exportTableRef"
      :headers="headers"
      :items="items"
      theme-color="#1d90ff"
      table-class-name="customize-table"
      header-text-direction="center"
      body-text-direction="center"
      :rows-per-page="12"
      :loading="loading"
      :server-items-length="serverItemsLength"
      table-min-height="500"
      buttons-pagination
      margin-bottom="50px"
    />

    <EasyDataTable
      ref="exportTableRef1"
      :headers="headers"
      :items="items"
      theme-color="#1d90ff"
      table-class-name="customize-table"
      header-text-direction="center"
      body-text-direction="center"
      :rows-per-page="1000"
      :loading="loading"
      :server-items-length="serverItemsLength"
      table-min-height="500"
      buttons-pagination
      margin-bottom="50px"
      v-show="false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, unref } from "vue";
import { ElSelect, ElOption, ElButton, ElTour, ComponentSize } from "element-plus";
// 确保你引入了 EasyDataTable 及其类型定义
import EasyDataTable from "vue3-easy-data-table";
import type { Header, Item, ServerOptions } from "vue3-easy-data-table";
import axios from "axios"; // 确保已安装axios
import * as XLSX from "xlsx";
const exportTableRef = ref(null);
const exportTableRef1 = ref(null);
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
const list = ref([
  // 表格数据
]);
const config = {
  headers: {},
};

const ref1 = ref();
const ref2 = ref();
const ref3 = ref();
const open = ref(false);
const textfinal = ref();
const apiUrl = "http://192.168.63.221:8080/api/price/market";
const apiUrlpz = "http://192.168.63.221:8080/api/price/pz";
const apiUrlList = "http://192.168.63.221:8080/api/price/list";

const apiUrlFinal = "http://192.168.63.221:8080/api/price/brief";

const OutData = () => {
  const tableDom = exportTableRef1.value?.$el;
  if (!tableDom) {
    return;
  }

  const wb = XLSX.utils.table_to_book(tableDom);
  XLSX.writeFile(wb, "表格数据.xlsx");
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
onMounted(async () => {
  try {
    const postData = {
      prvc: Sheng.value, // 假设API期望一个名为"message"的字段
    };
    const response = await axios.post(apiUrl, postData, config);
    categories2.value = response.data.data;
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
onMounted(async () => {
  try {
    const postData = {
      pageSize: 7000, // 假设API期望一个名为"message"的字段
      pageNum: 1,
    };
    const response = await axios.post(apiUrlList, postData, config);
    items.value = response.data.data.priceList;
    totalLine.value=response.data.data.count;
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
onMounted(async () => {
  try {
    const postData = {
      name: "", // 假设API期望一个名为"message"的字段
    };
    const response = await axios.post(apiUrlpz, postData, config);
    items.value = response.data.data;
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

async function search() {
  try {
    const postData = {
      pz: pz,
      pageSize: 10, // 假设API期望一个名为"message"的字段
      pageNum: 1,
    };
    const response = await axios.post(apiUrlFinal, postData, config);
    items.value = response.data.data.priceList;

    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
// 组件注册（如果需要在局部注册 Element Plus 组件）
// 通常在 main.ts 或全局注册 Element Plus
const Sheng = ref();
const pz = ref();
console.debug(Sheng.value);
const headers: Header[] = [
  { text: "品类", value: "pz" },
  { text: "省", value: "prvc" },
  { text: "市场", value: "market" },
  { text: "平均价格", value: "average", sortable: true },
  { text: "最高价格", value: "highest", sortable: true },
  { text: "最低价格", value: "lowest", sortable: true },
  { text: "日期", value: "releaseTime", sortable: true },
];

const items = ref<Item[]>([]);

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
const categories2 = ref(["常州", "赤峰", "南京"]);
const categories3 = ref(["番茄", "马铃薯", "茄子"]);

const selectedCategory1 = ref("");
const selectedCategory2 = ref("");
const selectedCategory3 = ref("");

// 添加筛选逻辑（根据选中的分类筛选数据）
function clearData() {
  pz.value = "";
  Sheng.value = "";
  selectedCategory2.value = "";
  fetchData();
}
watch(Sheng, async (newValue) => {
  try {
    const postData = {
      prvc: newValue, // 假设API期望一个名为"message"的字段
    };
    const response1 = await axios.post(apiUrlpz, postData, config);
    categories3.value = response1.data.data;
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
watch(Sheng, async (newValue) => {
  try {
    const postData = {
      prvc: newValue, // 假设API期望一个名为"message"的字段
    };
    const response1 = await axios.post(apiUrl, postData, config);
    categories2.value = response1.data.data;
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
watch(pz, async (newValue) => {
  console.debug(2121);
  try {
    // const postData = {
    //   prvc: newValue, // 假设API期望一个名为"message"的字段
    // };
    // const response1 = await axios.post(apiUrl, postData, config);
    // categories2.value = response1.data.data;
    // // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

const serverItemsLength = ref(0);
// const serverOptions = ref<ServerOptions>({
//   page: 1,
//   rowsPerPage: 5,
// });

const loading = ref(false);
const buttonRef = ref();
const popoverRef = ref();
// 模拟的 API 请求函数
const fetchData = async () => {
  unref(popoverRef).popperRef?.delayHide?.();
  open.value = true;
  loading.value = true;
  try {
    const postData = {
      pz: pz.value,
      prvc: Sheng.value,
      market: selectedCategory2.value,
      pageSize: 7000, // 假设API期望一个名为"message"的字段
      pageNum: 1,
    };
    const postData2 = {
      pz: pz.value,
      prvc: Sheng.value,
      market: selectedCategory2.value,
    };
    const response = await axios.post(apiUrlList, postData, config);
    const response2 = await axios.post(apiUrlFinal, postData2, config);
    console.debug(response2.data.data);
    textfinal.value = response2.data.data;
    console.debug("00000" + textfinal.value);
    // 假设响应格式如下
    // {
    //   data: [...items],
    //   total: totalItems
    // }
    items.value = response.data.data.priceList;
    serverItemsLength.value = response.data.data.priceList.length;
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
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
  margin-top: 20px;
  margin-bottom: 25px;
  justify-content: flex-start;
}
.searchtext {
  width: 50px;
  flex-direction: row;
  color: #527865;
  font-size: 150%;
  margin-top: 4px;
}
.searchitem {
  width: 500px;
  display: flex;
  flex-direction: row;
}
.searchbtn {
  margin-left: 280px;
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
.Outbtn {
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
.customize-table {
  --easy-table-border: 1px solid #527865;
  --easy-table-row-border: 1px solid #527865;

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 40px;
  --easy-table-header-font-color: #ffffff;
  --easy-table-header-background-color: #577968;

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: #ffffff;
  --easy-table-body-even-row-background-color: #b0be97;

  --easy-table-body-row-font-color: #527865;
  --easy-table-body-row-font-size: 16px;
  --easy-table-body-row-background-color: #c9d5d1;
  --easy-table-body-row-height: 40px;

  --easy-table-body-row-hover-font-color: #2d3a4f;
  --easy-table-body-row-hover-background-color: #eee;

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: #527865;
  --easy-table-footer-font-color: #ffffff;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 40px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;

  --easy-table-scrollbar-track-color: #2d3a4f;
  --easy-table-scrollbar-color: #2d3a4f;
  --easy-table-scrollbar-thumb-color: #4c5d7a;
  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: #2d3a4f;
}
.select {
  height: 30px;
  width: 130px;
  font-size: 100%;
  margin-left: 10px;
}
.el-selection {
  background-color: #d7ede4;
  width: 60px;
  height: 60px;
  border-radius: 20px;
  border: none;
}

.sleimg {
  height: 40px;
  margin-left: 5px;
}
.sletext {
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10px;
  color: #1d382d;
  font-size: 100%;
}

.textall {
  width: 380px;
  height: 60px;
  display: flex;
  flex-direction: row;
  background-color: #d7ede4;
  justify-content: space-between;
  border-radius: 5px;
  position: absolute;
  z-index: 32;
  margin-top: 10px;
  margin-left: 580px;
}
.text {
  width: 350px;
  height: 60px;
  display: flex;
  flex-direction: row;
  color: #577968;
  text-align: center;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 100%;
}

.demo-pagination-block {
  display: flex;
  justify-content: center;
  height: 40px;
  background-color: #527865;
}

</style>
