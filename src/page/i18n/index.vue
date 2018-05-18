<template>
    <div class="sys-page">
        <app-title title="国际化插件"></app-title>
        <app-notes>
            <p>本页实际路径：src/page/i18n/i18n.vue</p>
            <p>本系统使用vue-i18n作为语言国际化插件，未进行二次封装。点此查看插件官方文档：
                <a target="_blank" href="http://kazupon.github.io/vue-i18n/en"> http://kazupon.github.io/vue-i18n/en</a>
            </p>
            <p>本系统国际化不完全，仅有点击账户名时“修改密码”及“退出”文字可以切换，部分ElementUI自带组件也会切换。当然你也可以右上角的语言切换按钮进行切换。</p>
        </app-notes>
        <div class="page-content">
            <div class="sys-article">
                <p>本系统的国际化采用语言包懒加载策略。在系统启动时，根据状态及配置项，页面仅加载对应的语言。当切换语言环境时，对语言包进行懒加载，同时自动判别是否已经加载过该语言包文件。在构建生产环境时会对每种语言进行单独打包。</p>
            </div>
            <app-section title="使用方法" v-once>
                <div class="sys-article">
                    <h2>创建及配置语言包</h2>
                    <p>在<code>src/lang</code>下，创建语言包对应的语言文件，以key-value格式进行存储。保证在不同文件中key值相同。具体可参考<code>src/lang</code>中的对应代码。以下为示例</p>
                    <pre v-pre class="sys-pre"><code>
        // en.js                
        export default {
            editpassword: 'Edit Password',
            logout: 'Logout'
        }

        // zh-cn.js                
        export default {
            editpassword: '修改密码',
            logout: '退出登录'
        }
                    </code></pre>
                    <p>创建完成后，在<code>src/lang/index.js</code>中配置语言包的对应名称。注意：该名称需要与以后切换语言时的参数相同，并且与语言包名称相同。</p>
                </div>
                <div class="sys-article">
                    <h2>设置默认语言</h2>
                    <p>在<code>src/util/i18n.js</code>中修改如下代码。需要注意，locale及fallbackLocale的值需要相同，并且与<code>src/lang/index.js</code>中的Key值保证一致。</p>
                    <pre v-pre class="sys-pre"><code>
        const i18n = new VueI18n({
            // 当前语言环境
            locale: 'zhCN', 
            // 默认语言环境。如果locale中无匹配项则采用该项值
            fallbackLocale: 'zhCN',
            messages
        })
                    </code></pre>
                </div>
                <div class="sys-article">
                    <h2>加载默认语言包</h2>
                    <p>在起始页中进行默认语言包加载。示例详情查看：<code>src/index.vue</code></p>
                    <pre v-pre class="sys-pre"><code>
        export default {
            // 加载默认语言包
            created(){
                let defLang = Cookie.get('lang') || this.$i18n.locale
                this.$store.dispatch("loadLang", defLang)
            }
        }
                    </code></pre>
                </div>
                <div class="sys-article">
                    <h2>语言切换</h2>
                    <p>使用<code>loadLang(lang)</code>方法进行语言切换。该方法被注册在vuex，每次执行时同时更新cookie中的lang值。所以只需引入vuex，再进行调用即可。</p>
                
                    <pre v-pre class="sys-pre"><code>
        &lt;el-button :type="lang=='zhCN' ? 'primary': 'text'"  @click="changeLang('zhCN')"&gt;中文简体&lt;/el-button&gt;
        &lt;el-button :type="lang=='en' ? 'primary': 'text'"  @click="changeLang('en')"&gt;英文&lt;/el-button&gt;
                
        import {mapState, mapActions} from 'vuex'
        export default {
            ...
            computed: {
                ...mapState({
                    // 读取当前系统语言
                    lang: state => state.lang
                })
            },
            methods:{
                ...mapActions({
                    loadLang: 'loadLang'
                }),
                // button执行事件
                changeLang(val){
                    if(val == this.lang) return
                    this.loadLang(val)
                }
            }
        }
                    </code></pre>
                </div>
            </app-section>

            
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'i18n',
    data() {
        return {}
    },
    computed: {
        ...mapState({
            lang: state => state.lang
        })
    },
    methods: {
        ...mapMutations({
            toggleLang: 'changeLang'
        }),
        changeLang(val) {
            if (val == this.lang) return
            this.toggleLang(val)
        }
    }
}
</script>