// 国际化设置
import Vue from 'vue';
import VueI18n from 'vue-i18n'

import ElementUI from 'element-ui'
import enElement from 'element-ui/lib/locale/lang/en'
import zhElement from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from '@/lang/en'
import zhLocale from '@/lang/zh-cn'

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
    }
}


Vue.use(VueI18n)

const i18n = new VueI18n({
    // 当前语言环境
    locale: 'zh', 
    // 默认语言环境。如果locale中无匹配项则采用该项值
    fallbackLocale: 'zh',
    messages
})

Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value)
})

export default i18n