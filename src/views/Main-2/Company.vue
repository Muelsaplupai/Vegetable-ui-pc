<template>
  <div class="back"></div>
  <div class="container">
    <div class="items">
      <div v-for="(item, index) in List1" :key="index" class="item">
        <a :href="item.link" target="_blank" class="title">{{ item.title }}</a>
        <div class="content">{{ item.brief }}</div>
        <div class="date">{{ item.releaseDate }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import axios from "axios"; // 确保已安装axios
const apiUrl = "https://apifoxmock.com/m1/5019871-4679592-default/article/news";
const apiUrl1 = "https://apifoxmock.com/m1/5019871-4679592-default/article/guide";
const dataToSend = {
  key1: "value1",
  key2: "value2",
  key3: "value3",
  key4: "value4",
};

const config = {
  headers: {
    "Content-Type": "application/json",
    // 其他需要设置的header
    Authorization: "Bearer your_token_here", // 示例：使用Bearer token
  },
};
const dataToSend1 = {
  key1: "value1",
  key2: "value2",
  key3: "value3",
  key4: "value4",
};
const token = ref("your_token_here");
const config1 = {
  headers: {
    "Content-Type": "application/json",
    // 其他需要设置的header
    Authorization: "Bearer ${token.value}", // 示例：使用Bearer token
  },
};
const charts = ref(null);
const List = ref();
const List1 = ref();
onMounted(async () => {
  try {
    const postData = {
      message: dataToSend, // 假设API期望一个名为"message"的字段
    };
    const postData1 = {
      message: dataToSend1, // 假设API期望一个名为"message"的字段
    };
    const response = await axios.post(apiUrl, postData, config);
    //console.log(response.data.data);
    const response1 = await axios.post(apiUrl1, postData1, config1);
    // console.log("Success fetching data2:");
    //console.log(response1.data.data);

    List.value = response.data.data;
    List1.value = response1.data.data;
    // 如果需要根据响应数据更新图表，您应该在这里处理
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

// 图片数组
const images = [
  ` /vue3-echarts-map/src/assets/background1.jpg`,
  ` /vue3-echarts-map/src/assets/background2.jpg`,
  ` /vue3-echarts-map/src/assets/background3.jpg`,
];
const links = ref([
  {
    url: "https://www.example.com",
    text:
      "王小兵主任出席2024中国国际大数据产业博览会“激活数据要素价值 赋能乡村全面振兴”交流活动并致辞",
  },
  {
    url: "https://vuejs.org",
    text:
      "王小兵主任出席2024中国国际大数据产业博览会“激活数据要素价值 赋能乡村全面振兴”交流活动并致辞",
  },
  {
    url: "https://github.com",
    text:
      "王小兵主任出席2024中国国际大数据产业博览会“激活数据要素价值 赋能乡村全面振兴”交流活动并致辞",
  },
  // 如果text未提供，将默认使用url作为显示文本
  {
    url: "https://www.npmjs.com",
    text:
      "王小兵主任出席2024中国国际大数据产业博览会“激活数据要素价值 赋能乡村全面振兴”交流活动并致辞",
  },
]);
// 当前显示的图片索引
const currentIndex = ref(0);

// 计算属性，用于获取当前显示的图片
const currentImage = computed(() => images[currentIndex.value]);

// 设置轮播定时器
let intervalId = null;

// 组件挂载时启动定时器
onMounted(() => {
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length;
    //console.debug(currentIndex.value)
  }, 5000); // 每5秒切换一次
});

// 组件卸载时清除定时器
onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});

// 假设这是你的所有项目数据
const allItems = ref([
  {
    url: "https://example.com/1",
    title: "Title 1",
    content: "Content 1",
    date: "2023-01-01",
  },
  {
    url: "https://example.com/2",
    title: "Title 2",
    content: "Content 2",
    date: "2023-01-02",
  },
  {
    url: "https://example.com/3",
    title: "Title 3",
    content: "Content 3",
    date: "2023-01-03",
  },
  {
    url: "https://example.com/4",
    title: "Title 4",
    content: "Content 4",
    date: "2023-01-04",
  },
  // ... 更多项目
]);

// 控制当前显示的索引
const currentIndex2 = ref(0);

// 控制一次显示多少个项目
const visibleCount = ref(4);

// 计算属性，用于获取当前应该显示的项目
const visibleItems = computed(() => {
  const start = currentIndex2.value;
  const end = start + visibleCount.value;
  return allItems.value.slice(start, end);
});

// 上一项
function prev() {
  if (currentIndex2.value > 0) {
    currentIndex2.value--;
  }
}

// 下一项
function next() {
  if (currentIndex2.value + visibleCount.value < allItems.value.length) {
    currentIndex2.value++;
  }
}
</script>

<style scoped>
.toptitle {
  font-size: 200%;
  font-weight: 900;
  z-index: 20;
  z-index: 20;
  color: #527865;
  margin-left: 48.8%;
  position: absolute;
}
.topline {
  display: flex;
  flex-direction: row;
  margin-top: 7%;
  z-index: 20;
  position: absolute;
  min-width: 0;
  overflow: hidden;
}
.slider-container {
  width: 25%; /* 根据需要调整 */
  height: auto; /* 根据图片大小或需要调整 */
  overflow: hidden;
  z-index: 20;
  margin-left: 18%;
}

.slider-image {
  width: 100%; /* 使图片宽度充满容器 */
  height: auto; /* 保持图片宽高比 */
  display: block; /* 防止图片下方出现空隙 */
}

.ullist {
  padding: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  margin-left: 6%;
  margin-top: 3%;
  width: 500px;
  min-width: 0;

}

li {
  list-style-type: disc;
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.aup {
  display: flex;
  justify-content: flex-start;
  text-decoration: none;
  color: #527865;
  font-size: 120%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 400px;
  min-width: 0;
}

.aup:hover {
  color: #ffffff;
  font-weight: 400;
}
.special-style {
  color: #527865;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 20;
  margin-top: 400px;
  width: 420px;
  margin-left: 550px;
}

.items {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  gap: 30px;
  padding: 10px;
  margin-right: 10px;
  min-width: 0;
  min-height: 0;
}

.item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 5px;
  padding: 10px;
  background-color: #d7ede4;

  height: 270px;
  width: 220px;
  border-radius: 10px;
}

.title {
  font-weight: bold;
  text-decoration: none;
  color: #527865;
  font-size: 120%;
  width: 100%;
  word-break: break-all;
  word-wrap: break-word;
  white-space: normal;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  margin-left: 15px;
  margin-right: 15px;
}
.contitle {
  text-decoration: none;
  color: #527865;
  margin-right: 870px;
  width: 100%;
  font-size: 200%;
  margin-bottom: 10px;
  font-weight: 900;
}

.content {
  font-size: 0.9em;
  color: #527865;
  text-align: left;
  word-break: break-all;
  word-wrap: break-word;
  white-space: normal;
  margin-left: 15px;
  margin-right: 15px;
}
.date {
  position: absolute;
  font-size: 0.9em;
  color: #527865;
  margin-top: 230px;
  margin-left: 15px;
  margin-right: 15px;
}

.back {
  background-color: #bacec6;
  z-index: 19;
  position: absolute;
  width: 1200px;
  height: 650px;
  margin-top: 4%;
  margin-left: 10%;
  border-radius: 10px;
}

.back2 {
  background-color: #d7ede4;
  z-index: 20;
  opacity: 0.6;
  position: absolute;
  width: 1040px;
  height: 310px;
  margin-top: 5.3%;
  margin-left: 15.5%;
  border-radius: 10px;
}
</style>
