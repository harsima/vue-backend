<template>
    <div class="sys-page">
        <v-pageTitle title="主题变更"></v-pageTitle>
        <div class="page-content">
            <v-pageSection title="切换布局">
                <div class="layout-list">
                    <ul>
                        <li :class="layout == 'top' ? 'cur' : ''" @click="changeTheme('top')">
                            <img src="~sysStatic/images/layout-top.png" alt="">
                            <p>上下布局</p>
                        </li>
                        <li :class="layout == 'left' ? 'cur' : ''" @click="changeTheme('left')">
                            <img src="~sysStatic/images/layout-left.png" alt="">
                            <p>左右布局</p>
                        </li>
                    </ul>
                </div>
            </v-pageSection>
            <v-pageSection title="切换主题颜色">
                <v-pageNotes><p>本项目使用sass编写，所以变更主题方式相对简单。不过由于切换主题功能原理的限制，该功能当前仅能用于生产环境，开发环境时需要进行手动修改引入的主题文件。主题切换详细实现原理请查看：<a href="http://blog.csdn.net/harsima/article/details/78934405"> Vue + ElementUI 手撸后台管理网站基本框架(四)主题切换</a></p></v-pageNotes>
                <div class="sys-article">
                    <h2><strong>主题创建</strong></h2>
                    <pre v-pre class="sys-pre"><code>
# 复制基础变量文件 (src/assets/css/theme/default.scss)，重命名为 blue.scss 并修改内部变量
# 在 src/assets/css 目录中创建新的主题入口文件 theme-blue.scss，并做如下引入

// 引入新主题变量文件
@import './theme/blue'
// 引入默认主题
@import './theme-default'
                    </code></pre>
                </div>
                <div class="sys-article">
                    <h2><strong>配置webpack</strong></h2>
                    <p>在<code>webpack.prod.conf.js</code>中对入口变量做出修改，注意是<code>prod.js</code></p>
                    <pre v-pre class="sys-pre"><code>
// 增加新的入口，并赋予文件名和路径
entry: {
    'theme-default': './src/assets/style/theme-default.scss'
}

// 对HtmlWebpackPlugin插件增加忽略chunk设置，防止该chunk被加入到生成后的html中
new HtmlWebpackPlugin({
    excludeChunks: ['theme-default']
})
                    </code></pre>
                </div>
                <div class="sys-article">
                    <h2><strong>使用及调试</strong></h2>
                    <p>在需要进行主题更换的页面中写入以下代码即可。</p>
                    <pre v-pre class="sys-pre"><code>
# 使用主题切换的方法示例，需要保证changeTheme()中的参数与主题文件名保持一致
@import changeTheme from '@/util/changeTheme'

export default {
    loadTheme(theme){
        changeTheme(theme)
    }
}
                    </code></pre>
                    <p>请注意：因为主题文件是打包后才生成的，所以在开发环境中，主题切换并不好用，只能通过手动修改sass主题文件的方式来做切换。手动切换请在<code>main.dev.js</code>中引入css即可。</p>
                </div>
            </v-pageSection>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {

            }
        },
        computed: {
            layout(){
                return this.$store.state.navbarPosition
            }
        },
        methods: {
            changeTheme(data){
                this.$store.commit("changeLayout", data)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .layout-list{
        &:after{
            clear: both;
            overflow: hidden;
        }
        ul{
            padding: 5px;
            overflow: hidden;
        }
        ul li{
            float: left;
            width: 160px;
            height: 160px;
            background: #fff;
            margin-right: 20px;
            padding: 10px;
            box-shadow: 0 0 3px #ccc;
            &:hover, &.cur:hover{
                box-shadow: 0 0 10px #ccc;
            }
            &.cur{
                border: 1px solid #ccc;
                box-shadow: none;
            }
            img{
                width: 140px;
            }
            p{
                height: 40px;
                line-height: 40px;
                text-align: center;
                font-size: 14px;
            }
        }
    }
</style>
