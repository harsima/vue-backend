<template>
    <div class="sys-table">
        <slot></slot>
        <div class="sys-table-pagination">
            <template v-if="pagination">
                <el-pagination 
                    :layout="pageLayout"
                    :total="paginationTotal"
                    :page-size="pageSize"
                    @size-change="sizeChange"
                    @current-change="pageChange"
                    :class="align"
                   >
                </el-pagination>
            </template>
            <template v-else>
                <slot name="pagination"></slot>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TableMixin',
    props: {
        pagination: Boolean,
        paginationAlign: String,
        pageSize:  {
            type: Number,
            default: function () {
                return 10
            }
        },
        paginationTotal: {
            type: Number,
            default: function () {
                return 10
            }
        },
        sizeChange: {
            type: Function,
            default: function(){
                return null
            }
        },
        pageChange: {
            type: Function,
            default: function(){
                return null
            }
        },
        pageLayout: {
            default: function (){
                return 'total, sizes, prev, pager, next, jumper'
            }
        }
    },
    computed: {
        align(){
            let res;
            switch(this.paginationAlign){
                case 'right': 
                    res = 'textR'
                    break
                case 'center': 
                    res = 'textC'
                    break
                default:
                    res = ''
            }
            return res
        }
    }
}
</script>