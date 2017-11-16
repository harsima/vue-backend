<template>
    <div class="wrapper">
        <template v-if="layout =='left'">
            <v-header v-once>
                <p slot="logo">VueJS模板系统</p>
            </v-header>
            <v-sidenav :layout="layout"></v-sidenav>
        </template>
        <template v-if="layout == 'top'">
            <v-header>
                <p slot="logo">VueJS模板系统</p>
                <template slot="topnav">
                    <v-sidenav :layout="layout"></v-sidenav>
                </template>
            </v-header>
        </template>
        <div class="main-content" :class="layout">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import vHeader from './Header.vue'
    import vSidenav from './Sidenav.vue'
    
    export default {
        data(){
            return {
            }
        },
        computed: {
            layout(){
                return this.$store.state.navbarPosition
            }
        },
        components:{
            vHeader,
            vSidenav
        }
    }
</script>

<style lang="scss">
    @import '~sysStatic/css/theme/theme.scss';
    .main-content{
        position: absolute;
        top: $headerHeight;
        right: 0;
        bottom: 0;
        overflow-x: hidden;
        overflow-y: auto;
        &.left{
            left: $leftNavWidth;
        }
        &.top{
            left: 0
        }
    }
    .page{
        width: 100%;
        height: 100%;
        padding: 10px;
        background: $mainContentBgColor
    }
</style>
