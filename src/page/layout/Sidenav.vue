<template>
    <div class="side-nav" :class="layout">
        <el-menu router ref="navbar" :default-active="onRoutes" :mode="navMode" menu-trigger="click" theme="dark" @select="selectMenu" @open="openMenu" @close="closeMenu" unique-opened>
            <nav-item v-for="(item, n) in navList" :item="item" :navIndex="String(n)" :key="n"></nav-item>
        </el-menu>
        <div v-if="this.navMode == 'horizontal'" v-show="navBgShow" class="full-screen-navBg" @click.self="closeAll"></div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import navItem from './navItem'

export default {
    data() {
        return {
            navBgShow: false
        }
    },
    props: ['layout'],
    computed:{
        ...mapState({
            navList: state => state.permission.list
        }),
        onRoutes(){
            return this.$route.path
        },
        navMode(){
            if(this.layout == "left"){
                return "vertical"
            }
            if(this.layout == "top"){
                return "horizontal"
            }
        }
    },
    methods: {
        // eslint-disable-next-line
        selectMenu(index, indexPath){
            /**
             * 在选择父级菜单时自动关闭其下所有子菜单
             * 选择时获取点击菜单的父级index，并计算得到该index在已打开菜单中的索引值，
             * 关闭位于当前打开菜单中该索引值之后的全部菜单
             */
            // 获取当前打开的所有菜单
            let openMenu = this.$refs.navbar.openedMenus.concat([])
            // 获取点击菜单的父级index，如果当前点击的是根节点，则直接关闭所有打开菜单
            let nowMenuPath = indexPath.length > 1 ? indexPath[indexPath.length-2] : ""
            if(nowMenuPath){
                // 获取父级index在数组中索引，关闭其后所有的菜单
                let menuIndex = openMenu.indexOf(nowMenuPath)
                openMenu = openMenu.slice(menuIndex+1)
            } 
            // 关闭菜单
            openMenu = openMenu.reverse()
            openMenu.forEach((ele) => {
                this.$refs.navbar.closeMenu(ele)
            })
            if(this.navMode == 'horizontal'){
                this.navBgShow = false
            }
        },
        openMenu(){
            if(this.navMode == 'horizontal'){
                this.navBgShow = true
            }
        },
        closeMenu(){
            if(this.navMode == 'horizontal'){
                this.navBgShow = false
            }
        },
        closeAll(){
            console.log("背景遮罩图")
            let openMenu = this.$refs.navbar.openedMenus.concat([])
            openMenu = openMenu.reverse()
            openMenu.forEach((ele) => {
                this.$refs.navbar.closeMenu(ele)
            })
            if(this.navMode == 'horizontal'){
                this.navBgShow = false
            }
        }
    },
    components: { navItem }
}
</script>