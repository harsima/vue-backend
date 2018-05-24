<template>
    <div class="sys-page">
        <app-title title="主题变更"></app-title>
        <div class="page-content">
            <app-section title="切换布局">
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
            </app-section>
            <app-section title="切换主题颜色">
                <app-notes><p>本项目使用sass编写，所以变更主题方式相对简单。因时间原因，第二套主题(grenn)仅为功能示例。由于切换主题功能原理的限制，该功能当前仅能用于生产环境，开发环境时需要进行手动修改引入的主题文件。主题切换详细实现原理请查看：<a href="http://blog.csdn.net/harsima/article/details/78934405"> Vue + ElementUI 手撸后台管理网站基本框架(四)主题切换</a></p></app-notes>
                <div class="sys-article">
                    <h2><strong>主题创建</strong></h2>
                    <pre v-pre class="sys-pre"><code>
# 复制基础变量文件 (src/assets/css/theme/default.scss)，重命名为 blue.scss 并修改内部变量
# 在 src/assets/css 目录中创建新的主题入口文件 theme-blue.scss，并做如下引入
# 如果该主题为深色主题，并且希望在导航中使用element-ui的深色主题，则在该主题文件名中必须包含dark字段，如theme-blue-dark.scss

// 第三方主题
@import 'element-ui/lib/theme-default/index.css';

// 项目主题
@import './theme/default';
@import 'base';
                    </code></pre>
                </div>
                <div class="sys-article">
                    <h2><strong>配置webpack</strong></h2>
                    <p>在<code>webpack.prod.conf.js</code>中对入口变量做出修改，注意是<code>prod.js</code></p>
                    <pre v-pre class="sys-pre"><code>
// 增加新的入口，并赋予文件名和路径
entry: {
    'theme-default': './src/assets/css/theme-default.scss'
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
# 使用主题切换的方法示例，需要保证setTheme()中的参数与主题文件名保持一致
@import setTheme from '@/util/setTheme'

// 直接在按钮处或页面加载时直接使用setTheme()方法即可
                    </code></pre>
                    <p><strong>开发中切换主题</strong></p>
                    <p>因为主题文件是打包后才生成的，所以在开发环境中，主题切换并不好用，只能通过手动修改sass主题文件的方式来做切换。手动切换请在<code>main.dev.js</code>中引入scss即可。</p>
                    <p><strong>开发中调试打包后的主题是否正确</strong></p>
                    <p>基于上面的原因，如果你需要查看打包后的主题是否正确，切换功能是否能够正常使用，那么你需要先将工程打包一次，然后将生成的主题文件放置到项目根目录中的<code>static</code>文件夹，然后在<code>main.dev.js</code>中去掉所有的主题引用，在<code>index.html</code>替换成打包后的html文件。期间请保证文件目录正确。</p>
                </div>
                <div class="sys-article">
                    <h2><strong>扩展说明：关于主题写法的二三事</strong></h2>
                    <p>如果你的项目中真的涉及到多主题，而且是类似于本项目中的这种可以深度定制和改变的话，那么在书写主题时请遵循以下几点建议：</p>
                    <p><strong>1. 千万不要将和主题有关的所有样式写在vue文件中！</strong></p>
                    <p>管理麻烦，维护麻烦，如果使用了<code>scoped</code>则其样式无法通过主题切换进行变更</p>
                    <p><strong>2. 整理好自己和他人的主题文件，千万不要重名！</strong></p>
                    <p>因为所有的CSS将通过一个文件进行整合和调用，所以CSS的命名问题仍然会是一个巨大的考验和风险，这在写CSS（CSS Module暂时没研究，不清楚有没有良好的命名空间解决方案）</p>
                </div>
            </app-section>
        </div>
    </div>
</template>

<script>
export default{
    name: 'themeChange',
    computed: {
        layout(){
            return this.$store.state.navbarPosition
        }
    },
    methods: {
        changeTheme(data){
            this.$store.commit("setLayout", data)
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