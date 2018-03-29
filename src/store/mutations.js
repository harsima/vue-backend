export default {
    setLang(state, data){
        if(data){
            state.lang = data
        }
    },
    addLangPack(state, data){
        if(data){
            state.langPack.push(data)
        }
    },
    setLayout(state, data){
        if(data){
            state.navbarPosition = data
        }
    },
    setThemeColor(state, data){
        state.theme = data
    }
}