<template>
    <div>
        <template v-for="(item, n) in routes">
            <!-- 循环创建子菜单 -->
            <template v-if="item.child && item.child.length">
                <el-submenu :index="navIndex ? navIndex : String(n)"> 
                    <!-- 创建父级菜单 -->
                    <template slot="title"><i v-if="item.icon" class="item.icon"></i>{{ item.name }}</template>

                    <!-- 创建子菜单 -->
                    <template v-for="(subItem,i) in item.child">
                        <!-- 如果该子节点仍旧拥有子节点则递归创建 -->
                        <nav-item v-if="subItem.child && subItem.child.length" :navIndex="n+'-'+i" :routes="[subItem]" ></nav-item>

                        <router-link v-else :to="subItem.path">
                            <!-- <el-menu-item :index="navIndex ? navIndex+'-'+i : n+'-'+i"> -->
                            <el-menu-item :index="subItem.path ? subItem.path : ''"><i v-if="item.icon" class="item.icon"></i>{{ subItem.name }}</el-menu-item>
                        </router-link>
                    </template>
                </el-submenu>
            </template>

            <template v-else>
                <router-link :to="item.path">
                    <el-menu-item :index="item.path"><i v-if="item.icon" class="item.icon"></i>{{ item.name }}</el-menu-item>
                </router-link>
            </template>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'navItem',
        props: ['routes','navIndex']
    }
</script>
