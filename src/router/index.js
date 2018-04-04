import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Cookies from 'js-cookie'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import whiteList from './directAccess'
import asyncRouter from './asyncRouter'
import Auth from '@/util/auth'
import { Message } from 'element-ui'

// 页面刷新时，重新赋值token
if (Cookies.get('token')) {
    store.dispatch('user/relogin')
}
NProgress.configure({ showSpinner: false });
Vue.use(VueRouter)

/**
 * 根据权限匹配路由
 * @param {array} permission 权限列表（菜单列表）
 * @param {array} asyncRouter 异步路由对象
 */
function routerMatch(permission, asyncRouter){
    return new Promise((resolve) => {
        const routers = asyncRouter[0]
        // 创建路由
        function createRouter(permission){
            permission.forEach((item) => {
                if(item.child && item.child.length){
                    // 递归
                    createRouter(item.child)
                }
                let path = item.path
                // 循环异步路由，将符合权限列表的路由加入到routers中
                asyncRouter.find(function(s){
                    if(s.path == path){
                        s.meta.permission = item.permission
                        routers.children.push(s)
                        return
                    }
                })
            })
        }

        createRouter(permission)
        resolve([routers])
    })
}

// 默认路由表，不需要权限
const routes = [{
        path: '/',
        // 重定向
        redirect: '/home'
    },
    {
        path: '/login',
        component: () => import(/* webpackChunkName: 'login' */ '../page/login/login')
    },
    {
        path: '/defaultLayout',
        component: () => import(/* webpackChunkName: 'layout' */ '../page/layout/layout'),
        meta:{
            permission:[]
        },
        // 需要进行用户登录验证
        children: [{
            path: '/home',
            component: () => import(/* webpackChunkName: 'home' */ '../page/home/home')
        }]
    },
    {
        path: '/error',
        component: () => import(/* webpackChunkName: 'error' */ '../page/error/error'),
        children: [
            {
                path: '/error/401',
                component: () => import(/* webpackChunkName: 'error' */ '../page/error/401')
            },
            {
                path: '/error/403',
                component: () => import(/* webpackChunkName: 'error' */ '../page/error/403')
            },
            {
                path: '/error/404',
                component: () => import(/* webpackChunkName: 'error' */ '../page/error/404')
            },
            {
                path: '/error/500',
                component: () => import(/* webpackChunkName: 'error' */ '../page/error/500')
            }
        ]
    },
    {
        path: '/auth',
        component: () => import(/* webpackChunkName: 'auth' */ '../page/auth')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

// 路由跳转前验证
router.beforeEach((to, from, next) => {
    // 开启进度条
    NProgress.start();
    
    // 判断用户是否登录
    if (Auth.isLogin()) {
        // 如果当前处于登录状态，并且跳转地址为login，则自动跳回系统首页
        // 这种情况出现在手动修改地址栏地址时
        if (to.path === '/login') {
            router.replace('/home')
        } else {
            // 页面跳转前先判断是否存在权限列表，如果存在则直接跳转，如果没有则请求一次
            if (store.state.permission.list.length === 0) {
                // 获取权限列表，如果失败则跳回登录页重新登录
                store.dispatch('permission/getPermission').then(res => {
                    // 匹配并生成需要添加的路由对象
                    routerMatch(res, asyncRouter).then(res => {
                        // console.log(res)
                        router.addRoutes(res)
                        next(to.path)
                    })
                }).catch(() => {
                    console.log('登录错误')
                    store.dispatch('user/logout').then(() => {
                        router.replace('/login')
                    })
                })
            } else {
                // 如果跳转页面存在于路由中则进入，否则跳转到404
                // 因为可以通过改变url值进行访问，所以必须有该判断
                if(to.matched.length){
                    if(whiteList.indexOf(to.path) < 0){
                        // store.dispatch('user/actionlog', to)
                    }
                    next()
                } else{
                    router.replace('/error/404')
                }
            }
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