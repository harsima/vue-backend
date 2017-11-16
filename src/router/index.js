// 路由控制
// {
//     path: 路由地址,
//     component: r => require.ensure([], () => r(require('路由页面')), '打包后的文件名'),
// }
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Cookies from 'js-cookie'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import whiteList from './directAccess'
import asyncRouter from './asyncRouter'

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
        component: r => require.ensure([], () => r(require('../page/login/login')), 'login')
    },
    {
        path: '/defaultLayout',
        component: r => require.ensure([], () => r(require('../page/layout/layout')), 'layout'),
        meta:{
            permission:[]
        },
        // 需要进行用户登录验证
        children: [{
            path: '/home',
            component: r => require.ensure([], () => r(require('../page/home/home')), 'home'),
        }]
    },
    {
        path: '/error',
        component: r => require.ensure([], () => r(require('../page/error/error')), 'error'),
        children: [
            {
                path: '/error/401',
                component: r => require.ensure([], () => r(require('../page/error/401')), 'error')
            },
            {
                path: '/error/403',
                component: r => require.ensure([], () => r(require('../page/error/403')), 'error')
            },
            {
                path: '/error/404',
                component: r => require.ensure([], () => r(require('../page/error/404')), 'error')
            },
            {
                path: '/error/500',
                component: r => require.ensure([], () => r(require('../page/error/500')), 'error')
            }
        ]
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
    if (Cookies.get('token')) {
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
            console.log('请重新登录')
            router.replace('/login')
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done(); // 结束Progress
})

export default router