<template>
    <div class="container" @mouseover="stopScroll" @mouseleave="startScroll">
        <div class="scroll-list" :class="{ 'paused': isPaused }">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>10</div>
            <!-- 下面代码是为了让滚动内容能够多展示一屏(去除留白/无限轮播)：数量请自行根据高度进行计算 -->
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isPaused: false
        };
    },
    methods: {
        stopScroll() {
            this.isPaused = true;
        },
        startScroll() {
            this.isPaused = false;
        }
    }
}
</script>

<style scoped>
    .container {
        position: relative;
        background-color: #a4ffcc;
        /* 父容器需要有明确的高度 */
        height: 150px;
        width: 200px;
        margin: auto;
        overflow: hidden;
    }

    .container > .scroll-list {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        animation: scroll 6s linear infinite normal;
        transition: animation 0.5s;
    }

    .container > .scroll-list.paused {
        animation-play-state: paused;
    }

    .container > .scroll-list > div {
        width: 100%;
        /* 滚动的项目需要有具体的高度 */
        height: 30px;
        background-color: #067B9E;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }

    .container > .scroll-list > div:nth-child(2n) {
        background-color: #30A4A1;
    }

    @keyframes scroll {
        100% {
            /* 需要滚动内容的总高度 */
            top: -300px;
        }
    }
</style>
