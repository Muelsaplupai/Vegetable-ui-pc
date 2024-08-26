<template>
    <div class="chart" id="main" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script>
import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout
]);

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "construction",
    mounted() {
        this.createChart();
    },
    methods: {
        createChart() {
            var chartDom = document.getElementById('main');
            var myChart = echarts.init(chartDom);
            var option;

            option = {
                color: ['#FFB400', '#005746', '#008F8D','#C77034'], // 配置各版块颜色
                legend: {
                    top: '10px', // legend位置距离顶部10px
                    icon: 'circle', // 将legend图标改为小圆点 // legend图标宽度
                    itemWidth: 10, // legend图标宽度
                    itemHeight: 10 // legend图标高度
                },
                tooltip: {
                    confine: true,
                    trigger: 'item',
                    formatter: '{b} : {c}' // 鼠标hover时展示啥数据
                },
                series: [
                    {
                        avoidLabelOverlap: false,
                        type: 'pie', // 图例类型：饼图
                        roseType: 'area', // 玫瑰图
                        center: ['50%', '50%'], // 图例在容器中的位置，第一个控制左右，第二个控制上下
                        radius: ['20%', '60%'], // 20%：内部空白圆的直径，60%：外部圆环的直径
                        label: {
                            normal:{
                                show:false
                            }
                        },
                        // labelLine: {
                        //     length: 50,  // 挨着图例的直线的长度
                        //     length2: 20  // 挨着文字的直线的长度
                        // },
                        data: [  // 图例数据，与右图对应
                            {
                                name: '四川',
                                value: 2100
                            },
                            {
                                name: '内蒙古',
                                value: 2502
                            },
                            {
                                name: '浙江',
                                value: 3156
                            },
                            {
                                name: '江苏',
                                value: 2987
                            }
                        ]
                    }
                ]
            };

            option && myChart.setOption(option);
        }
    }

}


</script>