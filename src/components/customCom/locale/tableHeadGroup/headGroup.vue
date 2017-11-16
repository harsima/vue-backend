<template>
    <div class="groupList">
        <!-- 创建分组标签页 -->
        <div v-if="tabRender" class="tab-list">
            <ul>
                <li v-for="(group, index) in listData.child" v-if="group.name" :key="'tab'+index" data-value="group.key" :class="showIndex === index ? 'cur': ''" @click="change(index)">{{group.name}}</li>
            </ul>
        </div>
        <div class="tab-content">
             <template v-for="(group, index) in listData.child">
                <!-- 创建每个分组的信号列表信息 -->
                <div v-show="index === showIndex" :key="group.name">
                    <template v-for="item in group.child">
                        <signal-item :itemGroup="item" :key="item.key" :signalList.sync="signalCheckedList[index]"></signal-item>
                    </template>
                </div>
            </template> 
        </div>
    </div>
</template>

<script>
import signalItem from './signalItem'
export default {
    data(){
        return {
            checked: []
            // signalCheckedList: this.checkedList
        }
    },
    props: ['listData', 'checkedList', 'showIndex'],
    computed: {
        signalCheckedList(){
            return this.checkedList
        }
    },
    components: {signalItem},
    methods: {
        tabRender() {
            let num=0
            this.listData.child.forEach((el) => {
                if(!el.name) num++
            })
            if(num == this.listData.child.length) return false
            return true
        },
        change(index){
            this.$emit("update:showIndex", index)
        }
    },
    watch:{
        // props传入值(checkedList)更新
        // checkedList(val){
        //     if(val.length){
        //         this.signalCheckedList = val
        //     }
        // },
        // signalCheckedList改变时同时改变外部checkedList值
        // signalCheckedList(val){
        //     this.$emit('update:checkedList', val)
        // }
    }
}
</script>

<style lang="scss" scoped>
    .groupList{
        > .tab-list{
            background: #fff;
            ul{
                margin: 15px 0 0;
                overflow: hidden;
            }
            li{
                display: block;
                float: left;
                width: auto !important;
                min-width: 120px !important;
                height: 30px;
                line-height: 28px;
                margin:0 10px 10px 0;
                padding: 0 10px;
                border: 1px solid #bbb;
                background: #fff;
                text-align: center;
                cursor: pointer;
                box-sizing: border-box;
                &:hover, &.cur{
                    background: #eee;
                }
            }
        }
    }
</style>
