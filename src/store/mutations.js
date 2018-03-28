import Cookies from 'js-cookie'

export default {
    setLang(state, data){
        if(data){
            state.lang = data
            Cookies.set('lang', data)
        }
    },
    addLangPack(state, data){
        if(data){
            state.langPack.push(data)
        }
    },
    changeLayout(state, data){
        if(data){
            state.navbarPosition = data
        }
    },
    setThemeColor(state, data){
        state.theme = data
    }
}