<template>
    <div class="toolbar" :class="align">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'vPageToolbar',
        props: {
            align: {
                type: String,
                default: function(){
                    return 'right'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~sysStatic/css/theme/theme.scss';
    .toolbar{
        margin-bottom: $commomSpace;
        &.right{
            text-align: right;
        }
        &.left{
            text-align: left;
        }
    }
</style>