const hasPermission = {
    // eslint-disable-next-line
    install (Vue, options){
        Vue.directive('hasPermission', {
            bind(el, binding, vnode){
                let permissionList = vnode.context.$route.meta.permission
                if(permissionList && permissionList.length && permissionList.includes(binding.value)){
                    el.parentNode.removeChild(el)
                }
            }
        })
    }
}

export default hasPermission
