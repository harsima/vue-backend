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
        <div class="sys-content" :class="layout">
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

