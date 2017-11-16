<!-- 每个页面的标题，用来重复确认当前所处页面，亦可用作面包屑导航的外层结构。 -->
<template>
    <div class="page-title">
        <strong>{{title}}</strong>
    </div>
</template>

<script>
    export default {
        name: 'vPageTitle',
        props: ['title']
    }
</script>

<style lang="scss" scoped>
    @import '~sysStatic/css/theme/theme.scss';
    .page-title{
        height: 46px;
        margin-bottom: $commomSpace;
        border-bottom: 1px solid $borderColor;
        & > strong{
            line-height: 46px;
            font-size: 18px;
            font-weight: bold;
            color: $systemFontColor
        }
    }
</style>