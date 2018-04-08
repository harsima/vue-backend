import i18n from '@/util/i18n'

export default {
    loadLang({dispatch, commit, state}, lang) {
        // 加载要切换的语言包
        let langPackList = state.langPack
        if (!langPackList.includes(lang)) {
            return import(/* webpackChunkName: "lang/lang-[request]" */ `@/lang/${lang}`).then(msgs => {
                i18n.setLocaleMessage(lang, msgs.default)
                i18n.locale = lang
                commit('addLangPack', lang)
                commit('setLang', lang)
                return Promise.resolve(lang)
            }).catch(() => {
                dispatch('loadLang', i18n.fallbackLocale).then((lang) => {
                    console.warn(`未找到对应语言包，已加载默认语言：${lang}`);
                    return lang
                })
            })
        }
        i18n.locale = lang
        commit('setLang', lang)
        return Promise.resolve(lang)
    }
}