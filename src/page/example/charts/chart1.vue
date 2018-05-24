<template>
    <div id="chart1" class="chart-area"></div>
</template>

<script>
import echarts from 'echarts'
import '@/util/echarts.theme.default'

export default {
    data() {
        return {
            chart: {
                target: null,
                option: {
                    tooltip: {
                        trigger: 'axis',
                        formatter: '{a}<br />{b} : {c}'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    yAxis: {
                        type: 'value',
                        min: 0,
                        max: 100
                    },
                    // 必须为空 https://github.com/apache/incubator-echarts/issues/7768
                    series: []
                }
            }
        }
    },
    props: {
        chartData: Array
    },
    watch: {
        chartData(){
            if(this.chartData.length){
                this.draw()  
            }
        }
    },
    mounted(){
        this.$nextTick(() => {
            this.chartsInit()
        })
    },
    methods: {
        // 初始化图表
        chartsInit(){
            // 创建图表对象
            if(!this.chart.target){
                this.chart.target = echarts.init(document.getElementById('chart1'), 'westeros')
            }
            // 绘制默认图表
            this.chart.target.setOption(this.chart.option)
        },
        // 重绘
        draw() {
            // 配置项需要变更
            let option = {
                series: [
                    {
                        name: '邮件营销',
                        type: 'line',
                        data: this.chartData
                    }
                ]
            }
            this.chart.target.setOption(option)
        }
    }
}
</script>

<style lang="scss" scoped>
.chart-area{
    width: 100%;
    height: 400px;
}
</style>