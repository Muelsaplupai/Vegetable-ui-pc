<template>
  <div ref="monthlyIndicators" class="mainpre"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import * as echarts from "echarts";

// 创建一个响应式引用来保存DOM元素
let chartInstance: any = null;
const monthlyIndicators = ref(null);
// 初始化ECharts实例并设置配置项（这里以折线图为例，但可灵活替换）
onMounted(async () => {
  await nextTick(); // 确保DOM已经渲染完成
  const monthlyIndicatorsElement = echarts.init(monthlyIndicators.value);
  const option = {
    legend: {
      data: ["计划", "实际"],
      icon: "circle", // 设置图例图标为圆形
      left: "left", // 将图例定位到左侧
      top: "top", // 将图例定位到顶部
    },
    grid: {
      top: "45", // 距离容器上边界的距离
      right: "10", // 距离容器右边界的距离
      bottom: "3", // 距离容器下边界的距离
      left: "10", // 距离容器左边界的距离
      containLabel: true, // 包含标签的绘图区域
    },
    xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  };

  monthlyIndicatorsElement.setOption(option);
});

// 销毁ECharts实例
onUnmounted(() => {
  if (chartInstance != null && chartInstance.dispose) {
    chartInstance.dispose();
  }
});
</script>

<style scoped>
.mainpre{
   width: 80%; 
   height: 80%;
   align-items: center;
   justify-content: center;
   background-color: #d7ede4;
}
</style>
