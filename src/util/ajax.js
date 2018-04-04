/**
 * axios全局配置，包括验证校验及错误处理
 */
import axios from 'axios'
import store from '../store'
import router from '../router'
import { Message } from 'element-ui'
import Auth from '@/util/auth'

var getTokenLock = false
var CancelToken = axios.CancelToken
var cancel

function checkToken(callback){
    // 检测Token是否过期
    if(!Auth.hasToken()){
        // 如果Token过期后直接请求后台获取新Token
        if(Auth.tokenTimeoutMethod == "getNewToken"){
            // 如果当前有请求正在获取Token
            if(getTokenLock){
                setTimeout(function(){
                    checkToken(callback)
                }, 500)
            } else {
                getTokenLock = true
                store.dispatch("auth/getNewToken").then(() => {
                    console.log("已获取新token")
                    callback()
                    getTokenLock = false
                })
            }
        }
        // 如果Token过期后跳转到授权页面，授权页面不能是login否则路由冲突
        if(Auth.tokenTimeoutMethod == "jumpAuthPage" && Auth.isLogin()){
            if(router.currentRoute.path != '/auth'){
                // 跳转到固定的授权页面并中断当前请求
                cancel()
                console.log("请求已中断")
                router.push('/auth')
            }
        }
    } else {
        console.log("未过期直接回调")
        callback()
    }
}

// 超时设置
const service = axios.create({
    timeout: 5000                  // 请求超时时间
});

// baseURL
// axios.defaults.baseURL = 'https://api.github.com';

// http request 拦截器
// 每次请求都为http头增加Authorization字段，其内容为token
service.interceptors.request.use(
    config => {
        config.cancelToken = new CancelToken(function executor(c) {
            cancel = c;
        })
        checkToken(function(){
            Auth.setLoginStatus()
            config.headers.Authorization = `${store.state.user.token}`
        })
        return config
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 拦截器
// 针对响应代码确认跳转到对应页面
service.interceptors.response.use(
    response => response.data,
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    router.push('error/401');
                case 403:
                    router.push('error/403');
                default: 
                    Message({
                        message: `服务器错误！错误代码：${error.response.status}`,
                        type: 'error'
                    })
            }
            return Promise.reject(error.response.data)
        }
        console.log(error)
    }
);

export default service;