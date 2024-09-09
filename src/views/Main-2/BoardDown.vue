<template>  
  <div id="bar1" style="width: 100%; height: 100%;"></div>  
</template>  
  
<script setup lang="ts">  
import { onMounted, ref } from 'vue';  
import * as echarts from 'echarts';  
import axios from 'axios'; // 确保已安装axios  
  
const apiUrl = "http://192.168.63.221:8080/api/price/fall";  
const dataToSend = "江苏"; // 要发送的字符串 
// const xValue = ref([1, 1, 1, 2, 3]);  
// const yValue = ref(["陕西移动", "山西移动", "北京移动", "山东移动", "河北移动"]);  
  
const charts = ref(null);  
const List=ref();
onMounted(async () => {  
  try {  
    const postData = {  
      message: dataToSend // 假设API期望一个名为"message"的字段  
    }; 
    const response = await axios.post(apiUrl, postData, {  
      headers: {  
        'Content-Type': 'application/json' // 告诉服务器我们正在发送JSON  
      }  
    });  
    //const response = await axios.get(apiUrl);  
    // 注意：这里假设您实际上需要将response.data中的某些数据用于图表，但原始代码并未使用  
    // console.debug("catch"); 应该是 console.log("Success"); 可能是误写  
    console.log("Success fetching data2:");  
    console.log(response.data.data);  
    List.value=response.data.data;
    // 如果需要根据响应数据更新图表，您应该在这里处理  
  } catch (error) {  
    console.error("Error fetching data:", error);  
  }  


//   // 初始化图表，这里我们直接在onMounted中调用，而不是在methods中  
  charts.value = echarts.init(document.getElementById("bar1"));  
  const option = {  
    color: ["#d84430"],  
    tooltip: {  
      show: true,  
    },  
    yAxis: {  
      data: List.value.map(item => item.pz),  
      axisTick: {  
        show: false,  
      },  
      axisLine: {  
        show: false,  
      },  
      axisLabel: {  
        inside: false,  
        verticalAlign: "middle",  
        lineHeight: 20,  
        color: "#194955",  
        textStyle: {  
          fontSize: 24,  
          fontWeight: "bold",  
        },  
        formatter: function (value, index) {  
          if (index > 2) {  
            return "{first|" + value + "}";  
          } else {  
            return "{other|" + value + "}";  
          }  
        },  
        rich: {  
          other: {  
            color: "#194955",  
            opacity: 0.57, 
            fontWeight:800, 
            fontSize: 16,  
          },  
          first: {  
            color: "#194955",  
            fontWeight:800,
            fontSize: 16,  
          },   
        },  
      },  
    },  
    xAxis: {  
      nameTextStyle: {  
        color: "#194955",  
        align: "right",  
      },  
      splitLine: {  
        show: false,  
      },  
      axisLine: {  
        show: false,  
      },  
      axisLabel: {
        padding: [10, 0, 0, -15], //文字左右定位
        textStyle: {
          color: "#194955",
          fontSize: "13",
          itemSize: "",
        },
      },
    },  
    grid: {  
      top: "10%",  
      bottom: "20%",  
      left: "30%",  
      right: "10%"
    },  
    series: [  
      {  
        name: "价格涨幅排行榜",  
        data: List.value.map(item => item.fall),  
        barWidth: 15,  
        type: "bar",  
        itemStyle: {  
          normal: {  
            borderRadius: [3, 20, 20, 3],  
            color: function (params) {  
              if (params.dataIndex === 4) {  
                return "#527865";  
              } else if (params.dataIndex === 3) {  
                return "#539D73";  
              } else if (params.dataIndex === 2) {  
                return "#75b08f";  
              } else if (params.dataIndex === 1) {   
                return "#97c4ab";  
              }  
              else{
                return "#cbe1d5";  
              }
            },  
          },  
        },  
      },  
    ],  
  };  
  
  charts.value.setOption(option);  
  window.addEventListener("resize", () => {  
    charts.value.resize();  
  });  
});  
</script>  
  
<style scoped></style>