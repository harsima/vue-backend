<template>
    <div>
        401:没有操作权限
        <a @click="back">返回上一页</a>
    </div>
</template>

<script>
export default {
    methods: {
        back(){
            this.$router.go(-1)
        }
    }
}
</script>