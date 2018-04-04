<template>
    <div class="sys-full-page">
        这里是授权页面
        <a href="javascript:void(0)" @click="auth">点我进行授权</a>
    </div>
</template>

<script>
export default {
    methods: {
        auth(){
            this.$store.dispatch("user/getNewToken").then(() => {
                console.log("已在授权页面获得授权")
                this.$router.go(-1)
            })
        }
    }
}
</script>