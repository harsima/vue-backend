import i18n from '@/util/i18n'

let lang = i18n.locale

export default {
    // 当前语言模式  zh / en 
    lang: lang,
    // 导航条位置   left / top
    navbarPosition: 'left',
    // 当前系统主题  default / BBA / darkBlue
    theme: 'default',
    // 通知框等需要自动消失的时间
    duration: 5000
}