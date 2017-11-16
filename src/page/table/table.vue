<template>
    <div class="page">
        <v-pageTitle title="基本表格示例"></v-pageTitle>
        <v-pageNotes>
            表格详细配置请查看 <a href="http://element.eleme.io/#/zh-CN/component/table">ElementUI-table</a>，
            分页请查看 <a href="http://element.eleme.io/#/zh-CN/component/pagination">ElementUI-pagination</a>
        </v-pageNotes>
        <div class="page-content">
            <v-pageSection toolbar title="全局统一分页模式的表格">
                <v-pageToolbar>
                    <el-button icon="plus">新增</el-button>
                    <el-button icon="edit">编辑</el-button>
                    <el-button icon="delete">删除</el-button>
                </v-pageToolbar>
                <v-pageSearch>
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="审批人">
                            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                        </el-form-item>
                        <el-form-item label="活动区域">
                            <el-select v-model="formInline.region" placeholder="活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary">查询</el-button>
                        </el-form-item>
                    </el-form>
                </v-pageSearch>
                <v-pageTable pagination :sizeChange="sizeChange" :pageChange="pageChange" :paginationTotal="50" pageLayout="total, sizes" >
                    <el-table :data="tableData" border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
                        <el-table-column type="selection" width="55" align="center" ></el-table-column>
                        <el-table-column type="index" label="序号" width="64" align="center" ></el-table-column>
                        <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
                        <el-table-column prop="name" label="姓名" sortable width="180"></el-table-column>
                        <el-table-column prop="address" label="地址"></el-table-column>
                    </el-table>
                </v-pageTable>
            </v-pageSection>

            <v-pageSection toolbar title="单独分页模式的表格">
                <v-pageToolbar>
                    <el-button icon="plus">新增</el-button>
                    <el-button icon="edit">编辑</el-button>
                    <el-button icon="delete">删除</el-button>
                </v-pageToolbar>
                <v-pageTable>
                    <el-table :data="tableData" border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
                        <el-table-column type="selection" width="55" align="center" ></el-table-column>
                        <el-table-column type="index" label="序号" width="64" align="center" ></el-table-column>
                        <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
                        <el-table-column prop="name" label="姓名" sortable width="180"></el-table-column>
                        <el-table-column prop="address" label="地址"></el-table-column>
                    </el-table>
                    <el-pagination 
                        slot="pagination"
                        layout="total, sizes, prev, pager, next, jumper" 
                        :total="50"
                        @size-change="sizeChange"
                        @current-change="pageChange"
                    >
                    </el-pagination>
                </v-pageTable>
            </v-pageSection>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, 
                    {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    }, 
                    {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    }, 
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    }
                ],
                formInline: {
                    user: '',
                    region: ''
                }
            }
        },
        methods: {
            sizeChange(size){
                console.log('每页显示条数变更为:'+ size)
            },
            pageChange(curPage){
                console.log('跳转到页面:' + curPage)
            }
        }
    }
</script>