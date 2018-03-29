import Cookie from 'js-cookie'

export default {
    // 当前语言模式  zh / en 
    lang: Cookie.get('lang') || 'zhCN',
    langPack: [],
    // 导航条位置   left / top
    navbarPosition: 'left',
    // 当前系统主题  default
    theme: 'default',
    // 通知框等需要自动消失的时间
    duration: 5000
}