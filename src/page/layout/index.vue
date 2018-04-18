<template>
    <div class="wrapper">
        <template v-if="layout =='left'">
            <header-bar v-once>
                <p slot="logo">VueJS模板系统</p>
            </header-bar>
            <nav-bar :navList="navList" :layout="layout"></nav-bar>
        </template>
        <template v-if="layout == 'top'">
            <header-bar>
                <p slot="logo">VueJS模板系统</p>
                <template slot="topnav">
                    <nav-bar :layout="layout"></nav-bar>
                </template>
            </header-bar>
        </template>
        <div class="sys-content" :class="layout">
            <tag-nav></tag-nav>
            <keep-alive :include="tagNavList">
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import store from '@/store'
import router from '@/router'
import HeaderBar from './HeaderBar'
import NavBar from './NavBar'
import TagNav from './TagNav'

function initRoute(next){
    return new Promise((resolve) => {
        if(store.state.auth.permissionList.length == 0){
            console.log("没有权限数据，正在获取")
            // 没有权限时则先获取用户的菜单数据
            store.dispatch('auth/getNavList').then((res) => {
                console.log("获取菜单数据")
                next((vm) => {
                    console.log("next调用" + res)
                    vm.navList = res
                })
                return res
            }).then((res) => {
                // 对菜单数据进行扁平化处理，生成权限列表
                store.dispatch('auth/getPermissionList', res).then((res) => {
                    console.log("获取权限列表")
                    res.forEach(function(v){
                        let routeItem = router.match(v.path)
                        if(routeItem){
                            routeItem.meta.permission = v.permission ? [].concat(v.permission) : []
                            routeItem.meta.name = v.name
                        }
                    })
                    resolve()
                })
            })
        } else {
            console.log("已有权限数据")
            resolve()
        }
    })
}

export default {
    data(){
        return {
            navList: []
        }
    },
    computed: {
        layout(){
            return this.$store.state.navbarPosition
        },
        tagNavList(){
            return this.$store.state.tagNav.cachedPageName
        }
    },
    beforeRouteEnter(to, from, next){
        initRoute(next).then(() => {
            let isPermission = false
            // console.log("进入权限判断")
            store.state.auth.permissionList.forEach((v) => {
                // 判断跳转的页面是否在权限列表中
                if(v.path == to.fullPath){
                    isPermission = true
                }
            })
            // 没有权限时跳转到401页面
            if(!isPermission){
                router.replace("error/401")
            } else {
                next()
            }
        })
    },
    components:{
        HeaderBar,
        NavBar,
        TagNav
    }
}
</script>