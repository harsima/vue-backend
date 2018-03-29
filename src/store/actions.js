import i18n from '@/util/i18n'

export default {
    loadLang({commit, state}, lang) {
        // 获取已经加载的语言包
        let langList = state.langPack
        if (!langList.includes(lang)) {
            return import(/* webpackChunkName: "lang/lang-[request]" */ `@/lang/${lang}`).then(msgs => {
                i18n.setLocaleMessage(lang, msgs.default)
                commit('addLangPack', lang)
                i18n.locale = lang
                commit('setLang', lang)
                return lang
            })
        }
        i18n.locale = lang
        commit('setLang', lang)
        return Promise.resolve(lang)
    },
}