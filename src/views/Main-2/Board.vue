<template>  
  <div id="bar" style="width: 100%; height: 100%;"></div>  
</template>  
  
<script setup lang="ts">  
import { onMounted, ref ,watch} from 'vue';  
import * as echarts from 'echarts';  
import axios from 'axios'; // 确保已安装axios  
import bus from '../Main-1/bus';
const apiUrl = "http://192.168.63.221:8080/api/price/rise";  
const dataToSend = "江苏"; 
const config = {
  headers: {},
};

const apiurl22="http://192.168.63.221:8080/api/getpersonal";
onMounted(async () => {
  try {
    const postData = {
        username: localStorage.getItem("username")||"用户", 
    };
    const response = await axios.post(apiurl22, postData, config);
    const sheng= response.data.data.prvc;
    const pz22= response.data.data.pzList;
    console.debug(8888888888888888888888888888888);
    console.debug(sheng)
    localStorage.setItem("prvc",sheng);
    localStorage.setItem("pz",pz22);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
const prvcname=ref(localStorage.getItem("prvc")||"江苏");
onMounted(() => {
   prvcname.value=localStorage.getItem("prvc")||"江苏";
  console.debug("prvcname"+prvcname.value);
  bus.on("prvc", (e: any) => {
    // 传参由回调函数中的形参接受
    const name=e;
    prvcname.value = name;
    console.debug(prvcname.value);
  });
});
const charts = ref(null);  
const List=ref();
watch(prvcname, async (newValue) => {
  try {  
    const postData = {  
      prvc: prvcname.value // 假设API期望一个名为"message"的字段  
    }; 
    const response = await axios.post(apiUrl, postData, {  
      headers: {  
        'Content-Type': 'application/json' // 告诉服务器我们正在发送JSON  
      }  
    });  
    console.log("Success fetching data:");  
    console.log(response.data.data);  
    List.value=response.data.data;
    // 如果需要根据响应数据更新图表，您应该在这里处理  
  } catch (error) {  
    console.error("Error fetching data:", error);  
  }  
  charts.value = echarts.init(document.getElementById("bar"));  
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
        lineHeight: 26,  
        color: "#194955",  
        textStyle: {  
          fontSize: 26,  
          fontWeight: 800,  
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
      right: "10%",  
    },  
    series: [  
      {  
        name: "价格涨幅排行榜",  
        data: List.value.map(item => item.rise),  
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
onMounted(async () => {  
  try {  
    const postData = {  
      prvc: localStorage.getItem("prvc") // 假设API期望一个名为"message"的字段  
    }; 
    const response = await axios.post(apiUrl, postData, {  
      headers: {  
        'Content-Type': 'application/json' // 告诉服务器我们正在发送JSON  
      }  
    });  
    console.log("Success fetching data:");  
    console.log(response.data.data);  
    List.value=response.data.data;
    // 如果需要根据响应数据更新图表，您应该在这里处理  
  } catch (error) {  
    console.error("Error fetching data:", error);  
  }  
  // 初始化图表，这里我们直接在onMounted中调用，而不是在methods中  
  charts.value = echarts.init(document.getElementById("bar"));  
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
        lineHeight: 26,  
        color: "#194955",  
        textStyle: {  
          fontSize: 26,  
          fontWeight: 800,  
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
      right: "10%",  
    },  
    series: [  
      {  
        name: "价格涨幅排行榜",  
        data: List.value.map(item => item.rise),  
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