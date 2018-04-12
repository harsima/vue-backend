<template>
    <el-submenu v-if="item.child && item.child.length" :index="navIndex"> 
        <!-- 创建父级菜单 -->
        <template slot="title"><i v-if="item.icon" class="item.icon"></i>{{ item.name }}</template>
        <!-- 创建子菜单 -->
        <nav-bar-item v-for="(subItem,i) in item.child" :key="navIndex+'-'+i" :navIndex="navIndex+'-'+i" :item="subItem" ></nav-bar-item>
    </el-submenu>

    <el-menu-item v-else :index="item.path" :route="{path: item.path}" @click="addTagNav(item.path)"><i v-if="item.icon" class="item.icon"></i>{{ item.name }}</el-menu-item>
</template>

<script>
export default {
    name: 'NavBarItem',
    props: ['item','navIndex'],
    methods: {
        addTagNav(path){
            let route = this.$router.match(path)
            if(route.name){
                this.$store.commit("tagNav/addTagNav", route.name)
            } else{
                console.error("路由对象缺少必要的name字段，无法对页面进行缓存，请检查路由配置")
            }
        }
    }
}
</script>