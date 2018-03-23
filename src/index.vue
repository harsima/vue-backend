<template>
    <div id="app" class="sys-app">
        <router-view></router-view>
    </div>
</template>

<script>
import changeTheme from "@/util/changeTheme"

export default {
    mounted() {
        this.$nextTick(() => {
            changeTheme("theme-default")
            this.$store.commit("setThemeColor", "default")
        })
    }
}
</script>
