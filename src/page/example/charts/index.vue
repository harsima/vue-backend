<template>
    <div class="sys-page">
        <app-title title="图表"></app-title>
        <app-notes>图表使用echarts组件，详细配置请参考echarts官网文档。</app-notes>
        <app-section title="线形图">
            <app-toolbar>
                <el-button type="primary" @click="getChartData">刷新数据</el-button>
            </app-toolbar>
            <chart1 :chartData="chartData"></chart1>
        </app-section>
    </div>
</template>

<script>
import Chart1 from './Chart1'

export default {
    data(){
        return {
            chartData: []
        }
    },
    mounted(){
        this.$nextTick(() => {
            this.getChartData()
        })
    },
    methods: {
        getChartData(){
            this.$axios({
                url: '/charts',
                method: 'get',
            }).then(res => {
                this.chartData = res
            }).catch(err => {
                this.$message.error(`获取数据失败，失败码：${err.response.status}`)
            })
        }
    },
    components: {Chart1}
}
</script>
