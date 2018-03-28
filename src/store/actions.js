import i18n from '@/util/i18n'

export default {
    changeLang({commit, state}, lang) {
        // 获取已经加载的语言包
        let langList = state.langPack
        if (i18n.locale !== lang) {
            if (!langList.includes(lang)) {
                return import(/* webpackChunkName: "lang/lang-[request]" */ `@/lang/${lang}`).then(msgs => {
                    i18n.locale = lang
                    i18n.setLocaleMessage(lang, msgs.default)
                    commit('setLang', lang)
                    commit('addLangPack', lang)
                    return lang
                })
            }
            i18n.locale = lang
            commit('setLang', lang)
            return Promise.resolve(lang)
        }
        return Promise.resolve(lang)
    },
}