<template>
    <div class="page-search">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'vPageSearch'
    }
</script>

<style lang="scss" scoped>
    @import '~sysStatic/css/theme/theme.scss';
    .page-search{
        display: block;
        width: 100%;
        padding: 20px 20px 0;
        background: $commonBgColor;
        margin-bottom: $commomSpace;
    }
</style>