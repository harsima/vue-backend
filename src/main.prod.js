import 'babel-polyfill'
import 'element-ui/lib/theme-default/index.css'

import Vue from "vue"
import router from './router'
import store from './store'
import axios from './util/ajax'
import ElementUI from 'element-ui'
import i18n from './util/i18n'
import App from './index'

import './components/platformCom/install'

// 注册组件到Vue
Vue.prototype.$axios = axios
Vue.use(ElementUI)

new Vue({
    i18n,
    axios,
    router,
    store,
    render: h => h(App)
}).$mount('#app')