<template>
  <div class="container">
    <div class="map-info">
      <p v-if="currentMap.navList.length > 1" class="info-nav">
        <span
          v-for="(nav, index) in currentMap.navList"
          :key="nav.adcode"
          class="nav-item"
        >
          <span class="item-title" @click="handleLevelChange(nav, index)">{{
            nav.name
          }}</span>
          <span class="item-arrow">-></span>
        </span>
      </p>
    </div>
    <div ref="chartRef" class="map-chart"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type * as echarts from "echarts";

import { useECharts } from "../../../hooks/useEcharts";
import { useMap } from "../../../hooks/useMap";
import { useLine } from "../../../hooks/useLine";

const chartRef = ref();
const { setOption, getInstance } = useECharts(chartRef, true);
const { points, resetLineData } = useLine(setOption);
const { currentMap, registerMap, handleMapClick, handleLevelChange, adcodeMap } = useMap(
  setOption,
  resetLineData
);

// SVG图标
const svgIcon =
  "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";

// 图表静态配置
const chartOptions = {
  //: echarts.EChartsOption
  // 参考https://echarts.apache.org/zh/option.html#geo
  geo: {
    map: currentMap.name,
    roam: true,
    scaleLimit: {
      min: 1.25,
      max: 10,
    },
    
    label: {
      show: true,
      color: "#FFFFFF",
      formatter: function (params) {
        // 去掉“省”字
        return params.name.replace(/省|市|自治区|特别行政区/g, "");
      },
    },

    itemStyle: {
      borderColor: "#287042",
      borderWidth: 1,
      areaColor: {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: "#7da490",
          },
          {
            offset: 1,
            color: "#527865",
          },
        ],
        global: false,
      },
    },
    emphasis: {
      label: {
        color: "#7F9F6F",
      },
      itemStyle: {
        areaColor: "#D7EDE4",
        borderWidth: 0,
      },
    },
  },
  series: [
    // 参考https://echarts.apache.org/zh/option.html#series-effectScatter
    {
      itemStyle: {
        // 使用 visualMap 映射颜色
        color: {
          type: "visualMap",
          mappingData: [adcodeMap.value], // 映射到数据中的某个字段
        },
        // 其他样式配置
      },
      data: adcodeMap.value,
    },
  ],
};

// 页面加载完成
onMounted(async () => {
  // 注册地图
  await registerMap();
  // 绑定点击事件
  const instance = getInstance();
  instance?.on("click", handleMapClick);
  setOption(chartOptions);
});
</script>

<style lang="less">
* {
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100%;
  line-height: 1;
}
#app {
  width: 100%;
  height: 100%;
  min-width: 1280px;
  color: #bacec6;
  font-size: 12px;
  font-family: "'Pingfang SC', 'SF UI Text', 'Helvetica Neue', 'Consolas'";
}
.container {
  width: 100%;
  height: 100%;
  position: relative;
  .map-info {
    height: 300px;
    color: #194955;
    font-weight: 600;
    font-size: 18px;
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 9;
    .nav-item {
      .item-title {
        cursor: pointer;
      }
      &:last-child {
        .item-arrow {
          display: none;
        }
      }
    }
    .line-btn {
      outline: none;
      cursor: pointer;
    }
  }
  .map-chart {
    width: 100%;
    height: 100%;
  }
}
</style>
