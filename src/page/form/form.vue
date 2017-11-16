<script>
    export default{
        created(){
            console.log('123')
        },
        render() {
            console.log('111')
            // return createElement(
            // 'h' + this.level,   // tag name 标签名称
            // this.$slots.default // 子组件中的阵列
            // )
        }
    }
</script>
