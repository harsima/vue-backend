<template>
    <div class="page-section">
        <div class="title">
            <strong>{{title}}</strong>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'vPageSection',
        props: ['title']
    }
</script>

<style lang="scss" scoped>
    @import '~sysStatic/css/theme/theme.scss';
    .page-section{
        display: block;
        width: 100%;
        margin-bottom: $commomSpace*2;
        & > .title{
            height: 50px;
            margin-bottom: $commomSpace;
            border-bottom: 1px solid $borderColor;
            &::after{
                content: "";
                display: block;
                height: 0;
                clear: both;
            }
            & > strong{
                font-weight: normal;
                font-size: 18px;
                line-height: 50px;
                color: $systemFontColor
            }
            &  > .toolbar{
                float: right;
            }
        }
    }
</style>