<template>
    <div>
        500:系统出现未知错误
        <a @click="back">返回首页</a>
    </div>
</template>

<script>
export default {
    methods: {
        back(){
            this.$router.replace('home')
        }
    }
}
</script>