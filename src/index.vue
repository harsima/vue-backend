<template>
    <div id="app" class="sys-app">
        <router-view></router-view>
    </div>
</template>

<script>
// import changeTheme from "@/util/changeTheme"

export default {
    // 初次加载时，可通过接口获取用户的主题信息，或者通过按钮触发，或者直接加载默认主题
    // mounted() {
    //     this.$nextTick(() => {
    //         changeTheme("theme-default")
    //         this.$store.commit("setThemeColor", "default")
    //     })
    // }
}
</script>
