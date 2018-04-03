import Cookies from 'js-cookie'

const authToken = {
    // 当Token超时后采取何种策略
    // jumpAuthPage  每次请求时判断Token是否超时，若超时则跳转到授权页面
    // getNewToken  每次请求时判断Token是否超时，若超时则获取新Token
    tokenTimeoutMethod: 'getNewToken',
    
    // 在Cookie中记录登录状态的key
    loginKey: 'isLogin',

    // Token是否超时
    hasToken: function(){
        return Cookies.get('token')
    },

    // 当前是否是登录状态
    isLogin: function(){
        return Cookies.get(this.loginKey)
    },

    // 设置Token
    setToken: function(token){
        // 30分钟内没有新请求则意味着登录超时
        var maxAge = new Date(new Date().getTime() + 1 * 60 * 1000)
        Cookies.set('token', token, {
            expires: maxAge
        })
    },

    // 设置登录状态
    setLoginStatus: function(){
        // 30分钟内没有新请求则意味着登录超时
        var maxAge = new Date(new Date().getTime() + 30 * 60 * 1000)
        Cookies.set(this.loginKey, 'true', {
            expires: maxAge
        })
    },

    // 移除Token
    removeToken: function(){
        Cookies.remove('token')
    },

    // 移除登录状态
    removeLoginStatus: function(){
        Cookies.remove(this.loginKey)
    }
}

export default authToken