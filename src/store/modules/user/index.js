import axios from '@/util/ajax'
import Cookies from 'js-cookie'
import { Message } from 'element-ui';

const state = {
    // uid
    uid: '',
    // 用户名
    name: '',
    // token
    token: '',
    // 角色分组
    role: ''
    // 头像
    // avatar: ''
}

const getters = {}

const mutations = {
    setUID: (state, data) => {
        if(data){
            Cookies.set('uid', data)
        } else {
            Cookies.remove('uid')
        }
        state.uid = data
    },
    setName: (state, data) => {
        if(data){
            Cookies.set('name', encodeURIComponent(data))
        } else {
            Cookies.remove('name')
        }
        state.name = data
    },
    setToken: (state, data) => {
        if(data){
            Cookies.set('token', data)
        } else {
            Cookies.remove('token')
        }
        state.token = data
    },
    setRole: (state, data) => {
        state.role = data
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
                    commit('setUID', data.uid)
                    commit('setName', data.name)
                    commit('setToken', data.token)
                    Cookies.set('lang', rootState.lang)
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
            commit('setUID', '')
            commit('setName', '')
            commit('setToken', '')
            resolve()
        })
    },
    // 重新登录
    relogin({commit}){
        return new Promise((resolve) => {
            // TODO 问题严重，重新登录需要字段不明，但肯定不能保存token
            commit('setUID', Cookies.get('uid'))
            commit('setName', decodeURIComponent(Cookies.get('name')))
            commit('setToken', Cookies.get('token'))
            resolve()
        })
    },
    // 记录操作日志
    actionlog(data){
        axios({
            url: '/actionlog',
            method: 'post',
            data: {
                'uid': state.uid,
                'path': data.path
            }
        }).catch(() => {
            Message({
                message: '保存操作记录失败',
                type: 'error'
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