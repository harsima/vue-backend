<template>
    <div class="wrapper">
        <template v-if="layout =='left'">
            <header-bar v-once>
                <p slot="logo">VueJS模板系统</p>
            </header-bar>
            <nav-bar :layout="layout"></nav-bar>
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
            <keep-alive :include="tagNavList">
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import HeaderBar from './HeaderBar'
import NavBar from './NavBar'

export default {
    data(){
        return {
        }
    },
    computed: {
        layout(){
            return this.$store.state.navbarPosition
        },
        tagNavList(){
            return this.$store.state.tagNav.tagNavList.join(",")
        }
    },
    mounted(){
        this.$store.commit("tagNav/addTagNav", this.$route.name)
    },
    components:{
        HeaderBar,
        NavBar
    }
}
</script>