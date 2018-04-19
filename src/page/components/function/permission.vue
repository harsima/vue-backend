<template>
    <div class="sys-page">
        <app-title title="详细鉴权组件"></app-title>
        <div class="page-content">
            <div class="sys-article">
                <p>该组件并非鉴别页面访问权限，实际是鉴别页面内部某些按钮或操作的权限。</p>
                <p>页面中的某些操作或者某些区块拥有访问等其他权限时，只需要添加<code>v-hasPermission="'view'"</code>即可。</p>
            </div>
            <app-section title="函数说明">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="name" label="指令名">
                    </el-table-column>
                    <el-table-column prop="detail" label="描述">
                    </el-table-column>
                    <el-table-column prop="type" label="参数类型">
                    </el-table-column>
                </el-table>
            </app-section>
        </div>
    </div>
</template>

<script>
export default {
    name: 'comPermission',
    data() {
        return {
            tableData: [
                {
                    name: 'v-hasPermission',
                    detail: '根据传入值鉴别权限，并返回鉴别结果',
                    type: 'String'
                }
            ]
        }
    }
}
</script>