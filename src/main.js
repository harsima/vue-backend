// 引入babel编译环境
import 'babel-polyfill'
// 引入Mock
import '../mock/index.js'
// 框架引入
import Vue from "vue"
import router from './router'
import store from './store'
import axios from './util/ajax'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import i18n from './util/i18n'
import App from './index'
// 全局组件
import './components/platformCom/install'

// 注册组件到Vue
Vue.prototype.$axios = axios;
Vue.use(ElementUI)

new Vue({
    i18n,
    // axios,
    router,
    store,
    render: h => h(App)
}).$mount('#app')