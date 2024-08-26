<template>
    <el-header><!-- 头部区 -->
            <div>
                <img src="../assets/logo.png" alt="" height=90px />
                <span>农产品市场大数据系统</span>
            </div>


            <div class="search-box"> 
                <input type="text" class="search-left" >
                <button class="search-right">
                    <el-icon :size="20">
                        <Search />
                    </el-icon>
                </button>
            </div>

            
            <div flex-end>
                <span>登录</span>
                <div class="user">
                    <el-icon :size="size" :color="color">
                    <User />
                    </el-icon>
                </div>
                
            </div>
  
        </el-header>
</template>

<script>
export default {

};
</script>


<style lang="less" scoped>
  .el-header{
     background-color: #BACEC6;
     display: flex; //设置显示为flex布局
     justify-content: space-between;//设置为flex左右布局
     padding-left: 0;//左内边距为0（Logo贴左边）
     align-items: center;//元素上下居中（防止右边按钮贴上下边）
     color: #fff;
     font-size: 23px;
     > div {//内嵌的div样式
         display: flex;
         align-items: center;//Logo和文字上下居中
         span {
             margin-left: 15px;//文字左侧设置间距，防止与Logo紧贴
         }
     }
     height: 90px;
 }

 .home-container{
    width : 100%;
	height : 100vh;
}
.el-logo{
    background-color:#EEDAAF;
}

.user{
    display: flex;
    border-radius: 50%;
    background-color:#527865;
    width:40px;
	height: 40px;
    justify-content:center;
    align-items:center;
}
 .search-box{
     display: flex;
     margin-top: 8px;
     width: 300px;
     flex-wrap: nowrap
 }
.search-left{
    text-indent: 20px;
    width:85%;
    height:30px;
    border-bottom-left-radius:25px;
    border-top-left-radius:25px;
    border:none;
    outline: 0px;
    align-items: center;
    background-color: #527865;
}
.search-right{
    width:15%;
    //box-sizing: content-box;
    height:30px;
    background: #527865;
    color: #fff;
    border:none;
    border-bottom-right-radius:25px;
    border-top-right-radius:25px;
    outline:none;
    align-items: center;
}

</style>