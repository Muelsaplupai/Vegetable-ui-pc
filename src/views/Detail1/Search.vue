<template>
  <div class:"searchinput">
    <select v-model="selectedCategory">
      <option value="">所有</option>
      <option v-for="province in categories1" :key="province" :value="province">
        {{ province }}
      </option>
    </select>
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
const selectedCategory = ref("");

const filteredItems = computed(() => {
  if (selectedCategory.value === "") {
    return items;
  }
  return items.filter((item) => item.province === selectedCategory.value);
});
</script>

<style scoped>
.searchinput{
    
}
.customize-table {
  --easy-table-border: 1px solid #445269;
  --easy-table-row-border: 1px solid #445269;

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
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
  --easy-table-footer-height: 50px;

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
