<template>
    <div class="sys-page">
        <app-title title="子区域"></app-title>
        <div class="page-content">
            <app-section title="子区域标题">
                子区域任意内容
            </app-section>
            <app-section title="组件说明">
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
            </app-section>
        </div>
    </div>
</template>

<script>
export default {
    name: 'comPageSection',
    data() {
        return {
            tableData: [
                {
                    name: '<app-section></app-section>',
                    detail: '该区域为详细区域分块',
                    param: 'title',
                    paramDetail: '定义分块标题',
                    paramType: 'String'
                }
            ]
        }
    }
}
</script>