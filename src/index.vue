<template>
    <div id="app" class="sys-app">
        <router-view></router-view>
    </div>
</template>

<script>
import setTheme from "@/util/setTheme"
import Cookie from 'js-cookie'

export default {
    // TODO: 全局状态加载及变更。请根据实际情况改写
    beforeMount(){
        // 首次加载/刷新时判断当前是否在登录状态
        if (Cookie.get('isLogin')) {
            console.log("重新登录")
            this.$store.dispatch('auth/relogin')
        }
        // 加载默认语言包
        let defLang = Cookie.get('lang') || this.$i18n.locale
        this.$store.dispatch("loadLang", defLang)
    },
    // 初次加载时，可通过接口获取用户的主题信息，或者通过按钮触发，或者直接加载默认主题
    mounted() {
        this.$nextTick(() => {
            setTheme("theme-default")
            this.$store.commit("setThemeColor", "theme-default")
        })
    }
}
</script>