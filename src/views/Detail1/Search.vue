<template>
  <div class="search">
    <div class="searchinput">
      <div class="searchitem">
        <div class="searchtext">品种 :</div>
        <el-select
          v-model="selectedCategory3"
          filterable
          placeholder="品种"
          class="select"
        >
          <el-option v-for="item in categories3" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="searchitem">
        <div class="searchtext">省份 :</div>
        <!-- 类似地添加省份和城市的选择器 -->
        <el-select
          v-model="selectedCategory1"
          filterable
          placeholder="省份"
          class="select"
        >
          <el-option v-for="item in categories1" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="searchitem">
        <div class="searchtext">城市 :</div>

        <el-select
          v-model="selectedCategory2"
          filterable
          placeholder="城市"
          class="select"
        >
          <el-option v-for="item in categories2" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>

      <el-button class="searchbtn" type="primary">查询</el-button>
      <el-button class="clearbtn">重置</el-button>
    </div>
    <!-- 数据表格组件 -->
    <EasyDataTable
      :headers="headers"
      :items="filteredItems"
      theme-color="#1d90ff"
      table-class-name="customize-table"
      header-text-direction="center"
      body-text-direction="center"
      :rows-per-page="15"
      alternating
      table-min-height="500"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { ElSelect, ElOption, ElButton } from "element-plus";
// 确保你引入了 EasyDataTable 及其类型定义
import EasyDataTable from "vue3-easy-data-table";
import type { Header, Item } from "vue3-easy-data-table";

// 组件注册（如果需要在局部注册 Element Plus 组件）
// 通常在 main.ts 或全局注册 Element Plus

const headers: Header[] = [
  { text: "品类", value: "name" },
  { text: "省", value: "province" },
  { text: "市场", value: "market" },
  { text: "平均价格", value: "averprize", sortable: true },
  { text: "最高价格", value: "maxprize", sortable: true },
  { text: "最低价格", value: "minprize", sortable: true },
];

const items: Item[] = [
  {
    name: "番茄",
    province: "江苏",
    market: "遵义金土地绿色产品交易有限公司",
    averprize: 20,
    maxprize: 20,
    minprize: 20,
  },
  {
    name: "番茄",
    province: "江苏",
    market: "遵义金土地绿色产品交易有限公司",
    averprize: 21,
    maxprize: 20,
    minprize: 20,
  },
  {
    name: "番茄",
    province: "内蒙古",
    market: "遵义金土地绿色产品交易有限公司",
    averprize: 22,
    maxprize: 20,
    minprize: 20,
  },
  {
    name: "番茄",
    province: "江苏",
    market: "遵义金土地绿色产品交易有限公司",
    averprize: 20,
    maxprize: 20,
    minprize: 20,
  },
  {
    name: "番茄",
    province: "江苏",
    market: "遵义金土地绿色产品交易有限公司",
    averprize: 21,
    maxprize: 20,
    minprize: 20,
  },
  {
    name: "番茄",
    province: "江苏",
    market: "遵义金土地绿色产品交易有限公司",
    averprize: 22,
    maxprize: 20,
    minprize: 20,
  },
  {
    name: "番茄",
    province: "江苏",
    market: "遵义金土地绿色产品交易有限公司",
    averprize: 20,
    maxprize: 20,
    minprize: 20,
  },
  {
    name: "番茄",
    province: "江苏",
    market: "遵义金土地绿色产品交易有限公司",
    averprize: 21,
    maxprize: 20,
    minprize: 20,
  },
  {
    name: "番茄",
    province: "江苏",
    market: "遵义金土地绿色产品交易有限公司",
    averprize: 22,
    maxprize: 20,
    minprize: 20,
  },
  {
    name: "番茄",
    province: "江苏",
    market: "遵义金土地绿色产品交易有限公司",
    averprize: 20,
    maxprize: 20,
    minprize: 20,
  },
  {
    name: "番茄",
    province: "江苏",
    market: "遵义金土地绿色产品交易有限公司",
    averprize: 21,
    maxprize: 20,
    minprize: 20,
  },
  {
    name: "番茄",
    province: "江苏",
    market: "遵义金土地绿色产品交易有限公司",
    averprize: 22,
    maxprize: 20,
    minprize: 20,
  },
];

const categories1 = ref(["江苏", "内蒙古", "浙江"]);
const categories2 = ref(["常州", "赤峰", "南京"]);
const categories3 = ref(["番茄", "马铃薯", "茄子"]);

const selectedCategory1 = ref("");
const selectedCategory2 = ref("");
const selectedCategory3 = ref("");

// 添加筛选逻辑（根据选中的分类筛选数据）
const filteredItems = computed(() => {
  // 根据 selectedCategory1, selectedCategory2, selectedCategory3 进行筛选
  // 这里只是示例，实际逻辑可能更复杂
  return items.filter((item) => {
    // 假设 items 数组中有与 select 绑定的属性对应的字段
    return (
      (selectedCategory1.value === "" || item.province === selectedCategory1.value) &&
      (selectedCategory2.value === "" || item.market.includes(selectedCategory2.value)) && // 假设 market 字段包含城市名
      (selectedCategory3.value === "" || item.name === selectedCategory3.value)
    );
  });
});
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
  width: 200px;
  display: flex;
  flex-direction: row;
}
.searchbtn {
  margin-left: 300px;
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
.customize-table {
  --easy-table-border: 1px solid #445269;
  --easy-table-row-border: 1px solid #445269;

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 40px;
  --easy-table-header-font-color: #ffffff;
  --easy-table-header-background-color: #527865;

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: #ffffff;
  --easy-table-body-even-row-background-color: #b0be97;

  --easy-table-body-row-font-color: #ffffff;
  --easy-table-body-row-background-color: #8aada6;
  --easy-table-body-row-height: 40px;
  --easy-table-body-row-font-size: 14px;

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
  width: 80px;
  font-size: 100%;
  margin-left: 10px;
}

/* 原有的样式保持或根据 Element Plus 组件进行调整 */
</style>
