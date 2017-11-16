<!-- 引用或解释说明组件 -->
<template>
    <div class="page-notes">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'vPageNotes'
    }
</script>

<style lang="scss" scoped>
    @import '~sysStatic/css/theme/theme.scss';
    .page-notes{
        display: block;
        padding: 15px 10px 15px 14px;
        margin-bottom: $commomSpace;
        border-left: 4px solid $tipsBorderColor;
        background: $tipsBgColor;
        line-height: 22px;
    }
</style>