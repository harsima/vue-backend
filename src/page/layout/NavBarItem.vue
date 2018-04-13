<template>
    <el-submenu v-if="item.child && item.child.length" :index="navIndex"> 
        <!-- 创建父级菜单 -->
        <template slot="title"><i v-if="item.icon" class="item.icon"></i>{{ item.name }}</template>
        <!-- 创建子菜单 -->
        <nav-bar-item v-for="(subItem,i) in item.child" :key="navIndex+'-'+i" :navIndex="navIndex+'-'+i" :item="subItem" ></nav-bar-item>
    </el-submenu>

    <el-menu-item v-else :index="item.path" :route="{path: item.path}"><i v-if="item.icon" class="item.icon"></i>{{ item.name }}</el-menu-item>
</template>

<script>
export default {
    name: 'NavBarItem',
    props: ['item','navIndex']
}
</script>