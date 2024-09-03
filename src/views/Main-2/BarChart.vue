<template>
  <div ref="monthlyIndicators" style="width: 80%; height: 80%"></div>
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
      textStyle: { color: "#194955" },
    },
    grid: {
      top: "45", // 距离容器上边界的距离
      right: "10", // 距离容器右边界的距离
      bottom: "3", // 距离容器下边界的距离
      left: "0", // 距离容器左边界的距离
      containLabel: true, // 包含标签的绘图区域
    },
    tooltip: {
      // 开启tooltip组件
      trigger: "axis", // 触发类型，默认数据项触发，可选为：'item' | 'axis'
      axisPointer: {
        // 坐标轴指示器，默认直线，可选为：'line' | 'shadow'
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: function (params: any) {
        // 自定义悬浮框内容
        // params是一个数组，每个元素代表一个数据项的信息
        let result = `${params[0].seriesName}<br/>`;
        result += `${params[0].axisValue}: ${params[0].value}`;
        if (params.length > 1) {
          // 如果是堆积图，可能会有多个数据项
          result += `<br/>${params[1].seriesName}: ${params[1].value}`;
        }
        return result;
      },
    },
    xAxis: {
      type: "category",
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
      axisLabel: {
        textStyle: {
          color: "#194955", // 设置y轴文字颜色为浅灰色
        },
      },
      axisTick: {
        alignWithLabel: true,
        show: false, // 不显示刻度线
      },
      axisLine: {
        show: false, // 不显示横坐标轴线
      },
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
      axisLabel: {
        textStyle: {
          color: "#194955", // 设置y轴文字颜色为浅灰色
        },
      },
    },
    series: [
      {
        name: "实际",
        data: [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 234, 123],
        type: "bar",
        stack: "total", // 添加堆积效果
        barWidth: "30%", // 调整柱子宽度
        itemStyle: {
          borderRadius: [5, 5, 0, 0], // 只有顶部圆角
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            // 设置渐变色
            { offset: 0, color: "#89B3B6" },
            { offset: 1, color: "#123850" },
          ]),
        },
      },
      {
        name: "计划",
        data: [320, 132, 101, 134, 90, 230, 210, 320, 132, 101, 134, 90],
        type: "bar",
        stack: "total", // 添加堆积效果
        barWidth: "30%", // 调整柱子宽度
        itemStyle: {
          borderRadius: [5, 5, 0, 0], // 只有顶部圆角
          color: "#B7C39D", // 设置柱子颜色
        },
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
/* 添加一些CSS样式来美化图表容器（可选） */
</style>
