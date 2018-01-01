<i18n>
{
    "en": {
        "test": "This is test text. This page's international language use single file components. "
    },
    "zh": {
        "test": "这是测试文字。本页的国际化设置使用的单文件组件形式。"
    }
}

</i18n>
<template>
    <div class="sys-page">
        <v-pageTitle title="国际化插件"></v-pageTitle>
        <v-pageNotes>本页实际路径: src/page/i18n/i18n.vue。使用vue-i18n插件，未进行二次封装，插件配置均来自插件官方文档。访问链接：
            <a target="_blank" href="http://kazupon.github.io/vue-i18n/en"> http://kazupon.github.io/vue-i18n/en</a>
        </v-pageNotes>
        <div class="page-content">
            <div class="sys-article">
                <p>本系统使用
                    <code>vue-i18n</code>作为语言国际化插件。国际化配置文件位于
                    <code>src/lang</code>文件夹内，插件注册及插件设置文件位于
                    <code>src/util/i18n.js</code>。当前仅提供了中文简体及英语的语种切换。</p>
                <p>本系统国际化不完全，仅有点击账户名时“修改密码”及“退出”文字可以切换，部分ElementUI自带组件也会切换。当然你也可以点击下面的按钮进行切换。</p>
            </div>
            <v-pageSection title="示例">
                <div class="sys-article">
                    <v-pageNotes>
                        <p>{{$t('test')}}</p>
                    </v-pageNotes>
                    <div>
                        <el-button :type="lang=='zh' ? 'primary': 'text'" @click="changeLang('zh')">中文简体</el-button>
                        <el-button :type="lang=='en' ? 'primary': 'text'" @click="changeLang('en')">英文</el-button>
                    </div>
                    <div class="notice">
                        <strong>注意：</strong>因语言切换为全局方法，故当你在这里变更了中英文设置后，本系统语言也会变更。直接表现就是右上角语言会对应切换。
                    </div>
                </div>
            </v-pageSection>
            <v-pageSection title="使用方法" v-once>
                <div class="sys-article">
                    <h2>
                        <strong>字段设置</strong>
                    </h2>
                    <p>在<code>src/lang</code>下所有文件中以key-value格式创建即可。保证在不同文件中key值相同。以下为示例</p>
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
                    <p>当使用单文件组件中时，需要使用<code>i18n</code>标签。本页字段即写在单文件组件中。</p>
                    <pre v-pre class="sys-pre"><code>
        &lt;i18n&gt;
        {
            "en": {
                "test": "This is test text. This page's international language use single file components. "
            },
            "zh": {
                "test": "这是测试文字。本页的国际化设置使用的单文件组件形式。"
            }
        }
        &lt;/i18n&gt;
                    </code></pre>
                </div>
                <div class="sys-article">
                    <h2>
                        <strong>字段使用</strong>
                    </h2>
                    <p>在模板中如此使用：<code v-pre>{{$t('test')}}</code>。test即为国际化设置中的key。默认情况读取全局设置中的字段。</p>
                </div>
                <div class="sys-article">
                    <h2>
                        <strong>语言切换</strong>
                    </h2>
                    <p>全局方法<code>toggleLang()</code>。该方法被注册在vuex，每次执行时同时更新cookie中的lang值。所以只需引入vuex，再进行调用即可。</p>
                
                    <pre v-pre class="sys-pre"><code>
        &lt;el-button :type="lang=='zh' ? 'primary': 'text'"  @click="changeLang('zh')"&gt;中文简体&lt;/el-button&gt;
        &lt;el-button :type="lang=='en' ? 'primary': 'text'"  @click="changeLang('en')"&gt;英文&lt;/el-button&gt;
                
        import {mapState, mapMutations} from 'vuex'
        export default {
            ...
            computed: {
                ...mapState({
                    // 读取当前系统语言（非windows）
                    lang: state => state.lang
                })
            },
            methods:{
                ...mapMutations({
                    // 映射语言切换全局方法
                    toggleLang: 'changeLang'
                }),
                // button执行事件
                changeLang(val){
                    if(val == this.lang) return
                    this.toggleLang(val)
                }
            }
        }
                    </code></pre>
                </div>
            </v-pageSection>
            <v-pageSection title="配置方法">

                <div class="sys-article">
                    <h2>
                        <strong>默认语言设置</strong>
                    </h2>
                    <p>在<code>src/util/i18n.js</code>中修改如下代码</p>
                    <pre v-pre class="sys-pre"><code>
        const i18n = new VueI18n({
            // 当前语言环境
    *       locale: 'zh', 
            // 默认语言环境。如果locale中无匹配项则采用该项值
    *       fallbackLocale: 'zh',
            messages
        })
                    </code></pre>
                </div>
                <div class="sys-article">
                    <h2>
                        <strong>新增语种</strong>
                    </h2>
                    <p>在
                        <code>src/lang</code>下新增并编写新的语言js文件。新增的文件需要在
                        <code>src/util/i18n.js</code>进行
                        <code>import</code>引入。</p>
                
                    <pre v-pre class="sys-pre"><code>
        ...
    +   // 引入第三方框架多语言文件
    +   import jaElement from 'element-ui/lib/locale/lang/ja'
    +   // 引入本系统新增语言文件
    +   import jaLocale from '@/lang/ja'
        ...
        const messages = {
            en: {
                global: {
                    ...enLocale
                },
                ...enElement
            },
            zh: {
                global: {
                    ...zhLocale
                },
                ...zhElement
            },
            // 新增日语，
    +       ja: {
    +           // 注册到global对象中，以区分本系统多语言和第三方多语言（自定义字段，可随意修改）
    +           global: {
    +               ...jaLocale
    +           },
    +           // 注册UI框架及其他框架的多语言设置
    +           ...jaElement
    +       }
        }
                    </code></pre>
                </div>
            </v-pageSection>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
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