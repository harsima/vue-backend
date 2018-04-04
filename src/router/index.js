import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import staticRoute from './staticRoute'
import { asyncRoute, redirectRoute} from './asyncRoute'
import whiteList from './whiteList'
import Auth from '@/util/auth'
import { Message } from 'element-ui'

NProgress.configure({ showSpinner: false });

/**
 * 根据返回的菜单列表为某个路由添加数据级权限（在前端即按钮操作权限）
 * @param {array} permission 权限列表（菜单列表）
 * @param {array} asyncRoute 异步路由对象
 */
function routerMatch(permission, router){
    return new Promise((resolve) => {
        console.time("匹配函数执行时间：")
        // 创建需要校验的参数数组
        function addPermision(permission){
            permission.forEach((item) => {
                if(item.child && item.child.length){
                    // 递归
                    addPermision(item.child)
                }
                router.children.forEach((s) => {
                    if(s.path == item.path){
                        s.meta.permission = item.permission
                        return
                    }
                })
            })
        }
        addPermision(permission)
        resolve(router)
        console.timeEnd("匹配函数执行时间：")
    })
}

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
            // 页面跳转前先判断是否存在权限列表，如果存在则直接跳转，如果没有则请求一次
            if (store.state.permission.list.length === 0) {
                // 获取权限列表，如果失败则跳回登录页重新登录
                store.dispatch('permission/getPermission').then(res => {
                    // 匹配并生成需要添加的路由对象
                    routerMatch(res, asyncRoute).then(res => {
                        console.log(res)
                        router.addRoutes(res)
                        router.addRoutes(redirectRoute)
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