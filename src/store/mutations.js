import Cookies from 'js-cookie'
import i18n from '@/util/i18n'

export default {
    changeLang(state, data){
        if(data){
            Cookies.set('lang', data)
            i18n.locale = data
            state.lang = data
        } else{
            
        }        
    },
    changeLayout(state, data){
        if(data){
            state.navbarPosition = data
        } else{
            console.error("改变语言环境错误：必须传入需要改变的语言代码。")
        }
    }
}