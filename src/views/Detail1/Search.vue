<template>
  <div class="searchinput">
    <div class="searchitem">
      <div class="searchtext">省份</div>
      <select v-model="selectedCategory1">
        <option value="">所有</option>
        <option v-for="province in categories1" :key="province" :value="province">
          {{ province }}
        </option>
      </select>
    </div>
    <div class="searchitem">
      <div class="searchtext">城市</div>
      <select v-model="selectedCategory2">
        <option value="">所有</option>
        <option v-for="province in categories2" :key="province" :value="province">
          {{ province }}
        </option>
      </select>
    </div>
    <div class="searchitem">
      <div class="searchtext">品种</div>
      <select v-model="selectedCategory3">
        <option value="">所有</option>
        <option v-for="province in categories3" :key="province" :value="province">
          {{ province }}
        </option>
      </select>
    </div>
  </div>

  <EasyDataTable
    :headers="headers"
    :items="items"
    theme-color="#1d90ff"
    table-class-name="customize-table"
    header-text-direction="center"
    body-text-direction="center"
    :rows-per-page="10"
    alternating
  />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import EasyDataTable from "vue3-easy-data-table"; // 确保你的路径和名称正确
import type { Header, Item } from "vue3-easy-data-table";

const headers: Header[] = [
  { text: "品类", value: "name" },
  { text: "省", value: "province" },
  { text: "市场", value: "weight", sortable: true },
  { text: "平均价格", value: "age", sortable: true },
];

const items: Item[] = [
  { name: "番茄", province: "江苏", weight: 77, age: 20 },
  { name: "番茄", province: "江苏", weight: 75, age: 21 },
  { name: "番茄", province: "内蒙古", weight: 73, age: 22 },
  { name: "番茄", province: "江苏", weight: 77, age: 20 },
  { name: "番茄", province: "江苏", weight: 75, age: 21 },
  { name: "番茄", province: "江苏", weight: 73, age: 22 },
  { name: "番茄", province: "江苏", weight: 77, age: 20 },
  { name: "番茄", province: "江苏", weight: 75, age: 21 },
  { name: "番茄", province: "江苏", weight: 73, age: 22 },
  { name: "番茄", province: "江苏", weight: 77, age: 20 },
  { name: "番茄", province: "江苏", weight: 75, age: 21 },
  { name: "番茄", province: "江苏", weight: 73, age: 22 },
];

const categories1 = ref(["江苏", "内蒙古", "浙江"]);
const categories2 = ref(["常州", "赤峰", "南京"]);
const categories3 = ref(["番茄", "马铃薯", "茄子"]);
const selectedCategory1 = ref("");
const selectedCategory2 = ref("");
const selectedCategory3 = ref("");

const filteredItems = computed(() => {
  if (selectedCategory1.value === "") {
    return items;
  }
  return items.filter((item) => item.province === selectedCategory1.value);
});
</script>

<style scoped>
/* 隐藏原生的select样式 */
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

.searchinput {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.searchtext {
  width: 50px;
  flex-direction: row;
  color: #000000;
  margin-top: 4px;
}
.searchitem {
  width: 150px;
  display: flex;
  flex-direction: row;
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
  --easy-table-body-row-height: 50px;
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
</style>
