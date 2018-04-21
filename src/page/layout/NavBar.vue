<template>
    <div class="side-nav" :class="layout">
        <el-menu router ref="navbar" :default-active="defActive" :mode="navMode" menu-trigger="click" :theme="isDark" @select="selectMenu" @open="openMenu" @close="closeMenu" unique-opened>
            <nav-bar-item v-for="(item, n) in navList" :item="item" :navIndex="String(n)" :key="n"></nav-bar-item>
        </el-menu>
        <div v-if="this.navMode == 'horizontal'" v-show="navBgShow" class="full-screen-navBg" @click.self="selectMenu"></div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import NavBarItem from './NavBarItem'

export default {
    data() {
        return {
            navBgShow: false
        }
    },
    props: ['layout'],
    computed:{
        ...mapState({
            navList: state => state.auth.navList
        }),
        defActive(){
            return this.$route.path
        },
        navMode(){
            if(this.layout == "left"){
                return "vertical"
            }
            if(this.layout == "top"){
                return "horizontal"
            }
        },
        isDark(){
            return this.$store.state.theme.indexOf("dark") >= 0 ? 'dark' : 'light'
        }
    },
    watch: {
        // 当通过TagNav来激活页面时也执行一次selectMenu
        $route(){
            this.selectMenu()
        }
    },
    methods: {
        // eslint-disable-next-line
        selectMenu(){            
            let openMenu = this.$refs.navbar.openedMenus.concat([])
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
        }
    },
    components: { NavBarItem }
}
</script>