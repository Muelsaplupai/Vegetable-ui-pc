<template>
    <el-container>
        <!-- 侧边栏 -->
        <el-aside>
            <button class="el-selection" @click="currentPage = 'SearchIns'">
                 <img src="../assets/logo1.png" class="sleimg"/>
                 <div class="sletext">
                    数据查询
                </div>
            </button>
            <button class="el-selection">
                <img src="../assets/logo2.png" class="sleimg"/>
                 <div class="sletext">
                    预测分析
                </div>
            </button>
            <button class="el-selection" @click="currentPage = 'NewsIns'">
                <img src="../assets/logo3.png" class="sleimg"/>
                 <div class="sletext">
                    市场动态
                </div>
            </button>
            <button class="el-selection">
                <img src="../assets/logo4.png" class="sleimg"/>
                 <div class="sletext">
                    农事指导
                </div>
            </button>
        </el-aside>
        <!-- 右侧内容主体 -->
        <el-main>
            <component :is="currentPageComponent" />
            <!-- <div class="line1">
                <button class="el-1">1</button>
                <button class="el-2">2</button>
                <button class="el-2">2</button>
            </div>
            <div class="line2">
                <button class="el-3">3</button>
                <button class="el-4">4</button>
                <button class="el-5">5</button>
            </div> -->
        </el-main>
    </el-container>

</template>

<script setup>
import GSymbol from "@/components/Gsymbol/GSymbol.vue";
import SearchIns from "./Detail1/Search.vue";
import NewsIns from "./Detail1/News.vue";
import {ref,computed} from 'vue'
const currentPage = ref('SearchIns');

const pageComponents = {
    SearchIns,
    NewsIns,
};
const currentPageComponent = computed(() => pageComponents[currentPage.value]);
</script>


<style lang="less" scoped>
.el-aside {
    display: flex;
    background-color: #BACEC6;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 200px;
    margin-top: 1.3%;
    margin-bottom: 7%;
}

.el-main {
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}

.line1 {
    display: flex;
    justify-content: space-between;
}

.line2 {
    display: flex;
    justify-content: space-between;
}

.el-selection {
    background-color: #d7ede4;
    width: 90px;
    height: 90px;
    border-radius: 20px;
    border: none;
}

.el-selection:hover {
    background-color: #f1e1e5;
}

.el-1 {
    background-color: #ffffff;
    width: 400px;
    height: 300px;
    border-radius: 20px;
    border: none;
}

.el-2 {
    background-color: #ffffff;
    width: 400px;
    height: 300px;
    border-radius: 20px;
    border: none;
}

.el-3 {
    background-color: #ffffff;
    width: 300px;
    height: 200px;
    border-radius: 20px;
    border: none;
}

.el-4 {
    background-color: #ffffff;
    width: 300px;
    height: 200px;
    border-radius: 20px;
    border: none;
}

.el-5 {
    background-color: #ffffff;
    width: 300px;
    height: 200px;
    border-radius: 20px;
    border: none;
}
.sleimg{
    margin-top: -5px;
    height:50px ;
}
.sletext {
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 10%;
    color: #1D382D;
}
</style>