<template>
    <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px">
            <button class="el-selection">1</button>
            <button class="el-selection">2</button>
            <button class="el-selection">3</button>
            <button class="el-selection">4</button>
            <button class="el-selection">5</button>
        </el-aside>
        <!-- 右侧内容主体 -->
        <el-main>
            <div class="line1">
                <button class="el-1">1</button>
                <button class="el-2">2</button>
                <button class="el-2">2</button>
            </div>
            <div class="line2">
                <button class="el-3">3</button>
                <button class="el-4">4</button>
                <button class="el-5">5</button>
            </div>
        </el-main>
    </el-container>

</template>

<script>
export default {

};
</script>


<style lang="less" scoped>
 .el-aside{
     display: flex;
     background-color: #BACEC6;
     flex-direction: column;
     justify-content:space-between;
     align-items:center;
 }
  .el-main{
     background-color: #BACEC6;
     display: flex;
     justify-content: space-between;
     flex-direction: column;
 }
.line1{
    display: flex;
    justify-content: space-between;
}
.line2{
    display: flex;
    justify-content: space-between;
}
 .el-selection{
    background-color: #d7ede4;
    width: 90px;
    height: 90px;
    border-radius: 20px;
    border: none;
 }
 .el-selection:hover {
  background-color: #f1e1e5;
}

.el-1{
    background-color: #ffffff;
    width: 400px;
    height: 300px;
    border-radius: 20px;
    border: none;
 }
 
 .el-2{
    background-color: #ffffff;
    width: 400px;
    height: 300px;
    border-radius: 20px;
    border: none;
 }
 
 .el-3{
    background-color: #ffffff;
    width: 300px;
    height: 200px;
    border-radius: 20px;
    border: none;
 }
 
 .el-4{
    background-color: #ffffff;
    width: 300px;
    height: 200px;
    border-radius: 20px;
    border: none;
 }
 
 .el-5{
    background-color: #ffffff;
    width: 300px;
    height: 200px;
    border-radius: 20px;
    border: none;
 }
</style>