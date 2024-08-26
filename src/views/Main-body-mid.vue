<template>
    <div class="main-row2">
        <div class="mid-up">
            <div class="mid-up-item">
                市场总数<br><br>
                xx
            </div>
            <div class="mid-up-item">
                品种总数<br><br>
                xx
            </div>
            <div class="mid-up-item">
                品类总数<br><br>
                xx
            </div>
            <div class="mid-up-item">
                数据总量<br><br>
                xx
            </div>

        </div>
        <div class="mid-bottom">
            <MapIns />
        </div>

    </div>
</template>

<script setup>
import MapIns from "@/views/Map.vue"
</script>

<style scoped>

.main-row2{
    display: flex;
    background-color:#BACEC6 ;
    flex-direction:column;
    width:50%;
}.mid-up{
    height: 22%;
    font-size: medium;
    color: #000000;
    background-color: #BACEC6;
    display: flex;
    justify-content: space-between;
    margin:0 75px;
}
.mid-up-item{
    background-color: #BACEC6;
    font-size:larger;
    display: flex;
    align-items: center;

}.mid-bottom{
    height: 78%;
    font-size: medium;
    color: #000000;
    
}

</style>