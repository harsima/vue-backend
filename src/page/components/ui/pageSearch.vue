<template>
    <div class="sys-page">
        <v-pageTitle title="搜索条"></v-pageTitle>
        <div class="page-content">
            <v-pageSearch>
                现在看到的就是搜索条
            </v-pageSearch>
            <v-pageSection title="组件说明">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="name" label="组件使用">
                    </el-table-column>
                    <el-table-column prop="detail" label="功能描述">
                    </el-table-column>
                    <el-table-column prop="param" label="参数">
                    </el-table-column>
                    <el-table-column prop="paramDetail" label="参数描述">
                    </el-table-column>
                    <el-table-column prop="paramType" label="参数类型">
                    </el-table-column>
                </el-table>
            </v-pagesection>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
                {
                    name: '<v-pageSearch></v-pageSearch>',
                    detail: '可以插入任意节点，外层仅为有样式的<div>层',
                    param: '-',
                    paramDetail: '-',
                    paramType: '-'
                }
            ]
        }
    }
}
</script>