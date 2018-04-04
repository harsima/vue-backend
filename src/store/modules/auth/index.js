import Cookies from 'js-cookie'
import axios from '@/util/ajax'
import Auth from '@/util/auth'

const state = {
    token: '',
    permissionList: []
}

const mutations = {
    setPermissionList: (state, data) => {
        state.permissionList = data
    },

    setToken: (state, data) => {
        if(data){
            Auth.setToken(data)
            Auth.setLoginStatus()
        } else {
            Auth.removeToken()
            Auth.removeLoginStatus()
        }
        state.token = data
    }
}

const actions = {
    // 邮箱登录
    loginByEmail({ commit }, userInfo) {
        return new Promise((resolve) => {
            axios({
                url: '/login',
                method: 'post',
                data: {
                    ...userInfo
                }
            }).then(res => {
                if(res.login){
                    commit('setToken', res.token)
                    commit('user/setName', res.name, { root: true })
                }
                resolve(res)
            })
        });
    },

    // 登出
    logout({commit}) {
        return new Promise((resolve) => {
            commit('setToken', '')
            commit('setPermissionList', [])
            commit('user/setName', '', { root: true })
            resolve()
        })
    },

    // 重新登录
    relogin({commit}){
        return new Promise((resolve) => {
            // 根据Token进行重新登录
            commit('setToken', Cookies.get('token'))
            commit('user/setName', decodeURIComponent(Cookies.get('userName')), { root: true })
            resolve()
        })
    },

    // 获取新Token
    getNewToken({commit, state}){
        return new Promise((resolve) => {
            axios({
                url: '/getToken',
                method: 'get',
                param: {
                    token: state.token
                }
            }).then((res) =>{
                commit("setToken", res.token)
                resolve()
            })
        })
    },

    // 获取该用户的权限列表——即菜单列表
    getPermission({commit}){
        return new Promise((resolve) =>{
            axios({
                url: '/user/navlist',
                methods: 'post',
                data: {}
            }).then((res) => {
                commit('setPermissionList', res)
                resolve(res)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}