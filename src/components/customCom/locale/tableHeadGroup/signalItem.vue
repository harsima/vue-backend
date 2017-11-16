<template>
    <div class="item">
        <!-- 如果leaf字段为0，则代表这是分组信息非叶子节点 -->
        <div class="title" v-if="itemGroup.name && !itemGroup.leaf">
            <el-checkbox :indeterminate="isIndeterminate" v-model="isCheckAll" @change="checkAll" :label="itemGroup.key">{{itemGroup.name}}</el-checkbox>
        </div>
        <!-- 如果该组信号有子信号 -->
        <div class="checkboxList" v-if="itemGroup.child && itemGroup.child.length">
            <el-checkbox-group v-model="signalCheckedList" >
                <ul>
                    <!-- 循环创建每个信号 -->
                    <li v-for="signal in itemGroup.child" v-if="signal.name && signal.leaf">
                        <el-checkbox :label="signal.key" >{{signal.name}}</el-checkbox>
                    </li>
                </ul>
            </el-checkbox-group> 
        </div>
        <template v-for="signal in itemGroup.child" v-if="signal.name && !signal.leaf">
            <signal-item :itemGroup="signal" :signalList.sync="signalCheckedList"></signal-item>
        </template>
        
    </div>
</template>

<script>
    import lodash from 'lodash'
    export default {
        name: 'signalItem',
        props: ['itemGroup', 'signalList'],
        data(){
            return {
                isCheckAll: false,
                isIndeterminate: false,
                signalCheckedList: this.signalList,
                group: {
                    child: []
                }
            }
        },
        methods: {
            // 根据当前选择信号对父级进行全选或半全选判断
            checkParent(){
                // data 整个页面当前被选中的信号
                // 判断event中的数值是否全部存在于当前分组的全部子信号（group.child）
                let selectCont = 0,
                    selectList = this.signalCheckedList,
                    child = this.group.child

                selectList.forEach((ele) => {
                    if(child.indexOf(ele) >= 0){
                        selectCont++
                    }
                })
                this.isCheckAll = selectCont === child.length
                this.isIndeterminate = selectCont > 0 && selectCont < child.length
            },
            checkAll(){
                // 当前是全选状态，则选择其下所有的信号
                if (this.isCheckAll === true) {
                    this.signalCheckedList = lodash.union(this.signalCheckedList, this.group.child)
                } else{
                    this.signalCheckedList = lodash.difference(this.signalCheckedList, this.group.child)
                }
                this.isIndeterminate = false
            }
        },
        mounted(){
            // 创建该组所有子信号（包括其子分组）
            let getSignal = (arr) =>{
                arr.forEach((ele) =>{
                    if(ele.child && ele.child.length){
                        getSignal(ele.child)
                    }
                    if(ele.leaf){
                        this.group.child.push(ele.key)
                    }
                })
            }
            getSignal(this.itemGroup.child)
            this.checkParent()
        },
        watch: {
            // props传入值(signalList)更新
            signalList(val){
                this.signalCheckedList = val
            },
            // signalCheckedList改变时同时改变外部signalList值
            signalCheckedList(val){
                this.checkParent()
                this.$emit("update:signalList",val)
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    .item{
        margin-top: 10px;
        .item{
            padding-left: 16px;
        }
        > .title{
            padding: 5px 0 5px 10px;
            border-bottom: 0px solid #626262;
            background-color: #EEEEEE;
            color: #444444;
            font-weight: bold;
        }
        .checkboxList {
            ul{
                margin: 10px 0px 0px 25px;
                overflow: hidden;
                li{
                    display: inline-block;
                    width: 25%;
                    line-height: 25px;
                    margin: 0 0 5px 0;
                    .el-checkbox__label{
                        vertical-align: middle;
                    }
                }
            }
        }
    }
</style>
