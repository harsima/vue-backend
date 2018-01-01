<template>
    <div class="sys-page">
        <v-pageTitle title="详细鉴权组件"></v-pageTitle>
        <div class="page-content">
            <div class="sys-article">
                <p>该组件并非鉴别页面访问权限，实际是鉴别页面内部某些按钮或操作的权限。</p>
                <p>页面中的某些操作或者某些区块拥有访问等其他权限时，只需要添加<code>v-if="hasPermission('view')</code>即可。</p>
            </div>
            <v-pageSection title="函数说明">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="name" label="函数名">
                    </el-table-column>
                    <el-table-column prop="detail" label="描述">
                    </el-table-column>
                    <el-table-column prop="type" label="参数类型">
                    </el-table-column>
                    <el-table-column prop="results" label="返回值">
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
                    name: 'hasPermission()',
                    detail: '根据传入值鉴别权限，并返回鉴别结果',
                    type: 'String',
                    results: 'true/false'
                }
            ]
        }
    }
}
</script>