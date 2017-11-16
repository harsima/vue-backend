<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<style lang="scss">
    @import '~sysStatic/css/reset.scss';
    #app{
        position: relative;
        width: 100%;
        height: 100%;
    }

    .article{
        font-size: $systemFontSize;
        line-height: 24px;
        margin-bottom: 20px;
        padding: 0 16px;
        h2{
            font-size: 15px;
        }
        & > div{
            margin-bottom: 5px;
        }
        a{
            color: #42b983;
            &:hover{
                text-decoration: underline;
            }
        }
        p{
            margin-bottom: 5px;
        }
        pre{
            display: inline;
            padding: 0 6px;
            margin: 0 6px;
            font-family: Consolas;
            background: #ececec;
        }
        strong{
            font-weight: bold;
        }
        ol{
            padding-left: 20px;
            list-style-type: decimal;
            list-style-position: inside;
        }
        .notice{
            padding: 6px;
            margin-bottom: 5px;
            background: #ececec;
        }
    }
    pre{
        padding: 0 20px;
        background: #ececec;
        code{
            font-family: Consolas;
        }
    }
    .editPawDialog{
        width: 400px;
    }
</style>
