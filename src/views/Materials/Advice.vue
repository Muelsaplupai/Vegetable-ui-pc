<template>
  <button @click="testq">222</button>
  <EasyDataTable
    :headers="headers"
    :items="items"
    theme-color="#1d90ff"
    table-class-name="customize-table"
    header-text-direction="center"
    body-text-direction="center"
    :rows-per-page="10"
    alternating
    table-min-height="550"
  />
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Header, Item } from "vue3-easy-data-table";
import EasyDataTable from "vue3-easy-data-table"; // 确保你的路径和名称正确
import axios from "axios";

const apiUrl = "http://192.168.63.221:8081/api/article";
//"https://apifoxmock.com/m1/5019871-4679592-default/article"
//"http://192.168.63.221:8081/api/article";
//
const headers: Header[] = [
  { text: "ID", value: "id" },
  { text: "标题", value: "title" },
  { text: "作者", value: "height" },
  { text: "时间", value: "weight", sortable: true },
];

function testq() {
  console.debug(itemstest.value);
  getTableList();
}
const items = ref<Item[]>([]);
let itemstest = ref([]);
const getTableList = async () => {
  try {
    const response = await axios.get(apiUrl);
    items.value = response.data.data;
    console.debug("catch");
    console.debug(response.data.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
onMounted(() => {
  getTableList();
});
</script>

<style scoped>
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
