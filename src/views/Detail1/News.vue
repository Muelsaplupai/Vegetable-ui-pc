<template>
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

<script lang="ts">
import { defineComponent } from "vue";
import type { Header, Item } from "vue3-easy-data-table";
import EasyDataTable from "vue3-easy-data-table"; // 确保你的路径和名称正确

export default defineComponent({
  components: {
    EasyDataTable,
  },
  setup() {
    const headers: Header[] = [
      { text: "标题", value: "name" },
      { text: "作者", value: "height"},
      { text: "时间", value: "weight", sortable: true },
    ];

    const items: Item[] = [
      { name: "饺子饺子饺饺子，饺子饺子饺饺子", height: "Nio", weight:7-24},
      { name: "饺子饺子饺饺子，饺子饺子饺饺子", height: "Nio", weight:7-24},
      { name: "饺子饺子饺饺子，饺子饺子饺饺子", height: "Nio", weight:7-24},
      { name: "饺子饺子饺饺子，饺子饺子饺饺子", height: "Nio", weight:7-24},
      { name: "饺子饺子饺饺子，饺子饺子饺饺子", height: "Nio", weight:7-24},
      { name: "饺子饺子饺饺子，饺子饺子饺饺子", height: "Nio", weight:7-24},
      { name: "饺子饺子饺饺子，饺子饺子饺饺子", height: "Nio", weight:7-24},
      { name: "饺子饺子饺饺子，饺子饺子饺饺子", height: "Nio", weight:7-24},
      { name: "饺子饺子饺饺子，饺子饺子饺饺子", height: "Nio", weight:7-24},
      { name: "饺子饺子饺饺子，饺子饺子饺饺子", height: "Nio", weight:7-24},
      { name: "饺子饺子饺饺子，饺子饺子饺饺子", height: "Nio", weight:7-24},
      { name: "饺子饺子饺饺子，饺子饺子饺饺子", height: "Nio", weight:7-24},
      
    ];

    return {
      headers,
      items,
    };
  },
});
</script>

<style scoped>
.customize-table {
  --easy-table-border: 1px solid #445269;
  --easy-table-row-border: 1px solid #445269;

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #FFFFFF;
  --easy-table-header-background-color: #527865;

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: #ffffff;
  --easy-table-body-even-row-background-color: #B0BE97;

  --easy-table-body-row-font-color: #FFFFFF;
  --easy-table-body-row-background-color: #8AADA6;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: #2d3a4f;
  --easy-table-body-row-hover-background-color: #eee;

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: #527865;
  --easy-table-footer-font-color: #FFFFFF;
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
