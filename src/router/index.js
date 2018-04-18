import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import Auth from '@/util/auth'
import store from '../store'
import staticRoute from './staticRoute'
import whiteList from './whiteList'

NProgress.configure({ showSpinner: false });

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: staticRoute
})

// 路由跳转前验证
router.beforeEach((to, from, next) => {
    // 开启进度条
    NProgress.start();
    
    // 判断用户是否处于登录状态
    if (Auth.isLogin()) {
        // 如果当前处于登录状态，并且跳转地址为login，则自动跳回系统首页
        // 这种情况出现在手动修改地址栏地址时
        if (to.path === '/login') {
            router.replace('/home')
        } else {
            next()
        }
    } else {
        // 如果是免登陆的页面则直接进入，否则跳转到登录页面
        if (whiteList.indexOf(to.path) >= 0) {
            console.log('该页面无需登录即可访问')
            next()
        } else {
            router.replace('/login')
            // 如果store中有token，同时Cookie中没有登录状态
            if(store.state.user.token){
                Message({
                    message: '登录超时，请重新登录'
                })
            }
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done(); // 结束Progress
})

export default router