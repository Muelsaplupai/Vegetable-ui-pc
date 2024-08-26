<template>
    <div id="bar" style="width: 100%;height:100%;"></div>
</template>
<script>
import * as echarts from 'echarts'
export default {
    data() {
        return {
            xValue: [1, 1, 1, 2, 3, 3],
            yValue: ['陕西移动', '山西移动', '北京移动', '山东移动', '河北移动', '河南移动'],
        };
    },
    mounted() {
        this.show()
    },
    methods: {
        show() {
            this.charts = echarts.init(document.getElementById('bar'))
            var option = {
                color: ['#d84430'],
                tooltip: {
                    show: true
                },
                yAxis: {
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        inside: false,
                        verticalAlign: 'middle',
                        lineHeight: 40,
                        color: '#DDDFEB',
                        formatter: function (value, index) {   // 设置y轴文字的颜色
                            if (index > 2) {
                                return '{first|' + value + '}'
                            } else {
                                return '{other|' + value + '}'
                            }
                        },
                        rich: {
                            other: {
                                color: '#DDDFEB',
                                opacity: 0.57
                            },
                            first: {
                                color: '#DDDFEB'
                            }
                        }
                    },
                    data: this.yValue
                },
                xAxis: {
                    nameTextStyle: {
                        color: 'rgba(255, 255, 255, 0.8)',
                        align: 'right'
                    },
                    splitLine: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        color: 'rgba(255, 255, 255, 0.8)'
                    },
                },
                grid: {
                    top: '0%',
                    bottom: '0%',
                    left: '20%',
                    right: '20%'
                },
                series: [{
                    name: '预警排行榜',
                    barWidth: 15,
                    type: 'bar',
                    data: this.xValue,
                    itemStyle: {
                        normal: {
                            borderRadius: [3, 20, 20, 3],
                            color: function (params) {   // 设置柱形图的颜色
                                if (params.dataIndex === 5) {
                                    return '#d84430'
                                } else if (params.dataIndex === 4) {
                                    return '#f38237'
                                } else if (params.dataIndex === 3) {
                                    return '#e2aa20'
                                } else {
                                    return '#608289'
                                }
                            }
                        },
                    }
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            this.charts.setOption(option);
            window.addEventListener('resize', () => {
                this.charts.resize()
            })
        }
    }
}
</script>
<style scoped>
</style>