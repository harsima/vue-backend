<template>
    <div class="sys-page">
        <v-pageTitle title="统一分页插件"></v-pageTitle>
        <div class="page-content">
            <div class="article">
                <p>该组件为ElementUI的分页组件二次封装，以实现统一的分页设置。分页所有方法统一继承自ElementUI</p>
            </div>
            <v-pageTable pagination></v-pageTable>
            <v-pageSection title="函数说明">
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
                    name: '<v-pageTable></v-pageTable>',
                    detail: '统一table',
                    param: 'pagination',
                    paramDetail: '是否有分页',
                    paramType: 'true/false'
                },
                {
                    name: '',
                    detail: '',
                    param: 'sizeChange',
                    paramDetail: '每页数目变化回调',
                    paramType: 'Function'
                },
                {
                    name: '',
                    detail: '',
                    param: 'pageChange',
                    paramDetail: '分页变化回调',
                    paramType: 'Function'
                },
                {
                    name: '',
                    detail: '',
                    param: 'paginationTotal',
                    paramDetail: '表格总条数',
                    paramType: 'Number'
                },
                {
                    name: '',
                    detail: '',
                    param: 'pageSize',
                    paramDetail: '每页显示条数',
                    paramType: 'Number'
                },
                {
                    name: '',
                    detail: '',
                    param: 'pageLayout',
                    paramDetail: '分页显示元素',
                    paramType: 'String 默认值：total, sizes, prev, pager, next, jumper'
                }
            ]
        }
    }
}
</script>