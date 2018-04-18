<template>
    <div class="tag-nav">
        <scroll-bar ref="scrollBar">
            <router-link ref="tag" class="tag-nav-item" :class="isActive(item) ? 'cur' : ''" v-for="(item, index) in tagNavList" 
            :to="item.path" :key="index">
                {{getTagName(item.path)}}
                <span class='el-icon-close' @click.prevent.stop="closeTheTag(item, index)"></span>
            </router-link>
        </scroll-bar>
    </div>
</template>

<script>
import ScrollBar from 'sysComponents/ScrollBar'

export default {
    data(){
        return {
            defaultPage: '/home'
        }
    },
    computed: {
        tagNavList(){
            return this.$store.state.tagNav.cachedPageList
        }
    },
    mounted(){
        // 首次加载时将默认页面加入缓存
        this.addTagNav()
    },
    watch: {
        $route(){
            this.addTagNav()
            this.scrollToCurTag()
        }
    },
    methods: {
        addTagNav(){
            // 如果需要缓存则必须使用组件自身的name，而不是router的name
            this.$store.commit("tagNav/addTagNav", {
                name: this.$router.getMatchedComponents()[1].name,
                path: this.$route.path
            })
        },
        isActive(item){
            return item.path === this.$route.path
        },
        closeTheTag(item, index){
            // 当关闭当前页面的Tag时，则自动加载前一个Tag所属的页面
            // 如果没有前一个Tag，则加载默认页面
            this.$store.commit("tagNav/removeTagNav", item)
            if(this.$route.path == item.path){
                if(index){
                    this.$router.push(this.tagNavList[index-1].path)
                } else {
                    this.$router.push(this.defaultPage)
                    if(this.$route.path == "/home"){
                        this.addTagNav()
                    }
                }
            } 
        },
        getTagName(path){
            var res;
            function loopGetName(list){
                for( var v of list ){
                    if(v.path === path) {
                        res = v.name
                        return
                    } else if(v.child){
                        loopGetName(v.child)
                    }
                    
                }
            }
            loopGetName(this.$store.state.auth.permissionList)
            return res
        },
        scrollToCurTag(){
            this.$nextTick(() =>{
                for (let item of this.$refs.tag) {
                    if (item.to === this.$route.path) {
                        this.$refs.scrollBar.scrollToCurTag(item.$el)
                        break
                    }
                }
            })
        }
    },
    components: {ScrollBar}
}
</script>

<style lang="scss" scoped>
.tag-nav{
    position: absolute;
    top: 0;
    width: 100%;
    height: 51px;
    padding: 10px;
    background: #eee;
    border-bottom: 1px solid #ccc;
}
.tag-nav-item{
    display: inline-block;
    position: relative;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    margin-right: 10px;
    border: 1px solid #ccc;
    background: #fff;
    text-decoration: none;
    span{
        width: 14px;
        height: 14px;
        border-radius: 50%;
        text-align: center;
        transition: all .3s ease;
        transform-origin: 100% 50%;
        &:before {
            transform: scale(.4);
            display: inline-block;
        }
        &:hover {
            background-color: #b4bccc;
            color: #fff;
        }
    }
    &.cur{
        background: #42b983;
        border: none;
        color: #fff;
    }
}
</style>

