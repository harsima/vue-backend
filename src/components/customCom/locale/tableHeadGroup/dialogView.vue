<template>
    <el-dialog :title="title" :visible.sync="dialogShow" @close="dialogClose">
        <head-group :listData="dialogData" :showIndex.sync="showIndex" :checkedList="selected"></head-group>
        <div slot="footer">
            <el-checkbox :indeterminate="isIndeterminate" v-model="isCheckAll" @change="selectAll">全选</el-checkbox>
            <el-button type="primary" @click="filterSave">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import headGroup from "./headGroup"

function getSignal(arr) {
    var res = [];
    function loop(data) {
        data.forEach(ele => {
            if (ele.child && ele.child.length) {
                loop(ele.child);
            }
            if (ele.leaf) {
                res.push(ele.key);
            }
        });
    }
    loop(arr);
    return res;
}

export default {
    data() {
        return {
            dialogShow: this.show,
            showIndex: 0,
            isCheckAll: false,
            isIndeterminate: false,
            selected: [],
            defSelected: [],
            pageSignal: [],
            pageSelected: []
        };
    },
    props: ["title", "show", "defaultChecked", "dialogData"],
    watch: {
        // 初始化默认选择列表
        // 根据每个标签页面不同，初始化对应的被选信息
        defaultChecked(val) {
            debugger
            console.log("值变了:" + val)
            this.selected = []
            this.defSelected = val
            let cont = this.dialogData.child.length
            for (let i = 0; i < cont; i++) {
                // 建立信号选择列表
                this.selected.push(val)
            }
        },
        // 标签页切换时执行
        showIndex() {
            this.watchAll()
        },
        // 被选中信号改变时执行
        selected() {
            this.watchAll()
        },
        // props传入值(show)更新。组件显示时改变
        show(val) {
            this.dialogShow = val
        },
        // dialogShow改变时通知改变父组件show值
        dialogShow(val) {
            this.$emit("update:show", val)
        }
    },
    methods: {
        // 检查全选按钮状态
        watchAll() {
            // 获取当前标签页中的所有checkbox的value
            this.pageSignal = getSignal(this.dialogData.child[this.showIndex].child)
            // 获取当前标签页中被选中的checkbox
            this.pageSelected = this.selected[this.showIndex]

            // 被选择信号与当页信号数量相等
            if (this.pageSelected.length >= this.pageSignal.length) {
                this.isCheckAll = true
                this.isIndeterminate = false
            } else {
                this.isCheckAll = false
                // 如果当前页面被选中的信号大于1个并小于总数，则全选框为半全选状态
                this.isIndeterminate =
                    this.pageSelected.length > 0 &&
                    this.pageSelected.length < this.pageSignal.length
            }
        },
        // 点击全选按钮时进行的操作
        selectAll(event) {
            // 如果当前为全选状态
            if (event.target.checked) {
                this.$set(this.selected, this.showIndex, this.pageSignal)
            } else {
                // 如果当前为未选中状态则
                this.$set(this.selected, this.showIndex, [])
            }
            this.isIndeterminate = false
        },
        filterSave() {
            // 提交当前已选择的列表
            this.$emit("update:defaultChecked", this.selected[this.showIndex])
            this.dialogShow = false
            this.$emit("confirm")
            console.log("提交")
        },
        dialogClose() {
            console.log("关闭");
            this.$set(this.selected, this.showIndex, this.defSelected)
            this.showIndex = 0
            this.isCheckAll = false
            this.isIndeterminate = false
        }
    },
    components: { headGroup }
}
</script>


