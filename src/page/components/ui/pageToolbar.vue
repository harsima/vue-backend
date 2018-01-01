<template>
    <div class="sys-page">
        <v-pageTitle title="工具条"></v-pageTitle>
        <div class="page-content">
            <v-pageToolbar>
                这里是工具条内容
                <el-button icon="plus">新增</el-button>
                <el-button icon="edit">编辑</el-button>
                <el-button icon="delete">删除</el-button>
            </v-pageToolbar>
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
                    name: '<v-pageToolbar></v-pageToolbar>',
                    detail: '工具条样式，内容默认右对齐',
                    param: 'align',
                    paramDetail: '对其方式',
                    paramType: 'right/left; 默认right'
                }
            ]
        }
    }
}
</script>