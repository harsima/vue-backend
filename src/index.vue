<template>
    <div id="app" class="sys-app">
        <router-view></router-view>
    </div>
</template>

<script>
import setTheme from "@/util/setTheme"
import Cookie from 'js-cookie'

export default {
    // 加载默认语言包
    created(){
        let defLang = Cookie.get('lang') || this.$i18n.locale
        this.$store.dispatch("loadLang", defLang)
    },
    // 初次加载时，可通过接口获取用户的主题信息，或者通过按钮触发，或者直接加载默认主题
    mounted() {
        this.$nextTick(() => {
            setTheme("theme-default")
            this.$store.commit("setThemeColor", "default")
        })
    }
}
</script>
