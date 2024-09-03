<template>
  <div class="line">
    <div class="line1">
      <div class="line2">
        <img src="@/assets/logo11.png" class="sleimg" />
        <div class="text1">
          <div class="special-style1">畜产品指数</div>
          <div class="special-style2">188</div>
          <div class="special-style3">-0.01 较昨日</div>
        </div>
      </div>
      <div class="line2">
        <img src="@/assets/logo12.png" class="sleimg" />
        <div class="text1">
          <div class="special-style1">水产品指数</div>
          <div class="special-style2">188</div>
          <div class="special-style3">-0.01 较昨日</div>
        </div>
      </div>
    </div>
    <div class="line1">
      <div class="line2">
        <img src="@/assets/logo13.png" class="sleimg" />
        <div class="text1">
          <div class="special-style1">蔬菜指数</div>
          <div class="special-style2">188</div>
          <div class="special-style3">-0.01 较昨日</div>
        </div>
      </div>
      <div class="line2">
        <img src="@/assets/logo14.png" class="sleimg" />
        <div class="text1">
          <div class="special-style1">水果指数</div>
          <div class="special-style2">188</div>
          <div class="special-style3">-0.01 较昨日</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.line {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 80px;
  margin-top: 20px;
}

.line1 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.line2 {
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.sleimg {
  width: 70px;
  height: 70px;
  margin-top: 10%;
}
.special-style1 {
  font-size: 90%;
  font-weight: 900;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
.special-style2 {
  font-size: 170%;
  font-weight: 500;
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
.text1{
  color: #527865;
  font-size: 140%;
  margin-top: 10px;
  display: flex;
  margin-left: 20px;
  flex-direction: column;
}
.special-style3 {
  font-size: 90%;
  font-weight: 900;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

</style>
