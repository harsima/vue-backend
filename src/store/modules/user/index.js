import axios from '@/util/ajax'
import Auth from '@/util/auth'
import Cookies from 'js-cookie'

const state = {
    // 用户名
    name: '',
    // token
    token: ''
}

const getters = {}

const mutations = {
    setName: (state, data) => {
        state.name = data
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
    loginByEmail({ commit, rootState }, userInfo) {
        return new Promise((resolve, reject) => {
            axios({
                url: '/login',
                method: 'post',
                data: {
                    ...userInfo
                }
            }).then(res => {
                const data = res.data
                if(data.login){
                    commit('setName', data.name)
                    commit('setToken', data.token)
                    Cookies.set('lang', rootState.lang)
                    Cookies.set('userName', encodeURIComponent(data.name))
                }
                resolve(res)
            }).catch(err => {
                reject(err.data.message)
            })
        });
    },
    // 登出
    logout({commit}) {
        return new Promise((resolve) => {
            commit('setName', '')
            commit('setToken', '')
            resolve()
        })
    },
    // 重新登录
    relogin({commit}){
        return new Promise((resolve) => {
            // 重新登录后，根据Token进行重新登录
            commit('setName', decodeURIComponent(Cookies.get('userName')))
            commit('setToken', Cookies.get('token'))
            resolve()
        })
    },
    // 获取新Token
    getNewToken({commit, state}){
        return new Promise((resolve, reject) => {
            axios({
                url: '/getToken',
                method: 'get',
                param: {
                    token: state.token
                }
            }).then((res) =>{
                commit("setToken", res.data.token)
                resolve()
            }).catch(() => {
                reject()
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}