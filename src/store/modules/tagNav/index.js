const state = {
    // 已经开启的标签
    tagNavList: []
}

const mutations = {
    addTagNav(state, data){
        if(data && !state.tagNavList.includes(data)){
            state.tagNavList.push(data)
        }
    },
    removeTagNav(state, data){
        if(data){
            let index = state.tagNavList.indexOf(data)
            if(index >= 0){
                state.tagNavList.splice(index, 1)
            }
        } else{
            state.tagNavList = []
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations
}