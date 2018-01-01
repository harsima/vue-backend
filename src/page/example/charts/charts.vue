<template>
    <div class="sys-page">
        <v-pageTitle title="图表"></v-pageTitle>
        <v-pageNotes>图表使用echarts组件，详细配置请参考echarts官网文档。</v-pageNotes>
        <v-pageSection title="线形图">
            <v-pageToolbar>
                <el-button type="primary" @click="getChartData">刷新数据</el-button>
            </v-pageToolbar>
            <chart1 :chartData="chartData"></chart1>
        </v-pageSection>
    </div>
</template>

<script>
import chart1 from './chart1'

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
                this.chartData = res.data
            }).catch(err => {
                this.$message.error(`获取数据失败，失败码：${err.response.status}`)
            })
        }
    },
    components: {chart1}
}
</script>
