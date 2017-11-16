const hasPermission = {
    // eslint-disable-next-line
    install (Vue, options){
        Vue.mixin({
            methods:{
                hasPermission(data){
                    let permissionList = this.$route.meta.permission
                    if(permissionList && permissionList.length && permissionList.includes(data)){
                        return true
                    }
                    return false
                }
            }
        })
    }
}

export default hasPermission
