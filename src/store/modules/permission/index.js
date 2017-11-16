import axios from '@/util/ajax'
// import { Message } from 'element-ui';

const state = {
    // 权限获取方式： 每次跳页获取(pageChange)，暂时无法实现，因router未提供覆盖事件 / 登录后一次性获取(login) default:login
    mode: 'login',
    // 完整权限列表（菜单列表）
    list: []
}

const getters = {}

const mutations = {
    setMode: (state, data) => {
        state.mode = data
    },
    setList: (state, data) => {
        state.list = data
    }
}

const actions = {
    // 获取权限列表
    getPermission({commit, rootState}){
        return new Promise((resolve, reject) =>{
            let uid = rootState.uid
            axios({
                url: '/user/navlist',
                methods: 'post',
                data: {
                    uid: uid
                }
            }).then((res) => {
                // 存储权限列表
                commit('setList', res.data)
                resolve(res.data)
            }).catch(() => {
                reject()
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}