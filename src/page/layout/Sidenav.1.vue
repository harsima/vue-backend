
<template>
    <div class="side-nav" :class="layout">
        <el-menu ref="navbar" :default-active="onRoutes" :mode="navMode" menu-trigger="click" theme="dark" @select="selectMenu" @open="openMenu" @close="closeMenu" unique-opened>
            <nav-item :routes="navList" navIndex=""></nav-item>
        </el-menu>
        <div v-if="this.navMode == 'horizontal'" v-show="navBgShow" class="full-screen-navBg" @click.self="closeAll"></div>
    </div>
</template>

<script>
/* eslint-disable */
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
            openMenu.forEach((ele) => {
                this.$refs.navbar.closeMenu(ele)
            })
            if(this.navMode == 'horizontal'){
                this.navBgShow = false
            }
        },
        openMenu(index, indexPath){
            if(this.navMode == 'horizontal'){
                this.navBgShow = true
            }
        },
        closeMenu(index, indexPath){
            if(this.navMode == 'horizontal'){
                this.navBgShow = false
            }
        },
        closeAll(){
            console.log("背景遮罩图")
            let openMenu = this.$refs.navbar.openedMenus.concat([])
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

<style lang="scss">
    @import '~sysStatic/css/theme/theme.scss';
    
    .side-nav {
        .el-menu{
            z-index: 10;
        }
        .full-screen-navBg{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            z-index: 5;
        }
        .el-submenu .el-menu-item{
            min-width: 0;
        }
        &.left{
            position: absolute;
            top: $headerHeight;
            bottom: 0;
            left: 0px;
            width: $leftNavWidth;
            background: $sidenavBgColor;
            overflow: auto;
        }
        &.top{
            float: left;
            margin-left: 20px;
            & > .el-menu{
                background-color: transparent;
                & > div > a >.el-menu-item.is-active{
                    border-bottom-color: #20a0ff;
                }
                & > div > .el-submenu > .el-menu{
                    background-color: #324157;
                    // 三级菜单及以后
                    .el-menu{
                        top: -5px;
                        left: 100%;
                        border: none;
                        // background-color: #324157;
                        box-shadow: none;
                        z-index: auto;
                        .el-menu-item:hover{
                            background-color:#223142;
                            color: #fff;
                        }
                    }
                    .el-menu-item{
                        height: 60px;
                        line-height: 60px;
                        background: none;
                        color: #bfcbd9;
                        padding: 0 20px;
                        &:hover{
                            background-color: #1f2d3d;
                        }
                    }
                    .el-submenu__title:hover{
                        background-color:#1f2d3d;
                    }
                    .el-submenu{
                        width: 100%;
                        &.is-active>.el-submenu__title{
                            border-bottom-color: transparent;
                        }
                        &.is-opened>.el-submenu__title{
                            background-color: #1f2d3d;
                            .el-submenu__icon-arrow{
                                transform: rotateZ(-90deg);
                            }
                        }
                        &.is-opened>.el-menu{
                            background-color: #1f2d3d;
                        }
                    }
                }
                & > div > .el-submenu.is-active > .el-menu .el-submenu__title{
                    border-bottom-color: transparent;
                }
            }
        }
        
    }
</style>
